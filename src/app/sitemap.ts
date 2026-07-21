import type { MetadataRoute } from "next";

const BASE = "https://www.mentalroutine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/pro-program`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/assessment-foundation.html`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/assessment-mastery.html`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/quiz.html`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
