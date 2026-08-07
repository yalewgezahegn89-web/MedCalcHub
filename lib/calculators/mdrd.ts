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

  updatedAt: "2026-08-06",

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

  evidence: {"source":"NKF / Levey et al.","reference":"Levey AS, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130:461-470.","reviewedBy":"MedCalcHub Clinical Team","version":"1999","updatedAt":"2026-07","references":["Levey AS, et al. Ann Intern Med. 1999;130:461-470.","KDIGO 2024 Clinical Practice Guideline for CKD."]},

  faq: [{"question":"Is MDRD still used clinically?","answer":"Most laboratories have transitioned to CKD-EPI, but MDRD may still appear on older reports. CKD-EPI is now preferred."},{"question":"Why is MDRD less accurate at higher GFR?","answer":"The MDRD equation was developed in patients with known CKD and was not validated in healthy individuals, leading to underestimation at higher GFR values."}],

  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"MDRD","href":"/calculators/mdrd","bestFor":"Historical comparison with older lab results.","limitation":"Largely replaced by CKD-EPI for clinical use."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Current clinical practice and CKD staging.","limitation":"Not intended for medication dosing."},{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","bestFor":"Medication dosing.","limitation":"Less accurate for true GFR."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["ckd-epi-2021","cockcroft-gault","bun-creatinine-ratio"],

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


if (
  values.age === "" ||
  values.age === undefined
) {
  return {
    value: 0,
    interpretation: "Age is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.age))
) {
  return {
    value: 0,
    interpretation: "Invalid Age.",
    status: "critical",
  };
}


if (Number(values.age) < 0) {
  return {
    value: 0,
    interpretation: "Age cannot be negative.",
    status: "critical",
  };
}


if (Number(values.age) === 0) {
  return {
    value: 0,
    interpretation: "Age cannot be zero.",
    status: "critical",
  };
}


if (
  values.sex === "" ||
  values.sex === undefined
) {
  return {
    value: 0,
    interpretation: "Sex is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sex))
) {
  return {
    value: 0,
    interpretation: "Invalid Sex.",
    status: "critical",
  };
}


if (Number(values.sex) < 0) {
  return {
    value: 0,
    interpretation: "Sex cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sex) === 0) {
  return {
    value: 0,
    interpretation: "Sex cannot be zero.",
    status: "critical",
  };
}


if (
  values.creatinine === "" ||
  values.creatinine === undefined
) {
  return {
    value: 0,
    interpretation: "Serum Creatinine is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.creatinine))
) {
  return {
    value: 0,
    interpretation: "Invalid Serum Creatinine.",
    status: "critical",
  };
}


if (Number(values.creatinine) < 0) {
  return {
    value: 0,
    interpretation: "Serum Creatinine cannot be negative.",
    status: "critical",
  };
}


if (Number(values.creatinine) === 0) {
  return {
    value: 0,
    interpretation: "Serum Creatinine cannot be zero.",
    status: "critical",
  };
}



const age = Number(values.age);
const sex = Number(values.sex);
const creatinine = Number(values.creatinine);


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