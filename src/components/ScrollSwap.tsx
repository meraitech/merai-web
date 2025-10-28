"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2HeaderUI } from "./ui/h2-header.ui";
import GridPlus from "./GridPlus";

export default function ScrollSwapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theCoreRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const theCore = theCoreRef.current;
    const future = futureRef.current;
    const grid = gridRef.current;
    if (!container || !theCore || !future || !grid) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(future, { autoAlpha: 0 });
      gsap.set(grid, { yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(theCore, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }).to(
        future,
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        grid,
        {
          yPercent: -20,
          ease: "none",
        },
        0
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-white text-black min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden"
    >
      {/* Section Awal - Akan di-pin dan fade out */}
      <section id="the-core" ref={theCoreRef} className="z-10 opacity-100">
        <div className="w-full max-w-[1200px] flex flex-col gap-28">
          <H2HeaderUI
            className="leading-tight"
            text="At MERAI, we combine the precision of engineering with the intuition of design. Every website, app, and interface we create is crafted to perform beautifully and feel alive."
          />
          <p className="text-xl text-muted">
            We Build Digital Experiences That Move
          </p>
        </div>
      </section>

      {/* Section Baru - Awalnya tersembunyi, lalu muncul */}
      <section
        id="future-in-motion"
        ref={futureRef}
        className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 w-full max-w-[1200px]"
      >
        <H2HeaderUI
          className="leading-tight"
          text="The future isn`t something we wait for.
It`s something we build - line by line, pixel by pixel."
        />
      </section>

      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute left-0 right-0 z-0 pointer-events-none opacity-80"
        style={{ top: "-40%", bottom: "-40%" }}
      >
        <GridPlus
          stroke="rgba(0,0,0,0.25)"
          plusStroke="rgba(0,0,0,0.6)"
          bg="white"
        />
      </div>
    </div>
  );
}
