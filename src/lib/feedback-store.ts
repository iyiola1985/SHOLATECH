/**
 * Client review storage. Uses Upstash Redis when env vars are set; otherwise in-memory (dev only).
 */

export type FeedbackItem = {
  id: string;
  name: string;
  type: string;
  message: string;
  createdAt: string;
};

const KEY = "sholatech:feedback";
const MAX_ITEMS = 200;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({ url, token });
}

let memoryStore: FeedbackItem[] = [];

export async function getAllFeedback(): Promise<FeedbackItem[]> {
  const redis = await getRedis();
  if (redis) {
    try {
      const raw = await redis.lrange(KEY, 0, MAX_ITEMS - 1);
      const list = (Array.isArray(raw) ? raw : []) as string[];
      return list
        .map((s) => {
          try {
            return JSON.parse(s) as FeedbackItem;
          } catch {
            return null;
          }
        })
        .filter(Boolean) as FeedbackItem[];
    } catch (e) {
      console.error("Feedback store get error:", e);
      return [];
    }
  }
  return [...memoryStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addFeedback(entry: Omit<FeedbackItem, "id" | "createdAt">): Promise<FeedbackItem> {
  const item: FeedbackItem = {
    ...entry,
    id: createId(),
    createdAt: new Date().toISOString(),
  };
  const redis = await getRedis();
  if (redis) {
    try {
      await redis.lpush(KEY, JSON.stringify(item));
      await redis.ltrim(KEY, 0, MAX_ITEMS - 1);
    } catch (e) {
      console.error("Feedback store add error:", e);
    }
  } else {
    memoryStore = [item, ...memoryStore].slice(0, MAX_ITEMS);
  }
  return item;
}

export async function deleteFeedback(id: string): Promise<boolean> {
  const redis = await getRedis();
  if (redis) {
    try {
      const raw = await redis.lrange(KEY, 0, MAX_ITEMS - 1);
      const list = (Array.isArray(raw) ? raw : []) as string[];
      const parsed = list
        .map((s) => {
          try {
            return JSON.parse(s) as FeedbackItem;
          } catch {
            return null;
          }
        })
        .filter(Boolean) as FeedbackItem[];
      const rest = parsed.filter((i) => i.id !== id);
      if (rest.length === parsed.length) return false;
      await redis.del(KEY);
      for (const item of rest) {
        await redis.rpush(KEY, JSON.stringify(item));
      }
      return true;
    } catch (e) {
      console.error("Feedback store delete error:", e);
      return false;
    }
  }
  const idx = memoryStore.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  memoryStore = memoryStore.filter((i) => i.id !== id);
  return true;
}
