import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-neutral-100">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-sm font-black text-white shadow-xs">
              3D
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-black">
                Ashok Meena
              </h2>
              <p className="text-[11px] font-bold text-neutral-500">
                Senior 3D & Digital Fashion Designer
              </p>
            </div>
          </div>

          {/* Location & Contact Chips in Luxury White Theme */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            {/* Location */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-neutral-700 shadow-xs">
              <span>📍</span>
              <span>Sardarshahar, Rajasthan, India</span>
            </span>

            {/* Email Contact */}
            <a
              href="mailto:ashokm3414@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-neutral-800 shadow-xs transition hover:border-black hover:bg-white"
            >
              <span>✉️</span>
              <span className="font-bold">ashokm3414@gmail.com</span>
            </a>

            {/* Phone Contact */}
            <a
              href="tel:+918000093300"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-neutral-800 shadow-xs transition hover:border-black hover:bg-white"
            >
              <span>📞</span>
              <span className="font-bold">+91 80000 93300</span>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}