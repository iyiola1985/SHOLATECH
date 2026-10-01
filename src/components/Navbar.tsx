"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig, navLinks } from "@/data/config";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 24);

      if (!onHome) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // Keep nav visible while the mobile menu is open
      if (openRef.current) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // Always show near the top
      if (y < 40) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
        setOpen(false);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const useLightNav = onHome && !scrolled && !open;
  const navLinkClass = useLightNav
    ? "font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/90 transition hover:text-amber-400 sm:text-xs"
    : "font-display text-[11px] font-bold uppercase tracking-[0.14em] text-slate-800 transition hover:text-amber-600 sm:text-xs";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-transform duration-300 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        useLightNav
          ? "border-transparent bg-transparent"
          : "border-slate-200/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 bg-transparent"
          aria-label={`${siteConfig.name} - Home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={200}
            height={100}
            className={`h-11 w-auto max-w-[42vw] bg-transparent object-contain sm:h-16 md:h-20 lg:h-24 ${
              useLightNav ? "brightness-0 invert drop-shadow-sm" : ""
            }`}
            unoptimized
            priority
          />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg touch-manipulation md:hidden ${
            useLightNav
              ? "text-white hover:text-amber-400"
              : "text-slate-700 hover:text-amber-600"
          }`}
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
        <div className="max-h-[min(70dvh,28rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display rounded-lg px-3 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-800 touch-manipulation hover:text-amber-600"
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
