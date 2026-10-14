"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type ReactNode } from "react";
import { MorphHero, type MorphWord } from "@/shared/components/morph-words/morph-words";
import { ServiceSubList } from "@/shared/components/ui/service-sub-list";
import {
  ServiceDrawer,
  resolveDrawerContent,
  type ServiceDrawerFallback,
  type ServiceDrawerLabels,
} from "@/shared/components/ui/service-drawer";

export function ServicesHero(): ReactNode {
  const t = useTranslations("Services.morph");
  const th = useTranslations("Services.hero");
  const ti = useTranslations("Services.industries");
  const td = useTranslations("Services.drawer");
  const words: MorphWord[] = [1, 2, 3, 4].map((i) => ({
    word: t(`item${i}.word`),
    name: t(`item${i}.name`),
    line: t(`item${i}.line`),
  }));
  const items = (from: number, to: number): string[] =>
    Array.from({ length: to - from + 1 }, (_, k) => ti(`item${from + k}`));
  const names = items(1, 12);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  let drawers: unknown[] = [];
  try {
    const raw = ti.raw("drawers") as unknown;
    if (Array.isArray(raw)) drawers = raw;
  } catch {
    drawers = [];
  }
  const labels = {
    proposal: td("proposal"),
    coversLabel: td("coversLabel"),
    receiveLabel: td("receiveLabel"),
    changesLabel: td("changesLabel"),
    closeLabel: td("closeLabel"),
    ctaTitle: td("ctaTitle", {
      title: openIndex !== null ? (names[openIndex] ?? "") : "",
    }),
    ctaButton: td("ctaButton"),
  } satisfies ServiceDrawerLabels;
  const fallback = {
    intro: td("fallbackIntro"),
    covers: td("fallbackCovers"),
    receive: td.raw("fallbackReceive") as string[],
    changes: td.raw("fallbackChanges") as string[],
  } satisfies ServiceDrawerFallback;

  const onSelect = (_label: string, index: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setOpenIndex(index);
  };

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
          <ServiceSubList items={items(1, 4)} startIndex={0} onSelect={onSelect} />
          <ServiceSubList items={items(5, 8)} startIndex={4} onSelect={onSelect} />
          <ServiceSubList items={items(9, 12)} startIndex={8} onSelect={onSelect} />
        </div>
      </MorphHero>
      <ServiceDrawer
        open={openIndex !== null}
        title={openIndex !== null ? (names[openIndex] ?? "") : ""}
        content={resolveDrawerContent(
          openIndex !== null ? drawers[openIndex] : undefined,
          fallback,
        )}
        labels={labels}
        onClose={() => setOpenIndex(null)}
        triggerRef={triggerRef}
      />
    </div>
  );
}
