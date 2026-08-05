import type { CalculatorDefinition } from "./calculator.types";

export const cockcroftGaultCalculator: CalculatorDefinition = {
  id: "cockcroft-gault",

  slug: "cockcroft-gault",

  name: "cockcroft-gault",

  shortName: "cockcroft-gault",

  description:
    "Estimates creatinine clearance (CrCl) for medication dosing using the Cockcroft-Gault equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "CrCl = ((140 - age) * weight) / (72 * creatinine) * 0.85",

  normalRange: "90–120 mL/min",

  referenceRanges: [
  {
    label: "Normal renal function",
    range: "≥90",
  },
  {
    label: "Mild renal impairment",
    range: "60–89",
  },
  {
    label: "Moderate renal impairment",
    range: "30–59",
  },
  {
    label: "Severe renal impairment",
    range: "15–29",
  },
  {
    label: "Kidney failure",
    range: "<14.1",
  }
],

  clinicalGuidance: {
    advice: ["Use actual body weight unless adjusted body weight is clinically indicated (e.g. obesity).","Cockcroft-Gault remains the preferred equation for many drug dosing recommendations.","Use stable serum creatinine; avoid using values during acute kidney injury for chronic dosing."],
    warnings: ["Not recommended for unstable kidney function or acute kidney injury.","Overestimates creatinine clearance in elderly patients with low muscle mass.","Does not provide direct GFR estimation; use CKD-EPI for CKD staging."],
    followUp: ["Verify drug-specific dosing guidelines for renal adjustment thresholds.","Monitor renal function periodically in patients with CrCl < 50 mL/min."],
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
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
  },
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
  },
  {
    id: "sex",
    label: "Sex",
    type: "select",
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





const age =
    Number(values.age);

const weight =
    Number(values.weight);

const sex =
    Number(values.sex);

const creatinine =
    Number(values.creatinine);


  const result =
    ((140 - age) * weight) / (72 * creatinine) * 0.85;


  
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


else if (result >= 90) {

  interpretation =
    "Normal renal function";

  status =
    "normal";

  referenceRange =
  "≥90";
}


else if (result >= 60 && result <= 89) {

  interpretation =
    "Mild renal impairment";

  status =
    "normal";

  referenceRange =
  "60–89";
}


else if (result >= 30 && result <= 59) {

  interpretation =
    "Moderate renal impairment";

  status =
    "low";

  referenceRange =
  "30–59";
}


else if (result >= 15 && result <= 29) {

  interpretation =
    "Severe renal impairment";

  status =
    "low";

  referenceRange =
  "15–29";
}


else if (result <= 14) {

  interpretation =
    "Kidney failure";

  status =
    "critical";

  referenceRange =
  "<14.1";
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