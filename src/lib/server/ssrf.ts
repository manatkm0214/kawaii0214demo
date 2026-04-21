import { lookup } from "node:dns/promises";
import net from "node:net";

type UrlValidationOptions = {
  allowHttp?: boolean;
};

function normalizeHostname(hostname: string) {
  return hostname.toLowerCase().replace(/\.$/, "");
}

function isPrivateIpv4(address: string): boolean {
  const parts = address.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return true;
  }

  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  if (normalized === "::1" || normalized === "::" || normalized.startsWith("fe80:")) return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  if (normalized.startsWith("::ffff:")) {
    return isPrivateIp(normalized.replace("::ffff:", ""));
  }
  return false;
}

export function isPrivateIp(address: string): boolean {
  const version = net.isIP(address);
  if (version === 4) return isPrivateIpv4(address);
  if (version === 6) return isPrivateIpv6(address);
  return true;
}

function isBlockedHostname(hostname: string) {
  const host = normalizeHostname(hostname);
  return (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "metadata.google.internal"
  );
}

export async function validatePublicHttpUrl(value: string, options: UrlValidationOptions = {}) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const isHttp = url.protocol === "http:";
  const isHttps = url.protocol === "https:";
  if (!isHttps && !(options.allowHttp && isHttp)) return null;
  if (url.username || url.password) return null;
  if (isBlockedHostname(url.hostname)) return null;

  if (net.isIP(url.hostname)) {
    return isPrivateIp(url.hostname) ? null : url;
  }

  try {
    const records = await lookup(url.hostname, { all: true, verbatim: false });
    if (records.length === 0 || records.some((record) => isPrivateIp(record.address))) {
      return null;
    }
  } catch {
    return null;
  }

  return url;
}

export async function fetchPublicHttpUrl(
  initialUrl: URL,
  init: RequestInit,
  options: UrlValidationOptions & { maxRedirects?: number } = {},
) {
  let currentUrl = initialUrl;
  const maxRedirects = options.maxRedirects ?? 2;

  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount += 1) {
    const validated = await validatePublicHttpUrl(currentUrl.toString(), options);
    if (!validated) throw new Error("Blocked URL");

    const response = await fetch(validated.toString(), {
      ...init,
      redirect: "manual",
    });

    if (![301, 302, 303, 307, 308].includes(response.status)) {
      return response;
    }

    const location = response.headers.get("location");
    if (!location) return response;

    currentUrl = new URL(location, validated);
  }

  throw new Error("Too many redirects");
}

export async function readResponseText(response: Response, maxBytes = 1_000_000) {
  if (!response.body) return "";

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel().catch(() => undefined);
      throw new Error("Response too large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(bytes);
}
