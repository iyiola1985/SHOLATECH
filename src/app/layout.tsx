import type { Metadata } from "next";
import { Syne, Sora, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/config";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline} — Web, Design & E-commerce`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Professional digital agency offering website development, UI/UX design, e-commerce, event booking sites, and graphic design. Book your project today.",
  keywords: [
    "website development",
    "UI/UX design",
    "e-commerce",
    "graphic design",
    "DJ booking website",
    "digital agency",
  ],
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${sora.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
