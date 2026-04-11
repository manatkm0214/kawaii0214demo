import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function loadCurrentUserAppData() {
  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return null
  }

  const [{ data: profile }, { data: transactions }, { data: budgets }] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", user.supabaseUserId).maybeSingle(),
    supabaseAdmin.from("transactions").select("*").eq("user_id", user.supabaseUserId).order("date", { ascending: false }),
    supabaseAdmin.from("budgets").select("*").eq("user_id", user.supabaseUserId),
  ])

  return {
    user,
    profile: profile ?? null,
    transactions: transactions ?? [],
    budgets: budgets ?? [],
  }
}
