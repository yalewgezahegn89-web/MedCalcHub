import type { CalculatorDefinition } from "./calculator.types";

export const sapsIiCalculator: CalculatorDefinition = {
  id: "saps-ii",
  slug: "saps-ii",
  name: "SAPS II",
  shortName: "SAPS II",
  description:
    "A simplified educational estimate of ICU mortality risk using physiology and age.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["SAPS II", "Critical Care", "ICU", "Mortality"],
  warnings: [
    "This calculator provides an educational approximation and is not a validated replacement for formal SAPS II scoring.",
  ],
  formula: "Approximate SAPS II-style score = age points + physiological points + chronic disease points",
  normalRange: "<20 points",
  referenceRanges: [
    { label: "Low", range: "<20" },
    { label: "Moderate", range: "20–40" },
    { label: "High", range: ">40" },
  ],
  clinicalNotes:
    "Higher scores are associated with greater ICU mortality risk.",
  references: ["Le Gall JR, et al. JAMA. 1993.", "ICU scoring"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 16, max: 120, step: 1 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "map", label: "Mean Arterial Pressure", type: "number", unit: "mmHg", required: true, min: 20, max: 200, step: 1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
    { id: "chronicDisease", label: "Chronic disease", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const gcs = parseFloat(values.gcs);
    const map = parseFloat(values.map);
    const creatinine = parseFloat(values.creatinine);
    const chronicDisease = values.chronicDisease === "yes";

    let score = 0;
    if (age >= 40) score += 5;
    if (age >= 60) score += 7;
    if (age >= 80) score += 10;
    if (gcs < 15) score += (15 - gcs) * 2;
    if (map < 70) score += 6;
    if (creatinine > 1.5) score += Math.min(12, Math.round((creatinine - 1.5) * 4));
    if (chronicDisease) score += 5;

    let interpretation = "Low risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 40) {
      interpretation = "High mortality risk";
      status = "critical";
    } else if (score > 20) {
      interpretation = "Moderate mortality risk";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
