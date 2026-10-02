"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Link as UiLink } from "@/shared/components/ui/link";

const animationDefaults = { duration: 0.45, ease: "expo.out" } as const;

type Edge = "top" | "bottom";

function findClosestEdge(
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
): Edge {
  const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
  const bottomEdgeDist =
    (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
  return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ServiceSubItem({
  label,
  href,
  indexLabel,
}: {
  label: string;
  href: "/contact";
  indexLabel: string;
}): ReactNode {
  const itemRef = useRef<HTMLLIElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayInnerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    charsRef.current = charsRef.current.slice(0, label.length);
  }, [label.length]);

  const slideIn = (edge: Edge) => {
    if (
      !overlayRef.current ||
      !overlayInnerRef.current ||
      prefersReducedMotion()
    ) {
      return;
    }
    const tl = gsap.timeline({ defaults: { ...animationDefaults } });
    tl.set(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(
        overlayInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0,
      )
      .to([overlayRef.current, overlayInnerRef.current], { y: "0%" }, 0);

    if (charsRef.current.length > 0) {
      tl.fromTo(
        charsRef.current,
        { y: 0 },
        {
          y: -16,
          duration: 0.15,
          ease: "sine.out",
          stagger: { each: 0.008, from: "start" },
        },
        0,
      ).to(
        charsRef.current,
        {
          y: 0,
          duration: 0.2,
          ease: "sine.inOut",
          stagger: { each: 0.008, from: "start" },
        },
        0.15,
      );
    }
  };

  const slideOut = (edge: Edge) => {
    if (
      !overlayRef.current ||
      !overlayInnerRef.current ||
      prefersReducedMotion()
    ) {
      return;
    }
    gsap.set(charsRef.current, { y: 0 });
    gsap
      .timeline({ defaults: { ...animationDefaults } })
      .to(overlayRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(
        overlayInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0,
      );
  };

  const handleMouseEnter = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    slideIn(
      findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height,
      ),
    );
  };

  const handleMouseLeave = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    slideOut(
      findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height,
      ),
    );
  };

  const chars = label.split("").map((char, i) => (
    <span
      key={i}
      ref={(el) => {
        if (el) charsRef.current[i] = el;
      }}
      className="inline-block"
      style={{ whiteSpace: char === " " ? "pre" : undefined }}
    >
      {char}
    </span>
  ));

  return (
    <li
      ref={itemRef}
      className="relative overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/60"
    >
      <UiLink
        href={href}
        aria-label={label}
        className="flex items-center justify-between gap-3 px-1 py-3 sm:py-3.5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => slideIn("bottom")}
        onBlur={() => slideOut("bottom")}
      >
        <span className="flex min-w-0 items-baseline gap-3">
          <span
            aria-hidden="true"
            className="shrink-0 font-serif text-sm italic text-neutral-400 dark:text-neutral-500"
          >
            {indexLabel}
          </span>
          <span className="text-base font-medium tracking-tight text-neutral-700 sm:text-lg dark:text-neutral-300">
            {label}
          </span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-colors dark:text-neutral-500" />
      </UiLink>

      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden bg-neutral-900 dark:bg-white"
        style={{ transform: "translateY(101%)" }}
      >
        <div
          ref={overlayInnerRef}
          className="flex h-full items-center justify-between gap-3 px-1 py-3 sm:py-3.5"
          style={{ transform: "translateY(-101%)" }}
        >
          <span className="flex min-w-0 items-baseline gap-3">
            <span
              aria-hidden="true"
              className="shrink-0 font-serif text-sm italic text-white/60 dark:text-neutral-900/60"
            >
              {indexLabel}
            </span>
            <span className="text-base font-medium tracking-tight text-white sm:text-lg dark:text-neutral-900">
              {chars}
            </span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-white dark:text-neutral-900" />
        </div>
      </div>
    </li>
  );
}

export function ServiceSubList({
  items,
  contactHref = "/contact",
  startIndex = 0,
}: {
  items: string[];
  contactHref?: "/contact";
  startIndex?: number;
}): ReactNode {
  if (items.length === 0) return null;
  return (
    <ul className="mt-2 w-full">
      {items.map((label, i) => (
        <ServiceSubItem
          key={label}
          label={label}
          href={contactHref}
          indexLabel={String(startIndex + i + 1).padStart(2, "0")}
        />
      ))}
      <li
        aria-hidden="true"
        className="border-t border-neutral-200/60 dark:border-neutral-800/60"
      />
    </ul>
  );
}
