import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/features/news/data/news";
import { getWorkSlugs } from "@/features/works/data/works";
import { SITE_URL } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = ["", "/about", "/services", "/works", "/contact", "/news"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const slug of getNewsSlugs()) {
      entries.push({
        url: `${SITE_URL}/${locale}/news/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const slug of getWorkSlugs()) {
      entries.push({
        url: `${SITE_URL}/${locale}/works/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
