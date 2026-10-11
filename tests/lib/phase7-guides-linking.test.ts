/**
 * Phase 7 — more guides and internal linking.
 *
 * Verifies:
 * 1. The registry grew to fourteen guides, including the eight Phase 7 slugs,
 *    with unique ids and slugs.
 * 2. Every relatedCalculators slug resolves to a registered calculator.
 * 3. Every relatedGuides id resolves to a registered guide (never itself).
 * 4. Guide category/specialty fields, where present, use real registry values.
 * 5. Every guide reference is genuinely drawn from its linked calculators.
 * 6. New guides are substantive (introduction + three or more sections).
 * 7. Publication metadata is valid, stable, and not in the future.
 * 8. The two documented guides link exactly three calculators; all others link
 *    at least four.
 * 9. Calculator → guide reverse lookup resolves and round-trips.
 * 10. Category → guide lookup matches only the guide's own category.
 * 11. Specialty → guide lookup matches only the guide's own specialty.
 * 12. The shared RelatedGuides component renders honestly and hides when empty.
 * 13. Detail pages and the three hub pages are wired to the guide library.
 * 14. The sitemap now carries 199 URLs including /guides and fourteen guides.
 * 15. Invariants: footer link, registry at 143, honest JSON-LD.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
} from "../../lib/calculators/registry";
import { clinicalContentRegistry } from "../../lib/clinical-content/registry";
import { buildSitemapXml } from "../../lib/seo/sitemap-xml";
import { guideRegistry } from "../../lib/guides/registry";
import {
  getGuides,
  getGuidesForCalculator,
  getGuidesForCategory,
  getGuidesForSpecialty,
  getRelatedGuide,
  buildGuideJsonLd,
} from "../../lib/guides";
import { RelatedGuides } from "../../components/guides/related-guides";
import GuideDetailPage from "../../app/guides/[slug]/page";

const root = join(__dirname, "../..");

const PHASE7_SLUGS = [
  "pneumonia-severity-scores",
  "liver-disease-scoring",
  "venous-thromboembolism-assessment",
  "lipids-and-cardiometabolic-markers",
  "pediatric-assessment-scores",
  "obstetric-calculators-and-assessment",
  "clinical-screening-questionnaires",
  "oxygenation-and-respiratory-assessment",
];

const DOCUMENTED_THREE_CALCULATOR_GUIDES = new Set([
  "pneumonia-severity-scores",
  "venous-thromboembolism-assessment",
]);

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

function renderText(el: React.ReactElement): string {
  return renderToStaticMarkup(el)
    .replace(/<!--.*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&#178;|&#xb2;/g, "\u00b2")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCitation(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function allowedReferencesFor(
  guide: (typeof guideRegistry)[number],
): Set<string> {
  const allowed = new Set<string>();
  for (const slug of guide.relatedCalculators) {
    const calculator = calculatorRegistry.find((item) => item.slug === slug);
    for (const reference of calculator?.references ?? []) {
      allowed.add(normalizeCitation(reference));
    }
    const content = clinicalContentRegistry[slug];
    for (const reference of content?.references ?? []) {
      allowed.add(normalizeCitation(reference.citation));
    }
    if (content?.evidence?.reference) {
      allowed.add(normalizeCitation(content.evidence.reference));
    }
    for (const reference of content?.evidence?.references ?? []) {
      allowed.add(normalizeCitation(reference));
    }
  }
  return allowed;
}

async function renderDetailPage(slug: string): Promise<string> {
  const element = await GuideDetailPage({
    params: Promise.resolve({ slug }),
  });
  return renderText(element);
}

describe("Phase 7: registry growth", () => {
  it("registers fourteen guides", () => {
    expect(guideRegistry).toHaveLength(14);
    expect(getGuides()).toHaveLength(14);
  });

  it("includes all eight Phase 7 slugs", () => {
    for (const slug of PHASE7_SLUGS) {
      expect(
        guideRegistry.some((guide) => guide.slug === slug),
        `${slug} must be registered`,
      ).toBe(true);
    }
  });

  it("keeps ids and slugs unique and matched", () => {
    expect(new Set(guideRegistry.map((g) => g.id)).size).toBe(14);
    expect(new Set(guideRegistry.map((g) => g.slug)).size).toBe(14);
    for (const guide of guideRegistry) {
      expect(guide.slug).toBe(guide.id);
    }
  });

  it("keeps the calculator registry unchanged at 143", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });
});

describe("Phase 7: link resolution", () => {
  it("every relatedCalculators slug resolves to a registered calculator", () => {
    for (const guide of guideRegistry) {
      for (const slug of guide.relatedCalculators) {
        expect(
          calculatorRegistry.some((c) => c.slug === slug),
          `${guide.id} -> calculator ${slug}`,
        ).toBe(true);
      }
    }
  });

  it("every relatedGuides id resolves to a registered guide and never itself", () => {
    for (const guide of guideRegistry) {
      for (const relatedId of guide.relatedGuides ?? []) {
        expect(
          relatedId,
          `${guide.id} must not relate to itself`,
        ).not.toBe(guide.id);
        const resolved = getRelatedGuide(guide, relatedId);
        expect(
          resolved,
          `${guide.id} -> guide ${relatedId}`,
        ).toBeDefined();
        expect(resolved!.id).toBe(relatedId);
      }
    }
  });

  it("category and specialty fields use real registry taxonomy values", () => {
    const categories = new Set(getCategories());
    const specialties = new Set(getSpecialties());
    for (const guide of guideRegistry) {
      if (guide.category !== undefined) {
        expect(
          categories.has(guide.category),
          `${guide.id} category ${guide.category}`,
        ).toBe(true);
      }
      if (guide.specialty !== undefined) {
        expect(
          specialties.has(guide.specialty),
          `${guide.id} specialty ${guide.specialty}`,
        ).toBe(true);
      }
    }
  });

  it("the two documented guides link exactly three calculators", () => {
    for (const id of DOCUMENTED_THREE_CALCULATOR_GUIDES) {
      const guide = guideRegistry.find((g) => g.id === id)!;
      expect(guide, `${id} must exist`).toBeDefined();
      expect(guide.relatedCalculators).toHaveLength(3);
    }
  });

  it("every other guide links at least four calculators", () => {
    for (const guide of guideRegistry) {
      if (DOCUMENTED_THREE_CALCULATOR_GUIDES.has(guide.id)) continue;
      expect(
        guide.relatedCalculators.length,
        `${guide.id} should link at least four calculators`,
      ).toBeGreaterThanOrEqual(4);
    }
  });

  it("pneumonia and VTE link only genuinely relevant calculators", () => {
    const pneumonia = guideRegistry.find(
      (g) => g.id === "pneumonia-severity-scores",
    )!;
    expect([...pneumonia.relatedCalculators].sort()).toEqual([
      "crb-65",
      "curb-65",
      "psi-port",
    ]);

    const vte = guideRegistry.find(
      (g) => g.id === "venous-thromboembolism-assessment",
    )!;
    expect([...vte.relatedCalculators].sort()).toEqual([
      "perc-rule",
      "wells-dvt",
      "wells-pe",
    ]);
  });
});

describe("Phase 7: content standards on new guides", () => {
  for (const slug of PHASE7_SLUGS) {
    describe(`/${slug}`, () => {
      const guide = guideRegistry.find((g) => g.slug === slug)!;

      it("has a title, summary, and introduction", () => {
        expect(guide.title.trim().length).toBeGreaterThan(0);
        expect(guide.summary.trim().length).toBeGreaterThan(0);
        expect(guide.introduction.length).toBeGreaterThan(0);
        for (const paragraph of guide.introduction) {
          expect(paragraph.trim().length).toBeGreaterThan(0);
        }
      });

      it("has at least three substantive sections", () => {
        expect(guide.sections.length).toBeGreaterThanOrEqual(3);
        for (const section of guide.sections) {
          expect(section.heading.trim().length).toBeGreaterThan(0);
          expect(section.paragraphs.length).toBeGreaterThan(0);
          for (const paragraph of section.paragraphs) {
            expect(paragraph.trim().length).toBeGreaterThan(0);
          }
        }
      });

      it("has an honest disclaimer", () => {
        expect(guide.disclaimer).toContain(
          "not provide medical advice, diagnosis, or treatment",
        );
      });

      it("only cites sources that genuinely exist in the related calculators", () => {
        const allowed = allowedReferencesFor(guide);
        for (const reference of guide.references) {
          expect(
            allowed.has(normalizeCitation(reference.citation)),
            `${guide.id} reference must exist on a linked calculator: ${reference.citation}`,
          ).toBe(true);
        }
      });

      it("keeps references unique within the guide", () => {
        const citations = guide.references.map((r) =>
          normalizeCitation(r.citation),
        );
        expect(new Set(citations).size).toBe(citations.length);
      });

      it("publishes stable, valid, non-future metadata", () => {
        for (const date of [
          guide.publication.publishedAt,
          guide.publication.updatedAt,
        ]) {
          expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(date <= "2026-10-11").toBe(true);
        }
        expect(guide.publication.publishedAt).toBe("2026-10-11");
        expect(guide.publication.updatedAt).toBe("2026-10-11");
      });
    });
  }

  it("relatedCalculator sets remain unique across all fourteen guides", () => {
    const signatures = guideRegistry.map((g) =>
      [...g.relatedCalculators].sort().join(","),
    );
    expect(new Set(signatures).size).toBe(guideRegistry.length);
  });
});

describe("Phase 7: calculator to guide reverse lookup", () => {
  it("round-trips every guide → calculator relationship", () => {
    for (const guide of guideRegistry) {
      for (const slug of guide.relatedCalculators) {
        const guides = getGuidesForCalculator(slug);
        expect(
          guides.some((g) => g.id === guide.id),
          `${slug} should surface ${guide.id}`,
        ).toBe(true);
      }
    }
  });

  it("links representative calculators to their guides", () => {
    expect(getGuidesForCalculator("curb-65").map((g) => g.id)).toContain(
      "pneumonia-severity-scores",
    );
    expect(getGuidesForCalculator("meld-na-score").map((g) => g.id)).toContain(
      "liver-disease-scoring",
    );
    expect(getGuidesForCalculator("wells-pe").map((g) => g.id)).toContain(
      "venous-thromboembolism-assessment",
    );
    expect(getGuidesForCalculator("ldl-cholesterol").map((g) => g.id)).toContain(
      "lipids-and-cardiometabolic-markers",
    );
    expect(getGuidesForCalculator("apgar-score").map((g) => g.id)).toContain(
      "pediatric-assessment-scores",
    );
    expect(getGuidesForCalculator("phq-9").map((g) => g.id)).toContain(
      "clinical-screening-questionnaires",
    );
    expect(getGuidesForCalculator("rox-index").map((g) => g.id)).toContain(
      "oxygenation-and-respiratory-assessment",
    );
  });

  it("returns no guides for a calculator no guide mentions", () => {
    const mentioned = new Set(
      guideRegistry.flatMap((g) => g.relatedCalculators),
    );
    const unmentioned = calculatorRegistry.find(
      (c) => !mentioned.has(c.slug),
    );
    if (unmentioned) {
      expect(getGuidesForCalculator(unmentioned.slug)).toEqual([]);
    }
  });
});

describe("Phase 7: category and specialty lookup", () => {
  it("returns only guides whose own category matches", () => {
    for (const category of getCategories()) {
      for (const guide of getGuidesForCategory(category)) {
        expect(guide.category).toBe(category);
      }
    }
    for (const guide of guideRegistry) {
      if (!guide.category) continue;
      expect(
        getGuidesForCategory(guide.category).some((g) => g.id === guide.id),
      ).toBe(true);
    }
  });

  it("returns only guides whose own specialty matches", () => {
    for (const specialty of getSpecialties()) {
      for (const guide of getGuidesForSpecialty(specialty)) {
        expect(guide.specialty).toBe(specialty);
      }
    }
    for (const guide of guideRegistry) {
      if (!guide.specialty) continue;
      expect(
        getGuidesForSpecialty(guide.specialty).some((g) => g.id === guide.id),
      ).toBe(true);
    }
  });

  it("places the Emergency guides on the Emergency category", () => {
    const ids = getGuidesForCategory("Emergency").map((g) => g.id);
    expect(ids).toContain("sepsis-and-deterioration-scores");
    expect(ids).toContain("pneumonia-severity-scores");
    expect(ids).toContain("venous-thromboembolism-assessment");
  });

  it("places the paediatric guide on the Pediatrics specialty", () => {
    const ids = getGuidesForSpecialty("Pediatrics").map((g) => g.id);
    expect(ids).toEqual(["pediatric-assessment-scores"]);
  });
});

describe("Phase 7: RelatedGuides component", () => {
  it("renders a heading with each guide title and summary as links", () => {
    const text = renderText(
      React.createElement(RelatedGuides, {
        guides: getGuidesForCalculator("curb-65"),
      }),
    );
    expect(text).toContain("Related Guides");
    const pneumonia = guideRegistry.find(
      (g) => g.id === "pneumonia-severity-scores",
    )!;
    expect(text).toContain(pneumonia.title);
    expect(text).toContain(pneumonia.summary);
  });

  it("renders nothing when there are no related guides", () => {
    const html = renderToStaticMarkup(
      React.createElement(RelatedGuides, { guides: [] }),
    );
    expect(html).toBe("");
  });
});

describe("Phase 7: page wiring", () => {
  it("the calculator page renders RelatedGuides via getGuidesForCalculator", () => {
    const source = readFile("app/calculators/[slug]/page.tsx");
    expect(source).toContain("@/components/guides/related-guides");
    expect(source).toContain("getGuidesForCalculator");
    expect(source).toContain("<RelatedGuides");
  });

  it("the category page renders RelatedGuides via getGuidesForCategory", () => {
    const source = readFile("app/categories/[category]/page.tsx");
    expect(source).toContain("@/components/guides/related-guides");
    expect(source).toContain("getGuidesForCategory");
    expect(source).toContain("<RelatedGuides");
    expect(source).toContain("Related Specialties");
  });

  it("the specialty page renders RelatedGuides via getGuidesForSpecialty", () => {
    const source = readFile("app/specialties/[slug]/page.tsx");
    expect(source).toContain("@/components/guides/related-guides");
    expect(source).toContain("getGuidesForSpecialty");
    expect(source).toContain("<RelatedGuides");
    expect(source).toContain("Related Categories");
  });
});

describe("Phase 7: rendered detail pages", () => {
  for (const slug of ["pneumonia-severity-scores", "liver-disease-scoring"]) {
    describe(`/guides/${slug}`, () => {
      let text: string;
      beforeAll(async () => {
        text = await renderDetailPage(slug);
      });

      it("renders the guide content, calculator links, related guides, and disclaimer", () => {
        const guide = guideRegistry.find((g) => g.slug === slug)!;
        expect(text).toContain(guide.title);
        expect(text).toContain("Calculators in this guide");
        for (const calcSlug of guide.relatedCalculators) {
          const calculator = calculatorRegistry.find(
            (c) => c.slug === calcSlug,
          )!;
          expect(text).toContain(calculator.name);
        }
        for (const section of guide.sections) {
          expect(text).toContain(section.heading);
        }
        expect(text).toContain("References");
        expect(text).toContain("Guide disclaimer");
        if ((guide.relatedGuides ?? []).length > 0) {
          expect(text).toContain("Related guides");
        }
      });
    });
  }
});

describe("Phase 7: sitemap and invariants", () => {
  const xml = buildSitemapXml();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("grows the sitemap to 199 URLs", () => {
    expect(urls).toHaveLength(199);
  });

  it("includes /guides and all fourteen guide detail pages", () => {
    expect(urls).toContain("https://medcalculatorhub.com/guides");
    for (const guide of guideRegistry) {
      expect(urls).toContain(
        `https://medcalculatorhub.com/guides/${guide.slug}`,
      );
    }
    const guideUrls = urls.filter(
      (url) =>
        url === "https://medcalculatorhub.com/guides" ||
        /^https:\/\/medcalculatorhub\.com\/guides\/[^/]+$/.test(url),
    );
    expect(guideUrls).toHaveLength(15);
  });

  it("stays deterministic with stable guide lastmods", () => {
    expect(buildSitemapXml()).toBe(xml);
    expect(xml).toContain("<lastmod>2026-10-11</lastmod>");
  });

  it("the footer links to /guides", () => {
    const footer = readFile("app/layout.tsx");
    expect(footer).toContain('href="/guides"');
  });

  it("guide JSON-LD stays honest (no author/reviewer/credential keys)", () => {
    for (const guide of guideRegistry) {
      const serialized = JSON.stringify(buildGuideJsonLd(guide));
      expect(serialized).not.toContain("reviewedBy");
      expect(serialized).not.toContain("dateReviewed");
      expect(serialized).not.toContain('"author"');
      expect(serialized).not.toContain('"reviewer"');
      expect(serialized).not.toContain("credentials");
    }
  });
});
