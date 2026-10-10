"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";

export function ContactHero(): ReactNode {
  const t = useTranslations("Contact.morph");
  const th = useTranslations("Contact.hero");
  const words: MorphWord[] = [1, 2, 3].map((i) => ({
    word: t(`item${i}.word`),
    name: t(`item${i}.name`),
    line: t(`item${i}.line`),
  }));

  return (
    <>
      <h1 className="sr-only">{`${th("title")} ${th("subtitle")}`}</h1>
      <MorphHero
        prefix={t("prefix")}
        words={words}
        description={th("description")}
      />
    </>
  );
}
