import type { CalculatorDefinition } from "./calculator.types";

export const mdrdCalculator: CalculatorDefinition = {
  id: "mdrd",

  slug: "mdrd-egfr",

  name: "MDRD eGFR",

  shortName: "MDRD",

  description:
    "Estimates glomerular filtration rate using the 4-variable MDRD equation.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "MDRD",
    "eGFR",
    "Kidney",
    "Renal",
    "Creatinine",
  ],

  warnings: [
    "The MDRD equation is less accurate than CKD-EPI at higher GFR values.",
  ],

  formula:
    "eGFR = 175 × Scr^-1.154 × Age^-0.203 × 0.742 (if female)",

  normalRange: "≥90 mL/min/1.73 m²",

  clinicalNotes:
    "The MDRD equation estimates kidney function and has largely been replaced by the CKD-EPI equation in many laboratories.",

  references: [
    "Levey AS, et al. Ann Intern Med. 1999.",
    "National Kidney Foundation",
  ],

  inputs: [
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
      step: 1,
    },
    {
      id: "creatinine",
      label: "Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
  ],

  calculate(values) {
    const female = values.sex === "female";
    const age = parseFloat(values.age);
    const scr = parseFloat(values.creatinine);

    let egfr =
      175 *
      Math.pow(scr, -1.154) *
      Math.pow(age, -0.203);

    if (female) {
      egfr *= 0.742;
    }

    const rounded = Math.round(egfr * 10) / 10;

    let interpretation: string;
    let status: "normal" | "low" = "normal";

    if (rounded >= 90) {
      interpretation = "G1: Normal or high kidney function.";
    } else if (rounded >= 60) {
      interpretation = "G2: Mildly decreased kidney function.";
    } else if (rounded >= 45) {
      interpretation =
        "G3a: Mild to moderate decrease in kidney function.";
      status = "low";
    } else if (rounded >= 30) {
      interpretation =
        "G3b: Moderate to severe decrease in kidney function.";
      status = "low";
    } else if (rounded >= 15) {
      interpretation = "G4: Severely decreased kidney function.";
      status = "low";
    } else {
      interpretation = "G5: Kidney failure.";
      status = "low";
    }

    return {
      value: rounded,
      unit: "mL/min/1.73 m²",
      interpretation,
      status,
    };
  },
};