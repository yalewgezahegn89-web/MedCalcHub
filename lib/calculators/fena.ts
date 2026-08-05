import type { CalculatorDefinition } from "./calculator.types";

export const fenaCalculator: CalculatorDefinition = {
  id: "fena",

  slug: "fena",

  name: "fena",

  shortName: "fena",

  description:
    "Calculates the fractional excretion of sodium to distinguish prerenal azotemia from acute tubular necrosis.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "FENa = (urinena / plasmana) / (urinecr / plasmacr) * 100",

  normalRange: "< 1% in prerenal azotemia",

  referenceRanges: [
  {
    label: "Prerenal azotemia",
    range: "<1.1",
  },
  {
    label: "Indeterminate",
    range: "1–2",
  },
  {
    label: "Intrinsic renal injury (ATN)",
    range: "≥2",
  }
],

  clinicalGuidance: {
    advice: ["FENa < 1% suggests prerenal azotemia; FENa > 2% suggests intrinsic renal injury (e.g. acute tubular necrosis).","Use urine studies and clinical context to guide interpretation."],
    warnings: ["FENa may be unreliable in patients receiving diuretics, which increase urinary sodium excretion.","In the elderly and in chronic kidney disease, FENa may not accurately distinguish prerenal from intrinsic causes."],
    followUp: ["If FENa is equivocal (1–2%), consider FEUrea as a complementary test.","Repeat urine electrolytes if the clinical picture does not match the initial result."],
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
    id: "urinena",
    label: "Urine Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "plasmana",
    label: "Plasma Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "urinecr",
    label: "Urine Creatinine",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "plasmacr",
    label: "Plasma Creatinine",
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





const urinena =
    Number(values.urinena);

const plasmana =
    Number(values.plasmana);

const urinecr =
    Number(values.urinecr);

const plasmacr =
    Number(values.plasmacr);


  const result =
    (urinena / plasmana) / (urinecr / plasmacr) * 100;


  
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


else if (result <= 1) {

  interpretation =
    "Prerenal azotemia";

  status =
    "low";

  referenceRange =
  "<1.1";
}


else if (result >= 1 && result <= 2) {

  interpretation =
    "Indeterminate";

  status =
    "normal";

  referenceRange =
  "1–2";
}


else if (result >= 2) {

  interpretation =
    "Intrinsic renal injury (ATN)";

  status =
    "high";

  referenceRange =
  "≥2";
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