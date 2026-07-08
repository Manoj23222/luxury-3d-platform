import {
  canManageOrders,
  canManageProducts,
  canManageSettings,
  canManageUsers,
  canUploadAssets,
} from "@/lib/permissions";

export function getDashboardLinks(role?: string) {
  const links = [];

  // Creator + Admin
  if (canUploadAssets(role)) {
    links.push({
      label: "Upload Asset",
      href: "/dashboard/upload",
    });

    links.push({
      label: "My Assets",
      href: "/dashboard/projects",
    });
  }

  // Admin Only
  if (canManageUsers(role)) {
    links.push({
      label: "Users",
      href: "/dashboard/users",
    });
  }

  if (canManageOrders(role)) {
    links.push({
      label: "Orders",
      href: "/dashboard/orders",
    });
  }

  if (canManageProducts(role)) {
    links.push({
      label: "Products",
      href: "/admin/products", // ✅ unique route
    });
  }

  if (canManageSettings(role)) {
    links.push({
      label: "Settings",
      href: "/admin/settings", // ✅ unique route
    });
  }

  return links;
}