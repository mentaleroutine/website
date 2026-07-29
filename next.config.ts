import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://plausible.io/js/script.outbound-links.file-downloads.js",
      },
      {
        source: "/api/event",
        destination: "https://plausible.io/api/event",
      },
      // Serve the standalone QuickScan (public/quiz.html) on the clean /quickscan
      // URL. The URL stays /quickscan (rewrite, not redirect) so it doesn't loop
      // with the /quiz.html → /quickscan redirect below.
      {
        source: "/quickscan",
        destination: "/quiz.html",
      },
    ];
  },
  async redirects() {
    return [
      // Old QuickScan URL → clean URL.
      { source: "/quiz.html", destination: "/quickscan", permanent: true },
      // Mastery is no longer a product; the old explainer page → the assessment.
      { source: "/assessment-mastery.html", destination: "/assessment", permanent: true },
      // The old Foundation subsite is superseded by the /assessment page.
      { source: "/assessment-foundation.html", destination: "/assessment", permanent: true },
    ];
  },
};

export default nextConfig;
