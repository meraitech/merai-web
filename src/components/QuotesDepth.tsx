"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function QuotesDepth() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLDivElement | null>(null);
  const data = [
    {
      quotes: "Built from Nothing. Crafted from Code.",
      className: "project-perspective-left",
      founderName: "Ranaufal Muha",
      profileImage: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
    },
    {
      quotes: "Design that Breathes. Interfaces that Feel Alive.",
      className: "project-perspective-right",
      founderName: "Ahmad Rayhan",
      profileImage: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
    },
    {
      quotes: "Tomorrow is Not Coming. We`re Building It.",
      className: "project-perspective-left third",
      founderName: "Iqbal Muhakim",
      profileImage: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
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
      <div ref={triggerRef} className="project-perspective">
        <div ref={perspectiveRef} className="project-perspective-inner">
          {data.map((project, index) => (
            <div
              key={index}
              className={
                project.className +
                " backdrop-blur-sm border border-foreground/10 p-6 flex flex-col gap-1"
              }
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <h2 className="font-bold text-3xl">{project.quotes}</h2>
              <div className="flex gap-2 items-center mt-3">
                <img
                  src={project.profileImage}
                  alt={project.alt}
                  draggable={false}
                  className="w-5 aspect-square object-cover rounded-full"
                />
                <span className="text-xs text-muted">
                  {project.founderName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
