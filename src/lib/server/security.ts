import { NextResponse } from "next/server";

type JsonReadResult<T> =
  | { data: T; response?: never }
  | { data?: never; response: NextResponse };

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

export function jsonError(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers });
}

export async function readJsonBody<T>(request: Request, maxBytes = 64_000): Promise<JsonReadResult<T>> {
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { response: jsonError("Request body too large", 413) };
  }

  if (!request.body) {
    return { response: jsonError("Invalid JSON", 400) };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return { response: jsonError("Request body too large", 413) };
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const text = new TextDecoder().decode(bytes).trim();
  if (!text) {
    return { response: jsonError("Invalid JSON", 400) };
  }

  try {
    return { data: JSON.parse(text) as T };
  } catch {
    return { response: jsonError("Invalid JSON", 400) };
  }
}

export function requireSameOrigin(request: Request) {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return null;

  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  let callerOrigin = origin;
  if (!callerOrigin && referer) {
    try {
      callerOrigin = new URL(referer).origin;
    } catch {
      callerOrigin = null;
    }
  }

  if (!callerOrigin || callerOrigin !== requestOrigin) {
    return jsonError("Forbidden", 403);
  }

  return null;
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function rateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number,
  identity?: string,
) {
  const now = Date.now();
  const subject = identity || getClientIp(request);
  const key = `${scope}:${subject}`;
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;

  const headers = {
    "Retry-After": String(Math.max(1, Math.ceil((current.resetAt - now) / 1000))),
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(Math.max(0, limit - current.count)),
    "X-RateLimit-Reset": String(Math.ceil(current.resetAt / 1000)),
  };

  if (current.count > limit) {
    return jsonError("Too many requests", 429, headers);
  }

  if (rateBuckets.size > 5_000) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(bucketKey);
    }
  }

  return null;
}

export function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

export function boundedText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
