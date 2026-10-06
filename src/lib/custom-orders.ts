import fs from "fs/promises";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "src/data/custom-orders.json");

let cachedOrders: Record<string, number> = {};
let lastLoaded = 0;
const CACHE_TTL = 2000;

export async function getCustomOrders(forceRefresh = false): Promise<Record<string, number>> {
  const now = Date.now();
  if (!forceRefresh && lastLoaded > 0 && now - lastLoaded < CACHE_TTL) {
    return cachedOrders;
  }

  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      cachedOrders = parsed;
      lastLoaded = now;
      return cachedOrders;
    }
  } catch {
    // Ignore read error, start empty
  }

  return cachedOrders;
}

export async function saveCustomOrders(
  updates: Array<{ id: string; serialNumber: number }>
): Promise<void> {
  if (!Array.isArray(updates) || updates.length === 0) return;

  const current = await getCustomOrders(true);
  const updatedMap: Record<string, number> = { ...current };

  updates.forEach(({ id, serialNumber }) => {
    if (!id) return;
    const cleanId = id.replace(/^prod-/, "");
    const sn = Number(serialNumber) || 0;
    if (sn > 0) {
      updatedMap[id] = sn;
      updatedMap[cleanId] = sn;
      updatedMap[`prod-${cleanId}`] = sn;
    }
  });

  cachedOrders = updatedMap;
  lastLoaded = Date.now();

  try {
    await fs.writeFile(ORDERS_FILE, JSON.stringify(updatedMap, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write custom-orders.json:", err);
  }
}

export async function applyCustomOrders<T extends Record<string, any>>(items: T[]): Promise<T[]> {
  if (!Array.isArray(items) || items.length === 0) return [];
  const orders = await getCustomOrders();

  return items.map((item) => {
    const rawId = String(item._id || item.id || "");
    const cleanId = rawId.replace(/^prod-/, "");

    const customSn = orders[rawId] || orders[cleanId] || orders[`prod-${cleanId}`];
    if (customSn !== undefined && customSn > 0) {
      return {
        ...item,
        serialNumber: customSn,
        displayOrder: customSn,
      };
    }
    return item;
  });
}
