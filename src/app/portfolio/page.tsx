import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/data/config";

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">
            Our Work
          </h1>
          <p className="type-subtitle mt-4 text-slate-300">
            A selection of projects we&apos;ve built — websites, e-commerce, and digital experiences.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => {
              const href = "demoUrl" in item && item.demoUrl ? item.demoUrl : "#";
              const isExternal = href.startsWith("http");
              const image = "image" in item ? item.image : null;
              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-200">
                    {image ? (
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-4xl font-display font-bold text-slate-400">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="type-badge text-amber-600">
                      {item.category}
                    </span>
                    <h2 className="type-card-title mt-1.5 text-slate-900">
                      {item.title}
                    </h2>
                    <p className="type-subtitle mt-2 line-clamp-2 text-slate-600">
                      {item.description}
                    </p>
                    {isExternal && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-perk mt-3 inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700"
                      >
                        Visit site
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="font-display inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md hover:bg-amber-600"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
