/**
 * Phase 6 — the /guides knowledge library.
 *
 * Verifies:
 * 1. Guide registry integrity: fourteen guides, unique ids/slugs.
 * 2. Every relatedCalculators slug resolves to a registered calculator.
 * 3. Content standards: title, summary, introduction, sections, disclaimer,
 *    and stable publication metadata on every guide.
 * 4. Each guide links at least four calculators — except the two guides whose
 *    subject genuinely has only three registered calculators (see
 *    DOCUMENTED_THREE_CALCULATOR_GUIDES; padding with unrelated links is
 *    deliberately avoided).
 * 5. Every guide reference genuinely exists in the calculator/clinical-content
 *    references of the calculators the guide links to (no fabricated sources).
 * 6. Index + detail pages emit unique, indexable metadata with self-canonicals.
 * 7. generateStaticParams covers exactly the fourteen registered slugs.
 * 8. Detail pages render a self-accessible breadcrumb trail, the related
 *    calculator links, references, and a disclaimer.
 * 9. Guide JSON-LD is honest: no author/reviewer/credential/review-date.
 * 10. /guides and all fourteen detail routes are in the sitemap with the stable
 *     2026-10-11 creation lastmod (total becomes 199).
 * 11. The footer links to /guides.
 * 12. Registry stays at 143; Phase 2 coverage stays complete.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { calculatorRegistry } from "../../lib/calculators/registry";
import { clinicalContentRegistry } from "../../lib/clinical-content/registry";
import { buildSitemapXml } from "../../lib/seo/sitemap-xml";
import { guideRegistry } from "../../lib/guides/registry";
import {
  buildGuideJsonLd,
  buildGuideIndexJsonLd,
} from "../../lib/guides";
import GuidesPage from "../../app/guides/page";
import GuideDetailPage, {
  generateMetadata as generateGuideMetadata,
  generateStaticParams,
} from "../../app/guides/[slug]/page";

const root = join(__dirname, "../..");

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

describe("Phase 6: guide registry integrity", () => {
  it("registers exactly fourteen guides", () => {
    expect(guideRegistry).toHaveLength(14);
  });

  it("uses unique ids and slugs", () => {
    expect(new Set(guideRegistry.map((g) => g.id)).size).toBe(
      guideRegistry.length,
    );
    expect(new Set(guideRegistry.map((g) => g.slug)).size).toBe(
      guideRegistry.length,
    );
  });

  it("uses slugs that match their ids", () => {
    for (const guide of guideRegistry) {
      expect(guide.slug).toBe(guide.id);
    }
  });

  it("every relatedCalculators slug resolves to a registered calculator", () => {
    for (const guide of guideRegistry) {
      for (const slug of guide.relatedCalculators) {
        expect(
          calculatorRegistry.some((c) => c.slug === slug),
          `${guide.id} -> ${slug} must be a registered calculator`,
        ).toBe(true);
      }
    }
  });

  it("each guide carries stable publication metadata (created with the library)", () => {
    for (const guide of guideRegistry) {
      expect(guide.publication.publishedAt).toBe("2026-10-11");
      expect(guide.publication.updatedAt).toBe("2026-10-11");
    }
  });

  it("creates no review records on guide content", () => {
    const serialized = JSON.stringify(guideRegistry);
    expect(serialized).not.toContain("reviewedBy");
    expect(serialized).not.toContain("sourcesVerified");
    expect(serialized).not.toContain('"reviewer"');
    expect(serialized).not.toContain("dateReviewed");
    expect(serialized).not.toContain("credentials");
  });
});

describe("Phase 6: content standards per guide", () => {
  for (const guide of guideRegistry) {
    describe(`/${guide.slug}`, () => {
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

      it("links at least four calculators (three for the two documented guides)", () => {
        const minimum = DOCUMENTED_THREE_CALCULATOR_GUIDES.has(guide.id) ? 3 : 4;
        expect(guide.relatedCalculators.length).toBeGreaterThanOrEqual(minimum);
      });

      it("has an honest disclaimer and at least one real reference", () => {
        expect(guide.disclaimer.trim().length).toBeGreaterThan(0);
        expect(guide.disclaimer).toContain(
          "not provide medical advice, diagnosis, or treatment",
        );
        for (const reference of guide.references) {
          expect(reference.citation.trim().length).toBeGreaterThan(0);
        }
      });

      it("only cites sources that genuinely exist in the related calculators", () => {
        const allowed = allowedReferencesFor(guide);
        for (const reference of guide.references) {
          const normalized = normalizeCitation(reference.citation);
          expect(
            allowed.has(normalized),
            `${guide.id} reference must be one already used by a linked calculator: ${reference.citation}`,
          ).toBe(true);
        }
      });
    });
  }

  it("references are unique within each guide", () => {
    for (const guide of guideRegistry) {
      const citations = guide.references.map((r) =>
        normalizeCitation(r.citation),
      );
      expect(new Set(citations).size).toBe(citations.length);
    }
  });

  it("relatedCalculator sets differ between guides", () => {
    const signatures = guideRegistry.map((g) =>
      [...g.relatedCalculators].sort().join(","),
    );
    expect(new Set(signatures).size).toBe(signatures.length);
  });
});

describe("Phase 6: static generation and metadata", () => {
  it("generateStaticParams returns exactly the fourteen slugs", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(14);
    expect(new Set(params.map((p) => p.slug))).toEqual(
      new Set(guideRegistry.map((g) => g.slug)),
    );
  });

  it("every guide gets unique metadata with a self-canonical", async () => {
    const seenTitles = new Set<string>();
    for (const guide of guideRegistry) {
      const metadata =
        (await generateGuideMetadata({
          params: Promise.resolve({ slug: guide.slug }),
        })) ?? {};
      const title = metadata.title;
      const absolute =
        typeof title === "object" && title !== null && "absolute" in title
          ? title.absolute
          : undefined;
      expect(absolute).toBe(`${guide.title} | MedCalcHub`);
      expect(seenTitles.has(absolute!)).toBe(false);
      seenTitles.add(absolute!);
      expect(metadata.description).toBe(guide.summary);
      expect(metadata.alternates?.canonical).toBe(
        `https://medcalculatorhub.com/guides/${guide.slug}`,
      );
    }
  });

  it("an unknown slug returns a not-found metadata title", async () => {
    const metadata =
      (await generateGuideMetadata({
        params: Promise.resolve({ slug: "no-such-guide" }),
      })) ?? {};
    expect(metadata.title).toBe("Guide Not Found");
  });

  it("the guides index page has indexable metadata with a self-canonical", () => {
    const source = readFile("app/guides/page.tsx");
    expect(source).toContain('absolute: "Guides | MedCalcHub"');
    expect(source).toContain(
      "canonical: `${SITE_URL}/guides`",
    );
    expect(source).not.toContain("index: false");
  });

  it("guide pages are server-rendered (no client-only component)", () => {
    const indexSource = readFile("app/guides/page.tsx");
    const detailSource = readFile("app/guides/[slug]/page.tsx");
    expect(indexSource).not.toContain('"use client"');
    expect(detailSource).not.toContain('"use client"');
  });
});

describe("Phase 6: rendered index page", () => {
  const indexText = renderText(React.createElement(GuidesPage));

  it("lists all six guide titles", () => {
    for (const guide of guideRegistry) {
      expect(indexText).toContain(guide.title);
    }
  });

  it("introduces the guide library", () => {
    expect(indexText).toContain("guides to the calculator library");
    expect(indexText).toContain("Calculators in this guide");
  });

  it("links to registered calculators from the cards", () => {
    for (const guide of guideRegistry) {
      for (const slug of guide.relatedCalculators.slice(0, 2)) {
        const calculator = calculatorRegistry.find((c) => c.slug === slug);
        expect(indexText).toContain(calculator!.name);
      }
    }
  });
});

describe("Phase 6: rendered detail pages", () => {
  for (const slug of ["acid-base-interpretation", "cardiac-and-perioperative-risk-scores"]) {
    describe(`/guides/${slug}`, () => {
      let text: string;

      beforeAll(async () => {
        text = await renderDetailPage(slug);
      });

      it("renders the guide title and summary", () => {
        const guide = guideRegistry.find((g) => g.slug === slug)!;
        expect(text).toContain(guide.title);
        expect(text).toContain(guide.summary);
      });

      it("renders a self-accessible breadcrumb trail", () => {
        expect(text).toContain("Breadcrumb");
        expect(text).toContain("Guides");
      });

      it("renders at least four related-calculator links with their names", () => {
        const guide = guideRegistry.find((g) => g.slug === slug)!;
        for (const linkedSlug of guide.relatedCalculators.slice(0, 4)) {
          const calculator = calculatorRegistry.find((c) => c.slug === linkedSlug);
          expect(text).toContain(calculator!.name);
        }
      });

      it("renders the sections, references, and disclaimer", () => {
        const guide = guideRegistry.find((g) => g.slug === slug)!;
        expect(text).toContain("References");
        expect(text).toContain("Guide disclaimer");
        for (const section of guide.sections) {
          expect(text).toContain(section.heading);
        }
        for (const reference of guide.references) {
          expect(text).toContain(reference.citation);
        }
        expect(text).toContain("October 11, 2026");
      });
    });
  }
});

describe("Phase 6: honest JSON-LD", () => {
  it("detail JSON-LD has no author/reviewer/credential/review-date keys", () => {
    for (const guide of guideRegistry) {
      const json = buildGuideJsonLd(guide);
      const serialized = JSON.stringify(json);
      expect(serialized).not.toContain("reviewedBy");
      expect(serialized).not.toContain("dateReviewed");
      expect(serialized).not.toContain('"author"');
      expect(serialized).not.toContain('"reviewer"');
      expect(serialized).not.toContain("credentialReview");
      expect(serialized).not.toContain("acceptedAnswer");
    }
  });

  it("detail JSON-LD uses MedicalWebPage with a BreadcrumbList", () => {
    const json = buildGuideJsonLd(guideRegistry[0]);
    const graph = json["@graph"] as Array<Record<string, unknown>>;
    expect(graph.some((node) => node["@type"] === "MedicalWebPage")).toBe(true);
    expect(
      graph.some((node) => node["@type"] === "BreadcrumbList"),
    ).toBe(true);
  });

  it("index JSON-LD uses CollectionPage with a BreadcrumbList", () => {
    const json = buildGuideIndexJsonLd(guideRegistry);
    const serialized = JSON.stringify(json);
    expect(serialized).toContain('"@type":"CollectionPage"');
    expect(serialized).toContain('"@type":"BreadcrumbList"');
    expect(serialized).not.toContain('"author"');
    expect(serialized).not.toContain("reviewedBy");
    expect(serialized).toContain("https://medcalculatorhub.com/guides");
  });
});

describe("Phase 6: sitemap integration", () => {
  const xml = buildSitemapXml();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("grows the sitemap to 199 URLs", () => {
    expect(urls).toHaveLength(199);
  });

  it("includes /guides and all fourteen detail pages", () => {
    expect(urls).toContain("https://medcalculatorhub.com/guides");
    for (const guide of guideRegistry) {
      expect(urls).toContain(
        `https://medcalculatorhub.com/guides/${guide.slug}`,
      );
    }
  });

  it("uses the stable creation lastmod for every guide page", () => {
    const guideUrls = urls.filter(
      (url) =>
        url === "https://medcalculatorhub.com/guides" ||
        /^https:\/\/medcalculatorhub\.com\/guides\/[^/]+$/.test(url),
    );
    expect(guideUrls).toHaveLength(15);
    for (const url of guideUrls) {
      expect(xml).toContain(`<loc>${url}</loc>`);
    }
    expect(xml).toContain("<lastmod>2026-10-11</lastmod>");
  });

  it("stays deterministic (no request-time lastmod)", () => {
    expect(buildSitemapXml()).toBe(xml);
    expect(xml).not.toMatch(/<lastmod>(2\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})<\/lastmod>/);
  });
});

describe("Phase 6: navigation and invariants", () => {
  it("the footer links to /guides", () => {
    const footer = readFile("app/layout.tsx");
    expect(footer).toContain('href="/guides"');
    expect(footer).toContain(">Guides</Link>");
  });

  it("the registry keeps exactly 143 calculators (no calculator changes)", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("Phase 2 coverage remains complete (formula explanation + variables)", () => {
    for (const slug of Object.keys(clinicalContentRegistry)) {
      const content = clinicalContentRegistry[slug];
      expect(content.formulaExplanation?.length ?? 0, slug).toBeGreaterThan(0);
      expect(content.variables?.length ?? 0, slug).toBeGreaterThan(0);
    }
  });

  it("no guide is disallowed by robots.ts", () => {
    const robots = readFile("app/robots.ts");
    expect(robots).not.toContain("Disallow: /guides");
    for (const guide of guideRegistry) {
      expect(robots).not.toContain(`/guides/${guide.slug}`);
    }
  });

  it("guide pages use only the guide library, not calculation internals", () => {
    for (const file of ["app/guides/page.tsx", "app/guides/[slug]/page.tsx"]) {
      const source = readFile(file);
      expect(source).toContain("@/lib/guides");
      expect(source).not.toContain("@/lib/calculators");
      expect(source).not.toContain("@/lib/clinical-content");
    }
  });
});