"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

export type KidsExpenseCategory = "snack" | "toy" | "book" | "game" | "school" | "other";

export type KidsExpense = {
  id: string;
  date: string;
  amount: number;
  category: KidsExpenseCategory;
  memo?: string;
};

type Props = {
  onAdd: (item: KidsExpense) => void;
};

const EXPENSE_OPTIONS: Record<KidsExpenseCategory, { ja: string; en: string }> = {
  snack: { ja: "おかし", en: "Snack" },
  toy: { ja: "おもちゃ", en: "Toy" },
  book: { ja: "本", en: "Book" },
  game: { ja: "ゲーム", en: "Game" },
  school: { ja: "学校", en: "School" },
  other: { ja: "そのほか", en: "Other" },
};

const UNITS = [
  { factor: 1, ja: "円", en: "Yen" },
  { factor: 1000, ja: "千円", en: "1K" },
  { factor: 10000, ja: "万円", en: "10K" },
] as const;

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function KidsExpenseForm({ onAdd }: Props) {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<number>(1);
  const [category, setCategory] = useState<KidsExpenseCategory>("snack");
  const [date, setDate] = useState(today());
  const [memo, setMemo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNumber = Number(amount) * unit;
    if (!amountNumber || amountNumber <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      amount: amountNumber,
      category,
      date,
      memo: memo.trim(),
    });

    setAmount("");
    setUnit(1);
    setMemo("");
    setCategory("snack");
    setDate(today());
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
      <h2 className="text-lg font-bold text-slate-900">{t("ししゅつを追加", "Add expense")}</h2>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("金額", "Amount")}</span>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder={t("例: 300", "e.g. 300")}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
            />
            <div className="grid grid-cols-3 gap-2">
              {UNITS.map((option) => (
                <button
                  key={option.factor}
                  type="button"
                  onClick={() => setUnit(option.factor)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                    unit === option.factor
                      ? "border-cyan-600 bg-cyan-50 text-cyan-900"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {lang === "en" ? option.en : option.ja}
                </button>
              ))}
            </div>
          </div>
          {amount && (
            <p className="mt-2 text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(amount || 0) * unit)}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("種類", "Category")}</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as KidsExpenseCategory)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
          >
            {Object.entries(EXPENSE_OPTIONS).map(([value, labels]) => (
              <option key={value} value={value}>
                {lang === "en" ? labels.en : labels.ja}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("日付", "Date")}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("メモ", "Memo")}</span>
          <input
            type="text"
            placeholder={t("例: おかし、本、ゲーム", "e.g. snack, book, game")}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </label>
      </div>

      <button type="submit" className="mt-4 rounded-2xl bg-rose-500 px-5 py-3 font-bold text-white">
        {t("ししゅつを保存", "Save expense")}
      </button>
    </form>
  );
}
