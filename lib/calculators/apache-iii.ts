import type { CalculatorDefinition } from "./calculator.types";

export const apacheIiiCalculator: CalculatorDefinition = {
  id: "apache-iii",
  slug: "apache-iii",
  name: "APACHE III",
  shortName: "APACHE III",
  description:
    "A simplified educational estimate of ICU severity using age, neurological status, renal function, and hemodynamics.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["APACHE III", "Critical Care", "ICU", "Severity"],
  warnings: [
    "This is an educational approximation and should not replace formal APACHE III scoring or clinical judgment.",
  ],
  formula:
    "Approximate APACHE III-style score = age points + GCS penalty + renal penalty + hemodynamic penalty",
  normalRange: "<30 points",
  referenceRanges: [
    { label: "Low", range: "<30" },
    { label: "Moderate", range: "30–50" },
    { label: "High", range: ">50" },
  ],
  clinicalNotes:
    "Higher scores imply greater illness severity and may be associated with higher mortality risk.",
  references: ["Knaus WA, et al. Crit Care Med. 1991.", "ICU severity scoring"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 16, max: 120, step: 1 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "map", label: "Mean Arterial Pressure", type: "number", unit: "mmHg", required: true, min: 20, max: 200, step: 1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
    { id: "sodium", label: "Serum Sodium", type: "number", unit: "mmol/L", required: true, min: 120, max: 170, step: 1 },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const gcs = parseFloat(values.gcs);
    const map = parseFloat(values.map);
    const creatinine = parseFloat(values.creatinine);
    const sodium = parseFloat(values.sodium);

    let score = 0;
    if (age >= 50) score += 5;
    if (age >= 70) score += 8;
    if (age >= 80) score += 12;
    if (gcs < 15) score += (15 - gcs) * 2;
    if (map < 70) score += 5;
    if (creatinine > 1.5) score += Math.min(15, Math.round((creatinine - 1.5) * 6));
    if (sodium < 130 || sodium > 150) score += 4;

    let interpretation = "Low severity";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 50) {
      interpretation = "High severity";
      status = "critical";
    } else if (score > 30) {
      interpretation = "Moderate severity";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
