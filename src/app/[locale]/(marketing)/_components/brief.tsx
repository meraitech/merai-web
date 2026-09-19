"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

const SRC =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2400&q=80&auto=format&fit=crop";

const WORDS_END = 0.28;
const GROW: [number, number] = [0.32, 0.86];

const TEXT_OUT: [number, number] = [0.4, 0.58];
const CAPTION: [number, number] = [0.84, 0.96];

const SEED_W = 200;
const SEED_H = 160;

const RADIUS = 16;

const DIM = 0.14;
const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (v: number, [a, b]: [number, number]): number =>
  clamp01((v - a) / (b - a));

function Word({
  text,
  progress,
  index,
  total,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}): ReactNode {
  const a = (index / total) * WORDS_END;
  const b = Math.min(WORDS_END, ((index + 3) / total) * WORDS_END);
  const opacity = useTransform(
    progress,
    (v) => DIM + (1 - DIM) * span(v, [a, b])
  );
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {text}&nbsp;
    </motion.span>
  );
}

function Scene({
  progress,
  caption,
  imageAlt,
}: {
  progress: MotionValue<number>;
  caption: string;
  imageAlt: string;
}): ReactNode {
  const frameRef = useRef<HTMLDivElement>(null);
  const seed = useMotionValue(0.14);
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const fit = (): void =>
      seed.set(
        Math.min(
          0.6,
          Math.max(
            0.1,
            Math.min(SEED_W / el.offsetWidth, SEED_H / el.offsetHeight)
          )
        )
      );
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [seed]);

  const grow = useTransform(progress, (v) => easeInOut(span(v, GROW)));
  const scale = useTransform(
    [grow, seed],
    ([g, s]) => (s as number) + (1 - (s as number)) * (g as number)
  );

  const radius = useTransform(scale, (s) => RADIUS / s);
  const frameOpacity = useTransform(progress, (v) => span(v, [0.02, 0.14]));
  const captionOpacity = useTransform(progress, (v) => span(v, CAPTION));
  const captionY = useTransform(captionOpacity, (c) => 12 * (1 - c));

  return (
    <motion.div
      ref={frameRef}
      style={{ scale, borderRadius: radius, opacity: frameOpacity }}
      className="absolute inset-3 overflow-hidden bg-neutral-100 dark:bg-neutral-900 will-change-transform sm:inset-4"
    >
      <Image
        src={SRC}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <motion.span
        aria-hidden="true"
        style={{ opacity: captionOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
      />
      <motion.div
        style={{ opacity: captionOpacity, y: captionY }}
        className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10"
      >
        <p className="max-w-md font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-balance sm:text-[2rem]">
          {caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Brief(): ReactNode {
  const t = useTranslations("Home.brief");
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const textOpacity = useTransform(
    scrollYProgress,
    (v) => 1 - span(v, TEXT_OUT)
  );

  const quote = t("quote");
  const words = quote.split(" ");
  const caption = t("caption");
  const imageAlt = t("imageAlt");

  const textClass =
    "mx-auto max-w-3xl text-center font-serif text-[clamp(1.75rem,3.3vw,2.75rem)] leading-[1.15] tracking-[-0.015em] text-balance text-neutral-900 dark:text-white";

  if (reducedMotion) {
    return (
      <section aria-label={t("label")} className="py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className={textClass}>{quote}</p>
          <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={SRC}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <p className="max-w-md font-serif text-[1.5rem] leading-[1.15] sm:text-[2rem]">
                {caption}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={t("label")} className="relative h-[320svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity }}
          className="mx-auto w-full max-w-[1400px] px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8"
        >
          <p className="sr-only">{quote}</p>
          <p aria-hidden="true" className={textClass}>
            {words.map((w, i) => (
              <Word
                key={`${i}-${w}`}
                text={w}
                progress={scrollYProgress}
                index={i}
                total={words.length}
              />
            ))}
          </p>
        </motion.div>
        <Scene
          progress={scrollYProgress}
          caption={caption}
          imageAlt={imageAlt}
        />
      </div>
    </section>
  );
}
