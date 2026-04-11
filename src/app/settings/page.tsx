"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DesignStarter from "@/lib/components/DesignStarter";
import { LANG_KEY, setLang, useLang } from "@/lib/hooks/useLang";

export default function SettingsPage() {
  const router = useRouter();
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  function handleLogout() {
    window.location.href = "/auth/logout";
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="app-panel rounded-[32px] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-700">{t("設定", "Settings")}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">{t("デザイン設定", "Design settings")}</h1>
              <p className="mt-2 text-sm text-slate-700">
                {t(
                  "ログイン後も、最初の設定と同じ流れで背景や全体の雰囲気を整えられます。",
                  "After login, you can update the background and overall mood using the same design flow as the first setup.",
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-full border border-slate-200 bg-white p-1">
                {([
                  { code: "ja", label: "JA" },
                  { code: "en", label: "EN" },
                ] as const).map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      setLang(option.code);
                      if (typeof window !== "undefined") {
                        window.localStorage.setItem(LANG_KEY, option.code);
                      }
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      lang === option.code ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <Link href="/" className="app-chip">{t("ボードへ戻る", "Back to board")}</Link>
              <Link href="/contact" className="app-chip">{t("お問い合わせ", "Contact")}</Link>
              <button type="button" onClick={handleLogout} className="app-chip">{t("ログアウト", "Sign out")}</button>
              <Link href="/account/leave" className="app-chip">{t("アカウント削除", "Delete account")}</Link>
            </div>
          </div>
        </header>

        <DesignStarter
          onBack={() => router.push("/")}
          onContinue={() => router.push("/")}
          backLabel={{ ja: "トップへ戻る", en: "Back to top" }}
          continueLabel={{ ja: "ボードへ戻る", en: "Back to board" }}
        />
      </div>
    </div>
  );
}
