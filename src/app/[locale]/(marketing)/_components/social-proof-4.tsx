"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";

const testimonialAvatars = [
  "https://images.unsplash.com/photo-1600481453173-55f6a844a4ea?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1629649534931-4884c197af3a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1750680475124-fd1ef8c4bbc5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611403119860-57c4937ef987?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618508035424-73ad1a15006c?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1562208512-ec508326186b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549124041-8b22c6157337?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705408115324-6bd2cbfa4d93?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1593207129063-c99ebcf14ea4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1564172556663-2bef9580fc44?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1759906219433-44fe183acf41?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1530466015235-1d47696ea847?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function SocialProof4() {
  const t = useTranslations("Home.testimonials");

  const quoteKeys = [
    "quote1",
    "quote2",
    "quote3",
    "quote4",
    "quote5",
    "quote6",
    "quote7",
    "quote8",
    "quote9",
    "quote10",
    "quote11",
    "quote12",
  ] as const;

  const allTestimonials = quoteKeys.map((key, i) => ({
    quote: t(`${key}.quote`),
    name: t(`${key}.name`),
    role: t(`${key}.role`),
    avatar: testimonialAvatars[i],
  }));

  const testimonials = [
    allTestimonials.slice(0, 4),
    allTestimonials.slice(4, 8),
    allTestimonials.slice(8, 12),
  ];

  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const marquee3Ref = useRef<HTMLDivElement>(null);
  const marqueeMobileRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const running = inView && !hidden;

  // Compositor-driven marquees: measure half-height once (content is
  // duplicated exactly 2x) and let CSS animate translateY. Speeds match the
  // previous rAF pace (px/frame @60fps → px/s): 0.5/0.5/0.6/0.4 → 30/30/36/24.
  // Zero JS per frame; the browser throttles offscreen tracks for free.
  useEffect(() => {
    const tracks: { el: HTMLDivElement | null; speed: number }[] = [
      { el: marqueeMobileRef.current, speed: 30 },
      { el: marquee1Ref.current, speed: 30 },
      { el: marquee2Ref.current, speed: 36 },
      { el: marquee3Ref.current, speed: 24 },
    ];
    const measure = (): void => {
      for (const { el, speed } of tracks) {
        if (!el) continue;
        const half = el.scrollHeight / 2;
        if (half <= 0) continue;
        el.style.setProperty("--mq-translate", `${-half}px`);
        el.style.setProperty("--mq-dur", `${half / speed}s`);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    for (const { el } of tracks) if (el) ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { rootMargin: "80px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setHidden(document.hidden);
    const onVis = (): void => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <Container spacing="generous">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading align="left" title={t("heading")} className="mb-0" />

          <Link
            href="/contact"
            className="group whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile - Single Marquee */}
        <div className="relative sm:hidden">
          <div className="relative h-[600px] overflow-hidden">
            <div
              ref={marqueeMobileRef}
              className="marquee-y"
              data-running={running}
            >
              {[...allTestimonials, ...allTestimonials].map(
                (testimonial, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="mb-4 rounded-xl bg-white/60 p-1.5 shadow-sm backdrop-blur-md dark:bg-neutral-800/40"
                  >
                    <div className="rounded-sm border border-neutral-300/60 bg-white p-6 shadow-sm dark:border-neutral-800/50 dark:bg-neutral-900">
                      <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
                        />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
            {/* Gradient Fade Top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white via-white/90 to-transparent dark:from-neutral-950 dark:via-neutral-950/90" />
            {/* Gradient Fade Bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white via-white/90 to-transparent dark:from-neutral-950 dark:via-neutral-950/90" />
          </div>
        </div>

        {/* Desktop - Three Marquee Columns */}
        <div className="relative hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="relative h-[600px] overflow-hidden">
            <div
              ref={marquee1Ref}
              className="marquee-y"
              data-running={running}
            >
              {[...testimonials[0], ...testimonials[0]].map(
                (testimonial, index) => (
                  <div
                    key={`col1-${index}`}
                    className="mb-4 rounded-xl bg-white/60 p-1.5 shadow-sm backdrop-blur-md dark:bg-neutral-800/40"
                  >
                    <div className="rounded-sm border border-neutral-300/60 bg-white p-6 shadow-sm dark:border-neutral-800/50 dark:bg-neutral-900">
                      <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
                        />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
            {/* Gradient Fade Top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
            {/* Gradient Fade Bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
          </div>

          {/* Column 2 */}
          <div className="relative h-[600px] overflow-hidden">
            <div
              ref={marquee2Ref}
              className="marquee-y"
              data-running={running}
            >
              {[...testimonials[1], ...testimonials[1]].map(
                (testimonial, index) => (
                  <div
                    key={`col2-${index}`}
                    className="mb-4 rounded-xl bg-white/60 p-1.5 shadow-sm backdrop-blur-md dark:bg-neutral-800/40"
                  >
                    <div className="rounded-sm border border-neutral-300/60 bg-white p-6 shadow-sm dark:border-neutral-800/50 dark:bg-neutral-900">
                      <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
                        />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
            {/* Gradient Fade Top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
            {/* Gradient Fade Bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
          </div>

          {/* Column 3 */}
          <div className="relative h-[600px] overflow-hidden">
            <div
              ref={marquee3Ref}
              className="marquee-y"
              data-running={running}
            >
              {[...testimonials[2], ...testimonials[2]].map(
                (testimonial, index) => (
                  <div
                    key={`col3-${index}`}
                    className="mb-4 rounded-xl bg-white/60 p-1.5 shadow-sm backdrop-blur-md dark:bg-neutral-800/40"
                  >
                    <div className="rounded-sm border border-neutral-300/60 bg-white p-6 shadow-sm dark:border-neutral-800/50 dark:bg-neutral-900">
                      <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
                        />
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
            {/* Gradient Fade Top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
            {/* Gradient Fade Bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
          </div>
        </div>
      </Container>
    </section>
  );
}
