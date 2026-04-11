"use client";

import { useState } from "react";
import type { KidsSavingsGoal } from "../types/kids-finance";
import { formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

type Props = {
  currentGoal: KidsSavingsGoal;
  monthlyBudget: number;
  onUpdateGoal: (goal: KidsSavingsGoal) => void;
  onUpdateBudget: (budget: number) => void;
};

const UNITS = [
  { factor: 1, ja: "円", en: "Yen" },
  { factor: 1000, ja: "千円", en: "1K" },
  { factor: 10000, ja: "万円", en: "10K" },
] as const;

export function KidsGoalForm({ currentGoal, monthlyBudget, onUpdateGoal, onUpdateBudget }: Props) {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);
  const [title, setTitle] = useState(currentGoal.title);
  const [targetAmount, setTargetAmount] = useState(String(currentGoal.targetAmount || ""));
  const [targetUnit, setTargetUnit] = useState<number>(1);
  const [budget, setBudget] = useState(String(monthlyBudget || ""));
  const [budgetUnit, setBudgetUnit] = useState<number>(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = Number(targetAmount) * targetUnit;
    const budgetNumber = Number(budget) * budgetUnit;

    if (!title.trim()) return;
    if (!target || target <= 0) return;
    if (!budgetNumber || budgetNumber <= 0) return;

    onUpdateGoal({
      title: title.trim(),
      targetAmount: target,
      currentAmount: currentGoal.currentAmount,
    });

    onUpdateBudget(budgetNumber);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
      <h2 className="text-lg font-bold text-slate-900">{t("もくひょう設定", "Set goal")}</h2>

      <div className="mt-4 grid gap-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("目標名", "Goal name")}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("ほしいもの", "What you want")}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("目標金額", "Target amount")}</span>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="number"
              min="0"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder={t("例: 5000", "e.g. 5000")}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
            />
            <div className="grid grid-cols-3 gap-2">
              {UNITS.map((option) => (
                <button
                  key={`target-${option.factor}`}
                  type="button"
                  onClick={() => setTargetUnit(option.factor)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                    targetUnit === option.factor
                      ? "border-cyan-600 bg-cyan-50 text-cyan-900"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {lang === "en" ? option.en : option.ja}
                </button>
              ))}
            </div>
          </div>
          {targetAmount && (
            <p className="mt-2 text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(targetAmount || 0) * targetUnit)}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("月の予算", "Monthly budget")}</span>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="number"
              min="0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder={t("例: 3000", "e.g. 3000")}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
            />
            <div className="grid grid-cols-3 gap-2">
              {UNITS.map((option) => (
                <button
                  key={`budget-${option.factor}`}
                  type="button"
                  onClick={() => setBudgetUnit(option.factor)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                    budgetUnit === option.factor
                      ? "border-cyan-600 bg-cyan-50 text-cyan-900"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {lang === "en" ? option.en : option.ja}
                </button>
              ))}
            </div>
          </div>
          {budget && (
            <p className="mt-2 text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(budget || 0) * budgetUnit)}</p>
          )}
        </label>
      </div>

      <button type="submit" className="mt-4 rounded-2xl bg-violet-600 px-5 py-3 font-bold text-white">
        {t("目標を保存", "Save goal")}
      </button>
    </form>
  );
}
