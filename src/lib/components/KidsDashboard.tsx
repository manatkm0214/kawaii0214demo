"use client"

import { useMemo } from "react"
import type { KidsExpense, KidsExpenseCategory } from "./KidsExpenseForm";
import type { KidsIncome } from "./KidsIncomeForm";

import type { KidsSavingsGoal } from "../types/kids-finance";

export type KidsFinanceState = {
  incomes: KidsIncome[];
  expenses: KidsExpense[];
  savings: number;
  monthlyBudget: number;
  savingsGoal: KidsSavingsGoal;
};

type Props = {
  state: KidsFinanceState
}

const categoryLabels: Record<KidsExpenseCategory, string> = {
  snack: "おかし",
  toy: "おもちゃ",
  book: "本",
  game: "ゲーム",
  school: "学校",
  other: "そのほか",
}

function formatYen(value: number) {
  return `${value.toLocaleString("ja-JP")}円`
}

function getMonthKey(date: string) {
  return date.slice(0, 7)
}

function getCurrentMonthKey() {
  return new Date().toISOString().slice(0, 7)
}

function getEncouragementMessage({
  balance,
  monthlySpent,
  monthlyBudget,
  savingsProgress,
}: {
  balance: number
  monthlySpent: number
  monthlyBudget: number
  savingsProgress: number
}) {
  if (balance < 0) {
    return "つかいすぎちゅうい！つぎは少しだけがまんしてみよう。"
  }

  if (monthlySpent > monthlyBudget) {
    return "こんげつのよさんをこえたよ。つぎはつかう前にかくにんしよう。"
  }

  if (savingsProgress >= 1) {
    return "もくひょうたっせい！すごい！つぎのもくひょうもきめてみよう。"
  }

  if (savingsProgress >= 0.7) {
    return "あとすこし！このちょうしでためていこう。"
  }

  if (balance > 0 && monthlySpent <= monthlyBudget * 0.7) {
    return "じょうずにつかえているよ！このままつづけよう。"
  }

  return "まいにちすこしずつきろくできると、もっとじょうずになるよ。"
}

export function KidsFinanceDashboard({ state }: Props) {
  const currentMonthKey = getCurrentMonthKey()

  const totalIncome = useMemo(() => {
    return state.incomes.reduce((sum: number, item: KidsIncome) => sum + item.amount, 0)
  }, [state.incomes])

  const totalExpense = useMemo(() => {
    return state.expenses.reduce((sum: number, item: KidsExpense) => sum + item.amount, 0)
  }, [state.expenses])

  const balance = totalIncome - totalExpense - state.savings

  const monthlyExpenses = useMemo(() => {
    return state.expenses.filter((item) => getMonthKey(item.date) === currentMonthKey)
  }, [state.expenses, currentMonthKey])

  const monthlySpent = useMemo(() => {
    return monthlyExpenses.reduce((sum: number, item: KidsExpense) => sum + item.amount, 0)
  }, [monthlyExpenses])

  const remainingBudget = state.monthlyBudget - monthlySpent

  const expenseByCategory = useMemo(() => {
    const base: Record<KidsExpenseCategory, number> = {
      snack: 0,
      toy: 0,
      book: 0,
      game: 0,
      school: 0,
      other: 0,
    }

    for (const item of monthlyExpenses as KidsExpense[]) {
      base[item.category] += item.amount
    }

    return base
  }, [monthlyExpenses])

  const categoryRows = useMemo(() => {
    return Object.entries(expenseByCategory)
      .map(([category, amount]) => ({
        category: category as KidsExpenseCategory,
        label: categoryLabels[category as KidsExpenseCategory],
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenseByCategory])

  const maxCategoryAmount = Math.max(...categoryRows.map((row) => row.amount), 1)

  const savingsProgress =
    state.savingsGoal.targetAmount > 0
      ? state.savings / state.savingsGoal.targetAmount
      : 0

  const recentExpenses = [...state.expenses]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)

  const message = getEncouragementMessage({
    balance,
    monthlySpent,
    monthlyBudget: state.monthlyBudget,
    savingsProgress,
  })

  return (
    <main className="min-h-screen bg-sky-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-sky-700">こども家計ぼダッシュボード</h1>
          <p className="mt-2 text-sm text-slate-600">
            おこづかい・つかったお金・ちょきんをわかりやすく見よう
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow">
            <p className="text-sm text-slate-500">いまつかえるお金</p>
            <p className="mt-2 text-3xl font-bold text-sky-700">{formatYen(balance)}</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow">
            <p className="text-sm text-slate-500">こんげつつかったお金</p>
            <p className="mt-2 text-3xl font-bold text-rose-500">{formatYen(monthlySpent)}</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow">
            <p className="text-sm text-slate-500">ちょきん</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{formatYen(state.savings)}</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow">
            <p className="text-sm text-slate-500">こんげつあといくらつかえる？</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                remainingBudget < 0 ? "text-red-600" : "text-amber-600"
              }`}
            >
              {formatYen(remainingBudget)}
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-lg font-bold text-slate-800">ほしいもの もくひょう</h2>
            <p className="mt-3 text-sm text-slate-600">{state.savingsGoal.title}</p>
            <p className="mt-2 text-sm text-slate-500">
              {formatYen(state.savings)} / {formatYen(state.savingsGoal.targetAmount)}
            </p>

            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${Math.min(savingsProgress * 100, 100)}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-700">
              あと{" "}
              <span className="font-bold">
                {formatYen(Math.max(state.savingsGoal.targetAmount - state.savings, 0))}
              </span>
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-lg font-bold text-slate-800">ひとことメッセージ</h2>
            <div className="mt-4 rounded-2xl bg-sky-100 p-4 text-slate-700">
              {message}
            </div>

            <div className="mt-4 text-sm text-slate-500">
              よさん: {formatYen(state.monthlyBudget)}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-lg font-bold text-slate-800">こんげつのつかった内訳</h2>

            <div className="mt-4 space-y-4">
              {categoryRows.map((row) => (
                <div key={row.category}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{row.label}</span>
                    <span className="font-semibold">{formatYen(row.amount)}</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{
                        width: `${row.amount === 0 ? 0 : (row.amount / maxCategoryAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="text-lg font-bold text-slate-800">さいきんのししゅつ</h2>

            <div className="mt-4 space-y-3">
              {recentExpenses.length === 0 ? (
                <p className="text-sm text-slate-500">まだきろくがありません。</p>
              ) : (
                recentExpenses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {categoryLabels[item.category]}
                      </p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                    <p className="font-bold text-rose-500">{formatYen(item.amount)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}