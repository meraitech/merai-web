"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function QuotesDepth() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLDivElement | null>(null);
  const data = [
    {
      span: "KODE MURNI",
      title: "Dibangun dari Kode, Bukan Template.",
      description:
        "Next.js & TypeScript dari nol—cepat, aman, dan sepenuhnya milik Anda.",
      className: "quotes-perspective-left",
    },
    {
      span: "MOTION & 3D",
      title: "Desain yang Bergerak, Pengalaman Bernyawa.",
      description:
        "GSAP + Three.js menghadirkan interaksi halus yang melekat di ingatan.",
      className: "quotes-perspective-right",
    },
    {
      span: "SIAP MASA DEPAN",
      title: "Arsitektur Skalabel, AI-Ready",
      description:
        "Modular, SEO-first, siap integrasi AI & blockchain saat Anda butuh.",
      className: "quotes-perspective-left third",
    },
  ];
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // WAJIB: register plugin dulu
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000", // lebih simpel
          scrub: 1,
          pin: true,
          snap: {
            snapTo: [0, 0.33, 0.66, 1],
            duration: { min: 0.2, max: 0.4 },
            ease: "power2.inOut",
          },
          // markers: true,       // ⬅️ debugging
        },
      });

      // animasi depth
      tl.to(perspectiveRef.current, { z: 500 }, 0); // 35rem ≈ 560px (1rem ~16px)

      // pastikan item ada sebelum set
      const firstAnim = itemRefs.current[0];
      const secondAnim = itemRefs.current[1];

      if (firstAnim) tl.set(firstAnim, { opacity: 0 }, 0.25);
      if (secondAnim) tl.set(secondAnim, { opacity: 0 }, 0.4);
    }, triggerRef); // ctx scope agar revert aman

    return () => ctx.revert();
  }, [data.length]);

  return (
    <div>
      <div ref={triggerRef} className="quotes-perspective ">
        <div ref={perspectiveRef} className="quotes-perspective-inner ">
          {data.map((wcu, index) => (
            <div
              key={index}
              className={
                wcu.className +
                " backdrop-blur-sm border pointer-events-none border-foreground/10 p-(--p-container-sm) sm:p-(--p-container) aspect-4/5 flex flex-col justify-between"
              }
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <span className="text-muted text-xs uppercase">{wcu.span}</span>
              <div className="grid gap-2">
                <h2 className="sm:text-lg lg:text-xl ">{wcu.title}</h2>
                <p className="text-foreground/80 text-sm">{wcu.description}</p>
              </div>
              {/* <div className="flex gap-3 max-md:gap-2 items-center mt-3">
                <img
                  src={"/"}
                  alt={wcu.alt}
                  draggable={false}
                  className="w-8 max-md:w-6 aspect-square object-cover rounded-full border border-white/20"
                />
                <span className="text-sm max-md:text-xs text-muted">
                  {wcu.title}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
