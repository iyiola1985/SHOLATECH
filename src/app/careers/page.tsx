import Link from "next/link";
import { careerRoles } from "@/data/config";

export default function CareersPage() {
  return (
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">Careers</h1>
          <p className="type-subtitle mt-4 text-white/90">
            Join SholaTech — build websites, design products, and grow brands with us.
          </p>
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-3xl space-y-6">
          {careerRoles.map((role) => (
            <article key={role.id} className="surface-panel p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="type-badge text-amber-400">{role.department}</span>
                  <h2 className="type-card-title mt-2 text-white">{role.title}</h2>
                  <p className="type-perk mt-2 text-white/75">
                    {role.type} · {role.location}
                  </p>
                </div>
                <Link
                  href={`/careers/apply?role=${encodeURIComponent(role.id)}`}
                  className="font-display inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-amber-600 hover:scale-105"
                >
                  Apply
                </Link>
              </div>
              <p className="type-subtitle mt-4 text-white/90">{role.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
