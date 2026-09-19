"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const menu = [
  { name: "Admin Dashboard", href: "/admin", icon: "📊" },
  { name: "Client Messages", href: "/admin/messages", icon: "📬" },
  { name: "3D File Uploading", href: "/admin/upload-3d", icon: "📦" },
  { name: "Photo Editor Uploading", href: "/admin/upload-photo", icon: "🎨" },
  { name: "Visitor Activity", href: "/admin/visitor-activity", icon: "⏱️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-neutral-200 bg-white p-5 lg:block overflow-y-auto">
      <Link href="/admin" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-xs font-black text-white shadow-xs">
          3D
        </div>

        <div>
          <h2 className="text-base font-extrabold tracking-tight text-black">Portfolio</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Admin Studio
          </p>
        </div>
      </Link>

      <nav className="mt-8 space-y-1.5">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition ${
                isActive
                  ? "bg-black text-white shadow-xs"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 mt-8 border-t border-neutral-100 space-y-2">
        <Link
          href="/"
          className="block w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-center text-xs font-bold text-neutral-800 transition hover:border-black hover:bg-black hover:text-white"
        >
          ← View Public Website
        </Link>

        <LogoutButton variant="sidebar" />
      </div>
    </aside>
  );
}