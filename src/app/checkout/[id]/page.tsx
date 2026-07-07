"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me", { cache: "no-store" });
      const meData = await meRes.json();

      if (!meData.success) {
        router.push(`/login?next=/checkout/${id}`);
        return;
      }

      setUser(meData.user);
      setForm((prev) => ({
        ...prev,
        name: meData.user?.name || "",
        email: meData.user?.email || "",
      }));

      const res = await fetch(`/api/public/products/${id}`);
      const data = await res.json();

      if (data.product) setProduct(data.product);

      setLoading(false);
    }

    load();
  }, [id, router]);

  const payNow = async () => {
    if (!user) {
      router.push(`/login?next=/checkout/${id}`);
      return;
    }

    setPaying(true);

    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        customerPhone: form.phone,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setPaying(false);
      alert(data.message || "Order failed");
      return;
    }

    const verify = await fetch("/api/payments/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpayOrderId: data.razorpayOrder.id,
        razorpayPaymentId: `demo_payment_${Date.now()}`,
        razorpaySignature: "demo_signature",
      }),
    });

    const verifyData = await verify.json();
    setPaying(false);

    if (!verifyData.success) {
      alert("Payment verification failed");
      return;
    }

    alert("Payment successful. Asset added to library.");
    router.push("/library");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 text-black">
        <Navbar />
        <div className="px-5 pt-32">Loading checkout...</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-50 text-black">
        <Navbar />
        <div className="px-5 pt-32">Asset not found.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-6 lg:px-10">
        <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Complete Your Purchase
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Checkout is protected. Only logged-in users can purchase assets.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Customer Details</h2>

            <div className="mt-6 grid gap-4">
              <input
                value={form.name}
                readOnly
                className="rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm outline-none"
              />

              <input
                value={form.email}
                readOnly
                className="rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm outline-none"
              />

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="Phone Optional"
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-5 flex gap-4">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  3D
                </div>
              )}

              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {product.category || "3D Asset"}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Asset Price</span>
                <span className="font-bold">₹{product.price || 0}</span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{product.price || 0}</span>
              </div>
            </div>

            <button
              onClick={payNow}
              disabled={paying}
              className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {paying ? "Processing..." : "Pay Now"}
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}