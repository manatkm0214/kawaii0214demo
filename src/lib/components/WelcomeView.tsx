"use client"

import Image from "next/image"
import { useCharacterImage } from "../hooks/useCharacterImage"
import { useBgTheme } from "../hooks/useBgTheme"
import { useLang } from "@/lib/hooks/useLang"

interface WelcomeViewProps {
  onStartAuth: () => void
  onStartGuest?: () => void
}

/* ===================================================
   女子アイドル — 2D アニメ調イラスト
   =================================================== */
function GirlIdol() {
  return (
    <svg width="130" height="260" viewBox="0 0 130 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        {/* 肌 */}
        <radialGradient id="gSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFEEDD" />
          <stop offset="100%" stopColor="#FFCDA0" />
        </radialGradient>
        {/* 髪 */}
        <linearGradient id="gHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="gHairHL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* 瞳 */}
        <radialGradient id="gEyeG" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="35%" stopColor="#A855F7" />
          <stop offset="75%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#2E1065" />
        </radialGradient>
        {/* ドレス */}
        <linearGradient id="gDress1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gDress2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="55%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#FDF2F8" />
        </linearGradient>
        {/* グロー */}
        <radialGradient id="gGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF4FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 後光グロー */}
      <ellipse cx="65" cy="130" rx="60" ry="115" fill="url(#gGlow)" />

      {/* ── ロングヘア（後ろ層） ── */}
      <path d="M24 72 C6 110 4 168 14 224 C24 234 34 224 34 206 C28 166 32 116 42 76Z" fill="url(#gHair)" />
      <path d="M106 72 C124 110 126 168 116 224 C106 234 96 224 96 206 C102 166 98 116 88 76Z" fill="url(#gHair)" />

      {/* ── ティアラ ── */}
      <path d="M38 26 L44 14 L53 23 L65 7 L77 23 L86 14 L92 26" stroke="#FCD34D" strokeWidth="2.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="65" cy="7"  r="4.5" fill="#F472B6" />
      <circle cx="65" cy="7"  r="2"   fill="white" opacity="0.7" />
      <circle cx="44" cy="14" r="3"   fill="#FCD34D" />
      <circle cx="86" cy="14" r="3"   fill="#FCD34D" />
      <circle cx="44" cy="14" r="1.4" fill="white" opacity="0.6" />
      <circle cx="86" cy="14" r="1.4" fill="white" opacity="0.6" />

      {/* ── 頭部 ── */}
      <ellipse cx="65" cy="55" rx="33" ry="34" fill="url(#gSkin)" />

      {/* ── 前髪 ── */}
      <path d="M30 46 C35 14 64 8 96 46 C84 23 66 17 45 23Z" fill="url(#gHair)" />
      <path d="M32 48 C34 36 39 28 46 31 C41 38 39 46 40 54Z" fill="url(#gHair)" />
      <path d="M98 48 C96 36 91 28 84 31 C89 38 91 46 90 54Z" fill="url(#gHair)" />
      {/* 前髪ハイライト */}
      <path d="M48 25 C50 38 50 48 48 58" stroke="url(#gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M64 18 C64 32 64 48 64 59" stroke="url(#gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M80 24 C78 38 78 49 80 58" stroke="url(#gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M41 21 C53 14 68 13 82 19" stroke="url(#gHairHL)" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* ── サイドツインテール ── */}
      <path d="M30 58 C14 64 6 84 12 102 C17 112 28 110 31 100 C28 88 31 73 41 65Z" fill="url(#gHair)" />
      <path d="M100 58 C116 64 124 84 118 102 C113 112 102 110 99 100 C102 88 99 73 89 65Z" fill="url(#gHair)" />
      <path d="M28 92 C14 102 10 122 18 138 C24 150 34 146 35 137 C29 126 31 110 39 98Z" fill="url(#gHair)" opacity="0.9" />
      <path d="M102 92 C116 102 120 122 112 138 C106 150 96 146 95 137 C101 126 99 110 91 98Z" fill="url(#gHair)" opacity="0.9" />
      {/* ツインテールリボン */}
      <path d="M21 69 L32 76 L21 83Z" fill="#FDE68A" />
      <path d="M43 69 L32 76 L43 83Z" fill="#F59E0B" />
      <circle cx="32" cy="76" r="4" fill="#FBBF24" />
      <path d="M31 80 L26 93 L35 88Z" fill="#F9A8D4" />
      <path d="M87 69 L98 76 L87 83Z" fill="#FDE68A" />
      <path d="M109 69 L98 76 L109 83Z" fill="#F59E0B" />
      <circle cx="98" cy="76" r="4" fill="#FBBF24" />
      <path d="M99 80 L104 93 L95 88Z" fill="#F9A8D4" />

      {/* ── 目（左） ── */}
      {/* アウトライン */}
      <ellipse cx="50" cy="56" rx="11" ry="12.5" fill="#1E0A3C" />
      {/* 虹彩 */}
      <ellipse cx="50" cy="55" rx="9"  ry="10.5"  fill="url(#gEyeG)" />
      {/* 瞳孔 */}
      <ellipse cx="50" cy="57" rx="5" ry="5.8" fill="#2E1065" opacity="0.6" />
      {/* ハイライト大 */}
      <ellipse cx="52" cy="50" rx="3.5" ry="2.8" fill="white" />
      {/* ハイライト小 */}
      <circle cx="47" cy="59" r="1.8" fill="white" opacity="0.85" />
      <circle cx="54" cy="55" r="1.2" fill="white" opacity="0.7" />
      <circle cx="53" cy="61" r="1.1" fill="white" opacity="0.6" />
      {/* まつ毛上 */}
      <path d="M40 48 L37 43" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M44 46 L42 41" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M49 45 L49 40" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M54 46 L56 41" stroke="#1E0A3C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M57 48 L60 43" stroke="#1E0A3C" strokeWidth="1.6" strokeLinecap="round" />
      {/* まつ毛下 */}
      <path d="M41 63 L39 67" stroke="#1E0A3C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M50 65 L50 69" stroke="#1E0A3C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* 眉毛左 */}
      <path d="M38 42 Q46 37 55 40" stroke="#6D28D9" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── 目（右） ── */}
      <ellipse cx="80" cy="56" rx="11" ry="12.5" fill="#1E0A3C" />
      <ellipse cx="80" cy="55" rx="9"  ry="10.5"  fill="url(#gEyeG)" />
      <ellipse cx="80" cy="57" rx="5" ry="5.8" fill="#2E1065" opacity="0.6" />
      <ellipse cx="82" cy="50" rx="3.5" ry="2.8" fill="white" />
      <circle cx="77" cy="59" r="1.8" fill="white" opacity="0.85" />
      <circle cx="76" cy="55" r="1.2" fill="white" opacity="0.7" />
      <circle cx="83" cy="61" r="1.1" fill="white" opacity="0.6" />
      <path d="M90 48 L93 43" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M86 46 L88 41" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M81 45 L81 40" stroke="#1E0A3C" strokeWidth="2"   strokeLinecap="round" />
      <path d="M76 46 L74 41" stroke="#1E0A3C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M73 48 L70 43" stroke="#1E0A3C" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M89 63 L91 67" stroke="#1E0A3C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M80 65 L80 69" stroke="#1E0A3C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M75 42 Q84 37 92 42" stroke="#6D28D9" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* チーク */}
      <ellipse cx="38" cy="65" rx="11" ry="6" fill="#FCA5A5" opacity="0.45" />
      <ellipse cx="92" cy="65" rx="11" ry="6" fill="#FCA5A5" opacity="0.45" />

      {/* 鼻・口 */}
      <path d="M62 72 Q65 75 68 72" stroke="#E8C4A0" strokeWidth="1.3" fill="none" />
      <path d="M55 80 Q65 90 75 80" stroke="#E11D48" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M58 80 Q65 86 72 80" fill="#FCA5A5" opacity="0.4" />

      {/* ── 首 ── */}
      <rect x="58" y="86" width="14" height="12" rx="5" fill="url(#gSkin)" />

      {/* ── ドレス胴体 ── */}
      <path d="M34 100 Q40 90 65 88 Q90 90 96 100 L102 148 Q65 158 28 148Z" fill="url(#gDress1)" />
      <path d="M34 100 Q25 92 19 104 Q27 111 36 108Z" fill="#FDE68A" opacity="0.95" />
      <path d="M96 100 Q105 92 111 104 Q103 111 94 108Z" fill="#FDE68A" opacity="0.95" />
      {/* センターリボン */}
      <path d="M54 95 L46 87 L54 93 L65 80 L76 93 L84 87 L76 95 L65 88Z" fill="#FDE68A" />
      <circle cx="65" cy="80" r="4" fill="#FBBF24" />
      <circle cx="65" cy="80" r="2" fill="white" opacity="0.6" />
      <path d="M48 104 L57 96 L65 105 L73 96 L82 104 L65 116Z" fill="#FDE68A" />
      <circle cx="65" cy="105" r="4.5" fill="#F472B6" />
      <circle cx="65" cy="105" r="2" fill="white" opacity="0.7" />
      {/* ドレスレース */}
      <path d="M34 102 Q50 96 65 98 Q80 96 96 102" stroke="rgba(255,255,255,0.55)" strokeWidth="2" fill="none" />
      <path d="M38 116 Q50 110 65 112 Q80 110 92 116" stroke="rgba(254,240,138,0.85)" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* ── スカート ── */}
      <path d="M28 148 Q16 172 13 192 Q40 183 65 187 Q90 183 117 192 Q114 172 102 148 Q65 158 28 148Z" fill="url(#gDress2)" />
      {/* フリル1段目 */}
      <path d="M16 162 Q26 153 37 162 Q48 171 59 163 Q70 155 81 163 Q92 171 103 162 Q111 154 117 160" stroke="#FDE68A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* フリル2段目 */}
      <path d="M13 178 Q26 168 39 178 Q52 188 65 179 Q78 170 91 179 Q104 188 117 178" stroke="#FBCFE8" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* スカートスパークル */}
      <circle cx="45" cy="185" r="2.5" fill="#FDE68A" opacity="0.7" />
      <circle cx="85" cy="172" r="2"   fill="#FBCFE8" opacity="0.8" />
      <circle cx="65" cy="188" r="2.5" fill="#F9A8D4" opacity="0.7" />

      {/* ── 腕 ── */}
      <path d="M34 106 C18 120 14 142 18 155" stroke="url(#gSkin)" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M96 106 C112 118 116 138 112 152" stroke="url(#gSkin)" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* ── マイク（右手） ── */}
      <rect x="111" y="136" width="9" height="28" rx="4.5" fill="#E2E8F0" />
      <ellipse cx="115" cy="136" rx="11" ry="11" fill="#7C3AED" />
      <ellipse cx="115" cy="134" rx="7"  ry="7"  fill="#A855F7" />
      <ellipse cx="117" cy="131" rx="3"  ry="2.2" fill="white" opacity="0.75" />
      <circle  cx="115" cy="136" r="14" fill="#C084FC" opacity="0.1" />

      {/* ── 脚 ── */}
      <rect x="50" y="185" width="13" height="42" rx="6.5" fill="url(#gSkin)" />
      <rect x="67" y="185" width="13" height="42" rx="6.5" fill="url(#gSkin)" />

      {/* ── ブーツ ── */}
      <path d="M46 220 Q48 234 58 236 Q66 236 67 228 L66 228 Q66 234 56 232 Q47 230 47 220Z" fill="#7C3AED" />
      <path d="M63 220 Q65 234 75 236 Q83 236 84 228 L83 228 Q83 234 73 232 Q64 230 64 220Z" fill="#7C3AED" />
      {/* かかと */}
      <rect x="62" y="226" width="5" height="11" rx="2.5" fill="#6D28D9" />
      <rect x="74" y="226" width="5" height="11" rx="2.5" fill="#6D28D9" />
      {/* 靴ハイライト */}
      <path d="M48 224 Q52 218 60 221" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M65 224 Q69 218 77 221" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* キラキラ */}
      <text x="2"   y="24"  fontSize="17" fill="#FCD34D">✦</text>
      <text x="110" y="55"  fontSize="14" fill="#F9A8D4">★</text>
      <text x="2"   y="108" fontSize="12" fill="#C4B5FD">✧</text>
      <text x="112" y="185" fontSize="14" fill="#FDE68A">♥</text>
      <circle cx="8"   cy="160" r="3.5" fill="#F9A8D4" opacity="0.6" />
      <circle cx="122" cy="100" r="3"   fill="#FCD34D" opacity="0.7" />
    </svg>
  )
}

/* ===================================================
   男子アイドル — 2D アニメ調イラスト
   =================================================== */
function BoyIdol() {
  return (
    <svg width="130" height="260" viewBox="0 0 130 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        {/* 肌 */}
        <radialGradient id="bSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFEEDD" />
          <stop offset="100%" stopColor="#F5C89A" />
        </radialGradient>
        {/* 髪 */}
        <linearGradient id="bHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="bHairHL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(148,163,184,0.6)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0)" />
        </linearGradient>
        {/* 瞳 */}
        <radialGradient id="bEye" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="35%" stopColor="#3B82F6" />
          <stop offset="75%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </radialGradient>
        {/* ジャケット */}
        <linearGradient id="bJacket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        {/* グロー */}
        <radialGradient id="bGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 後光グロー */}
      <ellipse cx="65" cy="130" rx="60" ry="115" fill="url(#bGlow)" />

      {/* ── 頭部 ── */}
      <ellipse cx="65" cy="53" rx="33" ry="34" fill="url(#bSkin)" />

      {/* ── 髪（後ろ・サイド） ── */}
      <path d="M32 46 C30 32 34 20 40 18 C34 24 32 34 34 48Z" fill="url(#bHair)" />
      <path d="M98 46 C100 32 96 20 90 18 C96 24 98 34 96 48Z" fill="url(#bHair)" />

      {/* ── 前髪・トップ ── */}
      <path d="M32 44 C36 14 65 9 94 44 C82 22 65 17 48 22Z" fill="url(#bHair)" />
      <path d="M32 46 C34 36 38 28 44 30 C40 36 38 43 40 50Z" fill="url(#bHair)" />
      <path d="M96 46 C94 36 90 28 84 30 C88 36 90 43 90 50Z" fill="url(#bHair)" />
      {/* 流し前髪（特徴的） */}
      <path d="M46 24 C48 34 50 43 52 50" stroke="#334155" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M54 20 C55 30 56 40 56 48"  stroke="#334155" strokeWidth="4"   fill="none" strokeLinecap="round" />
      {/* 髪ハイライト */}
      <path d="M40 20 C48 13 60 11 70 13" stroke="url(#bHairHL)" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* ── 目（左） ── */}
      <ellipse cx="50" cy="55" rx="9.5" ry="10" fill="#0F172A" />
      <ellipse cx="50" cy="54" rx="7.5" ry="8"  fill="url(#bEye)" />
      <ellipse cx="50" cy="56" rx="4"   ry="4.5" fill="#1D4ED8" opacity="0.5" />
      <ellipse cx="52" cy="50" rx="3"   ry="2.2" fill="white" />
      <circle  cx="47" cy="57" r="1.5"  fill="white" opacity="0.85" />
      <circle  cx="53" cy="59" r="1"    fill="white" opacity="0.6" />
      {/* 眉毛 */}
      <path d="M38 43 Q46 38 56 41" stroke="#1E293B" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* まつ毛 */}
      <path d="M40 47 L37 42" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M44 45 L42 40" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M50 44 L50 39" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

      {/* ── 目（右） ── */}
      <ellipse cx="80" cy="55" rx="9.5" ry="10" fill="#0F172A" />
      <ellipse cx="80" cy="54" rx="7.5" ry="8"  fill="url(#bEye)" />
      <ellipse cx="80" cy="56" rx="4"   ry="4.5" fill="#1D4ED8" opacity="0.5" />
      <ellipse cx="82" cy="50" rx="3"   ry="2.2" fill="white" />
      <circle  cx="77" cy="57" r="1.5"  fill="white" opacity="0.85" />
      <circle  cx="83" cy="59" r="1"    fill="white" opacity="0.6" />
      <path d="M74 41 Q84 38 92 43" stroke="#1E293B" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M90 47 L93 42" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M86 45 L88 40" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M80 44 L80 39" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

      {/* チーク（薄め） */}
      <ellipse cx="36" cy="64" rx="9" ry="5" fill="#FCA5A5" opacity="0.28" />
      <ellipse cx="94" cy="64" rx="9" ry="5" fill="#FCA5A5" opacity="0.28" />

      {/* 鼻・口 */}
      <path d="M62 70 Q65 73 68 70" stroke="#D4A992" strokeWidth="1.4" fill="none" />
      <path d="M54 78 Q65 86 76 78" stroke="#B45309" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* ── 首 ── */}
      <rect x="58" y="84" width="14" height="12" rx="5" fill="url(#bSkin)" />

      {/* ── シャツ ── */}
      <path d="M44 92 Q54 102 65 106 Q76 102 86 92 Q78 98 65 102 Q52 98 44 92Z" fill="#F8FAFC" />

      {/* ── ジャケット ── */}
      <path d="M28 100 Q34 88 65 86 Q96 88 102 100 L108 160 Q65 172 22 160Z" fill="url(#bJacket)" />
      {/* 左襟 */}
      <path d="M44 92 C36 102 28 108 24 102" stroke="#1E3A8A" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 右襟 */}
      <path d="M86 92 C94 102 102 108 106 102" stroke="#1E3A8A" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* ジャケットのシェーディング */}
      <path d="M22 104 Q24 140 26 158" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
      <path d="M108 104 Q106 140 104 158" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />

      {/* ネクタイ */}
      <path d="M58 91 L54 85 L65 78 L76 85 L72 91 Q65 97 58 91Z" fill="#F59E0B" />
      <path d="M59 91 L65 106 L71 91 Q65 97 59 91Z" fill="#D97706" />
      <path d="M58 91 L65 88 L72 91" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.6" />

      {/* ラペルピン（星） */}
      <circle cx="36" cy="110" r="5" fill="#FCD34D" />
      <path d="M36 105.5 L37.2 109 L41 109 L38.1 111.2 L39.3 114.5 L36 112.3 L32.7 114.5 L33.9 111.2 L31 109 L34.8 109Z" fill="#F59E0B" />

      {/* ── 腕 ── */}
      <path d="M28 108 C12 122 8 148 12 162" stroke="url(#bSkin)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M102 108 C118 120 122 144 118 158" stroke="url(#bSkin)" strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* 袖 */}
      <path d="M28 108 C14 120 10 144 14 158" stroke="url(#bJacket)" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M102 108 C116 118 120 142 116 156" stroke="url(#bJacket)" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* ── マイク（右手） ── */}
      <rect x="116" y="140" width="9" height="28" rx="4.5" fill="#CBD5E1" />
      <ellipse cx="120" cy="140" rx="11" ry="11" fill="#1E40AF" />
      <ellipse cx="120" cy="138" rx="7"  ry="7"  fill="#3B82F6" />
      <ellipse cx="122" cy="135" rx="3"  ry="2.2" fill="white" opacity="0.75" />
      <circle  cx="120" cy="140" r="14"  fill="#60A5FA" opacity="0.1" />

      {/* ── ズボン ── */}
      <rect x="36" y="158" width="22" height="62" rx="8" fill="#1E3A5F" />
      <rect x="62" y="158" width="22" height="62" rx="8" fill="#1E3A5F" />
      <path d="M47 158 L47 220" stroke="#1E40AF" strokeWidth="1.2" opacity="0.35" />
      <path d="M73 158 L73 220" stroke="#1E40AF" strokeWidth="1.2" opacity="0.35" />

      {/* ── 革靴 ── */}
      <path d="M32 208 Q34 224 46 226 Q56 226 57 217 L56 217 Q56 224 45 222 Q33 220 33 208Z" fill="#0F172A" />
      <path d="M59 208 Q61 224 73 226 Q83 226 84 217 L83 217 Q83 224 72 222 Q60 220 60 208Z" fill="#0F172A" />
      {/* 靴ハイライト */}
      <path d="M34 213 Q38 207 48 210" stroke="rgba(100,116,139,0.55)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M61 213 Q65 207 75 210" stroke="rgba(100,116,139,0.55)" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* キラキラ */}
      <text x="110" y="24"  fontSize="17" fill="#60A5FA">✦</text>
      <text x="2"   y="54"  fontSize="14" fill="#93C5FD">★</text>
      <text x="110" y="82"  fontSize="12" fill="#C4B5FD">✧</text>
      <text x="2"   y="130" fontSize="13" fill="#FCD34D">♦</text>
      <circle cx="120" cy="158" r="3.5" fill="#60A5FA" opacity="0.6" />
      <circle cx="8"   cy="88"  r="3"   fill="#93C5FD" opacity="0.7" />
    </svg>
  )
}

/* ===================================================
   WelcomeView
   =================================================== */
export default function WelcomeView({ onStartAuth, onStartGuest }: WelcomeViewProps) {
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)
  const { characterUrl, characterName } = useCharacterImage()
  useBgTheme()

  return (
    <div
      className="design-light-shell hero-stage relative min-h-[82vh] overflow-hidden rounded-[36px] px-6 py-8 md:px-8"
      style={{
        background: "radial-gradient(ellipse at 20% 0%, #fff0f8 0%, #fce7f3 28%, #ede9fe 62%, #dbeafe 100%)",
        border: "1.5px solid rgba(244,114,182,0.35)",
        boxShadow: "0 30px 90px rgba(236,72,153,0.18), 0 0 0 4px rgba(252,211,77,0.08)",
      }}
    >
      <div className="sparkle-field" aria-hidden />

      {/* お嬢様フレーム装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-5 rounded-[28px]" style={{ border: "1px solid rgba(244,114,182,0.18)" }} />
        <div className="absolute inset-9 rounded-3xl" style={{ border: "1px solid rgba(252,211,77,0.13)" }} />
        <div className="absolute left-4  top-4    text-xl animate-float-slow" style={{ color: "rgba(244,114,182,0.6)" }}>✿</div>
        <div className="absolute right-4 top-4    text-xl animate-float-slow" style={{ color: "rgba(252,211,77,0.7)", animationDelay: "0.4s" }}>✿</div>
        <div className="absolute left-4  bottom-4 text-xl animate-float-slow" style={{ color: "rgba(167,139,250,0.6)", animationDelay: "0.8s" }}>✿</div>
        <div className="absolute right-4 bottom-4 text-xl animate-float-slow" style={{ color: "rgba(244,114,182,0.5)", animationDelay: "1.2s" }}>✿</div>
        <div className="absolute left-[8%]  top-[10%] text-4xl animate-float-slow" style={{ color: "rgba(249,168,212,0.8)" }}>★</div>
        <div className="absolute right-[10%] top-[14%] text-3xl animate-float-slow" style={{ color: "rgba(216,180,254,0.8)", animationDelay: "0.6s" }}>✦</div>
        <div className="absolute left-[46%]  top-[8%]  text-2xl animate-float-slow" style={{ color: "rgba(252,211,77,0.8)", animationDelay: "0.3s" }}>✶</div>
        <div className="absolute left-[28%]  top-[4%]  text-xl animate-float-slow" style={{ animationDelay: "0.5s" }}>🌸</div>
        <div className="absolute right-[26%] top-[6%]  text-xl animate-float-slow" style={{ animationDelay: "1s" }}>🌸</div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-center lg:text-left">

          <p className="hero-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.32em]">
            👑 {t("お嬢様アイドルへようこそ", "Welcome — Princess Idol")}
          </p>

          <div>
            <h1
              className="hero-title text-4xl font-black tracking-tight md:text-5xl"
              style={{ textShadow: "0 2px 12px rgba(236,72,153,0.22)" }}
            >
              Balance
            </h1>
            <p className="mt-1 text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: "#be185d", opacity: 0.7 }}>
              ✦ {t("家計簿 × アイドル", "Household × Idol")}
            </p>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 md:text-lg" style={{ color: "#4a044e" }}>
              {t(
                "かわいく始めて、あとから背景もキャラクターも自分のデザインに変えられます。",
                "Start cute — change the background and characters to your own design later.",
              )}
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { icon: "✨", text: t("入力とボード切替を1か所に", "Input & boards in one place") },
              { icon: "💎", text: t("目標・安全度をまとめて確認", "Goals & safety at a glance") },
              { icon: "🌟", text: t("印刷・共有・英語切替も対応", "Print, share & bilingual") },
            ].map((item) => (
              <div
                key={item.text}
                className="rounded-3xl px-4 py-3.5 text-sm font-bold"
                style={{
                  color: "#831843",
                  background: "linear-gradient(135deg,rgba(255,255,255,0.96),rgba(253,242,248,0.92))",
                  border: "1.5px solid rgba(244,114,182,0.28)",
                  boxShadow: "0 6px 18px -8px rgba(236,72,153,0.2)",
                }}
              >
                <span className="mr-2 text-base">{item.icon}</span>{item.text}
              </div>
            ))}
          </div>

          {/* スタートの流れ（スクロール風） */}
          <div
            className="relative overflow-hidden rounded-3xl px-5 py-4 text-sm"
            style={{
              background: "linear-gradient(135deg,#fffbf2 0%,#fff5f9 50%,#f5f0ff 100%)",
              border: "1.5px solid rgba(252,211,77,0.5)",
              boxShadow: "0 8px 24px -8px rgba(244,114,182,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div className="absolute right-3 top-2 text-xl opacity-40">🌹</div>
            <div className="absolute left-3 bottom-2 text-lg opacity-30">🌸</div>
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "#be185d" }}>
              ✦ {t("スタートの流れ", "Start flow")}
            </p>
            <p className="mt-2 font-medium leading-relaxed" style={{ color: "#6b21a8" }}>
              {t(
                "タイトル → 利用規約の確認 → デザイン設定 → ログインの順で進みます。",
                "Title → Terms review → Design setup → Login.",
              )}
            </p>
          </div>

          {/* ボタン */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={onStartAuth}
              className="idol-cta rounded-full px-8 py-4 text-sm font-bold tracking-wide"
              style={{ boxShadow: "0 14px 36px -8px rgba(236,72,153,0.5), 0 4px 12px rgba(236,72,153,0.2)" }}
            >
              {t("✨ 次へ進む", "✨ Next")}
            </button>
            {onStartGuest && (
              <button
                type="button"
                onClick={onStartGuest}
                className="idol-subcta rounded-full px-7 py-4 text-sm font-semibold transition"
              >
                {t("ゲストで試す", "Try as guest")}
              </button>
            )}
          </div>
        </div>

        {/* キャラクター画像 */}
        <div className="relative flex min-h-90 items-center justify-center">
          <div className="absolute inset-8 rounded-full bg-pink-200/60 blur-3xl" />
          <div className="absolute inset-4 rounded-full bg-violet-100/40 blur-2xl" />
          <div
            className="idol-glass relative rounded-4xl p-5"
            style={{
              border: "1.5px solid rgba(252,211,77,0.35)",
              background: "linear-gradient(180deg,rgba(255,255,255,0.92),rgba(253,242,248,0.88))",
              boxShadow: "0 26px 60px -36px rgba(236,72,153,0.3)",
            }}
          >
            {characterUrl ? (
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={characterUrl}
                  alt={characterName || t("キャラクター画像", "Character image")}
                  width={260}
                  height={260}
                  className="h-64 w-64 rounded-4xl object-cover"
                  priority
                  unoptimized
                />
                <p className="text-xs font-bold tracking-widest" style={{ color: "#be185d" }}>
                  🌸 {characterName || t("マイキャラクター", "My character")}
                </p>
              </div>
            ) : (
              <div
                className="flex h-72 w-72 flex-col items-center justify-center rounded-[28px] text-center"
                style={{
                  background: "radial-gradient(circle at top,#fff8fc 0%,#fbcfe8 38%,#ddd6fe 72%,#bfdbfe 100%)",
                  border: "1px solid rgba(244,114,182,0.25)",
                  boxShadow: "0 24px 56px -28px rgba(236,72,153,0.32)",
                }}
              >
                <div className="text-5xl">👑</div>
                <p className="mt-3 text-xl font-black" style={{ color: "#9d174d" }}>
                  {t("かわいく始めよう", "Start with style")}
                </p>
                <p className="mt-2 px-8 text-xs font-medium leading-relaxed" style={{ color: "#6b21a8" }}>
                  {t("あとで好きな画像に変えると背景演出にも使えます", "Change to your image later to use it as background art")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* アイドルステージ */}
      <div className="relative z-10 mt-6 flex items-end justify-between px-0">

        {/* 男子アイドル */}
        <div className="flex flex-col items-center gap-2 group">
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-4">
            <div
              className="absolute -inset-6 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle,rgba(96,165,250,0.25),transparent 70%)" }}
            />
            <BoyIdol />
          </div>
          <div
            className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg,rgba(30,58,139,0.9),rgba(15,23,42,0.95))",
              color: "#bfdbfe",
              border: "1px solid rgba(147,197,253,0.3)",
              boxShadow: "0 8px 22px -8px rgba(37,99,235,0.5)",
            }}
          >
            ♪ {t("男子アイドル", "Boy Idol")}
          </div>
        </div>

        {/* 中央 */}
        <div className="flex flex-col items-center gap-2 pb-6">
          <div className="text-4xl animate-float-slow">👑</div>
          <div className="flex gap-2 text-2xl">
            <span className="animate-float-slow">🌸</span>
            <span className="animate-float-slow text-amber-400" style={{ animationDelay: "0.5s" }}>✦</span>
            <span className="animate-float-slow" style={{ animationDelay: "1s" }}>🌸</span>
          </div>
          <p className="text-center text-xs font-black tracking-[0.22em]" style={{ color: "#9d174d" }}>
            IDOL × KAKEIBO
          </p>
        </div>

        {/* 女子アイドル */}
        <div className="flex flex-col items-center gap-2 group">
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-4">
            <div
              className="absolute -inset-6 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle,rgba(244,114,182,0.25),transparent 70%)" }}
            />
            <GirlIdol />
          </div>
          <div
            className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg,rgba(157,23,77,0.9),rgba(88,28,135,0.95))",
              color: "#fbcfe8",
              border: "1px solid rgba(249,168,212,0.3)",
              boxShadow: "0 8px 22px -8px rgba(236,72,153,0.5)",
            }}
          >
            ♪ {t("女子アイドル", "Girl Idol")}
          </div>
        </div>
      </div>
    </div>
  )
}
