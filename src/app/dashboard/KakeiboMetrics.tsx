import React from "react";

const METRICS = [
  {
    label: "貯蓄率",
    formula: "貯金 ÷ 収入 × 100",
    ideal: "20%以上",
    description: "収入に対する貯金割合。高いほど将来に備えられる。"
  },
  {
    label: "固定費率",
    formula: "固定費 ÷ 収入 × 100",
    ideal: "40%以下",
    description: "家賃・光熱費等の固定費の割合。"
  },
  {
    label: "浪費率",
    formula: "娯楽費 ÷ 支出 × 100",
    ideal: "15%以下",
    description: "支出に占める娯楽・無駄遣いの割合。"
  },
  {
    label: "節約率",
    formula: "(予算-実績) ÷ 予算 × 100",
    ideal: "0%以上",
    description: "予算に対してどれだけ節約できたか。"
  },
  {
    label: "先取り貯金達成度",
    formula: "実際の先取り貯金 ÷ 目標 × 100",
    ideal: "100%",
    description: "目標に対して先取り貯金がどれだけできたか。"
  },
  {
    label: "防衛資金達成度",
    formula: "累計貯金 ÷ (月支出×防衛月数) × 100",
    ideal: "100%",
    description: "生活防衛資金（例：6ヶ月分）が貯まっているか。"
  },
  {
    label: "受動収入率",
    formula: "受動収入 ÷ 支出 × 100",
    ideal: "10%以上で優秀",
    description: "支出に対する副業・配当等の受動収入割合。"
  },
  {
    label: "収支安定性",
    formula: "過去3ヶ月の収支の標準偏差",
    ideal: "低いほど安定",
    description: "収支のブレの大きさ。小さいほど家計が安定。"
  },
];

export default function KakeiboMetrics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black mb-2">家計の目安となる指標</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white">
          <thead>
            <tr className="bg-cyan-50">
              <th className="border px-3 py-2">指標</th>
              <th className="border px-3 py-2">計算式</th>
              <th className="border px-3 py-2">理想値</th>
              <th className="border px-3 py-2">説明</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map((m) => (
              <tr key={m.label}>
                <td className="border px-3 py-2 font-semibold text-black whitespace-nowrap">{m.label}</td>
                <td className="border px-3 py-2 text-black whitespace-nowrap">{m.formula}</td>
                <td className="border px-3 py-2 text-black whitespace-nowrap">{m.ideal}</td>
                <td className="border px-3 py-2 text-black">{m.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2">※ 詳しい判断基準や家計改善のヒントは「家計判断基準」ページをご覧ください。</p>
    </div>
  );
}
