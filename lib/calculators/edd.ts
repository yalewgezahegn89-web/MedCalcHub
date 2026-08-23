import type { CalculatorDefinition } from "./calculator.types";
import { calculateEdd } from "./utils/obgyn";

export const eddCalculator: CalculatorDefinition = {
  id: "edd",

  slug: "edd",

  name: "EDD",

  shortName: "EDD",

  description: "Estimates the expected date of delivery from the last menstrual period.",

  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "EDD = LMP + 280 days",

  normalRange: "Typically around 40 weeks from LMP",

  clinicalNotes:
    "The estimated date of delivery is a clinical estimate and may require adjustment based on ultrasound findings.",

  references: [
    "ACOG guidance",
    "Obstetrics references",
  ],



  keywords: ["EDD", "Expected Date of Delivery", "Pregnancy", "Obstetrics"],

  inputs: [
    {
      id: "lmp",
      label: "Last Menstrual Period",
      type: "text",
      required: true,
    },
  ],

  calculate(values) {
    const date = calculateEdd(values.lmp);

    return {
      value: date,
      interpretation: date ? "Estimated date of delivery" : "Please enter a valid date",
      status: date ? "normal" : "high",
    };
  },
};
