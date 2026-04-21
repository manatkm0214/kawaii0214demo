import { NextResponse } from "next/server";
import { getAppSessionUser } from "@/lib/auth/auth0-app-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const MONTH_RE = /^\d{4}-\d{2}$/;

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("debit_reservations")
    .select("*")
    .eq("user_id", user.supabaseUserId)
    .order("month_charged", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reservations: data ?? [] });
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    amount?: number;
    description?: string;
    card_name?: string;
    category?: string;
    month_charged?: string;
    debit_month?: string;
  };

  const amount = Math.round(Number(body.amount));
  const month_charged = typeof body.month_charged === "string" ? body.month_charged.trim() : "";
  const debit_month = typeof body.debit_month === "string" ? body.debit_month.trim() : "";

  if (!Number.isFinite(amount) || amount <= 0)
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  if (!MONTH_RE.test(month_charged) || !MONTH_RE.test(debit_month))
    return NextResponse.json({ error: "Invalid month format" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("debit_reservations")
    .insert({
      user_id: user.supabaseUserId,
      amount,
      description: (body.description ?? "").slice(0, 200),
      card_name: (body.card_name ?? "カード").slice(0, 50),
      category: (body.category ?? "その他").slice(0, 50),
      month_charged,
      debit_month,
      is_settled: false,
    } as never)
    .select()
    .single();

  if (error || !data)
    return NextResponse.json({ error: error?.message ?? "Could not create reservation" }, { status: 500 });

  return NextResponse.json({ reservation: data });
}

export async function PATCH(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { id?: string; is_settled?: boolean };
  const id = typeof body.id === "string" ? body.id.trim() : "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("debit_reservations")
    .update({ is_settled: Boolean(body.is_settled) } as never)
    .eq("id", id)
    .eq("user_id", user.supabaseUserId)
    .select()
    .single();

  if (error || !data)
    return NextResponse.json({ error: error?.message ?? "Could not update reservation" }, { status: 500 });

  return NextResponse.json({ reservation: data });
}

export async function DELETE(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("debit_reservations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.supabaseUserId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
