"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const ADMIN_KEY = "sholatech_admin_secret";

type Review = { id: string; name: string; type: string; message: string; createdAt: string };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default function AdminReviewsPage() {
  const [secret, setSecretState] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadSecret = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(ADMIN_KEY);
      if (stored) setSecretState(stored);
    }
  }, []);

  useEffect(() => {
    loadSecret();
  }, [loadSecret]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setReviews([]);
      setError("Failed to load reviews.");
    }
  }, []);

  useEffect(() => {
    if (secret) fetchReviews();
  }, [secret, fetchReviews]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    const s = inputSecret.trim();
    if (!s) return;
    sessionStorage.setItem(ADMIN_KEY, s);
    setSecretState(s);
    setInputSecret("");
  }

  function handleLock() {
    sessionStorage.removeItem(ADMIN_KEY);
    setSecretState("");
    setReviews([]);
  }

  async function handleDelete(id: string) {
    if (!secret) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete.");
        return;
      }
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError("Network error.");
    } finally {
      setDeletingId(null);
    }
  }

  if (!secret) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-xl font-bold text-slate-900">Admin: Client reviews</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your admin secret to manage reviews.</p>
          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-secret" className="block text-sm font-medium text-slate-700">Admin secret</label>
              <input id="admin-secret" type="password" value={inputSecret} onChange={(e) => setInputSecret(e.target.value)} placeholder="From ADMIN_SECRET in .env" className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" autoComplete="off" />
            </div>
            <button type="submit" className="w-full rounded-xl bg-amber-500 px-4 py-2.5 font-semibold text-white shadow hover:bg-amber-600">Unlock</button>
          </form>
          <p className="mt-6 text-center"><Link href="/" className="text-sm text-slate-500 hover:text-slate-700">Back to site</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Client reviews (admin)</h1>
            <p className="mt-1 text-sm text-slate-600">Delete reviews you don&apos;t want shown on the site.</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={fetchReviews} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
            <button type="button" onClick={handleLock} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Lock</button>
            <Link href="/" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Back to site</Link>
          </div>
        </div>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">{error}</p>}
        <div className="mt-8 space-y-4">
          {reviews.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{r.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{r.type}</p>
                    <p className="mt-2 text-slate-700">&ldquo;{r.message}&rdquo;</p>
                    <p className="mt-2 text-xs text-slate-400">{formatDate(r.createdAt)}</p>
                  </div>
                  <button type="button" onClick={() => handleDelete(r.id)} disabled={deletingId === r.id} className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50">
                    {deletingId === r.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
