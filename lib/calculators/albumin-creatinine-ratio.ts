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

  updatedAt: "2026-08-06",

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

  evidence: {"source":"KDIGO","reference":"KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.","reviewedBy":"MedCalcHub Clinical Team","version":"2024","updatedAt":"2026-07","link":"https://kdigo.org/guidelines/ckd-evaluation-and-management/"},

  faq: [{"question":"What is the Albumin-to-Creatinine Ratio (ACR)?","answer":"The Albumin-to-Creatinine Ratio estimates the amount of albumin excreted in urine while correcting for urine concentration using creatinine."},{"question":"Why is ACR important?","answer":"ACR is one of the earliest markers of kidney damage and is recommended for screening chronic kidney disease, especially in patients with diabetes or hypertension."},{"question":"What is considered a normal ACR?","answer":"An ACR below 30 mg/g is considered normal or mildly increased (A1)."},{"question":"When should ACR be repeated?","answer":"Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months."}],

  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"Albumin-to-Creatinine Ratio (ACR)","href":"/calculators/albumin-creatinine-ratio","use":"Detects and stages albuminuria."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","use":"Estimates glomerular filtration rate."},{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","use":"Medication dose adjustment."},{"name":"MDRD","href":"/calculators/mdrd","use":"Legacy GFR equation."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["ckd-epi-2021","cockcroft-gault","mdrd","fena","feurea","ttkg"],

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


if (
  values.albumin === "" ||
  values.albumin === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Albumin is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.albumin))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Albumin.",
    status: "critical",
  };
}


if (Number(values.albumin) < 0) {
  return {
    value: 0,
    interpretation: "Urine Albumin cannot be negative.",
    status: "critical",
  };
}


if (Number(values.albumin) === 0) {
  return {
    value: 0,
    interpretation: "Urine Albumin cannot be zero.",
    status: "critical",
  };
}


if (
  values.creatinine === "" ||
  values.creatinine === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Creatinine is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.creatinine))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Creatinine.",
    status: "critical",
  };
}


if (Number(values.creatinine) < 0) {
  return {
    value: 0,
    interpretation: "Urine Creatinine cannot be negative.",
    status: "critical",
  };
}


if (Number(values.creatinine) === 0) {
  return {
    value: 0,
    interpretation: "Urine Creatinine cannot be zero.",
    status: "critical",
  };
}



const albumin = Number(values.albumin);
const creatinine = Number(values.creatinine);


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