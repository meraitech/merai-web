"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link as UiLink } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { ServiceCard } from "./service-card";

const CARDS = [
  {
    image:
      // "https://images.unsplash.com/photo-1672478384289-af60579cadd6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

export default function Features6() {
  const t = useTranslations("Home.services");

  return (
    <section className="w-full scroll-mt-20" id="services">
      <Container spacing="generous">
        <SectionHeading
          title={t("headingLine1")}
          accent={t("headingLine2")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <ServiceCard
              key={t(`service${i + 1}.title`)}
              title={t(`service${i + 1}.title`)}
              imageSrc={card.image}
              imageAlt={t(`service${i + 1}.imageAlt`)}
              index={i}
            />
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
    </section>
  );
}
