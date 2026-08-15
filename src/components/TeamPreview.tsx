import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/config";

export default function TeamPreview() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="type-section-title text-slate-900">Our Team</h2>
          <p className="type-subtitle mt-3 text-slate-600">
            Meet the people behind SholaTech design and delivery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              href="/team"
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.title}`}
                  fill
                  className="object-cover object-top transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <span className="type-badge text-amber-600">{member.department}</span>
                <h3 className="type-card-title mt-1.5 text-slate-900">{member.name}</h3>
                <p className="type-perk mt-1 text-amber-600">{member.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/team"
            className="font-display inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-800 hover:border-amber-500 hover:text-amber-600"
          >
            Meet the team
          </Link>
          <Link
            href="/careers"
            className="font-display inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-amber-600"
          >
            We&apos;re hiring
          </Link>
        </div>
      </div>
    </section>
  );
}
