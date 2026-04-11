"use client"

import { useLang } from "@/lib/hooks/useLang"

const TITLES = {
  ja: "きらきら家計簿",
  en: "KiraKira Kakeibo",
} as const

export default function Header() {
  const lang = useLang()

  return (
    <header className="mb-2 flex w-full select-none flex-col items-center justify-center pb-2 pt-6">
      <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-emerald-400 drop-shadow-lg md:text-3xl">
        {TITLES[lang]}
      </h1>
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-slate-900 text-2xl md:h-20 md:w-20">
        {lang === "en" ? "$" : "円"}
      </div>
    </header>
  )
}
