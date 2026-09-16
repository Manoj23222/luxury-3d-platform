"use client";

import React, { Suspense, useState, useRef, Component, ErrorInfo, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model Viewer Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200/80 bg-white/95 px-5 py-3 shadow-xl backdrop-blur-md">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
        <span className="text-xs font-semibold tracking-wider text-neutral-800 uppercase">
          Loading 3D Scene...
        </span>
      </div>
    </Html>
  );
}

function isGlbOrGltf(url?: string, fileName?: string) {
  if (!url && !fileName) return false;
  const check = (str?: string) => {
    if (!str) return false;
    const clean = str.split("?")[0].toLowerCase();
    return clean.endsWith(".glb") || clean.endsWith(".gltf") || clean.includes(".glb") || clean.includes(".gltf");
  };
  return check(fileName) || check(url) || (url?.startsWith("http") && !url.match(/\.(jpg|jpeg|png|webp|gif)$/i));
}

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer({
  url,
  fileName,
}: {
  url?: string;
  fileName?: string;
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  const isValidModel = url && isGlbOrGltf(url, fileName);

  if (!url || !isValidModel) {
    return (
      <div className="flex h-[460px] w-full flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-100 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
        <p className="mt-3 text-sm font-semibold text-neutral-700">
          Interactive 3D Preview
        </p>
        <p className="mt-1 text-xs text-neutral-500 max-w-sm">
          GLB / GLTF 3D model preview is unavailable or processing.
        </p>
      </div>
    );
  }

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-200 shadow-inner">
      {/* 3D Viewer Toolbar */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          3D Interactive Room
        </span>
      </div>

      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md transition ${
            autoRotate
              ? "border-black bg-black text-white"
              : "border-neutral-300 bg-white/90 text-neutral-700 hover:bg-white"
          }`}
          title="Toggle Auto Turntable"
        >
          <svg className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {autoRotate ? "Turntable ON" : "Turntable OFF"}
        </button>

        <button
          onClick={resetCamera}
          className="rounded-full border border-neutral-300 bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-black"
          title="Reset Camera View"
        >
          Reset View
        </button>
      </div>

      {/* R3F Canvas */}
      <ModelErrorBoundary
        fallback={
          <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm font-semibold text-neutral-500">
            Failed to render 3D model. Please verify GLB file format.
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 4.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Studio Lights */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.8}
            castShadow
            shadow-mapSize={1024}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-8, 6, -4]} intensity={0.9} color="#e6f0ff" />
          <directionalLight position={[0, -6, 4]} intensity={0.4} />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.25}>
              <Center>
                <Model url={url} />
              </Center>
            </Bounds>

            <ContactShadows
              position={[0, -0.6, 0]}
              opacity={0.4}
              scale={12}
              blur={2.2}
              far={4}
            />

            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={1.2}
            maxDistance={15}
            dampingFactor={0.05}
          />
        </Canvas>
      </ModelErrorBoundary>

      {/* Interaction Hint Footer */}
      <div className="pointer-events-none absolute bottom-3 inset-x-0 flex justify-center">
        <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-md">
          Drag to rotate • Scroll to zoom
        </span>
      </div>
    </div>
  );
}