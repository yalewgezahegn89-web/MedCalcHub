import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

export function buildCalculatorSEO(
  calculator: CalculatorDefinition,
) {
  const title = `${calculator.name} Calculator | MedCalcHub`;

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

  return {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      type: "website",
      siteName: "MedCalcHub",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}