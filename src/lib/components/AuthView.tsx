"use client"

import Link from "next/link"
import { useState } from "react"
import { FaEnvelope, FaLine } from "react-icons/fa"
import { useLang } from "@/lib/hooks/useLang"

interface AuthViewProps {
  onAuth: (mode?: "login" | "register", email?: string, password?: string) => void | Promise<void>
  onBack: () => void
  initialMessage?: { type: "success" | "error"; text: string } | null
  initialEmail?: string
  otpEmail?: string
  onGuestLogin?: () => void
}

/* ===================================================
   フォーマルドレスの女の子（白×金）
   =================================================== */
function GirlFormal() {
  return (
    <svg width="120" height="240" viewBox="0 0 130 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="af_gSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFEEDD" />
          <stop offset="100%" stopColor="#FFCDA0" />
        </radialGradient>
        <linearGradient id="af_gHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="af_gHairHL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="af_gEye" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="35%" stopColor="#A855F7" />
          <stop offset="75%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#2E1065" />
        </radialGradient>
        {/* フォーマルガウン（白×金） */}
        <linearGradient id="af_gGown1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="55%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </linearGradient>
        <linearGradient id="af_gGown2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="55%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FFF1F2" />
        </linearGradient>
        <radialGradient id="af_gGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="65" cy="130" rx="60" ry="115" fill="url(#af_gGlow)" />
      {/* 後ろ髪 */}
      <path d="M24 72 C6 110 4 168 14 224 C24 234 34 224 34 206 C28 166 32 116 42 76Z" fill="url(#af_gHair)" />
      <path d="M106 72 C124 110 126 168 116 224 C106 234 96 224 96 206 C102 166 98 116 88 76Z" fill="url(#af_gHair)" />
      {/* ティアラ（金） */}
      <path d="M38 26 L44 14 L53 23 L65 7 L77 23 L86 14 L92 26" stroke="#D97706" strokeWidth="2.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="65" cy="7"  r="4.5" fill="#FCD34D" />
      <circle cx="65" cy="7"  r="2"   fill="white" opacity="0.8" />
      <circle cx="44" cy="14" r="3"   fill="#D97706" />
      <circle cx="86" cy="14" r="3"   fill="#D97706" />
      <circle cx="44" cy="14" r="1.4" fill="white" opacity="0.6" />
      <circle cx="86" cy="14" r="1.4" fill="white" opacity="0.6" />
      {/* 頭部 */}
      <ellipse cx="65" cy="55" rx="33" ry="34" fill="url(#af_gSkin)" />
      {/* 前髪 */}
      <path d="M30 46 C35 14 64 8 96 46 C84 23 66 17 45 23Z" fill="url(#af_gHair)" />
      <path d="M32 48 C34 36 39 28 46 31 C41 38 39 46 40 54Z" fill="url(#af_gHair)" />
      <path d="M98 48 C96 36 91 28 84 31 C89 38 91 46 90 54Z" fill="url(#af_gHair)" />
      <path d="M48 25 C50 38 50 48 48 58" stroke="url(#af_gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M64 18 C64 32 64 48 64 59" stroke="url(#af_gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M80 24 C78 38 78 49 80 58" stroke="url(#af_gHair)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M41 21 C53 14 68 13 82 19" stroke="url(#af_gHairHL)" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* ツインテール */}
      <path d="M30 58 C14 64 6 84 12 102 C17 112 28 110 31 100 C28 88 31 73 41 65Z" fill="url(#af_gHair)" />
      <path d="M100 58 C116 64 124 84 118 102 C113 112 102 110 99 100 C102 88 99 73 89 65Z" fill="url(#af_gHair)" />
      <path d="M28 92 C14 102 10 122 18 138 C24 150 34 146 35 137 C29 126 31 110 39 98Z" fill="url(#af_gHair)" opacity="0.9" />
      <path d="M102 92 C116 102 120 122 112 138 C106 150 96 146 95 137 C101 126 99 110 91 98Z" fill="url(#af_gHair)" opacity="0.9" />
      {/* リボン（金） */}
      <path d="M21 69 L32 76 L21 83Z" fill="#FDE68A" />
      <path d="M43 69 L32 76 L43 83Z" fill="#D97706" />
      <circle cx="32" cy="76" r="4" fill="#F59E0B" />
      <path d="M31 80 L26 93 L35 88Z" fill="#FDF2F8" />
      <path d="M87 69 L98 76 L87 83Z" fill="#FDE68A" />
      <path d="M109 69 L98 76 L109 83Z" fill="#D97706" />
      <circle cx="98" cy="76" r="4" fill="#F59E0B" />
      <path d="M99 80 L104 93 L95 88Z" fill="#FDF2F8" />
      {/* 目（左） */}
      <ellipse cx="50" cy="56" rx="11" ry="12.5" fill="#1E0A3C" />
      <ellipse cx="50" cy="55" rx="9"  ry="10.5"  fill="url(#af_gEye)" />
      <ellipse cx="50" cy="57" rx="5" ry="5.8" fill="#2E1065" opacity="0.6" />
      <ellipse cx="52" cy="50" rx="3.5" ry="2.8" fill="white" />
      <circle cx="47" cy="59" r="1.8" fill="white" opacity="0.85" />
      <circle cx="54" cy="55" r="1.2" fill="white" opacity="0.7" />
      <path d="M40 48 L37 43" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 46 L42 41" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M49 45 L49 40" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 47 L57 42" stroke="#1E0A3C" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M38 42 Q46 37 55 40" stroke="#6D28D9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 目（右） */}
      <ellipse cx="80" cy="56" rx="11" ry="12.5" fill="#1E0A3C" />
      <ellipse cx="80" cy="55" rx="9"  ry="10.5"  fill="url(#af_gEye)" />
      <ellipse cx="80" cy="57" rx="5" ry="5.8" fill="#2E1065" opacity="0.6" />
      <ellipse cx="82" cy="50" rx="3.5" ry="2.8" fill="white" />
      <circle cx="77" cy="59" r="1.8" fill="white" opacity="0.85" />
      <circle cx="76" cy="55" r="1.2" fill="white" opacity="0.7" />
      <path d="M90 48 L93 43" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 46 L88 41" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M81 45 L81 40" stroke="#1E0A3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 47 L73 42" stroke="#1E0A3C" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M75 42 Q84 37 92 42" stroke="#6D28D9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* チーク */}
      <ellipse cx="38" cy="65" rx="11" ry="6" fill="#FCA5A5" opacity="0.45" />
      <ellipse cx="92" cy="65" rx="11" ry="6" fill="#FCA5A5" opacity="0.45" />
      {/* 鼻・口 */}
      <path d="M62 72 Q65 75 68 72" stroke="#E8C4A0" strokeWidth="1.3" fill="none" />
      <path d="M55 80 Q65 90 75 80" stroke="#E11D48" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* 首 */}
      <rect x="58" y="86" width="14" height="12" rx="5" fill="url(#af_gSkin)" />
      {/* フォーマルガウン胴体（白×金） */}
      <path d="M34 100 Q40 90 65 88 Q90 90 96 100 L102 148 Q65 158 28 148Z" fill="url(#af_gGown1)" />
      <path d="M34 100 Q25 92 19 104 Q27 111 36 108Z" fill="#FDE68A" opacity="0.92" />
      <path d="M96 100 Q105 92 111 104 Q103 111 94 108Z" fill="#FDE68A" opacity="0.92" />
      <path d="M48 104 L56 96 L65 105 L74 96 L82 104 L65 116Z" fill="#FFFBEB" />
      <circle cx="65" cy="105" r="4.5" fill="#D97706" />
      <circle cx="65" cy="105" r="2" fill="white" opacity="0.75" />
      {/* ゴールドベルト */}
      <rect x="32" y="140" width="66" height="10" rx="5" fill="#D97706" opacity="0.9" />
      <circle cx="65" cy="145" r="6" fill="#F59E0B" />
      <circle cx="65" cy="145" r="3.5" fill="#FDE68A" />
      {/* レース刺繍 */}
      <path d="M34 102 Q50 96 65 98 Q80 96 96 102" stroke="rgba(212,167,0,0.45)" strokeWidth="2" fill="none" />
      <path d="M38 116 Q50 110 65 112 Q80 110 92 116" stroke="rgba(255,251,235,0.85)" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      {/* オフショルダー */}
      <path d="M34 100 Q26 95 20 105" stroke="url(#af_gSkin)" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M96 100 Q104 95 110 105" stroke="url(#af_gSkin)" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* ガウンスカート */}
      <path d="M28 148 Q14 172 10 195 Q38 184 65 188 Q92 184 120 195 Q116 172 102 148 Q65 158 28 148Z" fill="url(#af_gGown2)" />
      {/* フリル（金） */}
      <path d="M14 164 Q28 155 42 164 Q56 173 65 164 Q74 155 88 164 Q102 173 116 164" stroke="#D97706" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M11 180 Q26 169 41 180 Q56 191 65 181 Q74 171 89 180 Q104 191 119 180" stroke="#FDE68A" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* 宝石スパークル */}
      <circle cx="45" cy="187" r="2.5" fill="#FCD34D" opacity="0.8" />
      <circle cx="85" cy="174" r="2"   fill="#F59E0B" opacity="0.9" />
      <circle cx="65" cy="190" r="2.5" fill="#FDE68A" opacity="0.8" />
      {/* 腕 */}
      <path d="M20 108 C14 124 12 146 16 158" stroke="url(#af_gSkin)" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M110 108 C116 122 118 142 114 156" stroke="url(#af_gSkin)" strokeWidth="11" fill="none" strokeLinecap="round" />
      {/* 手に扇子 */}
      <path d="M13 140 C8 130 6 120 10 112 C14 104 18 106 16 114 C13 122 12 132 14 140Z" fill="#FDE68A" opacity="0.9" />
      <path d="M10 112 L14 140" stroke="#D97706" strokeWidth="1" />
      <path d="M8 120 L13 143" stroke="#D97706" strokeWidth="1" opacity="0.6" />
      {/* 脚 */}
      <rect x="50" y="187" width="13" height="40" rx="6.5" fill="url(#af_gSkin)" />
      <rect x="67" y="187" width="13" height="40" rx="6.5" fill="url(#af_gSkin)" />
      {/* 白いヒール */}
      <path d="M46 220 Q48 233 58 235 Q66 235 67 228 L66 228 Q66 233 56 231 Q47 229 47 220Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
      <path d="M63 220 Q65 233 75 235 Q83 235 84 228 L83 228 Q83 233 73 231 Q64 229 64 220Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
      <rect x="62" y="226" width="5" height="10" rx="2.5" fill="#D97706" />
      <rect x="74" y="226" width="5" height="10" rx="2.5" fill="#D97706" />
      {/* キラキラ */}
      <text x="2"   y="24"  fontSize="16" fill="#D97706">✦</text>
      <text x="110" y="54"  fontSize="13" fill="#F59E0B">★</text>
      <text x="2"   y="108" fontSize="11" fill="#FCD34D">✧</text>
      <text x="112" y="185" fontSize="13" fill="#D97706">♦</text>
    </svg>
  )
}

/* ===================================================
   フォーマルスーツの男の子（白×金）
   =================================================== */
function BoyFormal() {
  return (
    <svg width="120" height="240" viewBox="0 0 130 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="af_bSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFEEDD" />
          <stop offset="100%" stopColor="#F5C89A" />
        </radialGradient>
        <linearGradient id="af_bHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="af_bHairHL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(148,163,184,0.6)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0)" />
        </linearGradient>
        <radialGradient id="af_bEye" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="35%" stopColor="#3B82F6" />
          <stop offset="75%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </radialGradient>
        {/* ホワイトスーツ */}
        <linearGradient id="af_bSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <radialGradient id="af_bGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="65" cy="130" rx="60" ry="115" fill="url(#af_bGlow)" />
      {/* 頭部 */}
      <ellipse cx="65" cy="53" rx="33" ry="34" fill="url(#af_bSkin)" />
      {/* 髪（後ろ・サイド） */}
      <path d="M32 46 C30 32 34 20 40 18 C34 24 32 34 34 48Z" fill="url(#af_bHair)" />
      <path d="M98 46 C100 32 96 20 90 18 C96 24 98 34 96 48Z" fill="url(#af_bHair)" />
      {/* 前髪・トップ */}
      <path d="M32 44 C36 14 65 9 94 44 C82 22 65 17 48 22Z" fill="url(#af_bHair)" />
      <path d="M32 46 C34 36 38 28 44 30 C40 36 38 43 40 50Z" fill="url(#af_bHair)" />
      <path d="M96 46 C94 36 90 28 84 30 C88 36 90 43 90 50Z" fill="url(#af_bHair)" />
      <path d="M46 24 C48 34 50 43 52 50" stroke="#334155" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M54 20 C55 30 56 40 56 48"  stroke="#334155" strokeWidth="4"   fill="none" strokeLinecap="round" />
      <path d="M44 22 C56 16 74 16 86 22" stroke="url(#af_bHairHL)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* 目（左） */}
      <ellipse cx="50" cy="54" rx="9.5" ry="10" fill="#0F172A" />
      <ellipse cx="50" cy="53" rx="7.5" ry="8"  fill="url(#af_bEye)" />
      <ellipse cx="50" cy="55" rx="4"   ry="4.5" fill="#1E3A5F" opacity="0.55" />
      <ellipse cx="52" cy="49" rx="3"   ry="2.2" fill="white" />
      <circle cx="47" cy="57" r="1.5" fill="white" opacity="0.85" />
      <path d="M40 46 L37 41" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M44 44 L42 39" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M49 43 L49 38" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M38 40 Q47 35 56 38" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 目（右） */}
      <ellipse cx="80" cy="54" rx="9.5" ry="10" fill="#0F172A" />
      <ellipse cx="80" cy="53" rx="7.5" ry="8"  fill="url(#af_bEye)" />
      <ellipse cx="80" cy="55" rx="4"   ry="4.5" fill="#1E3A5F" opacity="0.55" />
      <ellipse cx="82" cy="49" rx="3"   ry="2.2" fill="white" />
      <circle cx="77" cy="57" r="1.5" fill="white" opacity="0.85" />
      <path d="M90 46 L93 41" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M86 44 L88 39" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M81 43 L81 38" stroke="#0F172A" strokeWidth="2"   strokeLinecap="round" />
      <path d="M74 40 Q83 35 92 40" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 鼻・口 */}
      <path d="M62 70 Q65 73 68 70" stroke="#E8C4A0" strokeWidth="1.3" fill="none" />
      <path d="M56 78 Q65 87 74 78" stroke="#C0855A" strokeWidth="2"   fill="none" strokeLinecap="round" />
      {/* 首 */}
      <rect x="58" y="84" width="14" height="12" rx="5" fill="url(#af_bSkin)" />
      {/* ホワイトスーツ胴体 */}
      <path d="M34 98 Q40 88 65 86 Q90 88 96 98 L102 150 Q65 160 28 150Z" fill="url(#af_bSuit)" />
      {/* 黒ラペル */}
      <path d="M65 86 L50 102 L60 150" fill="#1E293B" opacity="0.9" />
      <path d="M65 86 L80 102 L70 150" fill="#1E293B" opacity="0.9" />
      {/* ゴールドネクタイ */}
      <path d="M65 88 L59 104 L65 120 L71 104Z" fill="#D97706" />
      <path d="M65 88 L61 96 L65 106 L69 96Z" fill="#F59E0B" />
      {/* ポケットチーフ（金） */}
      <path d="M84 102 L90 98 L92 105 L88 108Z" fill="#FCD34D" />
      {/* スーツ境界ライン */}
      <path d="M34 100 Q50 94 65 96 Q80 94 96 100" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" fill="none" />
      {/* ズボン */}
      <path d="M28 150 Q28 170 30 196 Q46 196 55 196 L60 150Z" fill="#F1F5F9" />
      <path d="M102 150 Q102 170 100 196 Q84 196 75 196 L70 150Z" fill="#F1F5F9" />
      {/* センタークリース */}
      <path d="M50 150 L48 196" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
      <path d="M80 150 L82 196" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
      {/* 腕 */}
      <path d="M34 104 C18 118 14 140 18 154" stroke="url(#af_bSuit)" strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M96 104 C112 116 116 136 112 152" stroke="url(#af_bSuit)" strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* カフス（金） */}
      <ellipse cx="18" cy="154" rx="8" ry="6" fill="url(#af_bSkin)" />
      <ellipse cx="112" cy="152" rx="8" ry="6" fill="url(#af_bSkin)" />
      <path d="M10 152 Q14 148 20 150" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M104 148 Q108 144 116 146" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* バラ（左手に持つ） */}
      <circle cx="13" cy="165" r="9" fill="#FCA5A5" opacity="0.3" />
      <circle cx="13" cy="165" r="6" fill="#FB7185" />
      <circle cx="13" cy="165" r="3.5" fill="#F43F5E" />
      <path d="M10 161 Q13 158 16 161" stroke="#FDE68A" strokeWidth="1" fill="none" />
      <path d="M13 174 L13 190" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 180 L9 177" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      {/* 足・白い革靴 */}
      <rect x="29" y="196" width="24" height="14" rx="7" fill="#F8FAFC" stroke="#D97706" strokeWidth="1.2" />
      <rect x="77" y="196" width="24" height="14" rx="7" fill="#F8FAFC" stroke="#D97706" strokeWidth="1.2" />
      {/* キラキラ */}
      <text x="110" y="24"  fontSize="16" fill="#D97706">✦</text>
      <text x="2"   y="52"  fontSize="13" fill="#F59E0B">★</text>
      <text x="110" y="80"  fontSize="11" fill="#FCD34D">✧</text>
      <text x="2"   y="130" fontSize="12" fill="#D97706">♦</text>
    </svg>
  )
}

/* ===================================================
   AuthView — エレガント統一デザイン
   =================================================== */
export default function AuthView({ onAuth, onBack, initialMessage, initialEmail, onGuestLogin }: AuthViewProps) {
  const lang = useLang()
  const t = (ja: string, en: string) => (lang === "en" ? en : ja)
  const [email, setEmail] = useState(initialEmail || "")

  function startLogin(mode: "login" | "register", connection?: "google-oauth2" | "line") {
    if (connection) {
      window.location.href = `/auth/login?connection=${encodeURIComponent(connection)}`
      return
    }
    if (mode === "register") {
      window.location.href = "/auth/login?screen_hint=signup"
      return
    }
    void Promise.resolve(onAuth(mode, email))
  }

  return (
    <div
      className="relative min-h-[82vh] overflow-hidden rounded-[36px] px-6 py-8 md:px-8"
      style={{
        background: "radial-gradient(ellipse at 20% 0%, #fffbeb 0%, #fef3c7 28%, #fdf2f8 62%, #ede9fe 100%)",
        border: "1.5px solid rgba(217,119,6,0.28)",
        boxShadow: "0 30px 90px rgba(217,119,6,0.12), 0 0 0 4px rgba(252,211,77,0.06)",
      }}
    >
      {/* フレーム装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-5 rounded-[28px]" style={{ border: "1px solid rgba(217,119,6,0.18)" }} />
        <div className="absolute inset-9 rounded-3xl" style={{ border: "1px solid rgba(252,211,77,0.13)" }} />
        <div className="absolute left-4  top-4    text-xl animate-float-slow" style={{ color: "rgba(217,119,6,0.55)" }}>✿</div>
        <div className="absolute right-4 top-4    text-xl animate-float-slow" style={{ color: "rgba(252,211,77,0.7)", animationDelay: "0.4s" }}>✿</div>
        <div className="absolute left-4  bottom-4 text-xl animate-float-slow" style={{ color: "rgba(167,139,250,0.55)", animationDelay: "0.8s" }}>✿</div>
        <div className="absolute right-4 bottom-4 text-xl animate-float-slow" style={{ color: "rgba(217,119,6,0.5)", animationDelay: "1.2s" }}>✿</div>
        <div className="absolute left-[8%]  top-[10%] text-4xl animate-float-slow" style={{ color: "rgba(253,230,138,0.9)" }}>✦</div>
        <div className="absolute right-[10%] top-[14%] text-3xl animate-float-slow" style={{ color: "rgba(216,180,254,0.8)", animationDelay: "0.6s" }}>★</div>
        <div className="absolute left-[46%]  top-[8%]  text-2xl animate-float-slow" style={{ color: "rgba(217,119,6,0.75)", animationDelay: "0.3s" }}>✶</div>
        <div className="absolute left-[28%]  top-[4%]  text-xl animate-float-slow" style={{ animationDelay: "0.5s" }}>🌹</div>
        <div className="absolute right-[26%] top-[6%]  text-xl animate-float-slow" style={{ animationDelay: "1s" }}>🌹</div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">

        {/* 左：フォームエリア */}
        <div className="space-y-5">
          <p className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.32em] rounded-full"
            style={{ background: "linear-gradient(135deg,#FEF9EE,#FFFBEB)", border: "1px solid rgba(217,119,6,0.3)", color: "#92400E" }}>
            👑 {t("ログイン・会員登録", "Login / Sign up")}
          </p>

          <div>
            <h2
              className="text-3xl font-black tracking-tight md:text-4xl"
              style={{ color: "#78350F", textShadow: "0 2px 12px rgba(217,119,6,0.18)" }}
            >
              {t("ようこそ", "Welcome back")}
            </h2>
            <p className="mt-1 text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: "#B45309", opacity: 0.8 }}>
              ✦ {t("次の認証画面へ進みます", "Proceed to auth screen")}
            </p>
            <p className="mt-3 text-sm leading-7" style={{ color: "#6B21A8" }}>
              {t(
                "ログイン、会員登録、Google、LINE は次の認証画面で続けられます。",
                "Login, sign-up, Google, and LINE continue on the next authentication screen.",
              )}
            </p>
          </div>

          {/* メール入力 */}
          <div
            className="rounded-3xl px-5 py-5"
            style={{
              background: "linear-gradient(135deg,rgba(255,255,255,0.97),rgba(255,251,235,0.94))",
              border: "1.5px solid rgba(217,119,6,0.22)",
              boxShadow: "0 8px 24px -8px rgba(217,119,6,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {initialMessage && (
              <div
                className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
                  initialMessage.type === "success"
                    ? "border border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border border-rose-300 bg-rose-50 text-rose-800"
                }`}
              >
                {initialMessage.text}
              </div>
            )}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#92400E" }}>
                <FaEnvelope />
                {t("メールアドレス", "Email")}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
                style={{
                  border: "1.5px solid rgba(217,119,6,0.3)",
                  background: "rgba(255,251,235,0.8)",
                  color: "#1C1917",
                }}
              />
            </label>
          </div>

          {/* ボタン群 */}
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => startLogin("login")}
              className="rounded-full px-5 py-4 text-sm font-bold tracking-wide transition hover:brightness-105"
              style={{
                background: "linear-gradient(135deg,#D97706,#B45309)",
                color: "white",
                boxShadow: "0 12px 32px -8px rgba(217,119,6,0.45)",
              }}
            >
              {t("✨ 次へ進んでログイン", "✨ Continue to login")}
            </button>

            <button
              type="button"
              onClick={() => startLogin("register")}
              className="rounded-full px-5 py-4 text-sm font-bold transition hover:brightness-105"
              style={{
                background: "linear-gradient(135deg,rgba(244,114,182,0.9),rgba(236,72,153,0.95))",
                color: "white",
                boxShadow: "0 12px 28px -8px rgba(236,72,153,0.38)",
              }}
            >
              {t("🌹 はじめて使う", "🌹 Create account")}
            </button>

            <button
              type="button"
              onClick={() => startLogin("login", "google-oauth2")}
              className="rounded-full px-5 py-4 text-sm font-semibold transition hover:brightness-95"
              style={{
                background: "linear-gradient(135deg,#FFFFFF,#F8FAFC)",
                color: "#1C1917",
                border: "1.5px solid rgba(217,119,6,0.25)",
                boxShadow: "0 6px 18px -6px rgba(0,0,0,0.12)",
              }}
            >
              {t("Googleで続ける", "Continue with Google")}
            </button>

            <button
              type="button"
              onClick={() => startLogin("login", "line")}
              className="rounded-full px-5 py-4 text-sm font-semibold transition hover:brightness-105"
              style={{
                background: "linear-gradient(135deg,#16A34A,#15803D)",
                color: "white",
                boxShadow: "0 8px 22px -8px rgba(22,163,74,0.4)",
              }}
            >
              <span className="inline-flex items-center gap-2">
                <FaLine />
                {t("LINEで続ける", "Continue with LINE")}
              </span>
            </button>

            {onGuestLogin && (
              <button
                type="button"
                onClick={onGuestLogin}
                className="rounded-full border px-5 py-4 text-sm font-semibold transition hover:brightness-95"
                style={{
                  background: "linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,243,199,0.96))",
                  border: "1.5px solid rgba(217,119,6,0.3)",
                  color: "#78350F",
                }}
              >
                {t("ゲストで試す", "Try as guest")}
              </button>
            )}
          </div>

          {/* サブリンク */}
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { href: "/privacy", label: t("プライバシー", "Privacy") },
              { href: "/terms",   label: t("利用規約",   "Terms") },
              { href: "/auth/reset-password", label: t("パスワード再設定", "Reset") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-3 py-2.5 text-center text-xs font-semibold transition hover:brightness-95"
                style={{
                  background: "linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,251,235,0.85))",
                  border: "1px solid rgba(217,119,6,0.2)",
                  color: "#92400E",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-full py-3 text-sm font-semibold transition hover:brightness-95"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(217,119,6,0.2)", color: "#78350F" }}
          >
            {t("← トップへ戻る", "← Back")}
          </button>
        </div>

        {/* 右：キャラクターエリア */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-6 pt-4">
          {/* バッジ */}
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "#92400E" }}>
            ✦ {t("フォーマルステージ", "Formal Stage")}
          </p>

          {/* キャラクターペア */}
          <div className="relative flex items-end justify-center gap-4">
            {/* 背景グロー */}
            <div className="absolute inset-0 rounded-full bg-amber-100/60 blur-3xl" />
            <div className="absolute inset-4 rounded-full bg-pink-100/40 blur-2xl" />

            {/* 男の子 */}
            <div className="flex flex-col items-center gap-2 group relative">
              <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-3">
                <div className="absolute -inset-5 rounded-full blur-2xl"
                  style={{ background: "radial-gradient(circle,rgba(253,230,138,0.35),transparent 70%)" }} />
                <BoyFormal />
              </div>
              <div
                className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider"
                style={{
                  background: "linear-gradient(135deg,rgba(248,250,252,0.95),rgba(226,232,240,0.9))",
                  color: "#1E293B",
                  border: "1px solid rgba(217,119,6,0.3)",
                  boxShadow: "0 6px 18px -6px rgba(217,119,6,0.28)",
                }}
              >
                ♦ {t("彼", "Him")}
              </div>
            </div>

            {/* 中央装飾 */}
            <div className="flex flex-col items-center gap-2 pb-8 z-10">
              <div className="text-3xl animate-float-slow">💍</div>
              <div className="flex gap-1 text-xl">
                <span className="animate-float-slow text-amber-400">✦</span>
                <span className="animate-float-slow text-pink-400" style={{ animationDelay: "0.5s" }}>♥</span>
                <span className="animate-float-slow text-amber-400" style={{ animationDelay: "1s" }}>✦</span>
              </div>
            </div>

            {/* 女の子 */}
            <div className="flex flex-col items-center gap-2 group relative">
              <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-3">
                <div className="absolute -inset-5 rounded-full blur-2xl"
                  style={{ background: "radial-gradient(circle,rgba(244,114,182,0.25),transparent 70%)" }} />
                <GirlFormal />
              </div>
              <div
                className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider"
                style={{
                  background: "linear-gradient(135deg,rgba(253,242,248,0.95),rgba(251,207,232,0.85))",
                  color: "#9D174D",
                  border: "1px solid rgba(244,114,182,0.3)",
                  boxShadow: "0 6px 18px -6px rgba(236,72,153,0.28)",
                }}
              >
                ♥ {t("彼女", "Her")}
              </div>
            </div>
          </div>

          {/* ステージ台詞 */}
          <div
            className="rounded-3xl px-6 py-4 text-center text-sm max-w-xs"
            style={{
              background: "linear-gradient(135deg,rgba(255,251,235,0.96),rgba(255,245,243,0.92))",
              border: "1.5px solid rgba(217,119,6,0.25)",
              boxShadow: "0 8px 24px -8px rgba(217,119,6,0.12)",
            }}
          >
            <p className="font-bold" style={{ color: "#92400E" }}>
              {t("「一緒に始めよう」", '"Let\'s start together"')}
            </p>
            <p className="mt-1 text-xs" style={{ color: "#A16207" }}>
              {t("家計管理で、ふたりの未来を。", "Build your future together.")}
            </p>
          </div>
        </div>
      </div>

      {/* モバイル用キャラクター（小） */}
      <div className="relative z-10 mt-6 flex items-end justify-between px-0 lg:hidden">
        <div className="flex flex-col items-center gap-1 group">
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-3">
            <div className="absolute -inset-4 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle,rgba(253,230,138,0.3),transparent 70%)" }} />
            <BoyFormal />
          </div>
          <span className="text-xs font-bold" style={{ color: "#92400E" }}>♦ {t("彼", "Him")}</span>
        </div>
        <div className="flex flex-col items-center gap-2 pb-4">
          <div className="text-2xl animate-float-slow">💍</div>
          <span className="text-lg animate-float-slow text-amber-400">♥</span>
        </div>
        <div className="flex flex-col items-center gap-1 group">
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-3">
            <div className="absolute -inset-4 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle,rgba(244,114,182,0.25),transparent 70%)" }} />
            <GirlFormal />
          </div>
          <span className="text-xs font-bold" style={{ color: "#9D174D" }}>♥ {t("彼女", "Her")}</span>
        </div>
      </div>
    </div>
  )
}
