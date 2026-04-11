"use client";

import { useMemo, useState } from "react";
import { formatCurrency, type Profile } from "../utils";
import { useLang } from "@/lib/hooks/useLang";

export const PRESET_CATEGORIES = [
  "住まい",
  "食費",
  "水道・光熱",
  "交通",
  "日用品",
  "レジャー",
  "教育",
  "医療",
  "衣服・美容",
] as const;

export type PresetGoals = {
  monthlySavingsGoal: number;
  payYourselfFirstGoal: number;
  defenseMonths: number;
  passiveIncomeGoal: number;
  targetFixedRate: number;
  targetVariableRate: number;
  targetSavingRate: number;
  targetInvestingRate: number;
};

type PresetSetupResult = {
  profile: Profile;
  categoryRatios: number[];
  goals: PresetGoals;
};

type PresetSetupProps = {
  mode: "create" | "edit";
  onComplete: (result: PresetSetupResult) => void;
  onCancel: () => void;
};

type PresetKey = "standard" | "savings" | "frugal" | "fire" | "investing" | "oshi" | "custom";

type PresetDefinition = {
  labelJa: string;
  labelEn: string;
  noteJa: string;
  noteEn: string;
  theoryJa: string;
  theoryEn: string;
  fixed: number;
  variable: number;
  saving: number;
  investing: number;
  defenseMonths: number;
  passiveIncomeCoverageRate: number;
  categoryRatios: number[];
};

const CATEGORY_LABELS: Record<(typeof PRESET_CATEGORIES)[number], { ja: string; en: string }> = {
  住まい: { ja: "住まい", en: "Housing" },
  食費: { ja: "食費", en: "Food" },
  "水道・光熱": { ja: "水道・光熱", en: "Utilities" },
  交通: { ja: "交通", en: "Transport" },
  日用品: { ja: "日用品", en: "Daily goods" },
  レジャー: { ja: "レジャー", en: "Leisure" },
  教育: { ja: "教育", en: "Education" },
  医療: { ja: "医療", en: "Medical" },
  "衣服・美容": { ja: "衣服・美容", en: "Clothes / beauty" },
};

const PRESETS: Record<PresetKey, PresetDefinition> = {
  standard: { labelJa: "標準", labelEn: "Standard", noteJa: "50/30/20 ベース", noteEn: "50/30/20 base", theoryJa: "生活費 80%、貯蓄と投資 20% の基本形。", theoryEn: "Classic 50/30/20 balance.", fixed: 50, variable: 30, saving: 12, investing: 8, defenseMonths: 6, passiveIncomeCoverageRate: 10, categoryRatios: [24, 24, 10, 10, 8, 8, 6, 5, 5] },
  savings: { labelJa: "貯金重視", labelEn: "Savings", noteJa: "先取り貯金を厚く", noteEn: "More cash saving first", theoryJa: "先取り貯金を強めて現金余力を作ります。", theoryEn: "Pushes pay-yourself-first saving higher.", fixed: 45, variable: 25, saving: 20, investing: 10, defenseMonths: 8, passiveIncomeCoverageRate: 15, categoryRatios: [24, 23, 10, 9, 8, 7, 7, 6, 6] },
  frugal: { labelJa: "節約", labelEn: "Frugal", noteJa: "支出を軽くして備える", noteEn: "Lean spending, stronger buffer", theoryJa: "支出を絞って防衛資金を積みやすくします。", theoryEn: "Cuts spending and builds resilience.", fixed: 40, variable: 20, saving: 25, investing: 15, defenseMonths: 10, passiveIncomeCoverageRate: 20, categoryRatios: [26, 24, 11, 10, 9, 5, 5, 6, 4] },
  fire: { labelJa: "FIRE", labelEn: "FIRE", noteJa: "高貯蓄・高投資", noteEn: "High saving and investing", theoryJa: "高い貯蓄率で資産収入を育てる設計です。", theoryEn: "Maximizes savings to accelerate FI.", fixed: 35, variable: 15, saving: 20, investing: 30, defenseMonths: 12, passiveIncomeCoverageRate: 50, categoryRatios: [28, 22, 10, 8, 8, 5, 5, 8, 6] },
  investing: { labelJa: "投資重視", labelEn: "Investing", noteJa: "積立投資を優先", noteEn: "Investment-first tilt", theoryJa: "生活を崩さず長期投資を厚くします。", theoryEn: "Prioritizes long-term investing.", fixed: 40, variable: 20, saving: 10, investing: 30, defenseMonths: 8, passiveIncomeCoverageRate: 30, categoryRatios: [24, 22, 10, 9, 8, 8, 7, 6, 6] },
  oshi: { labelJa: "推し活向け", labelEn: "Oshi", noteJa: "楽しみ費を計画化", noteEn: "Plan fun money", theoryJa: "満足度の高い裁量支出を予算化します。", theoryEn: "Turns fun spending into a plan.", fixed: 45, variable: 30, saving: 15, investing: 10, defenseMonths: 6, passiveIncomeCoverageRate: 10, categoryRatios: [22, 22, 10, 8, 8, 16, 5, 4, 5] },
  custom: { labelJa: "カスタム", labelEn: "Custom", noteJa: "自由に調整", noteEn: "Adjust freely", theoryJa: "自分のステージに合わせて微調整します。", theoryEn: "Tune the mix to your stage.", fixed: 50, variable: 30, saving: 12, investing: 8, defenseMonths: 6, passiveIncomeCoverageRate: 15, categoryRatios: [24, 24, 10, 10, 8, 8, 6, 5, 5] },
};

function buildGoalsFromPreset(preset: PresetDefinition, takeHome: number, fixed: number, variable: number, saving: number, investing: number): PresetGoals {
  const livingCost = Math.round((takeHome * (fixed + variable)) / 100);
  return {
    monthlySavingsGoal: Math.round((takeHome * (saving + investing)) / 100),
    payYourselfFirstGoal: Math.round((takeHome * saving) / 100),
    defenseMonths: preset.defenseMonths,
    passiveIncomeGoal: Math.round((livingCost * preset.passiveIncomeCoverageRate) / 100),
    targetFixedRate: fixed,
    targetVariableRate: variable,
    targetSavingRate: saving,
    targetInvestingRate: investing,
  };
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export default function PresetSetup({ mode, onComplete, onCancel }: PresetSetupProps) {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [preset, setPreset] = useState<PresetKey>("standard");
  const [displayName, setDisplayName] = useState("");
  const [takeHome, setTakeHome] = useState(300000);
  const [fixed, setFixed] = useState(PRESETS.standard.fixed);
  const [variable, setVariable] = useState(PRESETS.standard.variable);
  const [saving, setSaving] = useState(PRESETS.standard.saving);
  const [investing, setInvesting] = useState(PRESETS.standard.investing);
  const [categoryRatios, setCategoryRatios] = useState<number[]>(PRESETS.standard.categoryRatios);
  const [goals, setGoals] = useState<PresetGoals>(() => buildGoalsFromPreset(PRESETS.standard, 300000, 50, 30, 12, 8));

  const activePreset = PRESETS[preset];
  const total = fixed + variable + saving + investing;
  const savingsTotal = saving + investing;
  const categoryTotal = categoryRatios.reduce((sum, value) => sum + value, 0);
  const variableAmount = Math.round((takeHome * variable) / 100);
  const categoryAmounts = useMemo(() => categoryRatios.map((ratio) => Math.round((variableAmount * ratio) / 100)), [categoryRatios, variableAmount]);

  function applyPreset(nextPreset: PresetKey) {
    const next = PRESETS[nextPreset];
    setPreset(nextPreset);
    setFixed(next.fixed);
    setVariable(next.variable);
    setSaving(next.saving);
    setInvesting(next.investing);
    setCategoryRatios(next.categoryRatios);
    setGoals(buildGoalsFromPreset(next, takeHome, next.fixed, next.variable, next.saving, next.investing));
  }

  function markCustom() {
    if (preset !== "custom") setPreset("custom");
  }

  function updateAllocation(setter: React.Dispatch<React.SetStateAction<number>>, value: number) {
    markCustom();
    setter(clampPercent(value));
  }

  function updateCategoryRatio(index: number, value: number) {
    markCustom();
    const next = [...categoryRatios];
    next[index] = Number.isFinite(value) ? Math.max(0, value) : 0;
    setCategoryRatios(next);
  }

  function handleComplete() {
    onComplete({
      profile: {
        id: "pending",
        display_name: displayName.trim() || null,
        currency: "JPY",
        created_at: new Date().toISOString(),
        allocation_take_home: takeHome,
        allocation_target_fixed_rate: fixed,
        allocation_target_variable_rate: variable,
        allocation_target_savings_rate: savingsTotal,
      },
      categoryRatios,
      goals: {
        ...goals,
        targetFixedRate: fixed,
        targetVariableRate: variable,
        targetSavingRate: saving,
        targetInvestingRate: investing,
      },
    });
  }

  return (
    <div className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6 text-slate-900 shadow-xl shadow-slate-200/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">{lang === "en" ? "Budget preset" : "配分プリセット"}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{mode === "create" ? t("4ステップで家計配分を決める", "Set your budget in 4 steps") : t("4ステップで配分を更新", "Update your budget in 4 steps")}</h2>
          <p className="mt-2 text-sm text-slate-600">{t("1、2、3、4と次へ押して進めます。", "Move forward through 1, 2, 3, and 4 with Next.")}</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100">
          {t("閉じる", "Close")}
        </button>
      </div>

      <div className="grid gap-2 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStep(item as 1 | 2 | 3 | 4)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
              step === item ? "border-cyan-500 bg-cyan-50 text-cyan-900" : step > item ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(Object.entries(PRESETS) as [PresetKey, PresetDefinition][]).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className={`rounded-3xl border px-4 py-4 text-left transition ${
                  preset === key ? "border-cyan-500 bg-cyan-50 text-slate-950 shadow-lg shadow-cyan-100" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{lang === "en" ? config.labelEn : config.labelJa}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] text-cyan-700">{config.fixed}/{config.variable}/{config.saving}/{config.investing}</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">{lang === "en" ? config.noteEn : config.noteJa}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{lang === "en" ? config.theoryEn : config.theoryJa}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <label className="block text-sm font-medium text-slate-800">
              {t("表示名", "Display name")}
              <input type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder={t("家計ボード", "Household Board")} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500" />
            </label>
            <label className="block text-sm font-medium text-slate-800">
              {t("月の手取り", "Monthly take-home")}
              <input type="number" value={takeHome} min={0} onChange={(event) => { setTakeHome(Number(event.target.value) || 0); markCustom(); }} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { labelJa: "固定費", labelEn: "Fixed", value: fixed, setValue: setFixed },
                { labelJa: "変動費", labelEn: "Variable", value: variable, setValue: setVariable },
                { labelJa: "貯金", labelEn: "Saving", value: saving, setValue: setSaving },
                { labelJa: "投資", labelEn: "Investing", value: investing, setValue: setInvesting },
              ].map(({ labelJa, labelEn, value, setValue }) => (
                <label key={labelJa} className="block rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800">
                  {lang === "en" ? labelEn : labelJa} %
                  <input type="number" value={value} min={0} max={100} onChange={(event) => updateAllocation(setValue, Number(event.target.value))} className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-cyan-500" />
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">{lang === "en" ? "Health check" : "チェック"}</p>
              <p className={`mt-2 text-lg font-semibold ${total === 100 ? "text-emerald-700" : "text-rose-700"}`}>{total}%</p>
              <p className="mt-1 text-xs text-slate-500">{t("合計を100%にすると次へ進めます。", "Move next when the total reaches 100%.")}</p>
            </div>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-cyan-900">{t("金額の目安", "Amount preview")}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div><p className="text-xs text-cyan-800">{t("固定費", "Fixed")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(Math.round((takeHome * fixed) / 100))}</p></div>
                <div><p className="text-xs text-cyan-800">{t("変動費", "Variable")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(variableAmount)}</p></div>
                <div><p className="text-xs text-cyan-800">{t("貯金", "Saving")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(Math.round((takeHome * saving) / 100))}</p></div>
                <div><p className="text-xs text-cyan-800">{t("投資", "Investing")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(Math.round((takeHome * investing) / 100))}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <button type="button" onClick={() => setGoals(buildGoalsFromPreset(activePreset, takeHome, fixed, variable, saving, investing))} className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-900 transition hover:bg-cyan-100">
              {t("理論値を反映", "Apply theory")}
            </button>
            {[
              { label: t("月間貯金目標", "Monthly savings goal"), value: goals.monthlySavingsGoal, key: "monthlySavingsGoal" as const },
              { label: t("先取り貯金目標", "Pay-yourself-first goal"), value: goals.payYourselfFirstGoal, key: "payYourselfFirstGoal" as const },
              { label: t("生活防衛月数", "Defense months"), value: goals.defenseMonths, key: "defenseMonths" as const },
              { label: t("受動収入目標", "Passive income goal"), value: goals.passiveIncomeGoal, key: "passiveIncomeGoal" as const },
            ].map((field) => (
              <label key={field.key} className="block rounded-2xl border border-slate-200 bg-white p-4">
                <span className="text-sm font-medium text-slate-800">{field.label}</span>
                <input type="number" min={0} value={field.value} onChange={(event) => setGoals((current) => ({ ...current, [field.key]: Math.max(0, Number(event.target.value) || 0) }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-cyan-500" />
              </label>
            ))}
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">{lang === "en" ? "Current theory" : "選択中の理論"}</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">{lang === "en" ? activePreset.labelEn : activePreset.labelJa}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{lang === "en" ? activePreset.theoryEn : activePreset.theoryJa}</p>
            </div>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-cyan-900">{t("目標の目安", "Goal preview")}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-100 bg-white p-3"><p className="text-xs text-slate-500">{t("月間貯金目標", "Monthly savings goal")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(goals.monthlySavingsGoal)}</p></div>
                <div className="rounded-2xl border border-cyan-100 bg-white p-3"><p className="text-xs text-slate-500">{t("先取り貯金目標", "Pay-yourself-first goal")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(goals.payYourselfFirstGoal)}</p></div>
                <div className="rounded-2xl border border-cyan-100 bg-white p-3"><p className="text-xs text-slate-500">{t("生活防衛月数", "Defense months")}</p><p className="mt-1 text-base font-semibold text-slate-950">{goals.defenseMonths}{lang === "en" ? " months" : "か月"}</p></div>
                <div className="rounded-2xl border border-cyan-100 bg-white p-3"><p className="text-xs text-slate-500">{t("受動収入目標", "Passive income goal")}</p><p className="mt-1 text-base font-semibold text-slate-950">{formatCurrency(goals.passiveIncomeGoal)}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{t("変動費のカテゴリ配分", "Variable spending categories")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("最後にカテゴリ配分を確認して反映します。", "Review categories before applying.")}</p>
            </div>
            <div className={`rounded-full px-4 py-2 text-xs font-semibold ${categoryTotal === 100 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>{categoryTotal}%</div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {PRESET_CATEGORIES.map((category, index) => (
              <div key={category} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{lang === "en" ? CATEGORY_LABELS[category].en : CATEGORY_LABELS[category].ja}</p>
                  <p className="text-xs text-cyan-700">{formatCurrency(categoryAmounts[index])}</p>
                </div>
                <input type="number" value={categoryRatios[index]} min={0} max={100} onChange={(event) => updateCategoryRatio(index, Number(event.target.value))} className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-cyan-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button type="button" onClick={() => setStep((current) => (current > 1 ? ((current - 1) as 1 | 2 | 3 | 4) : current))} disabled={step === 1} className="rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
            {t("戻る", "Back")}
          </button>
          {step < 4 && (
            <button type="button" onClick={() => setStep((current) => (current < 4 ? ((current + 1) as 1 | 2 | 3 | 4) : current))} disabled={step === 2 && total !== 100} className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40">
              {t("次へ", "Next")}
            </button>
          )}
        </div>
        <button type="button" onClick={handleComplete} disabled={step !== 4 || total !== 100 || categoryTotal !== 100} className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40">
          {t("反映する", "Apply")}
        </button>
      </div>
    </div>
  );
}
