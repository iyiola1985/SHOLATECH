import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const paths = [
    "",
    "/services",
    "/portfolio",
    "/team",
    "/careers",
    "/booking",
    "/contact",
    "/feedback",
  ];

  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "/feedback" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/feedback" ? 0.9 : 0.7,
  }));
}
