"use client"
import { useState, useEffect } from "react"

export type Lang = "ja" | "en"
export const LANG_KEY = "kakeibo-lang"
export const LANG_EVENT = "kakeibo-lang-change"

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ja"
    const s = localStorage.getItem(LANG_KEY)
    return s === "en" ? "en" : "ja"
  })

  useEffect(() => {
    function sync() {
      const s = localStorage.getItem(LANG_KEY)
      setLang(s === "en" ? "en" : "ja")
    }
    window.addEventListener("storage", sync)
    window.addEventListener(LANG_EVENT, sync)
    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener(LANG_EVENT, sync)
    }
  }, [])

  return lang
}

export function setLang(lang: Lang) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANG_KEY, lang)
  window.dispatchEvent(new Event(LANG_EVENT))
}
