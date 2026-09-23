"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// MAGNETIC HOVER COMPONENT (DESKTOP)
// ==========================================
function MagneticItem({
  children,
  className = "",
  maxDistance = 3,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = Math.max(
        -maxDistance,
        Math.min(maxDistance, (clientX - (left + width / 2)) * 0.14)
      );
      const y = Math.max(
        -maxDistance,
        Math.min(maxDistance, (clientY - (top + height / 2)) * 0.14)
      );
      setPosition({ x, y });
    },
    [disabled, maxDistance]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// BUTTON HOVER SHINE EFFECT
// ==========================================
function HoverShine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 group-hover:left-[150%]" />
    </div>
  );
}

// ==========================================
// LUXURY PORTFOLIO NAVBAR (ALL OPTIONS VISIBLE OUTSIDE)
// ==========================================
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const pathname = usePathname();

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Trigger cinematic opening on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasOpened(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Smart Auto-Hide on Scroll Down / Reveal on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the very top
      if (currentScrollY < 15) {
        setVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);

        // Scrolling Down -> Hide Navbar (unless mobile drawer is open)
        if (currentScrollY > lastScrollY && currentScrollY > 70 && !mobileOpen) {
          setVisible(false);
        }
        // Scrolling Up -> Show Navbar
        else if (currentScrollY < lastScrollY) {
          setVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setVisible(true);
  }, [pathname]);

  const isHomeActive = pathname === "/";
  const isPortfolioActive = pathname.startsWith("/portfolio");
  const isBrandingActive = pathname.startsWith("/photo-editing");
  const isAboutActive = pathname.startsWith("/about");
  const isContactActive = pathname.startsWith("/contact");

  return (
    <motion.header
      initial={{ opacity: 0, y: -35 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -85,
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 py-1.5 sm:py-2"
    >
      {/* LUXURY COMPACT FLOATING GLASS CAPSULE */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: -24,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05,
          }}
          className="relative flex items-center justify-between rounded-full border px-3 sm:px-5 py-1.5 transition-all duration-300 overflow-hidden"
          style={{
            backgroundColor: scrolled
              ? "rgba(11, 11, 13, 0.94)"
              : "rgba(15, 15, 17, 0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderTopColor: "rgba(214, 185, 120, 0.28)",
            boxShadow: scrolled
              ? "0 10px 30px -4px rgba(0, 0, 0, 0.7), 0 0 15px rgba(214, 185, 120, 0.04)"
              : "0 6px 24px -4px rgba(0, 0, 0, 0.5), 0 0 12px rgba(214, 185, 120, 0.02)",
          }}
        >
          {/* CINEMATIC PAGE-LOAD CHAMPAGNE LIGHT SWEEP ACROSS CAPSULE */}
          {hasOpened && !reducedMotion && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "250%", opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.1, delay: 0.35, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-[#D6B978]/30 to-transparent"
            />
          )}

          {/* ========================================================= */}
          {/* BRAND LOGO WITH SLIDE-IN ENTRANCE */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex shrink-0 items-center justify-center py-0.5"
          >
            {/* Soft Warm Halo Reflection Behind Logo */}
            <div className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#D6B978]/10 via-[#E7D19A]/15 to-transparent blur-sm opacity-70" />

            <Link
              href="/"
              className="group relative block transition-transform duration-200 hover:scale-[1.02] focus:outline-hidden"
            >
              <Image
                src="/images/logo.svg"
                alt="Portfolio 3D & Photo Editor"
                width={200}
                height={50}
                priority
                className="h-8 sm:h-9 lg:h-[46px] w-auto max-w-[240px] object-contain transition-all duration-200"
              />
            </Link>
          </motion.div>

          {/* ========================================================= */}
          {/* DESKTOP COMPACT NAVIGATION PILL (ALL TABS SHOWN OUTSIDE) */}
          {/* ========================================================= */}
          <motion.nav
            initial={{ opacity: 0, x: 20, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative hidden items-center gap-0.5 rounded-full border border-white/5 bg-[#17171A]/60 p-1 backdrop-blur-xl shadow-inner md:flex"
            style={{
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* 1. HOME LINK */}
            <MagneticItem disabled={reducedMotion} maxDistance={2.5}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              >
                <Link
                  href="/"
                  className="group relative flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 hover:-translate-y-[0.5px] active:scale-[0.97] focus:outline-hidden"
                >
                  {/* Active Sliding Indicator Pill */}
                  {isHomeActive && (
                    <motion.div
                      layoutId="luxuryActiveNavPill"
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1A1A1D 0%, #0B0B0D 100%)",
                        border: "1px solid rgba(214, 185, 120, 0.35)",
                        boxShadow:
                          "0 3px 10px -2px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(214,185,120,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      {!reducedMotion && (
                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: "200%", opacity: 0.8 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6B978] to-transparent"
                        />
                      )}
                    </motion.div>
                  )}

                  <HoverShine />

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isHomeActive
                        ? "font-bold text-[#F7F5EF]"
                        : "text-[#E8E8E6]/80 group-hover:text-[#F7F5EF]"
                    }`}
                  >
                    Home
                  </span>

                  {/* Subtle Champagne Underline for Inactive */}
                  {!isHomeActive && !reducedMotion && (
                    <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 rounded-full bg-[#D6B978] opacity-0 transition-all duration-200 group-hover:w-3.5 group-hover:opacity-90" />
                  )}
                </Link>
              </motion.div>
            </MagneticItem>

            {/* 2. 3D MODELS (SHOWN DIRECTLY OUTSIDE) */}
            <MagneticItem disabled={reducedMotion} maxDistance={2.5}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              >
                <Link
                  href="/portfolio"
                  className="group relative flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 hover:-translate-y-[0.5px] active:scale-[0.97] focus:outline-hidden"
                >
                  {/* Active Sliding Indicator Pill */}
                  {isPortfolioActive && (
                    <motion.div
                      layoutId="luxuryActiveNavPill"
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1A1A1D 0%, #0B0B0D 100%)",
                        border: "1px solid rgba(214, 185, 120, 0.35)",
                        boxShadow:
                          "0 3px 10px -2px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(214,185,120,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      {!reducedMotion && (
                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: "200%", opacity: 0.8 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6B978] to-transparent"
                        />
                      )}
                    </motion.div>
                  )}

                  <HoverShine />

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isPortfolioActive
                        ? "font-bold text-[#F7F5EF]"
                        : "text-[#E8E8E6]/80 group-hover:text-[#F7F5EF]"
                    }`}
                  >
                    3D Models
                  </span>

                  {/* Subtle Champagne Underline for Inactive */}
                  {!isPortfolioActive && !reducedMotion && (
                    <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 rounded-full bg-[#D6B978] opacity-0 transition-all duration-200 group-hover:w-3.5 group-hover:opacity-90" />
                  )}
                </Link>
              </motion.div>
            </MagneticItem>

            {/* 3. BRANDING & VISUALS (SHOWN DIRECTLY OUTSIDE) */}
            <MagneticItem disabled={reducedMotion} maxDistance={2.5}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.46, ease: "easeOut" }}
              >
                <Link
                  href="/photo-editing"
                  className="group relative flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 hover:-translate-y-[0.5px] active:scale-[0.97] focus:outline-hidden"
                >
                  {/* Active Sliding Indicator Pill */}
                  {isBrandingActive && (
                    <motion.div
                      layoutId="luxuryActiveNavPill"
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1A1A1D 0%, #0B0B0D 100%)",
                        border: "1px solid rgba(214, 185, 120, 0.35)",
                        boxShadow:
                          "0 3px 10px -2px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(214,185,120,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      {!reducedMotion && (
                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: "200%", opacity: 0.8 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6B978] to-transparent"
                        />
                      )}
                    </motion.div>
                  )}

                  <HoverShine />

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isBrandingActive
                        ? "font-bold text-[#F7F5EF]"
                        : "text-[#E8E8E6]/80 group-hover:text-[#F7F5EF]"
                    }`}
                  >
                    Branding & Creative
                  </span>

                  {/* Subtle Champagne Underline for Inactive */}
                  {!isBrandingActive && !reducedMotion && (
                    <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 rounded-full bg-[#D6B978] opacity-0 transition-all duration-200 group-hover:w-3.5 group-hover:opacity-90" />
                  )}
                </Link>
              </motion.div>
            </MagneticItem>

            {/* 4. ABOUT LINK */}
            <MagneticItem disabled={reducedMotion} maxDistance={2.5}>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52, ease: "easeOut" }}
              >
                <Link
                  href="/about"
                  className="group relative flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 hover:-translate-y-[0.5px] active:scale-[0.97] focus:outline-hidden"
                >
                  {/* Active Sliding Indicator Pill */}
                  {isAboutActive && (
                    <motion.div
                      layoutId="luxuryActiveNavPill"
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1A1A1D 0%, #0B0B0D 100%)",
                        border: "1px solid rgba(214, 185, 120, 0.35)",
                        boxShadow:
                          "0 3px 10px -2px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(214,185,120,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      {!reducedMotion && (
                        <motion.div
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: "200%", opacity: 0.8 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6B978] to-transparent"
                        />
                      )}
                    </motion.div>
                  )}

                  <HoverShine />

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isAboutActive
                        ? "font-bold text-[#F7F5EF]"
                        : "text-[#E8E8E6]/80 group-hover:text-[#F7F5EF]"
                    }`}
                  >
                    About
                  </span>

                  {/* Subtle Champagne Underline for Inactive */}
                  {!isAboutActive && !reducedMotion && (
                    <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 rounded-full bg-[#D6B978] opacity-0 transition-all duration-200 group-hover:w-3.5 group-hover:opacity-90" />
                  )}
                </Link>
              </motion.div>
            </MagneticItem>

            {/* 5. CONTACT BUTTON (COMPACT LUXURY CTA) */}
            <MagneticItem disabled={reducedMotion} maxDistance={3.5}>
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.58, ease: "easeOut" }}
              >
                <Link
                  href="/contact"
                  className={`group relative flex items-center justify-center overflow-hidden rounded-full px-4 py-1 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.96] focus:outline-hidden ${
                    isContactActive
                      ? "bg-gradient-to-r from-[#D6B978] to-[#B8954F] text-[#0B0B0D] shadow-md shadow-[#D6B978]/25 font-bold"
                      : "border border-[#D6B978]/45 bg-[#0B0B0D] text-[#E8E8E6] hover:bg-gradient-to-r hover:from-[#D6B978] hover:to-[#B8954F] hover:text-[#0B0B0D] hover:scale-[1.02] hover:shadow-md hover:shadow-[#D6B978]/20"
                  }`}
                >
                  {/* Diagonal Light Sweep on Hover */}
                  <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-500 group-hover:left-[150%]" />

                  <span className="relative z-10 flex items-center gap-1">
                    <span>Contact</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            </MagneticItem>
          </motion.nav>

          {/* ========================================================= */}
          {/* MOBILE HAMBURGER BUTTON */}
          {/* ========================================================= */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6B978]/30 bg-[#17171A] text-sm font-bold text-[#F7F5EF] shadow-md md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "✕" : "☰"}
          </motion.button>
        </motion.div>
      </div>

      {/* THIN ANIMATED ACCENT LINE BENEATH NAVBAR WITH SCALE-X EXPANSION */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: 1,
          opacity: scrolled ? 0.35 : 0.18,
        }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-1 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D6B978] to-transparent"
      />

      {/* ========================================================= */}
      {/* MOBILE DRAWER WITH SEQUENTIALLY STAGGERED ENTRANCE */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-1.5 overflow-hidden rounded-2xl border border-[#D6B978]/25 p-3.5 md:hidden shadow-2xl"
            style={{
              backgroundColor: "rgba(11, 11, 13, 0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="space-y-1.5">
              {/* Home */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.18 }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl p-3 text-xs font-bold transition-all ${
                    isHomeActive
                      ? "bg-[#1A1A1D] text-[#D6B978] border border-[#D6B978]/35 shadow-sm"
                      : "bg-white/[0.03] text-[#E8E8E6] hover:bg-white/[0.08]"
                  }`}
                >
                  Home
                </Link>
              </motion.div>

              {/* 3D Models */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.18 }}
              >
                <Link
                  href="/portfolio"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl p-3 text-xs font-bold transition-all ${
                    isPortfolioActive
                      ? "bg-[#1A1A1D] text-[#D6B978] border border-[#D6B978]/35 shadow-sm"
                      : "bg-white/[0.03] text-[#E8E8E6] hover:bg-white/[0.08]"
                  }`}
                >
                  3D Models & Assets
                </Link>
              </motion.div>

              {/* Branding & Creative */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.18 }}
              >
                <Link
                  href="/photo-editing"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl p-3 text-xs font-bold transition-all ${
                    isBrandingActive
                      ? "bg-[#1A1A1D] text-[#D6B978] border border-[#D6B978]/35 shadow-sm"
                      : "bg-white/[0.03] text-[#E8E8E6] hover:bg-white/[0.08]"
                  }`}
                >
                  Branding & Creative Visuals
                </Link>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.18 }}
              >
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl p-3 text-xs font-bold transition-all ${
                    isAboutActive
                      ? "bg-[#1A1A1D] text-[#D6B978] border border-[#D6B978]/35 shadow-sm"
                      : "bg-white/[0.03] text-[#E8E8E6] hover:bg-white/[0.08]"
                  }`}
                >
                  About
                </Link>
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.18 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#D6B978] to-[#B8954F] p-3 text-xs font-bold text-[#0B0B0D] shadow-md shadow-[#D6B978]/20 transition-transform active:scale-[0.98]"
                >
                  <span>Initiate Contact / Inquiry</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}