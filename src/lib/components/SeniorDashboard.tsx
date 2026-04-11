"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

type EntryType = "income" | "expense" | "saving";
type Category =
  | "salary"
  | "sidejob"
  | "business"
  | "investment"
  | "pension"
  | "allowance"
  | "food"
  | "hospital"
  | "medicine"
  | "transport"
  | "utility"
  | "phone"
  | "daily"
  | "entertainment"
  | "hobby"
  | "education"
  | "insurance"
  | "tax"
  | "gift"
  | "saving"
  | "investment_out"
  | "other";

type FinanceEntry = {
  id: string;
  type: EntryType;
  amount: number;
  category: Category;
  date: string;
  memo: string;
};

type SeniorFinanceState = {
  monthlyBudget: number;
  savingGoal: number;
  entries: FinanceEntry[];
};

const STORAGE_KEY = "senior-finance-one-page";
const DEFAULT_STATE: SeniorFinanceState = {
  monthlyBudget: 0,
  savingGoal: 0,
  entries: [],
};

function normalizeSeniorState(value: SeniorFinanceState | null | undefined): SeniorFinanceState {
  if (!value) return DEFAULT_STATE;

  const entries = Array.isArray(value.entries) ? value.entries : [];
  const monthlyBudget = Number.isFinite(value.monthlyBudget) ? value.monthlyBudget : DEFAULT_STATE.monthlyBudget;
  const savingGoal = Number.isFinite(value.savingGoal) ? value.savingGoal : DEFAULT_STATE.savingGoal;

  // Old defaults should not appear for first-time senior users with no saved records.
  if (entries.length === 0 && monthlyBudget === 120000 && savingGoal === 20000) {
    return DEFAULT_STATE;
  }

  return {
    monthlyBudget: Math.max(0, monthlyBudget),
    savingGoal: Math.max(0, savingGoal),
    entries,
  };
}

const UNITS = [
  { factor: 1, ja: "円", en: "Yen" },
  { factor: 1000, ja: "千円", en: "1K" },
  { factor: 10000, ja: "万円", en: "10K" },
] as const;

const CATEGORY_LABELS: Record<Category, { ja: string; en: string }> = {
  salary: { ja: "給与", en: "Salary" },
  sidejob: { ja: "副業", en: "Side job" },
  business: { ja: "事業収入", en: "Business income" },
  investment: { ja: "投資収入", en: "Investment income" },
  pension: { ja: "年金", en: "Pension" },
  allowance: { ja: "そのほか収入", en: "Other income" },
  food: { ja: "食費", en: "Food" },
  hospital: { ja: "病院", en: "Hospital" },
  medicine: { ja: "薬", en: "Medicine" },
  transport: { ja: "交通", en: "Transport" },
  utility: { ja: "水道・光熱", en: "Utilities" },
  phone: { ja: "通信", en: "Phone" },
  daily: { ja: "日用品", en: "Daily goods" },
  entertainment: { ja: "娯楽", en: "Entertainment" },
  hobby: { ja: "趣味", en: "Hobby" },
  education: { ja: "学び", en: "Education" },
  insurance: { ja: "保険", en: "Insurance" },
  tax: { ja: "税金", en: "Tax" },
  gift: { ja: "交際・贈り物", en: "Gift / social" },
  saving: { ja: "貯蓄", en: "Savings" },
  investment_out: { ja: "投資", en: "Investment" },
  other: { ja: "そのほか", en: "Other" },
};

const INCOME_CATEGORIES: Category[] = ["salary", "sidejob", "business", "investment", "pension", "allowance"];
const EXPENSE_CATEGORIES: Category[] = ["food", "hospital", "medicine", "transport", "utility", "phone", "daily", "entertainment", "hobby", "education", "insurance", "tax", "gift", "investment_out", "other"];
const SAVING_CATEGORIES: Category[] = ["saving"];

const inputClassName =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-cyan-500";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function monthKey(date: string) {
  return date.slice(0, 7);
}

function currentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

export default function SeniorDashboard() {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);
  const categoryLabel = (category: Category) => (lang === "en" ? CATEGORY_LABELS[category].en : CATEGORY_LABELS[category].ja);

  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<SeniorFinanceState>(DEFAULT_STATE);

  const [type, setType] = useState<EntryType>("expense");
  const [amount, setAmount] = useState("");
  const [amountUnit, setAmountUnit] = useState<number>(1);
  const [category, setCategory] = useState<Category>("food");
  const [date, setDate] = useState(todayString());
  const [memo, setMemo] = useState("");

  const [budgetInput, setBudgetInput] = useState(String(DEFAULT_STATE.monthlyBudget));
  const [budgetUnit, setBudgetUnit] = useState<number>(1);
  const [goalInput, setGoalInput] = useState(String(DEFAULT_STATE.savingGoal));
  const [goalUnit, setGoalUnit] = useState<number>(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SeniorFinanceState;
        const nextState = normalizeSeniorState(parsed);
        setState(nextState);
        setBudgetInput(String(nextState.monthlyBudget));
        setGoalInput(String(nextState.savingGoal));
      } else {
        setState(DEFAULT_STATE);
        setBudgetInput(String(DEFAULT_STATE.monthlyBudget));
        setGoalInput(String(DEFAULT_STATE.savingGoal));
      }
    } catch {
      setState(DEFAULT_STATE);
      setBudgetInput(String(DEFAULT_STATE.monthlyBudget));
      setGoalInput(String(DEFAULT_STATE.savingGoal));
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [mounted, state]);

  useEffect(() => {
    if (type === "income") setCategory("pension");
    if (type === "expense") setCategory("food");
    if (type === "saving") setCategory("saving");
  }, [type]);

  const currentMonth = currentMonthKey();
  const monthlyEntries = useMemo(() => state.entries.filter((item) => monthKey(item.date) === currentMonth), [currentMonth, state.entries]);
  const totalIncome = useMemo(() => state.entries.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0), [state.entries]);
  const totalExpense = useMemo(() => state.entries.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0), [state.entries]);
  const totalSaving = useMemo(() => state.entries.filter((item) => item.type === "saving").reduce((sum, item) => sum + item.amount, 0), [state.entries]);
  const balance = totalIncome - totalExpense - totalSaving;
  const monthlyIncome = useMemo(() => monthlyEntries.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0), [monthlyEntries]);
  const monthlyExpense = useMemo(() => monthlyEntries.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0), [monthlyEntries]);
  const monthlySaving = useMemo(() => monthlyEntries.filter((item) => item.type === "saving").reduce((sum, item) => sum + item.amount, 0), [monthlyEntries]);
  const remainingBudget = state.monthlyBudget - monthlyExpense;

  const topExpenseCategories = useMemo(() => {
    const sums: Record<string, number> = {};
    for (const item of monthlyEntries) {
      if (item.type !== "expense") continue;
      const label = lang === "en" ? CATEGORY_LABELS[item.category].en : CATEGORY_LABELS[item.category].ja;
      sums[label] = (sums[label] ?? 0) + item.amount;
    }
    return Object.entries(sums).map(([label, amount]) => ({ label, amount })).sort((a, b) => b.amount - a.amount).slice(0, 5);
  }, [lang, monthlyEntries]);

  const messageKey = useMemo(() => {
    if (balance < 0) return "negative_balance";
    if (monthlyExpense > state.monthlyBudget) return "over_budget";
    if (state.savingGoal > 0 && monthlySaving >= state.savingGoal) return "goal_achieved";
    if (state.monthlyBudget > 0 && state.monthlyBudget - monthlyExpense <= state.monthlyBudget * 0.2) return "budget_low";
    return "good";
  }, [balance, monthlyExpense, monthlySaving, state.monthlyBudget, state.savingGoal]);

  const messageMap: Record<string, { ja: string; en: string }> = {
    negative_balance: { ja: "差額がマイナスです。まずは大きい支出を1つ見直してみましょう。", en: "Balance is negative. Start by reviewing one large expense." },
    over_budget: { ja: "今月の予算を超えています。医療、食費、日用品を見直すと整えやすいです。", en: "This month is over budget. Reviewing medical, food, and daily goods can help." },
    goal_achieved: { ja: "今月の貯蓄目標を達成できています。この調子で大丈夫です。", en: "You reached this month's savings goal. Keep it going." },
    budget_low: { ja: "今月の残り予算が少なめです。無理のない範囲で調整しましょう。", en: "Remaining budget is getting low. Adjust gently if needed." },
    good: { ja: "今月は落ち着いて進められています。この調子で大丈夫です。", en: "This month looks steady. You're doing well." },
  };

  function handleAddEntry(e: React.FormEvent) {
    e.preventDefault();
    const amountNumber = Number(amount) * amountUnit;
    if (!amountNumber || amountNumber <= 0) return;
    setState((prev) => ({
      ...prev,
      entries: [{ id: crypto.randomUUID(), type, amount: amountNumber, category, date, memo: memo.trim() }, ...prev.entries],
    }));
    setAmount("");
    setAmountUnit(1);
    setMemo("");
    setDate(todayString());
  }

  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    const monthlyBudget = Number(budgetInput) * budgetUnit;
    const savingGoal = Number(goalInput) * goalUnit;
    if (!monthlyBudget || monthlyBudget <= 0) return;
    if (savingGoal < 0) return;
    setState((prev) => ({ ...prev, monthlyBudget, savingGoal }));
  }

  function deleteEntry(id: string) {
    setState((prev) => ({ ...prev, entries: prev.entries.filter((item) => item.id !== id) }));
  }

  function resetAll() {
    if (!window.confirm(t("すべての記録を消しますか？", "Delete all records?"))) return;
    setState((prev) => ({ ...prev, entries: [] }));
  }

  const selectableCategories = type === "income" ? INCOME_CATEGORIES : type === "expense" ? EXPENSE_CATEGORIES : SAVING_CATEGORIES;

  if (!mounted) {
    return <main className="min-h-screen bg-amber-50 p-4 md:p-8"><div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow">{t("読み込み中...", "Loading...")}</div></main>;
  }

  return (
    <main className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-4xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{t("シニア家計ボード", "Senior budget board")}</h1>
          <p className="mt-3 text-lg text-slate-600">{t("入力と見直しを1画面で進めやすくしています。", "Input and review are kept together on one screen.")}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label={t("いまの差額", "Current balance")} value={formatCurrency(balance)} tone={balance < 0 ? "text-red-600" : "text-sky-700"} />
          <SummaryCard label={t("今月の支出", "This month's expenses")} value={formatCurrency(monthlyExpense)} tone="text-rose-600" />
          <SummaryCard label={t("今月の貯蓄", "This month's savings")} value={formatCurrency(monthlySaving)} tone="text-emerald-600" />
          <SummaryCard label={t("残り予算", "Remaining budget")} value={formatCurrency(remainingBudget)} tone={remainingBudget < 0 ? "text-red-600" : "text-amber-600"} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-4xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold text-slate-900">{t("ひと目でわかる状態", "Status at a glance")}</h2>
            <div className="mt-5 rounded-3xl bg-amber-100 p-5 text-lg leading-8 text-slate-900">{lang === "en" ? messageMap[messageKey].en : messageMap[messageKey].ja}</div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <MiniCard label={t("今月の収入", "This month's income")} value={formatCurrency(monthlyIncome)} tone="text-sky-700" />
              <MiniCard label={t("月の予算", "Monthly budget")} value={formatCurrency(state.monthlyBudget)} tone="text-slate-900" />
              <MiniCard label={t("月の貯蓄目標", "Monthly savings goal")} value={formatCurrency(state.savingGoal)} tone="text-emerald-700" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-slate-900">{t("今月の支出が多い項目", "Top expense categories")}</h3>
              <div className="mt-4 space-y-3">
                {topExpenseCategories.length === 0 ? <p className="text-lg text-slate-500">{t("まだ支出の記録がありません。", "No expense records yet.")}</p> : topExpenseCategories.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4 text-lg">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleAddEntry} className="rounded-4xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold text-slate-900">{t("かんたん入力", "Quick input")}</h2>
              <div className="mt-5 space-y-4">
                <Field label={t("種類", "Type")}><select value={type} onChange={(e) => setType(e.target.value as EntryType)} className={inputClassName}><option value="expense">{t("支出", "Expense")}</option><option value="income">{t("収入", "Income")}</option><option value="saving">{t("貯蓄", "Savings")}</option></select></Field>
                <Field label={t("金額", "Amount")}><div className="space-y-3"><input type="number" min="0" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t("金額を入力", "Enter amount")} className={inputClassName} /><UnitPicker lang={lang} value={amountUnit} onChange={setAmountUnit} />{amount && <p className="text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(amount || 0) * amountUnit)}</p>}</div></Field>
                <Field label={t("カテゴリ", "Category")}><select value={category} onChange={(e) => setCategory(e.target.value as Category)} className={inputClassName}>{selectableCategories.map((item) => <option key={item} value={item}>{categoryLabel(item)}</option>)}</select></Field>
                <Field label={t("日付", "Date")}><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClassName} /></Field>
                <Field label={t("メモ", "Memo")}><input type="text" value={memo} onChange={(e) => setMemo(e.target.value)} placeholder={t("例: スーパー、病院、年金", "e.g. grocery, hospital, pension")} className={inputClassName} /></Field>
                <button type="submit" className="w-full rounded-2xl bg-sky-600 px-5 py-5 text-xl font-bold text-white">{t("記録を追加", "Add record")}</button>
              </div>
            </form>

            <form onSubmit={handleSaveSettings} className="rounded-4xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold text-slate-900">{t("予算と目標", "Budget and goals")}</h2>
              <div className="mt-5 space-y-4">
                <Field label={t("月の予算", "Monthly budget")}><div className="space-y-3"><input type="number" min="0" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} className={inputClassName} /><UnitPicker lang={lang} value={budgetUnit} onChange={setBudgetUnit} />{budgetInput && <p className="text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(budgetInput || 0) * budgetUnit)}</p>}</div></Field>
                <Field label={t("月の貯蓄目標", "Monthly savings goal")}><div className="space-y-3"><input type="number" min="0" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} className={inputClassName} /><UnitPicker lang={lang} value={goalUnit} onChange={setGoalUnit} />{goalInput && <p className="text-sm text-slate-600">{t("反映額", "Total")}: {formatCurrency(Number(goalInput || 0) * goalUnit)}</p>}</div></Field>
                <button type="submit" className="w-full rounded-2xl bg-emerald-600 px-5 py-5 text-xl font-bold text-white">{t("設定を保存", "Save settings")}</button>
              </div>
            </form>
          </div>
        </section>

        <section className="rounded-4xl bg-white p-6 shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t("最近の記録", "Recent records")}</h2>
              <p className="mt-2 text-lg text-slate-500">{t("収入合計", "Total income")} {formatCurrency(totalIncome)} / {t("支出合計", "Total expenses")} {formatCurrency(totalExpense)} / {t("貯蓄合計", "Total savings")} {formatCurrency(totalSaving)}</p>
            </div>
            <button type="button" onClick={resetAll} className="rounded-xl bg-red-500 px-5 py-4 text-xl font-bold text-white">{t("すべて削除", "Delete all")}</button>
          </div>
          <div className="mt-6 space-y-4">
            {state.entries.length === 0 ? <div className="rounded-3xl bg-slate-50 p-5 text-lg text-slate-500">{t("まだ記録がありません。上の入力から追加してください。", "No records yet. Add one from the form above.")}</div> : state.entries.slice().sort((a, b) => b.date.localeCompare(a.date)).map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900">{item.type === "income" ? t("収入", "Income") : item.type === "expense" ? t("支出", "Expense") : t("貯蓄", "Savings")} / {categoryLabel(item.category)}</p>
                  <p className="text-lg text-slate-600">{item.date}</p>
                  {item.memo ? <p className="text-lg text-slate-500">{item.memo}</p> : null}
                </div>
                <div className="flex items-center gap-3">
                  <p className={`text-2xl font-bold ${item.type === "income" ? "text-sky-700" : item.type === "expense" ? "text-rose-600" : "text-emerald-600"}`}>{formatCurrency(item.amount)}</p>
                  <button type="button" onClick={() => deleteEntry(item.id)} className="rounded-lg bg-red-500 px-4 py-3 text-lg font-bold text-white">{t("削除", "Delete")}</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className="rounded-3xl bg-white p-6 shadow"><p className="text-lg text-slate-500">{label}</p><p className={`mt-3 text-4xl font-bold ${tone}`}>{value}</p></div>;
}

function MiniCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className="rounded-3xl bg-slate-50 p-4"><p className="text-base text-slate-500">{label}</p><p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-2 block text-lg font-medium text-slate-700">{label}</label>{children}</div>;
}

function UnitPicker({ lang, value, onChange }: { lang: "ja" | "en"; value: number; onChange: (next: number) => void }) {
  return <div className="grid grid-cols-3 gap-2">{UNITS.map((option) => <button key={option.factor} type="button" onClick={() => onChange(option.factor)} className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${value === option.factor ? "border-cyan-600 bg-cyan-50 text-cyan-900" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}>{lang === "en" ? option.en : option.ja}</button>)}</div>;
}
