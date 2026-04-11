import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
