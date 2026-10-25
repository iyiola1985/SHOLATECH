import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/data/config";

type PortfolioItem = (typeof portfolioItems)[number];

function FeaturedCard({
  item,
  priority = false,
}: {
  item: PortfolioItem;
  priority?: boolean;
}) {
  const imagePosition =
    "imagePosition" in item && item.imagePosition
      ? item.imagePosition
      : "object-center";
  const video = "video" in item && item.video ? item.video : null;
  const detail =
    "longDescription" in item && item.longDescription
      ? item.longDescription
      : item.description;

  return (
    <a
      href={item.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-card group mb-10 block"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden bg-slate-950 lg:min-h-[320px]">
          {video ? (
            <video
              className="absolute inset-0 h-full w-full object-contain"
              src={video}
              poster={item.image}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden
            />
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={`object-cover transition duration-500 group-hover:scale-[1.03] ${imagePosition}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
              priority={priority}
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <span className="type-badge text-amber-400">{item.category}</span>
          <h2 className="type-section-title mt-3 text-white transition group-hover:text-amber-400">
            {item.title}
          </h2>
          <p className="type-subtitle mt-4 text-white/90">{detail}</p>
          <span className="type-perk mt-6 inline-flex items-center gap-2 text-amber-400">
            Visit site
            <svg
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function PortfolioPage() {
  const featured = portfolioItems
    .filter((item) => "featured" in item && item.featured)
    .sort(
      (a, b) =>
        (("featuredOrder" in a && a.featuredOrder) || 99) -
        (("featuredOrder" in b && b.featuredOrder) || 99)
    );
  const rest = portfolioItems.filter(
    (item) => !("featured" in item && item.featured)
  );

  return (
    <div className="surface-page">
      <section className="surface-hero">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-page-hero text-white">Our Work</h1>
          <p className="type-subtitle mt-4 text-white/90">
            A selection of projects we&apos;ve built — websites, e-commerce, and digital experiences.
          </p>
        </div>
      </section>

      <section className="surface-section pt-0">
        <div className="mx-auto max-w-6xl">
          {featured.map((item, index) => (
            <FeaturedCard
              key={item.id}
              item={item}
              priority={index === 0}
            />
          ))}

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => {
              const href =
                "demoUrl" in item && item.demoUrl ? item.demoUrl : "#";
              const isExternal = href.startsWith("http");
              const image = "image" in item ? item.image : null;
              const imagePosition =
                "imagePosition" in item && item.imagePosition
                  ? item.imagePosition
                  : "object-center";
              const cardInner = (
                <>
                  <div className="relative aspect-video overflow-hidden bg-slate-800/60">
                    {image ? (
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        className={`object-cover transition duration-300 group-hover:scale-105 ${imagePosition}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-4xl font-display font-bold text-amber-400/80">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="type-badge text-amber-400">
                      {item.category}
                    </span>
                    <h2 className="type-card-title mt-1.5 text-white transition group-hover:text-amber-400">
                      {item.title}
                    </h2>
                    <p className="type-subtitle mt-2 line-clamp-2 text-white/90">
                      {item.description}
                    </p>
                    {isExternal && (
                      <span className="type-perk mt-3 inline-flex items-center gap-1.5 text-amber-400">
                        Visit site
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </>
              );

              return isExternal ? (
                <a
                  key={item.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card group"
                >
                  {cardInner}
                </a>
              ) : (
                <div key={item.id} className="surface-card group">
                  {cardInner}
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="font-display inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-amber-600 hover:scale-105"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
