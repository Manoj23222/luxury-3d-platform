import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SecureDownloadButton from "@/components/payment/SecureDownloadButton";
import { getCurrentUser } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

async function getOrders(userId: string) {
  await connectDB();

  return Order.find({
    userId,
    status: "Paid",
    downloadEnabled: true,
  })
    .sort({ createdAt: -1 })
    .lean();
}

export default async function LibraryPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/library");
  }

  const orders = await getOrders(user.id);

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            My Library
          </p>

          <h1 className="mt-3 text-4xl font-bold">Purchased Assets</h1>

          <p className="mt-2 text-neutral-500">
            Only assets purchased by your account are shown here.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold">No purchased assets yet</h2>

            <Link
              href="/portfolio"
              className="mt-6 inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-100"
            >
              Browse Assets
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orders.map((order: any) => (
              <article
                key={order._id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                {order.productImage ? (
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-neutral-100 text-neutral-400">
                    3D
                  </div>
                )}

                <div className="p-4">
                  <h2 className="line-clamp-1 font-bold">
                    {order.productName}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Order: {order.status}
                  </p>

                  <SecureDownloadButton orderId={order._id} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}