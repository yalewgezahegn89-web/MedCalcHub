import type { CalculatorDefinition } from "./calculator.types";

export const lordsScoreCalculator: CalculatorDefinition = {
  id: "lods-score",
  slug: "lods-score",
  name: "LODS Score",
  shortName: "LODS",
  description:
    "A simplified educational estimate of organ dysfunction using common laboratory and clinical parameters.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["LODS", "Critical Care", "Organ dysfunction", "ICU"],
  warnings: [
    "This is an educational approximation and should not replace formal organ dysfunction scoring.",
  ],
  formula: "LODS = sum of dysfunction points from pulmonary, hepatic, renal, and coagulation systems",
  normalRange: "0–2 points",
  referenceRanges: [
    { label: "Low", range: "0–2" },
    { label: "Moderate", range: "3–6" },
    { label: "High", range: ">6" },
  ],
  clinicalNotes:
    "Higher values indicate more severe organ dysfunction.",
  references: ["Le Gall JR, et al. Intensive Care Med. 1996.", "ICU organ dysfunction"],
  inputs: [
    { id: "pao2", label: "PaO2", type: "number", unit: "mmHg", required: true, min: 50, max: 200, step: 1 },
    { id: "bilirubin", label: "Serum Bilirubin", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 20, step: 0.1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
    { id: "platelets", label: "Platelets", type: "number", unit: "×10^3/µL", required: true, min: 10, max: 800, step: 1 },
  ],
  calculate(values) {
    const pao2 = parseFloat(values.pao2);
    const bilirubin = parseFloat(values.bilirubin);
    const creatinine = parseFloat(values.creatinine);
    const platelets = parseFloat(values.platelets);

    let score = 0;
    if (pao2 < 80) score += 1;
    if (bilirubin > 2) score += 1;
    if (creatinine > 1.5) score += 1;
    if (platelets < 100) score += 1;

    let interpretation = "Low organ dysfunction";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 6) {
      interpretation = "Severe organ dysfunction";
      status = "critical";
    } else if (score > 2) {
      interpretation = "Moderate organ dysfunction";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
