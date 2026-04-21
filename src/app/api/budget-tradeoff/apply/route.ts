import { NextResponse } from "next/server";
import { getAppSessionUser } from "@/lib/auth/auth0-app-user";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * POST /api/budget-tradeoff/apply
 * トレードオフルールを適用し、対象カテゴリの予算を削減する。
 * body: { category, amount, month }
 * returns: { applied: [{ target_category, reduced_by, new_budget }] }
 */
export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const user = await getAppSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    category?: string;
    amount?: number;
    month?: string;
  };

  const category = (body.category ?? "").trim();
  const amount = Math.round(Number(body.amount));
  const month = typeof body.month === "string" ? body.month.trim() : "";

  if (!category || !amount || amount <= 0 || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // 1. 該当カテゴリの有効ルール取得
  const { data: rules, error: rulesError } = await supabaseAdmin
    .from("budget_tradeoff_rules")
    .select("*")
    .eq("user_id", user.supabaseUserId)
    .eq("trigger_category", category)
    .eq("is_active", true);

  if (rulesError) return NextResponse.json({ error: rulesError.message }, { status: 500 });
  if (!rules || rules.length === 0) return NextResponse.json({ applied: [] });

  const typedRules = rules as { id: string; target_category: string; reduce_ratio: number }[];
  const applied: { target_category: string; reduced_by: number; new_budget: number | null }[] = [];

  for (const rule of typedRules) {
    const reducedBy = Math.round(amount * Number(rule.reduce_ratio));
    if (reducedBy <= 0) continue;

    // 2. 対象カテゴリの今月予算を取得
    const { data: budget } = await supabaseAdmin
      .from("budgets")
      .select("id, amount")
      .eq("user_id", user.supabaseUserId)
      .eq("category", rule.target_category)
      .eq("month", month)
      .maybeSingle();

    if (!budget) {
      // 予算未設定の場合はスキップ（または0円で記録）
      applied.push({ target_category: rule.target_category, reduced_by: reducedBy, new_budget: null });
      continue;
    }

    const typedBudget = budget as { id: string; amount: number };
    const newAmount = Math.max(0, typedBudget.amount - reducedBy);

    // 3. 予算を削減
    const { error: updateError } = await supabaseAdmin
      .from("budgets")
      .update({ amount: newAmount } as never)
      .eq("id", typedBudget.id)
      .eq("user_id", user.supabaseUserId);

    if (updateError) continue;

    applied.push({ target_category: rule.target_category, reduced_by: reducedBy, new_budget: newAmount });
  }

  return NextResponse.json({ applied });
}
