"use client";

import { useState, Suspense } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { careerRoles } from "@/data/config";

function ApplyForm() {
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get("role") || "";
  const matchedRole = careerRoles.find((r) => r.id === roleFromQuery);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const cvInput = form.elements.namedItem("cv") as HTMLInputElement;
    const file = cvInput.files?.[0];

    if (!file) {
      setError("Please upload your CV / resume.");
      setLoading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("CV must be 5 MB or smaller.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", (form.elements.namedItem("name") as HTMLInputElement).value.trim());
    formData.append("email", (form.elements.namedItem("email") as HTMLInputElement).value.trim());
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    if (phone) formData.append("phone", phone);
    formData.append("role", (form.elements.namedItem("role") as HTMLSelectElement).value);
    const portfolio = (form.elements.namedItem("portfolio") as HTMLInputElement).value.trim();
    if (portfolio) formData.append("portfolio", portfolio);
    formData.append("coverNote", (form.elements.namedItem("coverNote") as HTMLTextAreaElement).value.trim());
    formData.append("cv", file);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">Apply</h1>
          <p className="type-subtitle mt-4 text-white/90">
            {matchedRole
              ? `Applying for ${matchedRole.title}`
              : "Tell us about yourself and the role you want."}
          </p>
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-2xl">
          <div className="surface-panel p-8 sm:p-10">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="type-panel-title text-white">Application received</p>
                <p className="type-subtitle mt-3 text-white/85">
                  Thanks for applying. We&apos;ll review your application and get back to you.
                </p>
                <Link href="/careers" className="type-perk mt-6 inline-block text-amber-600 hover:text-amber-700">
                  ← Back to careers
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="type-badge text-white/70">
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="type-badge text-white/70">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="type-badge text-white/70">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="type-badge text-white/70">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    defaultValue={matchedRole?.id || ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {careerRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="portfolio" className="type-badge text-white/70">
                    Portfolio / LinkedIn URL
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="cv" className="type-badge text-white/70">
                    CV / Resume * (PDF, DOC, DOCX — max 5 MB)
                  </label>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white hover:file:bg-amber-600 outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="coverNote" className="type-badge text-white/70">
                    Cover note *
                  </label>
                  <textarea
                    id="coverNote"
                    name="coverNote"
                    required
                    rows={5}
                    placeholder="Why do you want to join SholaTech?"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full py-3.5">
                  {loading ? "Sending…" : "Submit application"}
                </Button>
                <p className="text-center">
                  <Link href="/careers" className="type-perk text-white/70 hover:text-amber-600">
                    ← Back to open roles
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CareersApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-white/90">
          Loading…
        </div>
      }
    >
      <ApplyForm />
    </Suspense>
  );
}
