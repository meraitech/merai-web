"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/shared/components/ui/link";
import { CloudCanvas } from "@/shared/components/cloud-canvas";
import { HeroTileGrid, SmokeWisps } from "./toolbox-grid";

export function Hero7() {
  const t = useTranslations("Home.hero");

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate m-4 flex min-h-[75dvh] flex-col overflow-hidden rounded-[1.5rem] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.14),0_40px_80px_-32px_rgba(0,0,0,0.18)] dark:shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)]"
    >
      <CloudCanvas className="bg-[#a7effe] dark:bg-[#0e1219]" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] border border-black/12 dark:border-white/12"
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-start px-4 pt-24 sm:items-center sm:px-6 sm:pt-28 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl text-left sm:text-center"
        >
          {t("line1")}
          <br />
          {t("line2")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
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
            className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="w-full max-w-[1100px] mx-auto mt-4 pb-16 flex-1 flex flex-col justify-center"
        >
          <HeroTileGrid />
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[230px] bg-gradient-to-t from-[#e3f3fa] via-[#e3f3fa]/60 to-transparent dark:from-[#0e1219] dark:via-[#0e1219]/60"
      />
      <SmokeWisps />
    </section>
  );
}
