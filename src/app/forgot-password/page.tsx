"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      alert("Email required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      alert(data.message || "Account not found");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 text-black">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Forgot Password
        </p>

        <h1 className="mt-3 text-3xl font-bold">Find your account</h1>

        <p className="mt-2 text-sm text-neutral-500">
          Enter your registered Gmail address.
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
          placeholder="yourname@gmail.com"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Checking..." : "Continue"}
        </button>

        <Link
          href="/login"
          className="mt-5 block text-center text-sm font-semibold text-neutral-500 hover:text-black"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}