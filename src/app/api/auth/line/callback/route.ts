import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = new URL("/", request.url)
  url.searchParams.set(
    "auth_error",
    "旧 LINE コールバックは停止しました。いまは Auth0 の LINE ログインから続けてください。"
  )
  return NextResponse.redirect(url)
}
