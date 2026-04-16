const LOCAL_APP_BASE_URLS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
] as const

function readEnv(name: string) {
  const value = process.env[name]?.trim()
  return value || undefined
}

function toOrigin(url: string) {
  try {
    return new URL(url).origin
  } catch {
    return null
  }
}

export function getAllowedAppBaseUrls() {
  const urls = new Set<string>()
  const configuredUrl = readEnv("APP_BASE_URL")

  if (configuredUrl) {
    urls.add(configuredUrl)
  }

  if (process.env.NODE_ENV !== "production") {
    for (const localUrl of LOCAL_APP_BASE_URLS) {
      urls.add(localUrl)
    }
  }

  const allowedUrls = [...urls]

  if (allowedUrls.length === 0) {
    return undefined
  }

  return allowedUrls.length === 1 ? allowedUrls[0] : allowedUrls
}

export function getRequestAppBaseUrl(request: Request) {
  const requestOrigin = new URL(request.url).origin
  const allowedUrls = getAllowedAppBaseUrls()

  if (!allowedUrls) {
    return requestOrigin
  }

  if (typeof allowedUrls === "string") {
    return allowedUrls
  }

  const isAllowedOrigin = allowedUrls.some((url) => toOrigin(url) === requestOrigin)
  return isAllowedOrigin ? requestOrigin : allowedUrls[0]
}

export function resolveSafeReturnTo(request: Request, requestedReturnTo?: string | null) {
  const appBaseUrl = getRequestAppBaseUrl(request)
  const normalizedReturnTo = requestedReturnTo?.trim()

  if (!normalizedReturnTo) {
    return appBaseUrl
  }

  if (normalizedReturnTo.startsWith("/")) {
    return new URL(normalizedReturnTo, appBaseUrl).toString()
  }

  try {
    const parsedReturnTo = new URL(normalizedReturnTo)
    return parsedReturnTo.origin === new URL(appBaseUrl).origin ? parsedReturnTo.toString() : appBaseUrl
  } catch {
    return appBaseUrl
  }
}
