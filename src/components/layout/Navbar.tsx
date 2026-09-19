"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setWorkDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomeActive = pathname === "/";
  const isWorkActive =
    pathname.startsWith("/portfolio") || pathname.startsWith("/photo-editing");
  const isAboutActive = pathname.startsWith("/about");
  const isContactActive = pathname.startsWith("/contact");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/80 bg-gradient-to-r from-neutral-50/90 via-white/85 to-neutral-50/90 backdrop-blur-2xl shadow-2xs">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo with Unique Light Card Matching Frame */}
        <Link
          href="/"
          className="group relative flex shrink-0 items-center justify-center rounded-2xl border border-neutral-200/70 bg-gradient-to-r from-neutral-100/70 via-white/90 to-neutral-50/80 px-3 py-1 shadow-2xs transition-all duration-300 hover:border-neutral-300 hover:shadow-xs hover:scale-[1.02]"
        >
          <Image
            src="/images/logo.svg"
            alt="Portfolio 3D & Photo Editor"
            width={180}
            height={56}
            priority
            className="h-10 sm:h-12 lg:h-[60px] w-auto max-w-[210px] object-contain drop-shadow-xs transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Capsule */}
        <div className="hidden items-center gap-1 rounded-full border border-neutral-200/70 bg-neutral-100/60 p-1 backdrop-blur-md shadow-2xs md:flex">
          {/* Home Link */}
          <Link
            href="/"
            style={{
              backgroundColor: isHomeActive ? "#000000" : "transparent",
              color: isHomeActive ? "#ffffff" : "#404040",
            }}
            className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition duration-200 ${
              isHomeActive
                ? "bg-black text-white shadow-xs"
                : "text-neutral-700 hover:bg-white hover:text-black hover:shadow-2xs"
            }`}
          >
            <span className={isHomeActive ? "text-white font-bold" : "font-semibold"}>
              Home
            </span>
          </Link>

          {/* "My Work" Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setWorkDropdownOpen(true)}
            onMouseLeave={() => setWorkDropdownOpen(false)}
          >
            <button
              onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
              style={{
                backgroundColor: isWorkActive ? "#000000" : "transparent",
                color: isWorkActive ? "#ffffff" : "#404040",
              }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition duration-200 cursor-pointer ${
                isWorkActive
                  ? "bg-black text-white shadow-xs"
                  : "text-neutral-700 hover:bg-white hover:text-black hover:shadow-2xs"
              }`}
              aria-expanded={workDropdownOpen}
            >
              <span className={isWorkActive ? "text-white font-bold" : "font-semibold"}>
                My Work
              </span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  workDropdownOpen ? "rotate-180" : ""
                } ${isWorkActive ? "text-white" : "text-neutral-500"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu Container */}
            {workDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 z-50 w-56">
                <div className="rounded-2xl border border-neutral-200/90 bg-gradient-to-b from-white via-neutral-50/95 to-neutral-100/80 backdrop-blur-2xl p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <Link
                    href="/portfolio"
                    onClick={() => setWorkDropdownOpen(false)}
                    className={`block w-full rounded-xl px-4 py-2.5 text-xs font-bold tracking-tight transition duration-150 whitespace-nowrap ${
                      pathname.startsWith("/portfolio")
                        ? "bg-black text-white shadow-xs"
                        : "text-neutral-800 hover:bg-neutral-100/90 hover:text-black"
                    }`}
                  >
                    3D Models
                  </Link>

                  <Link
                    href="/photo-editing"
                    onClick={() => setWorkDropdownOpen(false)}
                    className={`block w-full rounded-xl px-4 py-2.5 text-xs font-bold tracking-tight transition duration-150 whitespace-nowrap ${
                      pathname.startsWith("/photo-editing")
                        ? "bg-black text-white shadow-xs"
                        : "text-neutral-800 hover:bg-neutral-100/90 hover:text-black"
                    }`}
                  >
                    Branding & Creative
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* About Link */}
          <Link
            href="/about"
            style={{
              backgroundColor: isAboutActive ? "#000000" : "transparent",
              color: isAboutActive ? "#ffffff" : "#404040",
            }}
            className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition duration-200 ${
              isAboutActive
                ? "bg-black text-white shadow-xs"
                : "text-neutral-700 hover:bg-white hover:text-black hover:shadow-2xs"
            }`}
          >
            <span className={isAboutActive ? "text-white font-bold" : "font-semibold"}>
              About
            </span>
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            style={{
              backgroundColor: isContactActive ? "#000000" : "transparent",
              color: isContactActive ? "#ffffff" : "#404040",
            }}
            className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition duration-200 ${
              isContactActive
                ? "bg-black text-white shadow-xs"
                : "text-neutral-700 hover:bg-white hover:text-black hover:shadow-2xs"
            }`}
          >
            <span className={isContactActive ? "text-white font-bold" : "font-semibold"}>
              Contact
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-300 bg-white text-lg font-bold text-black shadow-2xs md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-neutral-200/80 bg-neutral-50/95 backdrop-blur-2xl p-4 md:hidden shadow-lg">
          <div className="space-y-2">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl p-3 text-xs font-bold transition ${
                isHomeActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-neutral-800 hover:bg-neutral-100 shadow-2xs"
              }`}
            >
              Home
            </Link>

            {/* My Work Category Header & Sublinks */}
            <div className="rounded-2xl border border-neutral-200 bg-white/80 p-2.5 shadow-2xs">
              <p className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-500">
                My Work
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  href="/portfolio"
                  onClick={() => setMobileOpen(false)}
                  className={`block w-full rounded-xl p-3 text-xs font-bold transition ${
                    pathname.startsWith("/portfolio")
                      ? "bg-black text-white shadow-xs"
                      : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  3D Models
                </Link>

                <Link
                  href="/photo-editing"
                  onClick={() => setMobileOpen(false)}
                  className={`block w-full rounded-xl p-3 text-xs font-bold transition ${
                    pathname.startsWith("/photo-editing")
                      ? "bg-black text-white shadow-xs"
                      : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  Branding & Creative
                </Link>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl p-3 text-xs font-bold transition ${
                isAboutActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-neutral-800 hover:bg-neutral-100 shadow-2xs"
              }`}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl p-3 text-xs font-bold transition ${
                isContactActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-neutral-800 hover:bg-neutral-100 shadow-2xs"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}