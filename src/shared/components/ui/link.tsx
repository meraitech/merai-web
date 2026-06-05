"use client";

import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Link as I18nLink } from "@/i18n/navigation";
import { useCursorHover } from "@/shared/components/ui/cursor-context";

export interface LinkProps extends ComponentPropsWithoutRef<typeof I18nLink> {
  cursorName?: string;
}

export function Link({
  className,
  children,
  href,
  cursorName = "Click Me",
  ...props
}: LinkProps) {
  const hover = useCursorHover(cursorName);

  return (
    <I18nLink
      href={href}
      className={cn("cursor-none transition-colors", className)}
      {...hover}
      {...props}
    >
      {children}
    </I18nLink>
  );
}
