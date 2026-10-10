"use client";

import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";
import { newsPosts } from "@/features/news/data/news";
import { NewsCard } from "@/features/news/components/news-card";

export function NewsList(): ReactNode {
  const t = useTranslations("News");
  const words: MorphWord[] = [1, 2, 3].map((i) => ({
    word: t(`morph.item${i}.word`),
    name: t(`morph.item${i}.name`),
    line: t(`morph.item${i}.line`),
  }));

  return (
    <section className="w-full bg-white dark:bg-neutral-950">
      <h1 className="sr-only">{t("heading")}</h1>
      <MorphHero
        prefix={t("morph.prefix")}
        words={words}
        description={t("description")}
        className="pb-10 lg:pb-16"
      />
      <Container spacing="generous">
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
