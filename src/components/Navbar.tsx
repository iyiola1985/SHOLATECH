"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/config";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-[#f8fafc] backdrop-blur-sm transition-colors duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center transition duration-200 hover:opacity-100 hover:scale-[1.02] opacity-90"
          aria-label={`${siteConfig.name} - Home`}
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={240}
            height={88}
            className="h-16 w-auto sm:h-20 md:h-24 object-contain"
            priority
            unoptimized
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-nav text-sm font-medium text-slate-600 transition duration-200 hover:text-slate-900 hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/booking"
          className="font-nav hidden rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-amber-600 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2 md:inline-block"
        >
          Book a Project
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition duration-200 hover:bg-slate-200 hover:text-slate-900 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-slate-200/60 bg-[#f8fafc] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-nav block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-200 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="font-nav block rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book a Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
