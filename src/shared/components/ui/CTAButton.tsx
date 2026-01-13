import React from "react";

export const CTAButton = ({ theme }: { theme: "dark" | "light" | "color" }) => {
  return (
    <a
      href=""
      className={`px-6 py-3 border rounded-full ${
        theme === "dark"
          ? "border-foreground/10"
          : theme === "light"
          ? "border-background/10"
          : "border-accent"
      }`}
    >
      Case Studies
    </a>
  );
};
