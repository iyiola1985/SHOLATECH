"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { services } from "@/data/config";

const businessTypes = ["Startup", "Small business", "DJ / Event professional", "Agency", "Personal brand", "Other"];
const budgetRanges = ["Under $200", "$200 – $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500+", "Not sure yet"];
const timelineOptions = ["ASAP", "Within 2 weeks", "Within 1 month", "Within 3 months", "Just exploring"];

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || undefined,
      businessType: (form.elements.namedItem("businessType") as HTMLSelectElement).value || undefined,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value || undefined,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value || undefined,
      timeline: (form.elements.namedItem("timeline") as HTMLSelectElement).value || undefined,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value.trim(),
    };
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <>
      <section className="group/hero relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-30%,rgba(245,158,11,0.15),transparent_50%)] opacity-80 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl transition-colors duration-300 group-hover/hero:text-white">
            Book a Project
          </h1>
          <p className="mt-6 text-xl text-slate-300 sm:text-2xl max-w-2xl mx-auto transition-colors duration-300 group-hover/hero:text-slate-200">
            Tell us about your project and we&apos;ll get back with a plan and quote.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-200/60 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-display text-2xl font-bold tracking-tight text-slate-900">Request received</p>
                <p className="mt-3 text-lg text-slate-600">
                  We&apos;ll review your project and get back to you soon.
                </p>
                <Link href="/" className="mt-6 inline-block text-base font-medium text-amber-600 hover:text-amber-700 transition">
                  Back to home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Project details</h2>
                <p className="mt-2 text-base text-slate-600">
                  Name, email, and project description are required. Other fields help us respond better.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-name" className="block text-sm font-semibold text-slate-700">Name *</label>
                      <input id="booking-name" name="name" type="text" required className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="booking-email" className="block text-sm font-semibold text-slate-700">Email *</label>
                      <input id="booking-email" name="email" type="email" required className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="block text-sm font-medium text-slate-700">Phone</label>
                    <input id="booking-phone" name="phone" type="tel" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="+234 800 000 0000" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-businessType" className="block text-sm font-medium text-slate-700">Business type</label>
                      <select id="booking-businessType" name="businessType" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                        <option value="">Select…</option>
                        {businessTypes.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-service" className="block text-sm font-medium text-slate-700">Service</label>
                      <select id="booking-service" name="service" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                        <option value="">Select…</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-budget" className="block text-sm font-medium text-slate-700">Budget</label>
                      <select id="booking-budget" name="budget" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                        <option value="">Select…</option>
                        {budgetRanges.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-timeline" className="block text-sm font-medium text-slate-700">Timeline</label>
                      <select id="booking-timeline" name="timeline" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                        <option value="">Select…</option>
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-description" className="block text-sm font-medium text-slate-700">Project description *</label>
                    <textarea id="booking-description" name="description" required rows={5} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="What do you need? Goals, deadlines, any references..." />
                  </div>
                  {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                  <Button type="submit" className="w-full sm:w-auto sm:min-w-[180px] transition-transform duration-300 hover:scale-105 hover:shadow-lg" href={undefined} disabled={loading}>
                    {loading ? "Sending..." : "Send request"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
