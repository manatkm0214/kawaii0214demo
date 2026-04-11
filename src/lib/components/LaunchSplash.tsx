"use client";

interface LaunchSplashProps {
  onDone: () => void;
}

export default function LaunchSplash({ onDone }: LaunchSplashProps) {
  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 25% 0%, #fff0f8 0%, #fce7f3 22%, #ede9fe 55%, #c7d2fe 100%)",
      }}
    >
      {/* 豪華な背景パーティクル */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[8%]  top-[12%] animate-float-slow text-5xl" style={{ color: "rgba(244,114,182,0.55)" }}>★</div>
        <div className="absolute right-[10%] top-[18%] animate-float-slow text-4xl" style={{ color: "rgba(216,180,254,0.65)", animationDelay: "0.6s" }}>✦</div>
        <div className="absolute left-[14%]  bottom-[16%] animate-float-slow text-3xl" style={{ color: "rgba(253,164,175,0.6)", animationDelay: "1.2s" }}>♥</div>
        <div className="absolute right-[14%] bottom-[20%] animate-float-slow text-5xl" style={{ color: "rgba(196,181,253,0.6)", animationDelay: "0.9s" }}>✧</div>
        <div className="absolute left-[44%]  top-[8%]  animate-float-slow text-3xl" style={{ color: "rgba(252,211,77,0.7)", animationDelay: "0.3s" }}>✶</div>
        <div className="absolute left-[22%]  top-[5%]  animate-float-slow text-2xl" style={{ animationDelay: "0.4s" }}>🌸</div>
        <div className="absolute right-[20%] top-[6%]  animate-float-slow text-2xl" style={{ animationDelay: "1s" }}>🌸</div>
        <div className="absolute left-[60%]  bottom-[9%] animate-float-slow text-xl" style={{ animationDelay: "0.7s" }}>🌸</div>
        <div className="absolute left-[35%]  bottom-[5%] animate-float-slow text-2xl" style={{ color: "rgba(252,211,77,0.6)" }}>✦</div>
        {/* ダブルフレーム */}
        <div className="absolute inset-6  rounded-[40px]" style={{ border: "1px solid rgba(244,114,182,0.18)" }} />
        <div className="absolute inset-10 rounded-[36px]" style={{ border: "1px solid rgba(252,211,77,0.14)" }} />
      </div>

      {/* メインカード */}
      <div
        className="relative flex w-full max-w-sm flex-col items-center gap-7 rounded-[40px] px-10 py-14 text-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(255,245,252,0.95) 50%, rgba(245,243,255,0.95) 100%)",
          border: "2px solid rgba(252,211,77,0.45)",
          boxShadow:
            "0 40px 100px -20px rgba(236,72,153,0.28), 0 0 0 6px rgba(255,192,203,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* 王冠アイコン */}
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-6xl"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, #fff9c4 0%, #fbcfe8 50%, #ddd6fe 100%)",
            boxShadow:
              "0 12px 36px -8px rgba(236,72,153,0.4), inset 0 2px 0 rgba(255,255,255,0.8)",
            border: "2px solid rgba(252,211,77,0.5)",
          }}
        >
          👑
        </div>

        {/* タイトル */}
        <div className="space-y-1">
          <p
            className="text-xs font-bold uppercase tracking-[0.44em]"
            style={{ color: "#be185d" }}
          >
            ✦ IDOL × KAKEIBO ✦
          </p>
          <h1
            className="text-5xl font-black tracking-tight"
            style={{
              color: "#831843",
              textShadow: "0 2px 12px rgba(236,72,153,0.2)",
            }}
          >
            Balance
          </h1>
          <p
            className="text-sm font-semibold tracking-[0.18em]"
            style={{ color: "#9d174d", opacity: 0.75 }}
          >
            お姫様家計簿
          </p>
        </div>

        {/* 説明文 */}
        <p
          className="max-w-xs text-sm font-medium leading-relaxed"
          style={{ color: "#6b21a8" }}
        >
          {`毎日使いたくなる\nきらきらアイドル家計ボード`}
        </p>

        {/* 区切り */}
        <div className="flex items-center gap-3" style={{ color: "rgba(244,114,182,0.6)" }}>
          <span>🌸</span>
          <span className="text-xs tracking-[0.3em]" style={{ color: "#be185d" }}>
            ✦ ✦ ✦
          </span>
          <span>🌸</span>
        </div>

        {/* ボタン */}
        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-full py-4 text-sm font-black tracking-wider text-white transition hover:brightness-105 active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #ec4899 0%, #f97316 45%, #38bdf8 100%)",
            boxShadow:
              "0 14px 40px -8px rgba(236,72,153,0.55), 0 4px 12px rgba(236,72,153,0.2)",
            letterSpacing: "0.12em",
          }}
        >
          ✨ 始める
        </button>
      </div>
    </div>
  );
}
