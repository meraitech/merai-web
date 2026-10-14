"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Link as UiLink } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { ServiceCard } from "@/shared/components/ui/service-card";
import { ServiceSubList } from "@/shared/components/ui/service-sub-list";
import {
  ServiceDrawer,
  resolveDrawerContent,
  type ServiceDrawerFallback,
  type ServiceDrawerLabels,
} from "@/shared/components/ui/service-drawer";

const CARDS = [
  {
    image:
      "https://images.unsplash.com/photo-1574359587026-daf1bfd26baa?q=80&w=1740&auto=format&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574359587020-2da6e41b9565?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1561501459-64d9dbdb0e11?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// 1:1 copy of the landing services section (reads the same Home.services
// copy) so the standalone page never drifts from the homepage.
export function ServicesDetail(): ReactNode {
  const t = useTranslations("Home.services");
  const td = useTranslations("Services.drawer");

  const [openSel, setOpenSel] = useState<{ s: number; i: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const getItems = (index: number): string[] => {
    try {
      const items = t.raw(`service${index + 1}.items`) as unknown;
      return Array.isArray(items)
        ? items.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  };

  const columns = CARDS.map((card, i) => ({ card, index: i }));

  let runningTotal = 0;
  const columnsWithOffset = columns.map((col) => {
    const items = getItems(col.index);
    const startIndex = runningTotal;
    runningTotal += items.length;
    return { ...col, items, startIndex };
  });

  const labels = {
    proposal: td("proposal"),
    coversLabel: td("coversLabel"),
    receiveLabel: td("receiveLabel"),
    changesLabel: td("changesLabel"),
    closeLabel: td("closeLabel"),
  } satisfies ServiceDrawerLabels;
  const fallback = {
    intro: td("fallbackIntro"),
    covers: td("fallbackCovers"),
    receive: td.raw("fallbackReceive") as string[],
    changes: td.raw("fallbackChanges") as string[],
  } satisfies ServiceDrawerFallback;

  const getDrawers = (serviceIndex: number): unknown[] => {
    try {
      const raw = t.raw(`service${serviceIndex + 1}.drawers`) as unknown;
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  };

  const onSelect =
    (serviceIndex: number) =>
    (_label: string, globalIndex: number, el: HTMLButtonElement) => {
      // ServiceSubList passes a running global index; convert back to the
      // item index within this service column.
      const col = columnsWithOffset[serviceIndex];
      const itemIndex = col ? globalIndex - col.startIndex : globalIndex;
      triggerRef.current = el;
      setOpenSel({ s: serviceIndex, i: itemIndex });
    };

  const openTitle =
    openSel !== null
      ? ((getItems(openSel.s)[openSel.i] as string | undefined) ?? "")
      : "";
  const openContent = resolveDrawerContent(
    openSel !== null ? getDrawers(openSel.s)[openSel.i] : undefined,
    fallback,
  );

  return (
    <section className="w-full">
      <Container spacing="generous">
        <SectionHeading
          title={t("headingLine1")}
          accent={t("headingLine2")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {columnsWithOffset.map(({ card, index: i, items, startIndex }) => (
            <div key={t(`service${i + 1}.title`)}>
              <ServiceCard
                title={t(`service${i + 1}.title`)}
                imageSrc={card.image}
                imageAlt={t(`service${i + 1}.imageAlt`)}
                index={i}
              />
              <ServiceSubList
                items={items}
                startIndex={startIndex}
                onSelect={onSelect(i)}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 sm:flex-row items-start sm:justify-between">
          <p className="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
          <UiLink
            href="/contact"
            className="group flex shrink-0 items-center leading-0 gap-2 text-lg font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            {t("linkLabel")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </UiLink>
        </div>
      </Container>
      <ServiceDrawer
        open={openSel !== null}
        title={openTitle}
        content={openContent}
        labels={labels}
        onClose={() => setOpenSel(null)}
        triggerRef={triggerRef}
      />
    </section>
  );
}
