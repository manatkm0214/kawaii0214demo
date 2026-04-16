"use client";
import { useState, useEffect } from "react";

export type AIProvider = "openai" | "gemini";

export const AI_PROVIDERS: { key: AIProvider; label: string; color: string }[] = [
  { key: "openai", label: "OpenAI", color: "bg-violet-600" },
  { key: "gemini", label: "Gemini", color: "bg-blue-600"   },
];

const STORAGE_KEY = "kakeibo-ai-provider";
const CHANGE_EVENT = "kakeibo-ai-provider-change";

export function useAIProvider(): AIProvider {
  const [provider, setProvider] = useState<AIProvider>(() => {
    if (typeof window === "undefined") return "openai";
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "gemini" ? "gemini" : "openai";
  });

  useEffect(() => {
    function sync() {
      const stored = localStorage.getItem(STORAGE_KEY);
      setProvider(stored === "gemini" ? "gemini" : "openai");
    }
    window.addEventListener("storage", sync);
    window.addEventListener(CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHANGE_EVENT, sync);
    };
  }, []);

  return provider;
}

export function setAIProvider(provider: AIProvider) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, provider);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
