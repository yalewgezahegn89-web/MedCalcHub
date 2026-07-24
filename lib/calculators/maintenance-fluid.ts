import type { CalculatorDefinition } from "./calculator.types";

export const maintenanceFluidCalculator: CalculatorDefinition = {
  id: "maintenance-fluid",

  slug: "maintenance-fluid",

  name: "Maintenance Fluid Calculator",

  shortName: "Maintenance Fluids",

  description:
    "Estimates maintenance fluid requirements for pediatric patients using the Holliday-Segar method.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Maintenance fluid",
    "Pediatrics",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "Maintenance fluid estimates should be adjusted for ongoing losses and clinical condition.",
  ],

  formula: "Maintenance fluid = 100 mL/kg for first 10 kg + 50 mL/kg for next 10 kg + 20 mL/kg for remaining kg",

  normalRange: "~20–100 mL/hr",

  referenceRanges: [
    {
      label: "Low",
      range: "<20 mL/hr",
    },
    {
      label: "Typical",
      range: "20–100 mL/hr",
    },
    {
      label: "High",
      range: ">100 mL/hr",
    },
  ],

  clinicalNotes:
    "This calculator provides a simple estimate of daily maintenance fluid needs in children.",

  references: [
    "Holliday MA, Segar WE. Pediatrics. 1957.",
    "Pediatric fluid management",
  ],

  inputs: [
    {
      id: "weight",
      label: "Body Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 1,
      max: 80,
      step: 0.1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);

    let fluid = 0;
    if (weight <= 10) {
      fluid += weight * 100;
    } else if (weight <= 20) {
      fluid += 1000 + (weight - 10) * 50;
    } else {
      fluid += 1000 + 500 + (weight - 20) * 20;
    }

    const rounded = Math.round(fluid * 10) / 10;

    let interpretation = "Maintenance fluid requirement estimated";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    return {
      value: rounded,
      unit: "mL/day",
      interpretation,
      status,
    };
  },
};
