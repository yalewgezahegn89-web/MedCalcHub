/**
 * Phase 0 — technical indexing / trust-link hygiene regression guards.
 *
 * Covers:
 * - Utility pages (favorites/history/recent/saved-calculations/workspace)
 *   emit noindex + canonical via route layout metadata.
 * - /search remains noindexed.
 * - Sitemap excludes utility pages and /search; every entry carries a stable
 *   lastmod (no request-time stamping), and output is deterministic.
 * - Homepage emits no SearchAction JSON-LD.
 * - /renal redirects to the existing /categories/nephrology page.
 * - Registry count remains exactly 143.
 */

import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { calculatorRegistry } from "../../lib/calculators/registry";
import { buildSitemapXml } from "../../lib/seo/sitemap-xml";
import { buildUtilityPageMetadata } from "../../lib/seo/utility-page-metadata";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

const UTILITY_PAGES = [
  {
    path: "/favorites",
    route: "app/favorites",
    title: "Favorite Calculators",
  },
  {
    path: "/history",
    route: "app/history",
    title: "Calculation History",
  },
  {
    path: "/recent",
    route: "app/recent",
    title: "Recently Used",
  },
  {
    path: "/saved-calculations",
    route: "app/saved-calculations",
    title: "Saved Calculations",
  },
  {
    path: "/workspace",
    route: "app/workspace",
    title: "Clinical Workspace",
  },
];

describe("Phase 0: utility pages are noindexed with self-canonicals", () => {
  it("the shared helper forces noindex+follow", () => {
    const metadata = buildUtilityPageMetadata({
      title: "Test Tool",
      description: "Test",
      path: "/test",
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://medcalculatorhub.com/test");
  });

  for (const page of UTILITY_PAGES) {
    describe(page.path, () => {
      it(`has a layout that exports metadata`, () => {
        const layout = readFile(`${page.route}/layout.tsx`);
        expect(layout).toMatch(/export const metadata:/);
      });

      it(`wires the shared noindex metadata for its canonical path`, () => {
        const layout = readFile(`${page.route}/layout.tsx`);
        expect(layout).toContain(
          'buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata"',
        );
        expect(layout).toContain(`path: "${page.path}"`);
        expect(layout).toMatch(/return children;/);
      });

      it(`uses the expected absolute title`, () => {
        const layout = readFile(`${page.route}/layout.tsx`);
        expect(layout).toContain(`title: "${page.title}"`);
      });
    });
  }

  it("robots.ts still disallows each utility route", () => {
    const robots = readFile("app/robots.ts");
    for (const page of UTILITY_PAGES) {
      expect(robots).toContain(page.path);
    }
  });
});

describe("Phase 0: /search remains noindexed", () => {
  it("search layout keeps robots index:false follow:true", () => {
    const layout = readFile("app/search/layout.tsx");
    expect(layout).toContain("index: false");
    expect(layout).toContain("follow: true");
  });
});

describe("Phase 0: sitemap hygiene", () => {
  const xml = buildSitemapXml();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("excludes every utility page", () => {
    for (const page of UTILITY_PAGES) {
      expect(urls.some((url) => url.endsWith(page.path))).toBe(false);
    }
  });

  it("excludes /search", () => {
    expect(urls.some((url) => url.endsWith("/search"))).toBe(false);
  });

  it("contains 199 URLs", () => {
    expect(urls).toHaveLength(199);
  });

  it("every entry carries a lastmod", () => {
    const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
    expect(lastmods).toHaveLength(urls.length);
    for (const [, lastmod] of lastmods) {
      expect(lastmod.length).toBeGreaterThan(0);
    }
  });

  it("lastmod values are stable (not stamped per request)", () => {
    expect(buildSitemapXml()).toBe(xml);
    expect(xml).not.toMatch(/<lastmod>(2\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})<\/lastmod>/);
  });

  it("does not contain a date later than the newest registered or editorial content", () => {
    const latestRegistry = calculatorRegistry.reduce((latest, calc) => {
      if (!calc.updatedAt) return latest;
      return new Date(calc.updatedAt) > latest
        ? new Date(calc.updatedAt)
        : latest;
    }, new Date("2026-10-11"));
    const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
      (m) => m[1],
    );
    for (const lastmod of lastmods) {
      expect(new Date(lastmod).getTime()).toBeLessThanOrEqual(
        latestRegistry.getTime() + 86400000,
      );
    }
  });
});

describe("Phase 0: /renal redirect hygiene", () => {
  it("next.config.ts redirects /renal to /categories/nephrology", () => {
    const config = readFile("next.config.ts");
    expect(config).toContain('source: "/renal"');
    expect(config).toContain('destination: "/categories/nephrology"');
    expect(config).toContain("permanent: true");
  });

  it("/categories/nephrology is a real category route (not a 404)", () => {
    const taxonomy = readFile("lib/seo/taxonomy-content.ts");
    expect(taxonomy).toContain("Nephrology");
    const categoryPage = readFile("app/categories/[category]/page.tsx");
    expect(categoryPage).toContain("slugToCategory");
  });
});

describe("Phase 0: homepage structured-data hygiene", () => {
  it("homepage JSON-LD has no SearchAction", () => {
    const source = readFile("app/page.tsx");
    expect(source).not.toContain('"@type": "SearchAction"');
  });

  it("homepage keeps WebSite and Organization schema", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain('"@type": "WebSite"');
    expect(source).toContain('"@type": "Organization"');
  });
});

describe("Phase 0: registry integrity is untouched", () => {
  it("registry keeps exactly 143 calculators", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });
});