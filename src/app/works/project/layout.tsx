"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { workProjects } from "../projects";

type WorksLayoutProps = {
  children: ReactNode;
};

export default function WorksLayout({ children }: WorksLayoutProps) {
  const params = useParams<{ workId?: string }>();
  const workId = params?.workId;
  const currentId = workId ? Number(workId) : null;
  const isValidId = currentId !== null && !Number.isNaN(currentId);

  const activeIndex = useMemo(() => {
    if (!isValidId || currentId === null) return 0;
    const index = workProjects.findIndex((project) => project.id === currentId);
    return index >= 0 ? index : 0;
  }, [currentId, isValidId]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);
  const dragStateRef = useRef<{
    isDragging: boolean;
    startX: number;
    scrollLeft: number;
    pointerId: number | null;
    pointerType: PointerEvent["pointerType"] | null;
  }>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: null,
    pointerType: null,
  });
  const [sidePadding, setSidePadding] = useState(24);

  // Log untuk debugging - cek apakah layout re-render
  useEffect(() => {
    console.log("🔄 Layout mounted/updated - workId:", workId);
  }, [workId]);

  useEffect(() => {
    const computePadding = () => {
      const viewportWidth = window.innerWidth;
      const baseContentWidth = 1200;
      const minPadding = 24;
      const calculated = Math.max(
        (viewportWidth - baseContentWidth) / 2,
        minPadding
      );
      setSidePadding(calculated);
    };

    computePadding();
    window.addEventListener("resize", computePadding);
    return () => window.removeEventListener("resize", computePadding);
  }, []);

  // Auto-scroll ke card yang aktif
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (!isValidId || currentId === null) {
      container.scrollTo({
        left: 0,
        behavior: isMountedRef.current ? "smooth" : "auto",
      });
      isMountedRef.current = true;
      return;
    }

    const activeCard = container.querySelector<HTMLElement>(
      `[data-work-id="${currentId}"]`
    );

    if (!activeCard) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const paddingLeft =
      parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const targetScroll =
      container.scrollLeft + (cardRect.left - containerRect.left) - paddingLeft;

    container.scrollTo({
      left: targetScroll,
      behavior: isMountedRef.current ? "smooth" : "auto",
    });

    isMountedRef.current = true;
  }, [currentId, isValidId, sidePadding]);

  // Drag to scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handlePointerDown = (event: PointerEvent) => {
      dragStateRef.current.pointerId = event.pointerId;
      dragStateRef.current.startX = event.clientX;
      dragStateRef.current.scrollLeft = container.scrollLeft;
      dragStateRef.current.isDragging = false;
      dragStateRef.current.pointerType = event.pointerType ?? null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (dragStateRef.current.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - dragStateRef.current.startX;
      const pointerType = dragStateRef.current.pointerType ?? "mouse";
      const threshold =
        pointerType === "touch" ? 20 : pointerType === "pen" ? 12 : 18;

      if (!dragStateRef.current.isDragging) {
        if (Math.abs(deltaX) < threshold) return;
        dragStateRef.current.isDragging = true;
        container.classList.add("cursor-grabbing");
        container.setPointerCapture(event.pointerId);
      }

      container.scrollLeft = dragStateRef.current.scrollLeft - deltaX;
    };

    const clearDrag = (event: PointerEvent) => {
      if (dragStateRef.current.pointerId !== event.pointerId) return;

      dragStateRef.current.isDragging = false;
      dragStateRef.current.pointerId = null;
      container.classList.remove("cursor-grabbing");
      dragStateRef.current.pointerType = null;
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", clearDrag);
    container.addEventListener("pointerleave", clearDrag);
    container.addEventListener("pointercancel", clearDrag);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", clearDrag);
      container.removeEventListener("pointerleave", clearDrag);
      container.removeEventListener("pointercancel", clearDrag);
    };
  }, []);

  return (
    <div className="mt-32 md:mt-40 flex flex-col gap-12 pb-16">
      {/* Navigation - TIDAK akan re-render */}
      <aside className="w-full">
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            className="group relative flex cursor-grab touch-pan-y select-none overflow-x-auto overflow-y-hidden pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingLeft: sidePadding,
              paddingRight: sidePadding,
            }}
          >
            <nav aria-label="Menu proyek" className="w-max">
              <ul
                className="flex items-stretch gap-4 md:gap-6"
                data-active-index={activeIndex}
              >
                {workProjects.map((project) => {
                  const isActive = isValidId && currentId === project.id;
                  return (
                    <li
                      key={project.id}
                      data-work-id={project.id}
                      className="relative shrink-0"
                    >
                      <Link
                        href={`/works/project/${project.id}`}
                        prefetch={true}
                        className={`group/card relative block aspect-video overflow-visible rounded-3xl border border-white/10 bg-background/40 transition-all duration-300 ${
                          isActive
                            ? "md:h-60 h-40 opacity-95"
                            : "md:h-40 h-28 opacity-40 hover:opacity-60"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={(event) => {
                          if (dragStateRef.current.isDragging) {
                            event.preventDefault();
                            return;
                          }
                        }}
                      >
                        <Image
                          alt={project.companyName}
                          src={project.imageUrl}
                          width={1280}
                          height={720}
                          draggable={false}
                          priority={isActive}
                          className="h-full w-full object-cover pointer-events-none transition-transform duration-500"
                        />

                        {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" /> */}
                      </Link>
                      {!isActive && (
                        <p
                          className={`pointer-events-none text-sm text-white/50 drop-shadow mt-4 md:text-base transition-opacity duration-300`}
                        >
                          {project.companyName}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {/* Children - HANYA ini yang berubah */}
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8">
        {children}
      </div>
    </div>
  );
}
