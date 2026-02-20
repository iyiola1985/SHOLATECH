import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/data/config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our web development, e-commerce, UI/UX, and graphic design projects.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Portfolio
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Recent projects across web, design, and e-commerce.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-lg hover:bg-slate-100"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                  {(item.image.startsWith("http") || item.image.startsWith("/")) ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-5xl font-display font-bold text-slate-400">
                      {item.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
                    {item.category}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.demoUrl && item.demoUrl !== "#" && (
                    <Link
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium text-amber-600 transition hover:text-amber-700"
                    >
                      Visit site →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
