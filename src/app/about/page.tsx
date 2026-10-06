import { Metadata } from "next";
import AboutCinematicExperience from "@/components/about/AboutCinematicExperience";

export const metadata: Metadata = {
  title: "About Ashok Meena — Senior 3D Designer & Photo Editor",
  description:
    "Official portfolio and biography of Ashok Meena, Senior 3D Designer & Photo Editor with 6+ years experience at Infoeye Software specializing in Blender 3D, CLO 3D, and Adobe Photoshop post-production.",
  openGraph: {
    title: "About Ashok Meena — Senior 3D Designer & Photo Editor",
    description:
      "Senior 3D Designer & Photo Editor with 6+ years experience in Blender 3D, CLO 3D apparel, and commercial photo retouching.",
    url: "https://www.bootkit.in/about",
    siteName: "Ashok Meena Portfolio",
    type: "profile",
  },
  alternates: {
    canonical: "https://www.bootkit.in/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.bootkit.in/#person",
      "name": "Ashok Meena",
      "jobTitle": "Senior 3D Designer & Photo Editor",
      "url": "https://www.bootkit.in",
      "image": "https://www.bootkit.in/ashok.png",
      "worksFor": {
        "@type": "Organization",
        "name": "Infoeye Software Pvt. Ltd.",
        "url": "https://infoeye.com"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Maharaja Ganga Singh University (MGSU), Bikaner",
          "department": "Computer Science"
        }
      ],
      "knowsAbout": [
        "3D Modeling",
        "Blender 3D",
        "CLO 3D Digital Fashion",
        "Photo Retouching",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe Lightroom",
        "PBR Texturing",
        "Real-Time GLB Web 3D"
      ],
      "sameAs": [
        "https://infoeye.com/news/staff/11540/"
      ]
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.bootkit.in/about#webpage",
      "url": "https://www.bootkit.in/about",
      "name": "About Ashok Meena — Senior 3D Designer & Photo Editor",
      "description":
        "Professional biography, skills, software expertise, and career journey of Ashok Meena.",
      "about": {
        "@id": "https://www.bootkit.in/#person"
      },
      "mainEntity": {
        "@id": "https://www.bootkit.in/#person"
      }
    }
  ]
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Schema.org Structured Data for SEO & AI Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutCinematicExperience />
    </main>
  );
}