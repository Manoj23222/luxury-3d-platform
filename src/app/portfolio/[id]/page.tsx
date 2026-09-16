import Link from "next/link";
import ModelViewer from "@/components/3d/ModelViewer";
import Navbar from "@/components/layout/Navbar";
import ViewTracker from "@/components/marketplace/ViewTracker";
import RelatedAssets from "@/components/marketplace/RelatedAssets";
import ReviewsSection from "@/components/marketplace/ReviewsSection";
import WishlistButton from "@/components/marketplace/WishlistButton";

async function getProject(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/public/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.product || null;
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />
        <section className="mx-auto max-w-5xl px-5 py-36 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold">3D Asset Not Found</h1>
          <p className="mt-2 text-sm text-neutral-500">
            The requested 3D project does not exist or has been removed.
          </p>

          <Link
            href="/portfolio"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Return to 3D Portfolio
          </Link>
        </section>
      </main>
    );
  }

  const gallery = [project.thumbnail, ...(project.galleryImages || [])].filter(
    Boolean
  );

  const software = Array.isArray(project.softwareUsed)
    ? project.softwareUsed.join(", ")
    : project.softwareUsed || "Blender, Maya, Substance 3D";

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />
      <ViewTracker id={id} />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-black"
          >
            ← Back to 3D Portfolio
          </Link>

          <div className="flex items-center gap-2">
            <WishlistButton id={id} />
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main 3D Viewer & Media Showcase */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-xs">
              {project.modelUrl ? (
                <div className="overflow-hidden rounded-2xl bg-neutral-100">
                  <ModelViewer
                    url={project.modelUrl}
                    fileName={project.modelFileName || project.modelUrl}
                  />
                </div>
              ) : gallery[0] ? (
                <img
                  src={gallery[0]}
                  alt={project.name}
                  className="aspect-video w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  No Preview Available
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-6">
                {gallery.slice(0, 12).map((img: string, index: number) => (
                  <div
                    key={`${img}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs"
                  >
                    <img
                      src={img}
                      alt={`${project.name} preview ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description Card */}
            <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-black">Project Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
                {project.description ||
                  "High-fidelity 3D visualization crafted for digital product presentation, commercial CGI, and interactive luxury experiences."}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="mt-6">
              <ReviewsSection productId={id} />
            </div>

            {/* Related 3D Assets */}
            <RelatedAssets currentId={id} category={project.category} />
          </div>

          {/* Sidebar Specifications & Inquiry Action */}
          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs lg:sticky lg:top-24">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
                {project.category || "3D Model"}
              </span>

              <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                Portfolio Showcase
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              {project.name || "Untitled Work"}
            </h1>

            {/* Project Quick Stats */}
            <div className="mt-4 flex items-center gap-4 border-y border-neutral-100 py-3 text-xs text-neutral-500">
              <span>{project.views || 0} Total Views</span>
              <span>•</span>
              <span>Year: {project.projectYear || "2026"}</span>
            </div>

            {/* Call to Action: Inquiry & Optional Download */}
            <div className="mt-6 grid gap-2.5">
              <Link
                href={`/contact?subject=${encodeURIComponent(
                  `Inquiry regarding 3D Project: ${project.name || "Custom 3D Work"}`
                )}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-3.5 text-center text-xs font-bold text-white transition hover:bg-neutral-800"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Inquire For Custom 3D Work
              </Link>

              {project.downloadZipUrl && (
                <a
                  href={project.downloadZipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-neutral-50 px-6 py-3 text-center text-xs font-bold text-neutral-900 transition hover:border-black hover:bg-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Model Archive
                </a>
              )}
            </div>

            {/* Technical Specs */}
            <div className="mt-6 grid gap-2.5">
              <InfoCard label="Software Used" value={software} />
              <InfoCard
                label="License"
                value={project.license || "All Rights Reserved / Showcase"}
              />
              <InfoCard label="Formats" value="GLB / GLTF / FBX / OBJ" />
              <InfoCard label="Render Engine" value={project.renderEngine || "Cycles / Eevee / Octane"} />
            </div>

            {project.tags?.length > 0 && (
              <div className="mt-6 border-t border-neutral-100 pt-5">
                <p className="text-xs font-bold text-black">Keywords & Tags</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 px-3.5 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-neutral-800">{value}</p>
    </div>
  );
}