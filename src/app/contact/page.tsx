"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { siteConfig } from "@/data/config";

export default function ContactPage() {
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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };
    try {
      const res = await fetch("/api/contact", {
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
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center sm:gap-6">
          <h1 className="type-page-hero text-white">Contact Us</h1>
          <p className="type-page-lead text-white/90">
            Have a question or want to chat? We&apos;ll get back to you soon.
          </p>
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="surface-panel p-8 sm:p-10">
              <h2 className="type-panel-title text-white">Get in touch</h2>
              <p className="type-subtitle mt-3 text-white/90">
                Email or call us for a quick response. You can also send a message using the form.
              </p>
              <ul className="mt-8 space-y-5">
                <li>
                  <span className="type-badge text-amber-400">Email</span>
                  <a href={`mailto:${siteConfig.email}`} className="mt-1.5 block text-lg font-medium text-white transition hover:text-amber-400">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <span className="type-badge text-amber-400">Phone</span>
                  <a href={`tel:${siteConfig.phoneTel}`} className="mt-1.5 block text-lg font-medium text-white transition hover:text-amber-400">
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
              {siteConfig.whatsapp && (
                <div className="mt-8">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display inline-flex items-center gap-4 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#25D366]/25 ring-2 ring-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#25D366]/30 hover:ring-white/30 hover:bg-[#20BD5A] sm:text-base"
                    aria-label="Chat on WhatsApp"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="surface-panel p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="type-panel-title text-white">Message sent</p>
                  <p className="type-subtitle mt-3 text-white/85">We&apos;ll reply as soon as we can.</p>
                  <Link href="/" className="mt-6 inline-block text-base font-medium text-amber-600 hover:text-amber-700 transition">
                    Back to home
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="type-panel-title text-white">Send a message</h2>
                  <p className="type-subtitle mt-2 text-white/85">We&apos;ll get back to you shortly.</p>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-white/90">Name *</label>
                        <input id="contact-name" name="name" type="text" required className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-white/90">Email *</label>
                        <input id="contact-email" name="email" type="email" required className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-white/90">Message *</label>
                      <textarea id="contact-message" name="message" required rows={5} className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder="Your message..." />
                    </div>
                    {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                    <Button type="submit" className="w-full sm:w-auto sm:min-w-[160px] transition-transform duration-300 hover:scale-105 hover:shadow-lg" href={undefined} disabled={loading}>
                      {loading ? "Sending..." : "Send message"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
