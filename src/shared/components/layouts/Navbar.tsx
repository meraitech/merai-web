/* eslint-disable @next/next/no-img-element */
import { IMAGE_LOGO } from "@/shared/constants/image";
import React from "react";
import GlassBackground from "../ui/GlassBackground";

export default function Navbar() {
  return (
    <header className="fixed z-50 w-full p-4 flex justify-center">
      <div className="flex relative rounded-full overflow-hidden p-2 border border-foreground/10">
        <GlassBackground />
        <div className="z-1 flex items-center gap-10">
          <div className="pl-4 pr-2">
            <img src={IMAGE_LOGO} className="h-6" alt="" />
          </div>

          {/* Navigations  */}
          <nav>
            <ul className="flex gap-4">
              <li>Home</li>
              <li>About</li>
              <li>Works</li>
              <li>Pricing</li>
            </ul>
          </nav>

          {/* Contact  */}
          <div className="bg-foreground text-background px-4 py-1 rounded-full">
            <a href="">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
}
