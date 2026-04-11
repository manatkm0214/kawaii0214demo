import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

const PRESET_CATEGORY_ALIASES: Record<string, string[]> = {
  "衣服・美容": ["衣服・美容", "美容・衣服", "Beauty / clothes", "鄒主ｮｹ繝ｻ陦｣譛・"],
}

function normalizePresetCategory(category: string) {
  for (const [canonical, aliases] of Object.entries(PRESET_CATEGORY_ALIASES)) {
    if (aliases.includes(category)) return canonical
  }
  return category
}

interface PresetProfilePayload {
  display_name?: string | null
  currency?: string | null
  allocation_take_home?: number | null
  allocation_target_fixed_rate?: number | null
  allocation_target_variable_rate?: number | null
  allocation_target_savings_rate?: number | null
}

interface PresetPayload {
  currentMonth?: string
  profile?: PresetProfilePayload
  categoryRatios?: number[]
  categories?: string[]
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as PresetPayload
  const currentMonth = typeof body.currentMonth === "string" ? body.currentMonth : ""
  const categoryRatios = Array.isArray(body.categoryRatios) ? body.categoryRatios : []
  const categories = Array.isArray(body.categories) ? body.categories : []
  const profile = body.profile

  if (!currentMonth || !profile || categoryRatios.length === 0 || categories.length === 0) {
    return NextResponse.json({ error: "Invalid preset payload" }, { status: 400 })
  }

  const takeHome = Number(profile.allocation_take_home ?? 0)
  const variableRate = Number(profile.allocation_target_variable_rate ?? 0)
  const variableAmount = Math.round((takeHome * variableRate) / 100)

  const profilePayload = {
    id: user.supabaseUserId,
    display_name: profile.display_name ?? user.name,
    currency: profile.currency ?? "JPY",
    allocation_take_home: profile.allocation_take_home ?? null,
    allocation_target_fixed_rate: profile.allocation_target_fixed_rate ?? null,
    allocation_target_variable_rate: profile.allocation_target_variable_rate ?? null,
    allocation_target_savings_rate: profile.allocation_target_savings_rate ?? null,
  }

  const budgetRows = Array.from(
    categories.reduce((map, category, index) => {
      const normalizedCategory = normalizePresetCategory(category)
      const amount = Math.round((variableAmount * (categoryRatios[index] ?? 0)) / 100)
      if (amount <= 0) return map

      map.set(normalizedCategory, (map.get(normalizedCategory) ?? 0) + amount)
      return map
    }, new Map<string, number>()),
    ([category, amount]) => ({
      user_id: user.supabaseUserId,
      category,
      amount,
      month: currentMonth,
    }),
  )

  const profileResult = await supabaseAdmin.from("profiles").upsert(profilePayload as never, { onConflict: "id" })
  if (profileResult.error) {
    return NextResponse.json({ error: profileResult.error.message }, { status: 500 })
  }

  const presetDeleteCategories = Array.from(
    new Set(categories.flatMap((category) => PRESET_CATEGORY_ALIASES[normalizePresetCategory(category)] ?? [category])),
  )

  const deleteResult = await supabaseAdmin
    .from("budgets")
    .delete()
    .eq("user_id", user.supabaseUserId)
    .eq("month", currentMonth)
    .in("category", presetDeleteCategories)

  if (deleteResult.error) {
    return NextResponse.json({ error: deleteResult.error.message }, { status: 500 })
  }

  if (budgetRows.length > 0) {
    const insertResult = await supabaseAdmin.from("budgets").insert(budgetRows as never[])
    if (insertResult.error) {
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
