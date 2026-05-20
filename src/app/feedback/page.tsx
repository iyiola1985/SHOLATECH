"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import FeedbackWall, { useFeedbackFeed } from "@/components/FeedbackWall";

const projectTypes = ["Website development", "UI/UX design", "E-commerce", "Event & DJ booking", "Graphic design", "Other"];

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { feed, loading: feedLoading, refetch } = useFeedbackFeed();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      type: (form.elements.namedItem("type") as HTMLSelectElement).value || "Other",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      refetch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="group/hero relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:px-6 sm:py-28 transition-all duration-500 hover:bg-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-30%,rgba(245,158,11,0.2),transparent_50%)] opacity-80 transition-opacity duration-500 group-hover/hero:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center transition-transform duration-300 group-hover/hero:scale-[1.01]">
          <p className="type-badge text-amber-400">Past client?</p>
          <h1 className="type-page-hero mt-4 text-white">
            Leave a review for <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">new clients</span>
          </h1>
          <p className="type-subtitle mt-6 mx-auto max-w-2xl text-slate-300">
            If you&apos;ve worked with us, your review helps new customers get to know SholaTech. It&apos;s shown on this site so others can see your experience.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:border-amber-200/60 sm:p-8">
                {submitted ? (
                  <div className="text-center py-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="font-semibold text-slate-900">Thank you!</p>
                    <p className="mt-1 text-sm text-slate-600">Your review is now visible to visitors. We&apos;ve received a copy too.</p>
                    <Link href="/" className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700">Back to home</Link>
                  </div>
                ) : (
                  <>
                    <h2 className="type-panel-title text-slate-900">Leave your review</h2>
                    <p className="mt-1 text-sm text-slate-500">For clients we&apos;ve worked with. Your review is shown to new visitors (name, project type & message).</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="feedback-name" className="block text-sm font-medium text-slate-700">Name *</label>
                        <input id="feedback-name" name="name" type="text" required className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="feedback-email" className="block text-sm font-medium text-slate-700">Email *</label>
                        <input id="feedback-email" name="email" type="email" required className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="you@example.com" />
                      </div>
                      <div>
                        <label htmlFor="feedback-type" className="block text-sm font-medium text-slate-700">What we helped you with</label>
                        <select id="feedback-type" name="type" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                          {projectTypes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-700">Message *</label>
                        <textarea id="feedback-message" name="message" required rows={4} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="Your experience working with us..." />
                      </div>
                      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                      <Button type="submit" className="w-full sm:w-auto sm:min-w-[160px] transition-transform duration-300 hover:scale-105 hover:shadow-lg" href={undefined} disabled={loading}>{loading ? "Sending..." : "Submit review"}</Button>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="type-section-title text-slate-900">What our clients say</h2>
                  <p className="type-subtitle mt-1 text-slate-600">Reviews from people we&apos;ve worked with — for new customers to read</p>
                </div>
                {feed.length > 0 && <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-800">{feed.length} {feed.length === 1 ? "review" : "reviews"}</span>}
              </div>
              {feedLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[1, 2, 3].map((i) => <div key={i} className="h-40 rounded-2xl bg-slate-200/60 animate-pulse" />)}
                </div>
              ) : (
                <FeedbackWall feed={feed} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
