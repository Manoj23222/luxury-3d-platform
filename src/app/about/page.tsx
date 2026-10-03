import { Metadata } from "next";
import AboutCinematicExperience from "@/components/about/AboutCinematicExperience";

export const metadata: Metadata = {
  title: "About Ashok Meena — Senior 3D Designer & Photo Editor",
  description:
    "Learn about Ashok Meena, Senior 3D Designer & Photo Editor with 6+ years experience at Infoeye Software specializing in Blender 3D, CLO 3D, and Adobe Photoshop post-production.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#EFEEEB] text-[#0A0A0A]">
      <AboutCinematicExperience />
    </main>
  );
}