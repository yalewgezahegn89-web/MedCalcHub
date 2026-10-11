/**
 * Phase 5 — Content Sources & Medical Disclaimer pages.
 *
 * Verifies:
 * 1. /content-sources and /disclaimer exist and follow the editorial page
 *    convention (server component, max-w-3xl layout, h1 + sections).
 * 2. Both emit indexable metadata with self-canonicals and no noindex.
 * 3. Both appear in the sitemap with their stable editorial lastmod.
 * 4. Footer and About page link to both pages.
 * 5. Content-sources covers sections A-E and cites real registry references.
 * 6. Disclaimer covers the required scope, context, limitation, urgent,
 *    sources, and no-false-assurance points.
 * 7. No fabricated reviewers/credentials/review dates and no reintroduced
 *    "MedCalcHub Clinical Team" or similar trust claims.
 * 8. Automated tests are not described as human clinical review.
 * 9. Registry and clinical-content invariants from Phases 2-4 are preserved.
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { calculatorRegistry } from "../../lib/calculators/registry";
import { clinicalContentRegistry } from "../../lib/clinical-content/registry";
import { buildSitemapXml } from "../../lib/seo/sitemap-xml";
import ContentSourcesPage from "../../app/content-sources/page";
import DisclaimerPage from "../../app/disclaimer/page";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

function renderText(page: React.ComponentType): string {
  return renderToStaticMarkup(React.createElement(page))
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

function evidenceBlockCount(): number {
  let count = 0;
  for (const content of Object.values(clinicalContentRegistry)) {
    if (content.evidence) count += 1;
  }
  return count;
}

const FORBIDDEN_TRUST_CLAIMS = [
  "MedCalcHub Clinical Team",
  "Editorial Team",
  "physician-reviewed",
  "clinically reviewed",
  "medically reviewed",
  "expert-reviewed",
];

const PAGE_INFO = [
  {
    path: "/content-sources",
    file: "app/content-sources/page.tsx",
    title: "Content Sources | MedCalcHub",
    canonical: "https://medcalculatorhub.com/content-sources",
    lastmod: "2026-10-11",
    component: ContentSourcesPage as React.ComponentType,
  },
  {
    path: "/disclaimer",
    file: "app/disclaimer/page.tsx",
    title: "Medical Disclaimer | MedCalcHub",
    canonical: "https://medcalculatorhub.com/disclaimer",
    lastmod: "2026-10-11",
    component: DisclaimerPage as React.ComponentType,
  },
];

const contentSourcesText = renderText(ContentSourcesPage);
const disclaimerText = renderText(DisclaimerPage);

describe("Phase 5: the two editorial pages exist and follow conventions", () => {
  for (const page of PAGE_INFO) {
    describe(page.path, () => {
      const source = readFile(page.file);

      it("is a standalone server component", () => {
        expect(source).toContain("export default function");
      });

      it("uses the editorial page layout convention", () => {
        expect(source).toContain("mx-auto max-w-3xl px-6 py-10");
        expect(source).toContain("<h1");
        expect(source).toContain("<section>");
      });

      it("has indexable metadata with a self-canonical and absolute title", () => {
        expect(source).toContain("title: {");
        expect(source).toContain(`absolute: "${page.title}"`);
        expect(source).toContain(`canonical: \`\${SITE_URL}${page.path}\``);
        expect(source).toContain("openGraph");
        expect(source).toContain("twitter");
      });

      it("explicitly allows indexing (no noindex)", () => {
        expect(source).toContain("index: true");
        expect(source).toContain("follow: true");
        expect(source).not.toContain("index: false");
        expect(source).not.toContain("noindex");
      });

      it("uses SITE_URL from lib/site-url", () => {
        expect(source).toContain("SITE_URL");
        expect(source).toContain("@/lib/site-url");
      });

      it("carries a stable last-updated line matching its sitemap lastmod", () => {
        expect(source).toContain("Last updated: October 11, 2026");
      });

      it("is not disallowed by robots.ts", () => {
        const robots = readFile("app/robots.ts");
        expect(robots).not.toContain(page.path);
      });
    });
  }
});

describe("Phase 5: sitemap includes both pages", () => {
  const xml = buildSitemapXml();

  it("contains both URLs with the stable creation-date lastmod", () => {
    for (const page of PAGE_INFO) {
      expect(xml).toContain(`<loc>${page.canonical}</loc>`);
      expect(xml).toContain(`<lastmod>${page.lastmod}</lastmod>`);
    }
  });

  it("stays deterministic across calls", () => {
    expect(buildSitemapXml()).toBe(xml);
  });
});

describe("Phase 5: navigation and cross-links", () => {
  it("footer links to /content-sources and /disclaimer", () => {
    const footer = readFile("app/layout.tsx");
    expect(footer).toContain('href="/content-sources"');
    expect(footer).toContain("Content Sources");
    expect(footer).toContain('href="/disclaimer"');
    expect(footer).toContain("Medical Disclaimer");
  });

  it("About page links to /content-sources and /disclaimer", () => {
    const about = readFile("app/about/page.tsx");
    expect(about).toContain('href="/content-sources"');
    expect(about).toContain('href="/disclaimer"');
  });

  it("content-sources links to /contact for corrections", () => {
    const source = readFile("app/content-sources/page.tsx");
    expect(source).toContain('href="/contact"');
  });

  it("disclaimer links back to /content-sources and /terms", () => {
    const source = readFile("app/disclaimer/page.tsx");
    expect(source).toContain('href="/content-sources"');
    expect(source).toContain('href="/terms"');
  });
});

describe("Phase 5: honest content-sources claims", () => {
  it("covers all five required sections (A-E)", () => {
    for (const heading of [
      "Where the Methods Come From",
      "How Calculations Are Represented",
      "How Content Is Maintained",
      "Human Review Status",
      "Correcting Content",
    ]) {
      expect(contentSourcesText).toContain(heading);
    }
  });

  it("states that automated tests are not human clinical review", () => {
    expect(contentSourcesText).toContain(
      "do not constitute human clinical review",
    );
  });

  it("honestly reports that no completed human review exists", () => {
    expect(contentSourcesText).toContain("no calculator in the library carries a");
    expect(contentSourcesText).toContain("completed human review record");
    expect(contentSourcesText).toContain("No named clinical reviewer");
  });

  it("does not reinvent an organizational review team", () => {
    for (const claim of FORBIDDEN_TRUST_CLAIMS) {
      expect(contentSourcesText).not.toContain(claim);
    }
  });

  it("reports accurate registry totals", () => {
    expect(contentSourcesText).toContain(
      `${calculatorRegistry.length} calculators overall`,
    );
    expect(contentSourcesText).toContain(
      `${evidenceBlockCount()} calculators with evidence content`,
    );
  });

  it("cites references that genuinely exist in the calculator registry", () => {
    const refsBySlug: Record<string, string> = {
      "ckd-epi-2021": "Inker LA",
      "curb-65": "Lim WS",
      "apgar-score": "Apgar V",
      gcs: "Teasdale G",
      "abcd2-score": "Johnston SC",
    };
    for (const [slug, authorMarker] of Object.entries(refsBySlug)) {
      const calc = calculatorRegistry.find((item) => item.slug === slug);
      expect(calc, `${slug} must exist in the registry`).toBeDefined();
      const citation = (calc!.references ?? []).find((ref) =>
        ref.startsWith(authorMarker),
      );
      expect(citation, `${slug} must have a matching reference`).toBeDefined();
      expect(
        contentSourcesText,
        `${slug} page must include the registry citation`,
      ).toContain(citation!);
    }
  });

  it("does not present automated tests as validating clinical accuracy", () => {
    expect(contentSourcesText).toContain(
      "verify internal consistency, completeness, and structure",
    );
    expect(contentSourcesText).toContain(
      "not a substitute for clinical validation",
    );
  });
});

describe("Phase 5: disclaimer coverage", () => {
  it("covers all required sections", () => {
    for (const heading of [
      "Educational and Decision-Support Scope",
      "Interpretation in an Individual Context",
      "Results and Their Limitations",
      "Emergency and Urgent Situations",
      "Sources and Changes",
      "No False Assurance",
    ]) {
      expect(disclaimerText).toContain(heading);
    }
  });

  it("states no medical advice, diagnosis, or treatment", () => {
    expect(disclaimerText).toContain(
      "MedCalcHub does not provide medical advice, diagnosis, or treatment.",
    );
  });

  it("requires interpretation in individual clinical context", () => {
    expect(disclaimerText).toContain("full context of the individual patient");
    expect(disclaimerText).toContain("professional judgment");
  });

  it("covers results and their limitations honestly", () => {
    expect(disclaimerText).toContain("estimates or classifications");
    expect(disclaimerText).toContain(
      "No result should be used as the sole basis",
    );
  });

  it("covers emergency and urgent situations", () => {
    expect(disclaimerText).toContain("Emergency and Urgent Situations");
    expect(disclaimerText).toContain("do not use this website");
  });

  it("covers sources and changes", () => {
    expect(disclaimerText).toContain("Sources and Changes");
    expect(disclaimerText).toContain("lastmod");
  });

  it("gives no false assurance and invents no credentials", () => {
    expect(disclaimerText).toContain("No False Assurance");
    expect(disclaimerText).toContain(
      "No certification, approval, or endorsement",
    );
    for (const claim of FORBIDDEN_TRUST_CLAIMS) {
      expect(disclaimerText).not.toContain(claim);
    }
    expect(disclaimerText).not.toContain("FDA");
    expect(disclaimerText).not.toContain("certified");
    expect(disclaimerText).not.toContain("Inc.");
    expect(disclaimerText).not.toContain("LLC");
    expect(disclaimerText).not.toContain("Ltd.");
    expect(disclaimerText).not.toContain("Corporation");
  });
});

describe("Phase 5: Phases 2-4 invariants preserved", () => {
  it("registry keeps exactly 143 calculators", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("no calculator content block fakes a review", () => {
    for (const slug of Object.keys(clinicalContentRegistry)) {
      const content = clinicalContentRegistry[slug];
      expect(content.review, `${slug}.review must stay empty`).toBeUndefined();
      if (content.evidence) {
        expect(
          content.evidence.reviewedBy,
          `${slug}.evidence.reviewedBy must stay undefined`,
        ).toBeUndefined();
      }
    }
  });

  it("Phase 2 clinical-content coverage remains complete (formula explanation + variables)", () => {
    for (const slug of Object.keys(clinicalContentRegistry)) {
      const content = clinicalContentRegistry[slug];
      expect(content.formulaExplanation?.length ?? 0, slug).toBeGreaterThan(0);
      expect(content.variables?.length ?? 0, slug).toBeGreaterThan(0);
    }
  });

  it("Phase 3 editorial quality coverage remains complete (mistakes + FAQ)", () => {
    for (const slug of Object.keys(clinicalContentRegistry)) {
      const content = clinicalContentRegistry[slug];
      expect(content.commonMistakes?.length ?? 0, slug).toBeGreaterThanOrEqual(3);
      expect(content.faq?.length ?? 0, slug).toBeGreaterThanOrEqual(1);
    }
  });
});