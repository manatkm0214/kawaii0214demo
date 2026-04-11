"use client";

import Link from "next/link";
import { useLang } from "@/lib/hooks/useLang";
import { useBgTheme } from "@/lib/hooks/useBgTheme";

const sections = {
  ja: [
    {
      title: "1. サービスについて",
      body: "Kakeibo Board は、家計の記録・見直し・共有を助けるためのサービスです。",
    },
    {
      title: "2. アカウント利用",
      body: "ユーザーは自身の責任でログイン情報を管理してください。不正利用が疑われる場合は、設定変更などを早めに行ってください。",
    },
    {
      title: "3. AI提案",
      body: "AIによる提案は参考情報です。支出、契約、そのほか重要な判断は最終的にご自身で行ってください。",
    },
    {
      title: "4. 禁止事項",
      body: "不正アクセス、他人の情報の悪用、サービス運営を妨げる行為は禁止します。",
    },
    {
      title: "5. 更新について",
      body: "本サービスおよび本規約は、必要に応じて更新されることがあります。",
    },
  ],
  en: [
    {
      title: "1. About the service",
      body: "Kakeibo Board is a service that helps you record, review, and share household finances.",
    },
    {
      title: "2. Account use",
      body: "Users are responsible for managing their own login information. If unauthorized access is suspected, please update your settings promptly.",
    },
    {
      title: "3. AI features",
      body: "AI suggestions are provided for reference only. Final decisions about spending, contracts, or other important matters remain the user's responsibility.",
    },
    {
      title: "4. Prohibited actions",
      body: "Unauthorized access, misuse of another person's information, and actions that interfere with the service are prohibited.",
    },
    {
      title: "5. Updates",
      body: "The service and these terms may be updated as needed.",
    },
  ],
} as const;

export default function TermsPage() {
  const lang = useLang();
  useBgTheme();
  const copy = sections[lang === "en" ? "en" : "ja"];

  return (
    <div className="legal-stage min-h-screen px-4 py-12">
      <div className="legal-panel sparkle-card mx-auto max-w-4xl rounded-[32px] p-6 md:p-10">
        <div className="legal-card rounded-[28px] px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-fuchsia-200">
            {lang === "en" ? "Terms of Service" : "利用規約"}
          </p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
            {lang === "en" ? "Terms of Service" : "利用規約"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {lang === "en"
              ? "This page explains the basic rules for using Kakeibo Board."
              : "このページでは、Kakeibo Board を使ううえでの基本的なルールをまとめています。"}
          </p>
          <p className="mt-3 text-xs text-slate-400">
            {lang === "en" ? "Last updated: April 6, 2026" : "最終更新日: 2026年4月6日"}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {copy.map((section) => (
            <section key={section.title} className="legal-card sparkle-card rounded-[24px] px-5 py-5">
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/privacy" className="legal-link-chip rounded-full px-5 py-2.5 text-sm font-semibold transition">
            {lang === "en" ? "Privacy Policy" : "プライバシーポリシー"}
          </Link>
          <Link href="/" className="rounded-full bg-[linear-gradient(135deg,#f472b6_0%,#fb7185_50%,#38bdf8_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_34px_-20px_rgba(244,114,182,0.55)] transition hover:brightness-105">
            {lang === "en" ? "Back to board" : "ボードに戻る"}
          </Link>
          <Link href="/" className="legal-link-chip rounded-full px-5 py-2.5 text-sm font-semibold transition">
            {lang === "en" ? "Back to home" : "ホームへ戻る"}
          </Link>
        </div>
      </div>
    </div>
  );
}
