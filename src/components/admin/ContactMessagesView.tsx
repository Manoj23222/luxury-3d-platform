"use client";

import { useState, useEffect } from "react";

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
  const [filterText, setFilterText] = useState("");
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setMessages(data.contacts || []);
      }
    } catch {
      console.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Delete this message?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (activeMessage?._id === id) setActiveMessage(null);
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

  const formatGmailDate = (isoStr: string) => {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    if (isToday) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Search Bar (Gmail Style) */}
      <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-black text-[#0A0A0A]">
              Messages Inbox
            </h1>
            <p className="text-xs text-neutral-500">
              {messages.length} inquiries received from portfolio contact form
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search messages..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="rounded-xl border border-[#D5D3CC] bg-neutral-50 px-3 py-1.5 text-xs text-[#0A0A0A] placeholder-neutral-400 focus:bg-white focus:border-black outline-none w-52"
            />
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="rounded-xl border border-[#D5D3CC] bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer"
            >
              {loading ? "..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Gmail-Style Table / Row List */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E0DB] bg-white shadow-xs">
        {loading && messages.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            Loading messages...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-400">
            {filterText ? "No matching messages found." : "Inbox is empty."}
          </div>
        ) : (
          <div className="divide-y divide-[#E2E0DB]">
            {filtered.map((item) => {
              const dateDisplay = formatGmailDate(item.createdAt);

              return (
                <div
                  key={item._id}
                  onClick={() => setActiveMessage(item)}
                  className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#F8F7F5] transition cursor-pointer text-xs"
                >
                  {/* Sender Name */}
                  <div className="w-36 sm:w-44 shrink-0 truncate font-bold text-[#0A0A0A]">
                    {item.name}
                  </div>

                  {/* Subject & Preview Snippet */}
                  <div className="flex-1 truncate text-neutral-600">
                    <span className="font-semibold text-[#0A0A0A]">
                      {item.subject || "Inquiry"}
                    </span>
                    <span className="text-neutral-400 mx-1.5">—</span>
                    <span className="text-neutral-500">
                      {item.message?.replace(/\n/g, " ").slice(0, 100)}
                    </span>
                  </div>

                  {/* Date & Quick Delete */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {dateDisplay}
                    </span>
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      disabled={deletingId === item._id}
                      title="Delete message"
                      className="opacity-0 group-hover:opacity-100 rounded-lg px-2 py-1 text-[11px] font-bold text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Detail Modal (Gmail Full View) */}
      {activeMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setActiveMessage(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-[#E2E0DB] bg-white p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E0DB]">
              <div>
                <h2 className="text-base font-black text-[#0A0A0A]">
                  {activeMessage.subject || "Client Inquiry"}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#0A0A0A]">
                    {activeMessage.name}
                  </span>
                  <span className="text-neutral-500 font-mono">
                    &lt;{activeMessage.email}&gt;
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {new Date(activeMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setActiveMessage(null)}
                className="rounded-lg p-1 text-neutral-400 hover:text-black hover:bg-neutral-100 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Message Body */}
            <div className="py-2 text-xs sm:text-sm text-[#0A0A0A] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
              {activeMessage.message}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2E0DB]">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                    activeMessage.subject || "Your Inquiry to Ashok Meena"
                  )}`}
                  className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(activeMessage._id)}
                  disabled={deletingId === activeMessage._id}
                  className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white transition"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => setActiveMessage(null)}
                className="rounded-xl border border-[#D5D3CC] px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"
              >
                Back to Inbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
