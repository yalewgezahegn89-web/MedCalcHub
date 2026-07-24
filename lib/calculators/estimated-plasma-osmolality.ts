import type { CalculatorDefinition } from "./calculator.types";

export const estimatedPlasmaOsmolalityCalculator: CalculatorDefinition = {
  id: "estimated-plasma-osmolality",

  slug: "estimated-plasma-osmolality",

  name: "Estimated Plasma Osmolality",

  shortName: "EPOsm",

  description:
    "Estimates plasma osmolality from sodium, glucose, and blood urea nitrogen.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Plasma osmolality",
    "Osmolality",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "This is an estimated value and should not replace measured osmolality when clinically indicated.",
  ],

  formula: "EPOsm = 2 × Na + Glucose / 18 + BUN / 2.8",

  normalRange: "275–295 mOsm/kg",

  referenceRanges: [
    {
      label: "Normal",
      range: "275–295 mOsm/kg",
    },
    {
      label: "Hypo-osmolar",
      range: "<275 mOsm/kg",
    },
    {
      label: "Hyper-osmolar",
      range: ">295 mOsm/kg",
    },
  ],

  clinicalNotes:
    "Plasma osmolality helps assess water balance and the presence of hyperosmolar states.",

  references: [
    "Kahn A, et al. Clin Chem. 1978.",
    "Fluid and electrolyte references",
  ],

  inputs: [
    {
      id: "sodium",
      label: "Serum Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 170,
      step: 1,
    },
    {
      id: "glucose",
      label: "Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 50,
      max: 1000,
      step: 1,
    },
    {
      id: "bun",
      label: "BUN",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 2,
      max: 200,
      step: 1,
    },
  ],

  calculate(values) {
    const sodium = parseFloat(values.sodium);
    const glucose = parseFloat(values.glucose);
    const bun = parseFloat(values.bun);

    const osmolality = 2 * sodium + glucose / 18 + bun / 2.8;
    const rounded = Math.round(osmolality);

    let interpretation = "Normal plasma osmolality";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 275) {
      interpretation = "Hypo-osmolar state";
      status = "low";
    } else if (rounded > 295) {
      interpretation = "Hyper-osmolar state";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mOsm/kg",
      interpretation,
      status,
    };
  },
};
