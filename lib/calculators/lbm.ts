import type { CalculatorDefinition } from "./calculator.types";

export const lbmCalculator: CalculatorDefinition = {
  id: "lean-body-weight",

  slug: "lean-body-weight",

  name: "Lean Body Weight",

  shortName: "LBW",

  description: "Calculates Lean Body Weight using the Boer formula.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Lean Body Mass",
    "LBM",
    "Boer",
    "Drug Dosing",
    "Body Composition",
  ],



  formula:
    "Male: LBM = 0.407 × Weight + 0.267 × Height − 19.2; Female: LBM = 0.252 × Weight + 0.473 × Height − 48.3",

  clinicalNotes:
    "Lean Body Mass estimates the weight of the body excluding fat mass. It is commonly used in clinical nutrition, anesthesia, and medication dosing.",

  references: [
    "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans.",
    "ClinCalc Lean Body Mass",
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
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 100,
      max: 250,
      step: 0.1,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 400,
      step: 0.1,
    },
  ],

  calculate(values) {
    if (values.sex !== "male" && values.sex !== "female") {
      return {
        value: 0,
        interpretation: "Sex is required.",
        status: "critical",
      };
    }

    if (
      values.height === "" ||
      values.height === undefined
    ) {
      return {
        value: 0,
        interpretation: "Height is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(Number(values.height))) {
      return {
        value: 0,
        interpretation: "Invalid Height.",
        status: "critical",
      };
    }

    if (Number(values.height) < 0) {
      return {
        value: 0,
        interpretation: "Height cannot be negative.",
        status: "critical",
      };
    }

    if (Number(values.height) === 0) {
      return {
        value: 0,
        interpretation: "Height cannot be zero.",
        status: "critical",
      };
    }

    if (
      values.weight === "" ||
      values.weight === undefined
    ) {
      return {
        value: 0,
        interpretation: "Weight is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(Number(values.weight))) {
      return {
        value: 0,
        interpretation: "Invalid Weight.",
        status: "critical",
      };
    }

    if (Number(values.weight) < 0) {
      return {
        value: 0,
        interpretation: "Weight cannot be negative.",
        status: "critical",
      };
    }

    if (Number(values.weight) === 0) {
      return {
        value: 0,
        interpretation: "Weight cannot be zero.",
        status: "critical",
      };
    }

    const sex = values.sex;
    const height = parseFloat(values.height);
    const weight = parseFloat(values.weight);

    let lbm: number;

    if (sex === "male") {
      lbm = 0.407 * weight + 0.267 * height - 19.2;
    } else {
      lbm = 0.252 * weight + 0.473 * height - 48.3;
    }

    const rounded = Math.max(0, Math.round(lbm * 10) / 10);

    return {
      value: rounded,
      unit: "kg",
      interpretation: "Estimated lean body mass.",
      status: "normal",
    };
  },
};
