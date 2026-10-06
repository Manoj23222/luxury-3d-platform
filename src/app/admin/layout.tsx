import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#EFEEEB] text-[#0A0A0A]">
      <AdminSidebar />

      <section className="min-h-screen px-4 pt-20 sm:px-6 lg:pl-64 lg:pr-6 lg:pt-6">
        <AdminHeader user={user} />
        {children}
      </section>
    </main>
  );
}