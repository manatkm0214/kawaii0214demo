export type StylePalette = {
  id: string;
  labelJa: string;
  labelEn: string;
  stops: [string, string, string];
};

export type StyleOverlay = {
  id: string;
  labelJa: string;
  labelEn: string;
  glow: string;
  veil: string;
};

export const STYLE_PALETTES: StylePalette[] = [
  { id: "idol-cute", labelJa: "アイドルキュート", labelEn: "Idol Cute", stops: ["#fff7fc", "#ffd6eb", "#ff9fc8"] },
  { id: "game-cyber", labelJa: "ゲームサイバー", labelEn: "Game Cyber", stops: ["#f5faff", "#bfdbfe", "#c4b5fd"] },
  { id: "seiso", labelJa: "清楚", labelEn: "Graceful", stops: ["#fffefd", "#eef4ff", "#d8eafe"] },
  { id: "couture-rose", labelJa: "クチュールローズ", labelEn: "Couture Rose", stops: ["#fff8fb", "#fbcfe8", "#f9a8d4"] },
  { id: "mint-frill", labelJa: "ミントフリル", labelEn: "Mint Frill", stops: ["#f6fffb", "#ccfbf1", "#99f6e4"] },
  { id: "peach-pop", labelJa: "ピーチポップ", labelEn: "Peach Pop", stops: ["#fffaf5", "#fed7aa", "#fdba74"] },
  { id: "lavender", labelJa: "ラベンダー", labelEn: "Lavender", stops: ["#fcfaff", "#e9d5ff", "#d8b4fe"] },
  { id: "retro-girl", labelJa: "レトロガーリー", labelEn: "Retro Girly", stops: ["#fff7ed", "#fecdd3", "#f9a8d4"] },
  { id: "oshare-mode", labelJa: "おしゃれモード", labelEn: "Oshare Mode", stops: ["#fffdf9", "#f5e9ff", "#c7d2fe"] },
  { id: "atelier-chic", labelJa: "アトリエシック", labelEn: "Atelier Chic", stops: ["#fffaf6", "#fde68a", "#fbcfe8"] },
  { id: "oshi-red", labelJa: "推しレッド", labelEn: "Oshi Red", stops: ["#fff7f7", "#fecaca", "#f87171"] },
  { id: "oshi-orange", labelJa: "推しオレンジ", labelEn: "Oshi Orange", stops: ["#fffaf5", "#fed7aa", "#fb923c"] },
  { id: "oshi-yellow", labelJa: "推しイエロー", labelEn: "Oshi Yellow", stops: ["#fffef3", "#fde68a", "#facc15"] },
  { id: "oshi-green", labelJa: "推しグリーン", labelEn: "Oshi Green", stops: ["#f7fff8", "#bbf7d0", "#4ade80"] },
  { id: "oshi-mint", labelJa: "推しミント", labelEn: "Oshi Mint", stops: ["#f3fffd", "#99f6e4", "#2dd4bf"] },
  { id: "oshi-blue", labelJa: "推しブルー", labelEn: "Oshi Blue", stops: ["#f5faff", "#bfdbfe", "#60a5fa"] },
  { id: "oshi-purple", labelJa: "推しパープル", labelEn: "Oshi Purple", stops: ["#fcfaff", "#ddd6fe", "#a78bfa"] },
  { id: "oshi-white", labelJa: "推しホワイト", labelEn: "Oshi White", stops: ["#ffffff", "#f8fafc", "#e2e8f0"] },
  { id: "oshi-black", labelJa: "推しブラック", labelEn: "Oshi Black", stops: ["#f8fafc", "#cbd5e1", "#64748b"] },
  { id: "oshi-crystal", labelJa: "推しクリスタル", labelEn: "Oshi Crystal", stops: ["#f8fbff", "#dbeafe", "#c4b5fd"] },
  { id: "oshi-gold", labelJa: "推しゴールド", labelEn: "Oshi Gold", stops: ["#fffdf5", "#fde68a", "#f59e0b"] },
  { id: "oshi-silver", labelJa: "推しシルバー", labelEn: "Oshi Silver", stops: ["#f8fafc", "#e2e8f0", "#94a3b8"] },
  { id: "snow-crystal", labelJa: "雪の結晶", labelEn: "Snow Crystal", stops: ["#fbfdff", "#eef6ff", "#bfdbfe"] },
  { id: "rose-garden", labelJa: "ローズガーデン", labelEn: "Rose Garden", stops: ["#fff8fb", "#ffe4ef", "#f9a8d4"] },
  { id: "sakura-petal", labelJa: "さくらペタル", labelEn: "Sakura Petal", stops: ["#fffafc", "#ffe4f0", "#fda4af"] },
  { id: "sunflower-bloom", labelJa: "ひまわりブルーム", labelEn: "Sunflower Bloom", stops: ["#fffdf5", "#fde68a", "#f59e0b"] },
  { id: "fantasy-castle", labelJa: "ファンタジーキャッスル", labelEn: "Fantasy Castle", stops: ["#fdfcff", "#ede9fe", "#bfdbfe"] },
  { id: "fantasy-moon", labelJa: "ファンタジームーン", labelEn: "Fantasy Moon", stops: ["#f8fbff", "#ddd6fe", "#fde68a"] },
];

export const STYLE_OVERLAYS: StyleOverlay[] = [
  {
    id: "soft",
    labelJa: "ソフト",
    labelEn: "Soft",
    glow: "radial-gradient(circle at top left, rgba(255,255,255,0.75), transparent 34%)",
    veil: "linear-gradient(165deg, rgba(255,255,255,0.32), rgba(255,255,255,0.04))",
  },
  {
    id: "sparkle",
    labelJa: "きらめき",
    labelEn: "Sparkle",
    glow: "radial-gradient(circle at 18% 14%, rgba(255,255,255,0.88), transparent 24%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.52), transparent 20%)",
    veil: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02))",
  },
  {
    id: "lace",
    labelJa: "レース",
    labelEn: "Lace",
    glow: "radial-gradient(circle at 12% 22%, rgba(255,255,255,0.62), transparent 32%), radial-gradient(circle at 88% 12%, rgba(219,234,254,0.44), transparent 26%)",
    veil: "linear-gradient(150deg, rgba(255,255,255,0.28), rgba(248,250,252,0.08))",
  },
  {
    id: "flash",
    labelJa: "フラッシュ",
    labelEn: "Flash",
    glow: "radial-gradient(circle at 84% 20%, rgba(255,255,255,0.86), transparent 24%), radial-gradient(circle at 20% 86%, rgba(255,182,193,0.34), transparent 28%)",
    veil: "linear-gradient(145deg, rgba(255,255,255,0.14), rgba(224,231,255,0.08))",
  },
  {
    id: "runway",
    labelJa: "ランウェイ",
    labelEn: "Runway",
    glow: "radial-gradient(circle at 16% 16%, rgba(255,255,255,0.78), transparent 24%), radial-gradient(circle at 86% 18%, rgba(254,240,138,0.46), transparent 20%), radial-gradient(circle at 50% 82%, rgba(251,207,232,0.36), transparent 24%)",
    veil: "linear-gradient(150deg, rgba(255,255,255,0.18), rgba(255,248,240,0.06))",
  },
];

export function makeGeneratedBackground(palette: StylePalette, overlay: StyleOverlay) {
  return [
    overlay.glow,
    overlay.veil,
    `linear-gradient(135deg, ${palette.stops[0]} 0%, ${palette.stops[1]} 52%, ${palette.stops[2]} 100%)`,
  ].join(", ");
}
