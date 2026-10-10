/** Run a callback when the browser is idle (falls back to a macrotask). */
export function onIdle(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(callback, { timeout: 600 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(callback, 1);
  return () => window.clearTimeout(id);
}
