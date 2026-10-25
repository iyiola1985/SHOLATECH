import type { Metadata } from "next";
import FeedbackPageClient from "@/components/FeedbackPageClient";
import { ReviewsJsonLd } from "@/components/JsonLd";
import { getAllFeedback } from "@/lib/feedback-store";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Client reviews",
  description: `Read client reviews of ${siteConfig.name} and leave your own if we've worked together. Real feedback from website, design, and digital projects.`,
  alternates: { canonical: "/feedback" },
  openGraph: {
    title: `Client reviews | ${siteConfig.name}`,
    description: `What clients say about working with ${siteConfig.name}.`,
    url: `${siteConfig.url}/feedback`,
  },
};

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const reviews = await getAllFeedback();

  return (
    <>
      <ReviewsJsonLd reviews={reviews} />
      <FeedbackPageClient initialFeed={reviews} />
    </>
  );
}
