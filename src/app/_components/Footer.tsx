import IconInstagram from "@/assets/icons/instagram.icon";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-background border-t border-foreground/20">
      <footer className="mx-auto max-w-[1200px] w-full text-center py-10 px-8 flex flex-col justify-between gap-8 ">
        {/* <div className="grid grid-cols-2 text-start">
          <div className="flex flex-col justify-end gap-8">
            <div className="flex flex-col justify-end gap-4">
              <h2 className="text-muted">Contact</h2>
              <p className="text-5xl">Kirim kami Email</p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <h3 className="text-muted">give us a call</h3>
              <span className="text-2xl">+62 8 12 35 12 98</span>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <h3 className="text-muted">location</h3>
            <span className="text-2xl">Padang, Indonesia</span>
          </div>
        </div> */}
        <span className="font-epicpro text-5xl">MERAI</span>
        <div className="flex flex-col items-center gap-4">
          {/* <section className="flex">
            <div className="p-2 aspect-square border border-foreground/20">
              <IconInstagram size={20} className="opacity-50" />
            </div>
          </section> */}
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} MERAI.
          </span>
        </div>
      </footer>
    </div>
  );
}
