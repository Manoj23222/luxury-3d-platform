import Link from "next/link";
import LogoutButton from "./LogoutButton";

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
    <header className="mb-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-black/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
            Admin Studio Console
          </span>
          <h1 className="mt-1.5 text-xl font-black tracking-tight text-black sm:text-2xl">
            Welcome, {user.name || "Admin"}
          </h1>
          <p className="text-xs text-neutral-400">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/upload-3d"
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-neutral-800"
          >
            <span>+</span> 3D File Upload
          </Link>

          <Link
            href="/admin/upload-photo"
            className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-bold text-black transition hover:border-black hover:bg-white"
          >
            <span>+</span> Photo Editor Upload
          </Link>

          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-bold text-neutral-600 transition hover:border-black hover:text-black"
          >
            View Site ↗
          </Link>

          <LogoutButton variant="header" />
        </div>
      </div>
    </header>
  );
}