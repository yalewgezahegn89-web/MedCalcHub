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
