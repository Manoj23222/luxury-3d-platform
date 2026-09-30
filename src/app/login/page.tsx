"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      setError("Email and password are required.");
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
        setError(data.message || "Invalid administrator credentials.");
        setLoading(false);
        return;
      }

      // Successful admin login -> redirect to admin dashboard
      window.location.href = "/admin";
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafc] px-6 text-neutral-900 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-400/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-400/[0.04] blur-3xl" />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-neutral-200/90 bg-white/95 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-700">
            <span>🔒</span>
            <span>Admin Studio Console</span>
          </span>
          <Link
            href="/"
            className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-950 transition"
          >
            ← View Site
          </Link>
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-950">
          Sign In
        </h1>
        <p className="mt-1 text-xs text-neutral-500">
          Exclusive administrator access
        </p>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-50 p-3 text-xs font-semibold text-red-700">
            ⚠️ {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }));
                setError("");
              }}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/80 px-4 py-3 text-sm text-neutral-950 outline-hidden transition focus:border-neutral-950 focus:bg-white shadow-inner placeholder:text-neutral-400"
              placeholder="3ddesigner5546@gmail.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, password: e.target.value }));
                setError("");
              }}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/80 px-4 py-3 text-sm text-neutral-950 outline-hidden transition focus:border-neutral-950 focus:bg-white shadow-inner placeholder:text-neutral-400"
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer shadow-md"
        >
          {loading ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Authenticate & Access →</span>
          )}
        </button>

        <div className="mt-6 border-t border-neutral-100 pt-4 text-center">
          <p className="text-[11px] text-neutral-500">
            🔒 High security environment. Unauthorized access attempts are monitored and blocked.
          </p>
        </div>
      </form>
    </main>
  );
}