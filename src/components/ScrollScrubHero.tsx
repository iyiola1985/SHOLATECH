"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { portfolioItems } from "@/data/config";

const WORK_PREVIEW = portfolioItems
  .filter((item) => [3, 4, 2].includes(item.id))
  .sort(
    (a, b) => [3, 4, 2].indexOf(a.id) - [3, 4, 2].indexOf(b.id)
  );

export default function ScrollScrubHero() {
  return (
    <>
      <section
        className="relative z-10 flex min-h-[100svh] items-center justify-center"
        aria-label="Hero"
      >
        <div className="mx-auto w-full max-w-4xl px-4 pb-8 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] text-center sm:px-6 sm:pt-24 lg:px-8">
          <h1 className="type-hero text-white">
            We Build Digital Experiences That{" "}
            <span className="text-amber-400">Convert</span>
          </h1>
          <p className="type-hero-subtitle mt-4 mx-auto max-w-2xl text-white sm:mt-6">
            Website development, UI/UX design, 3D websites, social media, e-commerce, event booking sites,
            and graphic design. One team for your entire digital presence.
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              href="/booking"
              className="w-full px-8 py-3.5 text-sm sm:min-w-[180px] sm:w-auto sm:py-4 sm:text-base"
            >
              Book a Project
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="w-full border-white px-8 py-3.5 text-sm text-white hover:bg-white hover:text-slate-900 sm:min-w-[180px] sm:w-auto sm:py-4 sm:text-base"
            >
              View Services
            </Button>
          </div>
          <p className="type-perk mt-8 text-white/50 sm:mt-10">Scroll to explore</p>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-24 pt-8 sm:px-6 sm:pb-32 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="type-section-title text-white drop-shadow-sm">
              Our Work
            </h2>
            <p className="type-hero-subtitle mt-3 text-white">
              A selection of recent projects across web, design, and e-commerce.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORK_PREVIEW.map((item) => {
              const href = item.demoUrl || "/portfolio";
              const isExternal = href.startsWith("http");
              const content = (
                <>
                  <div className="relative aspect-video overflow-hidden bg-slate-800/60">
                    {"image" in item && item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-4xl font-display font-bold text-amber-400/80">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="type-badge text-amber-400">
                      {item.category}
                    </span>
                    <h3 className="type-card-title mt-1.5 text-white transition group-hover:text-amber-400">
                      {item.title}
                    </h3>
                    <p className="type-subtitle mt-1.5 line-clamp-2 text-white/90">
                      {item.description}
                    </p>
                    {isExternal && (
                      <span className="type-perk mt-2 inline-block text-amber-400">
                        Visit site →
                      </span>
                    )}
                  </div>
                </>
              );

              return isExternal ? (
                <a
                  key={item.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card group"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={href}
                  className="surface-card group"
                >
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button
              href="/portfolio"
              variant="outline"
              className="border-white px-8 py-3 text-white hover:bg-white hover:text-slate-900"
            >
              View Full Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
