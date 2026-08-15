import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/config";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
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
                  {"linkedin" in member && member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 hover:text-[#0A66C2]"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
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
