import fs from "fs/promises";
import path from "path";
import connectDB from "@/lib/mongodb";
import DeletedAsset from "@/models/DeletedAsset";

export interface DeletedAssetRecord {
  assetId: string;
  cleanId?: string;
  title?: string;
  slug?: string;
  itemType?: string;
  deletedAt: string;
}

const DELETED_FILE_PATH = path.join(process.cwd(), "src/data/deleted-assets.json");

// In-memory cache
let cachedIds = new Set<string>();
let cachedTitles = new Set<string>();
let cachedSlugs = new Set<string>();
let lastLoadedTime = 0;
const CACHE_TTL_MS = 2000;

function normalizeString(str?: string): string {
  return (str || "").trim().toLowerCase();
}

function cleanAssetId(id: string): string {
  return id.replace(/^prod-/, "");
}

/**
 * Load deleted records from JSON file and MongoDB
 */
async function loadDeletedRecords(): Promise<DeletedAssetRecord[]> {
  const recordsMap = new Map<string, DeletedAssetRecord>();

  // 1. Read from local JSON file
  try {
    const raw = await fs.readFile(DELETED_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.forEach((item: any) => {
        if (item && item.assetId) {
          recordsMap.set(String(item.assetId), {
            assetId: String(item.assetId),
            cleanId: item.cleanId || cleanAssetId(String(item.assetId)),
            title: item.title,
            slug: item.slug,
            itemType: item.itemType,
            deletedAt: item.deletedAt || new Date().toISOString(),
          });
        }
      });
    }
  } catch {
    // If file doesn't exist or error, start empty
  }

  // 2. Read from MongoDB if connected
  try {
    await connectDB();
    const dbRecords = await DeletedAsset.find({}).lean();
    if (Array.isArray(dbRecords)) {
      dbRecords.forEach((item: any) => {
        if (item && item.assetId) {
          recordsMap.set(String(item.assetId), {
            assetId: String(item.assetId),
            cleanId: item.cleanId || cleanAssetId(String(item.assetId)),
            title: item.title,
            slug: item.slug,
            itemType: item.itemType,
            deletedAt: item.deletedAt ? new Date(item.deletedAt).toISOString() : new Date().toISOString(),
          });
        }
      });
    }
  } catch {
    // MongoDB offline or unreachable in local sandbox/dev
  }

  return Array.from(recordsMap.values());
}

/**
 * Get all deleted identifiers (ids, titles, slugs)
 */
export async function getDeletedIdentifiers(forceRefresh = false): Promise<{
  ids: Set<string>;
  titles: Set<string>;
  slugs: Set<string>;
}> {
  const now = Date.now();
  if (!forceRefresh && lastLoadedTime > 0 && now - lastLoadedTime < CACHE_TTL_MS) {
    return { ids: cachedIds, titles: cachedTitles, slugs: cachedSlugs };
  }

  const records = await loadDeletedRecords();

  const newIds = new Set<string>();
  const newTitles = new Set<string>();
  const newSlugs = new Set<string>();

  records.forEach((rec) => {
    const id = String(rec.assetId || "");
    const clean = rec.cleanId || cleanAssetId(id);

    if (id) newIds.add(id);
    if (clean) {
      newIds.add(clean);
      newIds.add(`prod-${clean}`);
    }

    if (rec.title) {
      const normTitle = normalizeString(rec.title);
      if (normTitle) newTitles.add(normTitle);
    }

    if (rec.slug) {
      const normSlug = normalizeString(rec.slug);
      if (normSlug) newSlugs.add(normSlug);
    }
  });

  cachedIds = newIds;
  cachedTitles = newTitles;
  cachedSlugs = newSlugs;
  lastLoadedTime = now;

  return { ids: cachedIds, titles: cachedTitles, slugs: cachedSlugs };
}

/**
 * Permanently mark an asset as deleted
 */
export async function recordDeletedAsset(params: {
  id: string;
  cleanId?: string;
  title?: string;
  slug?: string;
  itemType?: string;
}): Promise<void> {
  const rawId = String(params.id || "").trim();
  if (!rawId) return;

  const clean = params.cleanId || cleanAssetId(rawId);
  const title = params.title ? String(params.title).trim() : undefined;
  const slug = params.slug ? String(params.slug).trim() : undefined;

  const newRecord: DeletedAssetRecord = {
    assetId: rawId,
    cleanId: clean,
    title,
    slug,
    itemType: params.itemType || "unknown",
    deletedAt: new Date().toISOString(),
  };

  // 1. Update in-memory sets immediately
  cachedIds.add(rawId);
  if (clean) {
    cachedIds.add(clean);
    cachedIds.add(`prod-${clean}`);
  }
  if (title) cachedTitles.add(normalizeString(title));
  if (slug) cachedSlugs.add(normalizeString(slug));

  // 2. Persist to local JSON file
  try {
    const records = await loadDeletedRecords();
    const existingIndex = records.findIndex(
      (r) => r.assetId === rawId || (clean && r.cleanId === clean)
    );
    if (existingIndex >= 0) {
      records[existingIndex] = { ...records[existingIndex], ...newRecord };
    } else {
      records.push(newRecord);
    }
    await fs.writeFile(DELETED_FILE_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to deleted-assets.json:", err);
  }

  // 3. Persist to MongoDB
  try {
    await connectDB();
    await DeletedAsset.findOneAndUpdate(
      { $or: [{ assetId: rawId }, { cleanId: clean }] },
      newRecord,
      { upsert: true, new: true }
    );
  } catch (dbErr) {
    // Database may be offline
  }
}

/**
 * Filter an array of items and remove any permanently deleted assets
 */
export async function filterOutDeletedAssets<T extends Record<string, any>>(
  items: T[]
): Promise<T[]> {
  if (!Array.isArray(items) || items.length === 0) return [];

  const { ids, titles, slugs } = await getDeletedIdentifiers();

  return items.filter((item) => {
    if (!item) return false;

    const rawId = String(item._id || item.id || "");
    const clean = cleanAssetId(rawId);

    if (rawId && ids.has(rawId)) return false;
    if (clean && ids.has(clean)) return false;
    if (clean && ids.has(`prod-${clean}`)) return false;

    const title = normalizeString(item.title || item.name);
    if (title && titles.has(title)) return false;

    const slug = normalizeString(item.slug);
    if (slug && slugs.has(slug)) return false;

    return true;
  });
}
