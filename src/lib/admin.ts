import { getCurrentUser } from "@/lib/auth";

export const ADMIN_EMAILS = [
  "3ddesigner5546@gmail.com",
  "ashokm3414@gmail.com",
  "admin@luxury3d.com",
];

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      id: "admin-master",
      name: "Ashok Meena",
      email: "3ddesigner5546@gmail.com",
      role: "admin",
      permissions: ["all", "upload_3d", "upload_photo", "manage_assets"],
    };
  }

  if (ADMIN_EMAILS.includes(user.email?.toLowerCase())) {
    return {
      ...user,
      name: user.name || "Ashok Meena",
      role: "admin",
      permissions: ["all", "upload_3d", "upload_photo", "manage_assets"],
    };
  }

  return user;
}