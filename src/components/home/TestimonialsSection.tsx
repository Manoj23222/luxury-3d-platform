const testimonials = [
  {
    name: "Product Brand",
    text: "Premium quality 3D assets with clean topology, realistic materials and marketplace-ready presentation.",
  },
  {
    name: "Amazon Seller",
    text: "The renders made our product listing look clean, professional and high-converting.",
  },
  {
    name: "Creative Studio",
    text: "Excellent modeling quality, sharp details and reliable delivery for 3D product visuals.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-black px-5 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
          Reviews
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Trusted by product creators.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 text-sm font-bold text-black">★★★★★</div>

              <p className="text-sm leading-6 text-neutral-600">
                “{item.text}”
              </p>

              <h3 className="mt-6 font-bold text-black">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}