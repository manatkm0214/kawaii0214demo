"use client"

import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useLang } from "@/lib/hooks/useLang"
import { Transaction, formatCurrency, getCategoryLabel } from "@/lib/utils"

interface Props {
  transactions: Transaction[]
  currentMonth: string
}

type Tab = "charts" | "tables"

const COLORS = ["#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#3b82f6", "#ec4899", "#84cc16", "#14b8a6", "#8b5cf6", "#22c55e"]
const tooltipStyle = { background: "#0f172a", border: "1px solid #334155", fontSize: 12 }
const axisStyle = { fill: "#94a3b8", fontSize: 11 }
const gridStyle = { strokeDasharray: "3 3", stroke: "#334155" }

export default function Charts({ transactions, currentMonth }: Props) {
  const [tab, setTab] = useState<Tab>("charts")
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)

  const fmtCurrency = (value: number | string | ReadonlyArray<number | string> | undefined) => {
    const raw = Array.isArray(value) ? value[0] : value
    const amount = typeof raw === "number" ? raw : Number(raw ?? 0)
    return formatCurrency(Number.isFinite(amount) ? amount : 0)
  }

  const data = useMemo(() => {
    const now = new Date(`${currentMonth}-01`)
    const months12 = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    })
    const months6 = months12.slice(-6)

    function monthStats(month: string) {
      const txs = transactions.filter((tx) => tx.date.startsWith(month))
      const income = txs.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0)
      const expense = txs.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)
      const saving = txs.filter((tx) => tx.type === "saving").reduce((sum, tx) => sum + tx.amount, 0)
      const investment = txs.filter((tx) => tx.type === "investment").reduce((sum, tx) => sum + tx.amount, 0)
      const fixed = txs.filter((tx) => tx.is_fixed && tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)
      const variable = expense - fixed
      const balance = income - expense - saving - investment
      const savingRate = income > 0 ? Math.round(((saving + investment) / income) * 100) : 0
      return {
        month,
        shortLabel: lang === "en" ? month.slice(5) : `${Number(month.slice(5, 7))}月`,
        income,
        expense,
        saving,
        investment,
        fixed,
        variable,
        balance,
        savingRate,
      }
    }

    const stats12 = months12.map(monthStats)
    const stats6 = months6.map(monthStats)
    const monthly = transactions.filter((tx) => tx.date.startsWith(currentMonth))

    const categoryMap: Record<string, number> = {}
    monthly
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        categoryMap[tx.category] = (categoryMap[tx.category] ?? 0) + tx.amount
      })

    const pieData = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }))

    const lineData = stats6.map((s) => ({
      month: s.shortLabel,
      income: s.income,
      expense: s.expense,
      saving: s.saving,
    }))

    const current = monthStats(currentMonth)

    const radarData = [
      { subject: lang === "en" ? "Income" : "収入余力", score: current.income > 0 ? Math.min(100, (current.income / 500000) * 100) : 0 },
      { subject: lang === "en" ? "Saving" : "節約度", score: current.income > 0 ? Math.max(0, 100 - (current.expense / current.income) * 100) : 0 },
      { subject: lang === "en" ? "Savings" : "貯蓄率", score: current.income > 0 ? Math.min(100, (current.saving / current.income) * 200) : 0 },
      { subject: lang === "en" ? "Investment" : "投資率", score: current.income > 0 ? Math.min(100, (current.investment / current.income) * 300) : 0 },
      { subject: lang === "en" ? "Fixed costs" : "固定費比率", score: current.expense > 0 ? Math.max(0, 100 - (current.fixed / current.expense) * 100) : 50 },
    ]

    const yearData = stats12.map((s) => ({
      month: s.shortLabel,
      income: s.income,
      expense: s.expense,
      saving: s.saving,
      investment: s.investment,
    }))

    const savingRateData = stats12.map((s) => ({ month: s.shortLabel, rate: s.savingRate, target: 20 }))
    const fixedVarData = stats6.map((s) => ({ month: s.shortLabel, fixed: s.fixed, variable: s.variable }))
    const balanceData = stats12.map((s) => ({ month: s.shortLabel, balance: s.balance }))

    let cumulative = 0
    const cumulativeData = stats12.map((s) => {
      cumulative += s.saving + s.investment
      return { month: s.shortLabel, total: cumulative }
    })

    const summaryTable = stats12
      .map((s) => ({
        month: s.month,
        income: s.income,
        expense: s.expense,
        saving: s.saving,
        investment: s.investment,
        balance: s.balance,
        savingRate: s.savingRate,
      }))
      .reverse()

    const categoryTable = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount]) => ({
        category,
        amount,
        incomePct: current.income > 0 ? Math.round((amount / current.income) * 100) : 0,
        expensePct: current.expense > 0 ? Math.round((amount / current.expense) * 100) : 0,
      }))

    const txList = [...monthly].sort((a, b) => b.date.localeCompare(a.date))

    return {
      pieData,
      lineData,
      radarData,
      yearData,
      savingRateData,
      fixedVarData,
      balanceData,
      cumulativeData,
      summaryTable,
      categoryTable,
      txList,
    }
  }, [transactions, currentMonth, lang])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 border-b border-slate-700">
        {([
          ["charts", t("グラフ", "Charts")],
          ["tables", t("表", "Tables")],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`border-b-2 px-4 py-2 text-sm font-semibold transition-all ${
              tab === key ? "border-cyan-500 text-cyan-300" : "border-transparent text-slate-300 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "charts" && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("支出カテゴリ", "Expense Categories")}</h3>
            {data.pieData.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">{t("データがありません", "No data")}</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={data.pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      dataKey="value"
                      label={({ name, percent }) => `${getCategoryLabel(String(name), lang)} ${Math.round((percent ?? 0) * 100)}%`}
                      labelLine={false}
                    >
                      {data.pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-1 grid grid-cols-2 gap-1">
                  {data.pieData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-sm text-slate-300">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      {getCategoryLabel(item.name, lang)}: {formatCurrency(item.value)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("固定費と変動費", "Fixed and Variable")}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.fixedVarData} barCategoryGap="20%">
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                <Bar dataKey="fixed" name={t("固定費", "Fixed")} stackId="a" fill="#f43f5e" />
                <Bar dataKey="variable" name={t("変動費", "Variable")} stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("月ごとの収支", "Monthly Balance")}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data.lineData}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="income" name={t("収入", "Income")} stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expense" name={t("支出", "Expense")} stroke="#f43f5e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="saving" name={t("貯蓄", "Saving")} stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("12か月の差額", "12-Month Balance")}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.balanceData} barCategoryGap="20%">
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                <Bar dataKey="balance" name={t("差額", "Balance")} radius={[2, 2, 0, 0]}>
                  {data.balanceData.map((entry, i) => (
                    <Cell key={i} fill={entry.balance >= 0 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("貯蓄率の流れ", "Savings Rate")}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={data.savingRateData}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip formatter={(v) => [`${v}%`, t("貯蓄率", "Savings Rate")]} contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="rate" name={t("貯蓄率", "Savings Rate")} stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.18} strokeWidth={2} />
                <Line type="monotone" dataKey="target" name={t("目安", "Target")} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="mt-1 text-sm text-slate-400">{t("点線は20%の目安です", "The dashed line shows the 20% target")}</p>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("累計の貯蓄", "Cumulative Savings")}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data.cumulativeData}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="total" name={t("累計", "Cumulative")} stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.18} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("今月のバランス", "This Month Balance")}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={data.radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.26} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-full rounded-[28px] border border-slate-700 bg-slate-900 p-5 xl:col-span-2">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("年間の流れ", "Annual Overview")}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.yearData} barCategoryGap="20%">
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} />
                <YAxis tick={{ ...axisStyle, fontSize: 10 }} tickFormatter={(v) => `${Math.round(Number(v) / 10000)}万`} />
                <Tooltip formatter={fmtCurrency} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="income" name={t("収入", "Income")} fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="expense" name={t("支出", "Expense")} fill="#f43f5e" radius={[2, 2, 0, 0]} />
                <Bar dataKey="saving" name={t("貯蓄", "Saving")} fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="investment" name={t("投資", "Investment")} fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "tables" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("月ごとのまとめ", "Monthly Summary")}</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950">
              <table className="min-w-[760px] w-full border-collapse text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-700">
                    {[t("月", "Month"), t("収入", "Income"), t("支出", "Expense"), t("貯蓄", "Saving"), t("投資", "Investment"), t("差額", "Balance"), t("貯蓄率", "Savings Rate")].map((header) => (
                      <th key={header} className="px-3 py-2 text-right font-semibold text-slate-300 first:text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.summaryTable.map((row) => (
                    <tr key={row.month} className={`border-b border-slate-800 hover:bg-slate-800/50 ${row.month === currentMonth ? "bg-cyan-950/30" : ""}`}>
                      <td className="px-3 py-2 font-semibold">{row.month}</td>
                      <td className="px-3 py-2 text-right text-emerald-400">{formatCurrency(row.income)}</td>
                      <td className="px-3 py-2 text-right text-orange-400">{formatCurrency(row.expense)}</td>
                      <td className="px-3 py-2 text-right text-blue-400">{formatCurrency(row.saving)}</td>
                      <td className="px-3 py-2 text-right text-cyan-400">{formatCurrency(row.investment)}</td>
                      <td className={`px-3 py-2 text-right font-bold ${row.balance >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {row.balance >= 0 ? "" : "-"}{formatCurrency(Math.abs(row.balance))}
                      </td>
                      <td className={`px-3 py-2 text-right font-bold ${row.savingRate >= 20 ? "text-emerald-400" : row.savingRate >= 10 ? "text-amber-400" : "text-rose-400"}`}>
                        {row.savingRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">{t("カテゴリごとの支出", "Expenses by Category")}</h3>
            {data.categoryTable.length === 0 ? (
              <p className="text-sm text-slate-400">{t("データがありません", "No data")}</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950">
                <table className="min-w-[720px] w-full border-collapse text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-700">
                      {[t("カテゴリ", "Category"), t("金額", "Amount"), t("収入比", "Income %"), t("支出比", "Expense %"), t("目安", "Bar")].map((header) => (
                        <th key={header} className="px-3 py-2 text-right font-semibold text-slate-300 first:text-left">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.categoryTable.map((row, i) => (
                      <tr key={row.category} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="flex items-center gap-1.5 px-3 py-2">
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                          {getCategoryLabel(row.category, lang)}
                        </td>
                        <td className="px-3 py-2 text-right font-bold text-orange-400">{formatCurrency(row.amount)}</td>
                        <td className="px-3 py-2 text-right text-slate-300">{row.incomePct}%</td>
                        <td className="px-3 py-2 text-right text-slate-300">{row.expensePct}%</td>
                        <td className="w-28 px-3 py-2">
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
                            <div className="h-1.5 rounded-full" style={{ width: `${Math.min(row.expensePct, 100)}%`, background: COLORS[i % COLORS.length] }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900 p-5">
            <h3 className="mb-3 text-base font-bold text-slate-200">
              {t("今月の明細", "Transactions")} {data.txList.length}{t("件", " items")}
            </h3>
            {data.txList.length === 0 ? (
              <p className="text-sm text-slate-400">{t("データがありません", "No data")}</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950">
                <table className="min-w-[860px] w-full border-collapse text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-700">
                      {[t("日付", "Date"), t("種類", "Type"), t("カテゴリ", "Category"), t("金額", "Amount"), t("メモ", "Memo"), t("固定", "Fixed")].map((header) => (
                        <th key={header} className="px-3 py-2 text-right font-semibold text-slate-300 first:text-left">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.txList.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="px-3 py-2 text-slate-300">{tx.date.slice(5)}</td>
                        <td className="px-3 py-2 text-right">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              tx.type === "income"
                                ? "bg-emerald-950 text-emerald-400"
                                : tx.type === "expense"
                                  ? "bg-rose-950 text-rose-400"
                                  : tx.type === "saving"
                                    ? "bg-blue-950 text-blue-400"
                                    : "bg-cyan-950 text-cyan-300"
                            }`}
                          >
                            {tx.type === "income"
                              ? t("収入", "Income")
                              : tx.type === "expense"
                                ? t("支出", "Expense")
                                : tx.type === "saving"
                                  ? t("貯蓄", "Saving")
                                  : t("投資", "Investment")}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right text-slate-300">{getCategoryLabel(tx.category, lang)}</td>
                        <td className={`px-3 py-2 text-right font-bold ${tx.type === "income" ? "text-emerald-400" : tx.type === "expense" ? "text-orange-400" : "text-blue-400"}`}>
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="max-w-40 truncate px-3 py-2 text-right text-slate-400">{tx.memo ?? "-"}</td>
                        <td className="px-3 py-2 text-right">{tx.is_fixed ? <span className="text-amber-400">固定</span> : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
