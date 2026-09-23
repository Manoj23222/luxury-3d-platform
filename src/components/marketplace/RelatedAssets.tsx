import Link from "next/link";
import { getCategoryTheme } from "@/lib/category-theme";

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
  const theme = getCategoryTheme(category);

  const related = assets
    .filter((item: any) => item._id !== currentId)
    .filter((item: any) => !category || item.category === category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl border border-white/10 bg-neutral-950/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              Related 3D Works
            </h2>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            More CGI assets & high-poly models from the {category || "3D archive"}.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-neutral-300 backdrop-blur-md transition duration-300 hover:border-white/30 hover:bg-white hover:text-black"
        >
          <span>View Archive</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((item: any) => {
          const itemTheme = getCategoryTheme(item.category);
          return (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl hover:shadow-black/80"
            >
              {/* Image Preview */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                    No Preview
                  </div>
                )}
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
                
                {/* Category Badge Top-Left */}
                <span className={`absolute left-2.5 top-2.5 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${itemTheme.badgeBg} ${itemTheme.badgeBorder}`}>
                  {item.category || "3D"}
                </span>
              </div>

              {/* Card Meta */}
              <div className="flex flex-1 flex-col justify-between p-3.5">
                <h3 className="line-clamp-1 text-xs font-bold text-white transition-colors group-hover:text-amber-200">
                  {item.name || "Untitled Asset"}
                </h3>

                <div className="mt-2.5 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-neutral-400">
                  <span className="font-mono text-[10px] text-neutral-500">
                    {item.views || 0} views
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-300 group-hover:text-white">
                    Inspect →
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