import {
  canManageOrders,
  canManageProducts,
  canManageSettings,
  canManageUsers,
  canUploadAssets,
} from "@/lib/permissions";

export function getDashboardLinks(role?: string, permissions: string[] = []) {
  const links = [];

  if (canUploadAssets(role, permissions)) {
    links.push({ label: "Upload Asset", href: "/dashboard/upload" });
    links.push({ label: "My Assets", href: "/dashboard/projects" });
  }

  if (canManageUsers(role, permissions)) {
    links.push({ label: "Users", href: "/admin/users" });
  }

  if (canManageOrders(role, permissions)) {
    links.push({ label: "Orders", href: "/admin/orders" });
  }

  if (canManageProducts(role, permissions)) {
    links.push({ label: "Products", href: "/admin/products" });
  }

  if (canManageSettings(role, permissions)) {
    links.push({ label: "Settings", href: "/admin/settings" });
  }

  return links;
}