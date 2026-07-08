import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const creatorMenu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Assets", href: "/dashboard/projects" },
    { name: "Upload Asset", href: "/dashboard/upload" },
    { name: "Media Library", href: "/dashboard/media" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Analytics", href: "/dashboard/analytics" },
  ];

  const adminMenu = [
  { name: "Admin Panel", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Settings", href: "/admin/settings" },
];
  const menu =
    user.role === "admin" ? [...creatorMenu, ...adminMenu] : creatorMenu;

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-neutral-200 bg-white p-6 lg:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
            3D
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wide text-black">
              LUX3D
            </h2>
            <p className="-mt-1 text-xs text-neutral-500">
              {user.role === "admin" ? "Admin Studio" : "Creator Studio"}
            </p>
          </div>
        </Link>

        <nav className="mt-10 space-y-2">
          {menu.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-black hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/portfolio"
          className="absolute bottom-6 left-6 right-6 rounded-full border border-neutral-300 px-4 py-3 text-center text-sm font-semibold text-black transition hover:border-black"
        >
          View Store
        </Link>
      </aside>

      <header className="fixed left-0 top-0 z-40 w-full border-b border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-bold tracking-wide">
            LUX3D
          </Link>

          <Link
            href="/dashboard/upload"
            className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
          >
            Upload
          </Link>
        </div>

        <nav className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {menu.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      <section className="min-h-screen px-5 pt-28 sm:px-6 lg:pl-72 lg:pr-8 lg:pt-8">
        {children}
      </section>
    </main>
  );
}