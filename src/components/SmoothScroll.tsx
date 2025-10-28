"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // smoothTouch: false,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    const updateScroll = () => ScrollTrigger.update();
    lenis.on("scroll", updateScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000); // gsap uses seconds; lenis expects ms
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(1000, 16);
    };
  }, []);

  return null;
}
