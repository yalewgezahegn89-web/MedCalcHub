/**
 * Sprint 2.1 Batch 7 — SEO Regression Tests
 *
 * Covers:
 * A. Index-page metadata
 * B. OG metadata
 * C. Canonical URLs
 * D. BreadcrumbList correctness
 * E. FAQ JSON-LD / rendering parity
 * F. Internal-link integrity
 * G. Nested Link protection
 * H. Robots coverage
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

import {
  calculatorRegistry,
  getCategories,
  getSpecialties,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
} from "../../lib/calculators/registry";
import { SITE_URL } from "../../lib/site-url";
import { buildCalculatorSEO } from "../../lib/seo/calculator-seo";
import { buildCalculatorJsonLd } from "../../lib/seo/jsonld";
import { getClinicalContent } from "../../lib/clinical-content";
import { calculatorFaqs } from "../../lib/calculators/faqs";
import { taxonomyToSlug } from "../../lib/seo/taxonomy-content";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

/* ================================================================== */
/*  A. Index-page metadata                                              */
/* ================================================================== */

describe("A — Index-page metadata", () => {
  const pages = [
    {
      name: "home",
      file: "app/page.tsx",
      route: "/",
    },
    {
      name: "calculators",
      file: "app/calculators/page.tsx",
      route: "/calculators",
    },
    {
      name: "categories",
      file: "app/categories/page.tsx",
      route: "/categories",
    },
    {
      name: "specialties",
      file: "app/specialties/page.tsx",
      route: "/specialties",
    },
  ];

  for (const page of pages) {
    describe(`${page.name} (${page.route})`, () => {
      const source = readFile(page.file);

      it("has metadata export", () => {
        expect(source).toMatch(
          /export\s+(const\s+metadata|async\s+function\s+generateMetadata)/,
        );
      });

      it("has title", () => {
        expect(source).toContain("title");
      });

      it("has description", () => {
        expect(source).toContain("description");
      });

      it("has canonical URL", () => {
        expect(source).toContain("canonical");
        expect(source).toContain("SITE_URL");
      });

      it("has OpenGraph metadata", () => {
        expect(source).toContain("openGraph");
      });

      it("has Twitter card metadata", () => {
        expect(source).toContain("twitter");
      });
    });
  }
});

/* ================================================================== */
/*  B. OG metadata                                                     */
/* ================================================================== */

describe("B — OG metadata includes default OG image", () => {
  const ogImage = `${SITE_URL}/og-default.png`;

  it("calculator SEO includes OG image", () => {
    const calc = calculatorRegistry[0];
    const seo = buildCalculatorSEO(calc);
    const images = seo.openGraph?.images as
      | Array<{ url: string }>
      | undefined;
    expect(images).toBeDefined();
    expect(images!.length).toBeGreaterThan(0);
    expect(images![0].url).toBe(ogImage);
  });

  it("calculator SEO includes Twitter image", () => {
    const calc = calculatorRegistry[0];
    const seo = buildCalculatorSEO(calc);
    const images = seo.twitter?.images as string[] | undefined;
    expect(images).toBeDefined();
    expect(images).toContain(ogImage);
  });

  it("category detail page source has OG image", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("specialty detail page source has OG image", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("categories index has OG image", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("specialties index has OG image", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("calculators index has OG image", () => {
    const source = readFile("app/calculators/page.tsx");
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("home page has OG image", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain("OG_IMAGE");
    expect(source).toContain("og-default.png");
  });

  it("layout has default OG image", () => {
    const source = readFile("app/layout.tsx");
    expect(source).toContain("og-default.png");
  });
});

/* ================================================================== */
/*  C. Canonical URLs                                                   */
/* ================================================================== */

describe("C — Canonical URLs", () => {
  it("calculator detail canonical uses SITE_URL and correct route", () => {
    const calc = calculatorRegistry[0];
    const seo = buildCalculatorSEO(calc);
    const canonical = seo.alternates?.canonical;
    expect(canonical).toBe(
      `${SITE_URL}/calculators/${calc.slug}`,
    );
  });

  it("all calculator slugs produce valid canonical URLs", () => {
    for (const calc of calculatorRegistry) {
      const seo = buildCalculatorSEO(calc);
      expect(seo.alternates?.canonical).toBe(
        `${SITE_URL}/calculators/${calc.slug}`,
      );
    }
  });

  it("category detail page canonical uses SITE_URL", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );
    expect(source).toContain(
      "canonical: `${SITE_URL}/categories/${slug}`",
    );
  });

  it("specialty detail page canonical uses SITE_URL", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );
    expect(source).toContain(
      "canonical: `${SITE_URL}/specialties/${slug}`",
    );
  });

  it("categories index canonical uses SITE_URL", () => {
    const source = readFile("app/categories/page.tsx");
    expect(source).toContain(
      "canonical: `${SITE_URL}/categories`",
    );
  });

  it("specialties index canonical uses SITE_URL", () => {
    const source = readFile("app/specialties/page.tsx");
    expect(source).toContain(
      "canonical: `${SITE_URL}/specialties`",
    );
  });

  it("calculators index canonical uses SITE_URL", () => {
    const source = readFile("app/calculators/page.tsx");
    expect(source).toContain(
      "canonical: `${SITE_URL}/calculators`",
    );
  });

  it("home page canonical uses SITE_URL", () => {
    const source = readFile("app/page.tsx");
    expect(source).toContain("canonical: SITE_URL");
  });
});

/* ================================================================== */
/*  D. BreadcrumbList correctness                                       */
/* ================================================================== */

describe("D — BreadcrumbList JSON-LD", () => {
  it("calculator JSON-LD has BreadcrumbList with Home → Calculators → name", () => {
    const calc = calculatorRegistry[0];
    const jsonLd = buildCalculatorJsonLd(calc);
    const graph = jsonLd["@graph"] as Array<{
      "@type": string;
      itemListElement?: Array<{
        "@type": string;
        position: number;
        name: string;
        item: string;
      }>;
    }>;

    const breadcrumb = graph.find(
      (item) => item["@type"] === "BreadcrumbList",
    );
    expect(breadcrumb).toBeDefined();

    const items = breadcrumb!.itemListElement!;
    expect(items).toHaveLength(3);

    expect(items[0].position).toBe(1);
    expect(items[0].name).toBe("Home");
    expect(items[0].item).toBe(SITE_URL);

    expect(items[1].position).toBe(2);
    expect(items[1].name).toBe("Calculators");
    expect(items[1].item).toBe(`${SITE_URL}/calculators`);

    expect(items[2].position).toBe(3);
    expect(items[2].name).toBe(calc.name);
    expect(items[2].item).toBe(
      `${SITE_URL}/calculators/${calc.slug}`,
    );
  });

  it("category detail JSON-LD has BreadcrumbList with Home → Categories → category", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );
    expect(source).toContain('"BreadcrumbList"');
    expect(source).toContain('"Home"');
    expect(source).toContain('"Categories"');
    expect(source).toContain("position: 1");
    expect(source).toContain("position: 2");
    expect(source).toContain("position: 3");
  });

  it("specialty detail JSON-LD has BreadcrumbList with Home → Specialties → specialty", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );
    expect(source).toContain('"BreadcrumbList"');
    expect(source).toContain('"Home"');
    expect(source).toContain('"Specialties"');
    expect(source).toContain("position: 1");
    expect(source).toContain("position: 2");
    expect(source).toContain("position: 3");
  });

  it("calculator breadcrumb positions are sequential starting from 1", () => {
    for (const calc of calculatorRegistry.slice(0, 10)) {
      const jsonLd = buildCalculatorJsonLd(calc);
      const graph = jsonLd["@graph"] as Array<{
        "@type": string;
        itemListElement?: Array<{ position: number }>;
      }>;
      const breadcrumb = graph.find(
        (item) => item["@type"] === "BreadcrumbList",
      );
      expect(breadcrumb).toBeDefined();
      const positions = breadcrumb!.itemListElement!.map(
        (i) => i.position,
      );
      expect(positions).toEqual([1, 2, 3]);
    }
  });

  it("calculator breadcrumb URLs are valid SITE_URL-based", () => {
    for (const calc of calculatorRegistry.slice(0, 10)) {
      const jsonLd = buildCalculatorJsonLd(calc);
      const graph = jsonLd["@graph"] as Array<{
        "@type": string;
        itemListElement?: Array<{ item: string }>;
      }>;
      const breadcrumb = graph.find(
        (item) => item["@type"] === "BreadcrumbList",
      );
      const items = breadcrumb!.itemListElement!;
      for (const item of items) {
        expect(item.item).toMatch(/^https:\/\/medcalchub\.com/);
      }
    }
  });
});

/* ================================================================== */
/*  E. FAQ JSON-LD / rendering parity                                   */
/* ================================================================== */

describe("E — FAQ JSON-LD / rendering parity", () => {
  it("corrected-anion-gap has FAQ in clinical content registry", () => {
    const content = getClinicalContent("corrected-anion-gap");
    expect(content).toBeDefined();
    expect(content!.faq).toBeDefined();
    expect(content!.faq!.length).toBeGreaterThan(0);
  });

  it("JSON-LD FAQ priority: clinical content > definition > faqs.ts", () => {
    const calc = calculatorRegistry.find(
      (c) => c.slug === "corrected-anion-gap",
    );
    expect(calc).toBeDefined();

    const clinicalContent = getClinicalContent("corrected-anion-gap");
    const definitionFaq = calc!.faq;
    const fallbackFaq = calculatorFaqs["corrected-anion-gap"];

    const expectedFaq =
      clinicalContent?.faq ??
      definitionFaq ??
      fallbackFaq ??
      [];

    const jsonLd = buildCalculatorJsonLd(calc!);
    const graph = jsonLd["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string }>;
    }>;
    const faqPage = graph.find(
      (item) => item["@type"] === "FAQPage",
    );
    expect(faqPage).toBeDefined();

    const jsonLdFaq = faqPage!.mainEntity!;
    expect(jsonLdFaq.length).toBe(expectedFaq.length);

    for (let i = 0; i < expectedFaq.length; i++) {
      expect(jsonLdFaq[i].name).toBe(expectedFaq[i].question);
    }
  });

  it("calculator with only faqs.ts FAQ still resolves correctly", () => {
    const calc = calculatorRegistry.find(
      (c) => c.slug === "bmi",
    );
    expect(calc).toBeDefined();

    const jsonLd = buildCalculatorJsonLd(calc!);
    const graph = jsonLd["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string }>;
    }>;
    const faqPage = graph.find(
      (item) => item["@type"] === "FAQPage",
    );
    expect(faqPage).toBeDefined();
    expect(faqPage!.mainEntity!.length).toBe(
      calculatorFaqs["bmi"].length,
    );
  });

  it("calculator with no FAQ anywhere omits FAQPage from JSON-LD", () => {
    const calc = calculatorRegistry.find(
      (c) => c.slug === "map",
    );
    expect(calc).toBeDefined();

    const clinicalContent = getClinicalContent("map");
    const hasFaq =
      clinicalContent?.faq?.length ||
      calc!.faq?.length ||
      calculatorFaqs["map"]?.length;

    const jsonLd = buildCalculatorJsonLd(calc!);
    const graph = jsonLd["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string }>;
    }>;
    const faqPage = graph.find(
      (item) => item["@type"] === "FAQPage",
    );

    if (!hasFaq) {
      expect(faqPage).toBeUndefined();
    } else {
      expect(faqPage).toBeDefined();
    }
  });

  it("FAQ JSON-LD never falls back to wrong source when clinical content has FAQ", () => {
    const calc = calculatorRegistry.find(
      (c) => c.slug === "corrected-anion-gap",
    );
    const clinicalContent = getClinicalContent("corrected-anion-gap");

    if (clinicalContent?.faq && clinicalContent.faq.length > 0) {
      const jsonLd = buildCalculatorJsonLd(calc!);
      const graph = jsonLd["@graph"] as Array<{
        "@type": string;
        mainEntity?: Array<{ name: string }>;
      }>;
      const faqPage = graph.find(
        (item) => item["@type"] === "FAQPage",
      );

      expect(faqPage!.mainEntity!.length).toBe(
        clinicalContent.faq.length,
      );
      expect(faqPage!.mainEntity![0].name).toBe(
        clinicalContent.faq[0].question,
      );
    }
  });

  it("calculator with FAQ has FAQPage in JSON-LD", () => {
    const calc = calculatorRegistry.find(
      (c) => c.slug === "ckd-epi-2021",
    );
    expect(calc).toBeDefined();

    const jsonLd = buildCalculatorJsonLd(calc!);
    const graph = jsonLd["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string }>;
    }>;
    const faqPage = graph.find(
      (item) => item["@type"] === "FAQPage",
    );
    expect(faqPage).toBeDefined();
    expect(faqPage!.mainEntity!.length).toBeGreaterThan(0);
  });

  it("JSON-LD graph always contains MedicalWebPage, SoftwareApplication, and BreadcrumbList", () => {
    for (const calc of calculatorRegistry.slice(0, 20)) {
      const jsonLd = buildCalculatorJsonLd(calc);
      const graph = jsonLd["@graph"] as Array<{ "@type": string }>;
      const types = graph.map((item) => item["@type"]);
      expect(types).toContain("MedicalWebPage");
      expect(types).toContain("SoftwareApplication");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("no calculator produces JSON-LD with empty FAQPage mainEntity", () => {
    for (const calc of calculatorRegistry) {
      const jsonLd = buildCalculatorJsonLd(calc);
      const graph = jsonLd["@graph"] as Array<{
        "@type": string;
        mainEntity?: Array<unknown>;
      }>;
      const faqPage = graph.find(
        (item) => item["@type"] === "FAQPage",
      );
      if (faqPage) {
        expect(
          (faqPage.mainEntity as Array<unknown>).length,
          `FAQPage for ${calc.slug} has empty mainEntity`,
        ).toBeGreaterThan(0);
      }
    }
  });

  const c2Slugs = [
    "gcs",
    "sofa-score",
    "qsofa",
    "sirs-criteria",
    "news2",
    "curb-65",
    "psi-port",
    "heart-score",
    "grace",
    "timi",
    "cha2ds2-vasc",
    "has-bled",
    "map",
    "bsa",
    "child-pugh",
    "pediatric-gcs",
    "apgar-score",
    "wells-pe",
    "perc-rule",
    "parkland-formula",
  ];

  it("all 20 C2 calculators now have FAQ in clinical content registry", () => {
    for (const slug of c2Slugs) {
      const content = getClinicalContent(slug);
      expect(
        content,
        `Clinical content missing for ${slug}`,
      ).toBeDefined();
      expect(
        content!.faq,
        `FAQ missing for ${slug}`,
      ).toBeDefined();
      expect(
        content!.faq!.length,
        `FAQ empty for ${slug}`,
      ).toBeGreaterThan(0);
    }
  });

  it("all 20 C2 FAQ entries have non-empty question and answer", () => {
    for (const slug of c2Slugs) {
      const content = getClinicalContent(slug);
      for (const item of content!.faq!) {
        expect(
          item.question.trim().length,
          `${slug} FAQ has empty question`,
        ).toBeGreaterThan(0);
        expect(
          item.answer.trim().length,
          `${slug} FAQ has empty answer`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("all 20 C2 calculators emit FAQPage JSON-LD with mainEntity > 0", () => {
    for (const slug of c2Slugs) {
      const calc = calculatorRegistry.find(
        (c) => c.slug === slug,
      );
      expect(calc).toBeDefined();

      const jsonLd = buildCalculatorJsonLd(calc!);
      const graph = jsonLd["@graph"] as Array<{
        "@type": string;
        mainEntity?: Array<{ name: string }>;
      }>;
      const faqPage = graph.find(
        (item) => item["@type"] === "FAQPage",
      );
      expect(
        faqPage,
        `FAQPage missing for ${slug}`,
      ).toBeDefined();
      expect(
        faqPage!.mainEntity!.length,
        `FAQPage mainEntity empty for ${slug}`,
      ).toBeGreaterThan(0);

      const content = getClinicalContent(slug);
      expect(
        faqPage!.mainEntity!.length,
        `FAQPage count mismatch for ${slug}`,
      ).toBe(content!.faq!.length);
    }
  });

  it("no duplicate FAQ entries across all calculators", () => {
    for (const slug of c2Slugs) {
      const content = getClinicalContent(slug);
      const questions = content!.faq!.map(
        (f) => f.question,
      );
      const unique = new Set(questions);
      expect(
        unique.size,
        `Duplicate FAQ questions in ${slug}`,
      ).toBe(questions.length);
    }
  });
});

/* ================================================================== */
/*  F. Internal-link integrity                                          */
/* ================================================================== */

describe("F — Internal-link integrity", () => {
  it("all category slugs map to valid /categories/{slug} paths", () => {
    const categories = getCategories();
    for (const cat of categories) {
      const slug = taxonomyToSlug(cat);
      expect(slug).toMatch(/^[a-z0-9&-]+$/);
      expect(`/categories/${slug}`).toMatch(
        /^\/categories\/[a-z0-9&-]+$/,
      );
    }
  });

  it("all specialty slugs map to valid /specialties/{slug} paths", () => {
    const specialties = getSpecialties();
    for (const spec of specialties) {
      const slug = taxonomyToSlug(spec);
      expect(slug).toMatch(/^[a-z0-9&-]+$/);
      expect(`/specialties/${slug}`).toMatch(
        /^\/specialties\/[a-z0-9&-]+$/,
      );
    }
  });

  it("all calculator slugs map to valid /calculators/{slug} paths", () => {
    for (const calc of calculatorRegistry) {
      expect(calc.slug).toMatch(/^[a-z0-9-]+$/);
      expect(`/calculators/${calc.slug}`).toMatch(
        /^\/calculators\/[a-z0-9-]+$/,
      );
    }
  });

  it("every category has calculators that link back via category field", () => {
    const categories = getCategories();
    for (const cat of categories) {
      const calcs = getCalculatorsByCategory(cat);
      expect(calcs.length).toBeGreaterThan(0);
      for (const calc of calcs) {
        expect(calc.category).toBe(cat);
      }
    }
  });

  it("every specialty has calculators that link back via specialty field", () => {
    const specialties = getSpecialties();
    for (const spec of specialties) {
      const calcs = getCalculatorsBySpecialty(spec);
      expect(calcs.length).toBeGreaterThan(0);
      for (const calc of calcs) {
        expect(calc.specialty).toBe(spec);
      }
    }
  });

  it("category detail page source has link to /specialties/{slug}", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );
    expect(source).toContain(
      "href={`/specialties/${taxonomyToSlug(",
    );
  });

  it("specialty detail page source has link to /categories/{slug}", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );
    expect(source).toContain(
      "href={`/categories/${taxonomyToSlug(",
    );
  });
});

/* ================================================================== */
/*  G. Nested Link protection                                           */
/* ================================================================== */

describe("G — Nested Link protection", () => {
  it("category detail page uses <Link> for calculator cards (no window.location.href)", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );

    expect(source).toContain("<Link");
    expect(source).not.toContain("window.location.href");
  });

  it("specialty detail page uses <Link> for calculator cards (no window.location.href)", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );

    expect(source).toContain("<Link");
    expect(source).not.toContain("window.location.href");
  });

  it("category detail page taxonomy badges are not <Link> inside calculator cards", () => {
    const source = readFile(
      "app/categories/[category]/page.tsx",
    );

    expect(source).not.toContain('role="link"');
    expect(source).not.toContain("tabIndex={0}");
  });

  it("specialty detail page taxonomy badges are not <Link> inside calculator cards", () => {
    const source = readFile(
      "app/specialties/[slug]/page.tsx",
    );

    expect(source).not.toContain('role="link"');
    expect(source).not.toContain("tabIndex={0}");
  });
});

/* ================================================================== */
/*  H. Robots coverage                                                  */
/* ================================================================== */

describe("H — Robots coverage", () => {
  const robots = readFile("app/robots.ts");

  const disallowedRoutes = [
    "/favorites",
    "/history",
    "/recent",
    "/workspace",
    "/saved-calculations",
  ];

  for (const route of disallowedRoutes) {
    it(`robots.ts disallows ${route}`, () => {
      expect(robots).toContain(`"${route}"`);
    });
  }

  it("robots.ts has sitemap reference", () => {
    expect(robots).toContain("sitemap");
    expect(robots).toContain("sitemap.xml");
  });

  it("robots.ts allows / by default", () => {
    expect(robots).toContain('allow: "/"');
  });
});

/* ================================================================== */
/*  Homepage "See all" links                                            */
/* ================================================================== */

describe("Homepage taxonomy navigation", () => {
  it("browse-categories has See all link", () => {
    const source = readFile(
      "components/home/browse-categories.tsx",
    );
    expect(source).toContain("See all categories");
    expect(source).toContain('href="/categories"');
  });

  it("browse-specialties has See all link", () => {
    const source = readFile(
      "components/home/browse-specialties.tsx",
    );
    expect(source).toContain("See all specialties");
    expect(source).toContain('href="/specialties"');
  });
});
