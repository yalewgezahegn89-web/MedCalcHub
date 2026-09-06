import type { CalculatorDefinition } from "./calculator.types";
import {
  calculateAdjustedBodyWeight,
  calculateDevineIBW,
} from "./utils/body-weight";

export const adjbwCalculator: CalculatorDefinition = {
  id: "adjbw",

  slug: "adjusted-body-weight",

  name: "Adjusted Body Weight",

  shortName: "AdjBW",

  description:
    "Calculates Adjusted Body Weight using the Devine Ideal Body Weight formula.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Adjusted Body Weight",
    "AdjBW",
    "Devine",
    "Obesity",
    "Drug Dosing",
  ],



  formula: "AdjBW = IBW + 0.4 × (Actual Weight − IBW)",

  clinicalNotes:
    "Adjusted body weight is used when dosing medications in overweight and obese patients because actual body weight may overestimate and ideal body weight may underestimate dosing requirements. The standard correction factor is 0.4 (40%), though the optimal factor varies by drug class and has not been validated across all dosing nomograms. Results should be interpreted in the context of the specific medication, its distribution characteristics, and applicable institutional policy.",

  references: [
    "Pai MP, Paloucek FP. The origin of the \"ideal\" body weight equations. Ann Pharmacother. 2000;34(9):1066–1069.",
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
      label: "Actual Weight",
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

    const ibw = calculateDevineIBW(
      values.sex,
      parseFloat(values.height),
    );

    const adjbw = calculateAdjustedBodyWeight(
      ibw,
      parseFloat(values.weight),
    );

    return {
      value: adjbw,
      unit: "kg",
      interpretation:
        "Estimated adjusted body weight for medication dosing.",
      status: "normal",
    };
  },
};
