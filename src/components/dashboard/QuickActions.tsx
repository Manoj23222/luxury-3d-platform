import Link from "next/link";

type Action = {
  label: string;
  href: string;
};

const descriptions: Record<string, string> = {
  "Upload Asset": "Add new 3D model, preview, price and ZIP file.",
  "My Assets": "Manage your uploaded marketplace assets.",
  Users: "Manage users and permissions.",
  Orders: "Manage customer orders.",
  Products: "Manage marketplace products.",
  Settings: "Platform settings and configuration.",
};

export default function QuickActions({
  links,
}: {
  links: Action[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-black">Quick Actions</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
       {links.map((item, index) => (
  <Link
    key={`${item.href}-${index}`}
            href={item.href}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:-translate-y-1 hover:border-black hover:bg-white hover:shadow-lg"
          >
            <h3 className="font-bold text-black">{item.label}</h3>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {descriptions[item.label] || ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}