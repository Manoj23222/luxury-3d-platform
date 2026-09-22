import AssetGridClient from "@/components/marketplace/AssetGridClient";
import Navbar from "@/components/layout/Navbar";

async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-neutral-800 selection:text-white">
      <Navbar />
      <AssetGridClient assets={projects} />
    </main>
  );
}