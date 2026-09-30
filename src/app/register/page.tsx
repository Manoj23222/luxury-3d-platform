"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafc] px-6 text-neutral-900">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200/90 bg-white/95 p-8 text-center space-y-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 border border-neutral-200 text-2xl">
          🔒
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-bold">
          High Security System
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          Registration Restricted
        </h1>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Public user registration is disabled. This studio console is reserved exclusively for the authorized administrator.
        </p>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-block w-full rounded-full bg-neutral-950 px-6 py-3 text-xs font-bold text-white transition hover:bg-neutral-800 shadow-md"
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    </main>
  );
}