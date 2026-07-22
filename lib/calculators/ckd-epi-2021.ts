import type { CalculatorDefinition } from "./calculator.types";

export const ckdEpi2021Calculator: CalculatorDefinition = {
  id: "ckd-epi-2021",

  slug: "ckd-epi-2021",

  name: "CKD-EPI 2021 eGFR",

  shortName: "CKD-EPI",

  description:
    "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "CKD-EPI",
    "eGFR",
    "Kidney",
    "Renal",
    "Creatinine",
  ],

  warnings: [
    "The CKD-EPI equation is an estimate and should be interpreted in the clinical context.",
  ],

  formula:
    "eGFR = 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^Age × 1.012 (if female)",

  clinicalNotes:
    "The 2021 CKD-EPI creatinine equation estimates kidney function without using race and is recommended by many laboratories.",

  references: [
    "Inker LA, et al. NEJM. 2021.",
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
    const sex = values.sex;
    const age = parseFloat(values.age);
    const scr = parseFloat(values.creatinine);

    const female = sex === "female";

    const k = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;

    const min = Math.min(scr / k, 1);
    const max = Math.max(scr / k, 1);

    let egfr =
      142 *
      Math.pow(min, alpha) *
      Math.pow(max, -1.2) *
      Math.pow(0.9938, age);

    if (female) {
      egfr *= 1.012;
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
      formula:
  "eGFR = 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^Age × 1.012 (if female)",

normalRange: "≥90 mL/min/1.73 m²",

clinicalNotes:
  "The 2021 CKD-EPI creatinine equation estimates kidney function without using race and is recommended by many laboratories.",
      interpretation,
      status,
    };
  },
};