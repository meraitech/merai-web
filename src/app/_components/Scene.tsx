"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useRef, useEffect, useMemo } from "react";
import {
  useGLTF,
  Text,
  MeshTransmissionMaterial,
  Center,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size, gl } = useThree();

  // Load GLTF
  const { nodes } = useGLTF("/__merai__/3d/m-logo.glb") as any;

  // === [NEW] mouse tracking (NDC -1..1) ===
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const insideRef = useRef(false);
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      insideRef.current = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      mouseRef.current.set(x * 2 - 1, -(y * 2 - 1)); // NDC
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  // Calculate center offset dari bounding box
  const centerOffset = useMemo(() => {
    if (nodes.merai?.geometry) {
      const geometry = nodes.merai.geometry;
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      if (boundingBox) {
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        console.log("📦 Bounding box center:", center);
        return center;
      }
    }
    return new THREE.Vector3(0, 0, 0);
  }, [nodes]);

  // === [NEW] gabungkan auto-spin + offset dari mouse ===
  const baseYRef = useRef(0); // akumulasi auto spin
  const offXRef = useRef(0); // offset X dari mouse (pitch)
  const offYRef = useRef(0); // offset Y dari mouse (yaw)

  useFrame((_, dt) => {
    if (!meshRef.current) return;

    // auto spin konstan (sama dengan sebelumnya: 0.01 per frame kira2)
    // baseYRef.current += 0.01;

    // target dari mouse
    const maxYaw = 0.3; // kiri-kanan (Y)
    const maxPitch = 0.3; // atas-bawah (X)
    const targetY = insideRef.current ? mouseRef.current.x * maxYaw : 0;
    const targetX = insideRef.current ? mouseRef.current.y * maxPitch : 0;

    // damping framerate-independent
    const k = 1 - Math.pow(0.0001, dt);

    // lerp offset menuju target
    offYRef.current += (targetY - offYRef.current) * k;
    offXRef.current += (targetX - offXRef.current) * k;

    // terapkan: rotasi total = autoSpin + offsetMouse
    meshRef.current.rotation.y = baseYRef.current + offYRef.current;
    meshRef.current.rotation.x = offXRef.current;
  });

  useEffect(() => {
    console.log("✅ Model loaded");
    console.log("📦 Nodes:", nodes);
    console.log("🖥️ Screen width:", size.width);
    console.log("📍 Center offset:", centerOffset);
  }, [nodes, size.width, centerOffset]);

  // Leva controls
  const materialProps = {
    thickness: 0.5,
    roughness: 0.1,
    transmission: 0.98,
    ior: 2.5,
    chromaticAberration: 0.6,
    backside: true,
  };

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Center wrapper untuk auto-center */}
      <Center>
        <group scale={Math.min(viewport.width, viewport.height) / 20}>
          {/* Text Background - Centered */}
          <Text
            fontSize={6}
            font="/assets/fonts/Montserrat-Bold.ttf"
            position={[0, 0, -5]}
            color="#ffffff"
            anchorX="center" // ← Penting untuk center horizontal
            anchorY="middle" // ← Penting untuk center vertical
          >
            MERAI
          </Text>

          {/* Model with Transmission Material - Centered */}
          <mesh
            ref={meshRef}
            geometry={nodes.merai?.geometry}
            position={centerOffset.clone().multiplyScalar(-1)}
            rotation={nodes.merai?.rotation || [0, 0, 0]}
            scale={nodes.merai?.scale || [1, 1, 1]}
          >
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload("/__merai__/3d/m-logo.glb");
