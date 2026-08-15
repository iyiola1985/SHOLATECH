import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/config";

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">Our Team</h1>
          <p className="type-subtitle mt-4 text-slate-300">
            The people building products, design, and digital growth at SholaTech.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-slate-200">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <span className="type-badge text-amber-600">{member.department}</span>
                  <h2 className="type-card-title mt-1.5 text-slate-900">{member.name}</h2>
                  <p className="type-perk mt-1 text-amber-600">{member.title}</p>
                  <p className="type-subtitle mt-3 text-slate-600">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="type-subtitle text-slate-600">Want to join the team?</p>
            <Link
              href="/careers"
              className="font-display mt-4 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md hover:bg-amber-600"
            >
              View open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
