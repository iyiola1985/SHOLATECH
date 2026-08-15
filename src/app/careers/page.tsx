import Link from "next/link";
import { careerRoles } from "@/data/config";

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">Careers</h1>
          <p className="type-subtitle mt-4 text-slate-300">
            Join SholaTech — build websites, design products, and grow brands with us.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {careerRoles.map((role) => (
            <article
              key={role.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="type-badge text-amber-600">{role.department}</span>
                  <h2 className="type-card-title mt-2 text-slate-900">{role.title}</h2>
                  <p className="type-perk mt-2 text-slate-500">
                    {role.type} · {role.location}
                  </p>
                </div>
                <Link
                  href={`/careers/apply?role=${encodeURIComponent(role.id)}`}
                  className="font-display inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-600"
                >
                  Apply
                </Link>
              </div>
              <p className="type-subtitle mt-4 text-slate-600">{role.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
