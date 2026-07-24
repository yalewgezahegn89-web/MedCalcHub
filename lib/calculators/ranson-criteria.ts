import type { CalculatorDefinition } from "./calculator.types";

export const ransonCriteriaCalculator: CalculatorDefinition = {
  id: "ranson-criteria",
  slug: "ranson-criteria",
  name: "Ranson Criteria",
  shortName: "Ranson",
  description:
    "A simplified educational estimate of severity in acute pancreatitis at admission and 48 hours.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["Ranson", "Pancreatitis", "Critical Care", "Severity"],
  warnings: [
    "This is an educational approximation and should not replace full clinical severity assessment.",
  ],
  formula: "Ranson score = sum of admission and 48-hour criteria",
  normalRange: "0–2 points",
  referenceRanges: [
    { label: "Low risk", range: "0–2" },
    { label: "Moderate risk", range: "3–5" },
    { label: "High risk", range: ">5" },
  ],
  clinicalNotes:
    "Higher Ranson scores indicate more severe pancreatitis.",
  references: ["Ranson JH, et al. Gut. 1974.", "Pancreatitis severity"],
  inputs: [
    { id: "age", label: "Age >55", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "wbc", label: "WBC >16,000", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "glucose", label: "Glucose >200", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "ast", label: "AST >250", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
    { id: "ldh", label: "LDH >350", type: "select", required: true, options: [{ label: "No", value: "no" }, { label: "Yes", value: "yes" }] },
  ],
  calculate(values) {
    const score = [values.age, values.wbc, values.glucose, values.ast, values.ldh].filter((value) => value === "yes").length;

    let interpretation = "Low risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score > 5) {
      interpretation = "High severity";
      status = "critical";
    } else if (score > 2) {
      interpretation = "Moderate severity";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
