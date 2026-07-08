import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjects from "@/components/dashboard/RecentProjects";
import { canAccessDashboard, isAdmin } from "@/lib/permissions";
import { getDashboardLinks } from "@/lib/dashboardLinks";

export const dynamic = "force-dynamic";

const stats = [
  { label: "Total Assets", value: "12", subtitle: "Marketplace products" },
  { label: "Models Uploaded", value: "38", subtitle: "GLB / FBX / OBJ files" },
  { label: "Storage Used", value: "420 MB", subtitle: "Media + ZIP files" },
  { label: "Store Views", value: "1.2K", subtitle: "Public asset visits" },
];

export default async function DashboardPage() {
  const authUser = await getCurrentUser();

  if (!authUser) {
    redirect("/login");
  }

  await connectDB();

  const dbUser = await User.findById(authUser.id).select("-password").lean();

  if (!dbUser || dbUser.isActive === false) {
    redirect("/login");
  }

  const role = dbUser.role || "customer";
  const permissions = dbUser.permissions || [];

  if (!canAccessDashboard(role, permissions)) {
    redirect("/");
  }

  const admin = isAdmin(role);
  const dashboardLinks = getDashboardLinks(role, permissions);

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <DashboardHeader
        title={admin ? "Admin Dashboard" : "Dashboard"}
        subtitle={`Welcome back, ${dbUser.name || "User"}`}
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.label}
            title={item.label}
            value={item.value}
            subtitle={item.subtitle}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <QuickActions links={dashboardLinks} />

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">Recent Activity</h2>

          <div className="mt-6 space-y-4 text-sm text-neutral-600">
            <div className="rounded-2xl bg-neutral-50 p-4">
              New uploaded assets will appear here.
            </div>

            <div className="rounded-2xl bg-neutral-50 p-4">
              Downloads, purchases and messages will be shown here.
            </div>
          </div>
        </div>
      </div>

      {admin && (
        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">Admin Controls</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-neutral-50 p-4 text-sm font-semibold">
              Users
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4 text-sm font-semibold">
              Orders
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4 text-sm font-semibold">
              Products
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4 text-sm font-semibold">
              Settings
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <RecentProjects projects={[]} />
      </div>
    </div>
  );
}