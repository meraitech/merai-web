import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-foreground/10 bg-foreground/2 backdrop-blur-sm rounded-3xl overflow-hidden w-full h-full">
      {children}
    </div>
  );
};
