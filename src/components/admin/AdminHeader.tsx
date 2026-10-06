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
    <header className="mb-5 rounded-2xl border border-[#E2E0DB] bg-white/80 p-4 shadow-xs">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[#0A0A0A]">
            Welcome, {user.name || "Admin"}
          </h1>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl border border-[#D5D3CC] bg-white px-3.5 py-1.5 text-xs font-bold text-[#0A0A0A] hover:bg-black hover:text-white transition"
          >
            View Website
          </Link>
          <LogoutButton variant="header" />
        </div>
      </div>
    </header>
  );
}