import {
  canManageOrders,
  canManageProducts,
  canManageSettings,
  canManageUsers,
  canUploadAssets,
} from "@/lib/permissions";

export function getDashboardLinks(role?: string) {
  const links = [];

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
      href: "/dashboard/projects",
    });
  }

  if (canManageSettings(role)) {
    links.push({
      label: "Settings",
      href: "/dashboard/settings",
    });
  }

  return links;
}