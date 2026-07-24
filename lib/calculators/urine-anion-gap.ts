import type { CalculatorDefinition } from "./calculator.types";

export const urineAnionGapCalculator: CalculatorDefinition = {
  id: "urine-anion-gap",

  slug: "urine-anion-gap",

  name: "Urine Anion Gap",

  shortName: "UAG",

  description:
    "Estimates urinary ammonium excretion to help distinguish renal tubular acidosis from diarrhea.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Urine Anion Gap",
    "Acid-base",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "The urine anion gap is a supportive test and should be interpreted with serum electrolytes and acid-base status.",
  ],

  formula: "UAG = Urine Na + Urine K - Urine Cl",

  normalRange: "0 to +10 mmol/L",

  referenceRanges: [
    {
      label: "Normal",
      range: "0 to +10 mmol/L",
    },
    {
      label: "Negative",
      range: "<0 mmol/L",
    },
    {
      label: "Positive",
      range: ">10 mmol/L",
    },
  ],

  clinicalNotes:
    "A negative urine anion gap suggests intact ammonium excretion, whereas a positive value suggests impaired ammonium excretion.",

  references: [
    "Kassirer JP, et al. J Clin Invest. 1966.",
    "Acid-base physiology",
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
      id: "urinePotassium",
      label: "Urine Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
      max: 300,
      step: 1,
    },
    {
      id: "urineChloride",
      label: "Urine Chloride",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
      max: 300,
      step: 1,
    },
  ],

  calculate(values) {
    const urineSodium = parseFloat(values.urineSodium);
    const urinePotassium = parseFloat(values.urinePotassium);
    const urineChloride = parseFloat(values.urineChloride);

    const uag = urineSodium + urinePotassium - urineChloride;

    let interpretation = "Normal urine anion gap";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (uag < 0) {
      interpretation = "Negative urine anion gap; ammonium excretion preserved";
      status = "low";
    } else if (uag > 10) {
      interpretation = "Positive urine anion gap; impaired ammonium excretion";
      status = "high";
    }

    return {
      value: Math.round(uag),
      unit: "mmol/L",
      interpretation,
      status,
    };
  },
};
