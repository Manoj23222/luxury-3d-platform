import json

illustrator_files = [
    {
        "id": "ai-01-product-cutout",
        "title": "Precision Vector Line Art & Product Cutout 01",
        "slug": "vector-line-art-product-cutout-01",
        "img": "/illustrator-previews/ai_01_1.png",
        "sourceAi": "/illustrator/1.ai",
        "desc": "High precision pen-tool vector paths and technical product isolation created in Adobe Illustrator."
    },
    {
        "id": "ai-02-hdr-vector-01",
        "title": "Ultra-Res Commercial Vector Graphic 01",
        "slug": "commercial-vector-graphic-01",
        "img": "/illustrator-previews/ai_02_1747281464220_UpRGB_auto_scale.png",
        "sourceAi": "/illustrator/1747281464220(UpRGB)(auto_scale)(Level3)(tta)(x2.000000)(16bit).ai",
        "desc": "High-dynamic range vector master composition with multi-layer color separations in Adobe Illustrator."
    },
    {
        "id": "ai-03-hdr-vector-02",
        "title": "High Dynamic Color Calibration Vector 02",
        "slug": "color-calibration-vector-02",
        "img": "/illustrator-previews/ai_03_1747364301403_UpRGB_auto_scale.png",
        "sourceAi": "/illustrator/1747364301403(UpRGB)(auto_scale)(Level3)(tta)(x2.000000)(16bit).ai",
        "desc": "Complex vector shapes, gradient meshes, and spot color matching in Adobe Illustrator."
    },
    {
        "id": "ai-04-tech-drawing-02",
        "title": "Technical Vector Blueprint & Drawing 02",
        "slug": "technical-vector-blueprint-02",
        "img": "/illustrator-previews/ai_04_2.png",
        "sourceAi": "/illustrator/2.ai",
        "desc": "Vector outline technical schema and geometric CAD conversion in Adobe Illustrator."
    },
    {
        "id": "ai-05-commercial-banner-comp",
        "title": "Commercial Banner & Vector Composition",
        "slug": "commercial-banner-vector-composition",
        "img": "/illustrator-previews/ai_05_JExuxlgR_jpg_large.png",
        "sourceAi": "/illustrator/JExuxlgR.jpg_large.ai",
        "desc": "Billboard scale vector key visual with custom typographic lockup and branding assets."
    },
    {
        "id": "ai-06-bunnymay-artboard",
        "title": "Bunnymay Character Vector Artboard",
        "slug": "bunnymay-character-vector-artboard",
        "img": "/illustrator-previews/ai_06_bunnymay__1.png",
        "sourceAi": "/illustrator/bunnymay_アートボード 1.ai",
        "desc": "Stylized character artboard designed with Bezier curves, crisp stroke weights, and pantone swatches."
    },
    {
        "id": "ai-07-bunnymay-brand-logo",
        "title": "Bunnymay Brand Identity & Vector Logo Design",
        "slug": "bunnymay-brand-identity-vector-logo",
        "img": "/illustrator-previews/ai_07_bunnymaylogo.png",
        "sourceAi": "/illustrator/bunnymaylogo.ai",
        "desc": "End-to-end corporate vector identity, mascot mark, and scale-independent SVG/AI logo system."
    },
    {
        "id": "ai-08-mobile-ui-icons",
        "title": "Mobile UI & Icon Vector Graphics Pack",
        "slug": "mobile-ui-icon-vector-graphics-pack",
        "img": "/illustrator-previews/ai_08_line_oa_chat_250731_154120_UpR.png",
        "sourceAi": "/illustrator/line_oa_chat_250731_154120(UpRGB)(auto_scale)(Level3)(tta)(x2.000000)(16bit).ai",
        "desc": "Pixel-perfect interface icons, button vector shapes, and mobile app graphics in Adobe Illustrator."
    },
    {
        "id": "ai-09-polyester-spec",
        "title": "Polyester Fabric Specification Vector Diagram",
        "slug": "polyester-fabric-specification-vector",
        "img": "/illustrator-previews/ai_09_polyester.png",
        "sourceAi": "/illustrator/polyester.ai",
        "desc": "Textile technical specification sheet with vector micro-fiber weave pattern and apparel callouts."
    },
    {
        "id": "ai-10-polyurethane-spec",
        "title": "Polyurethane Material Vector Tech Pack",
        "slug": "polyurethane-material-vector-tech-pack",
        "img": "/illustrator-previews/ai_10_polyurethane.png",
        "sourceAi": "/illustrator/polyurethane.ai",
        "desc": "Industrial polymer specification diagram and manufacturing production vector guides."
    },
    {
        "id": "ai-11-scanty-apparel",
        "title": "Apparel Pattern & Vector Outline Design",
        "slug": "apparel-pattern-vector-outline-design",
        "img": "/illustrator-previews/ai_11_scanty.png",
        "sourceAi": "/illustrator/scanty.ai",
        "desc": "Garment manufacturing pattern cutlines, grading markers, and stitch vector specifications."
    },
    {
        "id": "ai-12-stocking-garment",
        "title": "Fashion Garment Vector Outline Design",
        "slug": "fashion-garment-vector-outline-design",
        "img": "/illustrator-previews/ai_12_stocking.png",
        "sourceAi": "/illustrator/stocking.ai",
        "desc": "Intricate hosiery and garment contours with high-density vector bezier paths in Adobe Illustrator."
    },
    {
        "id": "ai-13-nekomi-manga",
        "title": "Nekomi Anime Character Vector Art",
        "slug": "nekomi-anime-character-vector-art",
        "img": "/illustrator-previews/ai_13_artwork_13.png",
        "sourceAi": "/illustrator/ねこみ.ai",
        "desc": "Expressive line-art cartoon character with clean path outlines and vibrant vector shading."
    },
    {
        "id": "ai-14-murphy-mascot",
        "title": "Murphy Mascot Character Illustration",
        "slug": "murphy-mascot-character-illustration",
        "img": "/illustrator-previews/ai_14_artwork_14.png",
        "sourceAi": "/illustrator/マーフィーくん.ai",
        "desc": "Commercial mascot illustration crafted in Adobe Illustrator with scalable vector geometry."
    },
    {
        "id": "ai-15-miyagi-poster",
        "title": "Miyagi Victory Editorial Vector Poster",
        "slug": "miyagi-victory-editorial-vector-poster",
        "img": "/illustrator-previews/ai_15_artwork_15.png",
        "sourceAi": "/illustrator/宮城初勝利.ai",
        "desc": "Dramatic commemorative editorial sports vector illustration with custom kanji brush-stroke typography."
    },
    {
        "id": "ai-16-detective-usami",
        "title": "Detective Usami Character Vector Illustration",
        "slug": "detective-usami-character-vector-illustration",
        "img": "/illustrator-previews/ai_16_artwork_16.png",
        "sourceAi": "/illustrator/探偵うさみちゃん.ai",
        "desc": "Classic manga mystery mascot vector drawing with crisp stroke weights and flat color fills."
    },
    {
        "id": "ai-17-east-50th-memorial",
        "title": "East 50th Milestone Memorial Artwork",
        "slug": "east-50th-milestone-memorial-artwork",
        "img": "/illustrator-previews/ai_17_50.png",
        "sourceAi": "/illustrator/東50勝.ai",
        "desc": "High-impact anniversary editorial art with dynamic vector typography, emblems, and layered textures."
    },
    {
        "id": "ai-18-usami-chan-licensed",
        "title": "Licensed Character Usami-chan Integrated Vector",
        "slug": "licensed-character-usami-chan-vector",
        "img": "/illustrator-previews/ai_18_1.png",
        "sourceAi": "/illustrator/汎用版権_うさみちゃん1_統合済.ai",
        "desc": "Official licensed merchandise vector asset with integrated CMYK spot printing separations."
    },
    {
        "id": "ai-19-kumakichi-licensed",
        "title": "Licensed Character Kumakichi Integrated Vector",
        "slug": "licensed-character-kumakichi-vector",
        "img": "/illustrator-previews/ai_19_1.png",
        "sourceAi": "/illustrator/汎用版権_クマ吉1_統合済.ai",
        "desc": "Production-ready merchandise character asset engineered with Illustrator dynamic paths."
    },
]

blender_files = [
    {
        "id": "pw-blender-burger-cgi",
        "title": "Culinary Flame-Grilled Burger Organic 3D CGI",
        "slug": "culinary-burger-organic-3d-cgi",
        "img": "/images/Burger.png",
        "desc": "Detailed organic 3D modeling and material calibration created in Blender. Multi-layer subsurface scattering on meat patty, procedural bread textures, and crisp food commercial lighting.",
        "category": "Organic CGI & Texturing",
        "tags": ["Blender", "3D", "Burger", "Food CGI", "Subsurface"]
    },
    {
        "id": "pw-blender-aura-jewelry",
        "title": "Aura Haute Couture Luxury Jewelry & Metal Visual",
        "slug": "aura-luxury-jewelry-metal-visual",
        "img": "/images/AURA.png",
        "desc": "High-end luxury jewelry visualization modeled in Blender with micro-chamfer bevels and realistic photon caustics.",
        "category": "Jewelry & Luxury CGI",
        "tags": ["Blender", "Jewelry", "3D", "Diamond", "Gold"]
    },
    {
        "id": "pw-blender-chronograph-watch",
        "title": "Swiss Chronograph Timepiece Precision 3D Model",
        "slug": "swiss-chronograph-timepiece-precision-3d",
        "img": "/images/34.png",
        "desc": "Industrial grade hard-surface CAD/subdivision modeling created in Blender for real-time WebGL and 8K commercial catalog renders.",
        "category": "Hard-Surface 3D Modeling",
        "tags": ["Blender", "3D", "Watch", "Timepiece", "Hard Surface"]
    },
    {
        "id": "pw-blender-ice-sculpt",
        "title": "Liquid Refraction & Ice Sculpture Visual Experiment",
        "slug": "liquid-refraction-ice-sculpture-visual",
        "img": "/images/ice.png",
        "desc": "Creative visual experiment modeled in Blender utilizing geometry nodes and custom dielectric shader materials.",
        "category": "Visual Experiments & 3D Simulation",
        "tags": ["Blender", "3D", "Ice", "Liquid", "Simulation"]
    },
    {
        "id": "pw-blender-perfume-cgi",
        "title": "L'Élixir Fragrance Luxury 3D Product CGI",
        "slug": "lelixir-fragrance-luxury-3d-cgi",
        "img": "/images/123.png",
        "desc": "High-precision commercial 3D modeling and lighting crafted in Blender 3D. Features procedural glass dispersion, gold cap reflections, and billboard-resolution studio rendering.",
        "category": "3D Product Visualization",
        "tags": ["Blender", "3D", "CGI", "Product", "Perfume", "Glass"]
    },
    {
        "id": "bl-soda-can",
        "title": "Commercial Beverage Yellow Soda Can 3D Model",
        "slug": "commercial-yellow-soda-can-3d-model",
        "img": "/blender-previews/soda-can-yellow.png",
        "sourceBlend": "/blender/soda-can-yellow.blend",
        "desc": "Subdivision aluminum beverage packaging modeled in Blender with condensation droplets and metallic foil shader.",
        "category": "3D Packaging & Commercial CGI",
        "tags": ["Blender", "3D", "Packaging", "Soda Can", "Commercial"]
    },
    {
        "id": "bl-moka-maker",
        "title": "Italian Moka Espresso Coffee Maker 3D Model",
        "slug": "italian-moka-espresso-coffee-maker-3d",
        "img": "/blender-previews/moka-coffee-maker.png",
        "sourceBlend": "/blender/moka-coffee-maker.blend",
        "desc": "Eight-sided faceted aluminum coffee maker modeled in Blender with machined valve detailing and bakelite handle.",
        "category": "3D Hard-Surface Modeling",
        "tags": ["Blender", "3D", "Coffee", "Appliance", "Industrial Design"]
    },
    {
        "id": "bl-leather-notebook",
        "title": "Luxury Blue Leather Journal Notebook 3D Model",
        "slug": "luxury-blue-leather-journal-notebook-3d",
        "img": "/blender-previews/blue-leather-notebook.png",
        "sourceBlend": "/blender/blue-leather-notebook.blend",
        "desc": "Premium stitched leather binder notebook with realistic crease displacement, bookmark ribbon, and embossed foil typography.",
        "category": "3D Stationery & Product Design",
        "tags": ["Blender", "3D", "Leather", "Notebook", "Luxury"]
    },
    {
        "id": "bl-umbrella-open",
        "title": "Studio Open Canopy Windproof Umbrella 3D Model",
        "slug": "studio-open-windproof-umbrella-3d-model",
        "img": "/blender-previews/umbrella-open.png",
        "sourceBlend": "/blender/umbrella-open.blend",
        "desc": "Cloth simulation tensioning and fiberglass rib mechanics modeled in Blender with procedural waterproof weave shader.",
        "category": "3D Product Visualization",
        "tags": ["Blender", "3D", "Umbrella", "Cloth Simulation", "Product"]
    },
    {
        "id": "bl-modern-building",
        "title": "Contemporary Architectural High-Rise 3D Model",
        "slug": "contemporary-architectural-high-rise-3d",
        "img": "/blender-previews/modern-building.png",
        "sourceBlend": "/blender/modern-building.blend",
        "desc": "Parametric architectural facade, curtain wall glazing, and cantilevered balconies modeled in Blender for ArchViz.",
        "category": "Architectural Visualization (ArchViz)",
        "tags": ["Blender", "3D", "ArchViz", "Building", "Architecture"]
    },
    {
        "id": "bl-city-buildings",
        "title": "Metropolitan Skyscraper Urban Complex 3D Model",
        "slug": "metropolitan-skyscraper-urban-complex-3d",
        "img": "/blender-previews/city-buildings.png",
        "sourceBlend": "/blender/city-buildings.blend",
        "desc": "Multi-building cityscape skyline block with high-density architectural geometry, glass reflections, and street grids.",
        "category": "Architectural Visualization (ArchViz)",
        "tags": ["Blender", "3D", "City", "Skyscrapers", "ArchViz"]
    },
    {
        "id": "bl-city-gate",
        "title": "Futuristic Industrial Security Access Gate 3D",
        "slug": "futuristic-security-access-gate-3d",
        "img": "/blender-previews/city-access-gate.png",
        "sourceBlend": "/blender/city-access-gate.blend",
        "desc": "Hard-surface mechanical barrier, turnstile access housing, and sensor panels crafted in Blender.",
        "category": "3D Hard-Surface & Industrial Design",
        "tags": ["Blender", "3D", "Gate", "Industrial", "Hard Surface"]
    },
    {
        "id": "bl-boy-character",
        "title": "Stylized 3D Character Figurine Model",
        "slug": "stylized-3d-character-figurine-model",
        "img": "/blender-previews/boy-character.png",
        "sourceBlend": "/blender/boy-character.blend",
        "desc": "Clean subdivision character topology, vertex color painting, and collectible figurine aesthetic created in Blender.",
        "category": "3D Character Modeling",
        "tags": ["Blender", "3D", "Character", "Stylized", "Sculpting"]
    },
    {
        "id": "bl-android-logo",
        "title": "Dimensional Android 3D Emblem & Motion Asset",
        "slug": "dimensional-android-3d-emblem-motion-asset",
        "img": "/blender-previews/android-logo-3d.png",
        "sourceBlend": "/blender/android-logo-3d.blend",
        "desc": "Sleek volumetric tech brand emblem rendered with micro-bevel reflections and satin studio illumination.",
        "category": "3D Motion & Brand Assets",
        "tags": ["Blender", "3D", "Logo", "Android", "Brand Asset"]
    },
    {
        "id": "bl-facebook-logo",
        "title": "Glossy 3D Social Brand Emblem",
        "slug": "glossy-3d-social-brand-emblem",
        "img": "/blender-previews/facebook-logo-3d.png",
        "sourceBlend": "/blender/facebook-logo-3d.blend",
        "desc": "Curved high-gloss dimensional brand identity asset with studio key-fill-rim lighting setup in Blender.",
        "category": "3D Motion & Brand Assets",
        "tags": ["Blender", "3D", "Logo", "Social", "Brand Asset"]
    }
]

print(f"Total Illustrator works: {len(illustrator_files)}")
print(f"Total Blender works: {len(blender_files)}")
