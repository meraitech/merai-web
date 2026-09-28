"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import BlackHole from "./black-hole";

// Static stand-in for software-GL clients (same gradient as BlackHole's own
// no-WebGL2 fallback) — raymarching 240 steps/px on a CPU rasterizer is what
// melts weak machines, so never start the loop there.
const FALLBACK_BG =
  "radial-gradient(circle at 50% 48%, rgba(0,0,0,1) 22%, rgba(168,85,247,0.14) 26%, rgba(255,176,84,0.10) 30%, rgba(8,7,12,1) 55%)";

function isSoftwareGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|softpipe|basic render|software rasterizer/i.test(
      renderer,
    );
  } catch {
    return false;
  }
}

// Hero integration for BlackHole: full-bleed cinematic backdrop filling the
// hero card. Drag-orbit on desktop; touch passthrough on mobile so the
// fullscreen canvas never swallows page scroll. The raymarcher runs at DPR 1
// (visually lossless under bloom/grain/vignette, ~55% fewer fragments on
// retina) and is fully halted offscreen, on tab-hide, under reduced motion,
// or on software rasterizers.
export function HeroBlackHole(): ReactNode {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [softwareGL, setSoftwareGL] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const host = hostRef.current?.parentElement;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        setInView(entries[0]?.isIntersecting ?? true);
      },
      { rootMargin: "80px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setHidden(document.hidden);
    setSoftwareGL(isSoftwareGL());
    const onVis = (): void => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden sm:pointer-events-auto"
    >
      {softwareGL ? (
        <div className="h-full w-full" style={{ background: FALLBACK_BG }} />
      ) : (
        <BlackHole
          className="h-full w-full"
          steps={240}
          rotationSpeed={1}
          maxDpr={1}
          paused={!inView || reducedMotion || hidden}
        />
      )}
    </div>
  );
}
