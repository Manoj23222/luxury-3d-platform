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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0 || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // Initial Deck Setup
      const setupInitialDeck = (depthOffset = 80, scaleOffset = 0.04) => {
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, {
              xPercent: 0,
              yPercent: 0,
              z: 0,
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              opacity: 1,
              zIndex: 30,
              transformOrigin: "center center",
              force3D: true,
            });
          } else {
            gsap.set(card, {
              xPercent: 0,
              yPercent: 0,
              z: -i * depthOffset,
              rotationY: i % 2 === 1 ? 3 : -3,
              scale: 1 - i * scaleOffset,
              opacity: Math.max(0.2, 1 - i * 0.28),
              zIndex: 30 - i,
              transformOrigin: "center center",
              force3D: true,
            });
          }
        });
      };

      // Desktop Timeline (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        setupInitialDeck(90, 0.04);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3600",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.02))
              );
              setActiveIndex(idx);
            },
          },
        });

        const numSteps = cards.length - 1;
        const stepDuration = 1 / numSteps;

        for (let i = 0; i < numSteps; i++) {
          const startTime = i * stepDuration;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          // Current card 3D flips / rolls away to left
          tl.to(
            currentCard,
            {
              xPercent: -80,
              rotationY: -42,
              z: -220,
              scale: 0.88,
              opacity: 0,
              ease: "power2.inOut",
              duration: stepDuration,
              zIndex: 25,
            },
            startTime
          );

          // Next card rolls into the front active center
          tl.fromTo(
            nextCard,
            {
              xPercent: 70,
              rotationY: 38,
              z: -180,
              scale: 0.9,
              opacity: 0.2,
              zIndex: 35,
            },
            {
              xPercent: 0,
              rotationY: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.inOut",
              duration: stepDuration,
              zIndex: 35,
            },
            startTime
          );

          // Cards behind step forward in depth
          for (let k = i + 2; k < cards.length; k++) {
            const behindCard = cards[k];
            const depth = k - (i + 1);
            tl.to(
              behindCard,
              {
                z: -depth * 90,
                scale: 1 - depth * 0.04,
                rotationY: depth % 2 === 1 ? 3 : -3,
                opacity: Math.max(0.2, 1 - depth * 0.28),
                ease: "power2.inOut",
                duration: stepDuration,
              },
              startTime
            );
          }
        }
      });

      // Tablet & Mobile Timeline (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        setupInitialDeck(50, 0.03);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.02))
              );
              setActiveIndex(idx);
            },
          },
        });

        const numSteps = cards.length - 1;
        const stepDuration = 1 / numSteps;

        for (let i = 0; i < numSteps; i++) {
          const startTime = i * stepDuration;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          tl.to(
            currentCard,
            {
              xPercent: -65,
              rotationY: -25,
              z: -120,
              scale: 0.9,
              opacity: 0,
              ease: "power2.inOut",
              duration: stepDuration,
              zIndex: 25,
            },
            startTime
          );

          tl.fromTo(
            nextCard,
            {
              xPercent: 55,
              rotationY: 22,
              z: -100,
              scale: 0.92,
              opacity: 0.2,
              zIndex: 35,
            },
            {
              xPercent: 0,
              rotationY: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.inOut",
              duration: stepDuration,
              zIndex: 35,
            },
            startTime
          );

          for (let k = i + 2; k < cards.length; k++) {
            const behindCard = cards[k];
            const depth = k - (i + 1);
            tl.to(
              behindCard,
              {
                z: -depth * 50,
                scale: 1 - depth * 0.03,
                opacity: Math.max(0.2, 1 - depth * 0.28),
                ease: "power2.inOut",
                duration: stepDuration,
              },
              startTime
            );
          }
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="my-work"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center py-6 sm:py-8 select-none border-b border-neutral-800"
    >
      {/* Subtle Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-black z-0" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl z-0" />

      {/* Top Header Tag */}
      <div className="relative z-10 mb-3 sm:mb-5 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-md shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Featured Showcase • 3D &amp; CGI Portfolio</span>
        </div>
      </div>

      {/* 3D Perspective Stage Container - Centered with Left & Right Breathing Room (8-12vw) */}
      <div
        className="relative z-10 w-[84vw] sm:w-[80vw] lg:w-[74vw] max-w-[1120px] h-[56vh] xs:h-[60vh] sm:h-[66vh] lg:h-[72vh] max-h-[740px] mx-auto flex items-center justify-center"
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
        }}
      >
        {showcaseImages.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="absolute inset-0 rounded-[22px] sm:rounded-[30px] lg:rounded-[34px] overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
            style={{
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Project Image - Preserved 100% with object-cover and crisp clipping */}
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover object-center pointer-events-none select-none"
              draggable={false}
              loading="eager"
            />

            {/* Subtle Gradient Shadow Scrim on Bottom for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

            {/* Top Badge: Card Counter */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10.5px] sm:text-xs font-mono font-bold text-white backdrop-blur-md shadow-xs">
                <span>0{idx + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/60">0{showcaseImages.length}</span>
              </span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-10 flex items-end justify-between pointer-events-none gap-3">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {item.category}
                </p>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-tight">
                  {item.title}
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                ✦ High-Resolution CGI
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Scroll Progress Bar & Step Dots */}
      <div className="relative z-10 mt-4 sm:mt-6 flex items-center gap-4 px-4">
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
        <span className="text-[11px] sm:text-xs text-neutral-400 font-medium">
          Scroll to flip 3D cards ({activeIndex + 1}/{showcaseImages.length})
        </span>
      </div>
    </section>
  );
}
