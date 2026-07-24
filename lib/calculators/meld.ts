import type { CalculatorDefinition } from "./calculator.types";

export const meldCalculator: CalculatorDefinition = {
  id: "meld",
  slug: "meld",
  name: "MELD",
  shortName: "MELD",
  description:
    "A simplified educational estimate of mortality risk in cirrhosis using bilirubin, creatinine, and INR.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["MELD", "Cirrhosis", "Critical Care", "Liver"],
  warnings: [
    "This is an educational approximation and should not replace formal MELD calculation or clinical judgment.",
  ],
  formula: "MELD = 9.57 × ln(Cr) + 3.78 × ln(Bilirubin) + 11.20 × ln(INR) + 6.43",
  normalRange: "<10",
  referenceRanges: [
    { label: "Low", range: "<10" },
    { label: "Moderate", range: "10–19" },
    { label: "High", range: ">19" },
  ],
  clinicalNotes:
    "Higher MELD values reflect greater short-term mortality risk in cirrhosis.",
  references: ["Wiesner R, et al. Hepatology. 2001.", "Liver transplant risk"],
  inputs: [
    { id: "bilirubin", label: "Serum Bilirubin", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 30, step: 0.1 },
    { id: "creatinine", label: "Serum Creatinine", type: "number", unit: "mg/dL", required: true, min: 0.1, max: 10, step: 0.1 },
    { id: "inr", label: "INR", type: "number", required: true, min: 1, max: 5, step: 0.1 },
  ],
  calculate(values) {
    const bilirubin = parseFloat(values.bilirubin);
    const creatinine = parseFloat(values.creatinine);
    const inr = parseFloat(values.inr);

    const meld = 9.57 * Math.log(Math.max(creatinine, 1)) + 3.78 * Math.log(Math.max(bilirubin, 1)) + 11.2 * Math.log(Math.max(inr, 1)) + 6.43;
    const rounded = Math.round(meld * 10) / 10;

    let interpretation = "Low mortality risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (rounded > 19) {
      interpretation = "High mortality risk";
      status = "critical";
    } else if (rounded > 9) {
      interpretation = "Moderate mortality risk";
      status = "high";
    }

    return { value: rounded, unit: "points", interpretation, status };
  },
};
