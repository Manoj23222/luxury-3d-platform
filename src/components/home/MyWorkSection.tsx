"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ShowcaseImageItem {
  id: string;
  src: string;
  title: string;
}

const showcaseImages: ShowcaseImageItem[] = [
  {
    id: "burger-creative",
    src: "/images/Burger.png",
    title: "Burger Creative",
  },
  {
    id: "aura-luxury",
    src: "/images/AURA.png",
    title: "AURA Luxury Jewelry",
  },
  {
    id: "showcase-34",
    src: "/images/34.png",
    title: "Creative Production 34",
  },
  {
    id: "editorial-123",
    src: "/images/123.png",
    title: "Editorial Design 123",
  },
];

export default function MyWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const frames = imageFrameRefs.current.filter(Boolean) as HTMLDivElement[];
      if (frames.length === 0 || !sectionRef.current) return;

      // 1. Initial State: First image crisp and visible at scale 1, others queued behind
      gsap.set(frames[0], {
        scale: 1,
        opacity: 1,
        zIndex: 20,
        transformOrigin: "center center",
        force3D: true,
      });

      for (let i = 1; i < frames.length; i++) {
        gsap.set(frames[i], {
          scale: 0.85,
          opacity: 0,
          zIndex: 10 - i,
          transformOrigin: "center center",
          force3D: true,
        });
      }

      // 2. Master ScrollTrigger Timeline: Controlled by mouse vertical scroll with slower, calmer speed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4800", // Slower, relaxed scroll runway for comfortable viewing
          pin: true,
          scrub: 1.2, // Silky smooth scroll momentum
          anticipatePin: 1,
        },
      });

      // 3. Zoom-Through Chain: Image zooms into camera and smoothly reveals next image
      const numTransitions = frames.length - 1;
      const stepDuration = 1 / numTransitions;

      for (let i = 0; i < numTransitions; i++) {
        const startTime = i * stepDuration;
        const currentFrame = frames[i];
        const nextFrame = frames[i + 1];

        // Active image zooms into camera and dissolves
        tl.to(
          currentFrame,
          {
            scale: 3.4,
            opacity: 0,
            ease: "power1.inOut",
            duration: stepDuration,
            zIndex: 30,
          },
          startTime
        );

        // Next image emerges cleanly to full view
        tl.fromTo(
          nextFrame,
          {
            scale: 0.85,
            opacity: 0,
            zIndex: 20,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "power1.inOut",
            duration: stepDuration,
            zIndex: 25,
          },
          startTime
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="my-work"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* 100% Full-Screen Edge-to-Edge Visual Canvas */}
      <div className="relative h-full w-full overflow-hidden">
        {showcaseImages.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              imageFrameRefs.current[idx] = el;
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover object-center"
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
