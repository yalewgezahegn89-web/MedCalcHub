import type { CalculatorDefinition } from "./calculator.types";
import { calculateGestationalAge } from "./utils/obgyn";

export const gestationalAgeCalculator: CalculatorDefinition = {
  id: "gestational-age",

  slug: "gestational-age",

  name: "Gestational Age",

  shortName: "GA",

  description: "Estimates gestational age from weeks and days.",

  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Gestational age = Weeks + Days/7",

  normalRange: "0–42 weeks",

  clinicalNotes:
    "Gestational age is commonly used for pregnancy dating and fetal growth assessment.",

  references: [
    "ACOG guidance",
    "Obstetrics references",
  ],



  keywords: ["Gestational Age", "Pregnancy", "Obstetrics"],

  inputs: [
    {
      id: "weeks",
      label: "Weeks",
      type: "number",
      required: true,
      min: 0,
      max: 42,
      step: 1,
    },
    {
      id: "days",
      label: "Days",
      type: "number",
      required: true,
      min: 0,
      max: 6,
      step: 1,
    },
  ],

  calculate(values) {
    const weeks = parseFloat(values.weeks);
    const days = parseFloat(values.days);

    if (
      !Number.isFinite(weeks) ||
      !Number.isFinite(days) ||
      weeks < 0 ||
      days < 0
    ) {
      return {
        value: 0,
        interpretation: "Weeks and days are required.",
        status: "critical",
      };
    }

    const ga = calculateGestationalAge(weeks, days);

    return {
      value: ga,
      unit: "weeks",
      interpretation: "Estimated gestational age",
      status: "normal",
    };
  },
};
