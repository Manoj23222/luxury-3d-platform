"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
};

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = Boolean(user);
  const isCreator = user?.role === "creator";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }

    checkUser();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
            3D
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide text-black">
              LUX3D
            </h1>
            <p className="-mt-1 text-xs text-neutral-500">
              3D Asset Marketplace
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-neutral-600 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mx-8 hidden max-w-md flex-1 lg:block">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-black hover:border-black"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isCreator && (
                <Link
                  href="/dashboard"
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-black hover:border-black"
                >
                  Dashboard
                </Link>
              )}

              {isAdmin && (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-black hover:border-black"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/admin"
                    className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white-800"
                  >
                    Admin
                  </Link>
                </>
              )}

              {!isCreator && !isAdmin && (
                <Link
                  href="/library"
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-black hover:border-black"
                >
                  My Library
                </Link>
              )}

              <button
                onClick={logout}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

          <Link
            href="/contact"
            className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:border-black"
          >
            Hire Me
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl font-bold lg:hidden"
        >
          ☰
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="space-y-4 p-5">
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
                className="block text-sm font-semibold text-neutral-700"
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl border p-3 text-center font-semibold"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl bg-black p-3 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {(isCreator || isAdmin) && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border p-3 text-center font-semibold"
                  >
                    Dashboard
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-black p-3 text-center font-semibold text-white"
                  >
                    Admin
                  </Link>
                )}

                {!isCreator && !isAdmin && (
                  <Link
                    href="/library"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border p-3 text-center font-semibold"
                  >
                    My Library
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full rounded-xl bg-red-600 p-3 font-semibold text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}