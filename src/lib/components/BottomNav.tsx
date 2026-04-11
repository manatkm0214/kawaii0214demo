"use client"

import { NavPage } from "@/lib/utils"
import { useLang } from "@/lib/hooks/useLang"
import { LABELS } from "./Dashboard"

interface Props {
  current: NavPage
  onChange: (page: NavPage) => void
}


const NAV_ITEMS: { page: NavPage; icon: string; key: string }[] = [
  { page: "dashboard", icon: "📊", key: "summary" },
  { page: "input", icon: "✏️", key: "input" },
  { page: "calendar", icon: "📅", key: "calendar" },
  { page: "charts", icon: "📈", key: "charts" },
  { page: "ai", icon: "🤖", key: "ai" },
  { page: "report", icon: "📄", key: "report" },
  { page: "goals", icon: "🎯", key: "goal" },
]

export default function BottomNav({ current, onChange }: Props) {
  const lang = useLang();
  const T = LABELS[lang] || LABELS.ja;
  // ページごとのラベル取得（型安全に）
  const getLabel = (key: string): string => {
    // メインタイトル
    const mainKeys = ["summary", "goal", "child", "elder", "loan", "customize", "print", "share", "actual", "target"] as const;
    if (mainKeys.includes(key as typeof mainKeys[number])) {
      const v = T[key as keyof typeof T];
      return typeof v === "string" ? v : key;
    }
    // カテゴリ
    const catKeys = [
      "housing", "food", "utilities", "transport", "entertainment", "other",
      "communication", "medical", "daily", "leisure", "hobby", "education", "selfdev", "insurance", "tax", "social", "subscription", "pet", "beauty", "donation"
    ] as const;
    if (T.category && catKeys.includes(key as typeof catKeys[number])) {
      const v = T.category[key as keyof typeof T.category];
      return typeof v === "string" ? v : key;
    }
    // 固定値
    switch (key) {
      case "input": return lang === "en" ? "Input" : "入力";
      case "calendar": return lang === "en" ? "Calendar" : "カレンダー";
      case "charts": return lang === "en" ? "Charts" : "グラフ";
      case "ai": return "AI";
      case "report": return lang === "en" ? "Report" : "レポート";
      default: return key;
    }
  };
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 no-print">
      <div className="flex overflow-x-auto items-center h-14 px-1" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map(({ page, icon, key }) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`flex-none flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-14 ${
              current === page
                ? "bg-slate-950 text-violet-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-[11px] font-medium leading-none">{getLabel(key)}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
