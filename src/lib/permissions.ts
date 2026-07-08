export type UserRole = "admin" | "creator" | "customer";

export const PERMISSIONS = {
  DASHBOARD_ACCESS: "dashboard_access",
  UPLOAD_ASSETS: "upload_assets",
  MANAGE_USERS: "manage_users",
  MANAGE_ORDERS: "manage_orders",
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_SETTINGS: "manage_settings",
} as const;

export function hasPermission(permissions: string[] = [], permission: string) {
  return permissions.includes(permission);
}

export function isAdmin(role?: string) {
  return role === "admin";
}

export function isCreator(role?: string) {
  return role === "creator";
}

export function canAccessDashboard(role?: string, permissions: string[] = []) {
  return (
    role === "admin" ||
    role === "creator" ||
    hasPermission(permissions, PERMISSIONS.DASHBOARD_ACCESS)
  );
}

export function canUploadAssets(role?: string, permissions: string[] = []) {
  return (
    role === "admin" ||
    role === "creator" ||
    hasPermission(permissions, PERMISSIONS.UPLOAD_ASSETS)
  );
}

export function canManageUsers(role?: string, permissions: string[] = []) {
  return role === "admin" || hasPermission(permissions, PERMISSIONS.MANAGE_USERS);
}

export function canManageOrders(role?: string, permissions: string[] = []) {
  return role === "admin" || hasPermission(permissions, PERMISSIONS.MANAGE_ORDERS);
}

export function canManageProducts(role?: string, permissions: string[] = []) {
  return role === "admin" || hasPermission(permissions, PERMISSIONS.MANAGE_PRODUCTS);
}

export function canManageSettings(role?: string, permissions: string[] = []) {
  return role === "admin" || hasPermission(permissions, PERMISSIONS.MANAGE_SETTINGS);
}