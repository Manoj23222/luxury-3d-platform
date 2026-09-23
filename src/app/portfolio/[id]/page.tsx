import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ViewTracker from "@/components/marketplace/ViewTracker";
import RelatedAssets from "@/components/marketplace/RelatedAssets";
import ProjectDetailExperience from "@/components/marketplace/ProjectDetailExperience";

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
      <main className="min-h-screen bg-[#07070a] text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-5 py-40 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-neutral-900/80 text-neutral-400 shadow-2xl backdrop-blur-xl">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            3D Asset Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
            The requested 3D project or GLB archive does not exist in the digital vault or has been relocated.
          </p>

          <Link
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:scale-105 hover:bg-neutral-200"
          >
            <span>← Return to 3D Portfolio</span>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07070a] text-white selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <ViewTracker id={id} />

      <ProjectDetailExperience project={project}>
        <RelatedAssets currentId={id} category={project.category} />
      </ProjectDetailExperience>
    </main>
  );
}