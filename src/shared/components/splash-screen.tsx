"use client";

import { useEffect, useRef, useState } from "react";
import { SPLASH_LOGO_SRC } from "@/shared/assets/splash-logo";
import { lockScroll } from "@/shared/utils/scroll-lock";

const MIN_DISPLAY_MS = 400;
const MAX_WAIT_MS = 3500;
const FADE_MS = 300;

type Phase = "cover" | "leaving" | "hidden";

// Critical cover styles live inline (not Tailwind) so the splash hides the
// page even if the stylesheet hasn't arrived yet. Background color is
// deliberately NOT inline: Tailwind's bg-white/dark:bg-neutral-950 classes
// must win so the splash always matches the body theme (an inline value
// would override them on every OS).
const COVER_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Covers the initial document load only (cold fonts + first WebGL frames).
// Client-side navigations swap instantly with no overlay and no scroll lock:
// App Router keeps the old page painted until the new route is ready, and
// per-route heroes progressively enhance (static first word, canvas
// fade-in), so there is nothing to hide — and nothing that can leak
// `overflow: hidden` onto the next page.
export function SplashScreen() {
  // Always mounted: showing is a class flip, so there is no DOM-insert gap.
  const [phase, setPhase] = useState<Phase>("cover");
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const releaseRef = useRef<(() => void) | null>(null);

  // Initial full document load: wait for load + fonts, then fade.
  useEffect(() => {
    releaseRef.current = lockScroll();
    const release = (): void => {
      releaseRef.current?.();
      releaseRef.current = null;
    };
    const start = performance.now();

    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            const onLoad = (): void => {
              window.removeEventListener("load", onLoad);
              resolve();
            };
            window.addEventListener("load", onLoad, { once: true });
            // shortcut: never trap the user if load hangs on heavy WebGL/fonts.
            timers.current.push(setTimeout(onLoad, MAX_WAIT_MS));
          });

    const fonts =
      typeof document.fonts?.ready.then === "function"
        ? document.fonts.ready.then(
            () => undefined,
            () => undefined,
          )
        : Promise.resolve();

    let done = false;
    const finish = (afterMs: number): void => {
      if (done) return;
      done = true;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        timers.current.push(
          setTimeout(() => {
            setPhase("hidden");
            release();
          }, afterMs),
        );
        return;
      }
      timers.current.push(setTimeout(() => setPhase("leaving"), afterMs));
      timers.current.push(
        setTimeout(() => {
          setPhase("hidden");
          release();
        }, afterMs + FADE_MS),
      );
    };

    void Promise.all([ready, fonts]).then(() => {
      const elapsed = performance.now() - start;
      finish(Math.max(0, MIN_DISPLAY_MS - elapsed));
    });
    // Absolute fallback so no flow ever leaves a stuck overlay.
    timers.current.push(
      setTimeout(() => finish(0), MAX_WAIT_MS + MIN_DISPLAY_MS),
    );

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      releaseRef.current?.();
      releaseRef.current = null;
    };
  }, []);

  return (
    <div
      data-splash
      aria-hidden="true"
      style={COVER_STYLE}
      className={`bg-white dark:bg-neutral-950 ${
        phase === "cover"
          ? "opacity-100 transition-none"
          : phase === "leaving"
            ? "pointer-events-none opacity-0 transition-opacity duration-300"
            : "pointer-events-none opacity-0 transition-none"
      }`}
    >
      <img
        src={SPLASH_LOGO_SRC}
        alt=""
        width={256}
        height={256}
        style={{ height: 48, width: "auto" }}
        className="animate-breath motion-reduce:animate-none md:h-16 dark:invert"
      />
    </div>
  );
}
