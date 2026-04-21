"use client";

import { useEffect, useState } from "react";
import { getCategoryLabel } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

const EXPENSE_CATEGORIES = [
  "食費", "住居", "水道・光熱費", "通信費", "交通費", "医療費",
  "日用品", "娯楽", "レジャー", "趣味", "教育", "自己投資",
  "保険", "税金", "交際費", "サブスク", "ペット", "美容・衣服",
  "寄付・支援", "その他",
];

type Rule = {
  id: string;
  trigger_category: string;
  target_category: string;
  reduce_ratio: number;
  is_active: boolean;
};

export default function BudgetTradeoffPanel() {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [trigger, setTrigger] = useState(EXPENSE_CATEGORIES[7]); // 娯楽
  const [target, setTarget] = useState(EXPENSE_CATEGORIES[0]);   // 食費
  const [ratio, setRatio] = useState(50); // 50%

  useEffect(() => {
    fetch("/api/budget-tradeoff")
      .then((r) => r.json())
      .then((d: { rules?: Rule[] }) => setRules(d.rules ?? []))
      .catch(() => setRules([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd() {
    if (trigger === target) {
      setStatus(t("同じカテゴリは選べません", "Trigger and target must differ"));
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/budget-tradeoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trigger_category: trigger, target_category: target, reduce_ratio: ratio / 100 }),
      });
      const data = (await res.json()) as { rule?: Rule; error?: string };
      if (!res.ok || !data.rule) throw new Error(data.error ?? t("保存失敗", "Save failed"));
      setRules((prev) => {
        const next = prev.filter((r) => !(r.trigger_category === trigger && r.target_category === target));
        return [...next, data.rule!];
      });
      setShowForm(false);
      setStatus(t("ルールを追加しました", "Rule added"));
    } catch (e) {
      setStatus(e instanceof Error ? e.message : t("保存に失敗しました", "Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(rule: Rule) {
    try {
      const res = await fetch("/api/budget-tradeoff", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rule.id, is_active: !rule.is_active }),
      });
      const data = (await res.json()) as { rule?: Rule };
      if (data.rule) setRules((prev) => prev.map((r) => (r.id === rule.id ? data.rule! : r)));
    } catch {
      setStatus(t("更新に失敗しました", "Update failed"));
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/budget-tradeoff?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setStatus(t("削除に失敗しました", "Delete failed"));
    }
  }

  if (loading) return null;

  return (
    <div className="board-card border shadow-sm rounded-[28px] p-4 bg-white">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-black">
          {t("予算トレードオフルール", "Budget tradeoff rules")}
        </p>
        <p className="mt-1 text-sm font-bold text-black">
          {t("あるカテゴリで使ったら、別のカテゴリ予算を自動削減", "Spending in one category auto-reduces another's budget")}
        </p>
      </div>

      {rules.length > 0 && (
        <div className="mt-3 space-y-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${
                rule.is_active ? "border-cyan-200 bg-cyan-50" : "border-slate-100 bg-slate-50 opacity-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black">
                  {getCategoryLabel(rule.trigger_category, lang)}
                  <span className="mx-1 text-slate-400">→</span>
                  {getCategoryLabel(rule.target_category, lang)}
                  <span className="ml-1 text-cyan-600 font-black">
                    -{Math.round(rule.reduce_ratio * 100)}%
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  {t(
                    `${getCategoryLabel(rule.trigger_category, lang)}で使った額の${Math.round(rule.reduce_ratio * 100)}%を${getCategoryLabel(rule.target_category, lang)}予算から削減`,
                    `${Math.round(rule.reduce_ratio * 100)}% of ${getCategoryLabel(rule.trigger_category, "en")} spending reduces ${getCategoryLabel(rule.target_category, "en")} budget`,
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleToggle(rule)}
                className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold transition ${
                  rule.is_active
                    ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {rule.is_active ? t("有効", "ON") : t("無効", "OFF")}
              </button>
              <button
                type="button"
                onClick={() => void handleDelete(rule.id)}
                className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <div className="mt-3 space-y-3 rounded-2xl border border-slate-200 p-3">
          <div>
            <p className="text-xs font-bold text-black mb-2">
              {t("ルール設定", "Rule setup")}
            </p>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr]">
              <label className="block">
                <span className="text-xs text-slate-500">{t("このカテゴリで使ったら", "When spending in")}</span>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
                >
                  {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{getCategoryLabel(c, lang)}</option>)}
                </select>
              </label>
              <div className="flex items-end pb-2 text-slate-400 font-bold">→</div>
              <label className="block">
                <span className="text-xs text-slate-500">{t("この予算を削減", "Reduce this budget")}</span>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
                >
                  {EXPENSE_CATEGORIES.filter((c) => c !== trigger).map((c) => (
                    <option key={c} value={c}>{getCategoryLabel(c, lang)}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-black">
              {t(`削減割合: ${ratio}%`, `Reduction ratio: ${ratio}%`)}
            </span>
            <p className="text-xs text-slate-500 mb-1">
              {t(
                `例: 娯楽で¥10,000使ったら食費予算を¥${Math.round(10000 * ratio / 100).toLocaleString()}削減`,
                `e.g. ¥${Math.round(10000 * ratio / 100).toLocaleString()} reduced for each ¥10,000 spent`,
              )}
            </p>
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-0.5">
              <span>10%</span><span>50%</span><span>100%</span>
            </div>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void handleAdd()}
              disabled={saving}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-black hover:bg-cyan-300 disabled:opacity-50"
            >
              {saving ? t("追加中...", "Adding...") : t("ルールを追加", "Add rule")}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
            >
              {t("キャンセル", "Cancel")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-3 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 hover:border-cyan-400 hover:text-cyan-700"
        >
          + {t("ルールを追加", "Add rule")}
        </button>
      )}

      {status && <p className="mt-2 text-sm font-semibold text-black">{status}</p>}
    </div>
  );
}
