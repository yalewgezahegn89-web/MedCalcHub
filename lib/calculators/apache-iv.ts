import type { CalculatorDefinition } from "./calculator.types";

export const apacheIvCalculator: CalculatorDefinition = {
  id: "apache-iv",
  slug: "apache-iv",
  name: "APACHE IV",
  shortName: "APACHE IV",
  description:
    "A simplified educational estimate of ICU severity designed to reflect modern ICU severity scoring concepts.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["APACHE IV", "Critical Care", "ICU", "Severity"],
  warnings: [
    "This is an educational approximation and not a substitute for formal APACHE IV scoring.",
  ],
  formula: "Approximate APACHE IV-style score = age + GCS penalty + creatinine penalty + hemodynamic penalty",
  normalRange: "<35 points",
  referenceRanges: [
    { label: "Low", range: "<35" },
    { label: "Moderate", range: "35–55" },
    { label: "High", range: ">55" },
  ],
  clinicalNotes:
    "Higher scores suggest greater illness severity and higher mortality risk.",
  references: ["Zimmerman JE, et al. Crit Care Med. 2006.", "ICU scoring"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 16, max: 120, step: 1 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
    { id: "map", label: "Mean Arterial Pressure", type: "number", unit: "mmHg", required: true, min: 20, max: 200, step: 1 },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const gcs = parseFloat(values.gcs);
    const creatinine = parseFloat(values.creatinine);
    const map = parseFloat(values.map);

    let score = Math.min(20, age >= 60 ? 10 : 0);
    if (gcs < 15) score += (15 - gcs) * 2;
    if (creatinine > 1.5) score += Math.min(15, Math.round((creatinine - 1.5) * 5));
    if (map < 70) score += 6;

    let interpretation = "Low severity";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 55) {
      interpretation = "High severity";
      status = "critical";
    } else if (score > 35) {
      interpretation = "Moderate severity";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
