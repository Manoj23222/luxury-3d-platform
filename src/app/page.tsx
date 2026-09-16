import Navbar from "@/components/layout/Navbar";
import HeroRotatingCards from "@/components/home/HeroRotatingCards";
import SoftwareSkillsSlider from "@/components/home/SoftwareSkillsSlider";
import ProductionShowcase from "@/components/home/ProductionShowcase";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Navbar />

      {/* 2-Column Luxury Hero: Left Details & Right Auto-Rotating Cards Frame */}
      <HeroRotatingCards />

      {/* Software Workstations & Skills: Horizontal Scrolling Cards Showcase */}
      <SoftwareSkillsSlider />

      {/* High-End Photo Retouching & 3D Modeling (Visuals Showcase) */}
      <ProductionShowcase />

      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}