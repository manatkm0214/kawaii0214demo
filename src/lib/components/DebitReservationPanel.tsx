"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja, enUS } from "date-fns/locale";

import { useEffect, useState } from "react";
import { formatCurrency, getCategoryLabel, type DebitReservation } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";

const EXPENSE_CATEGORIES = [
  "食費", "住居", "水道・光熱費", "通信費", "交通費", "医療費",
  "日用品", "娯楽", "レジャー", "趣味", "教育", "自己投資",
  "保険", "税金", "交際費", "サブスク", "ペット", "美容・衣服",
  "寄付・支援", "その他",
];

const CARD_OPTIONS = ["カード", "VISA", "Mastercard", "JCB", "アメックス", "楽天カード", "PayPayカード", "その他"];

type Props = {
  currentMonth: string;
  onPendingTotalChange?: (total: number) => void;
};

function nextMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function DebitReservationPanel({ currentMonth, onPendingTotalChange }: Props) {
  const lang = useLang();
  const t = (ja: string, en: string) => (lang === "en" ? en : ja);

  const [reservations, setReservations] = useState<DebitReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  // フォーム状態
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [cardName, setCardName] = useState(CARD_OPTIONS[0]);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  // DatePicker用: 月初日付で管理
  const [debitMonth, setDebitMonth] = useState<Date>(() => {
    const [y, m] = nextMonth(currentMonth).split("-").map(Number);
    return new Date(y, m - 1, 1);
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/debit-reservations")
      .then((r) => r.json())
      .then((data: { reservations?: DebitReservation[] }) => {
        setReservations(data.reservations ?? []);
      })
      .catch(() => setReservations([]))
      .finally(() => setLoading(false));
  }, []);

  // 未決済の今月利用分の合計をコールバック
  useEffect(() => {
    const pending = reservations
      .filter((r) => r.month_charged === currentMonth && !r.is_settled)
      .reduce((sum, r) => sum + r.amount, 0);
    onPendingTotalChange?.(pending);
  }, [reservations, currentMonth, onPendingTotalChange]);

  async function handleAdd() {
    const amt = Math.round(Number(amount));
    if (!amt || amt <= 0) {
      setStatus(t("金額を入力してください", "Enter an amount"));
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/debit-reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amt,
          description,
          card_name: cardName,
          category,
          month_charged: currentMonth,
          debit_month: debitMonth,
        }),
      });
      const data = (await res.json()) as { reservation?: DebitReservation; error?: string };
      if (!res.ok || !data.reservation) throw new Error(data.error ?? t("保存失敗", "Save failed"));
      setReservations((prev) => [data.reservation!, ...prev]);
      setAmount("");
      setDescription("");
      setShowForm(false);
      setStatus(t("予約を追加しました", "Reservation added"));
    } catch (e) {
      setStatus(e instanceof Error ? e.message : t("保存に失敗しました", "Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function handleSettle(id: string, settled: boolean) {
    try {
      const res = await fetch("/api/debit-reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_settled: settled }),
      });
      const data = (await res.json()) as { reservation?: DebitReservation; error?: string };
      if (!res.ok || !data.reservation) throw new Error(data.error);
      setReservations((prev) => prev.map((r) => (r.id === id ? data.reservation! : r)));
    } catch {
      setStatus(t("更新に失敗しました", "Update failed"));
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/debit-reservations?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setStatus(t("削除に失敗しました", "Delete failed"));
    }
  }

  const thisMonthItems = reservations.filter((r) => r.month_charged === currentMonth);
  const pendingItems = thisMonthItems.filter((r) => !r.is_settled);
  const settledItems = thisMonthItems.filter((r) => r.is_settled);
  const pendingTotal = pendingItems.reduce((sum, r) => sum + r.amount, 0);

  if (loading) return null;

  return (
    <div className="board-card border shadow-sm rounded-[28px] p-4 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black">
            {t("引き落とし予約枠", "Card debit reservations")}
          </p>
          <p className="mt-1 text-sm font-bold text-black">
            {t("カード利用額を予算から即差し引き", "Deduct card usage from available budget now")}
          </p>
        </div>
        {pendingTotal > 0 && (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-700">
            -{formatCurrency(pendingTotal)}
          </span>
        )}
      </div>

      {/* 未決済リスト */}
      {pendingItems.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-bold text-slate-500">{t("未引き落とし", "Pending debits")}</p>
          {pendingItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black truncate">
                  {item.description || getCategoryLabel(item.category, lang)}
                </p>
                <p className="text-xs text-slate-500">
                  {item.card_name} · {t(`引落: ${item.debit_month}`, `Debit: ${item.debit_month}`)}
                </p>
              </div>
              <span className="shrink-0 text-sm font-black text-rose-700">{formatCurrency(item.amount)}</span>
              <button
                type="button"
                onClick={() => void handleSettle(item.id, true)}
                className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-200"
              >
                {t("引落済", "Settled")}
              </button>
              <button
                type="button"
                onClick={() => void handleDelete(item.id)}
                className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 決済済みリスト（折りたたみ） */}
      {settledItems.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-bold text-slate-400 hover:text-slate-600">
            {t(`引落済 ${settledItems.length}件`, `${settledItems.length} settled`)}
          </summary>
          <div className="mt-2 space-y-1">
            {settledItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 opacity-60">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 truncate line-through">
                    {item.description || getCategoryLabel(item.category, lang)}
                  </p>
                </div>
                <span className="text-xs text-slate-400 line-through">{formatCurrency(item.amount)}</span>
                <button
                  type="button"
                  onClick={() => void handleSettle(item.id, false)}
                  className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
                >
                  {t("戻す", "Undo")}
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(item.id)}
                  className="shrink-0 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* 追加フォーム */}
      {showForm ? (
        <div className="mt-3 space-y-2 rounded-2xl border border-slate-200 p-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-black">{t("金額", "Amount")}</span>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-black">{t("カード名", "Card name")}</span>
              <select
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
              >
                {CARD_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-bold text-black">{t("内容（任意）", "Description (optional)")}</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              placeholder={t("例: Amazonで購入", "e.g. Amazon purchase")}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
            />
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-black">{t("カテゴリ", "Category")}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
              >
                {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{getCategoryLabel(c, lang)}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold text-black">{t("引落予定月", "Debit month")}</span>
              <DatePicker
                selected={debitMonth}
                onChange={(date: Date | null) => date && setDebitMonth(date)}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                showFullMonthYearPicker
                locale={lang === "en" ? enUS : ja}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-black outline-none focus:border-cyan-400"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void handleAdd()}
              disabled={saving}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-black hover:bg-cyan-300 disabled:opacity-50"
            >
              {saving ? t("追加中...", "Adding...") : t("追加", "Add")}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
            >
              {t("キャンセル", "Cancel")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-3 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 hover:border-cyan-400 hover:text-cyan-700"
        >
          + {t("カード利用を予約追加", "Add card reservation")}
        </button>
      )}

      {status && <p className="mt-2 text-sm font-semibold text-black">{status}</p>}
    </div>
  );
}
