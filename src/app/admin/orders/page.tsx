"use client";

import { useEffect, useMemo, useState } from "react";

type OrderStatus =
  | "Pending"
  | "Payment Submitted"
  | "Paid"
  | "Failed"
  | "Rejected"
  | "Refunded";

type Order = {
  _id: string;

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  productName?: string;
  productImage?: string;

  amount: number;
  currency?: string;

  status?: OrderStatus;
  paymentMethod?: "Razorpay" | "UPI";
  paymentProvider?: string;

  upiId?: string;
  upiTransactionId?: string;
  paymentScreenshot?: string;
  paymentNote?: string;
  paymentSubmittedAt?: string;
  paymentVerifiedAt?: string;

  downloadEnabled?: boolean;
  createdAt?: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/orders", {
        cache: "no-store",
      });

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

  async function updateOrder(
    id: string,
    payload: Record<string, unknown>
  ) {
    try {
      setUpdatingId(id);

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Order update failed");
        return;
      }

      await loadOrders();
    } catch {
      alert("Order update failed");
    } finally {
      setUpdatingId("");
    }
  }

  async function approvePayment(order: Order) {
    const confirmed = confirm(
      `Approve payment for ${order.productName || "this asset"}?\n\nUTR: ${
        order.upiTransactionId || "-"
      }\nAmount: ${order.currency || "INR"} ${order.amount || 0}`
    );

    if (!confirmed) return;

    await updateOrder(order._id, {
      action: "approve",
      paymentNote: "UPI payment verified by admin",
    });
  }

  async function rejectPayment(order: Order) {
    const reason = prompt(
      "Enter payment rejection reason:",
      "Transaction could not be verified"
    );

    if (reason === null) return;

    await updateOrder(order._id, {
      action: "reject",
      paymentNote: reason.trim() || "Payment rejected by admin",
    });
  }

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch = `${order.customerName || ""} ${
        order.customerEmail || ""
      } ${order.customerPhone || ""} ${order.productName || ""} ${
        order.status || ""
      } ${order.upiTransactionId || ""} ${order.paymentMethod || ""}`
        .toLowerCase()
        .includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const pendingVerificationCount = orders.filter(
    (order) => order.status === "Payment Submitted"
  ).length;

  return (
    <div className="pb-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Admin Control
        </p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Orders & Payments
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Verify UPI transactions and control asset download access.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Verification Pending
            </p>

            <p className="mt-1 text-2xl font-black text-amber-800">
              {pendingVerificationCount}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_220px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search customer, product, UTR or payment method..."
          className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-semibold outline-none focus:border-black"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Payment Submitted">Payment Submitted</option>
          <option value="Paid">Paid</option>
          <option value="Rejected">Rejected</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {loading && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center shadow-sm">
            Loading orders...
          </div>
        )}

        {!loading &&
          filteredOrders.map((order) => {
            const isUpdating = updatingId === order._id;
            const needsVerification =
              order.paymentMethod === "UPI" &&
              order.status === "Payment Submitted";

            return (
              <article
                key={order._id}
                className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr_auto]">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                      {order.productImage ? (
                        <img
                          src={order.productImage}
                          alt={order.productName || "Product"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                          3D
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="line-clamp-2 font-bold text-black">
                        {order.productName || "Unnamed Asset"}
                      </p>

                      <p className="mt-1 text-lg font-black">
                        {order.currency || "INR"} {order.amount || 0}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Customer
                    </p>

                    <p className="mt-2 font-bold">
                      {order.customerName || "-"}
                    </p>

                    <p className="mt-1 break-all text-sm text-neutral-500">
                      {order.customerEmail || "-"}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {order.customerPhone || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Payment Information
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold">
                        {order.paymentMethod ||
                          order.paymentProvider ||
                          "Razorpay"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Payment Submitted"
                            ? "bg-amber-100 text-amber-700"
                            : order.status === "Rejected" ||
                              order.status === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    {order.paymentMethod === "UPI" && (
                      <div className="mt-3 rounded-2xl bg-neutral-50 p-3">
                        <p className="text-xs text-neutral-500">
                          UPI Transaction ID / UTR
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-bold">
                          {order.upiTransactionId || "Not provided"}
                        </p>

                        {order.upiId && (
                          <p className="mt-2 text-xs text-neutral-500">
                            Paid to: {order.upiId}
                          </p>
                        )}
                      </div>
                    )}

                    {order.paymentScreenshot && (
                      <a
                        href={order.paymentScreenshot}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex rounded-xl border border-neutral-300 px-4 py-2 text-xs font-bold hover:border-black"
                      >
                        View Screenshot
                      </a>
                    )}

                    {order.paymentNote && (
                      <p className="mt-3 text-xs text-neutral-500">
                        Note: {order.paymentNote}
                      </p>
                    )}
                  </div>

                  <div className="min-w-[190px]">
                    {needsVerification ? (
                      <div className="grid gap-2">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => approvePayment(order)}
                          className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {isUpdating ? "Updating..." : "Approve Payment"}
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => rejectPayment(order)}
                          className="rounded-2xl border border-red-300 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          Reject Payment
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        <label>
                          <span className="mb-1 block text-xs font-semibold text-neutral-500">
                            Payment Status
                          </span>

                          <select
                            value={order.status || "Pending"}
                            disabled={isUpdating}
                            onChange={(event) =>
                              updateOrder(order._id, {
                                status: event.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none disabled:opacity-50"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Payment Submitted">
                              Payment Submitted
                            </option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </label>

                        <label>
                          <span className="mb-1 block text-xs font-semibold text-neutral-500">
                            Download Access
                          </span>

                          <select
                            value={order.downloadEnabled ? "yes" : "no"}
                            disabled={isUpdating}
                            onChange={(event) =>
                              updateOrder(order._id, {
                                downloadEnabled:
                                  event.target.value === "yes",
                              })
                            }
                            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none disabled:opacity-50"
                          >
                            <option value="yes">Enabled</option>
                            <option value="no">Disabled</option>
                          </select>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

        {!loading && filteredOrders.length === 0 && (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-lg font-bold">No orders found</h2>

            <p className="mt-2 text-sm text-neutral-500">
              No orders match the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}