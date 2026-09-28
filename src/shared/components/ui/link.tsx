"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Link as I18nLink } from "@/i18n/navigation";

export interface LinkProps extends ComponentPropsWithoutRef<typeof I18nLink> {}

export const Link = forwardRef<ElementRef<typeof I18nLink>, LinkProps>(
  function Link({ className, children, href, ...props }, ref) {
    return (
      <I18nLink
        ref={ref}
        href={href}
        className={cn("transition-colors", className)}
        {...props}
      >
        {children}
      </I18nLink>
    );
  }
);
