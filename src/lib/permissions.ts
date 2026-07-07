export type UserRole =
  | "admin"
  | "creator"
  | "customer";

export function isAdmin(role?: string) {
  return role === "admin";
}

export function isCreator(role?: string) {
  return role === "creator";
}

export function isCustomer(role?: string) {
  return role === "customer";
}

export function canAccessDashboard(role?: string) {
  return role === "admin" || role === "creator";
}

export function canManageUsers(role?: string) {
  return role === "admin";
}

export function canManageOrders(role?: string) {
  return role === "admin";
}

export function canManageProducts(role?: string) {
  return role === "admin";
}

export function canManageSettings(role?: string) {
  return role === "admin";
}

export function canUploadAssets(role?: string) {
  return role === "admin" || role === "creator";
}