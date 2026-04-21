import { NextResponse } from "next/server";
import { getAppSessionUser } from "@/lib/auth/auth0-app-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { readJsonBody, requireSameOrigin } from "@/lib/server/security";

const VALID_ALLOCATIONS = ["saving", "carryover", "expense"] as const;
type Allocation = (typeof VALID_ALLOCATIONS)[number];

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("budget_surplus")
    .select("*")
    .eq("user_id", user.supabaseUserId)
    .order("month", { ascending: false })
    .limit(24);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ surpluses: data ?? [] });
}

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = await readJsonBody<{
    month?: string;
    amount?: number;
    allocation?: string;
    target_category?: string | null;
    note?: string;
  }>(request, 8_000);
  if (parsed.response) return parsed.response;
  const body = parsed.data;

  const month = typeof body.month === "string" ? body.month.trim() : "";
  const amount = Math.round(Number(body.amount));
  const allocation = body.allocation as Allocation;

  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "Invalid month format" }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  if (!VALID_ALLOCATIONS.includes(allocation)) {
    return NextResponse.json({ error: "Invalid allocation" }, { status: 400 });
  }
  if (allocation === "expense" && !body.target_category) {
    return NextResponse.json({ error: "target_category required for expense allocation" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("budget_surplus")
    .upsert(
      {
        user_id: user.supabaseUserId,
        month,
        amount,
        allocation,
        target_category: allocation === "expense" ? (body.target_category ?? null) : null,
        note: body.note ?? "",
      } as never,
      { onConflict: "user_id,month" },
    )
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not save surplus" }, { status: 500 });
  }

  return NextResponse.json({ surplus: data });
}

export async function DELETE(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") ?? "";

  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "Invalid month format" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("budget_surplus")
    .delete()
    .eq("user_id", user.supabaseUserId)
    .eq("month", month);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
