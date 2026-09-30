"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    };

    logout();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafc] text-neutral-900">
      <div className="rounded-3xl border border-neutral-200/90 bg-white/95 p-8 shadow-lg font-medium text-sm">
        Logging out...
      </div>
    </main>
  );
}