"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { MorphLink } from "@/features/works/components/morph-link";
import { works } from "@/features/works/data/works";

// All projects, repeated for a seamless -50% marquee loop
// (two identical halves of 2x works each).
const loop = [...works, ...works, ...works, ...works];

export default function Showcase5() {
  const th = useTranslations("Home.works");
  const headingParts = th("heading").split("\n");

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <Container spacing="none" className="relative flex flex-col items-center text-center pt-24 sm:pt-32">
        <SectionHeading
          title={headingParts[0]}
          accent={headingParts[1]}
          className="mb-8"
        />
      </Container>

      <div className="relative w-full mt-14 sm:mt-16 mb-16 sm:mb-24 overflow-hidden py-6">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className="flex items-center w-max will-change-transform"
        >
          {loop.map((w, i) => (
            <div key={`${w.slug}-${i}`} className="flex items-center shrink-0">
              <MorphLink
                href={`/works/${w.slug}`}
                flipSlug={w.slug}
                className="relative z-10 h-[260px] sm:h-[320px] aspect-16/10 rounded-xl p-2 bg-white dark:bg-neutral-900 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)] border border-neutral-200 dark:border-neutral-800"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    loading="lazy"
                    data-flip-image={w.slug}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </MorphLink>
              <div className="relative z-0 flex items-center w-16 sm:w-24 shrink-0">
                <span className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
                <span className="flex-1 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700" />
                <span className="absolute right-0 translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
