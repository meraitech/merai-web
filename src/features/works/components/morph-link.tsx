"use client";

import { useCallback } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { captureFlip } from "@/features/works/data/flip-store";

interface MorphLinkProps {
  href: string;
  /** When set, captures the matching [data-flip-image] geometry for a GSAP morph. */
  flipSlug?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Client-side link for works routes. Captures the source thumbnail geometry
 * (when flipSlug is set) so the destination can morph it with GSAP.
 * Renders `data-morph-nav` so the splash cover stays out of the way.
 */
export function MorphLink({
  href,
  flipSlug,
  className,
  children,
}: MorphLinkProps) {
  const router = useRouter();

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (flipSlug) {
        const img = document.querySelector(
          `[data-flip-image="${flipSlug}"]`,
        );
        const title = document.querySelector(
          `[data-flip-title="${flipSlug}"]`,
        );
        if (img) captureFlip(flipSlug, img, title);
      }
      router.push(href);
    },
    [router, href, flipSlug],
  );

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      data-morph-nav=""
    >
      {children}
    </Link>
  );
}
