"use client";

import { HOUSEHOLD_INDICATORS, BUDGET_PRESETS, CATEGORY_EXPENSE_GUIDELINES } from "@/lib/components/InputForm";
import { useLang } from "@/lib/hooks/useLang";

export default function GuidePage() {
  const lang = useLang();
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">{lang === "en" ? "Household Indicators & Guidelines" : "家計の目安・指標の解説"}</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{lang === "en" ? "Indicators" : "主な指標"}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-2 py-1">{lang === "en" ? "Name" : "指標"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Formula" : "計算式"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Ideal" : "理想値"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Description" : "説明"}</th>
              </tr>
            </thead>
            <tbody>
              {HOUSEHOLD_INDICATORS.map((i) => (
                <tr key={i.key}>
                  <td className="border px-2 py-1 font-semibold">{lang === "en" ? i.labelEn : i.labelJa}</td>
                  <td className="border px-2 py-1">{lang === "en" ? i.formulaEn : i.formulaJa}</td>
                  <td className="border px-2 py-1">{i.ideal}</td>
                  <td className="border px-2 py-1">{lang === "en" ? i.descriptionEn : i.descriptionJa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{lang === "en" ? "Budget Presets" : "配分プリセット"}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-2 py-1">{lang === "en" ? "Preset" : "プリセット"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Saving" : "貯金"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Expense" : "支出"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Investment" : "投資"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "For Whom" : "向いている人"}</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET_PRESETS.map((p) => (
                <tr key={p.key}>
                  <td className="border px-2 py-1 font-semibold">{lang === "en" ? p.labelEn : p.labelJa}</td>
                  <td className="border px-2 py-1">{p.saving}%</td>
                  <td className="border px-2 py-1">{p.expense}%</td>
                  <td className="border px-2 py-1">{p.investment}%</td>
                  <td className="border px-2 py-1">{lang === "en" ? p.descriptionEn : p.descriptionJa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{lang === "en" ? "Category Expense Guidelines" : "カテゴリ支出割合の目安"}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-2 py-1">{lang === "en" ? "Category" : "カテゴリ"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Recommended %" : "推奨割合"}</th>
                <th className="border px-2 py-1">{lang === "en" ? "Note" : "注意"}</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORY_EXPENSE_GUIDELINES.map((c) => (
                <tr key={c.key}>
                  <td className="border px-2 py-1 font-semibold">{lang === "en" ? c.labelEn : c.labelJa}</td>
                  <td className="border px-2 py-1">{c.percent}</td>
                  <td className="border px-2 py-1">{lang === "en" ? c.noteEn : c.noteJa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
