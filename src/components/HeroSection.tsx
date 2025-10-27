"use client";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <p className="text-sm opacity-60">Loading 3D…</p>,
});

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      {" "}
      {/* ← Tambahkan z-0 */}
      <Scene />
    </div>
  );
}
