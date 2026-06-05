"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TimelineEntry {
  id: number;
  image: string;
}

interface About2Props {
  displayNavigation?: boolean;
}

const TIMELINE_DATA: TimelineEntry[] = [
  { id: 1, image: "/svg/placeholder.svg" },
  { id: 2, image: "/svg/placeholder.svg" },
  { id: 3, image: "/svg/placeholder.svg" },
  { id: 4, image: "/svg/placeholder.svg" },
  { id: 5, image: "/svg/placeholder.svg" },
  { id: 6, image: "/svg/placeholder.svg" },
];

export default function About2({ displayNavigation = true }: About2Props = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % TIMELINE_DATA.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [resetKey]);

  const scrollToIndex = (index: number) => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const itemWidth = container.scrollWidth / TIMELINE_DATA.length;
      const scrollPosition = itemWidth * index;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
    setResetKey((prev) => prev + 1);
  };

  const handleNext = () => {
    const newIndex = Math.min(TIMELINE_DATA.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
    setResetKey((prev) => prev + 1);
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
    setResetKey((prev) => prev + 1);
  };

  const activeEntry = TIMELINE_DATA[activeIndex];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <Header />

        {/* Content Card */}
        <ContentCard entry={activeEntry} />

        {/* Timeline */}
        <div className="mt-12 sm:mt-16">
          <Timeline
            activeIndex={activeIndex}
            onIndexChange={handleIndexChange}
            displayNavigation={displayNavigation}
            onPrevious={handlePrevious}
            onNext={handleNext}
            timelineRef={timelineRef}
          />
        </div>
      </div>
    </section>
  );
}

function Header() {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-12"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 dark:text-white">
        {t("About.timeline.heading")}
      </h1>
    </motion.div>
  );
}

function ContentCard({ entry }: { entry: TimelineEntry }) {
  const t = useTranslations();

  return (
    <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-between h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`year-${entry.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Date */}
              <div className="text-sm sm:text-base font-medium text-purple-500">
                {t(`About.timeline.entry${entry.id}.date`)}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${entry.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {/* Title */}
              <h2 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-white">
                {t(`About.timeline.entry${entry.id}.title`)}
              </h2>

              {/* Description */}
              <p className="text-base tracking-tight text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                {t(`About.timeline.entry${entry.id}.description`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full lg:max-w-xs aspect-square max-h-[300px] mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="w-full h-full rounded-md bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                <img
                  src={entry.image}
                  alt={t(`About.timeline.entry${entry.id}.title`)}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Timeline({
  activeIndex,
  onIndexChange,
  displayNavigation,
  onPrevious,
  onNext,
  timelineRef,
}: {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  displayNavigation: boolean;
  onPrevious: () => void;
  onNext: () => void;
  timelineRef: React.RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations();

  return (
    <div className="space-y-8">
      {/* Scrollable Timeline Container - Mobile */}
      <div
        ref={timelineRef}
        className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="min-w-[900px] space-y-8">
          {/* Timeline Labels */}
          <div className="grid grid-cols-6 gap-8">
            {TIMELINE_DATA.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => onIndexChange(index)}
                className="text-left whitespace-nowrap"
              >
                <div
                  className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    index === activeIndex
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  {t(`About.timeline.entry${entry.id}.title`)}
                </div>
              </button>
            ))}
          </div>

          {/* Timeline Bar */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2" />

            {/* Progress Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2"
              initial={false}
              animate={{
                width:
                  activeIndex === 0
                    ? 0
                    : `calc(((100% - (5 * 2rem)) / 6) * ${activeIndex} + (2rem * ${activeIndex}))`,
              }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />

            {/* Timeline Dots */}
            <div className="relative grid grid-cols-6 gap-8">
              {TIMELINE_DATA.map((entry, index) => {
                const isActive = index === activeIndex;
                const isPassed = index <= activeIndex;

                return (
                  <button
                    key={entry.id}
                    onClick={() => onIndexChange(index)}
                    className="flex flex-col items-start"
                  >
                    <div className="relative w-full flex justify-start">
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 ${
                          isPassed
                            ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
                            : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800"
                        }`}
                        animate={{
                          scale: isActive ? 1.4 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Dates */}
          <div className="grid grid-cols-6 gap-8">
            {TIMELINE_DATA.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => onIndexChange(index)}
                className="text-left whitespace-nowrap"
              >
                <div
                  className={`text-xs sm:text-sm transition-colors duration-200 ${
                    index === activeIndex
                      ? "text-neutral-900 dark:text-white font-medium"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  {t(`About.timeline.entry${entry.id}.date`)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Mobile Centered */}
      {displayNavigation && (
        <div className="flex justify-center gap-2 md:hidden">
          <button
            onClick={onPrevious}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={t("Common.aria.previous")}
          >
            <ChevronLeft className="w-5 h-5 text-neutral-900 dark:text-white" />
          </button>
          <button
            onClick={onNext}
            disabled={activeIndex === TIMELINE_DATA.length - 1}
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={t("Common.aria.next")}
          >
            <ChevronRight className="w-5 h-5 text-neutral-900 dark:text-white" />
          </button>
        </div>
      )}

      {/* Desktop Timeline */}
      <div className="hidden md:block space-y-8">
        {/* Timeline Labels */}
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {TIMELINE_DATA.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onIndexChange(index)}
              className="text-left"
            >
              <div
                className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  index === activeIndex
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-600"
                }`}
              >
                {t(`About.timeline.entry${entry.id}.title`)}
              </div>
            </button>
          ))}
        </div>

        {/* Timeline Bar */}
        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2" />

          {/* Progress Line */}
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2 sm:hidden"
            initial={false}
            animate={{
              width:
                activeIndex === 0
                  ? 0
                  : `calc(((100% - (5 * 0.5rem)) / 6) * ${activeIndex} + (0.5rem * ${activeIndex}))`,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          />

          {/* Progress Line - Tablet/Desktop */}
          <motion.div
            className="hidden sm:block absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2"
            initial={false}
            animate={{
              width:
                activeIndex === 0
                  ? 0
                  : `calc(((100% - (5 * 1rem)) / 6) * ${activeIndex} + (1rem * ${activeIndex}))`,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          />

          {/* Timeline Dots */}
          <div className="relative grid grid-cols-6 gap-2 sm:gap-4">
            {TIMELINE_DATA.map((entry, index) => {
              const isActive = index === activeIndex;
              const isPassed = index <= activeIndex;

              return (
                <button
                  key={entry.id}
                  onClick={() => onIndexChange(index)}
                  className="flex flex-col items-start"
                >
                  {/* Dot */}
                  <div className="relative w-full flex justify-start">
                    <motion.div
                      className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 ${
                        isPassed
                          ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
                          : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800"
                      }`}
                      animate={{
                        scale: isActive ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Dates */}
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {TIMELINE_DATA.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onIndexChange(index)}
              className="text-left"
            >
              <div
                className={`text-xs border transition-colors w-fit px-2 py-1 rounded-full duration-200 ${
                  index === activeIndex
                    ? "text-white bg-neutral-900 border-neutral-500/20"
                    : "text-neutral-400 dark:text-neutral-600 border-transparent"
                }`}
              >
                {t(`About.timeline.entry${entry.id}.date`)}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Arrows - Desktop Only */}
        {displayNavigation && (
          <div className="hidden md:flex justify-end gap-2">
            <button
              onClick={onPrevious}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t("Common.aria.previous")}
            >
              <ChevronLeft className="w-4 h-4 text-neutral-900 dark:text-white" />
            </button>
            <button
              onClick={onNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className="w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t("Common.aria.next")}
            >
              <ChevronRight className="w-4 h-4 text-neutral-900 dark:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
