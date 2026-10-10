"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SPLASH_LOGO_SRC } from "@/shared/assets/splash-logo";

const MIN_DISPLAY_MS = 400;
const MAX_WAIT_MS = 3500;
// Fixed cover time for client-side navigations (no load event fires).
const NAV_DISPLAY_MS = 500;
const NAV_FALLBACK_MS = 2000;
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

export function SplashScreen() {
  const pathname = usePathname();
  // Always mounted: showing is a class flip, so there is no DOM-insert gap
  // between a navigation intent and the cover.
  const [phase, setPhase] = useState<Phase>("cover");
  const firstRoute = useRef(true);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const savedOverflow = useRef<string | null>(null);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const lock = () => {
    if (savedOverflow.current === null) {
      savedOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  };
  const unlock = () => {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
  };

  const show = () => {
    clearAll();
    lock();
    setPhase("cover");
  };
  const hideSequence = (afterMs: number) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      later(() => {
        setPhase("hidden");
        unlock();
      }, afterMs);
      return;
    }
    later(() => setPhase("leaving"), afterMs);
    later(() => {
      setPhase("hidden");
      unlock();
    }, afterMs + FADE_MS);
  };
  // Absolute fallback so no flow ever leaves a stuck overlay.
  const fallback = (ms: number) => {
    later(() => {
      setPhase("hidden");
      unlock();
    }, ms);
  };

  // Initial full document load: wait for load + fonts, then fade.
  useEffect(() => {
    lock();
    const start = performance.now();

    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
            // shortcut: never trap the user if load hangs on heavy WebGL/fonts.
            later(resolve, MAX_WAIT_MS);
          });

    const fonts =
      typeof document.fonts?.ready.then === "function"
        ? document.fonts.ready.then(
            () => undefined,
            () => undefined,
          )
        : Promise.resolve();

    void Promise.all([ready, fonts]).then(() => {
      const elapsed = performance.now() - start;
      hideSequence(Math.max(0, MIN_DISPLAY_MS - elapsed));
    });
    fallback(MAX_WAIT_MS + MIN_DISPLAY_MS);

    return () => {
      clearAll();
      unlock();
    };
    // Mount-only: show/hide helpers are ref/state-stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation intents: cover BEFORE the route swaps, not after it paints.
  // Covers in-app link clicks (capture runs before Next's router handler and
  // React flushes discrete-event updates before paint) and back/forward.
  useEffect(() => {
    const isInternalNav = (anchor: HTMLAnchorElement, event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return false;
      if (anchor.target === "_blank" || anchor.hasAttribute("download"))
        return false;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("/#")) return false;
      if (href.startsWith("#")) return false;
      // Same-page anchor (e.g. /about -> /about#team): no route change.
      if (anchor.pathname === window.location.pathname && anchor.hash)
        return false;
      return true;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNav(anchor, event)) return;
      show();
      hideSequence(NAV_DISPLAY_MS);
      fallback(NAV_FALLBACK_MS);
    };

    const onPopState = () => {
      show();
      hideSequence(NAV_DISPLAY_MS);
      fallback(NAV_FALLBACK_MS);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
    // Mount-only listeners; handlers only touch refs and setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route resolved: re-cover (no-op if intent already did) and fade on time.
  // Hash-only jumps don't change pathname, so they stay instant.
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    show();
    hideSequence(NAV_DISPLAY_MS);
    fallback(NAV_FALLBACK_MS);

    return () => {
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
