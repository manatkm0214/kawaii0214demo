"use client";

import { useEffect, useState } from "react";

export const CHARACTER_URL_KEY = "kakeibo-character-url";
export const CHARACTER_NAME_KEY = "kakeibo-character-name";
export const CHARACTER_BG_KEY = "kakeibo-character-bg";

function readFromStorage(key: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(key) || "";
}

function applyCharacterBackground(url: string, enabled: boolean) {
  if (typeof document === "undefined") return;
  const value = enabled && url ? `linear-gradient(180deg, rgba(15,23,42,0.64), rgba(15,23,42,0.82)), url("${url}")` : "none";
  document.documentElement.style.setProperty("--background-illustration", value);
  document.documentElement.style.setProperty("--background-illustration-size", enabled && url ? "cover" : "auto");
}

export function useCharacterImage() {
  const [characterUrl, setCharacterUrlState] = useState<string>(() => readFromStorage(CHARACTER_URL_KEY));
  const [characterName, setCharacterNameState] = useState<string>(() => readFromStorage(CHARACTER_NAME_KEY));
  const [backgroundEnabled, setBackgroundEnabledState] = useState<boolean>(() => readFromStorage(CHARACTER_BG_KEY) !== "0");

  useEffect(() => {
    applyCharacterBackground(characterUrl, backgroundEnabled);

    function handleUpdate() {
      const nextUrl = readFromStorage(CHARACTER_URL_KEY);
      const nextName = readFromStorage(CHARACTER_NAME_KEY);
      const nextEnabled = readFromStorage(CHARACTER_BG_KEY) !== "0";
      setCharacterUrlState(nextUrl);
      setCharacterNameState(nextName);
      setBackgroundEnabledState(nextEnabled);
      applyCharacterBackground(nextUrl, nextEnabled);
    }

    window.addEventListener("kakeibo-character-updated", handleUpdate);
    return () => window.removeEventListener("kakeibo-character-updated", handleUpdate);
  }, [backgroundEnabled, characterUrl]);

  const setCharacterUrl = (url: string) => {
    localStorage.setItem(CHARACTER_URL_KEY, url);
    setCharacterUrlState(url);
    applyCharacterBackground(url, backgroundEnabled);
    window.dispatchEvent(new Event("kakeibo-character-updated"));
  };

  const setCharacterName = (name: string) => {
    localStorage.setItem(CHARACTER_NAME_KEY, name);
    setCharacterNameState(name);
    window.dispatchEvent(new Event("kakeibo-character-updated"));
  };

  const setBackgroundEnabled = (enabled: boolean) => {
    localStorage.setItem(CHARACTER_BG_KEY, enabled ? "1" : "0");
    setBackgroundEnabledState(enabled);
    applyCharacterBackground(characterUrl, enabled);
    window.dispatchEvent(new Event("kakeibo-character-updated"));
  };

  const clearCharacter = () => {
    localStorage.removeItem(CHARACTER_URL_KEY);
    localStorage.removeItem(CHARACTER_NAME_KEY);
    setCharacterUrlState("");
    setCharacterNameState("");
    applyCharacterBackground("", backgroundEnabled);
    window.dispatchEvent(new Event("kakeibo-character-updated"));
  };

  return {
    characterUrl,
    characterName,
    backgroundEnabled,
    setCharacterUrl,
    setCharacterName,
    setBackgroundEnabled,
    clearCharacter,
  };
}

