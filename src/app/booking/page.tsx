"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import {
  services,
  businessTypes,
  budgetRanges,
  timelineOptions,
} from "@/data/config";

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
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      businessType: (form.elements.namedItem("businessType") as HTMLSelectElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      timeline: (form.elements.namedItem("timeline") as HTMLSelectElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
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
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 transition-all duration-500 hover:bg-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100" />
          <div className="relative mx-auto max-w-2xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Request Received
            </h1>
            <p className="mt-4 text-slate-300">
              We&apos;ll review your project details and get back to you within
              24–48 hours.
            </p>
          </div>
        </section>
        <section className="bg-slate-50 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-100 p-8 text-center">
            <p className="text-slate-700">
              Check your email for confirmation. You can also reach us on
              WhatsApp for faster replies.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="group/hero relative overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="relative mx-auto max-w-2xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Book a Project
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Tell us about your project and we&apos;ll send a tailored quote.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                <label
                  htmlFor="businessType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-slate-700"
                >
                  Service *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-slate-700"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-medium text-slate-700"
                >
                  Project Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700"
                >
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="Describe your project, goals, and any specific requirements..."
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full px-6 py-4 sm:w-auto sm:min-w-[200px]"
                href={undefined}
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
