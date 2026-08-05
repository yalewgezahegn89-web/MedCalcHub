import type { CalculatorDefinition } from "./calculator.types";

export const ttkgCalculator: CalculatorDefinition = {
  id: "ttkg",

  slug: "ttkg",

  name: "ttkg",

  shortName: "ttkg",

  description:
    "Calculates the transtubular potassium gradient to assess renal potassium handling.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "TTKG = (urinek * plasmaosmolality) / (plasmak * urineosmolality)",

  normalRange: "8–12",

  referenceRanges: [
  {
    label: "Impaired K⁺ secretion",
    range: "<8.1",
  },
  {
    label: "Normal renal K⁺ response",
    range: "8–12",
  },
  {
    label: "Enhanced K⁺ secretion",
    range: "≥12",
  }
],

  clinicalGuidance: {
    advice: ["TTKG is used to assess the renal response to potassium handling, particularly in the evaluation of hyperkalemia.","A TTKG > 10 in the setting of hyperkalemia suggests intact aldosterone-mediated potassium secretion.","A TTKG < 8 in hyperkalemia suggests impaired distal potassium secretion (e.g. hypoaldosteronism, AKI)."],
    warnings: ["Interpretation may be affected by diuretics and other renal conditions.","Some experts have questioned the physiological validity of TTKG; use in conjunction with clinical assessment."],
    followUp: ["If TTKG suggests impaired potassium secretion, evaluate aldosterone and renin levels.","Consider renal biopsy if intrinsic tubular disease is suspected."],
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
    id: "urinek",
    label: "Urine Potassium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "plasmak",
    label: "Plasma Potassium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "urineosmolality",
    label: "Urine Osmolality",
    type: "number",
    unit: "mOsm/kg",
    required: true,
  },
  {
    id: "plasmaosmolality",
    label: "Plasma Osmolality",
    type: "number",
    unit: "mOsm/kg",
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





const urinek =
    Number(values.urinek);

const plasmak =
    Number(values.plasmak);

const urineosmolality =
    Number(values.urineosmolality);

const plasmaosmolality =
    Number(values.plasmaosmolality);


  const result =
    (urinek * plasmaosmolality) / (plasmak * urineosmolality);


  
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


else if (result <= 8) {

  interpretation =
    "Impaired K⁺ secretion";

  status =
    "low";

  referenceRange =
  "<8.1";
}


else if (result >= 8 && result <= 12) {

  interpretation =
    "Normal renal K⁺ response";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else if (result >= 12) {

  interpretation =
    "Enhanced K⁺ secretion";

  status =
    "high";

  referenceRange =
  "≥12";
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