import type { CalculatorDefinition } from "./calculator.types";

export const hacorScoreCalculator: CalculatorDefinition = {
  id: "hacor-score",
  slug: "hacor-score",
  name: "HACOR Score",
  shortName: "HACOR",
  description:
    "A simplified educational estimate of risk of failure of noninvasive ventilation in acute respiratory failure.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["HACOR", "Critical Care", "Respiratory failure", "NIV"],
  warnings: [
    "This is an educational approximation and should not replace clinical reassessment.",
  ],
  formula: "HACOR = heart rate + acidosis + consciousness + oxygenation + respiratory rate",
  normalRange: "0–2 points",
  referenceRanges: [
    { label: "Low risk", range: "0–2" },
    { label: "Moderate risk", range: "3–4" },
    { label: "High risk", range: ">4" },
  ],
  clinicalNotes:
    "Higher scores suggest greater risk of NIV failure.",
  references: ["Duan J, et al. Crit Care. 2017.", "Respiratory failure"],
  inputs: [
    { id: "heartRate", label: "Heart Rate", type: "number", unit: "bpm", required: true, min: 40, max: 200, step: 1 },
    { id: "ph", label: "pH", type: "number", required: true, min: 6.8, max: 7.6, step: 0.01 },
    { id: "gcs", label: "GCS", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "pao2", label: "PaO2", type: "number", unit: "mmHg", required: true, min: 40, max: 200, step: 1 },
    { id: "respiratoryRate", label: "Respiratory Rate", type: "number", unit: "breaths/min", required: true, min: 10, max: 60, step: 1 },
  ],
  calculate(values) {
    const heartRate = parseFloat(values.heartRate);
    const ph = parseFloat(values.ph);
    const gcs = parseFloat(values.gcs);
    const pao2 = parseFloat(values.pao2);
    const respiratoryRate = parseFloat(values.respiratoryRate);

    let score = 0;
    if (heartRate >= 120) score += 1;
    if (ph < 7.25) score += 1;
    if (gcs < 15) score += 1;
    if (pao2 < 100) score += 1;
    if (respiratoryRate >= 30) score += 1;

    let interpretation = "Low risk of NIV failure";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 4) {
      interpretation = "High risk of NIV failure";
      status = "critical";
    } else if (score > 2) {
      interpretation = "Moderate risk of NIV failure";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
