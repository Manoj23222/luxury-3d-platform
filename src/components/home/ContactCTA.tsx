export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 text-neutral-900 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-8 sm:p-12 lg:p-14 shadow-xl text-neutral-900 text-center">
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

          {/* Subtle Cyber Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl space-y-4 sm:space-y-5">
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Have a 3D Modeling or Photo Retouching Project?
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Direct all 3D product modeling commissions, CLO 3D virtual fashion simulations, and commercial photo retouching requirements to my desk. <strong className="text-neutral-900 font-semibold">Also available for custom website development & web applications built rapidly using advanced AI Prompt Engineering, JavaScript / TypeScript, Next.js, React, and modern cloud databases.</strong>
            </p>

            {/* Hiring / Capability Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="rounded-xl border border-neutral-200/90 bg-white px-3.5 py-1.5 font-semibold text-neutral-800 shadow-2xs">
                <span className="text-emerald-600 font-bold">🌐</span> AI Prompt-Engineered Websites & Apps
              </span>
              <span className="rounded-xl border border-neutral-200/90 bg-white px-3.5 py-1.5 font-semibold text-neutral-800 shadow-2xs">
                <span className="text-blue-600 font-bold">⚡</span> JavaScript • TypeScript • Next.js
              </span>
              <span className="rounded-xl border border-neutral-200/90 bg-white px-3.5 py-1.5 font-semibold text-neutral-800 shadow-2xs">
                <span className="text-amber-600 font-bold">🏺</span> 3D CGI • CLO 3D Fashion • Retouching
              </span>
              <span className="rounded-xl border border-neutral-200/90 bg-white px-3.5 py-1.5 font-semibold text-neutral-800 shadow-2xs">
                <span className="text-teal-600 font-bold">🌍</span> Remote Worldwide Availability
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}