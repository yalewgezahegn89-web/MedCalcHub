/**
 * P3-C1 — Collection-page SEO regression tests.
 *
 * Covers:
 * - buildCollectionJsonLd structure (CollectionPage, ItemList, BreadcrumbList)
 * - wiring on /calculators, /categories/[category], /specialties/[slug]
 * - comparison-page metadata via layout (canonical URL)
 * - explicit guard: generateStaticParams remains deferred (P3-C1 scope)
 */

import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { buildCollectionJsonLd } from "../../lib/seo/jsonld";
import {
  calculatorRegistry,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
} from "../../lib/calculators/registry";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

describe("buildCollectionJsonLd", () => {
  const calculators = calculatorRegistry.slice(0, 3);
  const jsonLd = buildCollectionJsonLd({
    name: "Test Collection",
    description: "A collection used in tests.",
    path: "/calculators",
    breadcrumb: [
      { name: "Calculators", item: "https://medcalchub.com/calculators" },
    ],
    calculators,
  }) as {
    "@context": string;
    "@graph": Array<
      | { "@type": "CollectionPage"; name: string; description: string; url: string; isPartOf: unknown;
          mainEntity: {
            "@type": string;
            itemListElement: Array<{
              "@type": string;
              position: number;
              name: string;
              url: string;
            }>;
          };
        }
      | { "@type": "BreadcrumbList"; itemListElement: Array<{ "@type": string; position: number; name: string; item: string }> }
    >;
  };

  it("emits schema.org graph with a CollectionPage node", () => {
    expect(jsonLd["@context"]).toBe("https://schema.org");
    const page = jsonLd["@graph"].find(
      (n) => n["@type"] === "CollectionPage",
    )!;
    expect(page).toBeDefined();
    expect(page.name).toBe("Test Collection");
    expect(page.url).toBe("https://medcalchub.com/calculators");
    expect(page.isPartOf).toEqual({
      "@type": "WebSite",
      name: "MedCalcHub",
      url: "https://medcalchub.com",
    });
  });

  it("CollectionPage mainEntity is an ItemList covering every member calculator", () => {
    const page = jsonLd["@graph"].find(
      (n) => n["@type"] === "CollectionPage",
    )!;
    const list = page.mainEntity;
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement).toHaveLength(calculators.length);

    list.itemListElement.forEach(
      (
        item: { "@type": string; position: number; name: string; url: string },
        i: number,
      ) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBe(i + 1);
        expect(item.name).toBe(calculators[i].name);
        expect(item.url).toBe(
          `https://medcalchub.com/calculators/${calculators[i].slug}`,
        );
      },
    );
  });

  it("BreadcrumbList always starts at Home and continues the caller trail", () => {
    const crumbs = jsonLd["@graph"].find(
      (n) => n["@type"] === "BreadcrumbList",
    )!;
    expect(crumbs.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://medcalchub.com",
    });
    expect(crumbs.itemListElement[1]).toEqual({
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: "https://medcalchub.com/calculators",
    });
    expect(crumbs.itemListElement).toHaveLength(2);
  });

  it("real taxonomy collections resolve every ItemList url to a registered slug", () => {
    for (const category of ["Nephrology", "Cardiology"]) {
      const members = getCalculatorsByCategory(category);
      expect(members.length).toBeGreaterThan(0);
      const ld = buildCollectionJsonLd({
        name: `${category} Calculators`,
        description: "x",
        path: `/categories/${category.toLowerCase()}`,
        breadcrumb: [],
        calculators: members,
      }) as {
        "@graph": Array<{
          "@type": string;
          mainEntity: {
            itemListElement: Array<{ url: string }>;
          };
        }>;
      };
      const list = ld["@graph"][0].mainEntity;
      for (const item of list.itemListElement) {
        const slug = item.url.replace("https://medcalchub.com/calculators/", "");
        expect(
          calculatorRegistry.some((c) => c.slug === slug),
          `unregistered slug ${slug}`,
        ).toBe(true);
      }
    }

    const cards = getCalculatorsBySpecialty("Cardiology");
    expect(cards.length).toBeGreaterThan(0);
  });
});

describe("P3-C1 page wiring", () => {
  it("/calculators renders CollectionPage JSON-LD", () => {
    const source = readFile("app/calculators/page.tsx");
    expect(source).toContain('type="application/ld+json"');
    expect(source).toContain("buildCollectionJsonLd");
    expect(source).toMatch(/name:\s*"All Medical Calculators"/);
  });

  it("/categories/[category] uses the shared builder with an ItemList", () => {
    const source = readFile("app/categories/[category]/page.tsx");
    expect(source).toContain("buildCollectionJsonLd");
    expect(source).not.toMatch(/"@type":\s*"CollectionPage"/);
    expect(source).toMatch(/name:\s*`\$\{category\} Calculators`/);
  });

  it("/specialties/[slug] uses the shared builder with an ItemList", () => {
    const source = readFile("app/specialties/[slug]/page.tsx");
    expect(source).toContain("buildCollectionJsonLd");
    expect(source).not.toMatch(/"@type":\s*"CollectionPage"/);
    expect(source).toMatch(/name:\s*`\$\{specialty\} Medical Calculators`/);
  });

  it("/comparison exposes SEO metadata with a canonical URL via layout", () => {
    const source = readFile("app/comparison/layout.tsx");
    expect(source).toMatch(/export const metadata:\s*Metadata/);
    expect(source).toMatch(/canonical:\s*`\$\{SITE_URL\}\/comparison`/);
    expect(source).toMatch(/Calculator Comparison \| MedCalcHub/);
  });

  it("generateStaticParams remains intentionally deferred (P3-C1 scope)", () => {
    for (const file of [
      "app/calculators/page.tsx",
      "app/categories/page.tsx",
      "app/specialties/page.tsx",
      "app/categories/[category]/page.tsx",
      "app/specialties/[slug]/page.tsx",
      "app/comparison/layout.tsx",
    ]) {
      expect(
        readFile(file).includes("generateStaticParams"),
        `${file} unexpectedly defines generateStaticParams`,
      ).toBe(false);
    }
  });
});

// ─────────────────────────────────────────────────
// Batch 17 — SEO Completion Remediation Tests
// ─────────────────────────────────────────────────

describe("Batch 17: /search metadata and noindex", () => {
  it("/search/layout.tsx exists and exports metadata", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toMatch(/export const metadata:\s*Metadata/);
  });

  it("/search has canonical set to /search", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toMatch(/canonical:\s*`\$\{SITE_URL\}\/search`/);
  });

  it("/search has robots noindex follow", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toContain("index: false");
    expect(source).toContain("follow: true");
  });

  it("/search has OpenGraph metadata", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toContain("openGraph:");
    expect(source).toContain("Search Medical Calculators | MedCalcHub");
  });

  it("/search has Twitter metadata", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toContain("twitter:");
    expect(source).toContain("card: \"summary_large_image\"");
  });
});

describe("Batch 17: sitemap excludes /search", () => {
  it("/search is absent from sitemap.ts", () => {
    const source = readFile("app/sitemap.ts");
    expect(source).not.toMatch(/\/search/);
  });

  it("sitemap still includes calculators", () => {
    const source = readFile("app/sitemap.ts");
    expect(source).toContain("/calculators");
  });

  it("sitemap still includes categories", () => {
    const source = readFile("app/sitemap.ts");
    expect(source).toContain("/categories");
  });

  it("sitemap still includes specialties", () => {
    const source = readFile("app/sitemap.ts");
    expect(source).toContain("/specialties");
  });

  it("sitemap still includes comparison", () => {
    const source = readFile("app/sitemap.ts");
    expect(source).toContain("/comparison");
  });
});

describe("Batch 17: /categories CollectionPage JSON-LD", () => {
  it("/categories page renders JSON-LD script tag", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain('type="application/ld+json"');
  });

  it("/categories page has CollectionPage in JSON-LD", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain('"@type": "CollectionPage"');
  });

  it("/categories page has ItemList in JSON-LD", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain('"@type": "ItemList"');
  });

  it("/categories page JSON-LD has BreadcrumbList", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain('"@type": "BreadcrumbList"');
  });

  it("/categories page ItemList items use category URLs", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain("/categories/");
  });

  it("/categories page preserves existing metadata", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toMatch(/export const metadata:\s*Metadata/);
    expect(source).toContain("Calculator Categories | MedCalcHub");
  });
});

describe("Batch 17: /specialties CollectionPage JSON-LD", () => {
  it("/specialties page renders JSON-LD script tag", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain('type="application/ld+json"');
  });

  it("/specialties page has CollectionPage in JSON-LD", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain('"@type": "CollectionPage"');
  });

  it("/specialties page has ItemList in JSON-LD", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain('"@type": "ItemList"');
  });

  it("/specialties page JSON-LD has BreadcrumbList", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain('"@type": "BreadcrumbList"');
  });

  it("/specialties page ItemList items use specialty URLs", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain("/specialties/");
  });

  it("/specialties page preserves existing metadata", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toMatch(/export const metadata:\s*Metadata/);
    expect(source).toContain("Medical Specialties | MedCalcHub");
  });
});

describe("Batch 17: homepage SearchAction target", () => {
  it("SearchAction target points to /search", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain("/search?q={search_term_string}");
  });

  it("SearchAction target does NOT point to /calculators", () => {
    const source = readFile("app/page.tsx");
    expect(source).not.toContain("/calculators?q={search_term_string}");
  });

  it("WebSite schema is still present", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain('"@type": "WebSite"');
    expect(source).toContain('"@type": "SearchAction"');
  });
});

describe("Batch 17: homepage calculator count", () => {
  it("homepage metadata description uses 143", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain("143 clinical tools");
  });

  it("homepage does NOT use 140+", () => {
    const source = readFile("app/page.tsx");
    expect(source).not.toContain("140+");
  });

  it("homepage OG description uses 143", () => {
    const source = readFile("app/page.tsx");
    const ogSection = source.slice(source.indexOf("openGraph:"));
    expect(ogSection).toContain("143 clinical tools");
  });

  it("homepage Twitter description uses 143", () => {
    const source = readFile("app/page.tsx");
    const twitterSection = source.slice(source.indexOf("twitter:"));
    expect(twitterSection).toContain("143 clinical tools");
  });
});

describe("Batch 17: P3-C1 regression protection", () => {
  it("calculator collection JSON-LD builder unchanged", () => {
    const source = readFile("lib/seo/jsonld.ts");
    expect(source).toContain("export function buildCollectionJsonLd");
    expect(source).toContain("CalculatorDefinition[]");
  });

  it("comparison metadata still in layout", () => {
    const source = readFile("app/comparison/layout.tsx");
    expect(source).toMatch(/export const metadata:\s*Metadata/);
    expect(source).toMatch(/canonical:\s*`\$\{SITE_URL\}\/comparison`/);
  });

  it("category detail CollectionPage uses shared builder", () => {
    const source = readFile("app/categories/[category]/page.tsx");
    expect(source).toContain("buildCollectionJsonLd");
  });

  it("specialty detail CollectionPage uses shared builder", () => {
    const source = readFile("app/specialties/[slug]/page.tsx");
    expect(source).toContain("buildCollectionJsonLd");
  });

  it("calculator detail JSON-LD builder unchanged", () => {
    const source = readFile("lib/seo/jsonld.ts");
    expect(source).toContain("export function buildCalculatorJsonLd");
    expect(source).toContain("MedicalWebPage");
    expect(source).toContain("SoftwareApplication");
  });

  it("FAQPage conditional emission unchanged", () => {
    const source = readFile("lib/seo/jsonld.ts");
    expect(source).toContain("if (faq.length > 0)");
    expect(source).toContain('"@type": "FAQPage"');
  });
});
