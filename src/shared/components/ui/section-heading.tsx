"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/shared/utils/cn";

const ease = [0.16, 1, 0.3, 1] as const;

type SectionHeadingProps = {
  /** First line of the heading. */
  title: ReactNode;
  /** Optional italic second line (reference style). */
  accent?: ReactNode;
  /** Optional eyebrow label rendered above the heading. */
  eyebrow?: ReactNode;
  /** Optional supporting copy rendered below the heading. */
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/**
 * Site-wide section heading — single source of truth for heading type.
 *
 * Reference: the "new standard" section — serif,
 * `text-3xl sm:text-4xl md:text-5xl`, italic accent line, `mb-16` rhythm.
 */
export function SectionHeading({
  title,
  accent,
  eyebrow,
  description,
  align = "center",
  className,
}: SectionHeadingProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className={cn(
        "flex flex-col mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs tracking-[0.2em] text-neutral-500 dark:text-neutral-500 uppercase mb-6">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-neutral-900 dark:text-white">
        {title}
        {accent ? (
          <>
            <br />
            <span className="italic">{accent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
