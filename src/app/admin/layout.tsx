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
    <main className="min-h-screen bg-neutral-50 text-black">
      <AdminSidebar />

      <section className="min-h-screen px-5 pt-24 sm:px-6 lg:pl-72 lg:pr-8 lg:pt-6">
        <AdminHeader user={user} />
        {children}
      </section>
    </main>
  );
}