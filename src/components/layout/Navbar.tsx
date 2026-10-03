"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the very top
      if (currentScrollY <= 15) {
        setVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);

        // Scrolling Down past threshold -> Hide
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 60) {
          setVisible(false);
        }
        // Scrolling Up -> Show
        else if (currentScrollY < lastScrollYRef.current) {
          setVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When route changes, ensure navbar is visible
  useEffect(() => {
    setVisible(true);
  }, [pathname]);

  // Do not show public navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isWorkActive =
    pathname?.startsWith("/work") ||
    pathname?.startsWith("/photo-editing") ||
    pathname?.startsWith("/portfolio");
  const isAboutActive = pathname?.startsWith("/about");
  const isContactActive = pathname?.startsWith("/contact");

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -85 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 bg-[#EFEEEB]/95 backdrop-blur-md border-b border-[#D8D7D1] transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-black/5" : ""
      }`}
    >
      <div className="mx-auto max-w-[1720px] px-4 sm:px-10 lg:px-16 h-16 sm:h-[70px] flex items-center justify-between">
        {/* Brand / Logo: Portfolio | 3D & Photo Editing (Red Background Button) */}
        <Link
          href="/"
          className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 flex items-center gap-2 ${
            isHomeActive
              ? "bg-[#D12424] text-white ring-2 ring-[#D12424]/40 ring-offset-2 ring-offset-[#EFEEEB] brightness-90"
              : "bg-[#D12424] text-white hover:bg-[#b01c1c]"
          }`}
        >
          <span className="font-black tracking-tight uppercase">
            Portfolio
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-white/85 uppercase tracking-widest pl-2 border-l border-white/35">
            3D & Photo Editing
          </span>
        </Link>

        {/* Navigation Buttons: Work | About | Contact with Red Background */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/work"
            className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 ${
              isWorkActive
                ? "bg-[#D12424] text-white ring-2 ring-[#D12424]/40 ring-offset-2 ring-offset-[#EFEEEB] brightness-90"
                : "bg-[#D12424] text-white hover:bg-[#b01c1c]"
            }`}
          >
            Work
          </Link>

          <Link
            href="/about"
            className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 ${
              isAboutActive
                ? "bg-[#D12424] text-white ring-2 ring-[#D12424]/40 ring-offset-2 ring-offset-[#EFEEEB] brightness-90"
                : "bg-[#D12424] text-white hover:bg-[#b01c1c]"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 ${
              isContactActive
                ? "bg-[#D12424] text-white ring-2 ring-[#D12424]/40 ring-offset-2 ring-offset-[#EFEEEB] brightness-90"
                : "bg-[#D12424] text-white hover:bg-[#b01c1c]"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}