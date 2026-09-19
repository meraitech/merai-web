"use client";

import { useTranslations } from "next-intl";
import { Link as UiLink } from "@/shared/components/ui/link";
import { DotField } from "@/shared/components/dot-field";
import { ImageHelix } from "@/shared/components/image-helix";
import { Reveal } from "@/shared/components/reveal";
import { ArrowRight } from "lucide-react";
import { Container } from "@/shared/components/ui/container";

export default function CTA() {
  const t = useTranslations("CTA");

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden pt-[14rem] pb-24 sm:pt-64 sm:pb-32"
    >
      <DotField stageId="cta-copy" alpha={0.6} />
      <ImageHelix stageId="cta-heading" />
      <Container
        id="cta-copy"
        className="relative text-center"
      >
        <Reveal inView y={12} scale={0.96} duration={1}>
          <div id="cta-stage">
            <h2
              id="cta-heading"
              className="mx-auto max-w-4xl font-serif text-[clamp(2.75rem,5.6vw,4.75rem)] leading-[1.0] tracking-[-0.025em] text-balance text-neutral-900 dark:text-white"
            >
              {t("heading")}
            </h2>
          </div>
        </Reveal>
        <Reveal inView delay={0.1} y={12} scale={0.96} duration={1}>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t("description")}
          </p>
        </Reveal>
        <Reveal
          inView
          delay={0.18}
          y={12}
          scale={0.96}
          duration={1}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiLink
            href="/contact"
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-neutral-900 pr-4 pl-5 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_32px_-14px_rgba(0,0,0,0.45)] transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[0.98] dark:bg-white dark:text-neutral-900"
          >
            {t("button")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </UiLink>
          <UiLink
            href="/works"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-neutral-900/[0.06] px-5 text-[15px] font-medium text-neutral-900 transition-colors hover:bg-neutral-900/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-white/[0.1] dark:text-white dark:hover:bg-white/[0.14]"
          >
            {t("secondaryButton")}
          </UiLink>
        </Reveal>
      </Container>
    </section>
  );
}
