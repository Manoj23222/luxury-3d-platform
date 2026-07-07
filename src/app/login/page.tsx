"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login successful");
        router.push("/");
        router.refresh();
        return;
      }

      alert(data.message || "Login failed");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Welcome Back
        </p>

        <h1 className="mt-3 text-4xl font-semibold">Login to LUX3D</h1>

        <div className="mt-8 space-y-4">
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Email"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Password"
          />
        </div>

        <button
          onClick={submit}
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
      </div>
    </main>
  );
}