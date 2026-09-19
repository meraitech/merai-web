"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type PanInfo } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";

type Step = {
  title: string;
  description: string;
  image: string;
};

export function HowItWorksCarousel(): ReactNode {
  const t = useTranslations("Home.howItWorks");

  const steps: Step[] = [
    {
      title: t("step1.title"),
      description: t("step1.description"),
      image: "/img/steps/describe.webp",
    },
    {
      title: t("step2.title"),
      description: t("step2.description"),
      image: "/img/steps/generate.webp",
    },
    {
      title: t("step3.title"),
      description: t("step3.description"),
      image: "/img/steps/refine.webp",
    },
    {
      title: t("step4.title"),
      description: t("step4.description"),
      image: "/img/steps/ship.webp",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && wrapperRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const maxDrag = Math.min(0, -(containerWidth - wrapperWidth));
        setConstraints({ left: maxDrag, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left + 16);
      cursorY.set(e.clientY - rect.top - 16);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    const velocity = info.velocity.x;
    const currentX = x.get();
    const momentumDistance = velocity * 0.3;
    let targetX = currentX + momentumDistance;

    if (targetX > 0) {
      targetX = 0;
    } else if (targetX < constraints.left) {
      targetX = constraints.left;
    }

    x.set(targetX);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-neutral-950">
      <Container
        spacing="none"
        className="pt-24 sm:pt-32"
      >
        <SectionHeading
          title={t("headingLine1")}
          accent={t("headingLine2")}
          className="mb-12"
        />
      </Container>

      <div
        ref={wrapperRef}
        className="relative pb-24 sm:pb-32"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          ref={containerRef}
          className="flex cursor-grab gap-2.5 pr-48 active:cursor-grabbing pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-87.5rem)/2+2rem))]"
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.15}
          dragTransition={{
            power: 0.3,
            timeConstant: 200,
            modifyTarget: (target) =>
              Math.max(constraints.left, Math.min(0, target)),
          }}
          onDragEnd={handleDragEnd}
          onDragStart={() => setIsDragging(true)}
          whileDrag={{ cursor: "grabbing" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group flex w-80 shrink-0 flex-col rounded-xl bg-neutral-500/10 px-6 pt-6 transition-colors duration-300 hover:bg-neutral-900 dark:bg-white/5 dark:hover:bg-white sm:w-96 md:w-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl tracking-tight text-neutral-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-white dark:group-hover:text-neutral-950">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-300 group-hover:text-white/70 dark:group-hover:text-neutral-950/70">
                {step.description}
              </p>

              <div className="relative mt-6 aspect-3/4 w-full h-80 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain object-top scale-90 grayscale"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 420px"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent dark:from-neutral-950 md:w-48"
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50 flex items-center justify-center rounded-full border border-neutral-900/10 dark:border-white/10 bg-white/20 dark:bg-neutral-950/20 px-4 py-2 text-xs font-medium tracking-tight text-white dark:text-neutral-50 backdrop-blur-md"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovering && !isDragging ? 1 : 0,
            scale: isHovering && !isDragging ? 1 : 0.8,
          }}
          transition={{ duration: 0.15 }}
        >
          Drag
        </motion.div>
      </div>
    </section>
  );
}
