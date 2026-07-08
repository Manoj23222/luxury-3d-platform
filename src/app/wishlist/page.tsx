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

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 lg:px-10">
        <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Favorites
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Wishlist Assets
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Your saved premium 3D assets.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-bold">No wishlist assets yet</p>

            <Link
              href="/portfolio"
              className="mt-6 inline-flex rounded-full border border-neutral-400 bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Browse Assets
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item: any) => {
              const free = item.isFree ?? true;

              return (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/portfolio/${item._id}`}>
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-neutral-100 text-neutral-400">
                        No Image
                      </div>
                    )}
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="line-clamp-1 text-base font-bold">
                        {item.name || "Untitled Asset"}
                      </h2>

                      <span className="text-sm font-bold">
                        {free ? "₹0" : `₹${item.price || 0}`}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                      {item.description || "Premium 3D Asset"}
                    </p>

                    <Link
                      href={`/portfolio/${item._id}`}
                      className="mt-5 block rounded-xl bg-black py-3 text-center text-sm font-semibold text-white"
                    >
                      View Asset
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