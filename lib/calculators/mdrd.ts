import type { CalculatorDefinition } from "./calculator.types";

export const mdrdCalculator: CalculatorDefinition = {
  id: "mdrd",

  slug: "mdrd",

  name: "MDRD GFR Equation",

  shortName: "mdrd",

  description:
    "Estimates glomerular filtration rate using the 4-variable MDRD equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["eGFR", "Kidney", "Renal", "Glomerular Filtration Rate", "CKD", "Kidney Function"],

  formula: "eGFR = 175 × (creatinine)^-1.154 × (age)^-0.203 × 0.742 (if female)",

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



  clinicalNotes:
    "The Modification of Diet in Renal Disease (MDRD) equation estimates glomerular filtration rate (eGFR) from serum creatinine, age, and sex. It was the reference equation for estimating GFR for many years before being updated and progressively superseded by the CKD-EPI equation in laboratory reporting and clinical staging.\n\nThe validity of the estimate depends on creatinine measurement being standardized and traceable to the isotope dilution mass spectrometry (IDMS) reference method. When only non-IDMS-traceable creatinine values are available, the MDRD equation performs differently, which is why the laboratory's creatinine standardization must match the equation version used. The equation reports eGFR normalized to a standard body surface area (mL/min/1.73m2), not an absolute clearance.\n\nCompared with CKD-EPI, the MDRD equation is generally less accurate at higher GFR values (where CKD-EPI shows less systematic bias) and was derived from a predominantly CKD population. It is intended for adults and is not validated in children, pregnant women, or patients with rapidly changing kidney function (such as acute kidney injury), severe malnutrition, amputations, or unusual muscle mass, where steady-state assumptions do not hold.\n\nAn estimated GFR is an approximation of kidney function, not a measured value and not a diagnosis by itself; MDRD-based eGFR alone is not appropriate as a standalone diagnosis of chronic kidney disease. The result should be interpreted together with the clinical context, and where accuracy matters most, a measured GFR test may be preferred.",





  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"MDRD","href":"/calculators/mdrd","bestFor":"Historical comparison with older lab results.","limitation":"Largely replaced by CKD-EPI for clinical use."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Current clinical practice and CKD staging.","limitation":"Not intended for medication dosing."},{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","bestFor":"Medication dosing.","limitation":"Less accurate for true GFR."}]},

  references: [
    "Levey AS, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130(6):461-470.",
    "Levey AS, et al. Using standardized serum creatinine values in the modification of diet in renal disease study equation for estimating glomerular filtration rate. Ann Intern Med. 2006;145(4):247-254.",
    "KDIGO 2024 Working Group. Kidney Disease: Improving Global Outcomes (KDIGO) 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117-S314.",
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
const sex = Number(values.sex);
const creatinine = Number(values.creatinine);


  const isFemale = values.sex === "2" || values.sex?.toLowerCase() === "female";
  const result =
    175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203) * (isFemale ? 0.742 : 1);


  
let interpretation: string;

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