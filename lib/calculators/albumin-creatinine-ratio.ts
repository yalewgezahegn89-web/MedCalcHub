import type { CalculatorDefinition } from "./calculator.types";

export const albuminCreatinineRatioCalculator: CalculatorDefinition = {
  id: "albumin-creatinine-ratio",

  slug: "albumin-creatinine-ratio",

  name: "albumin-creatinine-ratio",

  shortName: "albumin-creatinine-ratio",

  description:
    "Calculates urine albumin-to-creatinine ratio (ACR) for CKD screening and staging.",

  category: "Nephrology",

  specialty: "Nephrology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "ACR = albumin / creatinine",

  normalRange: "<30 mg/g",

  referenceRanges: [
  {
    label: "A1: Normal to mildly increased",
    range: "<29.1",
  },
  {
    label: "A2: Moderately increased",
    range: "30–300",
  },
  {
    label: "A3: Severely increased",
    range: "≥301",
  }
],

  clinicalGuidance: {
    advice: ["Persistent albuminuria is one of the earliest indicators of chronic kidney disease and should always be interpreted together with eGFR.","ACR is recommended for CKD screening in patients with diabetes, hypertension, or family history of kidney disease."],
    warnings: ["Diagnosing CKD from a single abnormal ACR result.","Ignoring transient albuminuria caused by fever, exercise, or urinary tract infection.","Using ACR alone without assessing kidney function (eGFR)."],
    followUp: ["Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months.","If ACR > 30 mg/g, repeat testing and evaluate eGFR for CKD staging."],
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
    id: "albumin",
    label: "Urine Albumin",
    type: "number",
    unit: "mg/L",
    required: true,
  },
  {
    id: "creatinine",
    label: "Urine Creatinine",
    type: "number",
    unit: "g/L",
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





const albumin =
    Number(values.albumin);

const creatinine =
    Number(values.creatinine);


  const result =
    albumin / creatinine;


  
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


else if (result <= 29) {

  interpretation =
    "A1: Normal to mildly increased";

  status =
    "normal";

  referenceRange =
  "<29.1";
}


else if (result >= 30 && result <= 300) {

  interpretation =
    "A2: Moderately increased";

  status =
    "high";

  referenceRange =
  "30–300";
}


else if (result >= 301) {

  interpretation =
    "A3: Severely increased";

  status =
    "critical";

  referenceRange =
  "≥301";
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