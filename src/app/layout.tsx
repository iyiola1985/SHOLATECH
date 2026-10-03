import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavSpacer from "@/components/NavSpacer";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollScrubBackground from "@/components/ScrollScrubBackground";
import { siteConfig } from "@/data/config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline} — Web, Design & Social`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "SholaTech builds websites, UI/UX design, social media management, e-commerce, and digital products. Book a project or join our team.",
  keywords: [
    "website development",
    "UI/UX design",
    "social media management",
    "e-commerce",
    "graphic design",
    "DJ booking website",
    "tech startup",
    "SholaTech careers",
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
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-slate-900 font-sans text-base text-white antialiased">
        <GoogleAnalytics />
        <ScrollScrubBackground />
        <Navbar />
        <NavSpacer />
        <main className="relative z-10 min-h-screen bg-transparent text-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
