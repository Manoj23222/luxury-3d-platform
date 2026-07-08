import Link from "next/link";

export default function AdminHeader({
  user,
}: {
  user: {
    name?: string;
    email: string;
    role: string;
  };
}) {
  return (
    <header className="mb-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Admin Panel
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Welcome, {user.name || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
        </div>

        <Link
          href="/"
          className="rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-black"
        >
          View Website
        </Link>
      </div>
    </header>
  );
}