import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

import { guideRegistry } from "./registry";
import type { GuideDefinition } from "./guide.types";

export { guideRegistry } from "./registry";
export type {
  GuideDefinition,
  GuidePublication,
  GuideSection,
} from "./guide.types";

export function getGuides(): GuideDefinition[] {
  return guideRegistry;
}

export function getGuide(slug: string): GuideDefinition | undefined {
  return guideRegistry.find((guide) => guide.slug === slug);
}

export function getRelatedCalculators(
  guide: GuideDefinition,
): CalculatorDefinition[] {
  return guide.relatedCalculators
    .map((slug) =>
      calculatorRegistry.find((calculator) => calculator.slug === slug),
    )
    .filter(
      (calculator): calculator is CalculatorDefinition =>
        calculator !== undefined,
    );
}

export function getRelatedGuide(
  guide: GuideDefinition,
  relatedId: string,
): GuideDefinition | undefined {
  return guideRegistry.find(
    (candidate) => candidate.id === relatedId && relatedId !== guide.id,
  );
}

export function getGuidesForCalculator(slug: string): GuideDefinition[] {
  return guideRegistry.filter((guide) =>
    guide.relatedCalculators.includes(slug),
  );
}

export function getGuidesForCategory(category: string): GuideDefinition[] {
  return guideRegistry.filter((guide) => guide.category === category);
}

export function getGuidesForSpecialty(specialty: string): GuideDefinition[] {
  return guideRegistry.filter((guide) => guide.specialty === specialty);
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatGuideDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  const monthName = MONTH_NAMES[month - 1];
  if (!monthName) return isoDate;
  return `${monthName} ${day}, ${year}`;
}

export function buildGuideJsonLd(guide: GuideDefinition) {
  const url = `${SITE_URL}/guides/${guide.slug}`;

  const medicalWebPage: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    name: guide.title,
    description: guide.summary,
    url,
    datePublished: guide.publication.publishedAt,
    dateModified: guide.publication.updatedAt,
  };

  if (guide.category) {
    medicalWebPage.about = guide.category;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      medicalWebPage,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${SITE_URL}/guides`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function buildGuideIndexJsonLd(guides: GuideDefinition[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "MedCalcHub Guides",
        description:
          "Educational guides to the MedCalcHub calculator library: how related calculators differ, how to use them together, and their real sources.",
        url: `${SITE_URL}/guides`,
        isPartOf: {
          "@type": "WebSite",
          name: "MedCalcHub",
          url: SITE_URL,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `${SITE_URL}/guides/${guide.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${SITE_URL}/guides`,
          },
        ],
      },
    ],
  };
}