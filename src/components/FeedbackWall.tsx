"use client";

import { useCallback, useEffect, useState } from "react";

export type FeedbackEntry = {
  id: string;
  name: string;
  type: string;
  message: string;
  createdAt: string;
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
  } catch {
    return "";
  }
}

function getInitials(name: string): string {
  return name.trim().split(/\s+/).map((s) => s[0]).join("").toUpperCase().slice(0, 2) || "?";
}

function typeColor(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("website")) return "bg-blue-500/15 text-blue-700 border-blue-200";
  if (t.includes("ui") || t.includes("ux")) return "bg-violet-500/15 text-violet-700 border-violet-200";
  if (t.includes("e-commerce") || t.includes("ecommerce")) return "bg-emerald-500/15 text-emerald-700 border-emerald-200";
  if (t.includes("event") || t.includes("dj")) return "bg-amber-500/15 text-amber-700 border-amber-200";
  if (t.includes("graphic")) return "bg-rose-500/15 text-rose-700 border-rose-200";
  return "bg-slate-500/10 text-slate-600 border-slate-200";
}

export default function FeedbackWall({ feed, compact = false, variant = "light" }: { feed: FeedbackEntry[]; compact?: boolean; variant?: "light" | "dark" }) {
  if (!feed.length) {
    return <p className={`text-center py-8 ${variant === "dark" ? "text-slate-400" : "text-slate-500"}`}>No client reviews yet.</p>;
  }
  const cardClass = variant === "dark"
    ? "group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/80 p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-amber-500/30 hover:-translate-y-0.5"
    : "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-200/80 hover:-translate-y-0.5";
  return (
    <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"} items-stretch`}>
      {feed.map((item) => (
        <article key={item.id} className={cardClass}>
          <div className="absolute right-3 top-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg className="h-8 w-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          </div>
          <p className={`leading-relaxed pr-10 min-h-[3rem] ${variant === "dark" ? "text-slate-200" : "text-slate-700"}`}>&ldquo;{item.message}&rdquo;</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white shadow">{getInitials(item.name)}</div>
            <div className="min-w-0 flex-1">
              <cite className={`font-semibold not-italic block truncate ${variant === "dark" ? "text-white" : "text-slate-900"}`}>{item.name}</cite>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${typeColor(item.type)}`}>{item.type}</span>
                <span className={`text-xs ${variant === "dark" ? "text-slate-500" : "text-slate-400"}`}>{formatDate(item.createdAt)}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function useFeedbackFeed(apiPath = "/api/feedback") {
  const [feed, setFeed] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    setLoading(true);
    fetch(apiPath).then((r) => r.json()).then((data) => setFeed(Array.isArray(data) ? data : [])).catch(() => setFeed([])).finally(() => setLoading(false));
  }, [apiPath]);

  useEffect(() => {
    let cancelled = false;
    fetch(apiPath).then((r) => r.json()).then((data) => { if (!cancelled && Array.isArray(data)) setFeed(data); }).catch(() => { if (!cancelled) setFeed([]); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [apiPath]);

  return { feed, loading, refetch };
}
