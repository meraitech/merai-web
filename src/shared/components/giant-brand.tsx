"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const SPECTRUM_CLASS =
  "bg-[linear-gradient(90deg,#ff5c7a,#ffb340,#ffe14d,#57e6a8,#4cc9ff,#8b7bff,#ff5cd3,#ff5c7a)]";

const PROBE_PX = 100;
const FILL = 0.98;
const GLOW_R = 0.9;

export function GiantBrand({
  text = "Merai",
  className,
}: {
  text?: string;
  className?: string;
}): ReactNode {
  const colRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);
  const rawOn = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.5 });
  const on = useSpring(rawOn, { stiffness: 120, damping: 22 });
  const radius = useMotionValue(120);
  const mask = useMotionTemplate`radial-gradient(${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 58%, transparent 100%)`;

  useEffect(() => {
    const col = colRef.current;
    const row = rowRef.current;
    if (!col || !row) return;

    const measure = (): number => {
      const prevCol = col.style.fontSize;
      col.style.fontSize = `${PROBE_PX}px`;
      const ratio = row.getBoundingClientRect().width / PROBE_PX;
      col.style.fontSize = prevCol;
      return ratio;
    };
    let ratio = 0;
    const fit = (): void => {
      if (!ratio) ratio = measure();
      if (!ratio) return;
      const size = (col.clientWidth * FILL) / ratio;

      col.style.fontSize = `${size}px`;
      col.style.height = `${size * 0.72}px`;
      radius.set(size * 0.72 * GLOW_R);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(col);

    document.fonts?.ready.then(() => {
      ratio = 0;
      fit();
    });
    return () => ro.disconnect();
  }, [radius, text]);

  const onMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
    rawOn.set(1);
  };
  const onEnter = (e: PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();

    x.jump(e.clientX - r.left);
    y.jump(e.clientY - r.top);
  };

  const rowClass =
    "absolute bottom-[-0.32em] left-1/2 flex -translate-x-1/2 items-end gap-[0.12em] leading-none font-medium tracking-[-0.05em] whitespace-nowrap select-none";

  return (
    <div
      ref={colRef}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={() => rawOn.set(0)}
      className="relative h-[15vw] overflow-hidden"
    >
      <div ref={rowRef} className={`${rowClass} ${className ?? ""}`}>
        <span>{text}</span>
      </div>
      {!reducedMotion && (
        <motion.div
          style={{
            opacity: on,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
          className="absolute inset-0"
        >
          <div
            className={`${SPECTRUM_CLASS} ${rowClass} [background-size:200%_100%] bg-clip-text text-transparent motion-safe:animate-[spectrum-drift_14s_linear_infinite]`}
          >
            <span>{text}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
