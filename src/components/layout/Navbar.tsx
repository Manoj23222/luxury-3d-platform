"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "3D Portfolio" },
  { href: "/photo-editing", label: "Photo Retouching" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
        

          <div className="leading-tight">
            <h1 className="text-base font-black tracking-tight text-black">
              Portfolio
            </h1>
            <p className="text-[10px] font-semibold tracking-wider text-neutral-900 uppercase">
              3D & Photo Editor
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1.5 md:flex">
          {links.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  backgroundColor: isActive ? "#000000" : "transparent",
                  color: isActive ? "#ffffff" : "#404040",
                }}
                className={`relative rounded-full px-4 py-2 text-xs font-bold transition duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-xs"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <span
                  style={{ color: isActive ? "#ffffff" : undefined }}
                  className={isActive ? "text-white font-bold" : "font-semibold"}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-300 text-lg font-bold text-black md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white p-4 md:hidden">
          <div className="space-y-1.5">
            {links.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    backgroundColor: isActive ? "#000000" : undefined,
                    color: isActive ? "#ffffff" : undefined,
                  }}
                  className={`block rounded-xl p-3 text-xs font-bold transition ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  <span style={{ color: isActive ? "#ffffff" : undefined }}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}