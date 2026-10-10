"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";
import { ServiceSubList } from "@/shared/components/ui/service-sub-list";

export function ServicesHero(): ReactNode {
  const t = useTranslations("Services.morph");
  const th = useTranslations("Services.hero");
  const ti = useTranslations("Services.industries");
  const words: MorphWord[] = [1, 2, 3, 4].map((i) => ({
    word: t(`item${i}.word`),
    name: t(`item${i}.name`),
    line: t(`item${i}.line`),
  }));
  const items = (from: number, to: number): string[] =>
    Array.from({ length: to - from + 1 }, (_, k) => ti(`item${from + k}`));

  return (
    <div className="w-full bg-white dark:bg-neutral-950">
      <h1 className="sr-only">{`${th("line1")} ${th("line2")}`}</h1>
      <MorphHero
        prefix={t("prefix")}
        words={words}
        description={th("description")}
      >
        <p className="mb-8 text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">
          {ti("label")}
        </p>
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceSubList items={items(1, 4)} startIndex={0} />
          <ServiceSubList items={items(5, 8)} startIndex={4} />
          <ServiceSubList items={items(9, 12)} startIndex={8} />
        </div>
      </MorphHero>
    </div>
  );
}
