import type { CalculatorDefinition } from "./calculator.types";
import { calculateDevineIBW } from "./utils/body-weight";

export const ibwCalculator: CalculatorDefinition = {
  id: "ibw",

  slug: "ideal-body-weight",

  name: "Ideal Body Weight",

  shortName: "IBW",

  description: "Calculates Ideal Body Weight using the Devine formula.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: ["IBW", "Ideal Body Weight", "Devine", "Height", "Weight"],

  formula:
    "Male: IBW = 50 + 2.3 × (height in inches − 60); Female: IBW = 45.5 + 2.3 × (height in inches − 60)",

  clinicalNotes:
    "Ideal body weight is a reference weight estimate most often used to guide medication dosing and nutritional assessment. The Devine formula was derived for aminoglycoside dosing in adults and does not account for body composition or frame size; actual body weight may be more appropriate for certain drugs and clinical situations.",

  references: [
    "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8(11):650–655.",
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
  placeholder: "Enter height",
      unit: "cm",
      required: true,
      min: 100,
      max: 250,
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

    const ibw = calculateDevineIBW(
      values.sex,
      parseFloat(values.height),
    );

    return {
      value: ibw,
      unit: "kg",
      interpretation:
        "Estimated ideal body weight using the Devine formula.",
      status: "normal",
    };
  },
};
