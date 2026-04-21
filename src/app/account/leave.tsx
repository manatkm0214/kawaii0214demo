"use client"

import Link from "next/link"
import { useState } from "react"
import { useLang } from "../../lib/hooks/useLang"

type Step = "confirm" | "loading" | "done" | "error"

export default function LeaveAccountPage() {
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)
  const [step, setStep] = useState<Step>("confirm")
  const [errorMsg, setErrorMsg] = useState("")
  const [confirmText, setConfirmText] = useState("")

  async function handleLeave() {
    setStep("loading")
    try {
      const response = await fetch("/api/account/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: confirmText }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(typeof payload?.error === "string" ? payload.error : t("エラーが発生しました。", "An error occurred."))
      }

      setStep("done")
      window.setTimeout(() => {
        window.location.href = "/auth/logout"
      }, 1200)
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : t("エラーが発生しました。", "An error occurred."))
      setStep("error")
    }
  }

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-[32px] border border-emerald-400/20 bg-slate-950 p-8 text-center shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-300/80">退会完了 / Account closed</p>
          <h1 className="mt-3 text-3xl font-bold text-white">{t("退会処理が完了しました", "Account closure complete")}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">{t("保存されていた家計データを削除し、ログアウトしました。", "Your saved household data was removed and you were signed out.")}</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
            {t("トップへ戻る", "Back to home")}
          </Link>
        </div>
      </div>
    )
  }

  if (step === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-[32px] border border-rose-400/20 bg-slate-950 p-8 text-center shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-300/80">エラー / Error</p>
          <h1 className="mt-3 text-3xl font-bold text-white">{t("退会処理でエラーが発生しました", "There was a problem closing the account")}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">{errorMsg}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setStep("confirm")} className="rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              {t("もう一度試す", "Try again")}
            </button>
            <Link href="/settings" className="rounded-full bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-600">
              {t("設定へ戻る", "Back to settings")}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const canDelete = confirmText.trim().toUpperCase() === "DELETE"

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-[32px] border border-rose-400/20 bg-slate-950 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.32em] text-rose-300/80">退会 / Delete account</p>
        <h1 className="mt-3 text-3xl font-bold text-white">{t("会員退会", "Delete account")}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {t("この操作を実行すると、家計データ・予算・プロフィール情報を削除してログアウトします。", "This deletes your household data, budgets, and profile information, then signs you out.")}
        </p>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-900 p-5">
          <p className="text-sm font-semibold text-white">{t("削除される内容", "What will be removed")}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>{t("取引データ", "Transaction records")}</li>
            <li>{t("予算設定", "Budget settings")}</li>
            <li>{t("プロフィール情報", "Profile information")}</li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-rose-200">{t("元に戻せません。", "This cannot be undone.")}</p>
        </div>

        <label className="mt-6 block text-sm text-slate-300">
          {t("確認のため DELETE と入力してください", "Type DELETE to confirm")}
          <input
            type="text"
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
            placeholder="DELETE"
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/settings" className="rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            {t("キャンセル", "Cancel")}
          </Link>
          <button
            type="button"
            disabled={!canDelete || step === "loading"}
            onClick={handleLeave}
            className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === "loading" ? t("処理中...", "Processing...") : t("退会を実行", "Delete account")}
          </button>
        </div>
      </div>
    </div>
  )
}

