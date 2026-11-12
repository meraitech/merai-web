import type { Metadata } from "next";
import { routing } from "./routing";

// Production origin — also referenced by public/robots.txt.
export const SITE_URL = "https://merai.id";

// 1200x630 JPEG for social scrapers (WhatsApp/Twitter/X don't reliably fetch webp).
export const SEO_IMAGE = `${SITE_URL}/__merai__/seo-image.jpg`;
export const SEO_IMAGE_ALT = "Merai — Software, engineered to grow your business.";

interface PageMetadataInput {
  locale: string;
  /** Locale-less path, e.g. "/about" or "" for the homepage. */
  path: string;
  title: string;
  description: string;
}

/** Per-page title, description, canonical + hreflang alternates, and OpenGraph. */
export function pageMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const canonical = `/${locale}${path}`;
  const fullTitle = `${title} | Merai`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}${path}`])),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "Merai",
      type: "website",
      images: [{ url: SEO_IMAGE, width: 1200, height: 630, alt: SEO_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SEO_IMAGE],
    },
  };
}
