import type { CalculatorDefinition } from "./calculator.types";

export const modsScoreCalculator: CalculatorDefinition = {
  id: "mods-score",
  slug: "mods-score",
  name: "MODS Score",
  shortName: "MODS",
  description:
    "A simplified educational estimate of multiple organ dysfunction using common organ system variables.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["MODS", "Critical Care", "Organ dysfunction", "ICU"],
  warnings: [
    "This is an educational approximation and should not replace formal organ dysfunction assessment.",
  ],
  formula: "MODS = sum of organ system dysfunction points",
  normalRange: "0–2 points",
  referenceRanges: [
    { label: "No dysfunction", range: "0–2" },
    { label: "Moderate dysfunction", range: "3–7" },
    { label: "Severe dysfunction", range: ">7" },
  ],
  clinicalNotes:
    "Higher scores indicate more extensive organ dysfunction.",
  references: ["Marshall JC, et al. JAMA. 1995.", "ICU organ dysfunction"],
  inputs: [
    { id: "respiratory", label: "PaO2/FiO2 ratio", type: "number", unit: "ratio", required: true, min: 50, max: 500, step: 1 },
    { id: "renal", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.2, max: 10, step: 0.1 },
    { id: "liver", label: "Serum Bilirubin", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 20, step: 0.1 },
    { id: "platelets", label: "Platelets", type: "number", unit: "×10^3/µL", required: true, min: 10, max: 800, step: 1 },
  ],
  calculate(values) {
    const respiratory = parseFloat(values.respiratory);
    const renal = parseFloat(values.renal);
    const liver = parseFloat(values.liver);
    const platelets = parseFloat(values.platelets);

    let score = 0;
    if (respiratory < 200) score += 1;
    if (renal > 1.5) score += 1;
    if (liver > 2) score += 1;
    if (platelets < 100) score += 1;

    let interpretation = "No major organ dysfunction";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 7) {
      interpretation = "Severe multiple organ dysfunction";
      status = "critical";
    } else if (score > 2) {
      interpretation = "Moderate organ dysfunction";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
