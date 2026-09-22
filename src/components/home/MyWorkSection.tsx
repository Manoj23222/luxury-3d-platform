"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ShowcaseImageItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

const showcaseImages: ShowcaseImageItem[] = [
  {
    id: "burger-creative",
    src: "/images/Burger.png",
    title: "Burger Creative",
    category: "CGI & Visual Production",
  },
  {
    id: "aura-luxury",
    src: "/images/AURA.png",
    title: "AURA Luxury Jewelry",
    category: "Luxury Product Rendering",
  },
  {
    id: "showcase-34",
    src: "/images/34.png",
    title: "Creative Production 34",
    category: "3D Digital Art & CGI",
  },
  {
    id: "editorial-123",
    src: "/images/123.png",
    title: "Editorial Design 123",
    category: "High-End Photo Retouching",
  },
];

export default function MyWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastActiveIdxRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(
        ".showcase-3d-card",
        sectionRef.current
      );
      if (!cards || cards.length < 4 || !sectionRef.current) return;

      const [card1, card2, card3, card4] = cards;

      const mm = gsap.matchMedia();

      // ================= DESKTOP MOTION TIMELINE (>= 1024px) =================
      mm.add("(min-width: 1024px)", () => {
        // Initial setup for the 4 distinct entrance positions
        // Card 1: Starts slightly right, scaled 0.95, subtle 3D tilt
        gsap.set(card1, {
          xPercent: 25,
          yPercent: 0,
          z: 0,
          rotationY: 6,
          scale: 0.95,
          opacity: 0.85,
          zIndex: 40,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          transformPerspective: 1800,
          transformOrigin: "50% 50%",
          force3D: true,
          backfaceVisibility: "hidden",
        });

        // Card 2: Waiting below the viewport in depth
        gsap.set(card2, {
          xPercent: 0,
          yPercent: 55,
          z: -80,
          rotationY: 0,
          scale: 0.88,
          opacity: 0.3,
          zIndex: 30,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          transformPerspective: 1800,
          transformOrigin: "50% 50%",
          force3D: true,
          backfaceVisibility: "hidden",
        });

        // Card 3: Waiting to the right in deep background layer
        gsap.set(card3, {
          xPercent: 45,
          yPercent: 0,
          z: -180,
          rotationY: -10,
          scale: 0.82,
          opacity: 0.2,
          zIndex: 20,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          transformPerspective: 1800,
          transformOrigin: "50% 50%",
          force3D: true,
          backfaceVisibility: "hidden",
        });

        // Card 4: Waiting to the left with mask reveal ready
        gsap.set(card4, {
          xPercent: -45,
          yPercent: 0,
          z: -240,
          rotationY: 4,
          scale: 0.8,
          opacity: 0.15,
          zIndex: 10,
          clipPath: "inset(0% 45% 0% 0% round 32px)",
          transformPerspective: 1800,
          transformOrigin: "50% 50%",
          force3D: true,
          backfaceVisibility: "hidden",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3800",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              if (lastActiveIdxRef.current !== activeIdx) {
                lastActiveIdxRef.current = activeIdx;
                setActiveIndex(activeIdx);
              }
            },
          },
        });

        // STAGE 0 -> 1: Card 1 glides to center (scale 1.05, rotation 0, zIndex 40)
        tl.to(
          card1,
          {
            xPercent: 0,
            rotationY: 0,
            scale: 1.05,
            opacity: 1,
            zIndex: 40,
            ease: "power2.out",
            duration: 0.15,
          },
          0
        );

        // STAGE 1 -> 2: Card 1 exits to back/top, Card 2 enters from BOTTOM upward to center
        // Duration: 0.15 -> 0.45
        tl.to(
          card1,
          {
            yPercent: -28,
            scale: 0.9,
            opacity: 0.35,
            zIndex: 25,
            ease: "power2.inOut",
            duration: 0.3,
          },
          0.18
        );

        tl.to(
          card2,
          {
            yPercent: 0,
            z: 0,
            scale: 1.05,
            opacity: 1,
            zIndex: 40,
            ease: "power2.inOut",
            duration: 0.3,
          },
          0.18
        );

        // Card 3 moves closer in background
        tl.to(
          card3,
          {
            xPercent: 32,
            z: -90,
            rotationY: -6,
            scale: 0.88,
            opacity: 0.4,
            zIndex: 30,
            ease: "power2.inOut",
            duration: 0.3,
          },
          0.18
        );

        // STAGE 2 -> 3: Card 2 exits, Card 3 enters from RIGHT + DEPTH forward
        // Duration: 0.48 -> 0.75
        tl.to(
          card2,
          {
            yPercent: -35,
            scale: 0.88,
            opacity: 0.25,
            zIndex: 20,
            ease: "power2.inOut",
            duration: 0.27,
          },
          0.48
        );

        tl.to(
          card3,
          {
            xPercent: 0,
            z: 0,
            rotationY: 0,
            scale: 1.05,
            opacity: 1,
            zIndex: 40,
            ease: "power2.inOut",
            duration: 0.27,
          },
          0.48
        );

        // Card 4 advances on left with partial mask opening
        tl.to(
          card4,
          {
            xPercent: -28,
            z: -100,
            scale: 0.88,
            clipPath: "inset(0% 25% 0% 0% round 32px)",
            opacity: 0.45,
            zIndex: 30,
            ease: "power2.inOut",
            duration: 0.27,
          },
          0.48
        );

        // STAGE 3 -> 4: Card 3 exits, Card 4 enters from LEFT with REVEAL MASK
        // Duration: 0.75 -> 1.0
        tl.to(
          card3,
          {
            xPercent: 22,
            scale: 0.88,
            opacity: 0.25,
            zIndex: 20,
            ease: "power2.inOut",
            duration: 0.25,
          },
          0.75
        );

        tl.to(
          card4,
          {
            xPercent: 0,
            z: 0,
            rotationY: 0,
            scale: 1.05,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            opacity: 1,
            zIndex: 40,
            ease: "power2.inOut",
            duration: 0.25,
          },
          0.75
        );
      });

      // ================= TABLET & MOBILE TIMELINE (< 1024px) =================
      mm.add("(max-width: 1023px)", () => {
        // Scaled-down movements to strictly avoid horizontal overflow
        gsap.set(card1, {
          xPercent: 15,
          yPercent: 0,
          scale: 0.96,
          opacity: 0.9,
          zIndex: 40,
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        gsap.set(card2, {
          xPercent: 0,
          yPercent: 40,
          scale: 0.9,
          opacity: 0.3,
          zIndex: 30,
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        gsap.set(card3, {
          xPercent: 25,
          yPercent: 0,
          scale: 0.85,
          opacity: 0.2,
          zIndex: 20,
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        gsap.set(card4, {
          xPercent: -25,
          yPercent: 0,
          scale: 0.85,
          opacity: 0.15,
          zIndex: 10,
          clipPath: "inset(0% 30% 0% 0% round 22px)",
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2800",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              if (lastActiveIdxRef.current !== activeIdx) {
                lastActiveIdxRef.current = activeIdx;
                setActiveIndex(activeIdx);
              }
            },
          },
        });

        // Stage 0 -> 1: Center Card 1
        tl.to(
          card1,
          {
            xPercent: 0,
            scale: 1.03,
            opacity: 1,
            zIndex: 40,
            ease: "power2.out",
            duration: 0.15,
          },
          0
        );

        // Stage 1 -> 2: Card 1 up, Card 2 up from bottom
        tl.to(card1, { yPercent: -20, scale: 0.92, opacity: 0.35, zIndex: 25, duration: 0.3 }, 0.18);
        tl.to(card2, { yPercent: 0, scale: 1.03, opacity: 1, zIndex: 40, duration: 0.3 }, 0.18);
        tl.to(card3, { xPercent: 18, scale: 0.9, opacity: 0.4, zIndex: 30, duration: 0.3 }, 0.18);

        // Stage 2 -> 3: Card 2 out, Card 3 in from right
        tl.to(card2, { yPercent: -25, scale: 0.9, opacity: 0.25, zIndex: 20, duration: 0.27 }, 0.48);
        tl.to(card3, { xPercent: 0, scale: 1.03, opacity: 1, zIndex: 40, duration: 0.27 }, 0.48);
        tl.to(card4, { xPercent: -15, scale: 0.9, clipPath: "inset(0% 15% 0% 0% round 22px)", opacity: 0.45, zIndex: 30, duration: 0.27 }, 0.48);

        // Stage 3 -> 4: Card 3 out, Card 4 in with left reveal
        tl.to(card3, { xPercent: 15, scale: 0.9, opacity: 0.25, zIndex: 20, duration: 0.25 }, 0.75);
        tl.to(card4, { xPercent: 0, scale: 1.03, clipPath: "inset(0% 0% 0% 0% round 22px)", opacity: 1, zIndex: 40, duration: 0.25 }, 0.75);
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="my-work"
      ref={sectionRef}
      className="relative min-h-screen h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center py-6 select-none border-b border-neutral-800"
    >
      {/* Subtle Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-black z-0" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl z-0" />

      {/* Top Header Tag */}
      <div className="relative z-10 mb-3 sm:mb-4 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-md shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Featured Showcase • 3D &amp; CGI Portfolio</span>
        </div>
      </div>

      {/* 3D Perspective Stage Container - Centered in Viewport */}
      <div
        className="relative z-10 w-[92vw] sm:w-[86vw] lg:w-[78vw] max-w-[1120px] aspect-[16/10] sm:aspect-[16/9.5] max-h-[640px] mx-auto flex items-center justify-center overflow-visible"
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
        }}
      >
        {showcaseImages.map((item, idx) => (
          <div
            key={item.id}
            className="showcase-3d-card absolute inset-0 rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Project Image - 100% Crisp Widescreen Presentation */}
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover object-center pointer-events-none select-none"
              draggable={false}
              loading="eager"
            />

            {/* Subtle Gradient Shadow Scrim on Bottom for Text Readability without Obscuring Artwork */}
            <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

            {/* Top Badge: Card Counter */}
            <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10.5px] sm:text-xs font-mono font-bold text-white backdrop-blur-md shadow-xs">
                <span>0{idx + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/60">0{showcaseImages.length}</span>
              </span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3.5 sm:bottom-5 inset-x-3.5 sm:inset-x-5 z-10 flex items-end justify-between pointer-events-none gap-3">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {item.category}
                </p>
                <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-tight">
                  {item.title}
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                ✦ High-Resolution CGI
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Scroll Progress Bar & Step Dots */}
      <div className="relative z-10 mt-4 sm:mt-5 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          {showcaseImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-8 sm:w-10 bg-white shadow-xs"
                  : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] sm:text-xs text-neutral-400 font-medium font-mono">
          Scroll to explore projects ({activeIndex + 1}/{showcaseImages.length})
        </span>
      </div>
    </section>
  );
}
