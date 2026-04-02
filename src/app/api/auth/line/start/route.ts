import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

function getBaseUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (siteUrl) return siteUrl.replace(/\/$/, "")
  return "http://localhost:3000"
}

export async function GET() {
  const clientId = process.env.LINE_CHANNEL_ID?.trim()
  if (!clientId) {
    return NextResponse.json({ error: "LINE_CHANNEL_ID が設定されていません" }, { status: 500 })
  }

  const baseUrl = getBaseUrl()
  const redirectUri = `${baseUrl}/api/auth/line/callback`
  const state = randomBytes(16).toString("hex")
  const nonce = randomBytes(16).toString("hex")

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: "openid profile email",
    nonce,
    prompt: "consent",
  })

  const authUrl = `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(authUrl)}`

  const response = NextResponse.json({ authUrl, qrUrl })
  response.cookies.set("line_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  })

  response.cookies.set("line_oauth_nonce", nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  })

  return response
}
