"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

type NewsCardProps = {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt?: string;
  date: string;
  readTime: string;
  index?: number;
};

export function NewsCard({
  slug,
  image,
  category,
  title,
  excerpt,
  date,
  readTime,
  index = 0,
}: NewsCardProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease }}
    >
      <Link href={`/news/${slug}`} className="group block">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-accent">{category}</span>
          <span
            aria-hidden="true"
            className="text-xs text-neutral-500 dark:text-neutral-400"
          >
            ·
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {date}
          </span>
          <span
            aria-hidden="true"
            className="text-xs text-neutral-500 dark:text-neutral-400"
          >
            ·
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {readTime}
          </span>
        </div>
        <h3 className="text-xl font-medium font-serif text-neutral-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        {excerpt ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        ) : null}
      </Link>
    </motion.div>
  );
}
