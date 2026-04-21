import { NextResponse } from "next/server"
import { loadCurrentUserAppData } from "@/lib/server/app-data"

export async function GET() {
  try {
    const data = await loadCurrentUserAppData()
    if (!data) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    return NextResponse.json({
      authenticated: true,
      ...data,
    })
  } catch (error) {
    console.error("[home-data] load failed:", error)
    return NextResponse.json(
      {
        authenticated: false,
        error: "Could not load app data",
      },
      { status: 500 }
    )
  }
}
