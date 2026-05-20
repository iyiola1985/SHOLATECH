"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/data/config";
import { useState } from "react";

const navLinkClass =
  "font-display text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:text-amber-600 sm:text-xs";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${siteConfig.name} - Home`}>
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={200}
            height={100}
            className="h-12 w-auto object-contain sm:h-16 md:h-20 lg:h-24"
            unoptimized
          />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${navLinkClass} rounded-lg px-3 py-2.5 hover:bg-slate-100`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
