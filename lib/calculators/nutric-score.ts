import type { CalculatorDefinition } from "./calculator.types";

export const nutricScoreCalculator: CalculatorDefinition = {
  id: "nutric-score",
  slug: "nutric-score",
  name: "NUTRIC Score",
  shortName: "NUTRIC",
  description:
    "A simplified educational estimate of nutritional risk in ICU patients.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["NUTRIC", "Critical Care", "Nutrition", "ICU"],
  warnings: [
    "This is an educational approximation and should not replace formal nutritional risk assessment.",
  ],
  formula: "NUTRIC = age + APACHE II-like severity + SOFA-like organ dysfunction + comorbidity + ICU length of stay",
  normalRange: "0–3 points",
  referenceRanges: [
    { label: "Low risk", range: "0–3" },
    { label: "Moderate risk", range: "4–5" },
    { label: "High risk", range: ">5" },
  ],
  clinicalNotes:
    "Higher scores suggest greater nutritional risk and potential benefit from aggressive nutrition support.",
  references: ["Heyland DK, et al. JPEN. 2011.", "ICU nutrition"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 16, max: 120, step: 1 },
    { id: "apache", label: "APACHE II score", type: "number", required: true, min: 0, max: 60, step: 1 },
    { id: "sofa", label: "SOFA score", type: "number", required: true, min: 0, max: 24, step: 1 },
    { id: "comorbidity", label: "Comorbidity", type: "select", required: true, options: [{ label: "None", value: "none" }, { label: "Yes", value: "yes" }] },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const apache = parseFloat(values.apache);
    const sofa = parseFloat(values.sofa);
    const comorbidity = values.comorbidity === "yes";

    let score = 0;
    if (age >= 50) score += 1;
    if (apache >= 15) score += 1;
    if (sofa >= 6) score += 1;
    if (comorbidity) score += 1;

    let interpretation = "Low nutritional risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 5) {
      interpretation = "High nutritional risk";
      status = "critical";
    } else if (score > 3) {
      interpretation = "Moderate nutritional risk";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
