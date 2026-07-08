import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { getCurrentUser } from "@/lib/auth";

async function getOrders() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/orders`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.orders || [];
}

export default async function DownloadsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/downloads");
  }

  const orders = await getOrders();

  const history = orders.flatMap((order: any) =>
    (order.downloadHistory || []).map((item: any) => ({
      orderId: order._id,
      productId: order.productId,
      productName: order.productName,
      productImage: order.productImage,
      format: item.format,
      downloadedAt: item.downloadedAt,
    }))
  );

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-bold">Download History</h1>

          <p className="mt-2 text-neutral-500">
            View your purchased asset download records.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold">No downloads yet</h2>

            <Link
              href="/library"
              className="mt-6 inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-100"
            >
              Go to Library
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Format</th>
                    <th className="px-5 py-4">Downloaded At</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200">
                  {history.map((item: any, index: number) => (
                    <tr key={`${item.orderId}-${index}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-neutral-100">
                            {item.productImage ? (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>

                          <div>
                            <p className="font-semibold text-black">
                              {item.productName || "3D Asset"}
                            </p>
                            <p className="text-xs text-neutral-500">
                              Order: {item.orderId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-bold uppercase">
                        {item.format || "-"}
                      </td>

                      <td className="px-5 py-4 text-neutral-600">
                        {item.downloadedAt
                          ? new Date(item.downloadedAt).toLocaleString()
                          : "-"}
                      </td>

                      <td className="px-5 py-4">
                        {item.productId ? (
                          <Link
                            href={`/product/${item.productId}`}
                            className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-bold hover:border-black"
                          >
                            View Asset
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}