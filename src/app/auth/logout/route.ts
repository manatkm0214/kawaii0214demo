import { NextResponse } from "next/server"
import { getRequestAppBaseUrl, resolveSafeReturnTo } from "@/lib/auth/app-base-url"

function readEnv(name: string) {
  const value = process.env[name]?.trim()
  return value || ""
}

export async function GET(request: Request) {
  const domain = readEnv("AUTH0_DOMAIN")
  const clientId = readEnv("AUTH0_CLIENT_ID")
  const requestUrl = new URL(request.url)
  const requestedReturnTo = requestUrl.searchParams.get("returnTo")

  if (!domain || !clientId) {
    return NextResponse.redirect(new URL("/", getRequestAppBaseUrl(request)))
  }

  const returnTo = resolveSafeReturnTo(request, requestedReturnTo)

  const logoutUrl = new URL(`https://${domain.replace(/^https?:\/\//, "")}/v2/logout`)
  logoutUrl.searchParams.set("client_id", clientId)
  logoutUrl.searchParams.set("returnTo", returnTo)
  return NextResponse.redirect(logoutUrl)
}
