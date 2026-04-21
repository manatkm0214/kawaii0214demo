import { NextResponse } from "next/server";
import { getAppSessionUser } from "@/lib/auth/auth0-app-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("budget_tradeoff_rules")
    .select("*")
    .eq("user_id", user.supabaseUserId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rules: data ?? [] });
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    trigger_category?: string;
    target_category?: string;
    reduce_ratio?: number;
  };

  const trigger = (body.trigger_category ?? "").trim().slice(0, 50);
  const target = (body.target_category ?? "").trim().slice(0, 50);
  const ratio = Number(body.reduce_ratio);

  if (!trigger || !target) return NextResponse.json({ error: "Categories required" }, { status: 400 });
  if (trigger === target) return NextResponse.json({ error: "Trigger and target must differ" }, { status: 400 });
  if (!Number.isFinite(ratio) || ratio <= 0 || ratio > 1) return NextResponse.json({ error: "ratio must be 0-1" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("budget_tradeoff_rules")
    .upsert(
      { user_id: user.supabaseUserId, trigger_category: trigger, target_category: target, reduce_ratio: ratio, is_active: true } as never,
      { onConflict: "user_id,trigger_category,target_category" },
    )
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message ?? "Failed" }, { status: 500 });
  return NextResponse.json({ rule: data });
}

export async function PATCH(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { id?: string; is_active?: boolean };
  const id = typeof body.id === "string" ? body.id.trim() : "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("budget_tradeoff_rules")
    .update({ is_active: Boolean(body.is_active) } as never)
    .eq("id", id)
    .eq("user_id", user.supabaseUserId)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message ?? "Failed" }, { status: 500 });
  return NextResponse.json({ rule: data });
}

export async function DELETE(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("budget_tradeoff_rules")
    .delete()
    .eq("id", id)
    .eq("user_id", user.supabaseUserId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
