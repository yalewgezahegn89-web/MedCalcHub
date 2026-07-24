import type { CalculatorDefinition } from "./calculator.types";

export const meldNaCalculator: CalculatorDefinition = {
  id: "meld-na",
  slug: "meld-na",
  name: "MELD-Na",
  shortName: "MELD-Na",
  description:
    "A simplified educational estimate of mortality risk in cirrhosis with sodium adjustment.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["MELD-Na", "Cirrhosis", "Critical Care", "Liver"],
  warnings: [
    "This is an educational approximation and should not replace formal MELD-Na calculation or clinical judgment.",
  ],
  formula: "MELD-Na = MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)]",
  normalRange: "<10",
  referenceRanges: [
    { label: "Low", range: "<10" },
    { label: "Moderate", range: "10–19" },
    { label: "High", range: ">19" },
  ],
  clinicalNotes:
    "Higher MELD-Na values reflect greater short-term mortality risk in cirrhosis.",
  references: ["Kim WR, et al. Gastroenterology. 2008.", "Liver transplant risk"],
  inputs: [
    { id: "bilirubin", label: "Serum Bilirubin", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 30, step: 0.1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 10, step: 0.1 },
    { id: "inr", label: "INR", type: "number", required: true, min: 1, max: 5, step: 0.1 },
    { id: "sodium", label: "Serum Sodium", type: "number", unit: "mmol/L", required: true, min: 120, max: 150, step: 1 },
  ],
  calculate(values) {
    const bilirubin = parseFloat(values.bilirubin);
    const creatinine = parseFloat(values.creatinine);
    const inr = parseFloat(values.inr);
    const sodium = parseFloat(values.sodium);

    const meld = 9.57 * Math.log(Math.max(creatinine, 1)) + 3.78 * Math.log(Math.max(bilirubin, 1)) + 11.2 * Math.log(Math.max(inr, 1)) + 6.43;
    const meldNa = meld + 1.32 * (137 - sodium) - 0.033 * meld * (137 - sodium);
    const rounded = Math.round(meldNa * 10) / 10;

    let interpretation = "Low mortality risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (rounded > 19) {
      interpretation = "High mortality risk";
      status = "critical";
    } else if (rounded > 9) {
      interpretation = "Moderate mortality risk";
      status = "high";
    }

    return { value: rounded, unit: "points", interpretation, status };
  },
};
