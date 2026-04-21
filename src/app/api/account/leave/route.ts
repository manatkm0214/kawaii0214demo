import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { readJsonBody, requireSameOrigin } from "@/lib/server/security"

export async function POST(request: Request) {
  const originError = requireSameOrigin(request)
  if (originError) return originError

  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = await readJsonBody<{ confirm?: string }>(request, 1_000)
  if (parsed.response) return parsed.response
  if (parsed.data.confirm?.trim().toUpperCase() !== "DELETE") {
    return NextResponse.json({ error: "Confirmation is required" }, { status: 400 })
  }

  const [transactionsResult, budgetsResult, profileResult] = await Promise.all([
    supabaseAdmin.from("transactions").delete().eq("user_id", user.supabaseUserId),
    supabaseAdmin.from("budgets").delete().eq("user_id", user.supabaseUserId),
    supabaseAdmin.from("profiles").delete().eq("id", user.supabaseUserId),
  ])

  const leaveError = transactionsResult.error || budgetsResult.error || profileResult.error
  if (leaveError) {
    return NextResponse.json({ error: leaveError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
