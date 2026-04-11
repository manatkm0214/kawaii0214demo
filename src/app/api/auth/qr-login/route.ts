import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = new URL("/", request.url)
  url.searchParams.set(
    "auth_error",
    "QR ログインは旧方式のため停止しました。Auth0 のログイン画面から Google または LINE を使ってください。"
  )
  return NextResponse.redirect(url)
}
