import type { CalculatorDefinition } from "./calculator.types";

export const ckdEpi2021Calculator: CalculatorDefinition = {
  id: "ckd-epi-2021",

  slug: "ckd-epi-2021",

  name: "CKD-EPI 2021 eGFR Equation",

  shortName: "ckd-epi-2021",

  description:
    "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["eGFR", "Kidney", "Renal", "Glomerular Filtration Rate", "CKD", "Kidney Function", "Nephrology"],

  formula: "eGFR = 142 * min(creatinine / κ, 1)^α * max(creatinine / κ, 1)^-1.2 * 0.9938^age (× 1.012 if female); κ = 0.7 female / 0.9 male; α = −0.241 female / −0.302 male",

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
    range: "<15",
  }
],

  clinicalGuidance: {
    advice: ["Use CKD-EPI 2021 (race-free) as the preferred equation for estimating GFR in clinical practice.","Interpret eGFR alongside albuminuria (ACR) for CKD staging per KDIGO guidelines.","Repeat testing after 3 months to confirm chronicity before diagnosing CKD."],
    warnings: ["CKD-EPI is an estimate and may be inaccurate in extremes of muscle mass, amputees, or pregnancy.","Do not use CKD-EPI for medication dosing without checking drug-specific guidance; Cockcroft-Gault may be required."],
    followUp: ["If eGFR < 60 mL/min/1.73 m², repeat within 3 months to assess for chronicity.","Evaluate for albuminuria with urine ACR in all patients with reduced eGFR.","Refer to nephrology if eGFR < 30 or rapidly declining."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"NKF / KDIGO","reference":"Inker LA, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. NEJM. 2021;385:1737-1749.","reviewedBy":"MedCalcHub Clinical Team","version":"2021","updatedAt":"2026-07","references":["Inker LA, et al. NEJM. 2021.","KDIGO 2024 Clinical Practice Guideline for CKD."]},

  faq: [{"question":"What does eGFR measure?","answer":"eGFR estimates how well the kidneys are filtering waste from the blood, expressed in mL/min/1.73 m²."},{"question":"Why was the race variable removed from CKD-EPI?","answer":"The 2021 equation removed race because including it was not scientifically justified and contributed to health disparities in CKD detection."},{"question":"Is CKD-EPI better than MDRD?","answer":"Yes. CKD-EPI is more accurate at higher GFR values and is now the preferred equation in most guidelines."}],

  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Routine estimation of kidney function and CKD staging.","limitation":"Not intended for medication dosing."},{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","bestFor":"Drug dosing adjustment.","limitation":"Less accurate for estimating true GFR."},{"name":"MDRD","href":"/calculators/mdrd","bestFor":"Historical comparison.","limitation":"Reduced accuracy at higher GFR."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["cockcroft-gault","mdrd","albumin-creatinine-ratio","bun-creatinine-ratio"],

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
    options: [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" },
    ],
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
const creatinine = Number(values.creatinine);

const isFemale = values.sex === "2" || values.sex?.toLowerCase() === "female";
const kappa = isFemale ? 0.7 : 0.9;
const alpha = isFemale ? -0.241 : -0.302;
const femaleFactor = isFemale ? 1.012 : 1;

  const result =
    142 * Math.pow(Math.min(creatinine / kappa, 1), alpha) * Math.pow(Math.max(creatinine / kappa, 1), -1.2) * Math.pow(0.9938, age) * femaleFactor;


  
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

if (result >= 90) {

  interpretation =
    "G1: Normal or high";

  status =
    "normal";

  referenceRange =
  "≥90";
}

else if (result >= 60) {

  interpretation =
    "G2: Mildly decreased";

  status =
    "normal";

  referenceRange =
  "60–89";
}

else if (result >= 45) {

  interpretation =
    "G3a: Mild to moderate";

  status =
    "low";

  referenceRange =
  "45–59";
}


else if (result >= 30) {

  interpretation =
    "G3b: Moderate to severe";

  status =
    "low";

  referenceRange =
  "30–44";
}

else if (result >= 15) {

  interpretation =
    "G4: Severely decreased";

  status =
    "low";

  referenceRange =
  "15–29";
}


else {

  interpretation =
    "G5: Kidney failure";

  status =
    "critical";

  referenceRange =
  "<15";
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