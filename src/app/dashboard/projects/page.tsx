import Link from "next/link";
import DeleteProductButton from "@/components/dashboard/DeleteProductButton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function DashboardProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <DashboardHeader
        title="Assets"
        subtitle="Manage your premium 3D marketplace assets."
      />

      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">All Assets</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Edit price, thumbnail, download ZIP and asset details.
          </p>
        </div>

        <Link
          href="/dashboard/upload"
          className="rounded-full border border-black bg-white px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Upload Asset
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-bold text-black">No assets found</p>
          <p className="mt-2 text-sm text-neutral-500">
            Upload your first 3D model to start building your marketplace.
          </p>

          <Link
            href="/dashboard/upload"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Upload Asset
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {projects.map((item: any) => {
            const free = item.isFree ?? true;

            return (
              <div
                key={item._id}
                className="grid gap-5 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:grid-cols-[120px_1fr_auto]"
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name || "Asset"}
                    className="h-28 w-28 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-neutral-100 text-xs text-neutral-500">
                    No Image
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="line-clamp-1 text-xl font-bold text-black">
                    {item.name || "Untitled Asset"}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                    {item.description || "Premium 3D marketplace asset."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-neutral-600">
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                      {item.category || "3D Asset"}
                    </span>

                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                      {item.status || "Published"}
                    </span>

                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                      {free ? "Free" : `₹${item.price || 0}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <Link
                    href={`/portfolio/${item._id}`}
                    className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-black transition hover:border-black"
                  >
                    Preview
                  </Link>

                  <Link
                    href={`/dashboard/projects/edit/${item._id}`}
                    className="rounded-full border border-black bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-800"
                  >
                    Edit
                  </Link>

                  <DeleteProductButton id={item._id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}