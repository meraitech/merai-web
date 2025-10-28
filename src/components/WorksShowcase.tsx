"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

type WorkItem = {
  company: string;
  date: string;
  imageUrl: string;
  description: string;
  accent: string;
};

const WORKS: WorkItem[] = [
  {
    company: "Starbucks Cafe",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company.webp",
    description:
      "A kinetic storefront that adapts to customer intent, blending motion design with headless commerce.",
    accent: "from-[#9f3fff] via-[#5f3dff] to-[#2f9dff]",
  },
  {
    company: "Flux OS",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company.webp",
    description:
      "Live data orchestration with volumetric UI depth, crafted for ultra-fast decision loops.",
    accent: "from-[#ff7c6e] via-[#ff4f9f] to-[#813fff]",
  },
  {
    company: "Nimbus Robotics",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company.webp",
    description:
      "Control interfaces engineered for precision robotics - calibrated for clarity in high-pressure teams.",
    accent: "from-[#42d392] via-[#32a9ff] to-[#3a68ff]",
  },
  {
    company: "Solstice Studio",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company.webp",
    description:
      "Interactive narrative that channels sound, light, and motion to express a bold creative identity.",
    accent: "from-[#ffd65a] via-[#ff9f3f] to-[#ff3f62]",
  },
  {
    company: "Kairo AI",
    date: "2025 10.28",
    imageUrl: "/img/contents/project-company.webp",
    description:
      "Sensor-fed interface visualizing anomaly detection with confidence shading and adaptive focus.",
    accent: "from-[#6cffcb] via-[#54c1ff] to-[#3f6bff]",
  },
];

export default function WorksShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement =>
      Boolean(card)
    );

    if (!container || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 640;
      const isTablet = screenWidth >= 640 && screenWidth < 1024;
      const outgoingX = isMobile ? -55 : isTablet ? -68 : -75;
      const outgoingY = isMobile ? 18 : isTablet ? 24 : 28;
      const incomingX = isMobile ? 55 : isTablet ? 65 : 75;
      const incomingY = isMobile ? -26 : isTablet ? -30 : -34;
      const outgoingRotate = isMobile ? -6 : -8;
      const incomingRotate = isMobile ? 8 : 10;
      const outgoingRotateY = isMobile ? 10 : 15;
      const incomingRotateY = isMobile ? -12 : -18;
      const outgoingScale = isMobile ? 0.92 : 0.88;
      const incomingScale = isMobile ? 0.95 : 0.9;

      gsap.set(cards, {
        transformOrigin: "center center",
        transformPerspective: 1200,
        autoAlpha: 0,
        scale: 0.9,
      });

      const firstCard = cards[0];
      if (firstCard) {
        gsap.set(firstCard, {
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          rotateY: 0,
        });
      }

      const steps = Math.max(cards.length - 1, 1);
      const snapConfig =
        steps > 0
          ? {
              snapTo: (value: number) => Math.round(value * steps) / steps,
              duration: { min: 0.3, max: 0.6 },
              ease: "power1.inOut",
            }
          : undefined;

      const timeline = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * cards.length}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          snap: snapConfig,
        },
      });

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;

        timeline.to(card, {
          xPercent: outgoingX,
          yPercent: outgoingY,
          rotate: outgoingRotate,
          rotateY: outgoingRotateY,
          autoAlpha: 0,
          scale: outgoingScale,
          ease: "power3.inOut",
        });

        timeline.fromTo(
          next,
          {
            xPercent: incomingX,
            yPercent: incomingY,
            rotate: incomingRotate,
            rotateY: incomingRotateY,
            autoAlpha: 0,
            scale: incomingScale,
          },
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            rotateY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "power3.out",
          },
          "<"
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const works = useMemo(() => WORKS, []);

  return (
    <section id="works-showcase" ref={containerRef} className="relative w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2 className="hidden">Our Works</h2>
        <div className="flex h-full flex-col justify-center gap-8 md:gap-10 px-4 sm:px-10 lg:px-16">
          <div
            ref={cardsWrapperRef}
            className="relative flex w-full items-center justify-center"
          >
            {works.map((work, index) => (
              <article
                key={work.company}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="pointer-events-none absolute flex w-[88vw] sm:w-3/4 max-w-[960px] flex-col gap-8 sm:gap-10 md:gap-12 opacity-0"
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: works.length - index,
                }}
              >
                <div className="flex flex-col justify-between w-full aspect-video backdrop-blur-sm border border-foreground/10 shadow-[0_35px_80px_rgba(0,0,0,0.45)] overflow-hidden bg-black/40">
                  <Image
                    src={work.imageUrl}
                    width={1920}
                    height={1080}
                    alt={work.company + " Content"}
                  />
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-foreground/50 uppercase">
                    {work.date}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl text-balance">
                    {work.company}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 md:text-lg">
                    {work.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
