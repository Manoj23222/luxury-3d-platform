"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Assets" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/library", label: "Library" },
];

type User = {
  id: string;
  name?: string;
  email: string;
  role?: "customer" | "creator" | "admin";
  permissions?: string[];
};

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = Boolean(user);
  const isCreator = user?.role === "creator";
  const isAdmin = user?.role === "admin";

  const canOpenDashboard = useMemo(() => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "creator") return true;
    return (user.permissions || []).includes("dashboard_access");
  }, [user]);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();

        if (res.ok && data.success) setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    }

    checkUser();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const profileLabel = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-sm font-black text-white">
            3D
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-black tracking-tight text-black">
              LUX3D
            </h1>
            <p className="text-[11px] font-medium text-neutral-500">
              3D Asset Marketplace
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-neutral-700 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden min-w-[240px] max-w-[360px] flex-1 lg:block">
          <input
            type="text"
            placeholder="Search assets..."
            className="h-11 w-full rounded-full border border-neutral-300 bg-neutral-50 px-5 text-sm font-medium outline-none focus:border-black focus:bg-white"
          />
        </div>

        <div className="relative hidden shrink-0 items-center gap-2 lg:flex">
          {canOpenDashboard && (
            <Link
              href="/dashboard"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-bold text-black hover:border-black"
            >
              Dashboard
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-white hover:bg-neutral-800"
            >
              Admin
            </Link>
          )}

          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-600 bg-white text-sm font-black text-black shadow-sm"
          >
            {isLoggedIn ? profileLabel : "👤"}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
              <div className="border-b border-neutral-100 p-4">
                <p className="text-sm font-black text-black">
                  {isLoggedIn ? user?.name || "User" : "Guest"}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-500">
                  {isLoggedIn ? user?.email : "Login to access your account"}
                </p>
              </div>

              <div className="p-2">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/library"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100"
                    >
                      My Library
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      href="/downloads"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100"
                    >
                      Downloads
                    </Link>

                    <button
                      onClick={logout}
                      className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-sm font-black text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-neutral-300 px-3 py-2 text-xl font-black lg:hidden"
        >
          ☰
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="space-y-3 p-4">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none"
            />

            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-neutral-50 p-3 text-sm font-bold text-neutral-700"
              >
                {item.label}
              </Link>
            ))}

            {canOpenDashboard && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl border p-3 text-center font-bold"
              >
                Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-black p-3 text-center font-bold text-white"
              >
                Admin
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl border p-3 text-center font-bold"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl bg-black p-3 text-center font-bold text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="w-full rounded-xl bg-red-600 p-3 font-bold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}