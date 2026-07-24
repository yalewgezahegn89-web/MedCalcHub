import type { CalculatorDefinition } from "./calculator.types";

export const fractionalExcretionUreaCalculator: CalculatorDefinition = {
  id: "fractional-excretion-urea",

  slug: "fractional-excretion-urea",

  name: "Fractional Excretion of Urea",

  shortName: "FEUrea",

  description:
    "Estimates the percent of filtered urea excreted in the urine.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "FEUrea",
    "AKI",
    "Renal",
    "Nephrology",
    "Urea",
  ],

  warnings: [
    "Interpretation depends on ongoing diuretic therapy and clinical context.",
  ],

  formula: "FEUrea = (Urine Urea × Plasma Creatinine) / (Plasma Urea × Urine Creatinine) × 100",

  normalRange: "<35%",

  referenceRanges: [
    {
      label: "Prerenal",
      range: "<35%",
    },
    {
      label: "Intrinsic renal injury",
      range: ">50%",
    },
    {
      label: "Indeterminate",
      range: "35–50%",
    },
  ],

  clinicalNotes:
    "FEUrea can be useful when diuretics are present and FENa interpretation is limited.",

  references: [
    "Carvounis CP, et al. Am J Kidney Dis. 2002.",
    "Nephrology teaching references",
  ],

  inputs: [
    {
      id: "urineUrea",
      label: "Urine Urea",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "plasmaCreatinine",
      label: "Plasma Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    {
      id: "plasmaUrea",
      label: "Plasma Urea",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 200,
      step: 1,
    },
    {
      id: "urineCreatinine",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 500,
      step: 1,
    },
  ],

  calculate(values) {
    const urineUrea = parseFloat(values.urineUrea);
    const plasmaCreatinine = parseFloat(values.plasmaCreatinine);
    const plasmaUrea = parseFloat(values.plasmaUrea);
    const urineCreatinine = parseFloat(values.urineCreatinine);

    const feurea = plasmaCreatinine > 0 && plasmaUrea > 0 && urineCreatinine > 0
      ? (urineUrea * plasmaCreatinine) / (plasmaUrea * urineCreatinine) * 100
      : 0;
    const rounded = Math.round(feurea * 10) / 10;

    let interpretation = "Prerenal pattern";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 50) {
      interpretation = "Intrinsic renal injury more likely";
      status = "high";
    } else if (rounded > 35) {
      interpretation = "Indeterminate range";
      status = "low";
    }

    return {
      value: rounded,
      unit: "%",
      interpretation,
      status,
    };
  },
};
