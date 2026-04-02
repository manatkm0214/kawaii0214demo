"use client"

import { useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/utils"

interface Props {
  onComplete: (profile: Profile) => void
}

export default function PresetSetup({ onComplete }: Props) {
  const [displayName, setDisplayName] = useState("")
  const [takeHome, setTakeHome] = useState("")
  const [fixedRate, setFixedRate] = useState("35")
  const [variableRate, setVariableRate] = useState("25")
  const [savingsRate, setSavingsRate] = useState("20")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)

  const rateTotal = useMemo(() => {
    return [fixedRate, variableRate, savingsRate].reduce((sum, value) => sum + Number(value || 0), 0)
  }, [fixedRate, savingsRate, variableRate])

  function clampPercent(value: string): number {
    return Math.min(100, Math.max(0, Number(value || 0)))
  }

  async function handleCreateProfile() {
    const normalizedTakeHome = Number(takeHome || 0)
    const allocationTargetFixedRate = clampPercent(fixedRate)
    const allocationTargetVariableRate = clampPercent(variableRate)
    const allocationTargetSavingsRate = clampPercent(savingsRate)

    setMessage(null)

    if (rateTotal > 100) {
      setMessage({ type: "error", text: "配分割合の合計は100%以下にしてください" })
      return
    }

    if (takeHome && (!Number.isFinite(normalizedTakeHome) || normalizedTakeHome <= 0)) {
      setMessage({ type: "error", text: "手取りは1以上の数値で入力してください" })
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data: authData, error: authError } = await supabase.auth.getUser()
      if (authError || !authData.user) {
        setMessage({ type: "error", text: "ユーザー情報を取得できませんでした。再ログインしてください" })
        return
      }

      const profilePayload = {
        id: authData.user.id,
        display_name: displayName.trim() || null,
        currency: "JPY",
        allocation_take_home: takeHome ? Math.round(normalizedTakeHome) : null,
        allocation_target_fixed_rate: allocationTargetFixedRate,
        allocation_target_variable_rate: allocationTargetVariableRate,
        allocation_target_savings_rate: allocationTargetSavingsRate,
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" })
        .select()
        .single()

      if (error) {
        setMessage({ type: "error", text: "プロフィール作成に失敗しました: " + error.message })
        return
      }

      setMessage({ type: "success", text: "初期設定を保存しました" })
      onComplete(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">はじめに設定</h2>
        <p className="text-sm text-slate-400">表示名と手取りの目標配分を決めると、ダッシュボードにすぐ反映されます。</p>

        {message && (
          <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed ${
            message.type === "success"
              ? "bg-emerald-900/50 border border-emerald-700/60 text-emerald-200"
              : "bg-red-900/50 border border-red-700/60 text-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="表示名（任意）"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
        />

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={takeHome}
          onChange={e => setTakeHome(e.target.value)}
          placeholder="今月の手取り（任意）"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
        />

        <div className="grid grid-cols-3 gap-2">
          <label className="text-xs text-slate-400">
            固定費
            <input
              type="number"
              min={0}
              max={100}
              value={fixedRate}
              onChange={e => setFixedRate(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500"
            />
          </label>
          <label className="text-xs text-slate-400">
            変動費
            <input
              type="number"
              min={0}
              max={100}
              value={variableRate}
              onChange={e => setVariableRate(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500"
            />
          </label>
          <label className="text-xs text-slate-400">
            貯蓄+投資
            <input
              type="number"
              min={0}
              max={100}
              value={savingsRate}
              onChange={e => setSavingsRate(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500"
            />
          </label>
        </div>

        <p className={`text-xs ${rateTotal > 100 ? "text-red-300" : "text-slate-400"}`}>
          配分合計: {rateTotal}%
        </p>

        <button
          onClick={handleCreateProfile}
          disabled={loading || rateTotal > 100}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl font-bold"
        >
          {loading ? "作成中..." : "開始する"}
        </button>
      </div>
    </div>
  )
}
