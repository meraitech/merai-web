import type { Metadata } from "next";
import { routing } from "./routing";

// Production origin — also referenced by public/robots.txt.
export const SITE_URL = "https://merai.tech";

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
    title: fullTitle,
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
    },
  };
}
