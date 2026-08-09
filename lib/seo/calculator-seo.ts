import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import { SITE_URL } from "@/lib/site-url";

export function buildCalculatorSEO(
  calculator: CalculatorDefinition,
) {
  const displayName = `${calculator.name} Calculator`;

  const description =
    calculator.description.length > 160
      ? calculator.description.slice(0, 157) + "..."
      : calculator.description;

  const keywords = [
    calculator.name,
    calculator.category,
    calculator.specialty,
    ...(calculator.keywords ?? []),
  ]
    .filter(Boolean)
    .join(", ");

  const canonicalUrl = `${SITE_URL}/calculators/${calculator.slug}`;

  return {
    title: {
      absolute: `${displayName} | MedCalcHub`,
    },
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `${displayName} | MedCalcHub`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "MedCalcHub",
    },

    twitter: {
      card: "summary_large_image",
      title: `${displayName} | MedCalcHub`,
      description,
    },
  };
}
