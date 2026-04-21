import { NextRequest, NextResponse } from "next/server";
import { getAppSessionUser } from "@/lib/auth/auth0-app-user";
import { rateLimit, readJsonBody, requireSameOrigin } from "@/lib/server/security";
import { fetchPublicHttpUrl, readResponseText, validatePublicHttpUrl } from "@/lib/server/ssrf";

type Candidate = {
  url: string;
  source: "direct" | "og" | "twitter" | "page" | "jsonld" | "social";
};

const ABSOLUTE_IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i;

export const runtime = "nodejs";

function resolveCandidate(base: URL, raw: string) {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("data:")) return null;
  try {
    const url = new URL(trimmed, base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function uniqueCandidates(candidates: Candidate[]) {
  const seen = new Set<string>();
  return candidates.filter((item) => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function extractMetaCandidates(html: string, pageUrl: URL) {
  const matches: Candidate[] = [];
  const metaRegex = /<meta[^>]+(?:property|name)=["'](og:image|twitter:image)["'][^>]+content=["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(metaRegex)) {
    const resolved = resolveCandidate(pageUrl, match[2] || "");
    if (!resolved) continue;
    matches.push({
      url: resolved,
      source: match[1] === "twitter:image" ? "twitter" : "og",
    });
  }
  return matches;
}

function extractImgCandidates(html: string, pageUrl: URL) {
  const matches: Candidate[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(imgRegex)) {
    const resolved = resolveCandidate(pageUrl, match[1] || "");
    if (!resolved) continue;
    if (!ABSOLUTE_IMAGE_RE.test(resolved)) continue;
    matches.push({ url: resolved, source: "page" });
  }
  return matches;
}

function extractJsonLdCandidates(html: string, pageUrl: URL) {
  const matches: Candidate[] = [];
  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLdRegex)) {
    const block = match[1] || "";
    for (const imageMatch of block.matchAll(/"(?:(?:thumbnail)?image|thumbnailUrl)"\s*:\s*(?:\[\s*)?"([^"]+)"/gi)) {
      const resolved = resolveCandidate(pageUrl, imageMatch[1] || "");
      if (!resolved) continue;
      matches.push({ url: resolved, source: "jsonld" });
    }
  }
  return matches;
}

function socialFallbackCandidates(pageUrl: URL) {
  const host = pageUrl.hostname.replace(/^www\./, "");
  const matches: Candidate[] = [];

  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = pageUrl.searchParams.get("v");
    if (id) {
      matches.push(
        { url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, source: "social" },
        { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, source: "social" },
      );
    }
  }

  if (host === "youtu.be") {
    const id = pageUrl.pathname.split("/").filter(Boolean)[0];
    if (id) {
      matches.push(
        { url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, source: "social" },
        { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, source: "social" },
      );
    }
  }

  return matches;
}

export async function POST(request: NextRequest) {
  try {
    const originError = requireSameOrigin(request);
    if (originError) return originError;

    const user = await getAppSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitError = rateLimit(request, "image-candidates", 20, 10 * 60 * 1000, user.supabaseUserId);
    if (rateLimitError) return rateLimitError;

    const parsed = await readJsonBody<{ url?: string }>(request, 4_000);
    if (parsed.response) return parsed.response;

    const pageUrl = await validatePublicHttpUrl(parsed.data.url || "", { allowHttp: true });
    if (!pageUrl) {
      return NextResponse.json({ error: "valid_url_required" }, { status: 400 });
    }

    if (ABSOLUTE_IMAGE_RE.test(pageUrl.toString())) {
      return NextResponse.json({
        items: [{ url: pageUrl.toString(), source: "direct" satisfies Candidate["source"] }],
      });
    }

    const response = await fetchPublicHttpUrl(
      pageUrl,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; KakeiboBoard/1.0)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
        },
        cache: "no-store",
      },
      { allowHttp: true, maxRedirects: 2 },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "fetch_failed", detail: `upstream_status_${response.status}` },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.startsWith("image/")) {
      return NextResponse.json({
        items: [{ url: pageUrl.toString(), source: "direct" satisfies Candidate["source"] }],
      });
    }

    if (!contentType.includes("text/html")) {
      return NextResponse.json(
        { error: "unsupported_content_type", detail: contentType || "unknown" },
        { status: 415 },
      );
    }

    const html = await readResponseText(response, 1_000_000);
    const candidates = uniqueCandidates([
      ...socialFallbackCandidates(pageUrl),
      ...extractMetaCandidates(html, pageUrl),
      ...extractJsonLdCandidates(html, pageUrl),
      ...extractImgCandidates(html, pageUrl),
    ]).slice(0, 8);

    if (candidates.length === 0) {
      return NextResponse.json({ error: "no_candidates_found" }, { status: 404 });
    }

    return NextResponse.json({ items: candidates });
  } catch {
    return NextResponse.json({ error: "failed_to_extract_candidates" }, { status: 500 });
  }
}
