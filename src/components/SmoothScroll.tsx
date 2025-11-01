"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type LenisWindow = Window & { __lenis?: Lenis };

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

    if (typeof window !== "undefined") {
      (window as LenisWindow).__lenis = lenis;
    }

    const ticker = (time: number) => {
      lenis.raf(time * 1000); // gsap uses seconds; lenis expects ms
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const handleLenisStop = () => lenis.stop();
    const handleLenisStart = () => lenis.start();
    window.addEventListener("lenis:stop", handleLenisStop);
    window.addEventListener("lenis:start", handleLenisStart);

    return () => {
      if (typeof window !== "undefined") {
        const typedWindow = window as LenisWindow;
        if (typedWindow.__lenis === lenis) {
          delete typedWindow.__lenis;
        }
      }

      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(1000, 16);
      window.removeEventListener("lenis:stop", handleLenisStop);
      window.removeEventListener("lenis:start", handleLenisStart);
    };
  }, []);

  return null;
}
