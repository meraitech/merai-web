"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { works } from "@/features/works/data/works";
import { Container } from "@/shared/components/ui/container";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";

export default function Showcase4() {
  const t = useTranslations("Works");
  const tm = useTranslations("Works.morph");
  const words: MorphWord[] = [1, 2, 3].map((i) => ({
    word: tm(`item${i}.word`),
    name: tm(`item${i}.name`),
    line: tm(`item${i}.line`),
  }));

  return (
    <section className="w-full min-h-screen bg-white dark:bg-neutral-950">
      <h1 className="sr-only">{`${t("heading")} — ${t("subheading")}`}</h1>
      <MorphHero
        prefix={tm("prefix")}
        words={words}
        description={t("subheading")}
        className="pb-10 lg:pb-16"
      />
      <Container spacing="generous">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {works.map((p) => (
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
                  className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg hover:-translate-y-1 transition-[border-color,box-shadow,transform]"
                >
                  <div className="relative h-56 sm:h-64 bg-white dark:bg-neutral-950 overflow-hidden">
                    <motion.img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="text-lg font-medium font-serif text-neutral-900 dark:text-white truncate">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {p.client} · {p.year}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      {t("viewCaseStudy")}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
