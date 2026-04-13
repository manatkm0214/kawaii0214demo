"use client";

import { BUDGET_PRESETS, CATEGORY_EXPENSE_GUIDELINES, HOUSEHOLD_INDICATORS } from "./InputForm";
import { useLang } from "@/lib/hooks/useLang";

export default function EconomicBenchmarkGuide() {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  const sectionBaseClass =
    "rounded-[30px] border-2 border-slate-600 p-4 shadow-[0_22px_42px_-30px_rgba(15,23,42,0.18)] md:p-5";
  const tileBaseClass =
    "rounded-[24px] border-2 border-slate-600 p-4 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.14)]";
  const heroSectionClass = `${sectionBaseClass} bg-gradient-to-br from-rose-50 via-fuchsia-50 to-sky-50`;
  const indicatorSectionClass = `${sectionBaseClass} bg-gradient-to-br from-cyan-50 via-sky-50 to-violet-50`;
  const presetSectionClass = `${sectionBaseClass} bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50`;
  const categorySectionClass = `${sectionBaseClass} bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50`;
  const statTileClass = `${tileBaseClass} bg-gradient-to-br from-rose-50 to-sky-50`;
  const indicatorTileClass = `${tileBaseClass} bg-gradient-to-br from-cyan-50 to-violet-50`;
  const presetTileClass = `${tileBaseClass} bg-gradient-to-br from-pink-50 to-orange-50`;
  const categoryTileClass = `${tileBaseClass} bg-gradient-to-br from-emerald-50 to-sky-50`;
  const overlineClass = "text-[11px] font-black uppercase tracking-[0.24em] text-black";
  const bodyClass = "text-[15px] font-semibold leading-7 text-black";

  return (
    <div className="space-y-4">
      <div className={heroSectionClass}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-black">
          {t("Benchmark", "Benchmark")}
        </p>
        <h2 className="mt-1 text-xl font-black tracking-tight text-black md:text-3xl">
          {t("家計の指標と基準", "Household indicators and benchmarks")}
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] font-medium leading-7 text-black">
          {t(
            "Inputフォームと同じ基準を一覧で確認できるページです。今の家計がどこにいるかを、指標・配分プリセット・カテゴリ目安の3方向から見比べられます。",
            "This page uses the same references as the input form so you can compare your budget from three angles: indicators, preset ratios, and category guidelines.",
          )}
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              label: t("指標", "Indicators"),
              value: HOUSEHOLD_INDICATORS.length,
              note: t("家計の見方", "Ways to read your budget"),
              surface: "bg-gradient-to-br from-rose-50 to-fuchsia-50",
            },
            {
              label: t("配分プリセット", "Presets"),
              value: BUDGET_PRESETS.length,
              note: t("Inputフォームと同じ配分", "Same ratios as the input form"),
              surface: "bg-gradient-to-br from-fuchsia-50 to-sky-50",
            },
            {
              label: t("カテゴリ目安", "Category guides"),
              value: CATEGORY_EXPENSE_GUIDELINES.length,
              note: t("支出の基準線", "Reference share by category"),
              surface: "bg-gradient-to-br from-amber-50 to-sky-50",
            },
          ].map((item) => (
            <div key={item.label} className={`${statTileClass} ${item.surface}`}>
              <p className={overlineClass}>{item.label}</p>
              <p className="mt-3 text-3xl font-black leading-none text-black">{item.value}</p>
              <p className="mt-3 text-sm font-semibold text-black">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      <section className={indicatorSectionClass}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={overlineClass}>{t("Indicators", "Indicators")}</p>
            <h3 className="mt-1 text-lg font-black tracking-tight text-black md:text-xl">
              {t("経済指標の基準", "Indicator benchmarks")}
            </h3>
          </div>
          <p className="text-sm font-semibold text-black">
            {t(
              "数値は目安です。暮らし方や家族構成に合わせて調整してください。",
              "These numbers are guides, not hard rules. Adjust them to your life stage.",
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          {HOUSEHOLD_INDICATORS.map((item) => (
            <article key={item.key} className={indicatorTileClass}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-black tracking-tight text-black">
                    {lang === "en" ? item.labelEn : item.labelJa}
                  </p>
                  <p className={`mt-3 ${overlineClass}`}>{t("Formula", "Formula")}</p>
                  <p className="mt-1 rounded-2xl border-2 border-slate-600 bg-cyan-50 px-3 py-2 font-mono text-[13px] font-semibold text-black">
                    {lang === "en" ? item.formulaEn : item.formulaJa}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-cyan-400 bg-cyan-100 px-3 py-1 text-xs font-black text-black">
                  {item.ideal}
                </span>
              </div>
              <p className={`mt-4 ${bodyClass}`}>{lang === "en" ? item.descriptionEn : item.descriptionJa}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={presetSectionClass}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={overlineClass}>{t("Presets", "Presets")}</p>
            <h3 className="mt-1 text-lg font-black tracking-tight text-black md:text-xl">
              {t("配分プリセットの基準", "Budget preset balance")}
            </h3>
          </div>
          <p className="text-sm font-semibold text-black">
            {t(
              "貯金・支出・投資の目安配分です。Inputフォームのプリセットと同じ値を表示しています。",
              "These are the same savings, expense, and investment ratios used by the input form presets.",
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {BUDGET_PRESETS.map((preset) => (
            <article key={preset.key} className={presetTileClass}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black tracking-tight text-black">
                    {lang === "en" ? preset.labelEn : preset.labelJa}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-black">
                    {lang === "en" ? preset.descriptionEn : preset.descriptionJa}
                  </p>
                </div>
                <span className="rounded-full border border-pink-400 bg-pink-100 px-3 py-1 text-xs font-black text-black">
                  {t("Preset", "Preset")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: t("貯金", "Saving"), value: preset.saving, surface: "bg-cyan-50" },
                  { label: t("支出", "Expense"), value: preset.expense, surface: "bg-amber-50" },
                  { label: t("投資", "Investment"), value: preset.investment, surface: "bg-violet-50" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl border-2 border-slate-600 px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] ${item.surface}`}
                  >
                    <p className={overlineClass}>{item.label}</p>
                    <p className="mt-2 text-xl font-black text-black">{item.value}%</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={categorySectionClass}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={overlineClass}>{t("Categories", "Categories")}</p>
            <h3 className="mt-1 text-lg font-black tracking-tight text-black md:text-xl">
              {t("カテゴリ別の支出目安", "Category expense guidelines")}
            </h3>
          </div>
          <p className="text-sm font-semibold text-black">
            {t(
              "家計を崩しにくい比率の目安です。住んでいる地域や固定費の強さで前後します。",
              "These ratios help keep a budget stable, though local costs and fixed obligations may shift them.",
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORY_EXPENSE_GUIDELINES.map((item) => (
            <article key={item.key} className={categoryTileClass}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-black tracking-tight text-black">
                  {lang === "en" ? item.labelEn : item.labelJa}
                </p>
                <span className="rounded-full border border-emerald-400 bg-emerald-100 px-3 py-1 text-xs font-black text-black">
                  {item.percent}
                </span>
              </div>
              <p className={`mt-4 ${bodyClass}`}>{lang === "en" ? item.noteEn : item.noteJa}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
