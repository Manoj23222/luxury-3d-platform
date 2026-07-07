"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const role = data.user?.role;

      if (role === "admin" || role === "creator") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Welcome Back
        </p>

        <h1 className="mt-3 text-4xl font-semibold">Login to LUX3D</h1>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Email"
            autoComplete="email"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-white px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          href="/forgot-password"
          className="mt-4 block text-center text-sm font-semibold text-neutral-400 hover:text-white"
        >
          Forgot Password?
        </Link>

        <p className="mt-5 text-center text-sm text-neutral-400">
          No account?{" "}
          <Link href="/register" className="text-white">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}