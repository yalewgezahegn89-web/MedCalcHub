import type { CalculatorDefinition } from "./calculator.types";
import { calculateFluidRequirement } from "./utils/internal-medicine";

export const fluidRequirementCalculator: CalculatorDefinition = {
  id: "fluid-requirement",

  slug: "fluid-requirement",

  name: "Fluid Requirement",

  shortName: "Fluids",

  description:
    "Estimates maintenance fluid requirement based on body weight.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Fluid requirement = 35 mL/kg/day",

  normalRange: "~2,000–3,000 mL/day for average adults",

  referenceRanges: [
    {
      label: "Adults",
      range: "35 mL/kg/day",
    },
  ],

  clinicalNotes:
    "This simple rule is often used for maintenance fluid planning.",

  references: [
    "Pediatric and adult fluid guidelines",
    "Clinical practice references",
  ],

  warnings: [
    "Actual fluid needs depend on clinical status, losses, and comorbidities.",
  ],

  keywords: [
    "Fluid Requirement",
    "Maintenance Fluids",
    "Hydration",
    "Internal Medicine",
  ],

  inputs: [
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
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);

    const fluids = calculateFluidRequirement(weight);

    return {
      value: fluids,
      unit: "mL/day",
      interpretation: "Estimated maintenance fluid requirement",
      status: "normal",
    };
  },
};
