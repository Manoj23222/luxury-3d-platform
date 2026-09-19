import Navbar from "@/components/layout/Navbar";
import HeroRotatingCards from "@/components/home/HeroRotatingCards";
import MyWorkSection from "@/components/home/MyWorkSection";
import SoftwareSkillsSlider from "@/components/home/SoftwareSkillsSlider";
import AiWebProjectsSection from "@/components/home/AiWebProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Navbar />

      {/* 1. 2-Column Luxury Hero: Intro, Details & Right Auto-Rotating Cards Frame */}
      <HeroRotatingCards />

      {/* 2. Unified "My Work" Showcase: 3D Portfolio & Photo Retouching with Interactive Tabs */}
      <MyWorkSection />

      {/* 3. Specialized Software & Creative Workstations Slider */}
      <SoftwareSkillsSlider />

      {/* 4. AI-Assisted Web Engineering & Full-Stack Projects Showcase (BootKit & Lux3D) */}
      <AiWebProjectsSection />

      {/* 5. Specialized Creative Services & Production Solutions */}
      <ServicesSection />

      {/* 5. 4-Phase Creative Production Workflow */}
      <ProcessSection />

      {/* 6. Client Testimonials & Trust */}
      <TestimonialsSection />

      {/* 7. Collaboration & Hire Me Banner */}
      <ContactCTA />

      {/* 8. Luxury Footer */}
      <Footer />
    </main>
  );
}