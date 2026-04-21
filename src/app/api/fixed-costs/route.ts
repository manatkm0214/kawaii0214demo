import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import type { Transaction } from "@/lib/utils"
import { requireSameOrigin } from "@/lib/server/security"

export async function POST(request: Request) {
  const originError = requireSameOrigin(request)
  if (originError) return originError

  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 今月の固定費を取得
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const { data: fixedTxns } = await supabaseAdmin
    .from("transactions")
    .select("*")
    .eq("user_id", user.supabaseUserId)
    .eq("is_fixed", true)
    .like("date", `${thisMonth}%`)

  if (!fixedTxns?.length) {
    return NextResponse.json({ message: "固定費が見つかりません", count: 0 })
  }

  // 来月の日付を計算
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const nextMonthStr = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`

  // 既に来月のコピーがないか確認
  const { data: existing } = await supabaseAdmin
    .from("transactions")
    .select("id")
    .eq("user_id", user.supabaseUserId)
    .like("date", `${nextMonthStr}%`)
    .eq("is_fixed", true)

  if (existing?.length) {
    return NextResponse.json({ message: "来月分は既に生成済みです", count: 0 })
  }

  // 来月分としてコピー
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const copies = (fixedTxns as Transaction[]).map(({ id, created_at, ...rest }) => ({
    ...rest,
    date: `${nextMonthStr}-01`,
  }))

  const { error } = await supabaseAdmin.from("transactions").insert(copies as never[])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ message: `${copies.length}件の固定費を来月分として生成しました`, count: copies.length })
}
