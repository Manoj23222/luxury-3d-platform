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
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
            <span>🔒</span>
            <span>Admin Studio Console</span>
          </span>
          <Link
            href="/"
            className="text-[11px] font-semibold text-neutral-400 hover:text-white transition"
          >
            ← View Site
          </Link>
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
          Sign In
        </h1>
        <p className="mt-1 text-xs text-neutral-400">
          Exclusive administrator access
        </p>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
            ⚠️ {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
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
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40 shadow-inner placeholder:text-neutral-600"
              placeholder="3ddesigner5546@gmail.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
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
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40 shadow-inner placeholder:text-neutral-600"
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black transition hover:bg-neutral-200 disabled:opacity-50 cursor-pointer shadow-lg"
        >
          {loading ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Authenticate & Access →</span>
          )}
        </button>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-[11px] text-neutral-500">
            🔒 High security environment. Unauthorized access attempts are monitored and blocked.
          </p>
        </div>
      </form>
    </main>
  );
}