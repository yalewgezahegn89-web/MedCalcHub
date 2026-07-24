import type { CalculatorDefinition } from "./calculator.types";

export const childPughCalculator: CalculatorDefinition = {
  id: "child-pugh",
  slug: "child-pugh",
  name: "Child-Pugh",
  shortName: "Child-Pugh",
  description:
    "A simplified educational estimate of cirrhosis severity using bilirubin, albumin, INR, ascites, and encephalopathy.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["Child-Pugh", "Cirrhosis", "Critical Care", "Liver"],
  warnings: [
    "This is an educational approximation and should not replace formal clinical assessment.",
  ],
  formula: "Child-Pugh score = bilirubin points + albumin points + INR points + ascites points + encephalopathy points",
  normalRange: "5–6 points",
  referenceRanges: [
    { label: "Class A", range: "5–6" },
    { label: "Class B", range: "7–9" },
    { label: "Class C", range: "10–15" },
  ],
  clinicalNotes:
    "Higher Child-Pugh scores indicate more advanced liver disease.",
  references: ["Pugh RN, et al. Br J Surg. 1973.", "Liver disease staging"],
  inputs: [
    { id: "bilirubin", label: "Bilirubin", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 20, step: 0.1 },
    { id: "albumin", label: "Albumin", type: "number", unit: "g/dL", required: true, min: 1, max: 5, step: 0.1 },
    { id: "inr", label: "INR", type: "number", required: true, min: 1, max: 5, step: 0.1 },
    { id: "ascites", label: "Ascites", type: "select", required: true, options: [{ label: "Absent", value: "absent" }, { label: "Mild", value: "mild" }, { label: "Moderate", value: "moderate" }] },
    { id: "encephalopathy", label: "Encephalopathy", type: "select", required: true, options: [{ label: "None", value: "none" }, { label: "Grade 1–2", value: "mild" }, { label: "Grade 3–4", value: "severe" }] },
  ],
  calculate(values) {
    const bilirubin = parseFloat(values.bilirubin);
    const albumin = parseFloat(values.albumin);
    const inr = parseFloat(values.inr);
    const ascites = values.ascites;
    const encephalopathy = values.encephalopathy;

    let score = 0;
    if (bilirubin > 3) score += 3; else if (bilirubin > 2) score += 2; else if (bilirubin > 1) score += 1;
    if (albumin < 2.8) score += 3; else if (albumin < 3.5) score += 2; else if (albumin < 4) score += 1;
    if (inr > 2.3) score += 3; else if (inr > 1.7) score += 2; else if (inr > 1.3) score += 1;
    if (ascites === "moderate") score += 3; else if (ascites === "mild") score += 2;
    if (encephalopathy === "severe") score += 3; else if (encephalopathy === "mild") score += 2;

    let interpretation = "Class A";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (score >= 10) {
      interpretation = "Class C";
      status = "critical";
    } else if (score >= 7) {
      interpretation = "Class B";
      status = "high";
    }

    return { value: score, unit: "points", interpretation, status };
  },
};
