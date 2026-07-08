"use client";

import { useEffect, useMemo, useState } from "react";

type Order = {
  _id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  productName?: string;
  productImage?: string;
  amount: number;
  currency?: string;
  status?: "Pending" | "Paid" | "Failed" | "Refunded";
  paymentProvider?: string;
  downloadEnabled?: boolean;
  createdAt?: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Orders fetch failed");
        return;
      }

      setOrders(data.orders || []);
    } catch {
      alert("Orders fetch failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);
async function updateOrder(id: string, payload: Partial<Order>) {
  const res = await fetch(`/api/admin/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (res.ok && data.success) {
    loadOrders();
  } else {
    alert(data.error || "Update failed");
  }
}
  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return orders;

    return orders.filter((order) =>
      `${order.customerName || ""} ${order.customerEmail || ""} ${
        order.customerPhone || ""
      } ${order.productName || ""} ${order.status || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [orders, search]);

  return (
    <div className="pb-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Admin Control
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Orders Management
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          View customer purchases, payment status and download access.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer, product, phone, email or status..."
          className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Download</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    Loading orders...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-xl bg-neutral-100">
                          {order.productImage ? (
                            <img
                              src={order.productImage}
                              alt={order.productName || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div>
                          <p className="font-semibold text-black">
                            {order.productName || "-"}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {order.paymentProvider || "Razorpay"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {order.customerName || "-"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {order.customerEmail || "-"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {order.customerPhone || ""}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-bold">
                      {order.currency || "INR"} {order.amount || 0}
                    </td>

                    <td className="px-5 py-4">
                      <select
  value={order.status || "Pending"}
  onChange={(e) =>
    updateOrder(order._id, {
      status: e.target.value as Order["status"],
    })
  }
  className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
>
  <option value="Pending">Pending</option>
  <option value="Paid">Paid</option>
  <option value="Failed">Failed</option>
  <option value="Refunded">Refunded</option>
</select>
                    </td>

                    <td className="px-5 py-4">
                      <select
  value={order.downloadEnabled ? "yes" : "no"}
  onChange={(e) =>
    updateOrder(order._id, {
      downloadEnabled: e.target.value === "yes",
    })
  }
  className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
>
  <option value="yes">Enabled</option>
  <option value="no">Disabled</option>
</select>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}

              {!loading && filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-neutral-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}