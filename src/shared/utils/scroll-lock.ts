// Reference-counted body scroll lock.
//
// Splash, mobile menu, service drawer, and FLIP flights all used to
// save/restore `document.body.style.overflow` directly. Overlapped holders
// then restored stale values — most visibly: navigating away while the
// splash still held the lock left `overflow: hidden` on the body forever,
// so the next page could not scroll.
//
// Holders call `lockScroll()` and run the returned release when done. The
// body only unlocks when the last holder releases, and releases are
// idempotent, so effect cleanups and timer fallbacks can overlap safely.
let holders = 0;
let saved: string | null = null;

export function lockScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  if (holders === 0) {
    saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  holders += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holders = Math.max(0, holders - 1);
    if (holders === 0 && saved !== null) {
      document.body.style.overflow = saved;
      saved = null;
    }
  };
}

export function isScrollLocked(): boolean {
  return holders > 0;
}
