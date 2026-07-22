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
  ],

  formula:
    "CrCl = ((140 − Age) × Weight) / (72 × Serum Creatinine); multiply by 0.85 for females.",

  clinicalNotes:
    "Cockcroft-Gault estimates creatinine clearance and is commonly used for medication dosing in adults.",

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

    const rounded = Math.max(
      0,
      Math.round(crcl * 10) / 10,
    );

    return {
      value: rounded,
      unit: "mL/min",
      interpretation:
        "Estimated creatinine clearance.",
      status: "normal",
    };
  },
};