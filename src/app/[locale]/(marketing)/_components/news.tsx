"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { newsPosts } from "@/features/news/data/news";
import { NewsCard } from "@/features/news/components/news-card";

const ease = [0.16, 1, 0.3, 1] as const;

export function News(): ReactNode {
  const t = useTranslations("News");

  return (
    <section className="relative w-full bg-white dark:bg-neutral-950">
      <Container spacing="generous">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            title={t("heading")}
            size="lg"
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <Link
              href="/news"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:text-accent transition-colors"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post, index) => (
            <NewsCard
              key={post.slug}
              slug={post.slug}
              image={post.image}
              category={t(`posts.${post.slug}.category`)}
              title={t(`posts.${post.slug}.title`)}
              date={t(`posts.${post.slug}.date`)}
              readTime={t(`posts.${post.slug}.readTime`)}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
