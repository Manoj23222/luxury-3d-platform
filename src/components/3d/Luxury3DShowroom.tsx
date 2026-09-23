"use client";

import React, {
  Suspense,
  useState,
  useRef,
  useEffect,
  useCallback,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { getCategoryTheme, type CategoryTheme } from "@/lib/category-theme";

export { getCategoryTheme, type CategoryTheme };

// ==========================================
// CAMERA PRESETS
// ==========================================
export type CameraPresetType = "hero" | "detail" | "profile" | "material";

const CAMERA_PRESETS: Record<
  CameraPresetType,
  { label: string; number: string; pos: [number, number, number]; target: [number, number, number]; fov: number }
> = {
  hero: {
    label: "HERO",
    number: "01",
    pos: [0, 0.9, 4.2],
    target: [0, 0, 0],
    fov: 40,
  },
  detail: {
    label: "CLOSE DETAIL",
    number: "02",
    pos: [0.6, 0.25, 2.0],
    target: [0, 0.05, 0],
    fov: 34,
  },
  profile: {
    label: "SIDE PROFILE",
    number: "03",
    pos: [3.8, 0.6, 1.6],
    target: [0, 0, 0],
    fov: 38,
  },
  material: {
    label: "MATERIAL VIEW",
    number: "04",
    pos: [1.8, 2.6, 2.6],
    target: [0, 0, 0],
    fov: 36,
  },
};

// ==========================================
// ERROR BOUNDARY
// ==========================================
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
    console.error("3D Showroom Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ==========================================
// LUXURY SHOWROOM 3D LOADER
// ==========================================
function ShowroomLoader({ accent }: { accent: string }) {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/85 px-6 py-4 shadow-2xl backdrop-blur-xl">
        <div className="relative flex h-8 w-8 items-center justify-center">
          <div
            className="absolute inset-0 animate-ping rounded-full opacity-30"
            style={{ backgroundColor: accent }}
          />
          <div
            className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: `${accent} transparent ${accent} ${accent}` }}
          />
        </div>
        <div className="text-center">
          <span className="text-[11px] font-bold tracking-widest text-white/90 uppercase">
            Loading 3D Model
          </span>
          <p className="mt-0.5 text-[9px] tracking-wider text-neutral-400 uppercase">
            Preparing 360° Inspection
          </p>
        </div>
      </div>
    </Html>
  );
}

// ==========================================
// 3D MODEL + SUBTLE IDLE MICRO-FLOAT
// ==========================================
function ModelPrimitive({
  url,
  isTurntableOn,
  reducedMotion,
}: {
  url: string;
  isTurntableOn: boolean;
  reducedMotion: boolean;
}) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Micro idle float motion
  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Very subtle breathing float when turntable is off
    if (!isTurntableOn) {
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.025;
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.005;
    } else {
      groupRef.current.position.y = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// ==========================================
// DYNAMIC STUDIO LIGHTING WITH TRAVELING SWEEP
// ==========================================
function StudioLighting({
  focusMode,
  theme,
  reducedMotion,
}: {
  focusMode: boolean;
  theme: CategoryTheme;
  reducedMotion: boolean;
}) {
  const movingLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (reducedMotion || !movingLightRef.current) return;
    const t = state.clock.getElapsedTime();
    // Traveling highlight: left to center to right over 10s cycle
    const x = Math.sin(t * 0.35) * 7;
    const z = 4 + Math.cos(t * 0.35) * 2;
    movingLightRef.current.position.set(x, 6, z);
  });

  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={focusMode ? 0.45 : 0.95} />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[6, 9, 5]}
        intensity={focusMode ? 2.8 : 1.9}
        color="#ffffff"
        castShadow
        shadow-mapSize={1024}
        shadow-bias={-0.0001}
      />

      {/* Traveling Moving Studio Highlight */}
      <directionalLight
        ref={movingLightRef}
        position={[0, 6, 5]}
        intensity={focusMode ? 1.8 : 1.1}
        color="#ffffff"
      />

      {/* Studio Rim / Accent Light */}
      <directionalLight
        position={[-7, 5, -5]}
        intensity={focusMode ? 2.4 : 1.2}
        color={theme.rimColor}
      />

      {/* Soft Bottom Fill */}
      <directionalLight position={[0, -4, 3]} intensity={0.35} color="#d4d4d8" />

      {/* Studio Environment HDR Reflection */}
      <Environment preset="studio" />
    </>
  );
}

// ==========================================
// CAMERA CONTROLLER: ONE-TIME SMOOTH LERP TRANSITION ONLY
// (Does not fight OrbitControls or block user zoom/rotate!)
// ==========================================
function CameraController({
  preset,
  controlsRef,
  isUserInteracting,
  reducedMotion,
}: {
  preset: CameraPresetType;
  controlsRef: React.RefObject<any>;
  isUserInteracting: boolean;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const targetPreset = CAMERA_PRESETS[preset];
  const isTransitioningRef = useRef(true);
  const transitionProgressRef = useRef(0);

  // Trigger smooth transition only when preset changes
  useEffect(() => {
    if (reducedMotion) {
      camera.position.set(...targetPreset.pos);
      if (controlsRef.current) {
        controlsRef.current.target.set(...targetPreset.target);
        controlsRef.current.update();
      }
      isTransitioningRef.current = false;
      return;
    }

    isTransitioningRef.current = true;
    transitionProgressRef.current = 0;
  }, [preset, reducedMotion, targetPreset]);

  // Cancel transition immediately if user drags or scrolls
  useEffect(() => {
    if (isUserInteracting) {
      isTransitioningRef.current = false;
    }
  }, [isUserInteracting]);

  useFrame((_, delta) => {
    if (!isTransitioningRef.current || isUserInteracting) return;

    transitionProgressRef.current += delta * 2.2;
    const t = Math.min(transitionProgressRef.current, 1);
    // Smooth ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);

    const targetPos = new THREE.Vector3(...targetPreset.pos);
    const targetLook = new THREE.Vector3(...targetPreset.target);

    camera.position.lerp(targetPos, ease * 0.15);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook, ease * 0.15);
      controlsRef.current.update();
    }

    // Stop transitioning once camera is close enough
    if (camera.position.distanceTo(targetPos) < 0.05 || t >= 1) {
      isTransitioningRef.current = false;
    }
  });

  return null;
}

// ==========================================
// STUDIO FLOOR WITH SOFT CONTACT SHADOW & REFLECTION
// ==========================================
function StudioShowroomFloor({ focusMode }: { focusMode: boolean }) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Contact Shadow on Floor */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={focusMode ? 0.75 : 0.52}
        scale={14}
        blur={2.5}
        far={3.5}
        color="#000000"
      />

      {/* Architectural Floor Pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          color={focusMode ? "#060608" : "#0d0d12"}
          roughness={0.28}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// HELPER TO VALIDATE 3D FILES
// ==========================================
function isGlbOrGltf(url?: string, fileName?: string) {
  if (!url && !fileName) return false;
  const check = (str?: string) => {
    if (!str) return false;
    const clean = str.split("?")[0].toLowerCase();
    return (
      clean.endsWith(".glb") ||
      clean.endsWith(".gltf") ||
      clean.includes(".glb") ||
      clean.includes(".gltf")
    );
  };
  return (
    check(fileName) ||
    check(url) ||
    (url?.startsWith("http") && !url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i))
  );
}

// ==========================================
// MAIN COMPONENT: FULL-SIZE LUXURY 3D SHOWROOM
// ==========================================
interface Luxury3DShowroomProps {
  url?: string;
  fileName?: string;
  category?: string;
  projectName?: string;
  fallbackImage?: string;
  className?: string;
}

export default function Luxury3DShowroom({
  url,
  fileName,
  category,
  projectName = "3D Asset",
  fallbackImage,
  className = "",
}: Luxury3DShowroomProps) {
  const theme = getCategoryTheme(category);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  // States
  const [autoRotate, setAutoRotate] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [activePreset, setActivePreset] = useState<CameraPresetType>("hero");
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Auto-hide controls after 3.5s of inactivity
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    setControlsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3500);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer]);

  const handleResetCamera = () => {
    setIsUserInteracting(false);
    setActivePreset("hero");
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
      setIsFullscreen(false);
    }
  };

  const isValidModel = url && isGlbOrGltf(url, fileName);

  return (
    <div
      ref={containerRef}
      onMouseMove={resetInactivityTimer}
      onMouseEnter={resetInactivityTimer}
      onTouchStart={resetInactivityTimer}
      className={`group/showroom relative w-full select-none overflow-hidden rounded-3xl border border-white/10 bg-[#08080c] transition-all duration-700 ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none"
          : "h-[68vh] sm:h-[76vh] lg:h-[82vh] min-h-[580px] max-h-[920px]"
      } ${className}`}
      style={{
        boxShadow: focusMode
          ? "0 0 70px rgba(0, 0, 0, 0.95), inset 0 0 100px rgba(0, 0, 0, 0.95)"
          : `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 45px rgba(${theme.accentRgb}, 0.08)`,
      }}
    >
      {/* LUXURY ARCHITECTURAL STUDIO BACKDROP */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Curved Wall Radial Glow */}
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-all duration-1000"
          style={{
            width: focusMode ? "400px" : "750px",
            height: focusMode ? "400px" : "750px",
            backgroundColor: focusMode ? `rgba(${theme.accentRgb}, 0.05)` : `rgba(${theme.accentRgb}, 0.12)`,
          }}
        />

        {/* Studio Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[at_50%_45%] from-transparent via-[#08080c]/50 to-[#040406] opacity-90" />

        {/* Studio Floor Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#040406] via-[#08080c]/80 to-transparent" />
      </div>

      {/* TOP FLOATING HUD BAR */}
      <div
        className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6 transition-all duration-500 ${
          controlsVisible ? "opacity-100 translate-y-0" : "opacity-40 -translate-y-1 group-hover/showroom:opacity-100 group-hover/showroom:translate-y-0"
        }`}
      >
        {/* Left: Studio Live Status & Project Title Pill */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950/80 px-3.5 py-1.5 backdrop-blur-xl shadow-lg">
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <span className="text-xs font-bold tracking-wider text-white uppercase">
              {projectName}
            </span>
          </div>

          <span
            className={`hidden sm:inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${theme.badgeBg} ${theme.badgeBorder}`}
          >
            {category || "3D Asset"}
          </span>

          {focusMode && (
            <span className="rounded-full border border-amber-500/40 bg-amber-950/60 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
              Focus Active
            </span>
          )}
        </div>

        {/* Right: Studio Control Pills */}
        <div className="flex items-center gap-2">
          {/* Turntable Button */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 rounded-full border px-3 sm:px-4 py-1.5 text-xs font-semibold backdrop-blur-xl transition-all duration-300 ${
              autoRotate
                ? "border-white/30 bg-white text-black shadow-lg shadow-white/10"
                : "border-white/10 bg-neutral-950/80 text-neutral-300 hover:border-white/20 hover:text-white"
            }`}
            title="Toggle 360° Auto Turntable"
          >
            <svg
              className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`}
              style={{ animationDuration: "6s" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{autoRotate ? "Turntable ON" : "Turntable OFF"}</span>
          </button>

          {/* Product Focus Mode Toggle */}
          <button
            type="button"
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl transition-all duration-300 ${
              focusMode
                ? "border-amber-400/50 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/10"
                : "border-white/10 bg-neutral-950/80 text-neutral-300 hover:border-white/20 hover:text-white"
            }`}
            title="Product Highlight Mode"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="hidden sm:inline">Focus</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-950/80 text-neutral-300 backdrop-blur-xl transition hover:border-white/20 hover:text-white"
            title="Fullscreen Showroom"
          >
            {isFullscreen ? (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM CAMERA PRESET BAR */}
      <div
        className={`absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 z-20 flex flex-wrap items-center justify-between gap-3 transition-all duration-500 ${
          controlsVisible ? "opacity-100 translate-y-0" : "opacity-40 translate-y-1 group-hover/showroom:opacity-100 group-hover/showroom:translate-y-0"
        }`}
      >
        {/* Camera Angle Presets */}
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/85 p-1 backdrop-blur-2xl shadow-xl">
          {(Object.keys(CAMERA_PRESETS) as CameraPresetType[]).map((presetKey) => {
            const p = CAMERA_PRESETS[presetKey];
            const isActive = activePreset === presetKey;
            return (
              <button
                key={presetKey}
                type="button"
                onClick={() => {
                  setIsUserInteracting(false);
                  setActivePreset(presetKey);
                  resetInactivityTimer();
                }}
                className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black shadow-md shadow-white/10"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className={`text-[9px] opacity-60 font-mono ${isActive ? "text-black" : "text-neutral-500"}`}>
                  {p.number}
                </span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reset Camera Pill */}
        <button
          type="button"
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-950/85 px-3.5 py-1.5 text-[11px] font-semibold text-neutral-300 backdrop-blur-2xl shadow-xl transition hover:border-white/20 hover:text-white"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset View</span>
        </button>
      </div>

      {/* THREE.JS CANVAS OR FALLBACK PREVIEW */}
      {isValidModel ? (
        <ModelErrorBoundary
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-neutral-900/80 text-neutral-400">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-bold text-white">3D Showroom Notice</p>
              <p className="mt-1 text-xs text-neutral-400 max-w-sm">
                Unable to compile GLB geometry. Showing fallback rendering.
              </p>
            </div>
          }
        >
          <Canvas
            shadows
            camera={{ position: [0, 0.9, 4.2], fov: 40 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.8]}
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={() => setIsUserInteracting(true)}
            onWheel={() => setIsUserInteracting(true)}
          >
            <CameraController
              preset={activePreset}
              controlsRef={controlsRef}
              isUserInteracting={isUserInteracting}
              reducedMotion={reducedMotion}
            />

            <StudioLighting
              focusMode={focusMode}
              theme={theme}
              reducedMotion={reducedMotion}
            />

            <Suspense fallback={<ShowroomLoader accent={theme.accent} />}>
              <Bounds fit clip observe margin={1.15}>
                <Center top position={[0, 0, 0]}>
                  <ModelPrimitive
                    url={url}
                    isTurntableOn={autoRotate}
                    reducedMotion={reducedMotion}
                  />
                </Center>
              </Bounds>

              <StudioShowroomFloor focusMode={focusMode} />
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              makeDefault
              autoRotate={autoRotate}
              autoRotateSpeed={1.4}
              enablePan={true}
              panSpeed={0.8}
              enableZoom={true}
              zoomSpeed={1.2}
              enableRotate={true}
              rotateSpeed={0.85}
              minDistance={0.3}
              maxDistance={25}
              dampingFactor={0.08}
              minPolarAngle={0.05}
              maxPolarAngle={Math.PI / 2 + 0.05}
              onStart={() => setIsUserInteracting(true)}
            />
          </Canvas>
        </ModelErrorBoundary>
      ) : fallbackImage ? (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          <img
            src={fallbackImage}
            alt={projectName}
            className="h-full max-h-[640px] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-neutral-900/80 text-neutral-400">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-bold text-white">Interactive 3D Showroom</p>
          <p className="mt-1 text-xs text-neutral-400 max-w-sm">
            High-fidelity 3D asset viewer is ready for GLB/GLTF assets.
          </p>
        </div>
      )}

      {/* Interaction Hint Footnote */}
      <div className="pointer-events-none absolute bottom-16 sm:bottom-4 inset-x-0 flex justify-center z-10">
        <span className="rounded-full border border-white/5 bg-black/50 px-3.5 py-1 text-[10px] font-medium tracking-wider text-neutral-300 backdrop-blur-md">
          🖱️ DRAG TO ROTATE • SCROLL WHEEL TO ZOOM IN/OUT • RIGHT-CLICK TO PAN
        </span>
      </div>
    </div>
  );
}
