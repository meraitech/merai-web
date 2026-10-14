"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { softEase } from "@/shared/utils/motion";
import { Container } from "@/shared/components/ui/container";
import { Link as UiLink } from "@/shared/components/ui/link";

// three.js stays out of the initial page bundle: this chunk only loads
// when a drawer first opens.
const ChromaCurrent = dynamic(
  () => import("@/shared/components/chroma-current"),
  { ssr: false },
);

export type ServiceDrawerContent = {
  intro: string;
  coversLabel?: string;
  covers: string;
  receive: string[];
  changes: string[];
};

export type ServiceDrawerLabels = {
  proposal: string;
  coversLabel: string;
  receiveLabel: string;
  changesLabel: string;
  closeLabel: string;
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

// Drawer panel tokens live here (bg-white / dark:bg-neutral-900), so the
// hero canvas is told the exact shade instead of sniffing the DOM — which
// can resolve mid-animation and flash pure black.
function usePrefersDark(): boolean {
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent): void => setDark(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return dark;
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
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previousOverflow;
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
            className="absolute inset-0 bg-neutral-950/45"
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
              className="pointer-events-auto max-h-[80dvh] w-full overflow-y-auto rounded-t-3xl rounded-b-none bg-white pb-[env(safe-area-inset-bottom)] text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-white"
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
                <h2
                  id={titleId}
                  className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white"
                >
                  {title}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
                  {content.intro}
                </p>
                <UiLink
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 rounded-sm text-lg font-medium hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                >
                  {labels.proposal}
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </UiLink>

                <div className="mt-8">
                  <h3 className="text-sm font-medium tracking-[0.08em] uppercase opacity-70">
                    {content.coversLabel ?? labels.coversLabel}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {content.covers}
                  </p>
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium tracking-[0.08em] uppercase opacity-70">
                      {labels.receiveLabel}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {content.receive.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500"
                          >
                            ∞
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-[0.08em] uppercase opacity-70">
                      {labels.changesLabel}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {content.changes.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500"
                          >
                            ∞
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Container>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
