"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { useCursorHover } from "@/shared/components/ui/cursor-context";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  cursorName?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, children, cursorName = "Click Me", ...props }, ref) {
    const hover = useCursorHover(cursorName);

    return (
      <button
        ref={ref}
        className={cn(
          "cursor-none inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 dark:bg-white dark:text-neutral-900",
          className,
        )}
        {...hover}
        {...props}
      >
        {children}
      </button>
    );
  },
);
