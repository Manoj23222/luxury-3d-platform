import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";

// Complete high-end showcase items including Before/After comparisons and Single Creative Banners across all industries
const FALLBACK_PHOTO_WORKS = [
  // ==========================================
  // 1. BEFORE & AFTER RETOUCHING PAIRS
  // ==========================================
  {
    _id: "pw-white-background-resize",
    title: "White background & Resize",
    slug: "white-background-and-resize",
    workType: "before_after",
    category: "White background & Resize",
    shortDescription:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048",
    description:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048. High-precision studio product isolation to seamless pure white background with natural drop shadow retention.",
    beforeImage:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Capture One", "Wacom Intuos Pro"],
    resolution: "3448×5168 ➔ 1366×2048",
    clientName: "E-Commerce Studio",
    projectYear: "2026",
    tags: ["White Background", "Resize", "Product", "Isolation", "Dimensions"],
    featured: true,
    views: 1850,
    likes: 490,
  },
  {
    _id: "pw-background-change-resize",
    title: "Background change & Resize",
    slug: "background-change-and-resize",
    workType: "before_after",
    category: "Background change & Resize",
    shortDescription:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048",
    description:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048. Seamless background cutout, edge refinement, lighting harmonization, and dimension resizing for high-conversion web listings.",
    beforeImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Pen Tool", "Lightroom"],
    resolution: "3448×5168 ➔ 1366×2048",
    clientName: "Apparel Brand",
    projectYear: "2026",
    tags: ["Background Change", "Resize", "Cutout", "E-Commerce", "Dimensions"],
    featured: true,
    views: 1620,
    likes: 415,
  },
  {
    _id: "pw-luxury-perfume",
    title: "Luxury Perfume Bottle High-End Commercial Retouching",
    slug: "luxury-perfume-bottle-retouching",
    workType: "before_after",
    category: "Product Retouching",
    shortDescription:
      "Advanced dust/scratch cleanup, metallic highlight sculpting, glass reflection enhancement and background color harmonization.",
    description:
      "Commercial e-commerce and billboard retouching for a luxury fragrance campaign. Project involved complete glass refractive enhancement, precise reflection sculpting, dust and seam removal, gold typography enhancement, and studio shadow creation.",
    beforeImage:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Capture One", "Wacom Intuos Pro"],
    resolution: "6000 x 4000 (24 MP)",
    clientName: "Aura Luxe Fragrances",
    projectYear: "2026",
    tags: ["Product", "Perfume", "Commercial", "Reflections", "Glass"],
    featured: true,
    views: 1420,
    likes: 384,
  },
  {
    _id: "pw-editorial-fashion",
    title: "High-Fashion Editorial Beauty & Skin Micro-Dodge & Burn",
    slug: "high-fashion-editorial-beauty-retouching",
    workType: "before_after",
    category: "Fashion & Portrait",
    shortDescription:
      "Natural skin texture preservation with frequency separation, micro dodge & burn, hair flyaway cleanup and subtle color toning.",
    description:
      "High-end magazine cover retouching emphasizing natural skin pores without artificial blur. Non-destructive workflow utilizing frequency separation, 16-bit color precision, micro dodge & burn, eye luminance enhancement, and color balance grading.",
    beforeImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Frequency Separation", "Capture One Pro"],
    resolution: "50 MP Raw (Hasselblad)",
    clientName: "Vogue Creative Series",
    projectYear: "2026",
    tags: ["Fashion", "Portrait", "Beauty", "Dodge & Burn", "Skin Retouching"],
    featured: true,
    views: 2180,
    likes: 612,
  },
  {
    _id: "pw-cinematic-color",
    title: "Cinematic Mood & Atmospheric Teal/Orange Color Grading",
    slug: "cinematic-mood-atmospheric-color-grading",
    workType: "before_after",
    category: "Color Grading",
    shortDescription:
      "Hollywood-style cinematic color grading, highlights roll-off, film grain emulation, and dynamic range exposure blending.",
    description:
      "Commercial campaign color grading for lifestyle brand. Transformed flat lighting into a rich, emotive twilight ambiance using custom 3D LUTs, curves adjustment, split-toning, and atmospheric depth mask enhancement.",
    beforeImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Lightroom", "Adobe Photoshop", "3D LUT Creator"],
    resolution: "8K Ultra HD",
    clientName: "Alpine Odyssey Campaign",
    projectYear: "2026",
    tags: ["Color Grading", "Cinematic", "Landscape", "Mood", "Film Grain"],
    featured: true,
    views: 1890,
    likes: 479,
  },
  {
    _id: "pw-luxury-watch",
    title: "Swiss Chronograph Watch Metal & Crystal Micro Retouching",
    slug: "swiss-chronograph-watch-retouching",
    workType: "before_after",
    category: "Jewelry & Luxury Ads",
    shortDescription:
      "Sapphire crystal anti-glare cleanup, brushed titanium bevel sharpening, dial alignment, and studio glare correction.",
    description:
      "Ultra-detailed luxury timepiece advertising retouching. Multi-exposure composite to create pristine dial clarity, bevel highlight alignment, zero scratches on titanium casing, and realistic cast shadow reconstruction.",
    beforeImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Focus Stacking", "Helicon Focus"],
    resolution: "100 MP Medium Format",
    clientName: "Geneva Timepieces",
    projectYear: "2026",
    tags: ["Watch", "Jewelry", "Macro", "Titanium", "Luxury Retouch"],
    featured: true,
    views: 1650,
    likes: 420,
  },

  // ==============================================================
  // 2. CREATIVE GRAPHIC DESIGN BANNERS & SOCIAL ADS (PORTFOLIO STYLE)
  // ==========================================
  // [A] Food & Beverage Ads
  {
    _id: "pw-banner-burger-menu",
    title: "Super Delicious Burger Menu Social Media Creative Banner",
    slug: "super-delicious-burger-menu-social-banner",
    workType: "banner",
    category: "Food & Beverage Ads",
    shortDescription:
      "High-converting promotional food ad creative with flame-grilled typography, contrast enhancement, and appetizing color saturation.",
    description:
      "Commercial social media campaign creative for restaurant delivery brand. Features custom typography layout, dynamic ingredient highlights, color enhancement for warmth, and promotional pricing badges.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Adobe Illustrator", "Canva Pro"],
    resolution: "2048 × 2048 (1:1 Square Feed)",
    clientName: "Gourmet Burgers Co.",
    projectYear: "2026",
    tags: ["Banner", "Social Media", "Food", "Burger", "Creative", "Poster"],
    featured: true,
    views: 2450,
    likes: 680,
  },
  {
    _id: "pw-banner-pizza-promo",
    title: "Italian Artisan Crust Pizza Commercial Social Banner",
    slug: "italian-artisan-pizza-commercial-banner",
    workType: "banner",
    category: "Food & Beverage Ads",
    shortDescription:
      "Artisan food packaging and social media feed advertisement featuring wooden board staging and crisp text hierarchy.",
    description:
      "High-impact social advertising graphic designed for Instagram & Facebook campaigns with appetizing saturation, brand logo placement, and discount callouts.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Lightroom", "Illustrator"],
    resolution: "2048 × 2048 (1:1 Square)",
    clientName: "Napoli Express",
    projectYear: "2026",
    tags: ["Pizza", "Food", "Social Media", "Banner", "Advertising"],
    featured: true,
    views: 1940,
    likes: 512,
  },
  {
    _id: "pw-banner-ghar-jaisa-khana",
    title: "Ghar Jaisa Khana Traditional Food Delivery Social Creative",
    slug: "ghar-jaisa-khana-traditional-food-banner",
    workType: "banner",
    category: "Food & Beverage Ads",
    shortDescription:
      "Authentic Indian traditional cuisine promotional poster with rustic copper handi staging, warm mood, and clean text badges.",
    description:
      "Traditional homestyle food brand campaign ad designed with geometric split layouts, localized typography, and delicious culinary textures.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator"],
    resolution: "2048 × 2048 (Square Feed)",
    clientName: "Khozzo Kitchens",
    projectYear: "2026",
    tags: ["Indian Food", "Creative Banner", "Social Media", "Restaurant", "Poster"],
    featured: false,
    views: 1520,
    likes: 395,
  },

  // [B] Cosmetics & Beauty Ads
  {
    _id: "pw-banner-cosmetics-botanical",
    title: "What’s in the Bottle? Organic Aloe Vera Skincare Creative",
    slug: "whats-in-the-bottle-aloe-skincare-banner",
    workType: "banner",
    category: "Cosmetics & Beauty Ads",
    shortDescription:
      "Organic skincare promotional ad featuring fresh botanicals, droplet reflections, ingredient callouts, and clean wellness typography.",
    description:
      "Commercial beauty campaign poster with soft natural sunlight shadows, botanical leaf staging, and transparency ingredient highlights.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator"],
    resolution: "2048 × 2048 (Square Feed)",
    clientName: "Pores Organic",
    projectYear: "2026",
    tags: ["Cosmetics", "Skincare", "Serum", "Beauty", "Banner", "Poster"],
    featured: true,
    views: 2280,
    likes: 540,
  },
  {
    _id: "pw-banner-pores-charcoal",
    title: "Pores Deep Charcoal Cleanse Face Wash Social Ad Banner",
    slug: "pores-deep-charcoal-cleanse-face-wash-banner",
    workType: "banner",
    category: "Cosmetics & Beauty Ads",
    shortDescription:
      "Activated charcoal cosmetic flyer featuring splash textures, clean minimalist backdrop, and refreshing mint styling.",
    description:
      "High-conversion e-commerce and social feed advertisement with crisp packaging typography and pore purification infographics.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator"],
    resolution: "2048 × 2048 HD",
    clientName: "Pores Care Ltd",
    projectYear: "2026",
    tags: ["Charcoal", "Face Wash", "Cosmetics", "Social Ad", "Banner"],
    featured: false,
    views: 1730,
    likes: 420,
  },
  {
    _id: "pw-banner-summer-vitaminc",
    title: "Enjoy the Sunny Summer Vitamin C Range Brightening Ad",
    slug: "enjoy-sunny-summer-vitamin-c-banner",
    workType: "banner",
    category: "Cosmetics & Beauty Ads",
    shortDescription:
      "Bright summer sunshine cosmetic promo poster with sun protection callouts and citrus gradient glow.",
    description:
      "Vibrant summer seasonal ad for Vitamin C skincare trio. Balanced lighting, warm tone curves, and bold headline branding.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Lightroom"],
    resolution: "2048 × 2048 (1:1 Feed)",
    clientName: "Pores Glow",
    projectYear: "2026",
    tags: ["Vitamin C", "Summer", "Sunscreen", "Beauty Ad", "Banner"],
    featured: true,
    views: 2110,
    likes: 580,
  },

  // [C] Jewelry & Luxury Ads
  {
    _id: "pw-banner-jewelry-rings",
    title: "Luxury Gold & Diamond Rings Commercial Showcase Creative",
    slug: "luxury-gold-diamond-rings-showcase-creative",
    workType: "banner",
    category: "Jewelry & Luxury Ads",
    shortDescription:
      "Clean silk-draped jewelry marketing banner with sparkling specular reflections and elegant brand typography.",
    description:
      "High-end luxury jewelry social media ad and e-commerce hero banner. Features polished macro gems, custom lighting flare highlights, and sophisticated brand branding.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator", "Frequency Separation"],
    resolution: "2160 × 2160 4K",
    clientName: "Aura Royale Jewels",
    projectYear: "2026",
    tags: ["Jewelry", "Luxury", "Gold", "Diamonds", "Commercial Banner"],
    featured: true,
    views: 3120,
    likes: 890,
  },
  {
    _id: "pw-banner-diamond-pendant",
    title: "The Praise You Emerald & Gold Heritage Royal Pendant Banner",
    slug: "the-praise-you-emerald-gold-pendant-banner",
    workType: "banner",
    category: "Jewelry & Luxury Ads",
    shortDescription:
      "Fine heritage jewelry promotional card with petal arrangements, soft luxury illumination, and cursive headline.",
    description:
      "Bridal & royal collection jewelry poster showcasing hand-crafted filigree detailing, emerald cuts, and bespoke typography.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator"],
    resolution: "2160 × 2160 4K",
    clientName: "The Praise You Jewels",
    projectYear: "2026",
    tags: ["Pendant", "Emerald", "Gold", "Heritage", "Luxury Ad"],
    featured: false,
    views: 1840,
    likes: 460,
  },

  // [D] Real Estate, Hotel & Interior Ads
  {
    _id: "pw-banner-khozzo-hotel",
    title: "Khozzo Luxury Executive Hotel Rooms & Suites Ad Banner",
    slug: "khozzo-luxury-hotel-rooms-suites-banner",
    workType: "banner",
    category: "Real Estate & Interior Ads",
    shortDescription:
      "Modern hospitality booking creative with clean geometric layout, luxury bed chamber visuals, and booking CTA.",
    description:
      "Hotel chain social media promotion card designed for travel platforms. High dynamic range interior exposure, sleek slate & gold color accents.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Lightroom", "Illustrator"],
    resolution: "2048 × 2048 (Square Feed)",
    clientName: "Khozzo Rooms",
    projectYear: "2026",
    tags: ["Hotel", "Real Estate", "Hospitality", "Rooms", "Banner"],
    featured: true,
    views: 1970,
    likes: 520,
  },
  {
    _id: "pw-banner-gurjan-plywood",
    title: "Gurjan Premium Plywood Modern Living Room Sofa Creative",
    slug: "gurjan-plywood-modern-living-room-banner",
    workType: "banner",
    category: "Real Estate & Interior Ads",
    shortDescription:
      "Architectural plywood & furniture brand promotional banner with interior staging, soft ambient light, and brand motto.",
    description:
      "Interior materials & furnishings campaign graphic with warm pastel tones, architectural layout balance, and brand identity.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator"],
    resolution: "2048 × 2048 HD",
    clientName: "Gurjan Plywood Co.",
    projectYear: "2026",
    tags: ["Plywood", "Interior", "Furniture", "Living Room", "Ad"],
    featured: false,
    views: 1650,
    likes: 410,
  },
  {
    _id: "pw-banner-luxury-interior",
    title: "Nordic Minimalist Living Room Interior Design Creative Ad",
    slug: "nordic-minimalist-living-room-interior-ad",
    workType: "banner",
    category: "Real Estate & Interior Ads",
    shortDescription:
      "Contemporary architectural furniture promotional banner with natural daylight grading and architectural text.",
    description:
      "Promotional social media creative for luxury furniture brand and interior studio. Balanced exposure blending, natural wood grain warmth, and crisp commercial branding.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Lightroom", "Illustrator"],
    resolution: "2048 × 2048 Square",
    clientName: "Nordic Living Studio",
    projectYear: "2026",
    tags: ["Interior", "Furniture", "Real Estate", "Architecture", "Banner"],
    featured: false,
    views: 1410,
    likes: 360,
  },

  // [E] Sports & Infographics
  {
    _id: "pw-banner-t20-cricket",
    title: "Indian T20 League Matchday Yellow vs Orange Epic Clash Banner",
    slug: "indian-t20-league-matchday-cricket-banner",
    workType: "banner",
    category: "Sports & Infographics",
    shortDescription:
      "High-energy cricket league matchday poster with stadium floodlight atmospheric effects, batsman silhouettes, and match stats.",
    description:
      "Sports broadcasting and social media engagement poster with vibrant dual-team color split, glowing typography, and live match countdown.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "Illustrator", "After Effects"],
    resolution: "2048 × 2048 (1:1 Feed)",
    clientName: "Premier Sports Media",
    projectYear: "2026",
    tags: ["Cricket", "T20", "Sports", "Matchday", "Infographic", "Banner"],
    featured: true,
    views: 2890,
    likes: 740,
  },

  // [F] Fashion, Apparel & Footwear Ads
  {
    _id: "pw-banner-fashion-footwear",
    title: "Forever Haute Couture High Heels Fashion Campaign Banner",
    slug: "forever-haute-couture-high-heels-banner",
    workType: "banner",
    category: "Fashion & Apparel Creatives",
    shortDescription:
      "Minimalist studio high-fashion footwear advertisement with warm tone gradient and geometric layout.",
    description:
      "Commercial catalog poster for luxury designer footwear. Precision product isolation, soft contact shadows, and editorial luxury typography.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "InDesign", "Capture One"],
    resolution: "2048 × 2048 HD",
    clientName: "Forever Footwear",
    projectYear: "2026",
    tags: ["Fashion", "High Heels", "Footwear", "Editorial", "Banner"],
    featured: true,
    views: 1890,
    likes: 470,
  },
  {
    _id: "pw-banner-silk-organza-blouse",
    title: "High-Fashion Silk Organza Blouse Editorial Promo Card",
    slug: "silk-organza-blouse-editorial-promo-card",
    workType: "banner",
    category: "Fashion & Apparel Creatives",
    shortDescription:
      "Pastel pink editorial apparel showcase with 3-panel split photoshoot layout and subtle studio framing.",
    description:
      "Fashion catalog social grid creative showcasing garment sleeve drape, fabric transparency, and editorial model posing.",
    beforeImage: "",
    afterImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    softwareUsed: ["Adobe Photoshop", "InDesign"],
    resolution: "2048 × 2048 (1:1 Square)",
    clientName: "Aura Haute Couture",
    projectYear: "2026",
    tags: ["Fashion", "Blouse", "Apparel", "Editorial", "Promo Card"],
    featured: false,
    views: 1720,
    likes: 430,
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const workType = searchParams.get("workType");

    let dbItems: any[] = [];

    try {
      await connectDB();
      const filter: Record<string, any> = { status: "Published" };

      if (category && category !== "All") {
        filter.category = category;
      }

      if (workType && workType !== "All") {
        filter.workType = workType;
      }

      if (search && search.trim()) {
        filter.$or = [
          { title: { $regex: search.trim(), $options: "i" } },
          { description: { $regex: search.trim(), $options: "i" } },
          { tags: { $in: [new RegExp(search.trim(), "i")] } },
        ];
      }

      dbItems = await PhotoWork.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .lean();
    } catch {
      dbItems = [];
    }

    // Combine DB items with fallback catalog
    let allWorks = dbItems.length > 0 ? dbItems : FALLBACK_PHOTO_WORKS;

    if (category && category !== "All") {
      allWorks = allWorks.filter((item) => item.category === category);
    }

    if (workType && workType !== "All") {
      allWorks = allWorks.filter((item) => (item.workType || "before_after") === workType);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      allWorks = allWorks.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      works: allWorks,
      total: allWorks.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch photo works",
        works: FALLBACK_PHOTO_WORKS,
        total: FALLBACK_PHOTO_WORKS.length,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      workType = "before_after",
      category,
      description,
      shortDescription,
      beforeImage,
      afterImage,
      thumbnail,
      softwareUsed,
      resolution,
      clientName,
      projectYear,
      tags,
      featured,
      status,
    } = body;

    // Validation: Title and After Image (or Banner image) are mandatory
    if (!title || !afterImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and Main Image/Banner are required",
        },
        { status: 400 }
      );
    }

    // If it's before_after mode, beforeImage is also required
    if (workType === "before_after" && !beforeImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Before Image is required for Before & After comparison",
        },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newWork = await PhotoWork.create({
      title,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      workType: workType || (beforeImage && beforeImage !== afterImage ? "before_after" : "banner"),
      category: category || "Product Retouching",
      description: description || "",
      shortDescription: shortDescription || description?.slice(0, 120) || "",
      beforeImage: beforeImage || "",
      afterImage,
      thumbnail: thumbnail || afterImage,
      softwareUsed: Array.isArray(softwareUsed)
        ? softwareUsed
        : String(softwareUsed || "Adobe Photoshop")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      resolution: resolution || "4K / Ultra HD",
      clientName: clientName || "",
      projectYear: projectYear || "2026",
      tags: Array.isArray(tags)
        ? tags
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      featured: Boolean(featured),
      status: status || "Published",
    });

    return NextResponse.json({
      success: true,
      message: "Photo work created successfully",
      work: newWork,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create photo work",
      },
      { status: 500 }
    );
  }
}
