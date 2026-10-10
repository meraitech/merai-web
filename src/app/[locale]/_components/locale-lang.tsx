"use client";

import { useEffect } from "react";

/**
 * The root layout can't read the [locale] segment (params don't flow up to
 * it), so SSR always emits lang="en". This corrects it post-hydration —
 * Googlebot executes JS and indexes the corrected value.
 */
export function LocaleLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
