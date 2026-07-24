import type { CalculatorDefinition } from "./calculator.types";

export const fractionalExcretionSodiumCalculator: CalculatorDefinition = {
  id: "fractional-excretion-sodium",

  slug: "fractional-excretion-sodium",

  name: "Fractional Excretion of Sodium",

  shortName: "FENa",

  description:
    "Estimates the fraction of filtered sodium excreted in the urine.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "FENa",
    "AKI",
    "Renal",
    "Nephrology",
    "Sodium",
  ],

  warnings: [
    "Interpretation depends on the clinical context and urine collection quality.",
  ],

  formula: "FENa = (Urine Na × Plasma Creatinine) / (Plasma Na × Urine Creatinine) × 100",

  normalRange: "<1%",

  referenceRanges: [
    {
      label: "Prerenal",
      range: "<1%",
    },
    {
      label: "Intrinsic renal injury",
      range: ">2%",
    },
    {
      label: "Indeterminate",
      range: "1–2%",
    },
  ],

  clinicalNotes:
    "FENa helps distinguish prerenal azotemia from intrinsic renal injury.",

  references: [
    "Stein JH, et al. Kidney Int. 1976.",
    "Nephrology teaching references",
  ],

  inputs: [
    {
      id: "urineSodium",
      label: "Urine Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
      max: 300,
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
      id: "plasmaSodium",
      label: "Plasma Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 160,
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
    const urineSodium = parseFloat(values.urineSodium);
    const plasmaCreatinine = parseFloat(values.plasmaCreatinine);
    const plasmaSodium = parseFloat(values.plasmaSodium);
    const urineCreatinine = parseFloat(values.urineCreatinine);

    const fenat = plasmaCreatinine > 0 && plasmaSodium > 0 && urineCreatinine > 0
      ? (urineSodium * plasmaCreatinine) / (plasmaSodium * urineCreatinine) * 100
      : 0;
    const rounded = Math.round(fenat * 10) / 10;

    let interpretation = "Prerenal pattern";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 2) {
      interpretation = "Intrinsic renal injury more likely";
      status = "high";
    } else if (rounded > 1) {
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
