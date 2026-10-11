import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    // Resolve stores from the current snapshot so localStorage-mocked
    // states can be asserted without a DOM environment.
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
  };
});

import HomePage from "../../app/page";
import CalculatorsPage from "../../app/calculators/page";
import CategoriesPage from "../../app/categories/page";
import SpecialtiesPage from "../../app/specialties/page";
import CategoryPage from "../../app/categories/[category]/page";
import SpecialtyPage from "../../app/specialties/[slug]/page";

import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
} from "../../lib/calculators/registry";
import {
  categoryDescriptions,
  categorySummaries,
  getCategoriesForSpecialty,
  getSpecialtiesForCategory,
  specialtyDescriptions,
  specialtySummaries,
  taxonomyToSlug,
} from "../../lib/seo/taxonomy-content";

function readFile(relPath: string): string {
  return readFileSync(join(__dirname, "../..", relPath), "utf8");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function shingles(tokens: string[], size: number): Set<string> {
  const result = new Set<string>();
  for (let i = 0; i + size <= tokens.length; i++) {
    result.add(tokens.slice(i, i + size).join(" "));
  }
  return result;
}

function normalizedSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => tokenize(sentence).join(" "))
    .filter((sentence) => sentence.split(" ").length >= 5);
}

/** React escapes "&" in attribute values; mirror that for href checks. */
function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;");
}

const categories = getCategories();
const specialties = getSpecialties();

/* ------------------------------------------------------------------ */
/*  1. Editorial coverage                                               */
/* ------------------------------------------------------------------ */

describe("Phase 4 — taxonomy editorial coverage", () => {
  it("every registered category has a long description and a summary", () => {
    for (const category of categories) {
      expect(
        categoryDescriptions[category],
        `Missing category description: ${category}`,
      ).toBeTruthy();
      expect(
        categorySummaries[category],
        `Missing category summary: ${category}`,
      ).toBeTruthy();
    }
  });

  it("every registered specialty has a long description and a summary", () => {
    for (const specialty of specialties) {
      expect(
        specialtyDescriptions[specialty],
        `Missing specialty description: ${specialty}`,
      ).toBeTruthy();
      expect(
        specialtySummaries[specialty],
        `Missing specialty summary: ${specialty}`,
      ).toBeTruthy();
    }
  });

  it("no editorial map holds keys outside the live registry", () => {
    for (const key of Object.keys(categoryDescriptions)) {
      expect(categories).toContain(key);
    }
    for (const key of Object.keys(categorySummaries)) {
      expect(categories).toContain(key);
    }
    for (const key of Object.keys(specialtyDescriptions)) {
      expect(specialties).toContain(key);
    }
    for (const key of Object.keys(specialtySummaries)) {
      expect(specialties).toContain(key);
    }
  });

  it("descriptions are long-form and summaries are card-sized", () => {
    for (const category of categories) {
      expect(
        tokenize(categoryDescriptions[category]).length,
        `Category description too short: ${category}`,
      ).toBeGreaterThanOrEqual(60);
      const summaryWords = tokenize(categorySummaries[category]).length;
      expect(summaryWords).toBeGreaterThanOrEqual(6);
      expect(summaryWords).toBeLessThanOrEqual(30);
    }
    for (const specialty of specialties) {
      expect(
        tokenize(specialtyDescriptions[specialty]).length,
        `Specialty description too short: ${specialty}`,
      ).toBeGreaterThanOrEqual(50);
      const summaryWords = tokenize(specialtySummaries[specialty]).length;
      expect(summaryWords).toBeGreaterThanOrEqual(6);
      expect(summaryWords).toBeLessThanOrEqual(30);
    }
  });

  it("summaries are unique within each taxonomy", () => {
    const categorySummariesList = Object.values(categorySummaries);
    const specialtySummariesList = Object.values(specialtySummaries);
    expect(
      new Set(categorySummariesList).size,
    ).toBe(categorySummariesList.length);
    expect(
      new Set(specialtySummariesList).size,
    ).toBe(specialtySummariesList.length);
  });

  it("cross-linking helpers return registry-backed values", () => {
    for (const category of categories) {
      for (const specialty of getSpecialtiesForCategory(category)) {
        expect(specialties).toContain(specialty);
      }
    }
    for (const specialty of specialties) {
      for (const category of getCategoriesForSpecialty(specialty)) {
        expect(categories).toContain(category);
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/*  2. Category/specialty editorial non-overlap                         */
/* ------------------------------------------------------------------ */

describe("Phase 4 — category and specialty copy stay distinct", () => {
  const SHINGLE_SIZE = 8;
  const MIN_SENTENCE_TOKENS = 5;

  const categoryTexts = categories.map((category) => ({
    name: category,
    tokens: tokenize(
      `${categorySummaries[category]} ${categoryDescriptions[category]}`,
    ),
    sentences: [
      ...normalizedSentences(categorySummaries[category]),
      ...normalizedSentences(categoryDescriptions[category]),
    ],
  }));

  const specialtyTexts = specialties.map((specialty) => ({
    name: specialty,
    tokens: tokenize(
      `${specialtySummaries[specialty]} ${specialtyDescriptions[specialty]}`,
    ),
    sentences: [
      ...normalizedSentences(specialtySummaries[specialty]),
      ...normalizedSentences(specialtyDescriptions[specialty]),
    ],
  }));

  it("shares no substantive sentence with a specialty description", () => {
    const shared: string[] = [];

    for (const categoryText of categoryTexts) {
      const categorySentenceSet = new Set(categoryText.sentences);
      for (const specialtyText of specialtyTexts) {
        for (const sentence of specialtyText.sentences) {
          if (
            sentence.split(" ").length >= MIN_SENTENCE_TOKENS &&
            categorySentenceSet.has(sentence)
          ) {
            shared.push(
              `${categoryText.name} <-> ${specialtyText.name}: ${sentence}`,
            );
          }
        }
      }
    }

    expect(shared, shared.join("\n")).toEqual([]);
  });

  it("shares no long run of words with a specialty description", () => {
    const categoryShingles = categoryTexts.map((categoryText) => ({
      name: categoryText.name,
      set: shingles(categoryText.tokens, SHINGLE_SIZE),
    }));

    const shared: string[] = [];

    for (const specialtyText of specialtyTexts) {
      const specialtyShingles = shingles(
        specialtyText.tokens,
        SHINGLE_SIZE,
      );
      for (const { name, set } of categoryShingles) {
        for (const shingle of specialtyShingles) {
          if (set.has(shingle)) {
            shared.push(`${name} <-> ${specialtyText.name}: ${shingle}`);
          }
        }
      }
    }

    expect(shared, shared.join("\n")).toEqual([]);
  });

  it("summary copy is not reused across taxonomies at any length", () => {
    const categorySummarySentences = new Set(
      categories.flatMap((category) =>
        normalizedSentences(categorySummaries[category]),
      ),
    );

    const shared: string[] = [];
    for (const specialty of specialties) {
      for (const sentence of normalizedSentences(
        specialtySummaries[specialty],
      )) {
        if (categorySummarySentences.has(sentence)) {
          shared.push(`${specialty}: ${sentence}`);
        }
      }
    }

    expect(shared, shared.join("\n")).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/*  3. Homepage editorial content                                       */
/* ------------------------------------------------------------------ */

describe("Phase 4 — homepage editorial section", () => {
  const markup = renderToStaticMarkup(<HomePage />);
  const source = readFile("app/page.tsx");

  it("renders the editorial section with substantive prose", () => {
    const text = stripTags(markup);
    expect(text).toContain("What you will find in this library");
    expect(text).toContain("risk scores, estimates, staging");
    expect(text).toContain("Calculators support clinical judgement");
    expect(text).toContain("how entries are written");
  });

  it("links to every required internal destination", () => {
    for (const href of ["/about", "/calculators", "/categories", "/specialties", "/comparison"]) {
      expect(
        markup.includes(`href="${href}"`),
        `Homepage missing internal link: ${href}`,
      ).toBe(true);
    }
  });

  it("does not link to unbuilt Phase 5 or Phase 6 routes", () => {
    for (const href of ["/guides", "/content-sources", "/disclaimer"]) {
      expect(markup.includes(`href="${href}"`)).toBe(false);
    }
  });

  it("keeps WebSite and Organization JSON-LD without SearchAction", () => {
    expect(source).toContain('"@type": "Organization"');
    expect(source).toContain('"@type": "WebSite"');
    expect(source).not.toContain("SearchAction");
    expect(source).toContain("canonical: SITE_URL");
  });

  it("keeps the registry count in the prose", () => {
    expect(markup).toContain(
      `${calculatorRegistry.length} clinical`,
    );
  });
});

/* ------------------------------------------------------------------ */
/*  4. /calculators directory                                           */
/* ------------------------------------------------------------------ */

describe("Phase 4 — calculator directory", () => {
  const markup = renderToStaticMarkup(<CalculatorsPage />);
  const text = stripTags(markup);

  it("introduces the directory and links to the main navigation hubs", () => {
    expect(text).toContain(
      `All ${calculatorRegistry.length} calculators`,
    );
    expect(text).toContain("the formula, the inputs it expects");
    for (const href of ["/categories", "/specialties", "/comparison", "/about"]) {
      expect(
        markup.includes(`href="${href}"`),
        `Directory missing link: ${href}`,
      ).toBe(true);
    }
  });

  it("renders one registry link per calculator", () => {
    const links = markup.match(/href="\/calculators\//g) ?? [];
    expect(links).toHaveLength(calculatorRegistry.length);
  });

  it("makes every category name a navigable link", () => {
    for (const category of categories) {
      const expected = escapeAttr(
        `href="/categories/${taxonomyToSlug(category)}"`,
      );
      expect(
        markup.includes(expected),
        `Directory missing category link: ${expected}`,
      ).toBe(true);
    }
  });

  it("keeps its canonical and metadata intact", () => {
    const source = readFile("app/calculators/page.tsx");
    expect(source).toContain("canonical: `${SITE_URL}/calculators`");
    expect(source).toContain("buildCollectionJsonLd");
  });
});

/* ------------------------------------------------------------------ */
/*  5. Category and specialty index pages                               */
/* ------------------------------------------------------------------ */

describe("Phase 4 — taxonomy index pages", () => {
  const categoriesMarkup = renderToStaticMarkup(<CategoriesPage />);
  const specialtiesMarkup = renderToStaticMarkup(<SpecialtiesPage />);

  it("categories index explains what categories are for", () => {
    const text = stripTags(categoriesMarkup);
    expect(text).toContain(
      "Categories answer one question: what is being calculated?",
    );
    expect(categoriesMarkup).toContain('href="/specialties"');
    expect(categoriesMarkup).toContain('href="/calculators"');
    expect(categoriesMarkup).toContain('href="/about"');
  });

  it("categories index renders every category summary", () => {
    for (const category of categories) {
      expect(
        categoriesMarkup.includes(categorySummaries[category]),
        `Categories index missing summary: ${category}`,
      ).toBe(true);
    }
  });

  it("specialties index distinguishes specialties from categories", () => {
    const text = stripTags(specialtiesMarkup);
    expect(text).toContain("not what is being calculated, but where and why");
    expect(specialtiesMarkup).toContain('href="/categories"');
    expect(specialtiesMarkup).toContain('href="/calculators"');
    expect(specialtiesMarkup).toContain('href="/comparison"');
  });

  it("specialties index renders every specialty summary", () => {
    for (const specialty of specialties) {
      expect(
        specialtiesMarkup.includes(specialtySummaries[specialty]),
        `Specialties index missing summary: ${specialty}`,
      ).toBe(true);
    }
  });

  it("index cards still link to every registered taxonomy page", () => {
    for (const category of categories) {
      expect(categoriesMarkup).toContain(
        escapeAttr(`href="/categories/${taxonomyToSlug(category)}"`),
      );
    }
    for (const specialty of specialties) {
      expect(specialtiesMarkup).toContain(
        escapeAttr(`href="/specialties/${taxonomyToSlug(specialty)}"`),
      );
    }
  });

  it("keeps CollectionPage JSON-LD and canonicals in source", () => {
    const categoriesSource = readFile("app/categories/page.tsx");
    const specialtiesSource = readFile("app/specialties/page.tsx");
    expect(categoriesSource).toContain('"@type": "CollectionPage"');
    expect(categoriesSource).toContain(
      "canonical: `${SITE_URL}/categories`",
    );
    expect(specialtiesSource).toContain('"@type": "CollectionPage"');
    expect(specialtiesSource).toContain(
      "canonical: `${SITE_URL}/specialties`",
    );
  });
});

/* ------------------------------------------------------------------ */
/*  6. Category and specialty detail pages                              */
/* ------------------------------------------------------------------ */

describe("Phase 4 — taxonomy detail pages", () => {
  it("category page renders its description and cross-taxonomy navigation", async () => {
    const page = await CategoryPage({
      params: Promise.resolve({ category: "cardiology" }),
    });
    const markup = renderToStaticMarkup(page);
    const text = stripTags(markup);

    expect(text).toContain(
      "Cardiac risk assessment and haemodynamic calculators",
    );
    expect(text).toContain("Related Specialties");
    expect(markup).toContain('href="/specialties"');
    expect(markup).toContain('href="/calculators"');
    expect(markup).toContain('href="/comparison"');
    expect(markup).toContain('href="/categories"');
  });

  it("specialty page renders its description and cross-taxonomy navigation", async () => {
    const page = await SpecialtyPage({
      params: Promise.resolve({ slug: "cardiology" }),
    });
    const markup = renderToStaticMarkup(page);
    const text = stripTags(markup);

    expect(text).toContain(
      "Cardiologists, anticoagulation services, and pre-assessment clinics",
    );
    expect(text).toContain("Related Categories");
    expect(markup).toContain('href="/categories"');
    expect(markup).toContain('href="/calculators"');
    expect(markup).toContain('href="/comparison"');
    expect(markup).toContain('href="/specialties"');
  });

  it("both detail pages keep breadcrumbs and shared JSON-LD builder", () => {
    const categorySource = readFile("app/categories/[category]/page.tsx");
    const specialtySource = readFile("app/specialties/[slug]/page.tsx");

    expect(categorySource).toContain("buildCollectionJsonLd");
    expect(categorySource).toContain('label: "Categories"');
    expect(specialtySource).toContain("buildCollectionJsonLd");
    expect(specialtySource).toContain('label: "Specialties"');
  });
});

/* ------------------------------------------------------------------ */
/*  7. Comparison page copy                                             */
/* ------------------------------------------------------------------ */

describe("Phase 4 — comparison page", () => {
  const source = readFile("app/comparison/page.tsx");

  it("explains why comparisons matter and what to read", () => {
    const flat = source.replace(/\s+/g, " ");
    expect(flat).toContain(
      "Comparisons earn their place when two calculators look interchangeable but are not.",
    );
    expect(flat).toContain(
      "Pay particular attention to the purpose and limitation rows.",
    );
    expect(flat).toContain(
      "still have been derived from different populations",
    );
  });

  it("links to the main browsing hubs", () => {
    for (const href of ["/calculators", "/categories", "/specialties"]) {
      expect(
        source.includes(`href="${href}"`),
        `Comparison page missing link: ${href}`,
      ).toBe(true);
    }
    expect(source).not.toContain('href="/guides"');
    expect(source).not.toContain('href="/disclaimer"');
  });

  it("keeps layout metadata, canonical, and title", () => {
    const layout = readFile("app/comparison/layout.tsx");
    expect(layout).toMatch(/export const metadata:\s*Metadata/);
    expect(layout).toMatch(/canonical:\s*`\$\{SITE_URL\}\/comparison`/);
    expect(layout).toMatch(/Calculator Comparison \| MedCalcHub/);
  });
});

/* ------------------------------------------------------------------ */
/*  8. Phase 0–3 invariants touched by this phase                       */
/* ------------------------------------------------------------------ */

describe("Phase 4 — preserved invariants", () => {
  it("registry still holds exactly 143 calculators", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("every calculator still has both a category and a specialty", () => {
    for (const calculator of calculatorRegistry) {
      expect(calculator.category).toBeTruthy();
      expect(calculator.specialty).toBeTruthy();
    }
  });

  it("/search stays noindex with its canonical", () => {
    const source = readFile("app/search/layout.tsx");
    expect(source).toContain("index: false");
    expect(source).toContain("canonical: `${SITE_URL}/search`");
  });

  it("/renal redirect and sitemap exclusions are unchanged", () => {
    const config = readFile("next.config.ts");
    expect(config).toContain('source: "/renal"');
    expect(config).toContain('destination: "/categories/nephrology"');

    const sitemap = readFile("lib/seo/sitemap-xml.ts");
    expect(sitemap).not.toContain('"/search"');
    expect(sitemap).not.toContain('"/renal"');
  });

  it("homepage keeps its canonical and OG image wiring", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain("canonical: SITE_URL");
    expect(source).toContain("og-default.png");
  });
});
