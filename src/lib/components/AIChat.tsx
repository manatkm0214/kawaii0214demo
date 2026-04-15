"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Budget, Transaction } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/hooks/useLang";
import { AI_PROVIDERS, setAIProvider, useAIProvider } from "@/lib/hooks/useAIProvider";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

type Props = {
  transactions: Transaction[];
  budgets: Budget[];
  currentMonth: string;
};

const QUICK_PROMPTS = {
  ja: [
    "今月の節約ポイントを教えて",
    "貯金率を上げるにはどうしたらいい？",
    "固定費の見直し案を出して",
    "生活防衛資金はどれくらい必要？",
    "無駄遣いを減らすコツを教えて",
    "投資を始める前に整えるべきことは？",
  ],
  en: [
    "Give me savings tips for this month",
    "How can I increase my savings rate?",
    "How do I reduce fixed costs?",
    "How much emergency fund do I need?",
    "Tips to cut wasteful spending",
    "What should I prepare before investing?",
  ],
} as const;

function buildContext(transactions: Transaction[], budgets: Budget[], month: string, lang: "ja" | "en") {
  const monthly = transactions.filter((tx) => tx.date.startsWith(month));
  const income = monthly.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expense = monthly.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
  const saving = monthly.filter((tx) => tx.type === "saving").reduce((sum, tx) => sum + tx.amount, 0);
  const investment = monthly.filter((tx) => tx.type === "investment").reduce((sum, tx) => sum + tx.amount, 0);
  const fixedCosts = monthly.filter((tx) => tx.type === "expense" && tx.is_fixed).reduce((sum, tx) => sum + tx.amount, 0);
  const budgetTotal = budgets.filter((item) => item.month === month).reduce((sum, item) => sum + item.amount, 0);

  const categoryMap: Record<string, number> = {};
  for (const tx of monthly.filter((item) => item.type === "expense")) {
    categoryMap[tx.category] = (categoryMap[tx.category] ?? 0) + tx.amount;
  }
  const topCategories = Object.entries(categoryMap)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5);

  if (lang === "en") {
    return [
      `Month: ${month}`,
      `Income: ${formatCurrency(income)}`,
      `Expense: ${formatCurrency(expense)}`,
      `Saving: ${formatCurrency(saving)}`,
      `Investment: ${formatCurrency(investment)}`,
      `Fixed costs: ${formatCurrency(fixedCosts)}`,
      `Budget total: ${formatCurrency(budgetTotal)}`,
      `Balance: ${formatCurrency(income - expense - saving - investment)}`,
      topCategories.length > 0
        ? `Top expense categories: ${topCategories.map(([category, amount]) => `${category} ${formatCurrency(amount)}`).join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    `対象月: ${month}`,
    `収入: ${formatCurrency(income)}`,
    `支出: ${formatCurrency(expense)}`,
    `貯金: ${formatCurrency(saving)}`,
    `投資: ${formatCurrency(investment)}`,
    `固定費: ${formatCurrency(fixedCosts)}`,
    `予算合計: ${formatCurrency(budgetTotal)}`,
    `差額: ${formatCurrency(income - expense - saving - investment)}`,
    topCategories.length > 0
      ? `主な支出カテゴリ: ${topCategories.map(([category, amount]) => `${category} ${formatCurrency(amount)}`).join("、")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function AIChat({ transactions, budgets, currentMonth }: Props) {
  const lang = useLang();
  const provider = useAIProvider();
  const t = useCallback((ja: string, en: string) => (lang === "en" ? en : ja), [lang]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useContext, setUseContext] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const quickPrompts = QUICK_PROMPTS[lang];
  const context = useMemo(
    () => (useContext ? buildContext(transactions, budgets, currentMonth, lang) : undefined),
    [budgets, currentMonth, lang, transactions, useContext],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          lang,
          context,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || t("AIチャットの応答を取得できませんでした。", "Failed to get an AI chat reply."));
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: payload.reply ?? "",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: error instanceof Error ? error.message : t("通信に失敗しました。", "Network request failed."),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <section className="metric-shell rounded-[28px] border border-slate-700 shadow-sm">
      <div className="border-b border-slate-700 px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">AI Chat</p>
            <h2 className="mt-1 text-lg font-black text-white">{t("家計の相談チャット", "Budget support chat")}</h2>
            <p className="mt-1 text-sm text-black">
              {t("節約、予算、投資、生活防衛資金の考え方を会話形式で相談できます。", "Ask about saving, budgeting, investing, and emergency funds in a simple chat.")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {AI_PROVIDERS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setAIProvider(option.key)}
                disabled={loading}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  provider === option.key
                    ? `${option.color} text-white shadow-sm`
                    : "border border-slate-600 bg-slate-800 text-black hover:bg-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="metric-tile mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-600 px-3 py-2">
          <button
            type="button"
            onClick={() => setUseContext((prev) => !prev)}
            className={`relative flex h-6 w-11 items-center rounded-full transition ${useContext ? "bg-cyan-500" : "bg-slate-600"}`}
            aria-label={t("今月データをAIと共有する", "Share this month's data with AI")}
          >
            <span className={`absolute h-4.5 w-4.5 rounded-full bg-white shadow transition-all ${useContext ? "left-6" : "left-1"}`} />
          </button>
          <div className="text-xs text-black">
            <p className="font-semibold text-white">{t("今月データを共有", "Share monthly data")}</p>
            <p>{t("オンにすると、今月の予算や支出を含めて答えます。", "When enabled, replies include this month's budget and spending context.")}</p>
          </div>
        </div>
      </div>

      <div className="max-h-[540px] min-h-[360px] space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="metric-tile rounded-[24px] border border-dashed border-cyan-500/40 px-4 py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-2xl text-cyan-200 shadow-sm">AI</div>
            <p className="mt-3 text-sm font-bold text-white">{t("気になることをそのまま聞いてください", "Ask whatever is on your mind")}</p>
            <p className="mt-1 text-xs text-black">
              {t("短い質問でも大丈夫です。家計の状況に合わせて整理しながら答えます。", "Short questions are fine. The chat will organize advice around your household situation.")}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-cyan-500/40 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-400 hover:bg-slate-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-[22px] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === "user"
                  ? "rounded-tr-md bg-cyan-500 text-white"
                  : message.error
                    ? "rounded-tl-md border border-rose-500/40 bg-rose-950/40 text-rose-100"
                    : "rounded-tl-md border border-slate-600 bg-slate-800 text-slate-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-[22px] rounded-tl-md border border-slate-600 bg-slate-800 px-4 py-3">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {messages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-700 px-4 py-2">
          {quickPrompts.slice(0, 4).map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendMessage(prompt)}
              disabled={loading}
              className="shrink-0 rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs text-black transition hover:border-cyan-400 hover:text-cyan-200 disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-slate-700 bg-transparent px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("メッセージを入力してください", "Type a message")}
            rows={1}
            disabled={loading}
            className="flex-1 resize-none overflow-hidden rounded-2xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60"
            style={{ minHeight: "2.75rem", maxHeight: "8rem" }}
            onInput={(event) => {
              const element = event.currentTarget;
              element.style.height = "auto";
              element.style.height = `${Math.min(element.scrollHeight, 128)}px`;
            }}
          />
          <button
            type="button"
            onClick={() => void sendMessage(input)}
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white shadow-sm transition hover:bg-cyan-400 disabled:opacity-40"
            aria-label={t("送信", "Send")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 rotate-90">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="mt-2 text-xs font-medium text-black transition hover:text-black"
          >
            {t("チャットをクリア", "Clear chat")}
          </button>
        )}
      </div>
    </section>
  );
}
