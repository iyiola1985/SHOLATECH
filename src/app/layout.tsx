import type { Metadata } from "next";
import { DM_Sans, Outfit, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-white font-sans text-slate-800 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
