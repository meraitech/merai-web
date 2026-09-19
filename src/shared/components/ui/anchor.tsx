"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface AnchorProps extends ComponentPropsWithoutRef<"a"> {}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor({ className, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        className={cn("transition-colors", className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);
