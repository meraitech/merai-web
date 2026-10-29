"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { lockScroll } from "@/shared/utils/scroll-lock";
import { peekFlip, clearFlip } from "@/features/works/data/flip-store";

const DURATION = 0.65;

// True cross-route morph: flies fixed clones from the recorded card geometry
// (document coords) to this page's natural rects, then reveals the originals.
// Scroll is forced to top before measuring so both ends share coordinates.
// The store is only cleared when a flight completes — never on effect
// cleanup — so StrictMode remounts in dev re-run the flight instead of
// starving it.
export function useFlipTarget(slug: string) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const state = peekFlip(slug);
    if (!state) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.scrollTo(0, 0);
    const to = img.getBoundingClientRect();
    if (to.width === 0 || to.height === 0) return;

    const cleanups: Array<() => void> = [];
    const release = lockScroll();
    cleanups.push(release);

    const flyClone = (
      source: HTMLElement,
      from: {
        top: number;
        left: number;
        width: number;
        height: number | "auto";
        fontSize?: number;
        radius?: string;
      },
      dest: {
        top: number;
        left: number;
        width: number;
        height: number | "auto";
        fontSize?: number;
        radius?: string;
      },
    ): gsap.core.Tween => {
      const clone = source.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-flip-image");
      clone.removeAttribute("data-flip-title");
      clone.style.position = "fixed";
      clone.style.top = `${from.top}px`;
      clone.style.left = `${from.left}px`;
      clone.style.width = `${from.width}px`;
      clone.style.height = from.height === "auto" ? "auto" : `${from.height}px`;
      clone.style.margin = "0";
      clone.style.zIndex = "60";
      clone.style.pointerEvents = "none";
      if (from.fontSize !== undefined) {
        clone.style.fontSize = `${from.fontSize}px`;
      }
      if (from.radius !== undefined) {
        clone.style.borderRadius = from.radius;
      }
      source.style.opacity = "0";
      document.body.appendChild(clone);
      cleanups.push(() => {
        clone.remove();
        source.style.opacity = "";
      });
      const vars: gsap.TweenVars = {
        top: dest.top,
        left: dest.left,
        width: dest.width,
        duration: DURATION,
        ease: "power3.inOut",
      };
      if (dest.height !== "auto") vars.height = dest.height;
      if (dest.fontSize !== undefined) vars.fontSize = dest.fontSize;
      if (dest.radius !== undefined) vars.borderRadius = dest.radius;
      return gsap.to(clone, vars);
    };

    const tweens: gsap.core.Tween[] = [];
    tweens.push(
      flyClone(
        img,
        {
          top: state.image.top,
          left: state.image.left,
          width: state.image.width,
          height: state.image.height,
          radius: state.image.radius,
        },
        {
          top: to.top,
          left: to.left,
          width: to.width,
          height: to.height,
          radius: img.parentElement
            ? getComputedStyle(img.parentElement).borderRadius || "0px"
            : "0px",
        },
      ),
    );

    // Title morph only when the card title wasn't truncated — a cut-off
    // single line can't cleanly become a wrapped headline.
    const h1 = titleRef.current;
    const title = state.title;
    if (h1 && title && !title.truncated) {
      const h1Rect = h1.getBoundingClientRect();
      const h1Size = parseFloat(getComputedStyle(h1).fontSize) || title.fontSize;
      if (h1Rect.width !== 0) {
        tweens.push(
          flyClone(
            h1,
            {
              top: title.top,
              left: title.left,
              width: title.width,
              height: "auto",
              fontSize: title.fontSize,
            },
            {
              top: h1Rect.top,
              left: h1Rect.left,
              width: h1Rect.width,
              height: "auto",
              fontSize: h1Size,
            },
          ),
        );
      }
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        cleanups.forEach((fn) => fn());
        clearFlip();
      },
    });
    tweens.forEach((tween) => timeline.add(tween, 0));

    return () => {
      timeline.kill();
      cleanups.forEach((fn) => fn());
    };
  }, [slug]);

  return { imgRef, titleRef };
}
