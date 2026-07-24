import type { CalculatorDefinition } from "./calculator.types";
import { calculateMaintenanceFluids } from "./utils/internal-medicine";

export const maintenanceFluidsCalculator: CalculatorDefinition = {
  id: "maintenance-fluids",

  slug: "maintenance-fluids",

  name: "Maintenance Fluids",

  shortName: "Maintenance",

  description:
    "Estimates maintenance fluid rate using a weight-based method.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "100 mL/kg for first 10 kg, 50 mL/kg for next 10 kg, 20 mL/kg thereafter",

  normalRange: "Variable by patient size and clinical needs",

  clinicalNotes:
    "This is a common starting point for maintenance fluid planning.",

  references: [
    "Fluid management guidelines",
    "Clinical practice references",
  ],

  warnings: [
    "Do not use as a substitute for individualized fluid prescription.",
  ],

  keywords: [
    "Maintenance Fluids",
    "Fluid Rate",
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
      min: 2,
      max: 200,
      step: 0.1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);

    const fluids = calculateMaintenanceFluids(weight);

    return {
      value: fluids,
      unit: "mL/day",
      interpretation: "Estimated maintenance fluid requirement",
      status: "normal",
    };
  },
};
