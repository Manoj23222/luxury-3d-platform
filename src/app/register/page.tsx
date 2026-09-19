"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
          🔒
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold">
          High Security System
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-white">
          Registration Restricted
        </h1>

        <p className="text-xs text-neutral-400 leading-relaxed">
          Public user registration is disabled. This studio console is reserved exclusively for the authorized administrator.
        </p>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-block w-full rounded-full bg-white px-6 py-3 text-xs font-bold text-black transition hover:bg-neutral-200"
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    </main>
  );
}