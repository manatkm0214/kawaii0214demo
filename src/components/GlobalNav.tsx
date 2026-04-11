import React from "react"

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
]

export default function GlobalNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-700 bg-slate-950 px-4 py-3">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
