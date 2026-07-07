"use client";

import { useEffect, useMemo, useState } from "react";

type User = {
  _id: string;
  name?: string;
  email: string;
  role?: "customer" | "creator" | "admin";
  isActive?: boolean;
  createdAt?: string;
};

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Users fetch failed");
        return;
      }

      setUsers(data.users || []);
    } catch {
      alert("Users fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (id: string, payload: Partial<User>) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      loadUsers();
    } else {
      alert(data.error || "Update failed");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name || ""} ${user.email || ""} ${
        user.role || ""
      }`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [users, search]);

  return (
    <div className="px-5 py-28 text-black sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Admin Control
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Users & Permissions
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Manage customers, creators and admin access.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or role..."
            className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center">
                      Loading users...
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-neutral-50">
                      <td className="px-5 py-4 font-semibold">
                        {user.name || "No Name"}
                      </td>

                      <td className="px-5 py-4 text-neutral-600">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={user.role || "customer"}
                          onChange={(e) =>
                            updateUser(user._id, {
                              role: e.target.value as User["role"],
                            })
                          }
                          className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
                        >
                          <option value="customer">Customer</option>
                          <option value="creator">Creator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={user.isActive === false ? "blocked" : "active"}
                          onChange={(e) =>
                            updateUser(user._id, {
                              isActive: e.target.value === "active",
                            })
                          }
                          className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
                        >
                          <option value="active">Active</option>
                          <option value="blocked">Blocked</option>
                        </select>
                      </td>

                      <td className="px-5 py-4 text-neutral-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}

                {!loading && filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-neutral-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}