export type Role = "customer" | "creator" | "admin";

export function isAdmin(role?: string) {
  return role === "admin";
}

export function isCreator(role?: string) {
  return role === "creator";
}

export function canAccessAdmin(role?: string) {
  return role === "admin";
}

export function canAccessCreatorDashboard(role?: string) {
  return role === "admin" || role === "creator";
}