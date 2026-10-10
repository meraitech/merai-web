"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AsciiImage } from "@/shared/components/ui/ascii-image";

export interface ServiceCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

// Static ASCII card (replaces the WebGL hover-bulge canvas): the photo
// renders as ASCII art, hover is a CSS zoom. No GL context, no loop —
// inherently still under reduced motion.
export function ServiceCard({
  title,
  imageSrc,
  imageAlt,
  index,
}: ServiceCardProps): ReactNode {
  return (
    <motion.div
      className="group relative border border-neutral-200/60 dark:border-neutral-800/60 aspect-4/5 w-full overflow-hidden rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        <AsciiImage imageSrc={imageSrc} alt={imageAlt} lazy />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <h3 className="text-2xl font-bold font-serif text-white md:text-3xl">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
