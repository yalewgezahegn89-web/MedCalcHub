import type { CalculatorDefinition } from "../calculator.types";
export const cockcroftGaultCalculator: CalculatorDefinition = {
  id: "cockcroft-gault",

  slug: "cockcroft-gault",

  name: "Cockcroft-Gault Creatinine Clearance",

  shortName: "Cockcroft-Gault",

  description:
    "Estimates creatinine clearance (CrCl) for medication dosing using the Cockcroft-Gault equation.",

  category: "Renal",

  specialty: "Nephrology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Creatinine Clearance",
    "CrCl",
    "Cockcroft-Gault",
    "Drug Dosing",
    "Kidney Function",
  ],

  warnings: [
    "Use actual body weight unless adjusted body weight is clinically indicated.",
    "Not recommended for unstable kidney function.",
  ],

  formula:
    "CrCl = ((140 − Age) × Weight × Sex Factor) / (72 × Serum Creatinine)",

  normalRange: "≈90–140 mL/min",

  referenceRanges: [
    {
      label: "Normal",
      range: "≥90 mL/min",
    },
    {
      label: "Mild Impairment",
      range: "60–89 mL/min",
    },
    {
      label: "Moderate Impairment",
      range: "30–59 mL/min",
    },
    {
      label: "Severe Impairment",
      range: "15–29 mL/min",
    },
    {
      label: "Kidney Failure",
      range: "<15 mL/min",
    },
  ],

  clinicalNotes:
    "Cockcroft-Gault is primarily used for medication dosing adjustments.",

  references: [
    "Cockcroft DW, Gault MH. Nephron. 1976.",
    "KDIGO Clinical Practice Guideline",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 300,
    },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
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

  calculate(values: Record<string, string>) {
    const age = parseFloat(values.age);
    const weight = parseFloat(values.weight);
    const creatinine = parseFloat(values.creatinine);
    const female = values.sex === "female";

    let crcl =
      ((140 - age) * weight) /
      (72 * creatinine);

    if (female) {
      crcl *= 0.85;
    }

    const rounded =
      Math.round(crcl * 10) / 10;

    let interpretation: string;
    let status:
      | "normal"
      | "low" = "normal";

    if (rounded >= 90) {
      interpretation =
        "Normal kidney function.";
    } else if (rounded >= 60) {
      interpretation =
        "Mild renal impairment.";
      status = "low";
    } else if (rounded >= 30) {
      interpretation =
        "Moderate renal impairment.";
      status = "low";
    } else if (rounded >= 15) {
      interpretation =
        "Severe renal impairment.";
      status = "low";
    } else {
      interpretation =
        "Kidney failure.";
      status = "low";
    }

    return {
      value: rounded,
      unit: "mL/min",
      interpretation,
      status,
    };
  },
};