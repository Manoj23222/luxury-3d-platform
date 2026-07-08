import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SecureDownloadButton from "@/components/payment/SecureDownloadButton";
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

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/orders");
  }

  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-bold">My Orders</h1>

          <p className="mt-2 text-neutral-500">
            Track your purchases, payments and download access.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold">No orders yet</h2>

            <Link
              href="/portfolio"
              className="mt-6 inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-100"
            >
              Browse Assets
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order: any) => (
              <article
                key={order._id}
                className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                    {order.productImage ? (
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-neutral-400">
                        3D
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold">
                      {order.productName || "3D Asset"}
                    </h2>

                    <div className="mt-3 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-neutral-400">
                          Amount
                        </p>
                        <p className="font-semibold text-black">
                          {order.currency || "INR"} {order.amount || 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-neutral-400">
                          Payment
                        </p>
                        <p className="font-semibold text-black">
                          {order.status || "Pending"}
                        </p>
                        <div>
  <p className="text-xs font-bold uppercase text-neutral-400">
    Last Download
  </p>
  <p className="font-semibold text-black">
    {order.lastDownloadedAt
      ? new Date(order.lastDownloadedAt).toLocaleString()
      : "-"}
  </p>
</div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-neutral-400">
                          Download
                        </p>
                        <p className="font-semibold text-black">
                          {order.downloadEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-neutral-400">
                          Date
                        </p>
                        <p className="font-semibold text-black">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      {order.productId && (
                        <Link
                          href={`/product/${order.productId}`}
                          className="rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold hover:border-black"
                        >
                          View Asset
                        </Link>
                      )}

                      {order.status === "Paid" && order.downloadEnabled && (
                        <div className="w-full sm:max-w-xs">
                          <SecureDownloadButton orderId={order._id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}