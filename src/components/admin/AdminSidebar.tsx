"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const menu = [
  { name: "Dashboard", href: "/admin" },
  {
    name: "Upload Work",
    href: "/admin/upload-3d",
    matchPaths: ["/admin/upload-3d", "/admin/upload-photo"],
  },
  { name: "Inventory", href: "/admin/products" },
  { name: "Messages", href: "/admin/messages" },
  { name: "Visitors", href: "/admin/visitor-activity" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#E2E0DB] bg-[#EFEEEB] p-5 lg:block overflow-y-auto">
      <Link href="/admin" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-xs font-black text-white">
          3D
        </div>

        <div>
          <h2 className="text-sm font-extrabold tracking-tight text-[#0A0A0A]">
            Portfolio Admin
          </h2>
          <p className="text-[10px] font-semibold tracking-wider text-neutral-500">
            Studio Management
          </p>
        </div>
      </Link>

      <nav className="mt-7 space-y-1.5">
        {menu.map((item) => {
          const isActive = item.matchPaths
            ? item.matchPaths.includes(pathname)
            : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-[#0A0A0A] hover:bg-[#E2E0DB]/60"
              }`}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-[#E2E0DB] space-y-2">
        <Link
          href="/"
          className="block w-full rounded-xl border border-[#D5D3CC] bg-white/70 px-3.5 py-2 text-center text-xs font-bold text-[#0A0A0A] transition hover:bg-black hover:text-white"
        >
          View Website
        </Link>

        <LogoutButton variant="sidebar" />
      </div>
    </aside>
  );
}