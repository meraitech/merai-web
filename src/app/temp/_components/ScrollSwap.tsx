"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2HeaderUI } from "../../components/ui/h2-header.ui";
import GridPlus from "../../components/GridPlus";
import Image from "next/image";

export default function ScrollSwapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theCoreRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const howWeWork = [
    "Semua Dimulai dari Pemahaman yang Mendalam",
    "Dari Ide Menjadi Pengalaman yang Hidup",
    "Kode Murni untuk Hasil yang Sempurna",
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
      className="relative bg-black min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Section Awal - Akan di-pin dan fade out */}
      <section
        id="services"
        ref={theCoreRef}
        className="z-10 opacity-100 w-full h-screen px-(--p-container) flex flex-col items-center justify-center gap-12"
      >
        <H2HeaderUI
          headerText="Di Balik Kode Ada Seni"
          p="Setiap langkah kami jalankan dengan ketelitian dan visi — agar setiap hasil terasa hidup dan bermakna."
        />
        <ul className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howWeWork.map((content, index) => (
            <li
              key={index}
              className="backdrop-blur-xs border border-foreground/20 w-full max-md:aspect-3/1 md:aspect-2/1 lg:aspect-square p-(--p-container-sm) md:p-(--p-container) duration-300 flex flex-col gap-4 md:gap-10 justify-between"
            >
              <span className="text-3xl md:text-7xl">{index + 1}</span>
              <p className="md:text-xl">{content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section Baru - Awalnya tersembunyi, lalu muncul */}
      <section
        id="future-in-motion"
        ref={futureRef}
        className="z-10 absolute transform opacity-0 w-full pointer-events-none h-full"
      >
        <div className="relative flex items-center justify-center w-full h-full  px-(--p-container)">
          <div className="grid grid-cols-2 max-w-[1200px] w-full relative">
            <div className="z-10 ">
              <Image
                src={"/img/contents/landing/albert-einstein.webp"}
                alt=""
                width={1080}
                height={1080}
                className=" object-contain w-full"
              />
            </div>

            <div className="absolute bottom-0 border border-foreground/20 w-full h-4/5 max-md:h-full z-0 backdrop-blur-xs flex justify-end">
              <blockquote className="w-1/2 flex flex-col z-10 my-auto gap-6 max-md:gap-4 pr-6">
                <span className="italic leading-tight text-xs sm:text-2xl lg:text-3xl">
                  "Logic will get you from A to B. Imagination will take you
                  everywhere"
                </span>
                <cite className="not-italic max-sm:text-xs max-md:text-sm text-lg">
                  Albert Einstein
                </cite>
              </blockquote>
            </div>
            <div className="bg-linear-to-t absolute bottom-0 w-full h-full from-black via-transparent z-10 "></div>
          </div>
        </div>
      </section>

      {/* Background Grid */}
      <div
        ref={gridRef}
        className="scrollswap-grid absolute left-0 right-0 z-0 pointer-events-none opacity-40"
      >
        <GridPlus
          stroke="rgba(255,255,255,0.25)"
          plusStroke="rgba(255,255,255,0.6)"
          bg="#000"
        />
      </div>
    </div>
  );
}
