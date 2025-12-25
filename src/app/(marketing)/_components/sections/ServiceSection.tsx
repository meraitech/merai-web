/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import HeaderSection from "@/shared/components/HeaderSection";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/ui/Container";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";
import { IMAGE_SERVICE_1 } from "@/shared/constants/image";
import { useLayoutEffect } from "react";
import { gsap } from "@/shared/lib/gsap";

export default function ServiceSection() {
  const listServices = [
    {
      title: "Landing Page",
      description: "Creating an effective landing page with modern design",
    },
    {
      title: "Multi-page website",
      description: "Creating an effective landing page with modern design",
    },
    {
      title: "Catalogs and databases",
      description: "Creating an effective landing page with modern design",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      const stackWrap = document.querySelector(
        ".services-stack"
      ) as HTMLElement;

      // 3D perspective
      gsap.set(stackWrap, { perspective: 1200 });

      // --- 1) Initial stacked state (depan lebih besar)
      const scaleStep = 0.2;

      cards.forEach((card, i) => {
        gsap.set(card, {
          transformStyle: "preserve-3d",
          transformOrigin: "50% 100%",
          force3D: true,
          // stack: depan besar, belakang kecil
          scale: 1 - i * scaleStep,
          z: 0,
          rotateX: 0,
          zIndex: cards.length - i,
          willChange: "transform",
          backdropFilter: "blur(10px)",
          webkitBackdropFilter: "blur(10px)",
        });
      });

      // timeline scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 120}%`,
          scrub: true,
          pin: true,
          markers: true,
          invalidateOnRefresh: true,
        },
      });

      // --- 2) Per card: maju dulu -> baru jatuh
      // Slot durasi per card: 1 (maju) + 1 (jatuh) = 2
      const slot = 2;

      cards.forEach((card, i) => {
        const t0 = i * slot;

        // Phase A: maju jadi "front card"
        tl.to(
          card,
          {
            scale: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            ease: "none",
            duration: 1,
            backdropFilter: "blur(10px)",
            webkitBackdropFilter: "blur(10px)",
          },
          t0
        );

        // Phase B: jadi depan -> membesar -> jatuh ke depan -> keluar
        tl.to(
          card,
          {
            scale: 1.18,
            rotateX: -80, // jatuh ke arah kamera
            z: 380, // maju ke depan (ke kamera)
            y: 260, // bantu keluar frame tanpa opacity
            ease: "none",
            opacity: 0,
            duration: 1,
            backdropFilter: "blur(10px)",
            webkitBackdropFilter: "blur(10px)",
          },
          t0 + 1
        );

        tl.to(
          ".container-service",
          {
            opacity: 0,
          },
          cards.length * slot - 1
        );
      });

      // --- 3) Opsional tapi sangat membantu:
      // Saat card depan jatuh, card di belakangnya "ikut maju sedikit"
      // supaya transisi terasa hidup, bukan lompat.
      cards.forEach((nextCard, i) => {
        if (i === 0) return;
        const t0 = (i - 1) * slot + 1; // saat card sebelumnya mulai jatuh

        tl.to(
          nextCard,
          {
            scale: 1,
            y: 0,
            ease: "none",
            duration: 1,
            backdropFilter: "blur(10px)",
            webkitBackdropFilter: "blur(10px)",
          },
          t0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="px-4 lg:px-8 h-[350dvh] flex justify-center"
    >
      <ContainerPadding>
        <Container>
          <div className="container-service flex flex-col justify-center h-[35dvh] gap-8 lg:gap-12">
            <HeaderSection
              title="Our Services"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore accusantium minus quisquam natus error! Vero dolor totam nostrum laborum."
            />
            <ul className="services-stack flex flex-col gap-4 lg:gap-8 duration-300 items-center relative">
              {listServices.map((item, index) => (
                <li
                  key={index}
                  style={{ zIndex: index }}
                  className="service-card flex absolute bg-white/40"
                >
                  <div className="text-center w-100 aspect-3/4">
                    <Card>
                      <div className="flex flex-col gap-4 h-full justify-between items-center relative">
                        {/* top  */}
                        <div className="p-4 lg:p-6 uppercase text-xs flex text-background gap-1 font-haffer-mono-regular">
                          <p className="bg-muted py-1 px-2 rounded-full">
                            mermbership
                          </p>
                          <p className="bg-muted py-1 px-2 rounded-sm">
                            part of the
                          </p>
                        </div>

                        {/* content  */}
                        <div className="flex flex-col gap-4 px-4 lg:px-6">
                          <TypographyH3 text={item.title} />
                          <p className="max-md:text-xs text-sm text-paragraph max-w-3xs mx-auto">
                            {item.description}
                          </p>
                        </div>

                        {/* bottom  */}
                        <div className="w-full h-3/7 lg:pl-8 md:pl-6 pl-4">
                          <img
                            src={IMAGE_SERVICE_1}
                            alt=""
                            className="object-cover w-full h-full object-top-left rounded-tl-2xl"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </ContainerPadding>
    </section>
  );
}
