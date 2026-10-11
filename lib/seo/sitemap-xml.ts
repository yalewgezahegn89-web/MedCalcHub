import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";
import { guideRegistry } from "@/lib/guides/registry";
import { SITE_URL } from "@/lib/site-url";

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Stable per-resource modification dates (no request-time values).
 *
 * - Calculator pages use the calculator's own `updatedAt`.
 * - Category and specialty pages use the latest `updatedAt` among their
 *   calculators.
 * - Registry-driven index pages use the latest `updatedAt` across all
 *   registered calculators.
 * - Editorial pages (terms/privacy/cookie) publish "Effective: September 6,
 *   2026 — Last updated: September 6, 2026" in their page copy, so they use
 *   `2026-09-06`. About and contact carry no published date; their value is
 *   the date of the last substantive content change to each file.
 * - Content sources and disclaimer were created on October 11, 2026 (their
 *   page copy carries "Last updated: October 11, 2026"), so they use
 *   `2026-10-11` — the actual content-creation event, never a request-time
 *   value.
 * - The guides index and all six guide detail pages were created with the
 *   guide library on October 11, 2026; each uses its own stable
 *   publication.updatedAt value from the guide that owns it.
 */
const LAST_REVIEWED_DATE = "2026-09-07";

const EDITORIAL_PAGE_DATES: Record<string, string> = {
  "/about": "2026-09-07",
  "/contact": "2026-09-07",
  "/terms": "2026-09-06",
  "/privacy": "2026-09-06",
  "/cookie": "2026-09-06",
  "/content-sources": "2026-10-11",
  "/disclaimer": "2026-10-11",
};

function latestDate(...dates: Array<string | undefined>): string | undefined {
  const present = dates.filter(
    (date): date is string => typeof date === "string" && date.trim() !== "",
  );
  if (present.length === 0) {
    return undefined;
  }
  return present.reduce((latest, date) => (date > latest ? date : latest));
}

function siteLastModified(): string {
  return (
    latestDate(...calculatorRegistry.map((calculator) => calculator.updatedAt)) ??
    LAST_REVIEWED_DATE
  );
}

function categoryLastModified(category: string): string {
  return (
    latestDate(
      ...getCalculatorsByCategory(category).map(
        (calculator) => calculator.updatedAt,
      ),
    ) ?? siteLastModified()
  );
}

function specialtyLastModified(specialty: string): string {
  return (
    latestDate(
      ...getCalculatorsBySpecialty(specialty).map(
        (calculator) => calculator.updatedAt,
      ),
    ) ?? siteLastModified()
  );
}

export function buildSitemapXml(): string {
  const registryLastModified = siteLastModified();

  const publicPages = [
    {
      url: SITE_URL,
      lastmod: registryLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/calculators`,
      lastmod: registryLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastmod: registryLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/comparison`,
      lastmod: registryLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/specialties`,
      lastmod: registryLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...Object.entries(EDITORIAL_PAGE_DATES).map(([path, lastmod]) => ({
      url: `${SITE_URL}${path}`,
      lastmod,
      changeFrequency: "yearly" as const,
      priority: path === "/about" ? 0.5 : path === "/contact" ? 0.3 : 0.4,
    })),
  ];

  const calculatorPages = calculatorRegistry.map((calculator) => ({
    url: `${SITE_URL}/calculators/${calculator.slug}`,
    lastmod: calculator.updatedAt ?? registryLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = getCategories().map((category) => ({
    url: `${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
    lastmod: categoryLastModified(category),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const specialtyPages = getSpecialties().map((specialty) => ({
    url: `${SITE_URL}/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`,
    lastmod: specialtyLastModified(specialty),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guideRegistryLastModified =
    latestDate(...guideRegistry.map((guide) => guide.publication.updatedAt)) ??
    "2026-10-11";

  const guidePages = [
    {
      url: `${SITE_URL}/guides`,
      lastmod: guideRegistryLastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    ...guideRegistry.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastmod: guide.publication.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  const allPages = [
    ...publicPages,
    ...calculatorPages,
    ...categoryPages,
    ...specialtyPages,
    ...guidePages,
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of allPages) {
    xml += "<url>\n";
    xml += `<loc>${escapeXml(page.url)}</loc>\n`;
    xml += `<lastmod>${escapeXml(page.lastmod)}</lastmod>\n`;
    xml += `<changefreq>${page.changeFrequency}</changefreq>\n`;
    xml += `<priority>${page.priority}</priority>\n`;
    xml += "</url>\n";
  }

  xml += "</urlset>\n";

  return xml;
}