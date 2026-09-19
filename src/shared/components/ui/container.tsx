import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type SectionSpacing = "none" | "slim" | "generous";

const spacingMap: Record<SectionSpacing, string> = {
  none: "",
  // Slim band (e.g. logo marquee). Only exception to the section scale.
  slim: "py-16 sm:py-20",
  // Default section rhythm — matches the "new standard" reference section.
  generous: "py-24 sm:py-32",
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: SectionSpacing;
};

/**
 * Site-wide layout container — single source of truth for section width.
 *
 * Every section container must use this instead of ad-hoc
 * `max-w-[...] mx-auto px-...` classes so all sections align.
 */
export function Container({
  children,
  className,
  id,
  spacing = "none",
}: ContainerProps): ReactNode {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8",
        spacingMap[spacing],
        className
      )}
    >
      {children}
    </div>
  );
}
