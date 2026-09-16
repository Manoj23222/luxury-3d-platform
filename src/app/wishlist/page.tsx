import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const wishRes = await fetch(`${baseUrl}/api/wishlist`, {
      cache: "no-store",
    });

    const productRes = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    const wishData = await wishRes.json();
    const productData = await productRes.json();

    const ids = wishData.items || [];
    const products = productData.products || [];

    return products.filter((item: any) => ids.includes(item._id));
  } catch {
    return [];
  }
}

export default async function WishlistPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Favorites
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Saved 3D Works
          </h1>

          <p className="mt-1 text-xs text-neutral-500">
            Your curated collection of favorite 3D models and visualizations.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-bold">No saved assets yet</p>
            <p className="mt-1 text-xs text-neutral-500">
              Browse the portfolio archive and bookmark your favorite 3D works.
            </p>

            <Link
              href="/portfolio"
              className="mt-5 inline-flex rounded-full bg-black px-5 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              Explore 3D Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
            {products.map((item: any) => {
              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/portfolio/${item._id}`}>
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
                    </Link>

                    <div className="p-3">
                      <Link href={`/portfolio/${item._id}`}>
                        <h2 className="line-clamp-1 text-xs font-bold text-neutral-900 group-hover:text-black">
                          {item.name || "Untitled Work"}
                        </h2>
                      </Link>

                      <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500">
                        {item.category || "3D Visualization"}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-1 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-neutral-400">
                      {item.views || 0} views
                    </span>

                    <Link
                      href={`/portfolio/${item._id}`}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold text-black transition hover:bg-black hover:text-white"
                    >
                      View
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}