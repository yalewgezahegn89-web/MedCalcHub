export interface CalculatorSuggestion {
  category: string;
  specialty: string;
  description: string;
  formula: string;
  normalRange: string;
  keywords: string[];
}

const presets: Record<
  string,
  CalculatorSuggestion
> = {
  bmi: {
    category: "Anthropometry",
    specialty: "General Medicine",
    description:
      "Calculates Body Mass Index for adult patients.",
    formula:
      "BMI = weight / height²",
    normalRange:
      "18.5–24.9 kg/m²",
    keywords: [
      "bmi",
      "body mass index",
      "obesity",
      "weight",
      "height",
    ],
  },

  bsa: {
    category: "Anthropometry",
    specialty: "General Medicine",
    description:
      "Calculates Body Surface Area (Mosteller formula).",
    formula:
      "BSA = √((height × weight) / 3600)",
    normalRange:
      "Typical adult: 1.4–2.2 m²",
    keywords: [
      "bsa",
      "body surface area",
      "mosteller",
      "height",
      "weight",
    ],
  },
};

export function suggestCalculator(
  calculatorName: string,
): Partial<CalculatorSuggestion> {
  const key = calculatorName
    .toLowerCase()
    .replace(" calculator", "")
    .trim();

  return presets[key] ?? {};
}