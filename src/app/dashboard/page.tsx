
import Dashboard from "../../lib/components/Dashboard"
import EconomicBenchmarkGuide from "@/lib/components/EconomicBenchmarkGuide"
import type { Budget, Transaction } from "@/lib/utils"

export default function DashboardPage() {
  const dummyTransactions: Transaction[] = [
    {
      id: "1",
      user_id: "demo-user",
      type: "income",
      amount: 300000,
      category: "給与",
      memo: "4月の収入",
      payment_method: "口座振替",
      is_fixed: false,
      date: "2026-04-01",
      created_at: "2026-04-01T00:00:00Z",
    },
    {
      id: "2",
      user_id: "demo-user",
      type: "expense",
      amount: 220000,
      category: "住居",
      memo: "家賃と光熱費",
      payment_method: "カード",
      is_fixed: true,
      date: "2026-04-02",
      created_at: "2026-04-02T00:00:00Z",
    },
    {
      id: "3",
      user_id: "demo-user",
      type: "saving",
      amount: 50000,
      category: "貯蓄",
      memo: "先取り貯金",
      payment_method: "口座振替",
      is_fixed: false,
      date: "2026-04-03",
      created_at: "2026-04-03T00:00:00Z",
    },
    {
      id: "4",
      user_id: "demo-user",
      type: "investment",
      amount: 10000,
      category: "投資",
      memo: "つみたてNISA",
      payment_method: "口座振替",
      is_fixed: false,
      date: "2026-04-04",
      created_at: "2026-04-04T00:00:00Z",
    },
  ]

  const dummyBudgets: Budget[] = [
    {
      id: "1",
      user_id: "demo-user",
      category: "住居",
      amount: 220000,
      month: "2026-04",
      created_at: "2026-03-25T00:00:00Z",
    },
    {
      id: "2",
      user_id: "demo-user",
      category: "食費",
      amount: 50000,
      month: "2026-04",
      created_at: "2026-03-25T00:00:00Z",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <EconomicBenchmarkGuide />
        <Dashboard transactions={dummyTransactions} budgets={dummyBudgets} currentMonth="2026-04" />
      </div>
    </div>
  )
}
