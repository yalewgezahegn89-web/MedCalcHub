import type { CalculatorDefinition } from "./calculator.types";

export const cockcroftGaultCalculator: CalculatorDefinition = {
  id: "cockcroft-gault",

  slug: "cockcroft-gault",

  name: "Cockcroft-Gault Creatinine Clearance",

  shortName: "CrCl",

  description:
    "Estimates creatinine clearance using the Cockcroft-Gault equation.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Cockcroft-Gault",
    "Creatinine Clearance",
    "CrCl",
    "Renal",
    "Kidney",
    "Drug Dosing",
  ],

  warnings: [
    "For adults only.",
    "Use stable serum creatinine.",
    "Primarily recommended for medication dosing rather than CKD staging.",
  ],

  formula:
    "CrCl = ((140 − Age) × Weight) / (72 × Serum Creatinine); multiply by 0.85 for females.",

  normalRange: "≥90 mL/min",

  referenceRanges: [
    {
      label: "Normal Renal Function",
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
    "Cockcroft-Gault estimates creatinine clearance and is widely used for medication dose adjustment. CKD-EPI is generally preferred for estimating GFR, while Cockcroft-Gault remains important for drug dosing recommendations.",

  references: [
    "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine.",
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
      step: 1,
    },
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
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 300,
      step: 0.1,
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
    const age = parseFloat(values.age);
    const weight = parseFloat(values.weight);
    const creatinine = parseFloat(values.creatinine);
    const sex = values.sex;

    let crcl =
      ((140 - age) * weight) /
      (72 * creatinine);

    if (sex === "female") {
      crcl *= 0.85;
    }

    const rounded =
      Math.max(0, Math.round(crcl * 10) / 10);

    let interpretation: string;
    let status: "normal" | "low" = "normal";

    if (rounded >= 90) {
      interpretation = "Normal renal function.";
    } else if (rounded >= 60) {
      interpretation = "Mild renal impairment.";
    } else if (rounded >= 30) {
      interpretation = "Moderate renal impairment.";
      status = "low";
    } else if (rounded >= 15) {
      interpretation = "Severe renal impairment.";
      status = "low";
    } else {
      interpretation = "Kidney failure.";
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