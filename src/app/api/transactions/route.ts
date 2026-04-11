import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

interface CreateTransactionPayload {
  type?: "income" | "expense" | "saving" | "investment"
  amount?: number
  category?: string
  memo?: string
  payment_method?: string
  is_fixed?: boolean
  date?: string
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as CreateTransactionPayload
  const amount = Number(body.amount)
  const date = typeof body.date === "string" ? body.date : ""

  if (!body.type || !body.category || !Number.isFinite(amount) || amount <= 0 || !date) {
    return NextResponse.json({ error: "Invalid transaction payload" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("transactions")
    .insert({
      user_id: user.supabaseUserId,
      type: body.type,
      amount: Math.round(amount),
      category: body.category,
      memo: body.memo ?? "",
      payment_method: body.payment_method ?? "",
      is_fixed: Boolean(body.is_fixed),
      date,
    } as never)
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not create transaction" }, { status: 500 })
  }

  return NextResponse.json({ transaction: data })
}
