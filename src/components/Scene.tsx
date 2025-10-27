"use client";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";

export default function Scene() {
  return (
    <Canvas
      // HAPUS frameloop="demand" ← ini penyebabnya!
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // Transparent background
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[5, 5, 5]} />
      <directionalLight intensity={1} position={[-5, -5, -5]} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
