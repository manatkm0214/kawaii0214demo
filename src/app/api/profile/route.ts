import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

interface ProfilePayload {
  display_name?: string | null
  currency?: string | null
  allocation_take_home?: number | null
  allocation_target_fixed_rate?: number | null
  allocation_target_variable_rate?: number | null
  allocation_target_savings_rate?: number | null
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as ProfilePayload
  const payload = {
    id: user.supabaseUserId,
    display_name: body.display_name ?? user.name,
    currency: body.currency ?? "JPY",
    allocation_take_home: body.allocation_take_home ?? null,
    allocation_target_fixed_rate: body.allocation_target_fixed_rate ?? null,
    allocation_target_variable_rate: body.allocation_target_variable_rate ?? null,
    allocation_target_savings_rate: body.allocation_target_savings_rate ?? null,
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .upsert(payload as never, { onConflict: "id" })
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not save profile" }, { status: 500 })
  }

  return NextResponse.json({ profile: data })
}
