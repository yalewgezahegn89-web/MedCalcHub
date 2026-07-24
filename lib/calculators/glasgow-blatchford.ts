import type { CalculatorDefinition } from "./calculator.types";

export const glasgowBlatchfordCalculator: CalculatorDefinition = {
  id: "glasgow-blatchford",
  slug: "glasgow-blatchford",
  name: "Glasgow-Blatchford",
  shortName: "GBS",
  description:
    "A simplified educational estimate of risk of adverse outcomes in upper gastrointestinal bleeding.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["Glasgow-Blatchford", "Bleeding", "Critical Care", "Risk"],
  warnings: [
    "This is an educational approximation and should not replace full clinical assessment.",
  ],
  formula: "GBS = sum of hemodynamic, lab, and comorbidity points",
  normalRange: "0–1 points",
  referenceRanges: [
    { label: "Low risk", range: "0–1" },
    { label: "Moderate risk", range: "2–6" },
    { label: "High risk", range: ">6" },
  ],
  clinicalNotes:
    "Higher scores suggest greater risk of adverse outcomes in upper GI bleeding.",
  references: ["Blatchford O, et al. Lancet. 2000.", "GI bleeding risk"],
  inputs: [
    { id: "bun", label: "BUN", type: "number", unit: "mg/dL", required: true, min: 5, max: 200, step: 1 },
    { id: "hemoglobin", label: "Hemoglobin", type: "number", unit: "g/dL", required: true, min: 3, max: 20, step: 0.1 },
    { id: "systolic", label: "Systolic BP", type: "number", unit: "mmHg", required: true, min: 50, max: 220, step: 1 },
    { id: "heartRate", label: "Heart Rate", type: "number", unit: "bpm", required: true, min: 40, max: 180, step: 1 },
    { id: "melena", label: "Melena", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
  ],
  calculate(values) {
    const bun = parseFloat(values.bun);
    const hemoglobin = parseFloat(values.hemoglobin);
    const systolic = parseFloat(values.systolic);
    const heartRate = parseFloat(values.heartRate);
    const melena = values.melena === "yes";

    let score = 0;
    if (bun >= 25) score += 3;
    if (hemoglobin < 7) score += 6;
    if (hemoglobin < 8) score += 3;
    if (hemoglobin < 10) score += 1;
    if (systolic < 100) score += 3;
    if (heartRate >= 100) score += 1;
    if (melena) score += 1;

    let interpretation = "Low risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 6) {
      interpretation = "High risk";
      status = "critical";
    } else if (score > 1) {
      interpretation = "Intermediate risk";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
