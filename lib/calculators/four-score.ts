import type { CalculatorDefinition } from "./calculator.types";

export const fourScoreCalculator: CalculatorDefinition = {
  id: "four-score",
  slug: "four-score",
  name: "FOUR Score",
  shortName: "FOUR",
  description:
    "A simplified educational estimate of neurologic status in ICU patients.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["FOUR", "Critical Care", "Neurology", "ICU"],
  warnings: [
    "This is an educational approximation and should not replace formal neurological assessment.",
  ],
  formula: "FOUR = eye + motor + brainstem + respiration points",
  normalRange: "12–16 points",
  referenceRanges: [
    { label: "Normal", range: "12–16" },
    { label: "Moderate impairment", range: "8–11" },
    { label: "Severe impairment", range: "0–7" },
  ],
  clinicalNotes:
    "Lower scores indicate more severe neurologic impairment.",
  references: ["Wijdicks EF, et al. Neurology. 2005.", "Neurologic ICU assessment"],
  inputs: [
    { id: "eye", label: "Eye response", type: "number", required: true, min: 0, max: 4, step: 1 },
    { id: "motor", label: "Motor response", type: "number", required: true, min: 0, max: 4, step: 1 },
    { id: "brainstem", label: "Brainstem reflexes", type: "number", required: true, min: 0, max: 4, step: 1 },
    { id: "respiration", label: "Respiration", type: "number", required: true, min: 0, max: 4, step: 1 },
  ],
  calculate(values) {
    const eye = parseFloat(values.eye);
    const motor = parseFloat(values.motor);
    const brainstem = parseFloat(values.brainstem);
    const respiration = parseFloat(values.respiration);

    const score = eye + motor + brainstem + respiration;

    let interpretation = "Normal neurologic status";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score <= 7) {
      interpretation = "Severe neurologic impairment";
      status = "critical";
    } else if (score <= 11) {
      interpretation = "Moderate neurologic impairment";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
