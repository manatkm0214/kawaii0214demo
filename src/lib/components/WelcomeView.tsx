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
      className="relative min-h-[88vh] overflow-hidden rounded-[40px] px-6 py-10 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at 10% 0%, rgba(255,192,220,0.55) 0%, transparent 42%)," +
          "radial-gradient(ellipse at 90% 0%, rgba(196,181,253,0.45) 0%, transparent 38%)," +
          "radial-gradient(ellipse at 50% 100%, rgba(125,211,252,0.35) 0%, transparent 44%)," +
          "linear-gradient(160deg, #fff8fd 0%, #fce7f3 22%, #ede9fe 52%, #dbeafe 78%, #f0fdf4 100%)",
        border: "1.5px solid rgba(244,114,182,0.3)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.8) inset," +
          "0 40px 100px -30px rgba(236,72,153,0.22)," +
          "0 20px 60px -20px rgba(139,92,246,0.18)",
      }}
    >
      {/* クリスタルフレーム装飾 */}
      <div className="pointer-events-none absolute inset-0 rounded-[40px]" aria-hidden>
        {/* 二重内枠 */}
        <div className="absolute inset-4 rounded-[32px]" style={{ border: "1px solid rgba(244,114,182,0.15)" }} />
        <div className="absolute inset-8 rounded-[26px]" style={{ border: "1px solid rgba(196,181,253,0.12)" }} />

        {/* コーナー宝石 */}
        {[
          { pos: "top-3 left-3", color: "#f9a8d4", delay: "0s" },
          { pos: "top-3 right-3", color: "#c4b5fd", delay: "0.5s" },
          { pos: "bottom-3 left-3", color: "#93c5fd", delay: "1s" },
          { pos: "bottom-3 right-3", color: "#f9a8d4", delay: "1.5s" },
        ].map(({ pos, color, delay }) => (
          <div key={pos} className={`absolute ${pos} animate-float-slow`} style={{ animationDelay: delay }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5Z" fill={color} opacity="0.85" />
              <path d="M11 5L12.5 9.5L17 11L12.5 12.5L11 17L9.5 12.5L5 11L9.5 9.5Z" fill="white" opacity="0.5" />
            </svg>
          </div>
        ))}

        {/* フローティングスパークル */}
        {[
          { pos: "left-[7%] top-[12%]", char: "✦", color: "rgba(249,168,212,0.9)", size: "text-3xl", delay: "0s" },
          { pos: "right-[9%] top-[16%]", char: "✦", color: "rgba(196,181,253,0.9)", size: "text-2xl", delay: "0.7s" },
          { pos: "left-[44%] top-[6%]", char: "✶", color: "rgba(252,211,77,0.85)", size: "text-xl", delay: "0.3s" },
          { pos: "left-[22%] top-[5%]", char: "🌸", size: "text-lg", delay: "0.5s", color: "" },
          { pos: "right-[24%] top-[7%]", char: "🌸", size: "text-lg", delay: "1.1s", color: "" },
          { pos: "left-[3%] top-[50%]", char: "💎", size: "text-base", delay: "0.9s", color: "" },
          { pos: "right-[3%] top-[45%]", char: "💎", size: "text-base", delay: "0.4s", color: "" },
        ].map(({ pos, char, color, size, delay }) => (
          <div
            key={pos}
            className={`absolute ${pos} ${size} animate-float-slow select-none`}
            style={{ color: color || undefined, animationDelay: delay }}
          >
            {char}
          </div>
        ))}

        {/* プリズム光線 */}
        <div
          className="absolute -top-10 left-[30%] h-64 w-1 rotate-[20deg] blur-sm"
          style={{ background: "linear-gradient(180deg,rgba(249,168,212,0.5),transparent)" }}
        />
        <div
          className="absolute -top-10 left-[60%] h-56 w-0.5 rotate-[-15deg] blur-sm"
          style={{ background: "linear-gradient(180deg,rgba(196,181,253,0.4),transparent)" }}
        />
        <div
          className="absolute -top-10 left-[50%] h-72 w-0.5 blur-sm"
          style={{ background: "linear-gradient(180deg,rgba(125,211,252,0.35),transparent)" }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 text-center lg:text-left">

          {/* バッジ */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.36em]"
            style={{
              background: "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(253,242,248,0.9))",
              border: "1px solid rgba(244,114,182,0.35)",
              boxShadow: "0 8px 24px -8px rgba(236,72,153,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
              color: "#9d174d",
            }}
          >
            <span className="text-sm">👑</span>
            {t("お姫様アイドル家計ボード", "Princess Idol Budget Board")}
          </div>

          {/* タイトル */}
          <div>
            <h1
              className="font-black tracking-[-0.04em]"
              style={{
                fontSize: "clamp(2.8rem,8vw,4.5rem)",
                background: "linear-gradient(135deg,#be185d 0%,#7c3aed 45%,#0891b2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 8px rgba(190,24,93,0.18))",
              }}
            >
              Balance
            </h1>
            <p
              className="mt-1.5 text-sm font-bold tracking-[0.22em] uppercase"
              style={{ color: "#be185d", opacity: 0.75 }}
            >
              ✦ {t("きらきらアイドル家計簿", "Idol Household Budget")} ✦
            </p>
            <p
              className="mt-5 max-w-xl text-base leading-[1.9] md:text-lg"
              style={{ color: "#4a044e", fontWeight: 500 }}
            >
              {t(
                "カラフルな庭園と湖、ピアノやバイオリン、お花畑を重ねた、毎日使いたくなるきらきらアイドル家計ボード。",
                "A sparkling idol budget board blending a colorful garden, lake, piano, violin and flower field.",
              )}
            </p>
          </div>

          {/* フィーチャーカード */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: "✨", ja: "入力＆ボード", en: "Input & Board" },
              { icon: "💎", ja: "目標・安全度", en: "Goals & Safety" },
              { icon: "🌟", ja: "共有・英語対応", en: "Share & Bilingual" },
            ].map((item) => (
              <div
                key={item.ja}
                className="group relative overflow-hidden rounded-3xl px-4 py-4 text-center text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg,rgba(255,255,255,0.97),rgba(253,242,248,0.93),rgba(237,233,254,0.9))",
                  border: "1.5px solid rgba(244,114,182,0.22)",
                  boxShadow:
                    "0 8px 24px -10px rgba(236,72,153,0.2)," +
                    "inset 0 1px 0 rgba(255,255,255,0.95)",
                  color: "#831843",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at 50% 0%,rgba(244,114,182,0.08),transparent 60%)" }}
                />
                <div className="text-xl mb-1">{item.icon}</div>
                <div>{t(item.ja, item.en)}</div>
              </div>
            ))}
          </div>

          {/* スタートフロー */}
          <div
            className="relative overflow-hidden rounded-[24px] px-5 py-4"
            style={{
              background: "linear-gradient(135deg,rgba(255,251,242,0.98),rgba(255,245,250,0.96),rgba(245,240,255,0.95))",
              border: "1.5px solid rgba(252,211,77,0.45)",
              boxShadow: "0 10px 28px -10px rgba(244,114,182,0.14), inset 0 1px 0 rgba(255,255,255,0.95)",
            }}
          >
            <div className="absolute right-4 top-3 text-xl opacity-35 animate-float-slow">🌹</div>
            <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: "#be185d" }}>
              ✦ {t("スタートの流れ", "How to start")}
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed" style={{ color: "#6b21a8" }}>
              {t(
                "タイトル → 利用規約 → デザイン設定 → ログインの順で進みます",
                "Title → Terms → Design setup → Login",
              )}
            </p>
          </div>

          {/* ボタン */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={onStartAuth}
              className="relative overflow-hidden rounded-full px-10 py-4 text-sm font-black tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#ec4899 0%,#a855f7 50%,#38bdf8 100%)",
                boxShadow:
                  "0 16px 40px -10px rgba(168,85,247,0.55)," +
                  "0 6px 16px rgba(236,72,153,0.3)," +
                  "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <span className="relative z-10">✨ {t("次へ進む", "Next")}</span>
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(120deg,rgba(255,255,255,0.18) 0%,transparent 50%)" }}
              />
            </button>
            {onStartGuest && (
              <button
                type="button"
                onClick={onStartGuest}
                className="rounded-full px-8 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,rgba(255,255,255,0.96),rgba(253,242,248,0.92))",
                  border: "1.5px solid rgba(244,114,182,0.3)",
                  boxShadow: "0 10px 28px -10px rgba(236,72,153,0.18)",
                  color: "#9d174d",
                }}
              >
                {t("ゲストで試す", "Try as guest")}
              </button>
            )}
          </div>
        </div>

        {/* キャラクタービジュアル */}
        <div className="relative flex min-h-[340px] items-center justify-center">
          {/* 背景グロー */}
          <div className="absolute inset-6 rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(249,168,212,0.55),rgba(196,181,253,0.35),transparent 70%)" }} />
          <div className="absolute inset-12 rounded-full blur-2xl" style={{ background: "radial-gradient(circle,rgba(125,211,252,0.3),transparent)" }} />

          {/* クリスタルカード */}
          <div
            className="relative z-10 rounded-[32px] p-5 transition-transform duration-500 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,0.95),rgba(253,242,248,0.9),rgba(237,233,254,0.88))",
              border: "1.5px solid rgba(252,211,77,0.3)",
              boxShadow:
                "0 30px 70px -30px rgba(236,72,153,0.35)," +
                "0 0 0 1px rgba(255,255,255,0.8) inset," +
                "inset 0 1px 0 rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {characterUrl ? (
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={characterUrl}
                  alt={characterName || t("キャラクター画像", "Character image")}
                  width={260}
                  height={260}
                  className="h-64 w-64 rounded-[24px] object-cover"
                  priority
                  unoptimized
                />
                <p className="text-xs font-black tracking-widest" style={{ color: "#be185d" }}>
                  🌸 {characterName || t("マイキャラクター", "My character")}
                </p>
              </div>
            ) : (
              <div
                className="flex h-72 w-64 flex-col items-center justify-center rounded-[24px] text-center"
                style={{
                  background:
                    "radial-gradient(ellipse at top,#fff8fc 0%,#fbcfe8 30%,#ddd6fe 62%,#bfdbfe 100%)",
                  border: "1px solid rgba(244,114,182,0.2)",
                }}
              >
                {/* クリスタル装飾 */}
                <div className="relative mb-4">
                  <div className="text-6xl animate-float-slow">👑</div>
                  <div className="absolute -top-2 -right-3 text-xl animate-float-slow" style={{ animationDelay: "0.4s" }}>✦</div>
                  <div className="absolute -top-1 -left-4 text-lg animate-float-slow" style={{ animationDelay: "0.8s", color: "#f9a8d4" }}>✶</div>
                </div>
                <p className="text-lg font-black leading-tight" style={{ color: "#9d174d" }}>
                  {t("かわいく始めよう", "Start with style")}
                </p>
                <p className="mt-2 px-6 text-xs font-medium leading-relaxed" style={{ color: "#6b21a8" }}>
                  {t("あとで画像を設定すると背景演出にも使えます", "Set an image later to use as background art")}
                </p>
                <div className="mt-4 flex gap-2 text-lg">
                  <span className="animate-float-slow">🌸</span>
                  <span className="animate-float-slow" style={{ animationDelay: "0.5s" }}>💎</span>
                  <span className="animate-float-slow" style={{ animationDelay: "1s" }}>🌸</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ステージ下段：アイドル2人＋センター */}
      <div className="relative z-10 mt-8">
        {/* ステージライン */}
        <div
          className="mx-auto mb-6 h-px w-4/5 opacity-40"
          style={{ background: "linear-gradient(90deg,transparent,rgba(244,114,182,0.6),rgba(196,181,253,0.6),transparent)" }}
        />

        <div className="flex items-end justify-between px-2">
          {/* 男子アイドル */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative transition-all duration-500 ease-out group-hover:-translate-y-5 group-hover:scale-105">
              <div
                className="absolute -inset-8 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity"
                style={{ background: "radial-gradient(circle,rgba(96,165,250,0.3),rgba(139,92,246,0.2),transparent 70%)" }}
              />
              <BoyIdol />
            </div>
            <div
              className="rounded-full px-5 py-1.5 text-xs font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg,rgba(30,58,139,0.92),rgba(88,28,135,0.96))",
                color: "#bfdbfe",
                border: "1px solid rgba(147,197,253,0.25)",
                boxShadow: "0 8px 24px -8px rgba(37,99,235,0.5)",
              }}
            >
              ♪ {t("王子アイドル", "Prince Idol")}
            </div>
          </div>

          {/* センター */}
          <div className="flex flex-col items-center gap-3 pb-8">
            <div className="relative">
              <div className="text-5xl animate-float-slow drop-shadow-lg">👑</div>
              <div
                className="absolute inset-0 blur-xl opacity-60"
                style={{ background: "radial-gradient(circle,rgba(252,211,77,0.6),transparent)" }}
              />
            </div>
            <div className="flex gap-2.5 text-2xl">
              {["🌸", "✦", "🌸"].map((ch, i) => (
                <span
                  key={i}
                  className="animate-float-slow"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    color: ch === "✦" ? "#f59e0b" : undefined,
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
            <p
              className="text-center text-[10px] font-black tracking-[0.28em] uppercase"
              style={{ color: "#9d174d" }}
            >
              IDOL × KAKEIBO
            </p>
          </div>

          {/* 女子アイドル */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative transition-all duration-500 ease-out group-hover:-translate-y-5 group-hover:scale-105">
              <div
                className="absolute -inset-8 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity"
                style={{ background: "radial-gradient(circle,rgba(244,114,182,0.3),rgba(196,181,253,0.2),transparent 70%)" }}
              />
              <GirlIdol />
            </div>
            <div
              className="rounded-full px-5 py-1.5 text-xs font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg,rgba(157,23,77,0.92),rgba(88,28,135,0.96))",
                color: "#fbcfe8",
                border: "1px solid rgba(249,168,212,0.25)",
                boxShadow: "0 8px 24px -8px rgba(236,72,153,0.55)",
              }}
            >
              ♪ {t("お姫様アイドル", "Princess Idol")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
