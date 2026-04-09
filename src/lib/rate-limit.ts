// Simple in-memory rate limiter for API routes
// Limits requests per IP address within a sliding window

const requests = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS: Record<string, number> = {
  contact: 3,
  "early-access": 5,
  "pro-program": 3,
  spots: 30,
};

export function rateLimit(ip: string, route: string): boolean {
  const key = `${route}:${ip}`;
  const now = Date.now();
  const max = MAX_REQUESTS[route] ?? 10;

  const timestamps = requests.get(key)?.filter((t) => now - t < WINDOW_MS) ?? [];
  if (timestamps.length >= max) return false;

  timestamps.push(now);
  requests.set(key, timestamps);

  // Cleanup old entries every 100 requests
  if (requests.size > 1000) {
    for (const [k, v] of requests) {
      const fresh = v.filter((t) => now - t < WINDOW_MS);
      if (fresh.length === 0) requests.delete(k);
      else requests.set(k, fresh);
    }
  }

  return true;
}
