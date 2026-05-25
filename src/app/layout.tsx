import type { Metadata } from "next";
import { Barlow, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/data/config";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
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
    <html lang="en" className={`${barlow.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-white font-sans text-base text-slate-800 antialiased">
        <GoogleAnalytics />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
