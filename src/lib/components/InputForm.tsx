
"use client";

// 家計の目安・指標定義
export const HOUSEHOLD_INDICATORS = [
  {
    key: "savingRate",
    labelJa: "貯蓄率",
    labelEn: "Saving Rate",
    formulaJa: "貯金÷収入×100",
    formulaEn: "Savings ÷ Income × 100",
    ideal: "20%以上",
    descriptionJa: "収入に対する貯金の割合。20%以上が理想。",
    descriptionEn: "The ratio of savings to income. 20% or more is ideal.",
  },
  {
    key: "fixedCostRate",
    labelJa: "固定費率",
    labelEn: "Fixed Cost Rate",
    formulaJa: "固定費÷収入×100",
    formulaEn: "Fixed Costs ÷ Income × 100",
    ideal: "40%以下",
    descriptionJa: "収入に対する固定費の割合。40%以下が理想。",
    descriptionEn: "The ratio of fixed costs to income. 40% or less is ideal.",
  },
  {
    key: "wasteRate",
    labelJa: "浪費率",
    labelEn: "Waste Rate",
    formulaJa: "娯楽費÷支出×100",
    formulaEn: "Entertainment ÷ Expenses × 100",
    ideal: "15%以下",
    descriptionJa: "支出に占める娯楽費の割合。15%以下が理想。",
    descriptionEn: "The ratio of entertainment expenses to total expenses. 15% or less is ideal.",
  },
  {
    key: "savingEfficiency",
    labelJa: "節約率",
    labelEn: "Saving Efficiency",
    formulaJa: "（予算-実績）÷予算×100",
    formulaEn: "(Budget - Actual) ÷ Budget × 100",
    ideal: "0%以上",
    descriptionJa: "予算に対してどれだけ節約できたか。0%以上が理想。",
    descriptionEn: "How much you saved compared to your budget. 0% or more is ideal.",
  },
  {
    key: "advanceSavingAchievement",
    labelJa: "先取り貯金達成度",
    labelEn: "Advance Saving Achievement",
    formulaJa: "実際の先取り貯金÷目標×100",
    formulaEn: "Actual Advance Savings ÷ Target × 100",
    ideal: "100%",
    descriptionJa: "目標に対して先取り貯金がどれだけ達成できたか。",
    descriptionEn: "How much of your advance saving target you achieved.",
  },
  {
    key: "defenseFundAchievement",
    labelJa: "防衛資金達成度",
    labelEn: "Emergency Fund Achievement",
    formulaJa: "累計貯金÷（月支出×防衛月数）×100",
    formulaEn: "Total Savings ÷ (Monthly Expenses × Target Months) × 100",
    ideal: "100%",
    descriptionJa: "生活防衛資金（緊急時の備え）が目標に対してどれだけあるか。",
    descriptionEn: "How much of your emergency fund target you have achieved.",
  },
  {
    key: "passiveIncomeRate",
    labelJa: "受動収入率",
    labelEn: "Passive Income Rate",
    formulaJa: "受動収入÷収入×100",
    formulaEn: "Passive Income ÷ Income × 100",
    ideal: "10%以上で優秀",
    descriptionJa: "収入に対する受動収入の割合。10%以上で優秀。",
    descriptionEn: "The ratio of passive income to total income. 10% or more is excellent.",
  },
  {
    key: "incomeStability",
    labelJa: "収支安定性",
    labelEn: "Income/Expense Stability",
    formulaJa: "過去3ヶ月の収支の標準偏差",
    formulaEn: "Standard deviation of income/expenses over the past 3 months",
    ideal: "低いほど安定",
    descriptionJa: "過去3ヶ月の収支の変動幅。低いほど安定。安定していない場合は、支出や収入を見直して安定化を目指そう。",
    descriptionEn: "Standard deviation of income/expenses over the past 3 months. Lower is more stable. If not stable, review your income and expenses to improve stability.",
  },
  // 追加: 現時点の生活防衛資金
  {
    key: "currentEmergencyFund",
    labelJa: "現時点の生活防衛資金",
    labelEn: "Current Emergency Fund",
    formulaJa: "今ある貯蓄＋投資の合計",
    formulaEn: "Current Savings + Investments",
    ideal: "月支出の6ヶ月分以上",
    descriptionJa: "今ある貯蓄と投資の合計額。0円なら足りない分を追加しよう。",
    descriptionEn: "Total of current savings and investments. If 0 yen, add more to reach your goal.",
  },
];

// 配分プリセット
export const BUDGET_PRESETS = [
  {
    key: "standard",
    labelJa: "標準",
    labelEn: "Standard",
    saving: 20,
    expense: 70,
    investment: 10,
    descriptionJa: "安定収入・バランス重視",
    descriptionEn: "Stable income, balanced focus",
  },
  {
    key: "saving",
    labelJa: "貯金重視",
    labelEn: "Saving Focused",
    saving: 40,
    expense: 50,
    investment: 10,
    descriptionJa: "目標額がある・住宅購入準備",
    descriptionEn: "For those with a savings goal or preparing to buy a house",
  },
  {
    key: "frugal",
    labelJa: "節約",
    labelEn: "Frugal",
    saving: 30,
    expense: 65,
    investment: 5,
    descriptionJa: "収入が不安定・緊急時",
    descriptionEn: "For unstable income or emergencies",
  },
  {
    key: "fire",
    labelJa: "FIRE・投資重視",
    labelEn: "FIRE/Investment Focused",
    saving: 10,
    expense: 60,
    investment: 30,
    descriptionJa: "FIRE志向・高収入層",
    descriptionEn: "FIRE-oriented, high income",
  },
  {
    key: "enjoy",
    labelJa: "今を楽しむ",
    labelEn: "Enjoy Now",
    saving: 15,
    expense: 80,
    investment: 5,
    descriptionJa: "若手・習慣づけ重視",
    descriptionEn: "Young people, habit building",
  },
];

// カテゴリ支出割合の目安
export const CATEGORY_EXPENSE_GUIDELINES = [
  {
    key: "housing",
    labelJa: "住居費",
    labelEn: "Housing",
    percent: "25〜30%",
    noteJa: "収入の30%を超えると要注意",
    noteEn: "Be careful if over 30% of income",
  },
  {
    key: "food",
    labelJa: "食費",
    labelEn: "Food",
    percent: "15〜20%",
    noteJa: "外食含む",
    noteEn: "Includes eating out",
  },
  {
    key: "water",
    labelJa: "水道費",
    labelEn: "Water",
    percent: "1〜2%",
    noteJa: "2ヶ月分請求あり",
    noteEn: "Billed every 2 months",
  },
  {
    key: "electricity",
    labelJa: "電気代",
    labelEn: "Electricity",
    percent: "2〜4%",
    noteJa: "季節変動大",
    noteEn: "Large seasonal variation",
  },
  {
    key: "gas",
    labelJa: "ガス代",
    labelEn: "Gas",
    percent: "1〜3%",
    noteJa: "冬は高め",
    noteEn: "Higher in winter",
  },
  {
    key: "communication",
    labelJa: "通信費",
    labelEn: "Communication",
    percent: "3〜5%",
    noteJa: "格安SIM推奨",
    noteEn: "Low-cost SIM recommended",
  },
  {
    key: "entertainment",
    labelJa: "娯楽",
    labelEn: "Entertainment",
    percent: "10〜15%",
    noteJa: "浪費率に影響",
    noteEn: "Affects waste rate",
  },
  {
    key: "medical",
    labelJa: "医療・健康",
    labelEn: "Medical/Health",
    percent: "3〜5%",
    noteJa: "予防投資として重要、足りない場合は他カテゴリから補う",
    noteEn: "Important as preventive investment; supplement from other categories if insufficient",
  },
];
import { useEffect, useState } from "react";
import { AI_INPUT_DRAFT_EVENT, type AIInputDraft } from "@/lib/aiInputDraft";
import { CATEGORY_LABELS, CATEGORIES, CHARGE_PAYMENT_METHODS, getCategoryLabel, getPaymentMethodLabel, PAYMENT_METHODS, TabType, Transaction, TransactionType } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";
import { useAIProvider } from "@/lib/hooks/useAIProvider";
import { useBoardTheme } from "@/lib/hooks/useBoardTheme";

interface Props {
  onSuccess: (tx: Transaction) => void;
  recentTransactions: Transaction[];
}

const UNITS = [
  { labelJa: "円", labelEn: "Yen", factor: 1 },
  { labelJa: "千円", labelEn: "1K", factor: 1000 },
  { labelJa: "万円", labelEn: "10K", factor: 10000 },
] as const;

const TAB_LABELS: { key: TabType; emoji: string; ja: string; en: string }[] = [
  { key: "income", emoji: "+", ja: "収入", en: "Income" },
  { key: "expense", emoji: "-", ja: "支出", en: "Expense" },
  { key: "saving", emoji: "S", ja: "貯蓄", en: "Savings" },
  { key: "investment", emoji: "I", ja: "投資", en: "Invest" },
  { key: "fixed", emoji: "F", ja: "固定費", en: "Fixed" },
];

const CATEGORY_KEYWORDS: Record<TransactionType, Array<{ category: string; keywords: string[] }>> = {
  income: [
    { category: "給与", keywords: ["給料", "給与", "賞与", "ボーナス", "salary"] },
    { category: "副業", keywords: ["副業", "フリーランス", "案件", "side"] },
    { category: "年金", keywords: ["年金", "pension"] },
    { category: "臨時収入", keywords: ["返金", "キャッシュバック", "臨時", "bonus"] },
  ],
  expense: [
    { category: "食費", keywords: ["スーパー", "コンビニ", "ランチ", "夕飯", "カフェ", "ごはん", "食材", "food"] },
    { category: "住居", keywords: ["家賃", "住宅", "住居", "rent"] },
    { category: "水道・光熱費", keywords: ["電気", "ガス", "水道", "光熱", "utility"] },
    { category: "通信費", keywords: ["スマホ", "携帯", "ネット", "wifi", "通信"] },
    { category: "交通費", keywords: ["電車", "バス", "タクシー", "ガソリン", "交通", "train"] },
    { category: "医療費", keywords: ["病院", "薬", "診療", "歯医者", "medical"] },
    { category: "日用品", keywords: ["洗剤", "ティッシュ", "シャンプー", "日用品"] },
    { category: "美容・衣服", keywords: ["服", "コスメ", "美容", "美容院", "shirt", "dress"] },
    { category: "娯楽", keywords: ["映画", "ライブ", "ゲーム", "entertainment"] },
  ],
  saving: [
    { category: "先取り貯金", keywords: ["先取り", "貯金", "saving"] },
    { category: "積立", keywords: ["積立", "つみたて"] },
    { category: "生活防衛費", keywords: ["防衛", "緊急", "emergency"] },
  ],
  investment: [
    { category: "つみたてNISA", keywords: ["nisa", "つみたてnisa"] },
    { category: "iDeCo", keywords: ["ideco"] },
    { category: "株式", keywords: ["株", "stock"] },
    { category: "投資信託", keywords: ["投信", "ファンド", "fund"] },
    { category: "暗号資産", keywords: ["btc", "eth", "暗号", "crypto"] },
  ],
};

function resolveSuggestedCategory(raw: string, currentCategories: string[]) {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return "";

  const exact = currentCategories.find((item) => item.toLowerCase() === normalized);
  if (exact) return exact;

  const labelMatch = currentCategories.find((item) => {
    const labels = CATEGORY_LABELS[item];
    if (!labels) return false;
    return labels.ja.toLowerCase() === normalized || labels.en.toLowerCase() === normalized;
  });
  if (labelMatch) return labelMatch;

  const partial = currentCategories.find((item) => {
    const labels = CATEGORY_LABELS[item];
    return item.toLowerCase().includes(normalized)
      || normalized.includes(item.toLowerCase())
      || (labels ? labels.en.toLowerCase().includes(normalized) || normalized.includes(labels.en.toLowerCase()) : false);
  });
  return partial ?? "";
}

function localGuessCategory(memo: string, type: TransactionType, currentCategories: string[]) {
  const normalized = memo.trim().toLowerCase();
  if (!normalized) return "";

  const matched = CATEGORY_KEYWORDS[type].find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  if (!matched) return currentCategories[0] ?? "";
  return matched.category;
}

function buildSuggestedCategories(raw: string, memo: string, type: TransactionType, currentCategories: string[]) {
  const suggestions: string[] = [];

  const pushUnique = (value: string) => {
    if (!value) return;
    if (!currentCategories.includes(value)) return;
    if (!suggestions.includes(value)) suggestions.push(value);
  };

  pushUnique(resolveSuggestedCategory(raw, currentCategories));
  pushUnique(localGuessCategory(memo, type, currentCategories));

  CATEGORY_KEYWORDS[type].forEach((entry) => {
    if (entry.keywords.some((keyword) => memo.trim().toLowerCase().includes(keyword))) {
      pushUnique(entry.category);
    }
  });

  currentCategories.forEach((item) => pushUnique(item));
  return suggestions.slice(0, 3);
}


const INTERACTIVE_BUTTON = "relative z-10 cursor-pointer touch-manipulation pointer-events-auto";

export default function InputForm({ onSuccess, recentTransactions }: Props) {
  const lang = useLang();
  const aiProvider = useAIProvider();
  useBoardTheme(); // ボード背景CSS変数を適用
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  const [tab, setTab] = useState<TabType>("expense");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState(1);
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [payment, setPayment] = useState<string>(PAYMENT_METHODS[0]);
  const [isFixed, setIsFixed] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);

  const currentType = tab === "fixed" ? "expense" : tab;
  const currentCategories = CATEGORIES[currentType] ?? [];
  const recentCategories = [...new Set(recentTransactions.filter((tx) => tx.type === currentType).map((tx) => tx.category))].slice(0, 6);

  useEffect(() => {
    function handleDraft(event: Event) {
      const detail = (event as CustomEvent<AIInputDraft>).detail;
      if (!detail) return;

      const nextTab = detail.tab ?? "expense";
      const nextType: TransactionType = nextTab === "fixed" ? "expense" : nextTab;
      const nextCategories = CATEGORIES[nextType] ?? [];
      const nextMemo = detail.memo ?? "";
      const nextSuggestions = buildSuggestedCategories(detail.category ?? "", nextMemo, nextType, nextCategories);

      setTab(nextTab);
      setAmount(detail.amount && detail.amount > 0 ? String(Math.round(detail.amount)) : "");
      setMemo(nextMemo);
      setPayment(detail.payment && PAYMENT_METHODS.includes(detail.payment as (typeof PAYMENT_METHODS)[number]) ? detail.payment : PAYMENT_METHODS[0]);
      setIsFixed(Boolean(detail.isFixed || nextTab === "fixed"));
      setDate(detail.date ?? new Date().toISOString().split("T")[0]);
      setSuggestedCategories(nextSuggestions);
      setCategory(nextSuggestions[0] ?? "");
    }

    window.addEventListener(AI_INPUT_DRAFT_EVENT, handleDraft as EventListener);
    return () => window.removeEventListener(AI_INPUT_DRAFT_EVENT, handleDraft as EventListener);
  }, []);

  async function aiGuessCategory() {
    if (!memo) return;
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          provider: aiProvider,
          data: {
            memo,
            transactionType: currentType,
            categories: currentCategories,
          },
        }),
      });
      const { result } = await response.json();
      const nextSuggestions = buildSuggestedCategories(String(result ?? ""), memo, currentType, currentCategories);
      setSuggestedCategories(nextSuggestions);
      setCategory(nextSuggestions[0] ?? "");
    } catch {
      const nextSuggestions = buildSuggestedCategories("", memo, currentType, currentCategories);
      setSuggestedCategories(nextSuggestions);
      setCategory(nextSuggestions[0] ?? "");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit() {
    if (!amount || !category) {
      alert(t("金額とカテゴリを入力してください", "Please enter an amount and category"));
      return;
    }

    setLoading(true);
    const realAmount = Number(amount) * unit;
    const type: TabType = tab === "fixed" ? "expense" : tab;

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        amount: realAmount,
        category,
        memo,
        payment_method: payment,
        is_fixed: isFixed || tab === "fixed",
        date,
      }),
    });

    const payload = await response.json();

    setLoading(false);

    if (!response.ok || !payload.transaction) {
      if (response.status === 401) {
        alert(t("ログインしてください", "Please log in"));
        return;
      }
      const message = typeof payload?.error === "string" ? payload.error : t("保存に失敗しました", "Save failed");
      alert(`${t("保存に失敗しました", "Save failed")}: ${message}`);
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("kakeibo-just-saved", "1");
      window.dispatchEvent(new Event("kakeibo-data-updated"));
    }

    onSuccess(payload.transaction);
    setAmount("");
    setMemo("");
    setCategory("");
    setSuggestedCategories([]);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);

    // 支出の場合: トレードオフルールを非同期で適用（失敗しても無視）
    if ((tab === "expense" || tab === "fixed") && category) {
      const txMonth = date.slice(0, 7);
      fetch("/api/budget-tradeoff/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount: realAmount, month: txMonth }),
      })
        .then((r) => r.json())
        .then((d: { applied?: { target_category: string; reduced_by: number }[] }) => {
          if (d.applied && d.applied.length > 0) {
            window.dispatchEvent(new CustomEvent("kakeibo-tradeoff-applied", { detail: d.applied }));
            window.dispatchEvent(new Event("kakeibo-data-updated"));
          }
        })
        .catch(() => undefined);
    }
  }

  // CSS変数からボード背景を取得しスタイルとして適用
  const boardStyle = {
    background: "var(--board-bg)",
    borderColor: "var(--board-border)",
  } as React.CSSProperties;

  const surfaceStyle = {
    background: "var(--board-surface)",
    borderColor: "var(--board-border)",
  } as React.CSSProperties;

  return (
    <div
      className="animate-slide-up isolate space-y-4 rounded-[28px] border p-4 shadow-lg md:p-6"
      style={boardStyle}
    >
      {/* タブ */}
      <div className="relative z-10 flex flex-wrap gap-2 rounded-3xl border p-1.5" style={surfaceStyle}>
        {TAB_LABELS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setTab(item.key);
              setCategory("");
              setSuggestedCategories([]);
            }}
            className={`${INTERACTIVE_BUTTON} flex min-w-18 flex-1 items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
              tab === item.key
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            <span className="text-xs font-bold">{item.emoji}</span>
            <span>{lang === "en" ? item.en : item.ja}</span>
          </button>
        ))}
      </div>

      {/* 金額・単位 */}
      <div className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("金額", "Amount")}</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={t("例: 1200", "e.g. 1200")}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-xl font-bold text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </label>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("単位", "Unit")}</span>
          <div className="grid grid-cols-3 gap-1.5">
            {UNITS.map((option) => (
              <button
                key={option.factor}
                type="button"
                onClick={() => setUnit(option.factor)}
                className={`${INTERACTIVE_BUTTON} rounded-2xl border py-3.5 text-xs font-bold transition ${
                  unit === option.factor
                    ? "border-cyan-400 bg-cyan-500 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
                }`}
              >
                {lang === "en" ? option.labelEn : option.labelJa}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* メモ・AI */}
      <div className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("メモ", "Memo")}</span>
          <input
            type="text"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            placeholder={t("例: スーパー、定期券、NISA", "e.g. grocery, commute, NISA")}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </label>
        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI</span>
          <button
            type="button"
            onClick={aiGuessCategory}
            disabled={aiLoading || !memo}
            className={`${INTERACTIVE_BUTTON} w-full rounded-2xl border border-cyan-300 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {aiLoading ? t("判定中...", "Checking...") : t("カテゴリを推測", "Suggest")}
          </button>
        </div>
      </div>

      {/* カテゴリ */}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("カテゴリ", "Category")}</span>
          {recentCategories.length > 0 && (
            <span className="text-xs text-slate-400">{t("最近", "Recent")}</span>
          )}
        </div>

        {suggestedCategories.length > 0 && (
          <div className="mb-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-800">{t("推測候補", "Suggested")}</span>
              <span className="text-xs text-cyan-600">{t("最後は本人が選択", "Final choice is yours")}</span>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              {suggestedCategories.map((item, index) => (
                <button
                  key={`suggested-${item}`}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`${INTERACTIVE_BUTTON} rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    category === item
                      ? "border-cyan-500 bg-cyan-500 text-white"
                      : "border-cyan-300 bg-white text-cyan-700 hover:bg-cyan-100"
                  }`}
                >
                  {index === 0 ? "①" : index === 1 ? "②" : "③"} {getCategoryLabel(item, lang)}
                </button>
              ))}
            </div>
          </div>
        )}

        {recentCategories.length > 0 && (
          <div className="relative z-10 mb-2 flex flex-wrap gap-1.5">
            {recentCategories.map((recent) => (
              <button
                key={recent}
                type="button"
                onClick={() => setCategory(recent)}
                className={`${INTERACTIVE_BUTTON} rounded-full border px-3 py-1 text-xs font-medium transition ${
                  category === recent
                    ? "border-cyan-400 bg-cyan-500 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                }`}
              >
                {getCategoryLabel(recent, lang)}
              </button>
            ))}
          </div>
        )}

        <div className="relative z-10 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
          {currentCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`${INTERACTIVE_BUTTON} rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                category === item
                  ? "border-cyan-400 bg-cyan-500 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-800 hover:border-cyan-300 hover:text-cyan-700"
              }`}
            >
              {getCategoryLabel(item, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* 支払方法 */}
      <div>
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("支払方法", "Payment")}</span>
        <div className="relative z-10 flex flex-wrap gap-1.5">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPayment(method)}
              className={`${INTERACTIVE_BUTTON} rounded-full border px-3 py-2 text-xs font-semibold transition ${
                payment === method
                  ? "border-cyan-400 bg-cyan-500 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
              }`}
            >
              {getPaymentMethodLabel(method, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* PAY/ICチャージ額入力 */}
      {CHARGE_PAYMENT_METHODS.includes(payment) && (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3">
          <p className="text-xs font-bold text-cyan-700">
            {t(`${payment} チャージ・残高メモ`, `${payment} charge / balance note`)}
          </p>
          <p className="mt-0.5 text-xs text-cyan-600">
            {t(
              "金額欄にチャージした額を入力すると予算から差し引かれます。支出として記録する場合はそのまま保存してください。",
              "Enter the charge amount to deduct from budget. Save as-is to record as an expense.",
            )}
          </p>
        </div>
      )}

      {/* 日付・固定費 */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("日付", "Date")}</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={isFixed}
            onChange={(event) => setIsFixed(event.target.checked)}
            className="h-4 w-4 accent-cyan-500"
          />
          {t("固定費", "Fixed")}
        </label>
      </div>

      {savedFlash && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {t("保存しました", "Saved")}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`${INTERACTIVE_BUTTON} w-full rounded-full bg-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-md shadow-cyan-200 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {loading ? t("保存中...", "Saving...") : t("この内容で保存", "Save")}
      </button>
    </div>
  );
}


