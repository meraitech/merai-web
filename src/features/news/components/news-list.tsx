"use client";

import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { newsPosts } from "@/features/news/data/news";
import { NewsCard } from "@/features/news/components/news-card";

export function NewsList(): ReactNode {
  const t = useTranslations("News");

  return (
    <section className="w-full bg-white dark:bg-neutral-950">
      <Container spacing="generous">
        <SectionHeading
          align="left"
          title={t("heading")}
          size="lg"
        />
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
