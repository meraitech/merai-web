// Cross-route FLIP state. Module singleton survives App Router client-side
// navigations (no full reload), so a card can hand its geometry to the
// detail hero (and back). Entries expire to avoid animating stale clicks.
//
// NOTE: read with peekFlip (no consume). Clearing happens only when a
// flight completes — StrictMode double-mounts effects in dev, and consuming
// on mount would starve the remount (no morph at all).
export interface FlipRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FlipTitle extends FlipRect {
  fontSize: number;
  truncated: boolean;
}

export interface FlipState {
  slug: string;
  image: FlipRect & { radius: string };
  title: FlipTitle | null;
  at: number;
}

let pending: FlipState | null = null;

export function captureFlip(
  slug: string,
  imgEl: Element,
  titleEl: Element | null,
): void {
  const rect = imgEl.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  let title: FlipTitle | null = null;
  if (titleEl) {
    const tr = titleEl.getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(titleEl).fontSize) || 16;
    title =
      tr.width === 0
        ? null
        : {
            top: tr.top,
            left: tr.left,
            width: tr.width,
            height: tr.height,
            fontSize,
            truncated: titleEl.scrollWidth > titleEl.clientWidth + 1,
          };
  }

  pending = {
    slug,
    image: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      radius: imgEl.parentElement
        ? getComputedStyle(imgEl.parentElement).borderRadius || "0px"
        : "0px",
    },
    title,
    at: Date.now(),
  };
}

export function peekFlip(slug: string, maxAgeMs = 3000): FlipState | null {
  if (!pending || pending.slug !== slug) return null;
  if (Date.now() - pending.at > maxAgeMs) {
    pending = null;
    return null;
  }
  return pending;
}

export function clearFlip(): void {
  pending = null;
}
