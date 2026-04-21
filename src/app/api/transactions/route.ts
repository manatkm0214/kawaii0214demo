import { NextResponse } from "next/server"
import { getAppSessionUser } from "@/lib/auth/auth0-app-user"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { boundedText, readJsonBody, requireSameOrigin } from "@/lib/server/security"

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
  const originError = requireSameOrigin(request)
  if (originError) return originError

  const supabaseAdmin = getSupabaseAdmin()
  const user = await getAppSessionUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = await readJsonBody<CreateTransactionPayload>(request, 16_000)
  if (parsed.response) return parsed.response

  const body = parsed.data
  const amount = Number(body.amount)
  const date = typeof body.date === "string" ? body.date : ""
  const validTypes = new Set(["income", "expense", "saving", "investment"])

  if (!body.type || !validTypes.has(body.type) || !body.category || !Number.isFinite(amount) || amount <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid transaction payload" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("transactions")
    .insert({
      user_id: user.supabaseUserId,
      type: body.type,
      amount: Math.round(amount),
      category: boundedText(body.category, 50),
      memo: boundedText(body.memo, 500),
      payment_method: boundedText(body.payment_method, 50),
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
