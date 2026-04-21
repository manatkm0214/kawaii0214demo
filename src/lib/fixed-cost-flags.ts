import { getCategoryLabel, type Transaction } from "@/lib/utils";

export const FIXED_COST_FLAGS_REVIEWED_KEY = "kakeibo-fixed-cost-flags-reviewed";
export const FIXED_COST_FLAGS_HIDDEN_KEY = "kakeibo-fixed-cost-flags-hidden";
export const FIXED_COST_FLAGS_UPDATED_EVENT = "kakeibo-fixed-cost-flags-updated";

export type FixedCostFlagPriority = "high" | "medium" | "low";

export interface FixedCostFlag {
  id: string;
  title: string;
  category: string;
  categoryLabelJa: string;
  categoryLabelEn: string;
  amount: number;
  count: number;
  lastDate: string;
  paymentMethods: string[];
  reasonsJa: string[];
  reasonsEn: string[];
  actionJa: string;
  actionEn: string;
  priority: FixedCostFlagPriority;
  reviewed: boolean;
}

const FIXED_CATEGORY_TERMS = [
  "subscriptions",
  "subscription",
  "communication",
  "insurance",
  "utilities",
  "utility",
  "housing",
  "rent",
  "internet",
  "mobile",
  "サブスク",
  "通信",
  "保険",
  "光熱",
  "水道",
  "住居",
  "家賃",
  "ネット",
  "スマホ",
  "携帯",
];

function stableId(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = Math.imul(31, hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return `fixed-cost-${Math.abs(hash).toString(36)}`;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function looksLikeFixedCost(transaction: Transaction) {
  if (transaction.type !== "expense") return false;
  if (transaction.is_fixed) return true;

  const text = [
    transaction.category,
    getCategoryLabel(transaction.category, "ja"),
    getCategoryLabel(transaction.category, "en"),
    transaction.memo,
  ]
    .join(" ")
    .toLowerCase();

  return FIXED_CATEGORY_TERMS.some((term) => text.includes(term.toLowerCase()));
}

function buildGroupKey(transaction: Transaction) {
  const label = getCategoryLabel(transaction.category, "en");
  const title = transaction.memo.trim() || label || transaction.category;
  return `${normalize(transaction.category)}|${normalize(title)}|${normalize(transaction.payment_method || "")}`;
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function loadFixedCostFlagIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function dispatchFixedCostFlagsUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(FIXED_COST_FLAGS_UPDATED_EVENT, {
      detail: {
        reviewedIds: loadReviewedFixedCostFlagIds(),
        hiddenIds: loadHiddenFixedCostFlagIds(),
      },
    })
  );
}

export function buildFixedCostFlagVisibilityId(flagId: string, currentMonth: string) {
  return `${currentMonth}:${flagId}`;
}

export function loadReviewedFixedCostFlagIds(): string[] {
  return loadFixedCostFlagIds(FIXED_COST_FLAGS_REVIEWED_KEY);
}

export function loadHiddenFixedCostFlagIds(): string[] {
  return loadFixedCostFlagIds(FIXED_COST_FLAGS_HIDDEN_KEY);
}

export function saveReviewedFixedCostFlagIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FIXED_COST_FLAGS_REVIEWED_KEY, JSON.stringify(unique(ids)));
  dispatchFixedCostFlagsUpdated();
}

export function saveHiddenFixedCostFlagIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FIXED_COST_FLAGS_HIDDEN_KEY, JSON.stringify(unique(ids)));
  dispatchFixedCostFlagsUpdated();
}

export function buildFixedCostFlags(
  transactions: Transaction[],
  currentMonth: string,
  reviewedIds: string[] = [],
  hiddenIds: string[] = []
): FixedCostFlag[] {
  const monthly = transactions.filter((transaction) => transaction.date.startsWith(currentMonth));
  const income = monthly
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const groups = new Map<string, Transaction[]>();

  monthly.filter(looksLikeFixedCost).forEach((transaction) => {
    const key = buildGroupKey(transaction);
    groups.set(key, [...(groups.get(key) ?? []), transaction]);
  });

  return [...groups.entries()]
    .map(([key, items]) => {
      const first = items[0];
      const amount = items.reduce((sum, item) => sum + item.amount, 0);
      const categoryLabelJa = getCategoryLabel(first.category, "ja");
      const categoryLabelEn = getCategoryLabel(first.category, "en");
      const text = `${first.category} ${categoryLabelJa} ${categoryLabelEn} ${first.memo}`.toLowerCase();
      const isSubscription = text.includes("subscription") || text.includes("サブスク");
      const incomeShare = income > 0 ? amount / income : 0;
      const reasonsJa: string[] = [];
      const reasonsEn: string[] = [];
      let score = first.is_fixed ? 1 : 0;

      if (isSubscription) {
        score += 3;
        reasonsJa.push("サブスク系の継続課金");
        reasonsEn.push("Recurring subscription charge");
      }
      if (incomeShare >= 0.05) {
        score += 3;
        reasonsJa.push("手取りの5%以上");
        reasonsEn.push("5%+ of monthly income");
      }
      if (amount >= 10000) {
        score += 2;
        reasonsJa.push("月1万円以上");
        reasonsEn.push("10,000+ per month");
      }
      if (items.length > 1) {
        score += 1;
        reasonsJa.push("同月に複数回発生");
        reasonsEn.push("Multiple charges this month");
      }
      if (first.is_fixed) {
        reasonsJa.push("固定費として登録済み");
        reasonsEn.push("Marked as fixed cost");
      }
      if (reasonsJa.length === 0) {
        reasonsJa.push("固定費カテゴリの支出");
        reasonsEn.push("Fixed-cost category spending");
      }

      const priority: FixedCostFlagPriority = score >= 5 ? "high" : score >= 3 ? "medium" : "low";
      const actionJa = isSubscription
        ? "使っていない月は解約・年払い・下位プランを確認"
        : amount >= 10000 || incomeShare >= 0.05
          ? "相見積もり・プラン変更・契約更新月を確認"
          : "必要性と利用頻度を確認";
      const actionEn = isSubscription
        ? "Check cancellation, annual billing, or a lower plan"
        : amount >= 10000 || incomeShare >= 0.05
          ? "Compare providers, change plan, or check renewal timing"
          : "Check necessity and usage frequency";
      const title = first.memo.trim() || categoryLabelJa || first.category;
      const id = stableId(key);
      const dates = items.map((item) => item.date).sort();

      return {
        id,
        title,
        category: first.category,
        categoryLabelJa,
        categoryLabelEn,
        amount,
        count: items.length,
        lastDate: dates[dates.length - 1] ?? first.date,
        paymentMethods: unique(items.map((item) => item.payment_method)),
        reasonsJa,
        reasonsEn,
        actionJa,
        actionEn,
        priority,
        reviewed: reviewedIds.includes(id),
      };
    })
    .filter((flag) => !hiddenIds.includes(flag.id) && !hiddenIds.includes(buildFixedCostFlagVisibilityId(flag.id, currentMonth)))
    .sort((a, b) => {
      const priorityRank: Record<FixedCostFlagPriority, number> = { high: 0, medium: 1, low: 2 };
      return priorityRank[a.priority] - priorityRank[b.priority] || b.amount - a.amount;
    });
}
