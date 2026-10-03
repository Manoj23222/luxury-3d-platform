"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  decay: number;
  type: "flower5" | "flower6" | "petal" | "sparkle";
  petalColor: string;
  centerColor: string;
  scale: number;
}

const FLOWER_PALETTES = [
  // Sakura Pink & Gold
  { petal: "rgba(255, 120, 170, ", center: "#FFD700" },
  // Radiant Rose & Yellow
  { petal: "rgba(244, 63, 94, ", center: "#FEF08A" },
  // Lavender Orchid & White
  { petal: "rgba(192, 132, 252, ", center: "#FFFFFF" },
  // Sunset Coral & Amber
  { petal: "rgba(251, 146, 60, ", center: "#F59E0B" },
  // Champagne Yellow & Orange
  { petal: "rgba(250, 204, 21, ", center: "#EA580C" },
  // Fresh Cyan & Mint
  { petal: "rgba(56, 189, 248, ", center: "#E0F2FE" },
  // Soft Emerald Bloom
  { petal: "rgba(52, 211, 153, ", center: "#FEF3C7" },
  // Magenta Violet
  { petal: "rgba(232, 121, 249, ", center: "#FDE047" },
];

export default function HeroFlowerInteractive({
  src = "/ashok.png",
  alt = "Ashok Meena - Senior 3D Designer & Photo Editor",
}: {
  src?: string;
  alt?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Spawn flower particles at (x, y)
  const spawnFlowers = useCallback((x: number, y: number, speedX = 0, speedY = 0) => {
    // 2 to 4 particles per movement event
    const count = Math.floor(Math.random() * 2) + 2;

    for (let i = 0; i < count; i++) {
      const palette = FLOWER_PALETTES[Math.floor(Math.random() * FLOWER_PALETTES.length)];
      const types: Particle["type"][] = ["flower5", "flower6", "petal", "sparkle"];
      const type = types[Math.floor(Math.random() * types.length)];

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;

      // Initial outward burst with gentle momentum from mouse movement
      const vx = Math.cos(angle) * speed + speedX * 0.15;
      const vy = Math.sin(angle) * speed + speedY * 0.15 - 1.2; // Slight upward buoyancy

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx,
        vy,
        size: Math.random() * 16 + 14, // 14px to 30px
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.14,
        opacity: Math.random() * 0.25 + 0.75, // 0.75 to 1.0 (colorful & transparent)
        decay: Math.random() * 0.012 + 0.009, // ~1.5 - 2s life
        type,
        petalColor: palette.petal,
        centerColor: palette.center,
        scale: Math.random() * 0.4 + 0.7,
      });
    }

    // Limit maximum particles for peak 60FPS performance
    if (particlesRef.current.length > 90) {
      particlesRef.current.splice(0, particlesRef.current.length - 90);
    }
  }, []);

  // Handle pointer movement over the hero image
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const lastPos = lastMousePosRef.current;

    let speedX = 0;
    let speedY = 0;
    let dist = 10;

    if (lastPos) {
      speedX = x - lastPos.x;
      speedY = y - lastPos.y;
      dist = Math.hypot(speedX, speedY);
    }

    // Trigger flower spawn if moved enough or elapsed enough time
    if (dist > 7 || now - lastSpawnTimeRef.current > 40) {
      spawnFlowers(x, y, speedX, speedY);
      lastMousePosRef.current = { x, y };
      lastSpawnTimeRef.current = now;
    }
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Resize canvas with devicePixelRatio for Retina clarity
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    // Draw functions
    const drawFlower5 = (
      c: CanvasRenderingContext2D,
      size: number,
      petalColor: string,
      centerColor: string,
      alpha: number
    ) => {
      const petals = 5;
      const petalRadius = size * 0.38;
      const distFromCenter = size * 0.32;

      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        c.save();
        c.rotate(angle);
        c.beginPath();
        c.fillStyle = `${petalColor}${alpha})`;
        // Teardrop petal
        c.ellipse(0, -distFromCenter, petalRadius * 0.65, petalRadius, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }

      // Center pistil
      c.beginPath();
      c.arc(0, 0, size * 0.16, 0, Math.PI * 2);
      c.fillStyle = centerColor;
      c.fill();
    };

    const drawFlower6 = (
      c: CanvasRenderingContext2D,
      size: number,
      petalColor: string,
      centerColor: string,
      alpha: number
    ) => {
      const petals = 6;
      const petalRadius = size * 0.35;
      const distFromCenter = size * 0.3;

      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        c.save();
        c.rotate(angle);
        c.beginPath();
        c.fillStyle = `${petalColor}${alpha * 0.95})`;
        c.ellipse(0, -distFromCenter, petalRadius * 0.55, petalRadius, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }

      c.beginPath();
      c.arc(0, 0, size * 0.14, 0, Math.PI * 2);
      c.fillStyle = centerColor;
      c.fill();
    };

    const drawPetal = (c: CanvasRenderingContext2D, size: number, color: string, alpha: number) => {
      c.save();
      c.fillStyle = `${color}${alpha * 0.9})`;
      c.beginPath();
      c.moveTo(0, -size * 0.6);
      c.bezierCurveTo(size * 0.5, -size * 0.3, size * 0.5, size * 0.3, 0, size * 0.6);
      c.bezierCurveTo(-size * 0.5, size * 0.3, -size * 0.5, -size * 0.3, 0, -size * 0.6);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number, color: string, alpha: number) => {
      c.save();
      c.fillStyle = `${color}${alpha})`;
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.rotate(Math.PI / 2);
        c.lineTo(size * 0.5, 0);
        c.lineTo(size * 0.12, size * 0.12);
      }
      c.fill();

      // Soft center glow
      c.beginPath();
      c.arc(0, 0, size * 0.15, 0, Math.PI * 2);
      c.fillStyle = "#FFFFFF";
      c.fill();
      c.restore();
    };

    // Animation Tick
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // Gentle air gravity
        p.vx *= 0.985; // Air resistance
        p.vy *= 0.985;
        p.rotation += p.vRot;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);

        if (p.type === "flower5") {
          drawFlower5(ctx, p.size, p.petalColor, p.centerColor, p.opacity);
        } else if (p.type === "flower6") {
          drawFlower6(ctx, p.size, p.petalColor, p.centerColor, p.opacity);
        } else if (p.type === "petal") {
          drawPetal(ctx, p.size, p.petalColor, p.opacity);
        } else {
          drawSparkle(ctx, p.size, p.petalColor, p.opacity);
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        lastMousePosRef.current = null;
      }}
      className="group relative w-full max-w-[560px] aspect-[4/5] sm:aspect-[787/904] flex items-end justify-center cursor-crosshair overflow-visible select-none"
    >
      {/* Interactive 60FPS Flower & Petal Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-30 overflow-visible"
      />

      {/* Transparent Cutout Portrait with Organic Drop Shadow */}
      <div className="relative w-full h-full flex items-end justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain object-bottom filter drop-shadow-[0_22px_38px_rgba(10,10,10,0.22)] transition-transform duration-500 ease-out group-hover:scale-[1.015] pointer-events-none"
        />
      </div>

      {/* Interactive Hint Indicator Pill (Fades out when hovered) */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A] backdrop-blur-md border border-[#D8D7D1] shadow-xs opacity-90 transition-opacity duration-300 group-hover:opacity-0">
        <span className="text-rose-500 animate-pulse">🌸</span>
        <span>HOVER TO BLOOM</span>
      </div>
    </div>
  );
}
