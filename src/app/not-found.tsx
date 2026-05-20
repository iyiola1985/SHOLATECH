import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="type-page-hero text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">This page could not be found.</p>
      <Link
        href="/"
        className="font-display mt-6 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-amber-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
