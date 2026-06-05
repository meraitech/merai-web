"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Work } from "@/features/works/data/works";

interface Props {
  work: Work;
}

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "overview", title: "Platform Overview" },
  { id: "key-features", title: "Key Features" },
  { id: "use-cases", title: "Common Use Cases" },
  { id: "conclusion", title: "Conclusion" },
];

const sources = [
  {
    name: "TechCrunch",
    title: "Breaking: New Platform Launches with AI Integration...",
    color: "bg-green-500",
  },
  {
    name: "Wired",
    title: "How This Startup is Changing Developer Workflows...",
    color: "bg-purple-500",
  },
  {
    name: "The Verge",
    title: "Exclusive: Inside the Future of Code Generation...",
    color: "bg-orange-500",
  },
];

export function Blog5({ work }: Props) {
  const t = useTranslations("WorkDetail");

  return (
    <article className="w-full bg-white dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-21/9 sm:aspect-3/1 overflow-hidden"
      >
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
          {t("photoCredit")} · unsplash.com
        </div>
      </motion.div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="flex-1 min-w-0">
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
                  {work.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                      {work.client[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {t("clientLabel")}{" "}
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {work.client}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 ml-auto">
                    <span className="flex items-center gap-1">
                      {t("yearLabel")}: {work.year}
                    </span>
                  </div>
                </div>
              </motion.header>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-neutral dark:prose-invert max-w-none mb-8"
              >
                <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  {t("caseStudyComing")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8"
              >
                {sources.map((source, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded ${source.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {source.name[0]}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">
                        {source.name}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                        {source.title}
                      </span>
                    </div>
                  </a>
                ))}
                <button className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    +6 sources
                  </span>
                </button>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block w-64 shrink-0"
            >
              <nav className="sticky top-8">
                <ul className="space-y-1 border-l-2 border-neutral-200 dark:border-neutral-800">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block pl-4 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </div>
        </div>
      </div>
    </article>
  );
}
