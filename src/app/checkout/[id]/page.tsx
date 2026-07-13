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
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const [timeLeft, setTimeLeft] = useState(10 * 60);
const [paymentStatus, setPaymentStatus] = useState<
  "waiting" | "submitted" | "verified" | "rejected"
>("waiting");
const [submittedAt, setSubmittedAt] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "";
  const upiQrUrl = process.env.NEXT_PUBLIC_UPI_QR_URL || "";
  const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "LUX3D";

  useEffect(() => {
  setIsMobileDevice(
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}, []);

useEffect(() => {
  if (paymentStatus !== "waiting" || timeLeft <= 0) return;

  const timer = window.setInterval(() => {
    setTimeLeft((previous) => {
      if (previous <= 1) {
        window.clearInterval(timer);
        return 0;
      }

      return previous - 1;
    });
  }, 1000);

  return () => window.clearInterval(timer);
}, [paymentStatus, timeLeft]);

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

      const submittedTime = new Date().toLocaleString();

setSubmittedAt(submittedTime);
setPaymentStatus("submitted");

alert("Payment submitted successfully for admin verification.");

      
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

const formattedTime = `${Math.floor(timeLeft / 60)
  .toString()
  .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

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
  <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="mx-auto max-w-xl">
      <h2 className="text-center text-2xl font-black tracking-tight sm:text-3xl">
        Scan QR and Pay
      </h2>

      <div className="mt-7 rounded-[2rem] border-2 border-blue-100 bg-gradient-to-b from-white to-blue-50 p-5 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Amount
        </p>

        <p className="mt-2 text-4xl font-black text-black">
          ₹{Number(product.price || 0).toFixed(2)}
        </p>

        <div className="mx-auto mt-7 max-w-[280px]">
          {upiQrUrl ? (
            <img
              src={upiQrUrl}
              alt="UPI payment QR code"
              className="aspect-square w-full rounded-2xl bg-white object-contain p-2"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-6 text-sm text-neutral-500">
              QR code is not configured
            </div>
          )}
        </div>

        <p className="mt-6 text-sm font-semibold text-neutral-700">
          Pay using Google Pay, PhonePe, Paytm, BHIM
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          or any other UPI app
        </p>

        <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            UPI ID
          </p>

          <p className="mt-1 break-all text-sm font-bold text-black">
            {upiId || "UPI ID not configured"}
          </p>
        </div>

        {upiPaymentLink && isMobileDevice && (
          <a
            href={upiPaymentLink}
            className="mt-5 block rounded-2xl bg-black px-5 py-3 text-center text-sm font-bold text-white hover:bg-neutral-800"
          >
            Open UPI App
          </a>
        )}
      </div>

      <div className="mt-7 text-center">
        {timeLeft > 0 ? (
          <>
            <p className="text-lg text-neutral-700">
              QR valid for{" "}
              <span className="font-black text-black">
                {formattedTime}
              </span>{" "}
              minutes
            </p>

            <div className="mx-auto mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                style={{
                  width: `${Math.max(0, (timeLeft / 600) * 100)}%`,
                }}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
              <p className="font-bold text-amber-700">
                ⏳ Waiting for payment
              </p>

              <p className="mt-1 text-sm text-amber-600">
                After payment, enter your UTR or transaction ID below.
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-bold text-red-700">
              QR session expired
            </p>

            <button
              type="button"
              onClick={() => {
                setTimeLeft(10 * 60);
                setPaymentStatus("waiting");
              }}
              className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
            >
              Start New 10-Minute Session
            </button>
          </div>
        )}
      </div>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
          OR
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <div>
        <h3 className="text-xl font-bold">
          Already completed payment?
        </h3>

        <p className="mt-1 text-sm text-neutral-500">
          Enter your UTR or transaction ID for admin verification.
        </p>
      </div>

      {paymentStatus !== "submitted" ? (
        <div className="mt-5 grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              UPI Transaction ID / UTR *
            </span>

            <input
              value={upiTransactionId}
              onChange={(event) =>
                setUpiTransactionId(event.target.value)
              }
              placeholder="Enter transaction ID or UTR"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Payment Screenshot
              <span className="ml-1 font-normal text-neutral-500">
                (optional, maximum 10 MB)
              </span>
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={screenshotUploading}
              onChange={(event) =>
                uploadScreenshot(event.target.files?.[0] || null)
              }
              className="w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:opacity-50"
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
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-700">
            ✅ Payment details submitted
          </p>

          <p className="mt-2 text-sm text-amber-700">
            Status: Waiting for admin verification
          </p>

          <p className="mt-1 text-xs text-amber-600">
            Submitted at: {submittedAt}
          </p>

          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
          >
            View My Orders
          </button>
        </div>
      )}
    </div>
  </section>
)}

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
              disabled={
                         paying ||
                         screenshotUploading ||
                         paymentStatus === "submitted"
                        }
              className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
  {paymentStatus === "submitted"
    ? "Verification Pending"
    : screenshotUploading
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
        </div>
      </section>
    </main>
  );
}