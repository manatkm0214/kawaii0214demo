"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useMemo, useRef, useState } from "react";
import { BG_PRESETS, useBgTheme } from "../../lib/hooks/useBgTheme";
import { BOARD_PRESETS, useBoardTheme } from "../../lib/hooks/useBoardTheme";
import { useCharacterImage } from "../../lib/hooks/useCharacterImage";
import { setLang, useLang } from "../../lib/hooks/useLang";

const PAGE_CATEGORIES = [
  { key: "oshare", labelJa: "おしゃれ", labelEn: "Oshare" },
  { key: "idol", labelJa: "アイドル", labelEn: "Idol" },
  { key: "oshi", labelJa: "推しメンカラー", labelEn: "Oshi Colors" },
  { key: "fantasy", labelJa: "ファンタジー", labelEn: "Fantasy" },
  { key: "game", labelJa: "ゲーム", labelEn: "Game" },
  { key: "seiso", labelJa: "清楚", labelEn: "Elegant" },
  { key: "couture", labelJa: "クチュール", labelEn: "Couture" },
  { key: "natural", labelJa: "ナチュラル", labelEn: "Natural" },
  { key: "rock", labelJa: "ロック", labelEn: "Rock" },
] as const;

const BOARD_CATEGORIES = [
  { key: "oshare", labelJa: "おしゃれ", labelEn: "Oshare" },
  { key: "standard", labelJa: "標準", labelEn: "Standard" },
  { key: "idol", labelJa: "アイドル", labelEn: "Idol" },
  { key: "oshi", labelJa: "推しメンカラー", labelEn: "Oshi Colors" },
  { key: "fantasy", labelJa: "ファンタジー", labelEn: "Fantasy" },
  { key: "game", labelJa: "ゲーム", labelEn: "Game" },
  { key: "seiso", labelJa: "清楚", labelEn: "Elegant" },
  { key: "couture", labelJa: "クチュール", labelEn: "Couture" },
  { key: "natural", labelJa: "ナチュラル", labelEn: "Natural" },
  { key: "rock", labelJa: "ロック", labelEn: "Rock" },
] as const;

const STYLE_GUIDES = [
  {
    emoji: "✨",
    nameJa: "おしゃれモード",
    nameEn: "Oshare Mode",
    noteJa: "ファッション誌っぽい華やかさをまとめて反映します。",
    noteEn: "Apply a polished fashion-look mood in one tap.",
    pagePreset: "oshare-runway",
    boardPreset: "atelier-air",
  },
  {
    emoji: "🎤",
    nameJa: "アイドルきらめき",
    nameEn: "Idol Sparkle",
    noteJa: "ピンクの艶感とステージ感を強めたアイドル風です。",
    noteEn: "Idol-inspired shine with stage sparkle.",
    pagePreset: "idol-stage",
    boardPreset: "idol-stage",
  },
  {
    emoji: "❤️",
    nameJa: "推しレッド",
    nameEn: "Oshi Red",
    noteJa: "赤担当のメンバーカラーを主役にできます。",
    noteEn: "A vivid member-color style centered on red.",
    pagePreset: "oshi-red",
    boardPreset: "oshi-red",
  },
  {
    emoji: "💙",
    nameJa: "推しブルー",
    nameEn: "Oshi Blue",
    noteJa: "青担当らしい透明感と爽やかさを出せます。",
    noteEn: "A clear blue member-color style.",
    pagePreset: "oshi-blue",
    boardPreset: "oshi-blue",
  },
  {
    emoji: "💎",
    nameJa: "推しクリスタル",
    nameEn: "Oshi Crystal",
    noteJa: "透明感のあるクリスタル系で特別感を出します。",
    noteEn: "A crystal-clear look with special shine.",
    pagePreset: "oshi-crystal",
    boardPreset: "oshi-crystal",
  },
  {
    emoji: "🏰",
    nameJa: "ファンタジーキャッスル",
    nameEn: "Fantasy Castle",
    noteJa: "お城や魔法っぽい雰囲気で、夢かわいい方向に寄せます。",
    noteEn: "A dreamy fantasy look inspired by castles and magic.",
    pagePreset: "fantasy-castle",
    boardPreset: "fantasy-castle-board",
  },
  {
    emoji: "👑",
    nameJa: "推しゴールド",
    nameEn: "Oshi Gold",
    noteJa: "王道のゴールド感で主役っぽく仕上げます。",
    noteEn: "A royal gold look with center-stage energy.",
    pagePreset: "oshi-gold",
    boardPreset: "oshi-gold",
  },
  {
    emoji: "🩶",
    nameJa: "推しシルバー",
    nameEn: "Oshi Silver",
    noteJa: "上品でシャープなシルバー系にまとまります。",
    noteEn: "A sleek and elegant silver look.",
    pagePreset: "oshi-silver",
    boardPreset: "oshi-silver",
  },
  {
    emoji: "🎮",
    nameJa: "ゲームサイバー",
    nameEn: "Game Cyber",
    noteJa: "ゲームUIっぽいクールな光をまとめて反映します。",
    noteEn: "A cool game UI mood in one tap.",
    pagePreset: "game-cyber",
    boardPreset: "game-cyber",
  },
  {
    emoji: "🕊️",
    nameJa: "清楚レース",
    nameEn: "Elegant Lace",
    noteJa: "白、水色、ラベンダーでやわらかく見せる清楚系です。",
    noteEn: "A graceful look with white, pale blue, and lavender.",
    pagePreset: "seiso-lace",
    boardPreset: "seiso-lace",
  },
  {
    emoji: "🌹",
    nameJa: "クチュールローズ",
    nameEn: "Couture Rose",
    noteJa: "ブランドルックブックのような艶感を出せます。",
    noteEn: "A polished couture-rose editorial style.",
    pagePreset: "couture-rose",
    boardPreset: "couture-rose",
  },
] as const;

export default function CustomizePage() {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);
  const [pageCat, setPageCat] = useState<string>("oshare");
  const [boardCat, setBoardCat] = useState<string>("oshare");

  const { bgId, setBg, resetBg } = useBgTheme();
  const { boardId, setBoard, resetBoard } = useBoardTheme();
  const { characterUrl, characterName, setCharacterUrl, setCharacterName, clearCharacter } = useCharacterImage();
  const [urlInput, setUrlInput] = useState(characterUrl);
  const [nameInput, setNameInput] = useState(characterName);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = String(e.target?.result || "");
      setUrlInput(url);
      setCharacterUrl(url);
    };
    reader.readAsDataURL(file);
  }

  const filteredPagePresets = useMemo(() => BG_PRESETS.filter((preset) => preset.category === pageCat), [pageCat]);
  const filteredBoardPresets = useMemo(() => BOARD_PRESETS.filter((preset) => preset.category === boardCat), [boardCat]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="hero-stage rounded-[32px] px-6 py-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="hero-badge px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.28em]">
                {t("デザイン設定", "Design settings")}
              </p>
              <h1 className="hero-title mt-3 text-3xl font-black">{t("好きな世界観で選ぶ", "Choose by visual mood")}</h1>
              <p className="hero-copy mt-3 max-w-2xl text-sm">
                {t(
                  "おしゃれ、アイドル、推しメンカラー、ゲーム、清楚、クチュールまで、背景とボードをまとめて整えられます。",
                  "Choose backgrounds and board skins by mood: oshare, idol, oshi colors, game, elegant, couture, and more.",
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-full border border-white/70 bg-white/70 p-1 backdrop-blur">
                <button type="button" className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "ja" ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-white"}`} onClick={() => setLang("ja")}>JA</button>
                <button type="button" className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "en" ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-white"}`} onClick={() => setLang("en")}>EN</button>
              </div>
              <button type="button" className="app-chip" onClick={() => window.print()}>{t("印刷", "Print")}</button>
            </div>
          </div>
        </header>

        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{t("おすすめテイスト", "Recommended styles")}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {t("方向性を決めて、背景とボードをまとめて反映できます。", "Apply a full direction inspired by your favorite look.")}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {STYLE_GUIDES.map((style) => (
              <button
                key={style.nameEn}
                type="button"
                onClick={() => {
                  const pagePreset = BG_PRESETS.find((item) => item.id === style.pagePreset);
                  if (pagePreset) setBg(pagePreset.id, pagePreset.value);
                  setBoard(style.boardPreset);
                }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-pink-300 hover:shadow-sm"
              >
                <span className="text-2xl">{style.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{lang === "en" ? style.nameEn : style.nameJa}</p>
                  <p className="text-xs text-slate-500">{lang === "en" ? style.noteEn : style.noteJa}</p>
                </div>
                <span className="rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">{t("適用", "Apply")}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{t("トップ背景", "Homepage background")}</h2>
              <p className="mt-1 text-sm text-slate-500">{t("アプリ全体の空気感を決めます。", "This sets the overall mood across the app.")}</p>
            </div>
            <button type="button" onClick={resetBg} className="app-chip shrink-0">{t("リセット", "Reset")}</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PAGE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setPageCat(cat.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${pageCat === cat.key ? "bg-pink-500 text-white" : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
              >
                {lang === "en" ? cat.labelEn : cat.labelJa}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPagePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setBg(preset.id, preset.value)}
                className={`group relative h-28 overflow-hidden rounded-[28px] border text-left transition hover:-translate-y-0.5 ${bgId === preset.id ? "border-pink-400 shadow-[0_12px_32px_rgba(244,114,182,0.18)]" : "border-slate-200"}`}
                style={{ background: preset.value }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_30%)]" />
                <div className="absolute inset-x-4 bottom-4">
                  <div className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur">{preset.label}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{t("ボード背景", "Board background")}</h2>
              <p className="mt-1 text-sm text-slate-500">{t("入力ボードやカードの雰囲気を変えます。", "This changes the panel and board look used in the app.")}</p>
            </div>
            <button type="button" onClick={resetBoard} className="app-chip shrink-0">{t("リセット", "Reset")}</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {BOARD_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setBoardCat(cat.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${boardCat === cat.key ? "bg-cyan-500 text-white" : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
              >
                {lang === "en" ? cat.labelEn : cat.labelJa}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBoardPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setBoard(preset.id)}
                className={`group relative h-24 overflow-hidden rounded-[28px] border text-left transition hover:-translate-y-0.5 ${boardId === preset.id ? "border-cyan-400 shadow-[0_8px_24px_rgba(6,182,212,0.18)]" : "border-slate-200"}`}
                style={{ background: preset.bg }}
              >
                <div className="absolute inset-x-4 bottom-4">
                  <div className="inline-flex rounded-full border px-3 py-1 text-xs font-bold text-black" style={{ background: "rgba(255,255,255,0.85)", borderColor: preset.border }}>
                    {lang === "en" ? preset.labelEn : preset.labelJa}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">{t("キャラクター設定", "Character settings")}</h2>
              <p className="mt-2 text-sm text-slate-600">{t("アイドル風、ブランド風、ゲーム風に合わせてキャラクター画像も設定できます。", "Set a character image to match your style.")}</p>
              <div className="mt-5 flex items-start gap-4">
                {characterUrl ? (
                  <img src={characterUrl} alt={t("キャラクター画像", "Character image")} className="h-20 w-20 rounded-full border-4 border-pink-200 object-cover shadow-sm" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-200 bg-white text-2xl">✨</div>
                )}
                <div className="flex-1 space-y-3">
                  <input type="text" placeholder={t("画像URL", "Image URL")} value={urlInput} onChange={(e) => setUrlInput(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-300" />
                  <input type="text" placeholder={t("名前", "Name")} value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-300" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="rounded-full bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-400" onClick={() => { setCharacterUrl(urlInput); setCharacterName(nameInput); }}>{t("保存", "Save")}</button>
                <button type="button" className="app-chip" onClick={() => fileRef.current?.click()}>{t("画像を選ぶ", "Choose file")}</button>
                {characterUrl && <button type="button" className="app-chip" onClick={() => { clearCharacter(); setUrlInput(""); setNameInput(""); }}>{t("削除", "Delete")}</button>}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">{t("入力ボードのプレビュー", "Input board preview")}</h2>
              <p className="mt-2 text-sm text-slate-600">{t("選んだ背景がどんな見た目になるか確認できます。", "Preview how your selected aesthetic looks in the board below.")}</p>
              <iframe src="/customize/InputBoard" title="Customize Input Board" className="mt-5 min-h-[350px] w-full rounded-[28px] border border-slate-200 bg-white shadow-sm" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
