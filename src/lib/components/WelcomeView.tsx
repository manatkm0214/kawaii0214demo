"use client"

import Image from "next/image"
import { useCharacterImage } from "../hooks/useCharacterImage"
import { useBgTheme } from "../hooks/useBgTheme"
import { useLang } from "@/lib/hooks/useLang"

interface WelcomeViewProps {
  onStartAuth: () => void
  onStartGuest?: () => void
}

/* かわいいデフォルトキャラクター（ぬいぐるみ風） */
function DefaultCharacter() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="body" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </radialGradient>
        <radialGradient id="face" cx="45%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#fed7aa" />
        </radialGradient>
        <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="belly" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fce7f3" stopOpacity="0.6" />
        </radialGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 影 */}
      <ellipse cx="100" cy="188" rx="44" ry="8" fill="rgba(244,114,182,0.18)" />

      {/* 耳（後ろ） */}
      <ellipse cx="62" cy="66" rx="20" ry="22" fill="#f9a8d4" />
      <ellipse cx="138" cy="66" rx="20" ry="22" fill="#f9a8d4" />
      <ellipse cx="62" cy="68" rx="12" ry="14" fill="#fce7f3" />
      <ellipse cx="138" cy="68" rx="12" ry="14" fill="#fce7f3" />

      {/* 体 */}
      <ellipse cx="100" cy="148" rx="46" ry="40" fill="url(#body)" />

      {/* お腹パッチ */}
      <ellipse cx="100" cy="150" rx="28" ry="24" fill="url(#belly)" stroke="rgba(249,168,212,0.3)" strokeWidth="1" />

      {/* 腕 */}
      <ellipse cx="56" cy="148" rx="14" ry="11" fill="#fbcfe8" transform="rotate(-18,56,148)" />
      <ellipse cx="144" cy="148" rx="14" ry="11" fill="#fbcfe8" transform="rotate(18,144,148)" />

      {/* 足 */}
      <ellipse cx="82" cy="182" rx="16" ry="10" fill="#fbcfe8" />
      <ellipse cx="118" cy="182" rx="16" ry="10" fill="#fbcfe8" />

      {/* 頭 */}
      <circle cx="100" cy="92" r="48" fill="url(#face)" />

      {/* 目 */}
      <ellipse cx="84" cy="88" rx="9" ry="10" fill="#1c1917" />
      <ellipse cx="116" cy="88" rx="9" ry="10" fill="#1c1917" />
      <ellipse cx="84" cy="87" rx="7" ry="8" fill="#292524" />
      <ellipse cx="116" cy="87" rx="7" ry="8" fill="#292524" />
      {/* 目のハイライト */}
      <circle cx="87" cy="84" r="3" fill="white" />
      <circle cx="119" cy="84" r="3" fill="white" />
      <circle cx="82" cy="92" r="1.5" fill="white" opacity="0.7" />
      <circle cx="114" cy="92" r="1.5" fill="white" opacity="0.7" />

      {/* チーク */}
      <ellipse cx="72" cy="98" rx="13" ry="9" fill="url(#cheek)" />
      <ellipse cx="128" cy="98" rx="13" ry="9" fill="url(#cheek)" />

      {/* 鼻 */}
      <ellipse cx="100" cy="100" rx="4" ry="3" fill="#f9a8d4" opacity="0.8" />

      {/* 口（にっこり） */}
      <path d="M90 110 Q100 120 110 110" stroke="#ec4899" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* リボン */}
      <path d="M88 52 L100 62 L112 52 L106 44 L100 48 L94 44Z" fill="#f472b6" />
      <path d="M88 52 L100 62 L112 52" fill="#ec4899" opacity="0.4" />
      <circle cx="100" cy="58" r="5" fill="#fbbf24" />
      <circle cx="100" cy="58" r="2.5" fill="#fef3c7" />

      {/* スパークル */}
      <text x="14"  y="38"  fontSize="14" fill="#f9a8d4" opacity="0.9">✦</text>
      <text x="166" y="44"  fontSize="11" fill="#c4b5fd" opacity="0.85">✦</text>
      <text x="26"  y="162" fontSize="10" fill="#93c5fd" opacity="0.7">✶</text>
      <text x="158" y="158" fontSize="10" fill="#f9a8d4" opacity="0.7">✶</text>
    </svg>
  )
}

export default function WelcomeView({ onStartAuth, onStartGuest }: WelcomeViewProps) {
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)
  const { characterUrl, characterName } = useCharacterImage()
  useBgTheme()

  return (
    <div
      className="relative overflow-hidden rounded-[32px] px-5 py-8 md:px-8 md:py-10"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, rgba(253,186,116,0.22) 0%, transparent 40%)," +
          "radial-gradient(ellipse at 80% 5%, rgba(249,168,212,0.28) 0%, transparent 38%)," +
          "radial-gradient(ellipse at 50% 95%, rgba(196,181,253,0.22) 0%, transparent 42%)," +
          "linear-gradient(160deg,#fffbf7 0%,#fef9f0 28%,#fdf2f8 58%,#f5f0ff 82%,#eef6ff 100%)",
        border: "1.5px solid rgba(249,168,212,0.28)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.85) inset," +
          "0 24px 64px -20px rgba(236,72,153,0.14)," +
          "0 8px 32px -12px rgba(139,92,246,0.1)",
      }}
    >
      {/* やわらかい背景デコ */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] overflow-hidden" aria-hidden>
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle,#fbcfe8,transparent 70%)" }} />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle,#ddd6fe,transparent 70%)" }} />
        <div className="absolute top-1/2 right-4 h-32 w-32 rounded-full blur-2xl opacity-25"
          style={{ background: "radial-gradient(circle,#bfdbfe,transparent 70%)" }} />

        {/* フローティング装飾 */}
        {[
          { pos: "top-4 left-6",   ch: "✿", color: "rgba(249,168,212,0.7)", delay: "0s",   size: "text-lg" },
          { pos: "top-4 right-6",  ch: "✿", color: "rgba(196,181,253,0.7)", delay: "0.6s", size: "text-lg" },
          { pos: "top-6 left-[42%]", ch: "✦", color: "rgba(251,191,36,0.7)",  delay: "0.3s", size: "text-base" },
          { pos: "bottom-6 left-8",  ch: "✶", color: "rgba(147,197,253,0.6)", delay: "0.9s", size: "text-sm" },
          { pos: "bottom-6 right-8", ch: "✶", color: "rgba(249,168,212,0.6)", delay: "1.2s", size: "text-sm" },
        ].map(({ pos, ch, color, delay, size }) => (
          <span
            key={pos}
            className={`absolute ${pos} ${size} animate-float-slow select-none`}
            style={{ color, animationDelay: delay }}
          >{ch}</span>
        ))}
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">

        {/* テキストエリア */}
        <div className="space-y-5">

          {/* バッジ */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-[0.24em]"
            style={{
              background: "rgba(255,255,255,0.88)",
              border: "1px solid rgba(249,168,212,0.4)",
              color: "#be185d",
              boxShadow: "0 4px 12px -4px rgba(236,72,153,0.18)",
            }}
          >
            🧸 {t("家計をかわいく、たのしく", "Cute & fun budgeting")}
          </div>

          {/* タイトル */}
          <div>
            <h1
              className="font-black tracking-[-0.03em] leading-none"
              style={{
                fontSize: "clamp(2.4rem,7vw,3.8rem)",
                background: "linear-gradient(130deg,#ec4899 0%,#f59e0b 50%,#8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Balance
            </h1>
            <p className="mt-2 text-sm font-semibold tracking-[0.16em] text-rose-400 uppercase opacity-80">
              {t("もえきゅん家計ボード", "Moe-Kyu Budget Board")}
            </p>
            <p className="mt-4 max-w-md text-[0.95rem] leading-[1.85] text-slate-600">
              {t(
                "収支の記録から貯蓄・目標管理まで、毎日ひらきたくなるかわいい家計ボード。キャラクターや背景も自分好みにカスタマイズできます。",
                "From daily expenses to savings goals — a cute budget board you'll actually want to open every day. Customize your character and background to make it yours.",
              )}
            </p>
          </div>

          {/* ポイント */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              { icon: "📝", ja: "入力・集計がシンプル", en: "Simple input & summary" },
              { icon: "🎯", ja: "貯蓄・目標を一覧管理", en: "Track savings & goals" },
              { icon: "🎨", ja: "背景・キャラをカスタマイズ", en: "Custom background & character" },
              { icon: "📊", ja: "グラフ・カレンダー対応", en: "Charts & calendar view" },
            ].map((item) => (
              <div
                key={item.ja}
                className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-slate-700"
                style={{
                  background: "rgba(255,255,255,0.82)",
                  border: "1px solid rgba(249,168,212,0.22)",
                  boxShadow: "0 2px 8px -4px rgba(236,72,153,0.12)",
                }}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                {t(item.ja, item.en)}
              </div>
            ))}
          </div>

          {/* ボタン */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStartAuth}
              className="rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#f472b6 0%,#fb923c 50%,#a78bfa 100%)",
                boxShadow: "0 10px 28px -8px rgba(244,114,182,0.5), 0 4px 12px rgba(251,146,60,0.2)",
              }}
            >
              {t("✨ はじめる", "✨ Get started")}
            </button>
            {onStartGuest && (
              <button
                type="button"
                onClick={onStartGuest}
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-rose-500 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1.5px solid rgba(249,168,212,0.35)",
                  boxShadow: "0 4px 14px -6px rgba(236,72,153,0.18)",
                }}
              >
                {t("ゲストで試す", "Try as guest")}
              </button>
            )}
          </div>
        </div>

        {/* キャラクター */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="relative flex flex-col items-center gap-3 rounded-[28px] p-5 transition-transform duration-500 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(145deg,rgba(255,255,255,0.95),rgba(253,242,248,0.9))",
              border: "1.5px solid rgba(249,168,212,0.3)",
              boxShadow:
                "0 20px 56px -20px rgba(236,72,153,0.22)," +
                "inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* 後ろのグロー */}
            <div className="absolute inset-4 rounded-full blur-2xl opacity-50"
              style={{ background: "radial-gradient(circle,rgba(249,168,212,0.5),rgba(196,181,253,0.3),transparent 70%)" }} />

            <div className="relative z-10">
              {characterUrl ? (
                <Image
                  src={characterUrl}
                  alt={characterName || t("マイキャラクター", "My character")}
                  width={220}
                  height={220}
                  className="h-52 w-52 rounded-[20px] object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <DefaultCharacter />
              )}
            </div>

            <p className="relative z-10 text-xs font-bold tracking-widest text-rose-400">
              🧸 {characterUrl
                ? (characterName || t("マイキャラクター", "My character"))
                : t("あなたのキャラクターを設定できます", "Set your character")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
