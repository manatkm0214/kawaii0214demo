import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balance",
  description: "Shared household dashboard with goals, budget presets, and design customization.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="light" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var bg=localStorage.getItem('kakeibo-custom-bg');if(bg)document.documentElement.style.setProperty('--background',bg);var theme=localStorage.getItem('kakeibo-theme')||'light';document.documentElement.setAttribute('data-theme',theme);if(theme==='dark')document.documentElement.classList.add('dark');}catch(e){document.documentElement.setAttribute('data-theme','light');}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">{children}</body>
    </html>
  );
}
