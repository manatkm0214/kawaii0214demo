"use client";

import { useEffect, useState } from "react";
import { formatCurrency, getCategoryLabel, type BudgetSurplus, type SurplusAllocation } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

const EXPENSE_CATEGORIES = [
  "食費", "住居", "水道・光熱費", "通信費", "交通費", "医療費",
  "日用品", "娯楽", "レジャー", "趣味", "教育", "自己投資",
  "保険", "税金", "交際費", "サブスク", "ペット", "美容・衣服",
  "寄付・支援", "その他",
];

type Props = {
  currentMonth: string;
  balance: number;
  onCarryoverLoaded?: (amount: number) => void;
};

export default function BudgetSurplusPanel({ currentMonth, balance, onCarryoverLoaded }: Props) {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  const [surpluses, setSurpluses] = useState<BudgetSurplus[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [allocation, setAllocation] = useState<SurplusAllocation>("saving");
  const [targetCategory, setTargetCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/budget-surplus")
      .then((r) => r.json())
      .then((data: { surpluses?: BudgetSurplus[] }) => {
        const list = data.surpluses ?? [];
        setSurpluses(list);

        // 前月の繰り越し分をコールバックで通知
        const [year, month] = currentMonth.split("-").map(Number);
        const prevDate = new Date(year, month - 2, 1);
        const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
        const prevSurplus = list.find((s) => s.month === prevMonth && s.allocation === "carryover");
        onCarryoverLoaded?.(prevSurplus?.amount ?? 0);
      })
      .catch(() => setSurpluses([]))
      .finally(() => setLoading(false));
  }, [currentMonth, onCarryoverLoaded]);

  const existing = surpluses.find((s) => s.month === currentMonth);

  useEffect(() => {
    if (existing) {
      setAllocation(existing.allocation);
      setTargetCategory(existing.target_category ?? EXPENSE_CATEGORIES[0]);
      setNote(existing.note);
    }
  }, [existing]);

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/budget-surplus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: currentMonth,
          amount: Math.max(balance, 0),
          allocation,
          target_category: allocation === "expense" ? targetCategory : null,
          note,
        }),
      });
      const data = (await res.json()) as { surplus?: BudgetSurplus; error?: string };
      if (!res.ok || !data.surplus) throw new Error(data.error ?? t("保存に失敗しました", "Save failed"));
      setSurpluses((prev) => {
        const next = prev.filter((s) => s.month !== currentMonth);
        return [data.surplus!, ...next];
      });
      setStatus(t("保存しました", "Saved"));
      if (allocation === "carryover") {
        onCarryoverLoaded?.(Math.max(balance, 0));
      } else {
        onCarryoverLoaded?.(0);
      }
    } catch (e) {
      setStatus(e instanceof Error ? e.message : t("保存に失敗しました", "Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch(`/api/budget-surplus?month=${currentMonth}`, { method: "DELETE" });
      if (!res.ok) throw new Error(t("削除に失敗しました", "Delete failed"));
      setSurpluses((prev) => prev.filter((s) => s.month !== currentMonth));
      setStatus(t("振り分けをリセットしました", "Allocation reset"));
      onCarryoverLoaded?.(0);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : t("削除に失敗しました", "Delete failed"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  const options: { key: SurplusAllocation; label: string; desc: string; icon: string }[] = [
    {
      key: "saving",
      label: t("貯金に回す", "Add to savings"),
      desc: t("余剰を貯蓄・投資に積み増し", "Put surplus into savings / investment"),
      icon: "🏦",
    },
    {
      key: "carryover",
      label: t("翌月に繰り越す", "Carry to next month"),
      desc: t("来月の予算として使える枠を増やす", "Expand next month's spendable budget"),
      icon: "➡️",
    },
    {
      key: "expense",
      label: t("費用に使う", "Spend on a category"),
      desc: t("特定カテゴリへの追加支出に充てる", "Allocate to a specific expense category"),
      icon: "🛒",
    },
  ];

  return (
    <div className="board-card border shadow-sm rounded-[28px] p-4 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black">
            {t("余剰予算の振り分け", "Surplus allocation")}
          </p>
          <p className="mt-1 text-lg font-black text-black">
            {balance > 0
              ? t("今月の余剰：", "This month's surplus: ") + formatCurrency(balance)
              : t("今月は余剰なし", "No surplus this month")}
          </p>
        </div>
        {existing && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            {t("設定済み", "Saved")}
          </span>
        )}
      </div>

      {balance <= 0 ? (
        <p className="mt-3 text-sm text-slate-700">
          {t("差額がプラスになると振り分けを選べます。", "Allocate when monthly balance turns positive.")}
        </p>
      ) : (
        <>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {options.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setAllocation(opt.key)}
                className={`rounded-2xl border p-3 text-left transition ${
                  allocation === opt.key
                    ? "border-cyan-400 bg-cyan-50"
                    : "border-slate-300 bg-white hover:border-slate-500"
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="mt-1 text-sm font-bold text-black">{opt.label}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-800">{opt.desc}</p>
              </button>
            ))}
          </div>

          {allocation === "expense" && (
            <div className="mt-3">
              <label className="text-xs font-bold text-black">
                {t("充てるカテゴリ", "Target category")}
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat, lang)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-3">
            <label className="text-xs font-bold text-black">{t("メモ（任意）", "Note (optional)")}</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={100}
              placeholder={t("例：旅行資金へ", "e.g. travel fund")}
              className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {saving ? t("保存中...", "Saving...") : t("振り分けを保存", "Save allocation")}
            </button>
            {existing && (
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={saving}
                className="rounded-full border border-rose-300 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
              >
                {t("リセット", "Reset")}
              </button>
            )}
          </div>

          {status && (
            <p className="mt-2 text-sm font-semibold text-black">{status}</p>
          )}
        </>
      )}

      {/* 前月繰り越し表示 */}
      {surpluses.some((s) => {
        const [year, month] = currentMonth.split("-").map(Number);
        const prevDate = new Date(year, month - 2, 1);
        const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
        return s.month === prevMonth && s.allocation === "carryover";
      }) && (
        <div className="mt-4 rounded-2xl border border-cyan-300 bg-cyan-50 px-3 py-3">
          {(() => {
            const [year, month] = currentMonth.split("-").map(Number);
            const prevDate = new Date(year, month - 2, 1);
            const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
            const prev = surpluses.find((s) => s.month === prevMonth);
            return (
              <>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                  {t("前月繰り越し分", "Carried over from last month")}
                </p>
                <p className="mt-1 text-lg font-black text-cyan-800">
                  +{formatCurrency(prev?.amount ?? 0)}
                </p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
