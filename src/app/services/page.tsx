import Button from "@/components/Button";
import { services } from "@/data/config";

export default function ServicesPage() {
  return (
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">What We Do</h1>
          <p className="type-subtitle mt-4 text-white/90">
            End-to-end digital services for brands and businesses.
          </p>
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-4xl space-y-8">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="surface-panel scroll-mt-24 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start gap-4">
                <span className="text-4xl" aria-hidden>
                  {service.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="type-card-title text-white">{service.title}</h2>
                  <p className="type-subtitle mt-2 text-white/90">{service.shortDesc}</p>
                  {"startingPrice" in service && service.startingPrice && (
                    <p className="type-perk mt-2 text-amber-400">{service.startingPrice}</p>
                  )}
                </div>
              </div>
              {"description" in service && service.description && (
                <p className="mt-6 text-white">{service.description}</p>
              )}
              {"benefits" in service &&
                Array.isArray(service.benefits) &&
                service.benefits.length > 0 && (
                  <div className="mt-6">
                    <h3 className="type-badge text-amber-400">What you get</h3>
                    <ul className="mt-3 space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-white">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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
          <Button
            href="/booking"
            className="px-8 py-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get a Quote
          </Button>
        </div>
      </section>
    </div>
  );
}
