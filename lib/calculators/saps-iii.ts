import type { CalculatorDefinition } from "./calculator.types";

export const sapsIiiCalculator: CalculatorDefinition = {
  id: "saps-iii",
  slug: "saps-iii",
  name: "SAPS III",
  shortName: "SAPS III",
  description:
    "A simplified educational estimate of ICU severity that emphasizes age, physiology, and organ dysfunction.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["SAPS III", "Critical Care", "ICU", "Severity"],
  warnings: [
    "This calculator is an educational approximation and should not replace validated SAPS III methods.",
  ],
  formula: "Approximate SAPS III-style score = age points + GCS penalty + renal penalty + hemodynamic penalty",
  normalRange: "<25 points",
  referenceRanges: [
    { label: "Low", range: "<25" },
    { label: "Moderate", range: "25–45" },
    { label: "High", range: ">45" },
  ],
  clinicalNotes:
    "Higher scores suggest greater severity and a higher likelihood of adverse ICU outcomes.",
  references: ["Moreno RP, et al. Intensive Care Med. 2005.", "ICU scoring"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 16, max: 120, step: 1 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "map", label: "Mean Arterial Pressure", type: "number", unit: "mmHg", required: true, min: 20, max: 200, step: 1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const gcs = parseFloat(values.gcs);
    const map = parseFloat(values.map);
    const creatinine = parseFloat(values.creatinine);

    let score = 0;
    if (age >= 50) score += 6;
    if (age >= 70) score += 10;
    if (age >= 80) score += 14;
    if (gcs < 15) score += (15 - gcs) * 2;
    if (map < 70) score += 5;
    if (creatinine > 1.5) score += Math.min(16, Math.round((creatinine - 1.5) * 4));

    let interpretation = "Low severity";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 45) {
      interpretation = "High severity";
      status = "critical";
    } else if (score > 25) {
      interpretation = "Moderate severity";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
