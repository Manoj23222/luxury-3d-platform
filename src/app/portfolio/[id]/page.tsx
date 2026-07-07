import Link from "next/link";
import ModelViewer from "@/components/3d/ModelViewer";
import Navbar from "@/components/layout/Navbar";
import ViewTracker from "@/components/marketplace/ViewTracker";
import RelatedAssets from "@/components/marketplace/RelatedAssets";
import ReviewsSection from "@/components/marketplace/ReviewsSection";

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
        <ViewTracker id={id} />
        <InfoCard label="Views" value={String(project.views || 0)} />
        <RelatedAssets currentId={id} category={project.category} />
        <ReviewsSection productId={id} />

        <section className="mx-auto max-w-5xl px-5 py-32 sm:px-6">
          <p className="text-neutral-500">Asset not found.</p>

          <Link
            href="/portfolio"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Assets
          </Link>
        </section>
      </main>
    );
  }

  const gallery = [project.thumbnail, ...(project.galleryImages || [])].filter(
    Boolean
  );

  const isFree = project.isFree !== false;
  const software = Array.isArray(project.softwareUsed)
    ? project.softwareUsed.join(", ")
    : project.softwareUsed || "Blender";

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 lg:px-10">
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-neutral-500 hover:text-black"
        >
          ← Back to Assets
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm">
              {project.modelUrl ? (
                <div className="overflow-hidden rounded-[1.5rem] bg-neutral-100">
                  <ModelViewer
  url={project.modelUrl}
  fileName={project.modelFileName || project.modelUrl}
/>
                </div>
              ) : gallery[0] ? (
                <img
                  src={gallery[0]}
                  alt={project.name}
                  className="aspect-square w-full rounded-[1.5rem] object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-neutral-100 text-neutral-400">
                  No Preview
                </div>
              )}
            </div>

            {gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {gallery.slice(0, 12).map((img: string, index: number) => (
                  <img
                    key={`${img}-${index}`}
                    src={img}
                    alt={`${project.name} ${index + 1}`}
                    className="aspect-square rounded-2xl border border-neutral-200 bg-white object-cover p-1 shadow-sm"
                  />
                ))}
              </div>
            )}

            <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black">Description</h2>
              <p className="mt-4 leading-7 text-neutral-600">
                {project.description || "Premium 3D asset for visualization."}
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
                {project.category || "3D Model"}
              </span>

              <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                {isFree ? "FREE" : "PAID"}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {project.name || "Untitled Asset"}
            </h1>

            <div className="mt-6 rounded-3xl bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-500">Price</p>
              <p className="mt-1 text-4xl font-bold text-black">
                {isFree ? "Free" : `₹${project.price || 0}`}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {isFree ? (
                <a
                  href={project.downloadZipUrl || "#"}
                  className="rounded-2xl border border-neutral-300 bg-neutral-100 px-6 py-4 text-center text-sm font-semibold text-black transition hover:border-black"
                >
                  Download Free ZIP
                </a>
              ) : (
                <Link
  href={`/checkout/${id}`}
  className="rounded-2xl border border-black bg-white px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-200"
>
  
  Buy Now ₹{project.price || 0}
</Link>
              )}

            
            </div>

            <div className="mt-6 grid gap-3">
              <InfoCard label="Software" value={software} />
              <InfoCard
                label="License"
                value={project.license || "Personal / Commercial"}
              />
              <InfoCard label="Year" value={project.projectYear || "2026"} />
              <InfoCard label="Formats" value="GLB / FBX / OBJ / ZIP" />
              <InfoCard label="Download" value={project.downloadType || "ZIP"} />
            </div>

            {project.tags?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-bold text-black">Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-600"
                    >
                      {tag}
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
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-black">{value}</p>
    </div>
  );
}