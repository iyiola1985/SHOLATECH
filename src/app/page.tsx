import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import LiveFeedbackSection from "@/components/LiveFeedbackSection";
import { siteConfig, portfolioItems } from "@/data/config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.15),transparent)] opacity-80 transition-opacity duration-500 group-hover/hero:opacity-100 group-hover/hero:bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(245,158,11,0.22),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="type-hero text-white transition-colors duration-300 group-hover/hero:text-white">
            We Build Digital Experiences That{" "}
            <span className="text-amber-400 transition-all duration-300 group-hover/hero:text-amber-300 group-hover/hero:drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">Convert</span>
          </h1>
          <p className="type-hero-subtitle mt-6 max-w-2xl mx-auto text-slate-300 transition-colors duration-300 group-hover/hero:text-slate-200">
            Website development, UI/UX design, e-commerce, event booking sites,
            and graphic design. One agency for your entire digital presence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/booking"
              className="min-w-[180px] px-8 py-4 text-base transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book a Project
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="min-w-[180px] border-white px-8 py-4 text-base text-white hover:bg-white hover:text-slate-900 transition-transform duration-300 hover:scale-105"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-slate-100 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="type-section-title text-slate-900">
              Our Work
            </h2>
            <p className="type-subtitle mt-3 text-slate-600">
              A selection of recent projects across web, design, and e-commerce.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Match sholatech.com order: CWORT, DJ03, 3PLE A */}
            {portfolioItems.filter((item) => [3, 4, 2].includes(item.id)).sort((a, b) => [3, 4, 2].indexOf(a.id) - [3, 4, 2].indexOf(b.id)).map((item) => {
              const href = item.demoUrl || "/portfolio";
              const isExternal = href.startsWith("http");
              const content = (
                <>
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
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
                      <span className="flex h-full w-full items-center justify-center text-4xl font-display font-bold text-slate-500">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="type-badge text-amber-600">
                      {item.category}
                    </span>
                    <h3 className="type-card-title mt-1.5 text-slate-900 transition group-hover:text-amber-600">
                      {item.title}
                    </h3>
                    <p className="type-subtitle mt-1.5 line-clamp-2 text-slate-600">
                      {item.description}
                    </p>
                    {isExternal && (
                      <span className="type-perk mt-2 inline-block text-amber-600">
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
                  className="group block overflow-hidden rounded-2xl bg-slate-100/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-slate-100 hover:scale-[1.02]"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={href}
                  className="group block overflow-hidden rounded-2xl bg-slate-100/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-slate-100 hover:scale-[1.02]"
                >
                  {content}
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button href="/portfolio" variant="outline" className="px-8 py-3">
              View Full Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Client reviews — from past clients, for new visitors */}
      <LiveFeedbackSection />

      {/* Contact CTA */}
      <section className="bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="type-section-title text-white">
            Ready to Start Your Project?
          </h2>
          <p className="type-subtitle mt-4 text-slate-300">
            Tell us your idea and we&apos;ll get back with a plan and quote.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/booking"
              className="min-w-[180px] px-8 py-4 text-base transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book a Project
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="min-w-[180px] border-white px-8 py-4 text-base text-white hover:bg-white hover:text-slate-900 transition-transform duration-300 hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
