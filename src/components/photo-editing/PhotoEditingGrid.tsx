"use client";

import { useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import PhotoWorkModal, { PhotoWorkItem } from "./PhotoWorkModal";

interface PhotoEditingGridProps {
  initialWorks: PhotoWorkItem[];
}

export default function PhotoEditingGrid({
  initialWorks,
}: PhotoEditingGridProps) {
  const [works] = useState<PhotoWorkItem[]>(initialWorks);
  const [activeWork, setActiveWork] = useState<PhotoWorkItem | null>(null);

  return (
    <>
      {/* PURE IMAGE SHOWCASE GRID: 4 COLUMNS, COMPACT GAP, ONLY IMAGES & SMALL TITLE */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {works.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-bold text-black">No artworks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {works.map((work) => {
              const isBeforeAfter =
                (work.workType === "before_after" || !work.workType) &&
                Boolean(work.beforeImage) &&
                work.beforeImage !== work.afterImage;

              return (
                <article
                  key={work._id}
                  onClick={() => setActiveWork(work)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-2 shadow-2xs transition duration-200 hover:border-black hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* Media: Split Slider or High-Res Banner */}
                  {isBeforeAfter ? (
                    <div className="relative overflow-hidden rounded-xl bg-neutral-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] aspect-[4/3] w-full">
                      <BeforeAfterSlider
                        beforeImage={work.beforeImage!}
                        afterImage={work.afterImage}
                        aspectRatio="aspect-[4/3]"
                        fitMode="cover"
                        enableAutoScan={true}
                      />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl bg-neutral-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] aspect-[4/3] w-full">
                      <img
                        src={work.afterImage || work.thumbnail}
                        alt={work.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Only Small Project Title in Tight Gap */}
                  <div className="pt-2 pb-0.5 px-1">
                    <h3
                      className="text-xs font-bold text-neutral-900 group-hover:text-black line-clamp-1 transition leading-tight"
                      title={work.title}
                    >
                      {work.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Detail Lightbox Modal */}
      <PhotoWorkModal
        work={activeWork}
        onClose={() => setActiveWork(null)}
      />
    </>
  );
}
