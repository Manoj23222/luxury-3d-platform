import Link from "next/link";
import AdminStats from "@/components/admin/AdminStats";

const cards = [
  { title: "Manage Users", href: "/admin/users" },
  { title: "Manage Products", href: "/admin/products" },
  { title: "Manage Categories", href: "/admin/categories" },
  { title: "Manage Orders", href: "/admin/orders" },
  { title: "Roles", href: "/admin/roles" },
  { title: "Permissions", href: "/admin/permissions" },
  { title: "Settings", href: "/admin/settings" },
];

export default function AdminPage() {
  return (
    <div className="pb-10">
      <AdminStats />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-3xl border border-neutral-200 bg-white p-6 font-bold shadow-sm transition hover:-translate-y-1 hover:border-black hover:shadow-lg"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}