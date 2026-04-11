"use client";

import Link from "next/link";
import { useLang } from "@/lib/hooks/useLang";
import { useBgTheme } from "@/lib/hooks/useBgTheme";

const sections = {
  ja: [
    {
      title: "1. 収集する情報",
      body: "メールアドレス、プロフィール設定、家計記録、予算設定、認証に必要な情報などを取得する場合があります。",
    },
    {
      title: "2. 利用目的",
      body: "家計管理機能の提供、ログイン状態の維持、表示改善、お問い合わせ対応、AI機能の支援などに利用します。",
    },
    {
      title: "3. AI機能について",
      body: "AI提案の生成時には、必要な範囲で入力内容の一部を外部AIサービスへ送信することがあります。機微情報の入力は避けてください。",
    },
    {
      title: "4. 保存と管理",
      body: "データはサービス提供に必要な範囲で保存されます。不要になった場合は設定画面からアカウント削除を行えます。",
    },
    {
      title: "5. お問い合わせ",
      body: "情報の取り扱いに関する質問や依頼は、お問い合わせページからご連絡ください。",
    },
  ],
  en: [
    {
      title: "1. Information we collect",
      body: "We may collect your email address, profile settings, household records, budget settings, and information needed for authentication.",
    },
    {
      title: "2. Purpose of use",
      body: "This information is used to provide household management features, maintain login sessions, improve the display, respond to inquiries, and support AI features.",
    },
    {
      title: "3. About AI features",
      body: "When generating AI suggestions, some input data may be sent to external AI services only as needed. Please avoid entering highly sensitive information.",
    },
    {
      title: "4. Storage and management",
      body: "Your data is stored only as needed to provide the service. If you no longer need the service, you can delete your account from the settings page.",
    },
    {
      title: "5. Contact",
      body: "If you have questions or requests related to your data, please use the contact page.",
    },
  ],
} as const;

export default function PrivacyPolicyPage() {
  const lang = useLang();
  useBgTheme();
  const copy = sections[lang === "en" ? "en" : "ja"];

  return (
    <div className="legal-stage min-h-screen px-4 py-12">
      <div className="legal-panel sparkle-card mx-auto max-w-4xl rounded-[32px] p-6 md:p-10">
        <div className="legal-card rounded-[28px] px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
            {lang === "en" ? "Privacy Policy" : "プライバシーポリシー"}
          </p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
            {lang === "en" ? "Privacy Policy" : "プライバシーポリシー"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {lang === "en"
              ? "This page explains how Kakeibo Board handles your information."
              : "このページでは、Kakeibo Board における情報の取り扱い方を説明しています。"}
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
          <Link href="/terms" className="legal-link-chip rounded-full px-5 py-2.5 text-sm font-semibold transition">
            {lang === "en" ? "Terms of Service" : "利用規約"}
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
