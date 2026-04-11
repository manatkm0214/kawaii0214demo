"use client"

import Link from "next/link"
import { useLang } from "@/lib/hooks/useLang"

export default function ResetPasswordPage() {
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-slate-100">
      <div className="w-full max-w-md space-y-4 rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-slate-950/30">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">{t("パスワード再設定", "Reset password")}</p>
          <h1 className="mt-2 text-xl font-bold text-white">{t("ログイン画面で再設定してください", "Reset from the login screen")}</h1>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {t(
              "パスワード再設定はログイン画面から進められます。次の画面でメールアドレスを入力して、Forgot password から進めてください。",
              "Password reset now happens from the login screen. Enter your email there and continue from Forgot password."
            )}
          </p>
        </div>

        <a href="/auth/login" className="block w-full rounded-2xl bg-violet-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-500">
          {t("ログイン画面へ進む", "Go to login")}
        </a>
        <Link href="/" className="block w-full rounded-2xl border border-slate-700 bg-slate-950 py-3 text-center text-sm text-slate-200 transition hover:bg-slate-900">
          {t("トップへ戻る", "Back to home")}
        </Link>
      </div>
    </main>
  )
}
