import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL("/", request.url)
  url.searchParams.set(
    "auth_error",
    "この確認リンクは旧ログイン方式のものです。いまは Auth0 のログイン画面から続けてください。"
  )
  return NextResponse.redirect(url)
}
