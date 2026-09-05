/**
 * Batch 4 — SEO / Taxonomy Regression Tests
 *
 * Covers:
 * 1. Taxonomy content completeness
 * 2. Taxonomy cross-linking helpers
 * 3. Category page source structure
 * 4. Specialty page source structure
 * 5. /renal consolidation
 * 6. Sitemap correctness
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { existsSync } from "fs";

import {
  getCategories,
  getSpecialties,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
} from "../../lib/calculators/registry";
import {
  categoryDescriptions,
  specialtyDescriptions,
  getSpecialtiesForCategory,
  getCategoriesForSpecialty,
  taxonomyToSlug,
} from "../../lib/seo/taxonomy-content";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

/* ------------------------------------------------------------------ */
/*  1. Taxonomy content completeness                                    */
/* ------------------------------------------------------------------ */

describe("Batch 4 — taxonomy content completeness", () => {
  it("every category has a description", () => {
    const categories = getCategories();
    for (const cat of categories) {
      expect(
        categoryDescriptions[cat],
        `Missing description for category "${cat}"`,
      ).toBeDefined();
      expect(
        categoryDescriptions[cat].length,
        `Empty description for category "${cat}"`,
      ).toBeGreaterThan(10);
    }
  });

  it("every specialty has a description", () => {
    const specialties = getSpecialties();
    for (const spec of specialties) {
      expect(
        specialtyDescriptions[spec],
        `Missing description for specialty "${spec}"`,
      ).toBeDefined();
      expect(
        specialtyDescriptions[spec].length,
        `Empty description for specialty "${spec}"`,
      ).toBeGreaterThan(10);
    }
  });

  it("category descriptions map has no extra keys beyond actual categories", () => {
    const categories = getCategories();
    const mapKeys = Object.keys(categoryDescriptions);
    for (const key of mapKeys) {
      expect(categories).toContain(key);
    }
  });

  it("specialty descriptions map has no extra keys beyond actual specialties", () => {
    const specialties = getSpecialties();
    const mapKeys = Object.keys(specialtyDescriptions);
    for (const key of mapKeys) {
      expect(specialties).toContain(key);
    }
  });
});

/* ------------------------------------------------------------------ */
/*  2. Taxonomy cross-linking helpers                                   */
/* ------------------------------------------------------------------ */

describe("Batch 4 — taxonomy cross-linking helpers", () => {
  it("getSpecialtiesForCategory returns valid specialties from registry", () => {
    const categories = getCategories();
    for (const cat of categories) {
      const specialties = getSpecialtiesForCategory(cat);
      for (const spec of specialties) {
        const calcs = getCalculatorsBySpecialty(spec);
        expect(
          calcs.some((c) => c.category === cat),
          `Specialty "${spec}" returned for category "${cat}" but has no calculators in that category`,
        ).toBe(true);
      }
    }
  });

  it("getCategoriesForSpecialty returns valid categories from registry", () => {
    const specialties = getSpecialties();
    for (const spec of specialties) {
      const categories = getCategoriesForSpecialty(spec);
      for (const cat of categories) {
        const calcs = getCalculatorsByCategory(cat);
        expect(
          calcs.some((c) => c.specialty === spec),
          `Category "${cat}" returned for specialty "${spec}" but has no calculators in that specialty`,
        ).toBe(true);
      }
    }
  });

  it("getSpecialtiesForCategory returns unique values", () => {
    const specialties = getSpecialtiesForCategory("Nephrology");
    expect(specialties.length).toBe(new Set(specialties).size);
  });

  it("getCategoriesForSpecialty returns unique values", () => {
    const categories = getCategoriesForSpecialty("Nephrology");
    expect(categories.length).toBe(new Set(categories).size);
  });

  it("taxonomyToSlug produces correct slugs", () => {
    expect(taxonomyToSlug("Nephrology")).toBe("nephrology");
    expect(taxonomyToSlug("Emergency Medicine")).toBe("emergency-medicine");
    expect(taxonomyToSlug("Obstetrics & Gynecology")).toBe(
      "obstetrics-&-gynecology",
    );
  });
});

/* ------------------------------------------------------------------ */
/*  3. Category page source structure                                   */
/* ------------------------------------------------------------------ */

describe("Batch 4 — category detail page structure", () => {
  const source = readFile(
    "app/categories/[category]/page.tsx",
  );

  it("imports categoryDescriptions from taxonomy-content", () => {
    expect(source).toContain("categoryDescriptions");
    expect(source).toContain("taxonomy-content");
  });

  it("imports getSpecialtiesForCategory for cross-linking", () => {
    expect(source).toContain("getSpecialtiesForCategory");
  });

  it("has generateMetadata export", () => {
    expect(source).toContain("export async function generateMetadata");
  });

  it("renders JSON-LD structured data via shared CollectionPage builder", () => {
    expect(source).toContain('type="application/ld+json"');
    expect(source).toContain("buildCollectionJsonLd");
  });

  it("JSON-LD breadcrumb has Home → Categories → Category", () => {
    expect(source).toContain('name: "Categories"');
    expect(source).toContain("item: categoryUrl");
  });

  it("renders the description paragraph", () => {
    expect(source).toContain("description &&");
    expect(source).toContain("leading-relaxed");
  });

  it("renders Related Specialties section", () => {
    expect(source).toContain("Related Specialties");
    expect(source).toContain("relatedSpecialties");
  });

  it("specialty badges on calculator cards display specialty name", () => {
    expect(source).toContain("calculator.specialty");
  });

  it("uses SITE_URL from lib/site-url", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("@/lib/site-url");
  });
});

/* ------------------------------------------------------------------ */
/*  4. Specialty page source structure                                  */
/* ------------------------------------------------------------------ */

describe("Batch 4 — specialty detail page structure", () => {
  const source = readFile(
    "app/specialties/[slug]/page.tsx",
  );

  it("imports specialtyDescriptions from taxonomy-content", () => {
    expect(source).toContain("specialtyDescriptions");
    expect(source).toContain("taxonomy-content");
  });

  it("imports getCategoriesForSpecialty for cross-linking", () => {
    expect(source).toContain("getCategoriesForSpecialty");
  });

  it("has generateMetadata export", () => {
    expect(source).toContain("export async function generateMetadata");
  });

  it("renders JSON-LD structured data via shared CollectionPage builder", () => {
    expect(source).toContain('type="application/ld+json"');
    expect(source).toContain("buildCollectionJsonLd");
  });

  it("JSON-LD breadcrumb has Home → Specialties → Specialty", () => {
    expect(source).toContain('name: "Specialties"');
    expect(source).toContain("item: specialtyUrl");
  });

  it("renders the description paragraph", () => {
    expect(source).toContain("description &&");
    expect(source).toContain("leading-relaxed");
  });

  it("renders Related Categories section", () => {
    expect(source).toContain("Related Categories");
    expect(source).toContain("relatedCategories");
  });

  it("category badges on calculator cards display category name", () => {
    expect(source).toContain("calculator.category");
  });

  it("uses SITE_URL from lib/site-url", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("@/lib/site-url");
  });
});

/* ------------------------------------------------------------------ */
/*  5. /renal consolidation                                             */
/* ------------------------------------------------------------------ */

describe("Batch 4 — /renal consolidation", () => {
  it("/renal page file is removed", () => {
    expect(
      existsSync(join(root, "app/renal/page.tsx")),
    ).toBe(false);
  });

  it("/renal directory is removed", () => {
    expect(existsSync(join(root, "app/renal"))).toBe(
      false,
    );
  });

  it("next.config.ts has redirect from /renal to /categories/renal", () => {
    const config = readFile("next.config.ts");
    expect(config).toContain('source: "/renal"');
    expect(config).toContain(
      'destination: "/categories/renal"',
    );
    expect(config).toContain("permanent: true");
  });

  it("sitemap does not include /renal", () => {
    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).not.toContain(
      "SITE_URL]/renal\"",
    );
  });
});

/* ------------------------------------------------------------------ */
/*  6. Sitemap correctness                                              */
/* ------------------------------------------------------------------ */

describe("Batch 4 — sitemap correctness", () => {
  it("sitemap still includes /categories and /specialties index pages", () => {
    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).toContain("/categories");
    expect(sitemap).toContain("/specialties");
  });

  it("sitemap generates category entries dynamically from getCategories()", () => {
    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).toContain("getCategories()");
    expect(sitemap).toContain("categoryPages");
    expect(sitemap).toContain("category.toLowerCase()");
  });

  it("sitemap generates specialty entries dynamically from getSpecialties()", () => {
    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).toContain("getSpecialties()");
    expect(sitemap).toContain("specialtyPages");
    expect(sitemap).toContain("specialty.toLowerCase()");
  });

  it("sitemap does not include /renal", () => {
    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).not.toContain("SITE_URL]/renal\"");
  });
});
