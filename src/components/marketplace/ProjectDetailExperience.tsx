"use client";

import React, { useState } from "react";
import Link from "next/link";
import Luxury3DShowroom from "@/components/3d/Luxury3DShowroom";
import { getCategoryTheme } from "@/lib/category-theme";

interface ProjectDetailExperienceProps {
  project: {
    _id: string;
    name: string;
    category?: string;
    description?: string;
    thumbnail?: string;
    galleryImages?: string[];
    modelUrl?: string;
    modelFileName?: string;
    softwareUsed?: string[] | string;
    license?: string;
    renderEngine?: string;
    projectYear?: string | number;
    views?: number;
    downloadZipUrl?: string;
    tags?: string[];
  };
  children?: React.ReactNode; // For RelatedAssets server component
}

export default function ProjectDetailExperience({
  project,
  children,
}: ProjectDetailExperienceProps) {
  const theme = getCategoryTheme(project.category);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = [project.thumbnail, ...(project.galleryImages || [])].filter(
    Boolean
  ) as string[];

  return (
    <div className="relative min-h-screen bg-[#07070a] text-white">
      {/* LUXURY BACKGROUND LIGHTING ACCENTS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top Radial Glow from Category Accent */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[950px] rounded-full blur-[160px] opacity-15"
          style={{ backgroundColor: theme.accent }}
        />
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_20%] from-transparent via-[#07070a]/60 to-[#040406]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* TOP SLIM LUXURY HEADER & ACTION BAR */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 transition-colors hover:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>RETURN TO 3D PORTFOLIO</span>
          </Link>

          {/* Center / Right: Asset Title & Inquiry CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                {project.name || "3D Asset"}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${theme.badgeBg} ${theme.badgeBorder}`}
              >
                {project.category || "3D Model"}
              </span>
            </div>

            <Link
              href={`/contact?subject=${encodeURIComponent(
                `Inquiry regarding 3D Project: ${project.name || "Custom 3D Work"}`
              )}`}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-white/10 transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
            >
              <span>Inquire For Custom 3D Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FULL-SIZE LUXURY 3D SHOWROOM CANVAS (100% WIDTH / MAX VIEWPORT) */}
        {/* ================================================================= */}
        <div className="w-full">
          <Luxury3DShowroom
            url={project.modelUrl}
            fileName={project.modelFileName || project.modelUrl}
            category={project.category}
            projectName={project.name}
            fallbackImage={gallery[0]}
          />
        </div>

        {/* 2D RENDERS / GALLERY THUMBNAIL STRIP (IF MULTIPLE IMAGES EXIST) */}
        {gallery.length > 1 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-neutral-950/70 p-5 backdrop-blur-xl shadow-xl">
            <div className="mb-3.5 flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                High-Res CGI Renders ({gallery.length})
              </span>
              <span className="text-[11px] text-neutral-500">
                Click render to inspect in high-definition
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-lg"
                >
                  <img
                    src={img}
                    alt={`${project.name} render ${idx + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RELATED 3D WORKS */}
        {children}
      </div>

      {/* LIGHTBOX MODAL FOR GALLERY IMAGES */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-black"
          >
            ✕
          </button>

          <div
            className="relative max-h-[88vh] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[lightboxIndex]}
              alt={`${project.name} high-res render`}
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-between px-6 py-2 bg-black/70 backdrop-blur-md">
              <span className="text-xs font-bold text-white">
                {project.name} • Render {lightboxIndex + 1} of {gallery.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)
                  }
                  className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white hover:text-black"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
                  className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white hover:text-black"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
