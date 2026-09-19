"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: string;
  createdAt: string;
}

export default function ContactMessagesView() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setMessages(data.contacts || []);
      } else {
        setError(data.message || "Failed to load messages");
      }
    } catch {
      setError("Failed to fetch messages from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      } else {
        alert(data.message || "Could not delete");
      }
    } catch {
      alert("Error deleting message");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      m.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      m.subject?.toLowerCase().includes(filterText.toLowerCase()) ||
      m.message?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              📬 Inbox Studio
            </span>
            <span className="text-xs font-bold text-neutral-400">
              Total Inquiries: {messages.length}
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl font-black tracking-tight text-black">
            Client Contact Inquiries
          </h2>
          <p className="text-xs text-neutral-500">
            Messages submitted via public contact form on your portfolio website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMessages}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-bold text-black transition hover:border-black hover:bg-white disabled:opacity-50"
          >
            <span>🔄</span>
            <span>{loading ? "Refreshing..." : "Refresh Inbox"}</span>
          </button>

          <Link
            href="/admin"
            className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-neutral-800"
          >
            ← Admin Dashboard
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="🔍 Search inquiries by client name, email, subject, or keywords..."
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-black placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition"
        />
      </div>

      {/* Messages List / Feed */}
      {loading && messages.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
          <p className="mt-3 text-xs font-bold text-neutral-500">
            Loading inquiries...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center">
          <span className="text-4xl">📭</span>
          <h3 className="mt-3 text-base font-bold text-black">
            {filterText ? "No matching inquiries found" : "No client messages yet"}
          </h3>
          <p className="mt-1 text-xs text-neutral-400">
            {filterText
              ? "Try clearing your search query."
              : "When visitors fill the contact form on your portfolio, their messages will show up here instantly."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const dateStr = item.createdAt
              ? new Date(item.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Recent";

            return (
              <div
                key={item._id}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs transition hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-neutral-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base text-black">
                        {item.name}
                      </span>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-bold text-neutral-600">
                        {item.email}
                      </span>
                      {item.subject && (
                        <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                          🎯 {item.subject}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      📅 Received on: <strong className="text-neutral-600">{dateStr}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(
                        item.subject || "Your Inquiry to Ashok Meena - 3D Portfolio"
                      )}`}
                      className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-neutral-800"
                    >
                      <span>✉️</span>
                      <span>Reply via Email</span>
                    </a>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-4 rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                    Message Content:
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-900 leading-relaxed whitespace-pre-wrap">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
