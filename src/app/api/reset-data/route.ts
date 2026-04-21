import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { requireSameOrigin } from "@/lib/server/security"

export async function POST(request: Request) {
  const originError = requireSameOrigin(request)
  if (originError) return originError

  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("display_name, currency")
    .eq("id", user.supabaseUserId)
    .maybeSingle()
  const currentProfile = profile as { display_name?: string | null; currency?: string | null } | null

  const resetProfilePayload = {
    id: user.supabaseUserId,
    display_name: currentProfile?.display_name ?? user.name,
    currency: currentProfile?.currency ?? "JPY",
    allocation_take_home: null,
    allocation_target_fixed_rate: null,
    allocation_target_variable_rate: null,
    allocation_target_savings_rate: null,
  }

  const [transactionsResult, budgetsResult, profileResult] = await Promise.all([
    supabaseAdmin.from("transactions").delete().eq("user_id", user.supabaseUserId),
    supabaseAdmin.from("budgets").delete().eq("user_id", user.supabaseUserId),
    supabaseAdmin.from("profiles").upsert(resetProfilePayload as never, { onConflict: "id" }),
  ])

  const resetError = transactionsResult.error || budgetsResult.error || profileResult.error
  if (resetError) {
    return NextResponse.json({ error: resetError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
