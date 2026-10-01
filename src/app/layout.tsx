import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavSpacer from "@/components/NavSpacer";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/data/config";

const helveticaLight = localFont({
  src: "../fonts/Helvetica-Light.ttf",
  variable: "--font-helvetica-light",
  weight: "300",
  display: "swap",
});

const helvetica = localFont({
  src: "../fonts/Helvetica.ttf",
  variable: "--font-helvetica",
  weight: "400",
  display: "swap",
});

const helveticaBold = localFont({
  src: "../fonts/Helvetica-Bold.ttf",
  variable: "--font-helvetica-bold",
  weight: "700",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
    <html
      lang="en"
      className={`${helveticaLight.variable} ${helvetica.variable} ${helveticaBold.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-base text-slate-800 antialiased">
        <GoogleAnalytics />
        <Navbar />
        <NavSpacer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
