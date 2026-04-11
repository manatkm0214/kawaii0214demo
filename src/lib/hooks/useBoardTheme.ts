"use client";

import { useEffect, useState } from "react";

export const BOARD_BG_KEY = "kakeibo-board-bg";
export const BOARD_CHANGE_EVENT = "kakeibo-board-bg-updated";

export const BOARD_PRESETS = [
  { id: "princess-idol-board", labelJa: "お姫様アイドル", labelEn: "Princess Idol", bg: "linear-gradient(145deg, #fff8fc 0%, #ffe4f3 34%, #f5d9ff 68%, #dbeafe 100%)", border: "#f9a8d4", surface: "#fff7fb", accent: "pink", category: "idol" },
  { id: "clean-white", labelJa: "標準ライト", labelEn: "Light Standard", bg: "linear-gradient(145deg, #ffffff 0%, #f8fafc 52%, #eef2ff 100%)", border: "#d8e2f0", surface: "#f8fafc", accent: "cyan", category: "standard" },
  { id: "seiso-lace", labelJa: "清楚レース", labelEn: "Elegant Lace", bg: "linear-gradient(150deg, #ffffff 0%, #f8f4ff 40%, #eef6ff 100%)", border: "#c7d2fe", surface: "#f0f4ff", accent: "indigo", category: "seiso" },
  { id: "atelier-air", labelJa: "アトリエエアリー", labelEn: "Atelier Air", bg: "linear-gradient(145deg, #fffdfa 0%, #fff5ec 28%, #f3e8ff 64%, #dbeafe 100%)", border: "#e9c7d8", surface: "#fff9fb", accent: "rose", category: "oshare" },
  { id: "idol-pink", labelJa: "アイドルピンク", labelEn: "Idol Pink", bg: "linear-gradient(145deg, #fff8fd 0%, #ffe0f7 50%, #ffd1ec 100%)", border: "#fcd7e8", surface: "#fff0f8", accent: "pink", category: "idol" },
  { id: "idol-candy", labelJa: "アイドルキャンディ", labelEn: "Idol Candy", bg: "linear-gradient(145deg, #fffafc 0%, #ffe0f0 30%, #ffd2ea 62%, #ffc6de 100%)", border: "#f5c6e8", surface: "#fff6fa", accent: "pink", category: "idol" },
  { id: "idol-stage", labelJa: "キラキラステージ", labelEn: "Sparkle Stage", bg: "linear-gradient(145deg, #fff8fc 0%, #fee2f2 32%, #e9d5ff 68%, #dbeafe 100%)", border: "#f9a8d4", surface: "#fff7fb", accent: "fuchsia", category: "idol" },
  { id: "sakura-stage", labelJa: "さくらステージ", labelEn: "Sakura Stage", bg: "linear-gradient(145deg, #fffafc 0%, #ffe4f0 34%, #fce7f3 70%, #dbeafe 100%)", border: "#fbcfe8", surface: "#fff7fb", accent: "pink", category: "idol" },
  { id: "oshare-runway", labelJa: "ランウェイシック", labelEn: "Runway Chic", bg: "linear-gradient(145deg, #fffdf8 0%, #fef3c7 26%, #fce7f3 58%, #e0f2fe 100%)", border: "#f9c5d7", surface: "#fffaf3", accent: "amber", category: "oshare" },
  { id: "oshare-gloss", labelJa: "グロッシーラウンジ", labelEn: "Glossy Lounge", bg: "linear-gradient(145deg, #fffefb 0%, #fdf2f8 30%, #ede9fe 64%, #dbeafe 100%)", border: "#d8b4fe", surface: "#fdf4ff", accent: "violet", category: "oshare" },
  { id: "rose-garden-board", labelJa: "ローズガーデン", labelEn: "Rose Garden", bg: "linear-gradient(145deg, #fff8fb 0%, #ffe4ef 40%, #eef6ff 100%)", border: "#f9a8d4", surface: "#fff5f8", accent: "rose", category: "oshare" },
  { id: "sunflower-board", labelJa: "ひまわりブルーム", labelEn: "Sunflower Bloom", bg: "linear-gradient(145deg, #fffdf5 0%, #fef3c7 38%, #fde68a 100%)", border: "#fcd34d", surface: "#fffbeb", accent: "amber", category: "oshare" },
  { id: "seiso", labelJa: "清楚", labelEn: "Elegant", bg: "linear-gradient(150deg, #fefefe 0%, #f5f3ff 50%, #eef2ff 100%)", border: "#ddd6fe", surface: "#f5f3ff", accent: "violet", category: "seiso" },
  { id: "snow-crystal-board", labelJa: "雪の結晶", labelEn: "Snow Crystal", bg: "linear-gradient(145deg, #fbfdff 0%, #eef6ff 44%, #dbeafe 100%)", border: "#bfdbfe", surface: "#f8fbff", accent: "blue", category: "seiso" },
  { id: "fantasy-castle-board", labelJa: "ファンタジーキャッスル", labelEn: "Fantasy Castle", bg: "linear-gradient(145deg, #fdfcff 0%, #ede9fe 34%, #e0f2fe 66%, #fce7f3 100%)", border: "#c4b5fd", surface: "#f8f7ff", accent: "violet", category: "fantasy" },
  { id: "fantasy-moon-board", labelJa: "ファンタジームーン", labelEn: "Fantasy Moon", bg: "linear-gradient(145deg, #f8fbff 0%, #ddd6fe 38%, #bfdbfe 68%, #fde68a 100%)", border: "#bfdbfe", surface: "#f8fbff", accent: "indigo", category: "fantasy" },
  { id: "oshi-red", labelJa: "推しレッド", labelEn: "Oshi Red", bg: "linear-gradient(145deg, #fff7f7 0%, #fecaca 42%, #f87171 100%)", border: "#fca5a5", surface: "#fff5f5", accent: "rose", category: "oshi" },
  { id: "oshi-orange", labelJa: "推しオレンジ", labelEn: "Oshi Orange", bg: "linear-gradient(145deg, #fffaf5 0%, #fed7aa 42%, #fb923c 100%)", border: "#fdba74", surface: "#fff7ed", accent: "amber", category: "oshi" },
  { id: "oshi-yellow", labelJa: "推しイエロー", labelEn: "Oshi Yellow", bg: "linear-gradient(145deg, #fffef3 0%, #fde68a 42%, #facc15 100%)", border: "#fde047", surface: "#fefce8", accent: "yellow", category: "oshi" },
  { id: "oshi-green", labelJa: "推しグリーン", labelEn: "Oshi Green", bg: "linear-gradient(145deg, #f7fff8 0%, #bbf7d0 42%, #4ade80 100%)", border: "#86efac", surface: "#f0fdf4", accent: "green", category: "oshi" },
  { id: "oshi-mint", labelJa: "推しミント", labelEn: "Oshi Mint", bg: "linear-gradient(145deg, #f3fffd 0%, #99f6e4 42%, #2dd4bf 100%)", border: "#5eead4", surface: "#ecfeff", accent: "teal", category: "oshi" },
  { id: "oshi-blue", labelJa: "推しブルー", labelEn: "Oshi Blue", bg: "linear-gradient(145deg, #f5faff 0%, #bfdbfe 42%, #60a5fa 100%)", border: "#93c5fd", surface: "#eff6ff", accent: "blue", category: "oshi" },
  { id: "oshi-purple", labelJa: "推しパープル", labelEn: "Oshi Purple", bg: "linear-gradient(145deg, #fcfaff 0%, #ddd6fe 42%, #a78bfa 100%)", border: "#c4b5fd", surface: "#f5f3ff", accent: "purple", category: "oshi" },
  { id: "oshi-white", labelJa: "推しホワイト", labelEn: "Oshi White", bg: "linear-gradient(145deg, #ffffff 0%, #f8fafc 42%, #e2e8f0 100%)", border: "#cbd5e1", surface: "#f8fafc", accent: "slate", category: "oshi" },
  { id: "oshi-black", labelJa: "推しブラック", labelEn: "Oshi Black", bg: "linear-gradient(145deg, #f8fafc 0%, #cbd5e1 42%, #64748b 100%)", border: "#94a3b8", surface: "#e2e8f0", accent: "slate", category: "oshi" },
  { id: "oshi-crystal", labelJa: "推しクリスタル", labelEn: "Oshi Crystal", bg: "linear-gradient(145deg, #f8fbff 0%, #dbeafe 42%, #c4b5fd 100%)", border: "#93c5fd", surface: "#eff6ff", accent: "indigo", category: "oshi" },
  { id: "oshi-gold", labelJa: "推しゴールド", labelEn: "Oshi Gold", bg: "linear-gradient(145deg, #fffdf5 0%, #fde68a 36%, #f59e0b 100%)", border: "#fcd34d", surface: "#fffbeb", accent: "amber", category: "oshi" },
  { id: "oshi-silver", labelJa: "推しシルバー", labelEn: "Oshi Silver", bg: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 42%, #94a3b8 100%)", border: "#cbd5e1", surface: "#f1f5f9", accent: "slate", category: "oshi" },
  { id: "game-cyber", labelJa: "ゲームサイバー", labelEn: "Game Cyber", bg: "linear-gradient(145deg, #f8fbff 0%, #dbeafe 34%, #c4b5fd 100%)", border: "#93c5fd", surface: "#eff6ff", accent: "blue", category: "game" },
  { id: "game-crystal", labelJa: "クリスタルHUD", labelEn: "Crystal HUD", bg: "linear-gradient(145deg, #ffffff 0%, #e0f2fe 36%, #ddd6fe 100%)", border: "#a5b4fc", surface: "#eef2ff", accent: "indigo", category: "game" },
  { id: "game-arcade", labelJa: "アーケードポップ", labelEn: "Arcade Pop", bg: "linear-gradient(145deg, #fff7fc 0%, #e0f2fe 34%, #f5d0fe 100%)", border: "#f0abfc", surface: "#faf5ff", accent: "fuchsia", category: "game" },
  { id: "couture-rose", labelJa: "クチュールローズ", labelEn: "Couture Rose", bg: "linear-gradient(145deg, #fffafc 0%, #ffe4ef 40%, #fbcfe8 100%)", border: "#f9a8d4", surface: "#fdf2f8", accent: "rose", category: "couture" },
  { id: "couture-champagne", labelJa: "シャンパンモード", labelEn: "Champagne Mode", bg: "linear-gradient(145deg, #fffdf7 0%, #fef3c7 36%, #fde68a 100%)", border: "#fcd34d", surface: "#fffbeb", accent: "amber", category: "couture" },
  { id: "mint", labelJa: "ミントフリル", labelEn: "Mint Frill", bg: "linear-gradient(145deg, #f7fffd 0%, #ecfdf5 50%, #f0fdf9 100%)", border: "#a7f3d0", surface: "#ecfdf5", accent: "teal", category: "natural" },
  { id: "lavender", labelJa: "ラベンダー", labelEn: "Lavender", bg: "linear-gradient(145deg, #faf8ff 0%, #f3e8ff 50%, #ede9fe 100%)", border: "#d8b4fe", surface: "#f3e8ff", accent: "purple", category: "natural" },
  { id: "rock", labelJa: "ロック", labelEn: "Rock", bg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)", border: "#cbd5e1", surface: "#f1f5f9", accent: "slate", category: "rock" },
] as const;

export type BoardPreset = (typeof BOARD_PRESETS)[number];

function applyBoardBg(preset: BoardPreset) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--board-bg", preset.bg);
  root.style.setProperty("--board-border", preset.border);
  root.style.setProperty("--board-surface", preset.surface);
  root.setAttribute("data-board-accent", preset.accent);
}

export function useBoardTheme() {
  const [boardId, setBoardId] = useState<string>(() => {
    if (typeof window === "undefined") return BOARD_PRESETS[0].id;
    return localStorage.getItem(`${BOARD_BG_KEY}-id`) || BOARD_PRESETS[0].id;
  });

  useEffect(() => {
    const preset = BOARD_PRESETS.find((p) => p.id === boardId) ?? BOARD_PRESETS[0];
    applyBoardBg(preset);
  }, [boardId]);

  useEffect(() => {
    function sync() {
      const nextId = localStorage.getItem(`${BOARD_BG_KEY}-id`) || BOARD_PRESETS[0].id;
      const nextPreset = BOARD_PRESETS.find((p) => p.id === nextId) ?? BOARD_PRESETS[0];
      setBoardId(nextId);
      applyBoardBg(nextPreset);
    }
    window.addEventListener(BOARD_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(BOARD_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setBoard = (id: string) => {
    const preset = BOARD_PRESETS.find((p) => p.id === id) ?? BOARD_PRESETS[0];
    localStorage.setItem(`${BOARD_BG_KEY}-id`, preset.id);
    setBoardId(preset.id);
    applyBoardBg(preset);
    window.dispatchEvent(new Event(BOARD_CHANGE_EVENT));
  };

  const resetBoard = () => setBoard(BOARD_PRESETS[0].id);

  return { boardId, setBoard, resetBoard };
}
