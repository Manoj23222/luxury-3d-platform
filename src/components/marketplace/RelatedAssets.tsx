import Link from "next/link";

async function getAssets() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function RelatedAssets({
  currentId,
  category,
}: {
  currentId: string;
  category?: string;
}) {
  const assets = await getAssets();

  const related = assets
    .filter((item: any) => item._id !== currentId)
    .filter((item: any) => !category || item.category === category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">Related 3D Works</h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            More projects from {category || "3D archive"}.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="text-xs font-semibold text-neutral-500 hover:text-black"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {related.map((item: any) => {
          return (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                    No Preview
                  </div>
                )}
              </div>

              <div className="p-2.5">
                <h3 className="line-clamp-1 text-xs font-bold text-black">
                  {item.name || "Untitled Asset"}
                </h3>

                <div className="mt-1.5 flex items-center justify-between">
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                    {item.category || "3D"}
                  </span>

                  <span className="text-[10px] font-semibold text-neutral-400">
                    {item.views || 0} views
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}