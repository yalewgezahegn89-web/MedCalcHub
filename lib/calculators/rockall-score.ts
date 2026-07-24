import type { CalculatorDefinition } from "./calculator.types";

export const rockallScoreCalculator: CalculatorDefinition = {
  id: "rockall-score",
  slug: "rockall-score",
  name: "Rockall Score",
  shortName: "Rockall",
  description:
    "A simplified educational estimate of risk of adverse outcomes in upper gastrointestinal bleeding.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["Rockall", "Bleeding", "Critical Care", "Risk"],
  warnings: [
    "This is an educational approximation and should not replace formal clinical assessment.",
  ],
  formula: "Rockall = age + shock + comorbidity + diagnosis + endoscopic stigmata",
  normalRange: "0–2 points",
  referenceRanges: [
    { label: "Low risk", range: "0–2" },
    { label: "Moderate risk", range: "3–6" },
    { label: "High risk", range: ">6" },
  ],
  clinicalNotes:
    "Higher scores suggest greater risk of adverse outcomes.",
  references: ["Rockall TA, et al. BMJ. 1996.", "GI bleeding risk"],
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", required: true, min: 18, max: 120, step: 1 },
    { id: "shock", label: "Hemodynamic shock", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "comorbidity", label: "Comorbidity", type: "select", required: true, options: [{ label: "None", value: "none" }, { label: "Yes", value: "yes" }] },
    { id: "diagnosis", label: "Diagnosis", type: "select", required: true, options: [{ label: "Mallory-Weiss", value: "mw" }, { label: "Other", value: "other" }] },
    { id: "stigmata", label: "Endoscopic stigmata", type: "select", required: true, options: [{ label: "None", value: "none" }, { label: "Present", value: "present" }] },
  ],
  calculate(values) {
    const age = parseFloat(values.age);
    const shock = values.shock === "yes";
    const comorbidity = values.comorbidity === "yes";
    const diagnosis = values.diagnosis === "other";
    const stigmata = values.stigmata === "present";

    let score = 0;
    if (age >= 60) score += 1;
    if (age >= 80) score += 1;
    if (shock) score += 2;
    if (comorbidity) score += 2;
    if (diagnosis) score += 1;
    if (stigmata) score += 1;

    let interpretation = "Low risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 6) {
      interpretation = "High risk";
      status = "critical";
    } else if (score > 2) {
      interpretation = "Intermediate risk";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
