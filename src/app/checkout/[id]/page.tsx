"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

type PaymentMethod = "UPI" | "Razorpay";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [screenshotUploading, setScreenshotUploading] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("UPI");

  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "";
  const upiQrUrl = process.env.NEXT_PUBLIC_UPI_QR_URL || "";
  const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "LUX3D";

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/auth/me", {
          cache: "no-store",
        });

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

        const res = await fetch(`/api/public/products/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.product) {
          setProduct(data.product);
        }
      } catch {
        alert("Checkout loading failed");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, router]);

  const upiPaymentLink = useMemo(() => {
    if (!product || !upiId) return "";

    const params = new URLSearchParams({
      pa: upiId,
      pn: upiName,
      am: String(Number(product.price || 0)),
      cu: "INR",
      tn: `LUX3D - ${product.name || "3D Asset"}`,
    });

    return `upi://pay?${params.toString()}`;
  }, [product, upiId, upiName]);

  const uploadScreenshot = async (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select JPG, PNG or WEBP image");
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Payment screenshot maximum size is 10 MB");
      return;
    }

    setScreenshotUploading(true);

    try {
      const data = new FormData();

      data.append("file", file);
      data.append("title", file.name);
      data.append("uploadType", "paymentScreenshot");

      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Screenshot upload failed");
        return;
      }

      setPaymentScreenshot(result.url || result.media?.url || "");
    } catch {
      alert("Screenshot upload failed");
    } finally {
      setScreenshotUploading(false);
    }
  };

  const submitUpiPayment = async () => {
    if (!user) {
      router.push(`/login?next=/checkout/${id}`);
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number");
      return;
    }

    if (!upiTransactionId.trim()) {
      alert("Please enter UPI transaction ID / UTR");
      return;
    }

    if (upiTransactionId.trim().length < 6) {
      alert("Please enter a valid transaction ID / UTR");
      return;
    }

    if (screenshotUploading) {
      alert("Please wait for screenshot upload to complete");
      return;
    }

    setPaying(true);

    try {
      const res = await fetch("/api/payments/upi-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          customerPhone: form.phone.trim(),
          upiTransactionId: upiTransactionId.trim(),
          paymentScreenshot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Payment submission failed");
        return;
      }

      if (data.alreadyPurchased) {
        alert("You already purchased this asset.");
        router.push("/library");
        return;
      }

      alert(
        "Payment submitted successfully. Download will unlock after admin verification."
      );

      router.push("/orders");
    } catch {
      alert("Payment submission failed");
    } finally {
      setPaying(false);
    }
  };

  const payWithRazorpay = async () => {
    if (!user) {
      router.push(`/login?next=/checkout/${id}`);
      return;
    }

    setPaying(true);

    try {
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

      if (!res.ok || !data.success) {
        alert(data.message || "Order creation failed");
        return;
      }

      if (data.alreadyPurchased) {
        router.push("/library");
        return;
      }

      alert(
        "Razorpay live checkout is not connected yet. Please use UPI QR payment."
      );
    } catch {
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const submitPayment = () => {
    if (paymentMethod === "UPI") {
      submitUpiPayment();
      return;
    }

    payWithRazorpay();
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

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Complete Your Purchase
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Pay with UPI QR and submit your transaction ID for verification.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-6">
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">1. Customer Details</h2>

              <div className="mt-5 grid gap-4">
                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Name
                  </span>
                  <input
                    value={form.name}
                    readOnly
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Email
                  </span>
                  <input
                    value={form.email}
                    readOnly
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Phone Number
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">2. Payment Method</h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("UPI")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "UPI"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 bg-white hover:border-black"
                  }`}
                >
                  <p className="font-bold">UPI QR Payment</p>
                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod === "UPI"
                        ? "text-neutral-300"
                        : "text-neutral-500"
                    }`}
                  >
                    Google Pay, PhonePe, Paytm or BHIM
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Razorpay")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "Razorpay"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 bg-white hover:border-black"
                  }`}
                >
                  <p className="font-bold">Online Gateway</p>
                  <p
                    className={`mt-1 text-xs ${
                      paymentMethod === "Razorpay"
                        ? "text-neutral-300"
                        : "text-neutral-500"
                    }`}
                  >
                    Razorpay automatic payment
                  </p>
                </button>
              </div>
            </section>

            {paymentMethod === "UPI" && (
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">3. Scan & Pay</h2>

                <div className="mt-5 grid gap-6 md:grid-cols-[240px_1fr]">
                  <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4 text-center">
                    {upiQrUrl ? (
                      <img
                        src={upiQrUrl}
                        alt="UPI payment QR code"
                        className="mx-auto aspect-square w-full rounded-2xl object-contain"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center rounded-2xl bg-white text-sm text-neutral-500">
                        Add NEXT_PUBLIC_UPI_QR_URL in .env.local
                      </div>
                    )}

                    <p className="mt-3 text-xs text-neutral-500">
                      Scan using any UPI app
                    </p>
                  </div>

                  <div>
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Payable Amount
                      </p>

                      <p className="mt-2 text-3xl font-black">
                        ₹{Number(product.price || 0)}
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-neutral-200 p-4">
                      <p className="text-xs text-neutral-500">UPI ID</p>
                      <p className="mt-1 break-all font-bold">
                        {upiId || "UPI ID not configured"}
                      </p>
                    </div>

                    {upiPaymentLink && (
                      <a
                        href={upiPaymentLink}
                        className="mt-4 block rounded-2xl border border-black bg-white px-5 py-3 text-center text-sm font-semibold text-white hover:bg-neutral-800"
                      >
                        Open UPI App
                      </a>
                    )}

                    <p className="mt-4 text-xs leading-5 text-neutral-500">
                      Payment complete hone ke baad neeche UTR / transaction
                      ID enter karein.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <label>
                    <span className="mb-2 block text-sm font-semibold">
                      UPI Transaction ID / UTR *
                    </span>

                    <input
                      value={upiTransactionId}
                      onChange={(e) =>
                        setUpiTransactionId(e.target.value)
                      }
                      placeholder="Enter transaction ID or UTR"
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>

                  

                  {screenshotUploading && (
                    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                      Uploading payment screenshot...
                    </div>
                  )}

                  {paymentScreenshot && !screenshotUploading && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                      Payment screenshot uploaded successfully.
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Order Summary</h2>

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

              <div className="min-w-0">
                <h3 className="line-clamp-2 font-bold">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {product.category || "3D Asset"}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Asset Price</span>
                <span className="font-bold">
                  ₹{Number(product.price || 0)}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{Number(product.price || 0)}</span>
              </div>
            </div>

            <button
              onClick={submitPayment}
              disabled={paying || screenshotUploading}
              className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {screenshotUploading
                ? "Uploading Screenshot..."
                : paying
                ? "Submitting..."
                : paymentMethod === "UPI"
                ? "Submit Payment for Verification"
                : "Pay with Razorpay"}
            </button>

            {paymentMethod === "UPI" && (
              <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
                Download admin payment verification ke baad unlock hoga.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}