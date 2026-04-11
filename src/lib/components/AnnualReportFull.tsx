"use client"
import type { Transaction } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

export default function AnnualReportFull({ transactions, currentMonth }: { transactions: Transaction[], currentMonth: string }) {
  const lang = useLang()
  const t = (ja: string, en: string) => lang === "en" ? en : ja

  // 年ごとに集計
  const year = currentMonth.split("-")[0];
  const yearTx: Transaction[] = transactions.filter(tx => tx.date.startsWith(year));
  const income = yearTx.filter(tx => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
  const expense = yearTx.filter(tx => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const saving = yearTx.filter(tx => tx.type === "saving").reduce((s, tx) => s + tx.amount, 0);
  const investment = yearTx.filter(tx => tx.type === "investment").reduce((s, tx) => s + tx.amount, 0);
  const balance = income - expense - saving - investment;

  // 固定費・変動費
  const fixed = yearTx.filter(tx => tx.is_fixed && tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const variable = yearTx.filter(tx => !tx.is_fixed && tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const fixedPct = expense > 0 ? Math.round((fixed / expense) * 100) : 0;
  const variablePct = expense > 0 ? Math.round((variable / expense) * 100) : 0;

  // 月ごとの集計
  const monthsSet = new Set(yearTx.map(tx => tx.date.slice(0, 7)));
  const monthsArr = Array.from(monthsSet);
  type MonthStat = { month: string; income: number; expense: number; saving: number; investment: number; balance: number };
  const monthStats: MonthStat[] = monthsArr.map(month => {
    const mTx = yearTx.filter(tx => tx.date.startsWith(month));
    const inc = mTx.filter(tx => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
    const exp = mTx.filter(tx => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
    const sav = mTx.filter(tx => tx.type === "saving").reduce((s, tx) => s + tx.amount, 0);
    const inv = mTx.filter(tx => tx.type === "investment").reduce((s, tx) => s + tx.amount, 0);
    return { month, income: inc, expense: exp, saving: sav, investment: inv, balance: inc - exp - sav - inv };
  });
  const maxExpenseMonth = monthStats.length > 0 ? monthStats.reduce((max, m) => m.expense > max.expense ? m : max) : undefined;
  const minExpenseMonth = monthStats.length > 0 ? monthStats.reduce((min, m) => m.expense < min.expense ? m : min) : undefined;
  const maxIncomeMonth = monthStats.length > 0 ? monthStats.reduce((max, m) => m.income > max.income ? m : max) : undefined;
  const minIncomeMonth = monthStats.length > 0 ? monthStats.reduce((min, m) => m.income < min.income ? m : min) : undefined;
  const surplusMonths = monthStats.filter(m => m.balance >= 0).length;
  const deficitMonths = monthStats.filter(m => m.balance < 0).length;

  // 支払方法別合計
  const paymentTotals: Record<string, number> = {};
  yearTx.filter(tx => tx.type === "expense").forEach(tx => {
    const method = tx.payment_method || t("不明", "Unknown");
    paymentTotals[method] = (paymentTotals[method] ?? 0) + tx.amount;
  });

  // カテゴリ別支出合計
  const categoryTotals: Record<string, number> = {};
  yearTx.filter(tx => tx.type === "expense").forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] ?? 0) + tx.amount;
  });
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  // 月平均
  const months = monthsArr.length || 1;
  const avgExpense = Math.round(expense / months);
  // 貯蓄率
  const savingRate = income > 0 ? Math.round(((saving + investment) / income) * 100) : 0;

  const yearLabel = lang === "en" ? ` (${year})` : `（${year}年）`;

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-emerald-400">
      <h2 className="text-lg font-bold text-emerald-300 mb-2">{t("年間サマリー", "Annual Summary")}{yearLabel}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
        <div className="flex flex-col items-center">
          <span className="text-xs text-emerald-200">{t("収入", "Income")}</span>
          <span className="text-base font-bold text-emerald-300">{formatCurrency(income)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-red-200">{t("支出", "Expenses")}</span>
          <span className="text-base font-bold text-red-300">{formatCurrency(expense)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-200">{t("貯金", "Savings")}</span>
          <span className="text-base font-bold text-blue-300">{formatCurrency(saving)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-violet-200">{t("投資", "Investment")}</span>
          <span className="text-base font-bold text-violet-300">{formatCurrency(investment)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-200">{t("収支", "Balance")}</span>
          <span className={`text-base font-bold ${balance >= 0 ? "text-emerald-300" : "text-red-300"}`}>{formatCurrency(balance)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-2 text-xs text-slate-300">
        <div>{t("月平均支出", "Avg Monthly Expenses")}: <span className="font-bold">{formatCurrency(avgExpense)}</span></div>
        <div>{t("貯蓄率", "Savings Rate")}: <span className="font-bold">{savingRate}%</span></div>
        <div>{t("固定費", "Fixed")}: <span className="font-bold">{formatCurrency(fixed)} ({fixedPct}%)</span></div>
        <div>{t("変動費", "Variable")}: <span className="font-bold">{formatCurrency(variable)} ({variablePct}%)</span></div>
        <div>{t("黒字月", "Surplus")}: <span className="font-bold">{surplusMonths}</span>／{t("赤字月", "Deficit")}: <span className="font-bold">{deficitMonths}</span></div>
        <div>{t("最高支出月", "Highest Expense Month")}: <span className="font-bold">{maxExpenseMonth ? `${maxExpenseMonth.month}（${formatCurrency(maxExpenseMonth.expense)}）` : "-"}</span></div>
        <div>{t("最低支出月", "Lowest Expense Month")}: <span className="font-bold">{minExpenseMonth ? `${minExpenseMonth.month}（${formatCurrency(minExpenseMonth.expense)}）` : "-"}</span></div>
        <div>{t("最高収入月", "Highest Income Month")}: <span className="font-bold">{maxIncomeMonth ? `${maxIncomeMonth.month}（${formatCurrency(maxIncomeMonth.income)}）` : "-"}</span></div>
        <div>{t("最低収入月", "Lowest Income Month")}: <span className="font-bold">{minIncomeMonth ? `${minIncomeMonth.month}（${formatCurrency(minIncomeMonth.income)}）` : "-"}</span></div>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-bold text-emerald-200 mb-1">{t("カテゴリ別支出（上位3件）", "Top 3 Expense Categories")}</h3>
        <ul className="text-xs text-slate-200 pl-4 list-disc">
          {sortedCategories.slice(0, 3).map(([cat, amt]) => (
            <li key={cat}>{cat}: <span className="font-bold">{formatCurrency(amt)}</span></li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-bold text-emerald-200 mb-1">{t("支払方法別支出", "Expenses by Payment Method")}</h3>
        <ul className="text-xs text-slate-200 pl-4 list-disc">
          {Object.entries(paymentTotals).map(([method, amt]) => (
            <li key={method}>{method}: <span className="font-bold">{formatCurrency(amt)}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
