import type { CalculatorDefinition } from "./calculator.types";

export const feureaCalculator: CalculatorDefinition = {
  id: "feurea",

  slug: "feurea",

  name: "feurea",

  shortName: "feurea",

  description:
    "Calculates the fractional excretion of urea for renal evaluation, particularly useful when diuretics are present.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "FEUrea = (urineurea / plasmaurea) / (urinecr / plasmacr) * 100",

  normalRange: "< 35% in prerenal azotemia",

  referenceRanges: [
  {
    label: "Prerenal azotemia",
    range: "<35.1",
  },
  {
    label: "Indeterminate",
    range: "35–50",
  },
  {
    label: "Intrinsic renal injury (ATN)",
    range: "≥50",
  }
],

  clinicalGuidance: {
    advice: ["FEUrea can be useful when diuretics are present and FENa is less reliable.","FEUrea < 35% suggests prerenal azotemia; > 50% suggests intrinsic renal injury."],
    warnings: ["FEUrea is less widely validated than FENa and should be used as a complementary test.","Protein intake and corticosteroids can affect urea handling and may alter the ratio."],
    followUp: ["If FEUrea is equivocal, combine with clinical assessment and other urine biomarkers.","Consider renal ultrasound if intrinsic renal injury is suspected."],
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
    id: "urineurea",
    label: "Urine Urea",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "plasmaurea",
    label: "Plasma Urea",
    type: "number",
    unit: "mg/dL",
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





const urineurea =
    Number(values.urineurea);

const plasmaurea =
    Number(values.plasmaurea);

const urinecr =
    Number(values.urinecr);

const plasmacr =
    Number(values.plasmacr);


  const result =
    (urineurea / plasmaurea) / (urinecr / plasmacr) * 100;


  
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


else if (result <= 35) {

  interpretation =
    "Prerenal azotemia";

  status =
    "low";

  referenceRange =
  "<35.1";
}


else if (result >= 35 && result <= 50) {

  interpretation =
    "Indeterminate";

  status =
    "normal";

  referenceRange =
  "35–50";
}


else if (result >= 50) {

  interpretation =
    "Intrinsic renal injury (ATN)";

  status =
    "high";

  referenceRange =
  "≥50";
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