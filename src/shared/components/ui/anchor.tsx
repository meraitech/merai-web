"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { useCursorHover } from "@/shared/components/ui/cursor-context";

export interface AnchorProps extends ComponentPropsWithoutRef<"a"> {
  cursorName?: string;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor(
    { className, children, cursorName = "Click Me", ...props },
    ref,
  ) {
    const hover = useCursorHover(cursorName);

    return (
      <a
        ref={ref}
        className={cn("cursor-none transition-colors", className)}
        {...hover}
        {...props}
      >
        {children}
      </a>
    );
  },
);
