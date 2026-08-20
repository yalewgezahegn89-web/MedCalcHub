import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // The CSP intentionally allows 'unsafe-inline' for scripts and styles because
  // the current Next.js application requires inline scripts and styles to render
  // correctly in production. If third-party scripts are introduced later, the
  // policy should be tightened by replacing 'unsafe-inline' with per-request
  // nonces or hashes.
  //
  // AdSense domains are included even when ads are disabled by default.
  // They only take effect when a real publisher ID and NEXT_PUBLIC_ADS_ENABLED=true
  // are set in the production environment. Keeping them in the static CSP avoids
  // runtime header mutation complexity.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.de",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net",
      "font-src 'self' data:",
      "connect-src 'self' https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://www.google.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://adservice.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
  redirects: async () => [
    {
      source: "/renal",
      destination: "/categories/renal",
      permanent: true,
    },
  ],
};

export default nextConfig;