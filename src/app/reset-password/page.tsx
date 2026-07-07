"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      alert("Email missing");
      return;
    }

    if (!password || !confirm) {
      alert("Password required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Password updated successfully");
      router.push("/login");
    } else {
      alert(data.message || "Password reset failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 text-black">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Reset Password
        </p>

        <h1 className="mt-3 text-3xl font-bold">Create new password</h1>

        <p className="mt-2 text-sm text-neutral-500">
          Account: {email || "Email not found"}
        </p>

        <div className="mt-8 grid gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="New password"
          />

          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Confirm password"
          />
        </div>

        <p className="mt-4 text-xs leading-5 text-neutral-500">
          Password example: <span className="font-semibold">Abcd@3434</span>
        </p>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
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