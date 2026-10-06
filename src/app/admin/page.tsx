"use client";

import Link from "next/link";
import AdminStats from "@/components/admin/AdminStats";
import VisitorAnalyticsView from "@/components/admin/VisitorAnalyticsView";

export default function AdminPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Key Statistics */}
      <AdminStats />

      {/* Quick Navigation Toolbar - Space-less, Zero Icons */}
      <div className="rounded-2xl border border-[#E2E0DB] bg-white/90 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E0DB]">
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A]">
              Quick Navigation
            </h3>
            <p className="text-[11px] text-neutral-500">
              Direct access to studio sections and inventory
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Link
            href="/admin/upload-3d"
            className="flex items-center justify-center text-center py-2.5 px-3 rounded-xl bg-[#0A0A0A] text-white hover:bg-neutral-800 text-xs font-semibold transition"
          >
            Upload Work
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center justify-center text-center py-2.5 px-3 rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] hover:bg-white text-[#0A0A0A] text-xs font-semibold transition"
          >
            Works Inventory
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center justify-center text-center py-2.5 px-3 rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] hover:bg-white text-[#0A0A0A] text-xs font-semibold transition"
          >
            Client Messages
          </Link>
          <Link
            href="/admin/visitor-activity"
            className="flex items-center justify-center text-center py-2.5 px-3 rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] hover:bg-white text-[#0A0A0A] text-xs font-semibold transition"
          >
            Visitor Activity
          </Link>
        </div>
      </div>

      {/* Website Visitors Activity Stream & Analytics */}
      <div>
        <VisitorAnalyticsView />
      </div>
    </div>
  );
}