"use client";

import Link from "next/link";
import FeedbackWall, { useFeedbackFeed } from "@/components/FeedbackWall";
import Button from "@/components/Button";

export default function LiveFeedbackSection() {
  const { feed, loading } = useFeedbackFeed();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">From people we&apos;ve worked with</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">What our clients say</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Reviews from past clients — so you can see what it&apos;s like to work with us before you get in touch.</p>
        </div>
        <div className="mt-12">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />)}
            </div>
          ) : feed.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
              <p className="text-slate-400">No client reviews yet. Check back soon.</p>
              <p className="mt-2 text-sm text-slate-500">Past client? You can leave a review on our Add review page.</p>
              <Button href="/feedback" className="mt-4">Add review</Button>
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
                <FeedbackWall feed={feed.slice(0, 6)} compact variant="dark" />
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-400 mb-2">Past client? Leave your review.</p>
                <Link href="/feedback" className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20">
                  Leave a review
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
