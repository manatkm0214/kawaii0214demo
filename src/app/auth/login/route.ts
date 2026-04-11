import { NextRequest } from "next/server"
import { auth0 } from "@/lib/auth0"

export async function GET(request: NextRequest) {
  const connection = request.nextUrl.searchParams.get("connection")
  const screenHint = request.nextUrl.searchParams.get("screen_hint")

  return auth0.startInteractiveLogin({
    authorizationParameters: {
      ...(connection ? { connection } : {}),
      ...(screenHint ? { screen_hint: screenHint } : {}),
    },
    returnTo: "/",
  })
}
