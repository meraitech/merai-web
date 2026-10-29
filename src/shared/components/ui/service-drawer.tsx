"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, Compass, Handshake, Layers3, Sparkles, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { softEase } from "@/shared/utils/motion";
import { lockScroll } from "@/shared/utils/scroll-lock";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { Link as UiLink } from "@/shared/components/ui/link";

// three.js stays out of the initial page bundle: this chunk only loads
// when a drawer first opens.
const ChromaCurrent = dynamic(
  () => import("@/shared/components/chroma-current"),
  { ssr: false },
);

const COVER_ICONS = [Layers3, Compass, Sparkles, Handshake] as const;

export type ServiceDrawerContent = {
  intro: string;
  coversLabel?: string;
  covers: string;
  coversItems: { title: string; text: string }[];
  receive: string[];
  changes: string[];
};

export type ServiceDrawerLabels = {
  proposal: string;
  coversLabel: string;
  receiveLabel: string;
  changesLabel: string;
  closeLabel: string;
  ctaTitle: string;
  ctaButton: string;
};

export type ServiceDrawerFallback = {
  intro: string;
  covers: string;
  receive: string[];
  changes: string[];
};

function asStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

function asCoverItems(value: unknown): { title: string; text: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is { title: string; text: string } =>
      typeof v === "object" &&
      v !== null &&
      typeof (v as { title?: unknown }).title === "string" &&
      typeof (v as { text?: unknown }).text === "string",
  );
}

// Theme is statically dark (see `data-theme="dark"` on <html>), so the hero
// canvas is told the dark shade directly instead of sniffing the OS.
function usePrefersDark(): boolean {
  return true;
}

// Message entries are optional: an absent or partial entry falls back to
// shared generic copy so the drawer never renders empty before copy lands.
export function resolveDrawerContent(
  raw: unknown,
  fallback: ServiceDrawerFallback,
): ServiceDrawerContent {
  const entry =
    typeof raw === "object" && raw !== null
      ? (raw as Partial<ServiceDrawerContent>)
      : {};
  return {
    intro: typeof entry.intro === "string" ? entry.intro : fallback.intro,
    coversLabel:
      typeof entry.coversLabel === "string" ? entry.coversLabel : undefined,
    covers: typeof entry.covers === "string" ? entry.covers : fallback.covers,
    coversItems: asCoverItems(entry.coversItems),
    receive:
      asStrings(entry.receive).length > 0
        ? asStrings(entry.receive)
        : fallback.receive,
    changes:
      asStrings(entry.changes).length > 0
        ? asStrings(entry.changes)
        : fallback.changes,
  };
}

export function ServiceDrawer({
  open,
  title,
  content,
  labels,
  onClose,
  triggerRef,
}: {
  open: boolean;
  title: string;
  content: ServiceDrawerContent;
  labels: ServiceDrawerLabels;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}): ReactNode {
  const reducedMotion = useReducedMotion() ?? false;
  const prefersDark = usePrefersDark();
  const panelId = useId();

  const coverList: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const coverRow: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: softEase },
    },
  };
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const release = lockScroll();
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      root.style.overflow = previousRootOverflow;
      release();
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  const panelMotion = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { y: "100%" },
        animate: { y: "0%", transition: { duration: 0.45, ease: softEase } },
        exit: { y: "100%", transition: { duration: 0.32, ease: softEase } },
      };

  return (
    <AnimatePresence>
      {open && (
        <div key="service-drawer" className="fixed inset-0 z-[70]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 touch-none bg-neutral-950/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.3 }}
            onClick={onClose}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
            <motion.div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              data-lenis-prevent
              className="pointer-events-auto max-h-[90dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl rounded-b-none bg-white pb-[env(safe-area-inset-bottom)] text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-white"
              {...panelMotion}
            >
              <div className="relative h-[400px] shrink-0 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0">
                  <ChromaCurrent
                    className="h-full min-h-0"
                    colors={["#004ee0", "#ffffff"]}
                    backgroundColor={prefersDark ? "#171717" : "#ffffff"}
                    dotSize={0.2}
                    speed={0.05}
                    bloom={0}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <h1
                    id={titleId}
                    className="max-w-3xl font-serif text-4xl font-medium tracking-tight text-neutral-900 drop-shadow-sm sm:text-5xl dark:text-white"
                  >
                    {title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base text-neutral-600 drop-shadow-sm sm:text-lg dark:text-neutral-300">
                    {content.intro.slice(0, 300)}
                  </p>
                  <UiLink
                    href="/contact"
                    className="group pointer-events-auto mt-7 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-neutral-900 pr-4 pl-5 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_32px_-14px_rgba(0,0,0,0.45)] transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[0.98] dark:bg-white dark:text-neutral-900"
                  >
                    {labels.proposal}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </UiLink>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={labels.closeLabel}
                  className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/70 text-neutral-600 backdrop-blur transition-colors hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 sm:right-6 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <Container className="py-6 sm:py-10">
                <div>
                  <SectionHeading
                    align="left"
                    className="mb-6"
                    title={content.coversLabel ?? labels.coversLabel}
                  />
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
                    <div className="self-start lg:sticky lg:top-6">
                      <motion.p
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.65, ease: softEase }}
                        className="max-w-lg text-base leading-relaxed text-neutral-600 [text-wrap:pretty] dark:text-neutral-400 sm:text-lg"
                      >
                        {content.covers}
                      </motion.p>
                    </div>
                    {content.coversItems.length > 0 && (
                      <motion.div
                        variants={coverList}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="border-y border-neutral-200 divide-y divide-neutral-200 dark:border-neutral-800 dark:divide-neutral-800"
                      >
                        {content.coversItems.map((sub, i) => {
                          const Icon = COVER_ICONS[i % COVER_ICONS.length];
                          return (
                            <motion.article
                              key={sub.title}
                              variants={coverRow}
                              className="grid grid-cols-[3.5rem_1fr] gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-10"
                            >
                              <p className="pt-1 font-mono text-sm text-neutral-500 dark:text-neutral-500">
                                {String(i + 1).padStart(2, "0")}
                              </p>
                              <div>
                                <div className="flex items-start justify-between gap-6">
                                  <h3 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
                                    {sub.title}
                                  </h3>
                                  <Icon
                                    className="mt-1 h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-500"
                                    aria-hidden
                                  />
                                </div>
                                <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-600 [text-wrap:pretty] dark:text-neutral-400">
                                  {sub.text}
                                </p>
                              </div>
                            </motion.article>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="mt-12">
                    <SectionHeading
                      align="left"
                      className="mb-6"
                      title={labels.changesLabel}
                    />
                    <ul className="mt-2 w-full">
                      {content.changes.map((line, i) => (
                        <li
                          key={line}
                          className="border-t border-neutral-200/60 dark:border-neutral-800/60"
                        >
                          <span className="flex min-w-0 items-baseline gap-3 px-1 py-3 sm:py-3.5">
                            <span
                              aria-hidden="true"
                              className="shrink-0 font-serif text-sm italic text-neutral-400 dark:text-neutral-500"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-base font-medium tracking-tight text-neutral-700 sm:text-lg dark:text-neutral-300">
                              {line}
                            </span>
                          </span>
                        </li>
                      ))}
                      <li
                        aria-hidden="true"
                        className="border-t border-neutral-200/60 dark:border-neutral-800/60"
                      />
                    </ul>
                </div>

                <div className="mt-12 rounded-2xl bg-neutral-100 px-6 py-10 text-center sm:px-10 dark:bg-neutral-800">
                  <h2 className="mx-auto max-w-xl font-serif text-2xl font-medium tracking-tight text-balance text-neutral-900 sm:text-3xl dark:text-white">
                    {labels.ctaTitle}
                  </h2>
                  <UiLink
                    href="/contact"
                    className="group mt-6 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-neutral-900 pr-4 pl-5 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_32px_-14px_rgba(0,0,0,0.45)] transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[0.98] dark:bg-white dark:text-neutral-900"
                  >
                    {labels.ctaButton}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </UiLink>
                </div>
              </Container>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
