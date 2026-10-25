"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import FeedbackWall, {
  StarRating,
  useFeedbackFeed,
  type FeedbackEntry,
} from "@/components/FeedbackWall";
import GoogleReviewCta from "@/components/GoogleReviewCta";
import { siteConfig } from "@/data/config";

const projectTypes = [
  "Website development",
  "UI/UX design",
  "E-commerce",
  "Event & DJ booking",
  "Graphic design",
  "Other",
];

export default function FeedbackPageClient({
  initialFeed,
}: {
  initialFeed: FeedbackEntry[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const { feed, loading: feedLoading, refetch } = useFeedbackFeed(
    "/api/feedback",
    initialFeed
  );

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
      rating,
    };
    try {
      const res = await fetch("/api/feedback", {
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
      refetch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const hasGoogle =
    Boolean(siteConfig.googleReviewUrl) || Boolean(siteConfig.googleBusinessUrl);

  return (
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto max-w-4xl text-center">
          <p className="type-badge text-amber-400">Past client?</p>
          <h1 className="type-page-hero mt-4 text-white">
            Leave a review for <span className="text-amber-400">new clients</span>
          </h1>
          <p className="type-subtitle mt-6 mx-auto max-w-2xl text-white/90">
            If you&apos;ve worked with us, your review helps new customers get to
            know SholaTech. It&apos;s shown on this site so others can see your
            experience
            {hasGoogle ? " — and you can also leave a review on Google for Search & Maps." : "."}
          </p>
          {hasGoogle && (
            <div className="mt-6">
              <GoogleReviewCta />
            </div>
          )}
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="surface-panel sticky top-8 p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-4">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-semibold text-white">Thank you!</p>
                    <p className="mt-1 text-sm text-white/85">
                      Your review is now visible to visitors. We&apos;ve received a copy too.
                    </p>
                    {hasGoogle && (
                      <div className="mt-5 space-y-2">
                        <p className="text-sm text-white/80">
                          Want it to show in Google Search too? Leave the same review on Google.
                        </p>
                        <GoogleReviewCta />
                      </div>
                    )}
                    <Link
                      href="/"
                      className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Back to home
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="type-panel-title text-white">Leave your review</h2>
                    <p className="mt-1 text-sm text-white/70">
                      For clients we&apos;ve worked with. Your review is shown to new
                      visitors (name, rating, project type & message).
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="feedback-name" className="block text-sm font-medium text-white/90">
                          Name *
                        </label>
                        <input
                          id="feedback-name"
                          name="name"
                          type="text"
                          required
                          className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="feedback-email" className="block text-sm font-medium text-white/90">
                          Email *
                        </label>
                        <input
                          id="feedback-email"
                          name="email"
                          type="email"
                          required
                          className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-white/90">Rating *</span>
                        <div className="mt-2 flex flex-wrap items-center gap-1" role="group" aria-label="Star rating">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setRating(n)}
                              className={`rounded-lg p-1.5 transition ${
                                n <= rating
                                  ? "text-amber-400"
                                  : "text-white/30 hover:text-amber-400/70"
                              }`}
                              aria-label={`${n} star${n === 1 ? "" : "s"}`}
                              aria-pressed={n === rating}
                            >
                              <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-white/70">
                            <StarRating value={rating} className="sr-only" />
                            {rating}/5
                          </span>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="feedback-type" className="block text-sm font-medium text-white/90">
                          What we helped you with
                        </label>
                        <select
                          id="feedback-type"
                          name="type"
                          className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        >
                          {projectTypes.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="feedback-message" className="block text-sm font-medium text-white/90">
                          Message *
                        </label>
                        <textarea
                          id="feedback-message"
                          name="message"
                          required
                          rows={4}
                          className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          placeholder="Your experience working with us..."
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-600" role="alert">
                          {error}
                        </p>
                      )}
                      <Button
                        type="submit"
                        className="w-full sm:w-auto sm:min-w-[160px] transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        href={undefined}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Submit review"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h2 className="type-section-title text-white">What our clients say</h2>
                  <p className="type-subtitle mt-1 text-white/90">
                    Reviews from people we&apos;ve worked with — for new customers to read
                  </p>
                </div>
                {feed.length > 0 && (
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
                    {feed.length} {feed.length === 1 ? "review" : "reviews"}
                  </span>
                )}
              </div>
              {feedLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/10" />
                  ))}
                </div>
              ) : (
                <FeedbackWall feed={feed} variant="dark" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
