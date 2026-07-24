import type { CalculatorDefinition } from "./calculator.types";

export const bisapCalculator: CalculatorDefinition = {
  id: "bisap",
  slug: "bisap",
  name: "BISAP",
  shortName: "BISAP",
  description:
    "A simplified educational estimate of severity in acute pancreatitis.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["BISAP", "Pancreatitis", "Critical Care", "Severity"],
  warnings: [
    "This is an educational approximation and should not replace formal clinical assessment.",
  ],
  formula: "BISAP = 1 point each for BUN, impaired mental status, SIRS, pleural effusion, age >60",
  normalRange: "0 points",
  referenceRanges: [
    { label: "Low risk", range: "0" },
    { label: "Intermediate risk", range: "1–2" },
    { label: "High risk", range: ">2" },
  ],
  clinicalNotes:
    "Higher BISAP scores are associated with increased mortality risk in pancreatitis.",
  references: ["Wu BU, et al. Gut. 2008.", "Pancreatitis severity"],
  inputs: [
    { id: "bun", label: "BUN", type: "number", unit: "mg/dL", required: true, min: 5, max: 120, step: 1 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", required: true, min: 3, max: 15, step: 1 },
    { id: "sirs", label: "SIRS criteria", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "effusion", label: "Pleural effusion", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "age", label: "Age >60", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
  ],
  calculate(values) {
    const bun = parseFloat(values.bun);
    const gcs = parseFloat(values.gcs);
    const sirs = values.sirs === "yes";
    const effusion = values.effusion === "yes";
    const age = values.age === "yes";

    let score = 0;
    if (bun >= 25) score += 1;
    if (gcs < 15) score += 1;
    if (sirs) score += 1;
    if (effusion) score += 1;
    if (age) score += 1;

    let interpretation = "Low risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 2) {
      interpretation = "High severity";
      status = "critical";
    } else if (score > 0) {
      interpretation = "Intermediate severity";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
