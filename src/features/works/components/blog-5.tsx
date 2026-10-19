"use client";

import { useTranslations } from "next-intl";
import { MorphLink } from "@/features/works/components/morph-link";
import { useFlipTarget } from "@/features/works/components/use-flip-target";
import type { Work } from "@/features/works/data/works";
import { StackBadges } from "@/features/works/components/stack-badges";
import { Container } from "@/shared/components/ui/container";

interface Props {
  work: Work;
}

const sectionIds = [
  "brief",
  "gallery",
  "problem",
  "solution",
  "summary",
] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-3">
      {children}
    </h2>
  );
}

export function Blog5({ work }: Props) {
  const t = useTranslations("WorkDetail");
  const { imgRef: heroRef, titleRef } = useFlipTarget(work.slug);
  const hasLong = Boolean(
    work.overview || work.challenge || work.solution || work.summary,
  );

  return (
    <article className="w-full bg-white dark:bg-neutral-950">
      <Container className="py-8 sm:py-12">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="relative w-full aspect-video overflow-hidden rounded-lg"
          >
            <img
              ref={heroRef}
              src={work.image}
              alt={work.title}
              data-flip-image={work.slug}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-8 sm:mt-10">
            <div className="flex-1 min-w-0">
              <header
              >
                <h1 ref={titleRef} data-flip-title={work.slug} className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-neutral-900 dark:text-white mb-6 leading-tight">
                  {work.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t("yearLabel")}: {work.year}
                  </span>
                </div>

                {work.stack && work.stack.length > 0 && (
                  <div className="mb-6">
                    <StackBadges stack={work.stack} />
                  </div>
                )}

                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 mb-2 text-sm font-medium rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
                  >
                    {t("viewLive")}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </header>

              {!hasLong && (
                <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed my-8">
                  {t("caseStudyComing")}
                </p>
              )}

              {work.overview && (
                <section id="brief" className="scroll-mt-24 my-10 sm:my-14">
                  <SectionHeading>{t("sections.brief")}</SectionHeading>
                  <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {work.overview}
                  </p>
                </section>
              )}

              {work.images && work.images.length > 0 && (
                <section id="gallery" className="scroll-mt-24 my-10 sm:my-14">
                  <SectionHeading>{t("sections.gallery")}</SectionHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {work.images.map((img, i) => (
                      <figure
                        key={img.url}
                        className={
                          i === 0 ? "sm:col-span-2" : undefined
                        }
                      >
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={img.url}
                            alt={img.caption ?? `${work.title} — ${i + 1}`}
                            loading="lazy"
                            className="w-full h-64 sm:h-80 object-cover hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {work.challenge && (
                <section id="problem" className="scroll-mt-24 my-10 sm:my-14">
                  <SectionHeading>{t("sections.problem")}</SectionHeading>
                  <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {work.challenge}
                  </p>
                </section>
              )}

              {work.solution && work.solution.length > 0 && (
                <section id="solution" className="scroll-mt-24 my-10 sm:my-14">
                  <SectionHeading>{t("sections.solution")}</SectionHeading>
                  <ul className="space-y-3">
                    {work.solution.map((item) => (
                      <li
                        key={item.slice(0, 32)}
                        className="flex gap-3 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {work.summary && (
                <section id="summary" className="scroll-mt-24 my-10 sm:my-14">
                  <SectionHeading>{t("sections.summary")}</SectionHeading>
                  <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-6">
                    <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {work.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {work.liveUrl && (
                        <a
                          href={work.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
                        >
                          {t("viewLive")}
                          <span aria-hidden>↗</span>
                        </a>
                      )}
                      <MorphLink
                        href="/works"
                        flipSlug={work.slug}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-500 transition-colors"
                      >
                        ← {t("backToWorks")}
                      </MorphLink>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside
              className="hidden lg:block w-64 shrink-0"
            >
              <nav className="sticky top-8">
                <ul className="space-y-1 border-l-2 border-neutral-200 dark:border-neutral-800">
                  {sectionIds.map((id) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block pl-4 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {t(`sections.${id}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </Container>
    </article>
  );
}
