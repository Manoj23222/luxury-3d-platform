export interface FallbackProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  galleryImages: string[];
  modelUrl: string;
  modelFileName: string;
  modelFileType: string;
  softwareUsed: string[];
  tags: string[];
  status: "Draft" | "Published";
  visibility: "Public" | "Private";
  featured: boolean;
  views: number;
  downloads: number;
  likes: number;
  createdAt: string;
}

export const FALLBACK_3D_PRODUCTS: FallbackProduct[] = [
  {
    _id: "prod-luxury-perfume",
    name: "Luxury Perfume Glass Flacon 3D",
    slug: "luxury-perfume-glass-flacon-3d",
    category: "Fragrance & Glassware",
    shortDescription:
      "Photorealistic luxury glass fragrance bottle with custom gold atomizer and liquid shader physics.",
    description:
      "High-fidelity 3D commercial asset crafted for luxury beauty campaigns. Features optical glass refraction, custom dispersion, brushed gold metallurgy, and liquid volume shading ready for commercial rendering and interactive WebGL inspection.",
    thumbnail:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    modelFileName: "luxury_perfume_flacon.glb",
    modelFileType: "glb",
    softwareUsed: ["Blender 4.2", "Substance 3D Painter", "Cycles RTX"],
    tags: ["Perfume", "Glass", "Luxury", "Product Design", "CGI"],
    status: "Published",
    visibility: "Public",
    featured: true,
    views: 1840,
    downloads: 320,
    likes: 412,
    createdAt: "2026-03-01T10:00:00.000Z",
  },
  {
    _id: "prod-swiss-chronograph",
    name: "Swiss Skeleton Chronograph Timepiece 3D",
    slug: "swiss-skeleton-chronograph-timepiece-3d",
    category: "Jewelry & Horology",
    shortDescription:
      "Ultra-detailed mechanical skeleton watch with brushed titanium bezel, sapphire crystal, and animated gear train.",
    description:
      "Micro-precision 3D horology showcase modeled down to the sub-millimeter gear teeth and ruby jewel bearings. Optimized for real-time 3D inspection with 4K PBR roughness and metallic maps.",
    thumbnail:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl:
      "https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
    modelFileName: "swiss_chronograph_skeleton.glb",
    modelFileType: "glb",
    softwareUsed: ["Cinema 4D", "Octane Render", "ZBrush", "Marmoset"],
    tags: ["Watch", "Horology", "Titanium", "Hard Surface", "Luxury"],
    status: "Published",
    visibility: "Public",
    featured: true,
    views: 2640,
    downloads: 512,
    likes: 680,
    createdAt: "2026-03-02T11:30:00.000Z",
  },
  {
    _id: "prod-digital-fashion",
    name: "Digital Haute Couture Avant-Garde Silk Dress",
    slug: "digital-haute-couture-avant-garde-silk-dress",
    category: "Digital Fashion & Apparel",
    shortDescription:
      "Cloth-simulated multi-layered silk gown with dynamic drape physics and iridescent sheen.",
    description:
      "Virtual fashion asset constructed in CLO3D with real-world fabric physical properties. Includes ultra-realistic wrinkle maps, seam stitching details, and dynamic draping for virtual runways and AR try-on platforms.",
    thumbnail:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    modelFileName: "haute_couture_silk_dress.glb",
    modelFileType: "glb",
    softwareUsed: ["CLO 3D", "Marvelous Designer", "Blender", "Unreal Engine 5"],
    tags: ["Fashion", "Cloth Simulation", "Silk", "Couture", "3D Apparel"],
    status: "Published",
    visibility: "Public",
    featured: true,
    views: 1980,
    downloads: 290,
    likes: 470,
    createdAt: "2026-03-03T14:15:00.000Z",
  },
  {
    _id: "prod-minimalist-chair",
    name: "Nordic Minimalist Curved Lounge Chair 3D",
    slug: "nordic-minimalist-curved-lounge-chair-3d",
    category: "Furniture & Architecture",
    shortDescription:
      "Ergonomic Scandinavian lounge chair with natural oak wood grain and top-grain leather upholstery.",
    description:
      "Contemporary interior furniture asset designed with strict architectural proportions. Features high-res leather normal maps, realistic micro-creases, and matte brushed metal base.",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl: "https://modelviewer.dev/shared-assets/models/Chair.glb",
    modelFileName: "nordic_minimalist_chair.glb",
    modelFileType: "glb",
    softwareUsed: ["3ds Max", "Corona Renderer", "Rhino", "Substance 3D"],
    tags: ["Interior", "Furniture", "Nordic", "Wood", "Leather", "Architecture"],
    status: "Published",
    visibility: "Public",
    featured: false,
    views: 1420,
    downloads: 185,
    likes: 310,
    createdAt: "2026-03-04T09:00:00.000Z",
  },
  {
    _id: "prod-mecha-helmet",
    name: "Cyberpunk Tactical Mecha Exoskeleton Helmet 3D",
    slug: "cyberpunk-tactical-mecha-exoskeleton-helmet-3d",
    category: "Sci-Fi & Character",
    shortDescription:
      "Hard-surface sci-fi combat helmet with carbon fiber weave, illuminated HUD visor, and PBR wear detailing.",
    description:
      "Game-ready AAA hard surface 3D model featuring modular faceplates, carbon-fiber composite materials, emissive holographic HUD shaders, and realistic surface weathering.",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl:
      "https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
    modelFileName: "cyber_helmet_pbr.glb",
    modelFileType: "glb",
    softwareUsed: ["Maya", "Substance 3D Painter", "Unreal Engine 5", "ZBrush"],
    tags: ["Sci-Fi", "Mecha", "Hard Surface", "Unreal Engine", "PBR", "Cyberpunk"],
    status: "Published",
    visibility: "Public",
    featured: true,
    views: 3890,
    downloads: 840,
    likes: 920,
    createdAt: "2026-03-05T16:45:00.000Z",
  },
  {
    _id: "prod-automotive-rim",
    name: "Forged Carbon Aerodynamic Hypercar Wheel Rim",
    slug: "forged-carbon-aerodynamic-hypercar-wheel-rim",
    category: "Automotive & Industrial",
    shortDescription:
      "Hypercar lightweight forged carbon fiber multi-spoke wheel rim with ceramic brake rotor assembly.",
    description:
      "High-performance automotive engineering asset with true-to-life forged carbon patterns, titanium lug nuts, ventilated ceramic brake discs, and Brembo caliper details.",
    thumbnail:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    ],
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    modelFileName: "forged_carbon_wheel_rim.glb",
    modelFileType: "glb",
    softwareUsed: ["Blender", "KeyShot", "Substance Designer", "Rhino 3D"],
    tags: ["Automotive", "Forged Carbon", "Rim", "Industrial Design", "Hypercar"],
    status: "Published",
    visibility: "Public",
    featured: false,
    views: 1670,
    downloads: 240,
    likes: 385,
    createdAt: "2026-03-06T12:00:00.000Z",
  },
];
