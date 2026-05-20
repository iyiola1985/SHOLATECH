import Link from "next/link";
import Button from "@/components/Button";
import { services } from "@/data/config";

export default function ServicesPage() {
  return (
    <>
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">
            What We Do
          </h1>
          <p className="type-subtitle mt-4 text-slate-300">
            End-to-end digital services for brands and businesses.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-200/80 hover:-translate-y-0.5 sm:p-8"
            >
              <div className="flex flex-wrap items-start gap-4">
                <span className="text-4xl" aria-hidden>
                  {service.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="type-card-title text-slate-900">
                    {service.title}
                  </h2>
                  <p className="type-subtitle mt-2 text-slate-600">
                    {service.shortDesc}
                  </p>
                  {"startingPrice" in service && service.startingPrice && (
                    <p className="type-perk mt-2 text-amber-600">
                      {service.startingPrice}
                    </p>
                  )}
                </div>
              </div>
              {"description" in service && service.description && (
                <p className="mt-6 text-slate-700">
                  {service.description}
                </p>
              )}
              {"benefits" in service && Array.isArray(service.benefits) && service.benefits.length > 0 && (
                <div className="mt-6">
                  <h3 className="type-badge text-slate-500">
                    What you get
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button href="/booking" className="px-8 py-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            Get a Quote
          </Button>
        </div>
      </section>
    </>
  );
}
