"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { works } from "@/features/works/data/works";

const filters = ["All", "Identity", "Campaign", "Product"] as const;

export default function Showcase4() {
  const t = useTranslations("Works");
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible =
    active === "All"
      ? works
      : works.filter((p) => p.tags.includes(active));

  return (
    <section className="w-full min-h-screen flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 mb-10 sm:mb-14"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500 font-medium">
            {t("heading")}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-neutral-900 dark:text-white max-w-3xl">
            {t("subheading")}
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500 font-medium shrink-0">
            {t("filterLabel")}
          </span>
          <div className="relative flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`relative isolate px-4 py-1.5 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-colors cursor-pointer ${
                  active === f
                    ? "text-white dark:text-neutral-900"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900"
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="showcase4-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-white -z-10"
                  />
                )}
                {f === "All" ? t("all") : t(`categories.${f}`)}
              </button>
            ))}
          </div>
          <span className="text-xs tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-500 sm:ml-auto">
            {t("projectsCount", { count: visible.length })}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 0.8,
                  },
                  opacity: { duration: 0.25, ease: "easeOut" },
                }}
                whileHover="hover"
              >
                <Link
                  href={`/works/${p.slug}`}
                  className="flex flex-col gap-4 group"
                >
                  <div className="relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <motion.img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.div
                      variants={{ hover: { opacity: 1, y: 0 } }}
                      initial={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white text-neutral-900 grid place-items-center shadow-md"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase text-neutral-900 dark:text-white font-medium"
                        >
                          {t(`categories.${tag}`) as string}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white truncate">
                        {p.title}
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-500">
                        {p.client}
                      </span>
                    </div>
                    <span className="text-xs tracking-[0.15em] text-neutral-400 dark:text-neutral-600 shrink-0">
                      {p.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
