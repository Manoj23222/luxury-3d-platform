"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HomeLikeAndViewsProps {
  className?: string;
  variant?: "hero" | "compact";
}

interface FloatingHeart {
  id: number;
  x: number;
}

export default function HomeLikeAndViews({
  className = "",
  variant = "hero",
}: HomeLikeAndViewsProps) {
  const [likes, setLikes] = useState<number>(142);
  const [views, setViews] = useState<number>(1280);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const visitorIdRef = useRef<string>("");

  // Get or initialize persistent visitor ID & liked state on client mount
  useEffect(() => {
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("lux3d_visitor_id") || "";
      if (!visitorId) {
        visitorId =
          "v_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("lux3d_visitor_id", visitorId);
      }
      visitorIdRef.current = visitorId;

      const storedLiked = localStorage.getItem("lux3d_portfolio_liked") === "true";
      if (storedLiked) {
        setHasLiked(true);
      }
    } catch {
      visitorIdRef.current = "anon_" + Math.random().toString(36).substring(2, 9);
    }

    // Fetch live stats from API
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/portfolio/stats?visitorId=${visitorIdRef.current}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setLikes(data.likes || 142);
            setViews(data.views || 1280);
            if (data.hasLiked) {
              setHasLiked(true);
              localStorage.setItem("lux3d_portfolio_liked", "true");
            }
          }
        }
      } catch (err) {
        console.error("Failed to load portfolio stats:", err);
      }
    };

    fetchStats();
  }, []);

  // Handle Like Button Click with Optimistic UI & Floating Hearts Burst
  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const nextLiked = !hasLiked;
    const nextLikes = nextLiked ? likes + 1 : Math.max(0, likes - 1);

    // Optimistic UI updates
    setHasLiked(nextLiked);
    setLikes(nextLikes);

    try {
      localStorage.setItem("lux3d_portfolio_liked", nextLiked ? "true" : "false");
    } catch {
      // storage unavailable
    }

    // Spawn floating heart particles on like
    if (nextLiked) {
      const newHearts: FloatingHeart[] = [
        { id: Date.now(), x: -16 },
        { id: Date.now() + 1, x: 0 },
        { id: Date.now() + 2, x: 18 },
      ];
      setFloatingHearts((prev) => [...prev, ...newHearts]);

      setTimeout(() => {
        setFloatingHearts((prev) =>
          prev.filter((h) => !newHearts.some((nh) => nh.id === h.id))
        );
      }, 1200);
    }

    // Call backend API
    try {
      const res = await fetch("/api/portfolio/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorIdRef.current,
          action: nextLiked ? "like" : "unlike",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && typeof data.likes === "number") {
          setLikes(data.likes);
          setHasLiked(data.hasLiked);
        }
      }
    } catch (err) {
      console.error("Error updating like on server:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const formattedViews = views.toLocaleString();
  const formattedLikes = likes.toLocaleString();

  return (
    <div
      className={`relative inline-flex flex-wrap items-center gap-3 select-none ${className}`}
      aria-label="Portfolio likes and view counter"
    >
      {/* 1. INTERACTIVE LIKE BUTTON */}
      <div className="relative">
        {/* Floating Heart Particles Animation */}
        <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-30">
          <AnimatePresence>
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                animate={{
                  opacity: 0,
                  y: -48,
                  x: heart.x + (Math.random() * 20 - 10),
                  scale: 1.35,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, ease: "easeOut" }}
                className="absolute text-base text-[#D12424] filter drop-shadow-[0_2px_4px_rgba(209,36,36,0.3)]"
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={handleLikeClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          className={`group relative inline-flex items-center gap-2.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 shadow-2xs cursor-pointer ${
            hasLiked
              ? "bg-[#D12424] text-white border-[#D12424] shadow-md shadow-[#D12424]/20 hover:bg-[#b51c1c]"
              : "bg-white/90 hover:bg-white text-[#0A0A0A] border-[#D8D7D1] hover:border-[#0A0A0A] hover:shadow-xs"
          }`}
          title={hasLiked ? "You appreciated this portfolio! (Click to unlike)" : "Appreciate Ashok's work"}
        >
          {/* Animated Heart Icon */}
          <motion.span
            animate={hasLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-center shrink-0"
          >
            <svg
              className={`w-4 h-4 transition-colors duration-200 ${
                hasLiked
                  ? "fill-white stroke-white"
                  : "fill-transparent stroke-[#D12424] group-hover:fill-[#D12424]/15"
              }`}
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.span>

          {/* Button Text */}
          <span className="text-xs sm:text-[13px] font-bold tracking-tight">
            {hasLiked ? "Liked" : "Like"}
          </span>

          {/* Likes Counter Badge */}
          <span
            className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
              hasLiked
                ? "bg-white/20 text-white"
                : "bg-[#EFEEEB] text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white"
            }`}
          >
            {formattedLikes}
          </span>
        </motion.button>
      </div>

      {/* 2. LIVE VIEWER COUNT PILL */}
      <div
        className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#D8D7D1] bg-white/80 backdrop-blur-xs text-[#0A0A0A] shadow-2xs hover:border-[#0A0A0A] transition-colors"
        title="Total visitors & impressions recorded on Ashok Meena Portfolio"
      >
        {/* Pulsing Live Green Dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        {/* Eye Icon */}
        <svg
          className="w-3.5 h-3.5 text-[#76756F] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {/* Views Count */}
        <span className="font-mono text-xs sm:text-[12.5px] font-extrabold text-[#0A0A0A] tracking-tight">
          {formattedViews}
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono text-[#76756F] uppercase tracking-wider font-semibold">
          Views
        </span>
      </div>
    </div>
  );
}
