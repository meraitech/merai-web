"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AsciiEffect } from "./ascii-effect";

interface AsciiImageProps {
  imageSrc: string;
  alt: string;
  className?: string;
  /** Render the photo as static ASCII art (draws once — no animation loop). */
  variant?: "image" | "flow" | "glitch";
  /** Glyph gradient ramp (defaults to the effect's neutral ramp). */
  colors?: string[];
  /** Defer image load + sampling until near the viewport (below-fold use). */
  lazy?: boolean;
}

// Shared ASCII media primitive: static ASCII rendering with a plain-photo
// fallback if the image fails to load or canvas sampling is blocked.
// The parent must provide size (the effect fills 100% x 100%).
export function AsciiImage({
  imageSrc,
  alt,
  className,
  variant = "image",
  colors,
  lazy = false,
}: AsciiImageProps): ReactNode {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(!lazy);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!lazy) return;
    const host = hostRef.current;
    if (!host) return;
    const armer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setReady(true);
          armer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    armer.observe(host);
    return () => armer.disconnect();
  }, [lazy]);

  return (
    <div ref={hostRef} className={`relative h-full w-full ${className ?? ""}`}>
      {failed ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : ready ? (
        <AsciiEffect
          imageSrc={imageSrc}
          alt={alt}
          variant={variant}
          colors={colors}
          onImageError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
