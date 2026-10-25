import { siteConfig } from "@/data/config";

type ReviewForSchema = {
  name: string;
  message: string;
  type: string;
  createdAt: string;
  rating?: number;
};

/** Organization + WebSite — helps Google understand the brand (not self-star snippets). */
export function SiteJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  if (siteConfig.googleBusinessUrl) sameAs.push(siteConfig.googleBusinessUrl);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        email: siteConfig.email,
        telephone: `+${siteConfig.phoneTel}`,
        sameAs,
        description:
          "SholaTech builds websites, UI/UX design, social media management, e-commerce, and digital products.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Review content markup for the feedback page.
 * Note: Google does not show star rich results for a business’s own site reviews
 * about itself — Google Business Profile reviews power Search/Maps stars.
 * This still helps crawlers index real client feedback as page content.
 */
export function ReviewsJsonLd({
  reviews,
}: {
  reviews: ReviewForSchema[];
}) {
  if (!reviews.length) return null;

  const withRating = reviews.filter(
    (r) => typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} client reviews`,
    url: `${siteConfig.url}/feedback`,
    numberOfItems: reviews.length,
    itemListElement: reviews.slice(0, 20).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: r.createdAt,
        reviewBody: r.message,
        name: `${r.type} review`,
        itemReviewed: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        ...(typeof r.rating === "number"
          ? {
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
      },
    })),
    ...(withRating.length > 0
      ? {
          description: `Average of ${withRating.length} rated reviews on ${siteConfig.name}.`,
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
