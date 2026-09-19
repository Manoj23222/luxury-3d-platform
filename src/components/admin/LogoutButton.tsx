"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({
  variant = "header",
  className = "",
}: {
  variant?: "header" | "sidebar" | "compact";
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  if (variant === "sidebar") {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50/60 px-3.5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50 ${className}`}
      >
        <span>🚪</span>
        <span>{loading ? "Logging out..." : "Logout"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/80 px-4 py-2 text-xs font-bold text-red-600 transition hover:border-red-400 hover:bg-red-600 hover:text-white disabled:opacity-50 ${className}`}
    >
      <span>🚪</span>
      <span>{loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
