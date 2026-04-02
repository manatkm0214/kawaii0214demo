"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

function validatePassword(password: string): { ok: boolean; reason: string } {
  const hasLetters = /[a-zA-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const isLongEnough = password.length >= 8

  if (!isLongEnough) return { ok: false, reason: "8文字以上で入力してください" }
  if (!hasLetters) return { ok: false, reason: "英字を1文字以上含めてください" }
  if (!hasNumbers) return { ok: false, reason: "数字を1文字以上含めてください" }
  return { ok: true, reason: "" }
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setReady(Boolean(session?.user))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true)
      }
      if (event === "SIGNED_IN" && session?.user) {
        setReady(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const validation = useMemo(() => validatePassword(password), [password])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validation.ok) {
      alert(validation.reason)
      return
    }
    if (password !== confirm) {
      alert("確認用パスワードが一致しません")
      return
    }

    setLoading(true)
    const { error } = await createClient().auth.updateUser({ password })
    setLoading(false)

    if (error) {
      alert("パスワード更新失敗: " + error.message)
      return
    }

    alert("パスワードを更新しました。ログイン画面に戻ります。")
    router.replace("/")
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-slate-800/70 border border-slate-700 rounded-2xl p-6 space-y-4">
        <h1 className="text-lg font-bold">パスワード再設定</h1>

        {!ready && (
          <p className="text-xs text-amber-300 bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
            メールリンクからアクセスしてください。リンク有効化まで少し時間がかかる場合があります。
          </p>
        )}

        <label className="block text-xs text-slate-300">
          新しいパスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5"
            placeholder="8文字以上・英字+数字"
          />
        </label>

        <label className="block text-xs text-slate-300">
          確認用パスワード
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5"
          />
        </label>

        <button
          type="submit"
          disabled={loading || !ready}
          className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50"
        >
          {loading ? "更新中..." : "パスワードを更新"}
        </button>
      </form>
    </main>
  )
}
