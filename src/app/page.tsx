import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { portfolioItems, testimonials } from "@/data/config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.15),transparent)] transition-opacity duration-500 group-hover/hero:opacity-100 group-hover/hero:bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(245,158,11,0.25),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl transition-colors duration-300 group-hover/hero:text-white">
            We Build Digital Experiences That{" "}
            <span className="text-amber-400 transition-all duration-300 group-hover/hero:text-amber-300 group-hover/hero:drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">Convert</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl transition-colors duration-300 group-hover/hero:text-slate-200">
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
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Work
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              A selection of recent projects across web, design, and e-commerce.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems
              .filter((item) => [5, 2, 3].includes(item.id))
              .map((item) => {
                const href = item.demoUrl && item.demoUrl !== "#" ? item.demoUrl : "/portfolio";
                const isExternal = href.startsWith("http");
                const cardClass =
                  "group block overflow-hidden rounded-2xl bg-slate-100/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-slate-100 hover:scale-[1.02]";
                const content = (
                  <>
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                      {item.image.startsWith("http") || item.image.startsWith("/") ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-4xl font-display font-bold text-slate-500">
                          {item.title.charAt(0)}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
                        {item.category}
                      </span>
                      <h3 className="mt-1 font-display font-semibold text-slate-900 transition group-hover:text-amber-600">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {item.description}
                      </p>
                      {isExternal && (
                        <span className="mt-2 inline-block text-xs font-medium text-amber-600">
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
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <Link key={item.id} href={href} className={cardClass}>
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

      {/* Testimonials */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              What Clients Say
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Trusted by startups, DJs, and brands.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="rounded-2xl border border-slate-200 bg-slate-100/80 p-6"
              >
                <p className="text-slate-700">&ldquo;{t.content}&rdquo;</p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <cite className="font-semibold not-italic text-slate-900">
                      {t.name}
                    </cite>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Tell us your idea and we&apos;ll get back with a plan and quote.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/booking" className="min-w-[180px] px-8 py-4 text-base">
              Book a Project
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="min-w-[180px] border-white px-8 py-4 text-base text-white hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
