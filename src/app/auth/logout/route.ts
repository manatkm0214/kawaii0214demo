import { NextResponse } from "next/server"

function readEnv(name: string) {
  const value = process.env[name]?.trim()
  return value || ""
}

export async function GET(request: Request) {
  const domain = readEnv("AUTH0_DOMAIN") || "dev-mlg3q0p27ecq1qnh.us.auth0.com"
  const clientId = readEnv("AUTH0_CLIENT_ID") || "e8qkmeBYFnNAfjDGKF7MtkwhyIY4dxrS"
  const appBaseUrl = readEnv("APP_BASE_URL") || "https://kawaii0214.vercel.app"
  const requestUrl = new URL(request.url)
  const requestedReturnTo = requestUrl.searchParams.get("returnTo")?.trim()

  if (!domain || !clientId) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  let returnTo = appBaseUrl
  if (requestedReturnTo) {
    if (requestedReturnTo.startsWith("/")) {
      returnTo = new URL(requestedReturnTo, appBaseUrl).toString()
    } else {
      try {
        const parsed = new URL(requestedReturnTo)
        if (parsed.origin === new URL(appBaseUrl).origin) {
          returnTo = parsed.toString()
        }
      } catch {
        returnTo = appBaseUrl
      }
    }
  }

  const logoutUrl = new URL(`https://${domain.replace(/^https?:\/\//, "")}/v2/logout`)
  logoutUrl.searchParams.set("client_id", clientId)
  logoutUrl.searchParams.set("returnTo", returnTo)
  return NextResponse.redirect(logoutUrl)
}
