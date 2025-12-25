"use client";

import { useRef } from "react";
import HeaderSection from "@/shared/components/HeaderSection";
import { Card } from "@/shared/components/ui/Card";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";
import { gsap, ScrollTrigger } from "@/shared/lib/gsap";
import { useLayoutEffect } from "react";

export const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLUListElement | null>(null);

  const listWork = [
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const containerEl = containerRef.current;
      const trackEl = trackRef.current;
      const rowEl = rowRef.current;

      if (!containerEl || !trackEl || !rowEl) return;

      const tween = gsap.to(trackEl, {
        x: () => {
          const distance = rowEl.scrollWidth - containerEl.clientWidth;
          return -Math.max(0, distance);
        },
        ease: "none",
        overwrite: true,
      });

      ScrollTrigger.create({
        trigger: containerEl,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.8, // scrub number => lebih smooth daripada true
        animation: tween,
        invalidateOnRefresh: true,
      });

      // kalau font/image loading mengubah ukuran, refresh ulang
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [listWork.length]);

  return (
    <section
      ref={containerRef}
      className="px-4 lg:px-8 min-h-screen h-[300dvh] w-screen flex items-center justify-center z-1 overflow-hidden"
    >
      <ContainerPadding>
        <div className="w-full h-screen absolute top-0 left-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full relative">
            <div
              ref={trackRef}
              className="work-container w-full flex flex-col gap-8 lg:gap-12"
            >
              <HeaderSection
                title="Works"
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
              accusantium minus quisquam natus error! Vero dolor totam nostrum
              laborum."
              />

              {/* Content  */}
              <ul ref={rowRef} className="flex gap-4 lg:gap-8 w-max">
                {listWork.map((item, index) => (
                  <li
                    key={index}
                    className="shrink-0 aspect-square h-120 w-120 lg:h-140 lg:w-140"
                  >
                    <Card>
                      <div className="flex flex-col justify-end h-full p-4 lg:p-8 gap-2 lg:gap-4">
                        <TypographyH3 text={item.title} />
                        <div className="uppercase text-xs flex text-background gap-1 font-haffer-mono-regular">
                          <p className="bg-muted py-1 px-2 rounded-full">
                            mermbership
                          </p>
                          <p className="bg-muted py-1 px-2 rounded-sm">
                            part of the
                          </p>
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ContainerPadding>
    </section>
  );
};
