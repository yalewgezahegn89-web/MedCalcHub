import type { CalculatorDefinition } from "./calculator.types";

export const ckdEpi2021Calculator: CalculatorDefinition = {
  id: "ckd-epi-2021",

  slug: "ckd-epi-2021",

  name: "ckd-epi-2021",

  shortName: "ckd-epi-2021",

  description:
    "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "eGFR = 142 * pow(min(creatinine / 0.9, 1), -0.302) * pow(max(creatinine / 0.9, 1), -1.2) * pow(0.9938, age) * 1.012",

  normalRange: "≥90 mL/min/1.73 m²",

  referenceRanges: [
  {
    label: "G1: Normal or high",
    range: "≥90",
  },
  {
    label: "G2: Mildly decreased",
    range: "60–89",
  },
  {
    label: "G3a: Mild to moderate",
    range: "45–59",
  },
  {
    label: "G3b: Moderate to severe",
    range: "30–44",
  },
  {
    label: "G4: Severely decreased",
    range: "15–29",
  },
  {
    label: "G5: Kidney failure",
    range: "<14.1",
  }
],

  clinicalGuidance: {
    advice: ["Use CKD-EPI 2021 (race-free) as the preferred equation for estimating GFR in clinical practice.","Interpret eGFR alongside albuminuria (ACR) for CKD staging per KDIGO guidelines.","Repeat testing after 3 months to confirm chronicity before diagnosing CKD."],
    warnings: ["CKD-EPI is an estimate and may be inaccurate in extremes of muscle mass, amputees, or pregnancy.","Do not use CKD-EPI for medication dosing without checking drug-specific guidance; Cockcroft-Gault may be required."],
    followUp: ["If eGFR < 60 mL/min/1.73 m², repeat within 3 months to assess for chronicity.","Evaluate for albuminuria with urine ACR in all patients with reduced eGFR.","Refer to nephrology if eGFR < 30 or rapidly declining."],
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

const sex =
    Number(values.sex);

const creatinine =
    Number(values.creatinine);


  const result =
    142 * Math.pow(Math.min(creatinine / 0.9, 1), -0.302) * Math.pow(Math.max(creatinine / 0.9, 1), -1.2) * Math.pow(0.9938, age) * 1.012;


  
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
    "G1: Normal or high";

  status =
    "normal";

  referenceRange =
  "≥90";
}


else if (result >= 60 && result <= 89) {

  interpretation =
    "G2: Mildly decreased";

  status =
    "normal";

  referenceRange =
  "60–89";
}


else if (result >= 45 && result <= 59) {

  interpretation =
    "G3a: Mild to moderate";

  status =
    "low";

  referenceRange =
  "45–59";
}


else if (result >= 30 && result <= 44) {

  interpretation =
    "G3b: Moderate to severe";

  status =
    "low";

  referenceRange =
  "30–44";
}


else if (result >= 15 && result <= 29) {

  interpretation =
    "G4: Severely decreased";

  status =
    "low";

  referenceRange =
  "15–29";
}


else if (result <= 14) {

  interpretation =
    "G5: Kidney failure";

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