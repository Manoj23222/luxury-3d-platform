async function getMessages() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/contact`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.contacts || [];
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">
          Client Messages
        </h1>

        {messages.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-black">
              No messages found
            </p>

            <p className="mt-2 text-neutral-500">
              Client contact messages will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {messages.map((msg: any) => (
              <div
                key={msg._id}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-bold text-black">
                    {msg.name}
                  </h2>

                  <span className="text-sm text-neutral-500">
                    {msg.email}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-neutral-100 px-4 py-2">
                  <p className="font-semibold text-black">
                    {msg.subject}
                  </p>
                </div>

                <p className="mt-4 whitespace-pre-wrap leading-7 text-neutral-700">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}