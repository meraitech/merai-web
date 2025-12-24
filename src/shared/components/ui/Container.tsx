import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="z-1 max-w-7xl mx-auto w-full">{children}</div>;
};
