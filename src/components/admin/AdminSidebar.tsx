import Link from "next/link";

const menu = [
  { name: "Overview", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Roles", href: "/admin/roles" },
  { name: "Permissions", href: "/admin/permissions" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-neutral-200 bg-white p-6 lg:block">
      <Link href="/admin" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
          A
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-wide text-black">LUX3D</h2>
          <p className="-mt-1 text-xs text-neutral-500">Admin Control</p>
        </div>
      </Link>

      <nav className="mt-10 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-black hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Link
        href="/dashboard"
        className="absolute bottom-6 left-6 right-6 rounded-full border border-neutral-300 px-4 py-3 text-center text-sm font-semibold text-black transition hover:border-black"
      >
        Creator Dashboard
      </Link>
    </aside>
  );
}