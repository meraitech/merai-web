import React from "react";
import GlassBackground from "./GlassBackground";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-foreground/10 rounded-4xl overflow-hidden w-full h-full relative flex">
      <div className="w-full h-full z-1">{children}</div>
      <GlassBackground />
    </div>
  );
};
