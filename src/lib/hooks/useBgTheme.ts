"use client";

import { useEffect, useState } from "react";

export const BG_KEY = "kakeibo-custom-bg";

export const BG_PRESETS = [
  { id: "princess-idol", label: "お姫様アイドル", category: "idol", value: "radial-gradient(circle at 18% 16%, rgba(255,255,255,0.95) 0 10px, rgba(251,207,232,0.34) 11px 24px, transparent 25px), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.92) 0 10px, rgba(191,219,254,0.3) 11px 24px, transparent 25px), linear-gradient(145deg, #fff8fc 0%, #ffe4f3 30%, #f5d9ff 62%, #dbeafe 100%)" },
  { id: "seiso-white", label: "清楚ホワイト", category: "seiso", value: "linear-gradient(150deg, #ffffff 0%, #f0f4ff 50%, #e8f0fe 100%)" },
  { id: "seiso-lace", label: "清楚レース", category: "seiso", value: "linear-gradient(150deg, #fffefc 0%, #f8f4ff 34%, #eef6ff 100%)" },
  { id: "atelier-light", label: "おしゃれライト", category: "oshare", value: "linear-gradient(145deg, #fffdfa 0%, #fff4ea 28%, #f5ebff 62%, #dbeafe 100%)" },
  { id: "oshare-runway", label: "ランウェイグロウ", category: "oshare", value: "linear-gradient(145deg, #fffdf8 0%, #fef3c7 22%, #fce7f3 56%, #dbeafe 100%)" },
  { id: "oshare-atelier", label: "アトリエシック", category: "oshare", value: "linear-gradient(145deg, #fffaf5 0%, #ffe4e6 26%, #ede9fe 62%, #e0f2fe 100%)" },
  { id: "oshare-gloss", label: "グロッシームード", category: "oshare", value: "linear-gradient(145deg, #fffefb 0%, #fdf2f8 30%, #e9d5ff 64%, #bfdbfe 100%)" },
  { id: "flower-bloom", label: "花柄ブルーム", category: "oshare", value: "radial-gradient(circle at 12% 20%, rgba(255,255,255,0.85) 0 10px, rgba(244,114,182,0.22) 11px 24px, transparent 25px), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.8) 0 10px, rgba(253,186,116,0.24) 11px 24px, transparent 25px), radial-gradient(circle at 28% 74%, rgba(255,255,255,0.82) 0 10px, rgba(56,189,248,0.2) 11px 24px, transparent 25px), radial-gradient(circle at 76% 76%, rgba(255,255,255,0.82) 0 10px, rgba(196,181,253,0.26) 11px 24px, transparent 25px), linear-gradient(145deg, #fffafc 0%, #ffe7ef 34%, #eef6ff 100%)" },
  { id: "rose-garden", label: "ローズガーデン", category: "oshare", value: "radial-gradient(circle at 14% 22%, rgba(255,255,255,0.9) 0 9px, rgba(244,114,182,0.28) 10px 22px, transparent 23px), radial-gradient(circle at 72% 18%, rgba(255,255,255,0.88) 0 9px, rgba(251,113,133,0.26) 10px 22px, transparent 23px), radial-gradient(circle at 32% 76%, rgba(255,255,255,0.88) 0 9px, rgba(253,164,175,0.24) 10px 22px, transparent 23px), linear-gradient(145deg, #fff8fb 0%, #ffe4ef 38%, #eef6ff 100%)" },
  { id: "sakura-petal", label: "さくらペタル", category: "idol", value: "radial-gradient(ellipse at 16% 24%, rgba(255,255,255,0.9) 0 10px, rgba(253,164,175,0.26) 11px 22px, transparent 23px), radial-gradient(ellipse at 76% 20%, rgba(255,255,255,0.88) 0 10px, rgba(251,207,232,0.28) 11px 22px, transparent 23px), radial-gradient(ellipse at 34% 78%, rgba(255,255,255,0.88) 0 10px, rgba(244,114,182,0.2) 11px 22px, transparent 23px), linear-gradient(145deg, #fffafc 0%, #ffe4f0 36%, #fce7f3 70%, #dbeafe 100%)" },
  { id: "sunflower-bloom", label: "ひまわりブルーム", category: "oshare", value: "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.9) 0 9px, rgba(253,224,71,0.3) 10px 22px, transparent 23px), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.88) 0 9px, rgba(251,191,36,0.28) 10px 22px, transparent 23px), radial-gradient(circle at 42% 74%, rgba(255,255,255,0.88) 0 9px, rgba(250,204,21,0.22) 10px 22px, transparent 23px), linear-gradient(145deg, #fffdf5 0%, #fef3c7 36%, #fde68a 70%, #fff7ed 100%)" },
  { id: "stripe-couture", label: "ストライプクチュール", category: "oshare", value: "repeating-linear-gradient(125deg, rgba(255,255,255,0.76) 0 14px, rgba(255,228,230,0.72) 14px 28px, rgba(237,233,254,0.8) 28px 42px, rgba(219,234,254,0.72) 42px 56px), linear-gradient(145deg, #fffdf8 0%, #ffe7ef 52%, #dbeafe 100%)" },
  { id: "check-tweed", label: "チェックツイード", category: "oshare", value: "repeating-linear-gradient(0deg, rgba(255,255,255,0.64) 0 18px, rgba(255,228,230,0.28) 18px 36px), repeating-linear-gradient(90deg, rgba(255,255,255,0.54) 0 18px, rgba(219,234,254,0.22) 18px 36px), linear-gradient(145deg, #fffdfa 0%, #ffe7ef 34%, #eef6ff 100%)" },
  { id: "dot-parfait", label: "ドットパルフェ", category: "oshare", value: "radial-gradient(circle, rgba(255,255,255,0.82) 0 8px, transparent 9px) 0 0/48px 48px, radial-gradient(circle, rgba(251,207,232,0.3) 0 8px, transparent 9px) 24px 24px/48px 48px, linear-gradient(145deg, #fffafc 0%, #ffe7ef 34%, #eef6ff 100%)" },
  { id: "fruit-mix", label: "フルーツミックス", category: "oshare", value: "radial-gradient(circle at 16% 22%, rgba(255,255,255,0.92) 0 10px, rgba(253,186,116,0.32) 11px 22px, transparent 23px), radial-gradient(circle at 76% 28%, rgba(255,255,255,0.92) 0 10px, rgba(244,114,182,0.28) 11px 22px, transparent 23px), radial-gradient(circle at 34% 76%, rgba(255,255,255,0.92) 0 10px, rgba(74,222,128,0.24) 11px 22px, transparent 23px), radial-gradient(circle at 82% 76%, rgba(255,255,255,0.9) 0 10px, rgba(56,189,248,0.24) 11px 22px, transparent 23px), linear-gradient(145deg, #fffdf6 0%, #ffe8ef 36%, #eefbf5 68%, #e0f2fe 100%)" },
  { id: "houndstooth-mode", label: "千鳥格子モード", category: "oshare", value: "linear-gradient(135deg, rgba(15,23,42,0.1) 25%, transparent 25%) -16px 0/32px 32px, linear-gradient(225deg, rgba(15,23,42,0.1) 25%, transparent 25%) -16px 0/32px 32px, linear-gradient(315deg, rgba(15,23,42,0.08) 25%, transparent 25%) 0 0/32px 32px, linear-gradient(45deg, rgba(15,23,42,0.08) 25%, transparent 25%) 0 0/32px 32px, linear-gradient(145deg, #fffdfb 0%, #ffe7ef 34%, #edf2ff 100%)" },
  { id: "makeup-blend", label: "メイクアップブレンド", category: "oshare", value: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.76), transparent 24%), radial-gradient(circle at 70% 22%, rgba(251,207,232,0.42), transparent 26%), radial-gradient(circle at 34% 78%, rgba(253,186,116,0.26), transparent 24%), radial-gradient(circle at 84% 72%, rgba(56,189,248,0.24), transparent 22%), linear-gradient(135deg, #fff8fb 0%, #ffd6e8 28%, #f9a8d4 46%, #fda4af 62%, #fdba74 78%, #bfdbfe 100%)" },
  { id: "idol-stage", label: "アイドルステージ", category: "idol", value: "radial-gradient(circle at top, #fff7fc 0%, #ffe1f1 26%, #f5d9ff 58%, #dbeafe 100%)" },
  { id: "idol-candy", label: "アイドルキャンディ", category: "idol", value: "linear-gradient(145deg, #fff8fd 0%, #ffe0f0 30%, #ffd2ea 62%, #ffc6de 100%)" },
  { id: "idol-sakura", label: "アイドルさくら", category: "idol", value: "linear-gradient(145deg, #fffafc 0%, #ffe4f0 28%, #fecdd3 60%, #fda4af 100%)" },
  { id: "heart-ribbon", label: "ハートリボン", category: "idol", value: "radial-gradient(circle at 16% 22%, rgba(255,255,255,0.9) 0 8px, rgba(244,114,182,0.18) 9px 18px, transparent 19px), radial-gradient(circle at 24% 22%, rgba(255,255,255,0.9) 0 8px, rgba(244,114,182,0.18) 9px 18px, transparent 19px), linear-gradient(45deg, transparent 0 44%, rgba(244,114,182,0.16) 44% 56%, transparent 56% 100%), radial-gradient(circle at 72% 28%, rgba(255,255,255,0.88) 0 8px, rgba(251,113,133,0.18) 9px 18px, transparent 19px), radial-gradient(circle at 80% 28%, rgba(255,255,255,0.88) 0 8px, rgba(251,113,133,0.18) 9px 18px, transparent 19px), linear-gradient(-45deg, transparent 0 44%, rgba(251,113,133,0.14) 44% 56%, transparent 56% 100%), linear-gradient(145deg, #fff8fd 0%, #ffe4f3 34%, #e9d5ff 68%, #dbeafe 100%)" },
  { id: "ribbon-party", label: "リボンパーティ", category: "idol", value: "repeating-linear-gradient(135deg, rgba(255,255,255,0.72) 0 14px, rgba(254,205,211,0.34) 14px 28px, rgba(251,207,232,0.34) 28px 42px, rgba(191,219,254,0.28) 42px 56px), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.86) 0 10px, transparent 11px), radial-gradient(circle at 74% 72%, rgba(255,255,255,0.82) 0 10px, transparent 11px), linear-gradient(145deg, #fffafc 0%, #ffe7ef 34%, #f5d9ff 68%, #dbeafe 100%)" },
  { id: "melody-pop", label: "音符ポップ", category: "idol", value: "linear-gradient(90deg, transparent 0 14%, rgba(244,114,182,0.24) 14% 15%, transparent 15% 100%), linear-gradient(90deg, transparent 0 72%, rgba(56,189,248,0.24) 72% 73%, transparent 73% 100%), radial-gradient(circle at 14% 76%, rgba(255,255,255,0.92) 0 12px, rgba(244,114,182,0.24) 13px 24px, transparent 25px), radial-gradient(circle at 72% 68%, rgba(255,255,255,0.9) 0 12px, rgba(56,189,248,0.24) 13px 24px, transparent 25px), linear-gradient(145deg, #fff9fd 0%, #ffe4f3 30%, #ede9fe 66%, #dbeafe 100%)" },
  { id: "fantasy-castle", label: "ファンタジーキャッスル", category: "fantasy", value: "radial-gradient(circle at 50% 16%, rgba(255,255,255,0.96) 0 12px, rgba(196,181,253,0.34) 13px 28px, transparent 29px), radial-gradient(circle at 18% 76%, rgba(255,255,255,0.88) 0 10px, rgba(251,191,36,0.24) 11px 24px, transparent 25px), linear-gradient(145deg, #fdfcff 0%, #ede9fe 34%, #e0f2fe 66%, #fce7f3 100%)" },
  { id: "fantasy-moon", label: "ファンタジームーン", category: "fantasy", value: "radial-gradient(circle at 76% 20%, rgba(255,255,255,0.96) 0 14px, rgba(219,234,254,0.32) 15px 30px, transparent 31px), linear-gradient(145deg, #f8fbff 0%, #ddd6fe 38%, #bfdbfe 68%, #fde68a 100%)" },
  { id: "oshi-red", label: "推しレッド", category: "oshi", value: "linear-gradient(145deg, #fff7f7 0%, #fecaca 42%, #f87171 100%)" },
  { id: "oshi-orange", label: "推しオレンジ", category: "oshi", value: "linear-gradient(145deg, #fffaf5 0%, #fed7aa 42%, #fb923c 100%)" },
  { id: "oshi-yellow", label: "推しイエロー", category: "oshi", value: "linear-gradient(145deg, #fffef3 0%, #fde68a 42%, #facc15 100%)" },
  { id: "oshi-green", label: "推しグリーン", category: "oshi", value: "linear-gradient(145deg, #f7fff8 0%, #bbf7d0 42%, #4ade80 100%)" },
  { id: "oshi-mint", label: "推しミント", category: "oshi", value: "linear-gradient(145deg, #f3fffd 0%, #99f6e4 42%, #2dd4bf 100%)" },
  { id: "oshi-blue", label: "推しブルー", category: "oshi", value: "linear-gradient(145deg, #f5faff 0%, #bfdbfe 42%, #60a5fa 100%)" },
  { id: "oshi-purple", label: "推しパープル", category: "oshi", value: "linear-gradient(145deg, #fcfaff 0%, #ddd6fe 42%, #a78bfa 100%)" },
  { id: "oshi-white", label: "推しホワイト", category: "oshi", value: "linear-gradient(145deg, #ffffff 0%, #f8fafc 42%, #e2e8f0 100%)" },
  { id: "oshi-black", label: "推しブラック", category: "oshi", value: "linear-gradient(145deg, #f8fafc 0%, #cbd5e1 42%, #64748b 100%)" },
  { id: "oshi-crystal", label: "推しクリスタル", category: "oshi", value: "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.92) 0 10px, rgba(191,219,254,0.42) 11px 22px, transparent 23px), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.9) 0 10px, rgba(196,181,253,0.36) 11px 22px, transparent 23px), linear-gradient(145deg, #f8fbff 0%, #dbeafe 42%, #c4b5fd 100%)" },
  { id: "snow-crystal", label: "雪の結晶", category: "seiso", value: "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.96) 0 2px, transparent 3px), radial-gradient(circle at 38% 44%, rgba(255,255,255,0.94) 0 2px, transparent 3px), radial-gradient(circle at 72% 28%, rgba(255,255,255,0.96) 0 2px, transparent 3px), linear-gradient(60deg, transparent 0 47%, rgba(255,255,255,0.44) 47% 53%, transparent 53% 100%), linear-gradient(-60deg, transparent 0 47%, rgba(219,234,254,0.38) 47% 53%, transparent 53% 100%), linear-gradient(145deg, #fbfdff 0%, #eef6ff 44%, #dbeafe 100%)" },
  { id: "oshi-gold", label: "推しゴールド", category: "oshi", value: "linear-gradient(145deg, #fffdf5 0%, #fde68a 34%, #f59e0b 100%)" },
  { id: "oshi-silver", label: "推しシルバー", category: "oshi", value: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 42%, #94a3b8 100%)" },
  { id: "game-cyber", label: "ゲームサイバー", category: "game", value: "linear-gradient(145deg, #eff6ff 0%, #dbeafe 26%, #ddd6fe 62%, #f5d0fe 100%)" },
  { id: "game-arcade", label: "アーケードポップ", category: "game", value: "radial-gradient(circle at 20% 20%, #ffffff 0%, #e0f2fe 24%, #c4b5fd 58%, #fbcfe8 100%)" },
  { id: "game-crystal", label: "クリスタルHUD", category: "game", value: "linear-gradient(150deg, #f8fbff 0%, #dbeafe 34%, #bfdbfe 62%, #c7d2fe 100%)" },
  { id: "pearl-blue", label: "パールブルー", category: "seiso", value: "linear-gradient(140deg, #f8fbff 0%, #e0f2fe 42%, #dbeafe 100%)" },
  { id: "couture-rose", label: "クチュールローズ", category: "couture", value: "linear-gradient(145deg, #fff8fb 0%, #ffe4ef 38%, #fbcfe8 72%, #f9a8d4 100%)" },
  { id: "couture-champagne", label: "シャンパンモード", category: "couture", value: "linear-gradient(145deg, #fffdf7 0%, #fef3c7 30%, #fde68a 58%, #fbcfe8 100%)" },
  { id: "couture-runway", label: "ランウェイミスト", category: "couture", value: "linear-gradient(140deg, #fffaf5 0%, #ffe4e6 36%, #e9d5ff 68%, #dbeafe 100%)" },
  { id: "frill-mint", label: "ミントフリル", category: "natural", value: "linear-gradient(145deg, #f7fffd 0%, #dcfce7 35%, #ccfbf1 68%, #e0f2fe 100%)" },
  { id: "lavender-dream", label: "ラベンダードリーム", category: "natural", value: "linear-gradient(145deg, #fcfaff 0%, #ede9fe 40%, #ddd6fe 100%)" },
  { id: "sunny-pop", label: "サニーシャイン", category: "natural", value: "linear-gradient(145deg, #fffdf5 0%, #ffedd5 38%, #fde68a 100%)" },
  { id: "rock-neon", label: "ロックネオン", category: "rock", value: "linear-gradient(145deg, #fff8fb 0%, #ffd9e8 22%, #dbeafe 58%, #c7d2fe 100%)" },
  { id: "rock-mono", label: "ロックモード", category: "rock", value: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 100%)" },
  { id: "rock-stage", label: "ステージライト", category: "rock", value: "radial-gradient(circle at 50% 18%, #ffffff 0%, #e2e8f0 28%, #cbd5e1 56%, #94a3b8 100%)" },
] as const;

function applyBg(value: string) {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--background", value);
  }
}

export function useBgTheme() {
  const [bgId, setBgIdState] = useState<string>(() => {
    if (typeof window === "undefined") return BG_PRESETS[0].id;
    return localStorage.getItem(`${BG_KEY}-id`) || BG_PRESETS[0].id;
  });

  useEffect(() => {
    const savedId = localStorage.getItem(`${BG_KEY}-id`) || BG_PRESETS[0].id;
    const savedValue = localStorage.getItem(BG_KEY) || BG_PRESETS[0].value;
    if (savedId !== bgId) {
      queueMicrotask(() => setBgIdState(savedId));
    }
    applyBg(savedValue);

    function handleUpdate() {
      const id = localStorage.getItem(`${BG_KEY}-id`) || BG_PRESETS[0].id;
      const value = localStorage.getItem(BG_KEY) || BG_PRESETS[0].value;
      setBgIdState(id);
      applyBg(value);
    }

    window.addEventListener("kakeibo-bg-updated", handleUpdate);
    return () => window.removeEventListener("kakeibo-bg-updated", handleUpdate);
  }, [bgId]);

  const setBg = (id: string, value: string) => {
    localStorage.setItem(BG_KEY, value);
    localStorage.setItem(`${BG_KEY}-id`, id);
    setBgIdState(id);
    applyBg(value);
    window.dispatchEvent(new Event("kakeibo-bg-updated"));
  };

  const resetBg = () => {
    localStorage.setItem(BG_KEY, BG_PRESETS[0].value);
    localStorage.setItem(`${BG_KEY}-id`, BG_PRESETS[0].id);
    setBgIdState(BG_PRESETS[0].id);
    applyBg(BG_PRESETS[0].value);
    window.dispatchEvent(new Event("kakeibo-bg-updated"));
  };

  return { bgId, setBg, resetBg };
}
