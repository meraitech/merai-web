"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link } from "@/shared/components/ui/link";
import { createSea } from "./sea";

export function Hero7() {
  const t = useTranslations("Home.hero");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const phrase = phraseRef.current;
    if (!section || !stage || !phrase) return;
    const sea = createSea(section, stage, phrase);
    return () => sea?.destroy();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="relative isolate m-4 flex h-[80dvh] min-h-[700px] max-h-[900px] touch-pan-y flex-col overflow-hidden rounded-[1.5rem] bg-black shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.14),0_40px_80px_-32px_rgba(0,0,0,0.18)] dark:shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)]"
    >
      <div ref={stageRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] border border-white/12"
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 -translate-y-8 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.1] max-w-4xl"
        >
          {t("line1")}
          <br />
          <span ref={phraseRef}>{t("line2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <Link
            href="/contact"
            className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-neutral-100 hover:bg-white border border-neutral-200 rounded-full text-neutral-900 text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[230px] bg-gradient-to-t from-black via-black/60 to-transparent"
      />
    </section>
  );
}
