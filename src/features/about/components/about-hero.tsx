"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";

export function AboutHero(): ReactNode {
  const t = useTranslations("About.morph");
  const th = useTranslations("About.hero");
  const words: MorphWord[] = [1, 2, 3, 4].map((i) => ({
    word: t(`item${i}.word`),
    name: t(`item${i}.name`),
    line: t(`item${i}.line`),
  }));

  return (
    <>
      <h1 className="sr-only">{`${th("line1")} ${th("line2")}`}</h1>
      <MorphHero
        prefix={t("prefix")}
        words={words}
        description={t("description")}
      />
    </>
  );
}
