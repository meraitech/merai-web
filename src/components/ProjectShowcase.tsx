"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ProjectShowcase() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLDivElement | null>(null);
  const data = [
    {
      text: "adsasd",
      image: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
      className: "project-perspective-left",
    },
    {
      text: "adsasd",
      image: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
      className: "project-perspective-right",
    },
    {
      text: "adsasd",
      image: "/img/contents/Merai_Team_01-2200x1650.jpg",
      alt: "alt",
      className: "project-perspective-left third",
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
          snap: 1 / data.length,
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
              className={project.className}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <img src={project.image} alt={project.alt} />
              <div className="">
                <h2>{project.text}</h2>
                <Link href={"/#"}>
                  <span>Discover</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
