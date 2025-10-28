"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2HeaderUI } from "./ui/h2-header.ui";
import GridPlus from "./GridPlus";
import FlowingMenu from "./FlowingMenu";

export default function ScrollSwapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theCoreRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const servicesItems = [
    {
      link: "#",
      text: "Web Development",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "SEO",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "API Integration",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "System Design",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      link: "#",
      text: "AI Integration",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      link: "#",
      text: "Blockchain Integration",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];

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
      className="relative text-black min-h-screen flex flex-col justify-center items-center  py-16  sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Section Awal - Akan di-pin dan fade out */}
      <section
        id="services"
        ref={theCoreRef}
        className="z-10 opacity-100 w-full"
      >
        <div className="w-full flex flex-col gap-12">
          <H2HeaderUI
            className="leading-tight text-balance px-4 md:px-8 mx-auto max-w-[1200px] w-full"
            text="Services"
          />
          <div
            style={{ height: "500px", position: "relative" }}
            className="w-full"
          >
            <FlowingMenu items={servicesItems} />
          </div>
        </div>
      </section>

      {/* Section Baru - Awalnya tersembunyi, lalu muncul */}
      <section
        id="future-in-motion"
        ref={futureRef}
        className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 w-full max-w-[1200px] px-8 pointer-events-none"
      >
        <H2HeaderUI
          className="leading-tight text-balance text-center sm:text-left"
          text="Masa depan bukanlah sesuatu yang kita tunggu-tunggu. Itu adalah sesuatu yang kita bangun - baris demi baris, piksel demi piksel."
        />
      </section>

      {/* Background Grid */}
      <div
        ref={gridRef}
        className="scrollswap-grid absolute left-0 right-0 z-0 pointer-events-none"
      >
        <GridPlus
          stroke="rgba(0,0,0,0.25)"
          plusStroke="rgba(0,0,0,0.6)"
          bg="#FFFDFA"
        />
      </div>
    </div>
  );
}
