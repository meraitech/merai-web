"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 dark:bg-white dark:text-neutral-900",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
