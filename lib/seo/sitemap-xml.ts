import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(): string {
  const now = new Date().toISOString();

  const publicPages = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/categories`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/comparison`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/specialties`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const calculatorPages = calculatorRegistry.map((calculator) => ({
    url: `${SITE_URL}/calculators/${calculator.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = getCategories().map((category) => ({
    url: `${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const specialtyPages = getSpecialties().map((specialty) => ({
    url: `${SITE_URL}/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const allPages = [
    ...publicPages,
    ...calculatorPages,
    ...categoryPages,
    ...specialtyPages,
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of allPages) {
    xml += "<url>\n";
    xml += `<loc>${escapeXml(page.url)}</loc>\n`;
    xml += `<lastmod>${now}</lastmod>\n`;
    xml += `<changefreq>${page.changeFrequency}</changefreq>\n`;
    xml += `<priority>${page.priority}</priority>\n`;
    xml += "</url>\n";
  }

  xml += "</urlset>\n";

  return xml;
}
