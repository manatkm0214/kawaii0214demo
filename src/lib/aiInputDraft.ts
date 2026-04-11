import type { TabType } from "@/lib/utils";

export const AI_INPUT_DRAFT_EVENT = "kakeibo-ai-input-draft";

export type AIInputDraft = {
  tab?: TabType;
  amount?: number;
  memo?: string;
  category?: string;
  payment?: string;
  isFixed?: boolean;
  date?: string;
};

export function dispatchAIInputDraft(draft: AIInputDraft) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AIInputDraft>(AI_INPUT_DRAFT_EVENT, { detail: draft }));
}
