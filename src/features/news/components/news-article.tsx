"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/components/ui/container";
import { getNewsPost } from "@/features/news/data/news";

export function NewsArticle({ slug }: { slug: string }): ReactNode {
  const t = useTranslations("News");

  const post = getNewsPost(slug);
  if (!post) return null;

  const body = t.raw(`posts.${slug}.body`) as string[];

  return (
    <article className="w-full bg-white dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-21/9 sm:aspect-3/1 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={t(`posts.${slug}.title`)}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
          {t("photoCredit")} · unsplash.com
        </div>
      </motion.div>

      <Container spacing="generous" className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-accent">
              {t(`posts.${slug}.category`)}
            </span>
            <span
              aria-hidden="true"
              className="text-xs text-neutral-500 dark:text-neutral-400"
            >
              ·
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {t(`posts.${slug}.date`)}
            </span>
            <span
              aria-hidden="true"
              className="text-xs text-neutral-500 dark:text-neutral-400"
            >
              ·
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {t(`posts.${slug}.readTime`)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-neutral-900 dark:text-white leading-tight mb-8">
            {t(`posts.${slug}.title`)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {body.map((paragraph, i) => (
            <p
              key={i}
              className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 mt-4 text-neutral-900 dark:text-white font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {t("backToNews")}
          </Link>
        </motion.div>
      </Container>
    </article>
  );
}
