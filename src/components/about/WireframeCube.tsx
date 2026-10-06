"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeCubeProps {
  isDark?: boolean;
}

export default function WireframeCube({ isDark = false }: WireframeCubeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Cube Group
    const cubeGroup = new THREE.Group();
    // Default isometric-style tilt
    cubeGroup.rotation.x = 0.55;
    cubeGroup.rotation.y = 0.65;
    scene.add(cubeGroup);

    // 1. Primary Outer Wireframe Cube
    const cubeSize = 2.4;
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

    const getLineColor = () => (isDarkRef.current ? 0xfafaf9 : 0x2a2a2c);
    const getVertexColor = () => (isDarkRef.current ? 0xefefed : 0x8e8e91);
    const getInnerLineColor = () => (isDarkRef.current ? 0x8e8e91 : 0x8e8e91);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: getLineColor(),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const lineSegments = new THREE.LineSegments(edgesGeometry, lineMaterial);
    cubeGroup.add(lineSegments);

    // 2. Inner Subdivided Grid Lines (representing 3D topology / Blender grid)
    const innerSize = 2.4;
    const innerGeometry = new THREE.BufferGeometry();
    const innerVertices: number[] = [];

    // Cross subdivisions on 3 axes
    for (let i = -1; i <= 1; i += 2) {
      const offset = (innerSize / 2) * (i * 0.5);
      // X-slice plane
      innerVertices.push(
        offset, -innerSize / 2, -innerSize / 2,
        offset, innerSize / 2, -innerSize / 2,
        offset, innerSize / 2, -innerSize / 2,
        offset, innerSize / 2, innerSize / 2,
        offset, innerSize / 2, innerSize / 2,
        offset, -innerSize / 2, innerSize / 2,
        offset, -innerSize / 2, innerSize / 2,
        offset, -innerSize / 2, -innerSize / 2
      );
      // Y-slice plane
      innerVertices.push(
        -innerSize / 2, offset, -innerSize / 2,
        innerSize / 2, offset, -innerSize / 2,
        innerSize / 2, offset, -innerSize / 2,
        innerSize / 2, offset, innerSize / 2,
        innerSize / 2, offset, innerSize / 2,
        -innerSize / 2, offset, innerSize / 2,
        -innerSize / 2, offset, innerSize / 2,
        -innerSize / 2, offset, -innerSize / 2
      );
    }
    innerGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(innerVertices, 3)
    );

    const innerLineMaterial = new THREE.LineBasicMaterial({
      color: getInnerLineColor(),
      linewidth: 1,
      transparent: true,
      opacity: 0.35,
    });
    const innerLines = new THREE.LineSegments(innerGeometry, innerLineMaterial);
    cubeGroup.add(innerLines);

    // 3. Vertex Corner Dots (3D vertex nodes)
    const cornerVertices = [
      -1.2, -1.2, -1.2,
      1.2, -1.2, -1.2,
      1.2, 1.2, -1.2,
      -1.2, 1.2, -1.2,
      -1.2, -1.2, 1.2,
      1.2, -1.2, 1.2,
      1.2, 1.2, 1.2,
      -1.2, 1.2, 1.2,
      0, 0, 0, // center pivot
    ];
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(cornerVertices, 3)
    );
    const pointsMaterial = new THREE.PointsMaterial({
      color: getVertexColor(),
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    cubeGroup.add(pointCloud);

    // Drag Interaction State
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      const rotateSpeed = 0.008;
      cubeGroup.rotation.y += deltaX * rotateSpeed;
      cubeGroup.rotation.x += deltaY * rotateSpeed;

      velocityX = deltaX * rotateSpeed;
      velocityY = deltaY * rotateSpeed;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore
      }
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = "none";
    domElement.style.cursor = "grab";

    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Dynamically update colors when theme changes
      lineMaterial.color.setHex(getLineColor());
      pointsMaterial.color.setHex(getVertexColor());
      innerLineMaterial.color.setHex(getInnerLineColor());

      if (!isDragging) {
        // Apply inertia velocity
        cubeGroup.rotation.y += velocityX;
        cubeGroup.rotation.x += velocityY;
        velocityX *= 0.92;
        velocityY *= 0.92;

        // Subtle ambient rotation if not prefersReducedMotion
        if (!prefersReducedMotion) {
          cubeGroup.rotation.y += 0.003;
          cubeGroup.rotation.x += 0.0015;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      boxGeometry.dispose();
      edgesGeometry.dispose();
      innerGeometry.dispose();
      pointsGeometry.dispose();
      lineMaterial.dispose();
      innerLineMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div
        ref={mountRef}
        aria-label="Interactive 3D Wireframe Cube — drag to rotate"
        className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform active:scale-[0.99]"
      />
      <div className="mt-2 flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#8E8E91] tracking-wider uppercase">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E8E91] animate-pulse" />
        <span>Blender · CLO 3D</span>
        <span className="text-[#8E8E91]/60">·</span>
        <span className="text-[#8E8E91] flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate
        </span>
      </div>
    </div>
  );
}
