"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SnapConfig = boolean | number[];

interface StackSheetProps {
  children: React.ReactNode;
  backgroundClassName?: string;
  maxWidthClassName?: string;
  paddingClassName?: string;
  snap?: SnapConfig;
  transitionSpeed?: number;
  sheetStartYPercent?: number;
  sheetEndYPercent?: number;
  className?: string;
  refreshPriority?: number;
}

export default function StackSheet({
  children,
  backgroundClassName = "bg-white",
  maxWidthClassName = "max-w-[900px]",
  paddingClassName = "p-6 md:p-12",
  snap = true,
  transitionSpeed = 0.15,
  sheetStartYPercent = 100,
  sheetEndYPercent = 0,
  className = "",
  refreshPriority = -1, // ✅ Lower priority untuk section setelah pinning lain
}: StackSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const panels = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  useLayoutEffect(() => {
    if (!containerRef.current || !sheetRef.current || panels.length === 0) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ✅ Tunggu sebentar agar ScrollTrigger sebelumnya selesai calculate
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const numPanels = panels.length;

        // Bagi timeline: 20% sheet, 80% panels
        const sheetRevealProgress = 0.2;
        const panelSpaceEach = (1 - sheetRevealProgress) / numPanels;

        // Snap points
        const snapPoints =
          snap === true
            ? [
                0,
                sheetRevealProgress,
                ...Array.from(
                  { length: numPanels - 1 },
                  (_, i) => sheetRevealProgress + panelSpaceEach * (i + 1)
                ),
                1,
              ]
            : Array.isArray(snap)
            ? snap
            : undefined;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: refreshPriority,
            // markers: true, // Uncomment untuk debugging
          },
        });

        // Set initial states
        gsap.set(sheetRef.current, { yPercent: sheetStartYPercent });
        panelRefs.current.forEach((panel) => {
          if (panel) {
            gsap.set(panel, {
              opacity: 0,
              y: 50,
              display: "none",
            });
          }
        });

        // 1. Sheet reveal (0 to 20%)
        tl.to(
          sheetRef.current,
          {
            yPercent: sheetEndYPercent,
            duration: sheetRevealProgress,
            ease: "power2.out",
          },
          0
        );

        // 2. Show panels sequentially
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;

          const panelStart = sheetRevealProgress + panelSpaceEach * i;
          const fadeInEnd = panelStart + transitionSpeed;
          const holdEnd =
            i < numPanels - 1
              ? panelStart + panelSpaceEach - transitionSpeed
              : 1;

          // Show panel
          tl.set(panel, { display: "flex" }, panelStart);

          // Fade in
          tl.to(
            panel,
            {
              opacity: 1,
              y: 0,
              duration: transitionSpeed,
              ease: "power2.out",
            },
            panelStart
          );

          // Hold visible
          if (holdEnd > fadeInEnd) {
            tl.to(
              panel,
              {
                opacity: 1,
                y: 0,
                duration: holdEnd - fadeInEnd,
              },
              fadeInEnd
            );
          }

          // Fade out (except last panel)
          if (i < numPanels - 1) {
            tl.to(
              panel,
              {
                opacity: 0,
                y: -50,
                duration: transitionSpeed,
                ease: "power2.in",
              },
              holdEnd
            );

            tl.set(panel, { display: "none" }, holdEnd + transitionSpeed);
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100); // ✅ Delay 100ms untuk memastikan QuotesDepth selesai

    return () => clearTimeout(timer);
  }, [
    panels.length,
    snap,
    transitionSpeed,
    sheetStartYPercent,
    sheetEndYPercent,
    refreshPriority,
  ]);

  const totalHeight = (panels.length + 1) * 100;

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${totalHeight}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={sheetRef}
          className={`absolute inset-0 ${backgroundClassName}`}
        >
          <div className={`h-full w-full ${paddingClassName}`}>
            <div className="relative h-full w-full">
              {panels.map((panel, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className={`w-full ${maxWidthClassName} mx-auto`}>
                    {panel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
