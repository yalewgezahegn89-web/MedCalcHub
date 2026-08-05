import type { CalculatorDefinition } from "./calculator.types";

export const bunCreatinineRatioCalculator: CalculatorDefinition = {
  id: "bun-creatinine-ratio",

  slug: "bun-creatinine-ratio",

  name: "bun-creatinine-ratio",

  shortName: "bun-creatinine-ratio",

  description:
    "Calculates the Blood Urea Nitrogen to Creatinine ratio to help differentiate causes of kidney dysfunction.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "BUN = bun / creatinine",

  normalRange: "10:1 – 20:1",

  referenceRanges: [
  {
    label: "Low ratio",
    range: "<9.1",
  },
  {
    label: "Normal ratio",
    range: "10–20",
  },
  {
    label: "Elevated ratio",
    range: "≥21",
  }
],

  clinicalGuidance: {
    advice: ["An elevated BUN/Creatinine ratio may suggest prerenal azotemia, gastrointestinal bleeding, or dehydration, but should always be interpreted in clinical context.","Use alongside urinalysis and urine electrolytes for a more complete picture of renal function."],
    warnings: ["Interpret the ratio together with the clinical presentation; it is not diagnostic in isolation.","High-protein diets, corticosteroids, and GI bleeding can elevate BUN independently of kidney function."],
    followUp: ["If the ratio is elevated, assess volume status and consider urine sodium and fractional excretion of sodium.","If prerenal causes are excluded, evaluate for intrinsic renal or postrenal etiologies."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "bun",
    label: "Blood Urea Nitrogen",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "creatinine",
    label: "Serum Creatinine",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {



for (
  const key of Object.keys(values)
) {

  const inputValue =
    Number(values[key]);


  if (
    values[key] === "" ||
    values[key] === undefined
  ) {

    return {

      value: 0,

      interpretation:
        "Required input missing.",

      status:
        "critical",

    };

  }


  if (
    Number.isNaN(inputValue)
  ) {

    return {

      value: 0,

      interpretation:
        "Invalid numeric input.",

      status:
        "critical",

    };

  }


  if (
    inputValue < 0
  ) {

    return {

      value: 0,

      interpretation:
        "Negative values are not allowed.",

      status:
        "critical",

    };

  }

}





const bun =
    Number(values.bun);

const creatinine =
    Number(values.creatinine);


  const result =
    bun / creatinine;


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";

if (false) {}


else if (result <= 9) {

  interpretation =
    "Low ratio";

  status =
    "low";

  referenceRange =
  "<9.1";
}


else if (result >= 10 && result <= 20) {

  interpretation =
    "Normal ratio";

  status =
    "normal";

  referenceRange =
  "10–20";
}


else if (result >= 21) {

  interpretation =
    "Elevated ratio";

  status =
    "high";

  referenceRange =
  "≥21";
}





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};