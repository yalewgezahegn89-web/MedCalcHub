import type { MetadataRoute } from "next";

import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const publicPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/calculators`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/comparison`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/specialties`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap =
    calculatorRegistry.map((calculator) => ({
      url: `${SITE_URL}/calculators/${calculator.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const categoryPages: MetadataRoute.Sitemap =
    getCategories().map((category) => ({
      url: `${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const specialtyPages: MetadataRoute.Sitemap =
    getSpecialties().map((specialty) => ({
      url: `${SITE_URL}/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...publicPages, ...calculatorPages, ...categoryPages, ...specialtyPages];
}