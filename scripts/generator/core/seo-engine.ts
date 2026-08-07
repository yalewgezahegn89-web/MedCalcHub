/**
 * SEO Metadata Engine
 *
 * Generates complete SEO metadata for every calculator
 * using the existing Navigation Engine and Knowledge Base.
 *
 * This engine MUST NOT modify calculator logic,
 * templates, parser, dispatcher, formula builders,
 * or generated calculator code.
 *
 * It only generates SEO metadata.
 */

import {
  calculatorKnowledge,
} from "../knowledge";
import {
  buildNavigation,
} from "./navigation";
import type {
  CalculatorNavigation,
} from "./navigation";
import {
  buildDependencyGraph,
} from "./dependency-graph";
import type {
  DependencyGraph,
} from "./dependency-graph";
import type {
  CalculatorSuggestion,
} from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  slug: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    image: string;
    type: "website";
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    medicalWebPage: Record<string, unknown>;
    breadcrumbList: Record<string, unknown>;
    faqPage?: Record<string, unknown>;
  };
}

export interface SeoMap {
  calculators: Record<string, SeoMetadata>;
}

// ─────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────

const BASE_URL = "https://medcalchub.com";
const DEFAULT_IMAGE = `${BASE_URL}/og/default.png`;
const DESCRIPTION_MAX = 160;

// ─────────────────────────────────────────────────
// SEO Builder
// ─────────────────────────────────────────────────

/**
 * Build complete SEO metadata for all calculators.
 */
export function buildSeoMetadata(): SeoMap {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  const navigation = buildNavigation();
  const graph: DependencyGraph =
    buildDependencyGraph();

  const calculators: Record<
    string,
    SeoMetadata
  > = {};

  // Sort slugs for deterministic output
  const allSlugs = Object.keys(knowledge).sort();

  for (const slug of allSlugs) {
    const entry = knowledge[slug];
    const nav: CalculatorNavigation =
      navigation.calculators[slug] ?? {
        related: [],
        breadcrumbs: ["Home", "Calculator"],
        seeAlso: [],
      };

    const category =
      entry.category || "Medical";
    const specialty = entry.specialty || "";
    const displayName =
      formatDisplayName(slug);

    // ── Title ──
    const title = `${displayName} Calculator | MedCalcHub`;

    // ── Description ──
    const description = buildDescription(
      entry,
      displayName,
    );

    // ── Keywords ──
    const keywords = buildKeywords(
      entry,
      displayName,
      category,
      specialty,
    );

    // ── Canonical URL ──
    const canonical = `${BASE_URL}/calculators/${slug}`;

    // ── Open Graph ──
    const openGraph = {
      title,
      description,
      url: canonical,
      image: DEFAULT_IMAGE,
      type: "website" as const,
    };

    // ── Twitter Card ──
    const twitter = {
      card: "summary_large_image" as const,
      title,
      description,
      image: DEFAULT_IMAGE,
    };

    // ── Structured Data ──
    const structuredData = buildStructuredData(
      slug,
      displayName,
      description,
      canonical,
      category,
      nav,
      entry,
    );

    calculators[slug] = {
      title,
      description,
      keywords,
      canonical,
      slug,
      openGraph,
      twitter,
      structuredData,
    };
  }

  return { calculators };
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

/**
 * Build description with priority on knowledge description.
 * Limit to 150–160 characters.
 */
function buildDescription(
  entry: CalculatorSuggestion,
  displayName: string,
): string {
  if (entry.description) {
    const desc = entry.description;
    if (desc.length <= DESCRIPTION_MAX) {
      return desc;
    }
    // Truncate to nearest word within limit
    return truncateToWord(desc, DESCRIPTION_MAX);
  }

  return (
    `Calculate ${displayName} instantly using evidence-based ` +
    `clinical formulas. Free medical calculator from MedCalcHub.`
  );
}

/**
 * Truncate a string to the nearest word boundary
 * within the given character limit.
 */
function truncateToWord(
  text: string,
  maxLen: number,
): string {
  if (text.length <= maxLen) {
    return text;
  }
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace);
  }
  return truncated;
}

/**
 * Build keyword array: combine calculator name,
 * category, specialty, common aliases, and generic terms.
 * Remove duplicates. Sort alphabetically.
 */
function buildKeywords(
  entry: CalculatorSuggestion,
  displayName: string,
  category: string,
  specialty: string,
): string[] {
  const set = new Set<string>();

  // Calculator name words
  const nameWords = displayName
    .toLowerCase()
    .split(/\s+/);
  for (const word of nameWords) {
    if (word.length > 2) {
      set.add(word);
    }
  }

  // Full calculator name
  set.add(displayName.toLowerCase());

  // Category
  if (category) {
    set.add(category.toLowerCase());
  }

  // Specialty
  if (specialty) {
    set.add(specialty.toLowerCase());
  }

  // Existing knowledge keywords
  if (entry.keywords) {
    for (const kw of entry.keywords) {
      set.add(kw.toLowerCase());
    }
  }

  // Common aliases
  set.add("medical calculator");
  set.add("clinical calculator");
  set.add("medcalchub");

  return [...set].sort();
}

/**
 * Build JSON-LD structured data for the calculator.
 */
function buildStructuredData(
  slug: string,
  displayName: string,
  description: string,
  canonical: string,
  category: string,
  nav: CalculatorNavigation,
  entry: CalculatorSuggestion,
): SeoMetadata["structuredData"] {
  // MedicalWebPage
  const medicalWebPage: Record<
    string,
    unknown
  > = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${displayName} Calculator`,
    description,
    url: canonical,
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "HealthProfessional",
    },
    publisher: {
      "@type": "Organization",
      name: "MedCalcHub",
      url: BASE_URL,
    },
  };

  // BreadcrumbList from navigation breadcrumbs
  const breadcrumbItems = nav.breadcrumbs.map(
    (crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb,
      item:
        index < nav.breadcrumbs.length - 1
          ? undefined
          : canonical,
    }),
  );

  const breadcrumbList: Record<
    string,
    unknown
  > = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // FAQ Schema (only if FAQ exists)
  let faqPage:
    | Record<string, unknown>
    | undefined;

  if (entry.faq && entry.faq.length > 0) {
    const faqEntities = (
      entry.faq as readonly {
        question: string;
        answer: string;
      }[]
    ).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }));

    faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    };
  }

  return {
    medicalWebPage,
    breadcrumbList,
    ...(faqPage ? { faqPage } : {}),
  };
}

/**
 * Convert a slug like "anion-gap" to "Anion Gap".
 */
function formatDisplayName(
  slug: string,
): string {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

// ─────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────

/**
 * Print a formatted SEO metadata report to the console.
 */
export function printSeoReport(): void {
  const seo = buildSeoMetadata();
  const nav = buildNavigation();

  const line = "═".repeat(50);

  const slugs =
    Object.keys(seo.calculators).sort();
  const count = slugs.length;

  let metadataCount = 0;
  let openGraphCount = 0;
  let twitterCount = 0;
  let breadcrumbCount = 0;
  let faqCount = 0;
  let missingDesc = 0;
  let missingCanonical = 0;

  for (const slug of slugs) {
    const entry = seo.calculators[slug];

    if (entry.title && entry.description) {
      metadataCount++;
    }
    if (entry.openGraph) {
      openGraphCount++;
    }
    if (entry.twitter) {
      twitterCount++;
    }
    if (entry.structuredData.breadcrumbList) {
      breadcrumbCount++;
    }
    if (entry.structuredData.faqPage) {
      faqCount++;
    }
    if (!entry.description) {
      missingDesc++;
    }
    if (!entry.canonical) {
      missingCanonical++;
    }
  }

  console.log("");
  console.log(line);
  console.log("  SEO Metadata Report");
  console.log(line);
  console.log("");
  console.log(
    `  Calculators            ${count}`,
  );
  console.log(
    `  Metadata Generated     ${metadataCount}`,
  );
  console.log(
    `  OpenGraph              ${openGraphCount}`,
  );
  console.log(
    `  Twitter Cards          ${twitterCount}`,
  );
  console.log(
    `  Breadcrumb Schema      ${breadcrumbCount}`,
  );
  console.log(
    `  FAQ Schema             ${faqCount}`,
  );
  console.log(
    `  Missing Descriptions   ${missingDesc}`,
  );
  console.log(
    `  Missing Canonical      ${missingCanonical}`,
  );
  console.log("");
  console.log(line);
  console.log("");
}