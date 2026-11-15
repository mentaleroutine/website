import type { MetadataRoute } from "next";
import { TEAMS_LIVE } from "@/lib/teams-text";

// Canonical host is non-www (mentalroutine.com). www redirects here.
const BASE = "https://www.mentalroutine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/assessment`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/samples`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/methodology`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pro-program`, changeFrequency: "monthly", priority: 0.7 },
    // /teams staat in de sitemap zolang de schakelaar TEAMS_LIVE (lib/teams-text.ts) aan staat (sinds 15-11-2026).
    ...(TEAMS_LIVE ? [{ url: `${BASE}/teams`, changeFrequency: "monthly" as const, priority: 0.8 }] : []),
  ];
}
