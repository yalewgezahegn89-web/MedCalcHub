import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/favorites",
          "/history",
          "/recent",
          "/workspace",
        ],
      },
    ],
    sitemap: "https://medcalchub.com/sitemap.xml",
  };
}