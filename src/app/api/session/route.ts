import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"

export async function GET() {
  try {
    const user = await getAppSessionUser()
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    return NextResponse.json({
      authenticated: true,
      user,
    })
  } catch (error) {
    console.error("[session] load failed:", error)
    return NextResponse.json(
      {
        authenticated: false,
        error: "Could not load session",
      },
      { status: 500 }
    )
  }
}
