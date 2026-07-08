const stats = [
  { label: "Users", value: "0" },
  { label: "Products", value: "0" },
  { label: "Orders", value: "0" },
  { label: "Revenue", value: "₹0" },
];

export default function AdminStats() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-neutral-500">{item.label}</p>
          <h2 className="mt-3 text-3xl font-bold text-black">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}