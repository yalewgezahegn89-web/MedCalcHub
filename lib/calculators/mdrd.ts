import type { CalculatorDefinition } from "./calculator.types";

export const mdrdCalculator: CalculatorDefinition = {
  id: "mdrd",

  slug: "mdrd",

  name: "mdrd",

  shortName: "mdrd",

  description:
    "Estimates glomerular filtration rate using the 4-variable MDRD equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "eGFR = 175 * pow(creatinine, -1.154) * pow(age, -0.203) * 0.742",

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
    advice: ["MDRD has largely been replaced by CKD-EPI for routine GFR estimation.","May still be encountered in older laboratory reports and historical records."],
    warnings: ["The MDRD equation tends to underestimate GFR at higher kidney function (>60 mL/min).","Less accurate than CKD-EPI and should not be used for new clinical decisions when CKD-EPI is available."],
    followUp: ["If transitioning from MDRD to CKD-EPI, note that eGFR values may differ and trend direction should be considered."],
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
    175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203) * 0.742;


  
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