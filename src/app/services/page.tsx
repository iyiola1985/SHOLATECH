import type { Metadata } from "next";
import Button from "@/components/Button";
import { services } from "@/data/config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, UI/UX design, e-commerce, event booking sites, and graphic design.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            From websites to branding — we deliver quality and clarity.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 border-b border-slate-200 py-12 last:border-0 first:pt-16"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <div className="flex-shrink-0 text-4xl" aria-hidden>
                {service.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-slate-600">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-slate-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href="/booking" className="px-6 py-2.5 text-sm">
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-slate-100 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Not sure which service fits?
          </h2>
          <p className="mt-3 text-slate-600">
            Book a call and we&apos;ll help you choose the right option.
          </p>
          <Button href="/booking" className="mt-6 px-8 py-4">
            Book a Project
          </Button>
        </div>
      </section>
    </>
  );
}
