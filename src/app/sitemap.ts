import type { MetadataRoute } from "next";

// Canonical host is non-www (mentalroutine.com). www redirects here.
const BASE = "https://www.mentalroutine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/assessment`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/methodology`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/quickscan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pro-program`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
