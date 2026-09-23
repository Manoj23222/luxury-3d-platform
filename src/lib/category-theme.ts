export interface CategoryTheme {
  name: string;
  accent: string;
  accentRgb: string;
  rimColor: string;
  badgeBg: string;
  badgeBorder: string;
  glowShadow: string;
}

export function getCategoryTheme(category?: string): CategoryTheme {
  const cat = (category || "").toLowerCase();

  if (
    cat.includes("fashion") ||
    cat.includes("bag") ||
    cat.includes("apparel") ||
    cat.includes("luxury")
  ) {
    return {
      name: "Champagne Luxury",
      accent: "#e5c598",
      accentRgb: "229, 197, 152",
      rimColor: "#f3e1c6",
      badgeBg: "bg-amber-950/40 text-amber-200",
      badgeBorder: "border-amber-500/30",
      glowShadow: "0 0 35px rgba(229, 197, 152, 0.15)",
    };
  }
  if (
    cat.includes("electronic") ||
    cat.includes("tech") ||
    cat.includes("gadget") ||
    cat.includes("device")
  ) {
    return {
      name: "Ice Blue Tech",
      accent: "#38bdf8",
      accentRgb: "56, 189, 248",
      rimColor: "#93c5fd",
      badgeBg: "bg-sky-950/40 text-sky-200",
      badgeBorder: "border-sky-500/30",
      glowShadow: "0 0 35px rgba(56, 189, 248, 0.15)",
    };
  }
  if (
    cat.includes("furniture") ||
    cat.includes("interior") ||
    cat.includes("wood") ||
    cat.includes("architecture")
  ) {
    return {
      name: "Warm Bronze",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      rimColor: "#fde68a",
      badgeBg: "bg-amber-950/40 text-amber-300",
      badgeBorder: "border-amber-600/30",
      glowShadow: "0 0 35px rgba(245, 158, 11, 0.15)",
    };
  }
  if (
    cat.includes("cgi") ||
    cat.includes("art") ||
    cat.includes("visual") ||
    cat.includes("3d")
  ) {
    return {
      name: "Emerald Studio",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      rimColor: "#6ee7b7",
      badgeBg: "bg-emerald-950/40 text-emerald-200",
      badgeBorder: "border-emerald-500/30",
      glowShadow: "0 0 35px rgba(16, 185, 129, 0.15)",
    };
  }

  // Default Warm Champagne / Soft Platinum
  return {
    name: "Obsidian Platinum",
    accent: "#e2d4b7",
    accentRgb: "226, 212, 183",
    rimColor: "#f5eee0",
    badgeBg: "bg-neutral-900/60 text-neutral-200",
    badgeBorder: "border-white/20",
    glowShadow: "0 0 35px rgba(226, 212, 183, 0.12)",
  };
}
