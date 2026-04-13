"use client";

interface LaunchSplashProps {
  onDone: () => void;
}

const FLOATERS = [
  { className: "left-[9%] top-[14%] text-4xl", symbol: "🎀", color: "rgba(244,114,182,0.72)", delay: "0s" },
  { className: "right-[10%] top-[18%] text-3xl", symbol: "✦", color: "rgba(251,191,36,0.72)", delay: "0.5s" },
  { className: "left-[16%] bottom-[18%] text-3xl", symbol: "🧸", color: "rgba(251,146,60,0.64)", delay: "1.1s" },
  { className: "right-[14%] bottom-[18%] text-4xl", symbol: "♡", color: "rgba(192,132,252,0.7)", delay: "0.8s" },
  { className: "left-[44%] top-[9%] text-2xl", symbol: "✿", color: "rgba(96,165,250,0.68)", delay: "0.3s" },
  { className: "left-[24%] top-[7%] text-xl", symbol: "✦", color: "rgba(255,255,255,0.86)", delay: "0.9s" },
  { className: "right-[22%] top-[8%] text-xl", symbol: "✦", color: "rgba(255,255,255,0.78)", delay: "1.2s" },
  { className: "left-[58%] bottom-[10%] text-lg", symbol: "♡", color: "rgba(251,191,36,0.64)", delay: "0.6s" },
];

export default function LaunchSplash({ onDone }: LaunchSplashProps) {
  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.92) 0%, rgba(254,205,211,0.65) 24%, rgba(243,232,255,0.76) 58%, rgba(219,234,254,0.9) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FLOATERS.map((item) => (
          <div
            key={`${item.className}-${item.symbol}`}
            className={`absolute animate-float-slow select-none ${item.className}`}
            style={{ color: item.color, animationDelay: item.delay }}
          >
            {item.symbol}
          </div>
        ))}
        <div className="absolute inset-6 rounded-[42px] border border-white/35" />
        <div className="absolute inset-10 rounded-[36px] border border-rose-200/45" />
      </div>

      <div
        className="relative flex w-full max-w-sm flex-col items-center gap-7 rounded-[40px] px-10 py-14 text-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(255,247,251,0.96) 52%, rgba(243,244,255,0.96) 100%)",
          border: "2px solid rgba(251,191,36,0.34)",
          boxShadow:
            "0 40px 100px -20px rgba(236,72,153,0.24), 0 0 0 6px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.92)",
        }}
      >
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-5xl"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #fff7ed 0%, #fbcfe8 50%, #ddd6fe 100%)",
            boxShadow:
              "0 12px 36px -8px rgba(236,72,153,0.34), inset 0 2px 0 rgba(255,255,255,0.86)",
            border: "2px solid rgba(251,191,36,0.4)",
          }}
        >
          🧸
        </div>

        <div className="space-y-2">
          <p
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ color: "#be185d" }}
          >
            Cute x Kakeibo
          </p>
          <h1
            className="text-5xl font-black tracking-tight"
            style={{
              color: "#831843",
              textShadow: "0 2px 12px rgba(236,72,153,0.16)",
            }}
          >
            Balance
          </h1>
          <p
            className="text-sm font-semibold tracking-[0.18em]"
            style={{ color: "#9d174d", opacity: 0.8 }}
          >
            かわいい家計簿
          </p>
        </div>

        <p
          className="max-w-xs text-sm font-medium leading-relaxed"
          style={{ color: "#6b21a8" }}
        >
          リアル寄りのかわいい女の子や、ぬいぐるみみたいなやさしい世界観で、
          毎日の家計をふんわり整えるボードです。
        </p>

        <div className="flex items-center gap-3" style={{ color: "rgba(244,114,182,0.6)" }}>
          <span>🎀</span>
          <span className="text-xs tracking-[0.3em]" style={{ color: "#be185d" }}>
            ✦ ✦ ✦
          </span>
          <span>♡</span>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-full py-4 text-sm font-black tracking-wider text-white transition hover:brightness-105 active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #ec4899 0%, #fb7185 42%, #60a5fa 100%)",
            boxShadow:
              "0 14px 40px -8px rgba(236,72,153,0.42), 0 4px 12px rgba(236,72,153,0.16)",
            letterSpacing: "0.12em",
          }}
        >
          はじめる
        </button>
      </div>
    </div>
  );
}
