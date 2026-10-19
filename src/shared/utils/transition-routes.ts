import { routing } from "@/i18n/routing";

// Full-page transitions (splash cover, view-transition morph) only run when
// navigating TO one of these routes. Detail pages like /works/{slug} swap
// instantly with no transition.
const TRANSITION_PATHS = new Set([
  "/services",
  "/works",
  "/about",
  "/news",
  "/contact",
]);

export function stripLocale(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (
    segment &&
    (routing.locales as readonly string[]).includes(segment)
  ) {
    const rest = pathname.slice(segment.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

export function isTransitionRoute(pathname: string): boolean {
  let clean = stripLocale(pathname).split(/[?#]/)[0] ?? "/";
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return TRANSITION_PATHS.has(clean);
}
