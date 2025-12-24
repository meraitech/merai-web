/* eslint-disable @next/next/no-img-element */
import { IMAGE_LOGO } from "@/shared/constants/image";
import React from "react";

export default function Navbar() {
  return (
    <header className="fixed">
      <div className="">
        <img src={IMAGE_LOGO} className="h-12" alt="" />
      </div>
    </header>
  );
}
