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
    const message = error instanceof Error ? error.message : "Unknown session error"
    return NextResponse.json(
      {
        authenticated: false,
        error: message,
      },
      { status: 500 }
    )
  }
}
