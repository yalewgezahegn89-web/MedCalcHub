import type { CalculatorDefinition } from "./calculator.types";

export const calciumPhosphateProductCalculator: CalculatorDefinition = {
  id: "calcium-phosphate-product",

  slug: "calcium-phosphate-product",

  name: "Calcium-Phosphate Product",

  shortName: "calcium-phosphate-product",

  description:
    "Calculates the calcium-phosphate product used in renal risk assessment for vascular calcification.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Calcium Phosphate Product", "CKD", "Kidney", "Renal", "Hyperparathyroidism", "Metastatic Calcification"],

  formula: "CaP = calcium * phosphate",

  normalRange: "< 55 mg²/dL²",

  referenceRanges: [
  {
    label: "Acceptable",
    range: "<55.1",
  },
  {
    label: "Elevated — increased calcification risk",
    range: "55–70",
  },
  {
    label: "Critically elevated — high calcification risk",
    range: "≥70",
  }
],

  clinicalGuidance: {
    advice: ["An elevated calcium-phosphate product (> 55 mg²/dL²) is associated with an increased risk of vascular calcification and cardiovascular morbidity.","This product is particularly important to monitor in patients with chronic kidney disease and those on dialysis."],
    warnings: ["This should be interpreted with the patient's renal and mineral metabolism status.","Treat phosphate elevation rather than calcium alone to reduce the calcium-phosphate product."],
    followUp: ["If elevated, assess dietary phosphorus intake and consider phosphate binders.","Monitor parathyroid hormone (PTH) and vitamin D levels in CKD patients."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Nephrology Literature","reference":"KDIGO CKD-MBD Guideline. Improving global outcomes (KDIGO) CKD-MBD update. Kidney Int Suppl. 2017;7:1-59.","reviewedBy":"MedCalcHub Clinical Team","version":"2017","updatedAt":"2026-07","references":["Nephrology references","Clinical practice guidelines"]},

  faq: [{"question":"What does an elevated calcium-phosphate product mean?","answer":"A product > 55 mg²/dL² indicates an increased risk of metastatic calcification and vascular calcification, especially in CKD patients."},{"question":"How do you lower the calcium-phosphate product?","answer":"Reduce dietary phosphorus, use phosphate binders, and optimize dialysis adequacy. Avoid excessive calcium-based binders."}],

  comparison: {"title":"Which Mineral Metabolism Calculator Should I Use?","calculators":[{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not directly measure PTH or vitamin D status."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Estimating kidney function.","limitation":"Does not assess mineral metabolism."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["ckd-epi-2021","cockcroft-gault","albumin-creatinine-ratio"],

  inputs: [
  {
    id: "calcium",
    label: "Calcium",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "phosphate",
    label: "Phosphate",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.calcium === "" ||
  values.calcium === undefined
) {
  return {
    value: 0,
    interpretation: "Calcium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.calcium))
) {
  return {
    value: 0,
    interpretation: "Invalid Calcium.",
    status: "critical",
  };
}


if (Number(values.calcium) < 0) {
  return {
    value: 0,
    interpretation: "Calcium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.calcium) === 0) {
  return {
    value: 0,
    interpretation: "Calcium cannot be zero.",
    status: "critical",
  };
}


if (
  values.phosphate === "" ||
  values.phosphate === undefined
) {
  return {
    value: 0,
    interpretation: "Phosphate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.phosphate))
) {
  return {
    value: 0,
    interpretation: "Invalid Phosphate.",
    status: "critical",
  };
}


if (Number(values.phosphate) < 0) {
  return {
    value: 0,
    interpretation: "Phosphate cannot be negative.",
    status: "critical",
  };
}


if (Number(values.phosphate) === 0) {
  return {
    value: 0,
    interpretation: "Phosphate cannot be zero.",
    status: "critical",
  };
}



const calcium = Number(values.calcium);
const ca = calcium;
const phosphate = Number(values.phosphate);


  const result =
    calcium * phosphate;


  
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

if (result < 55) {

  interpretation =
    "Acceptable";

  status =
    "normal";

  referenceRange =
  "<55.1";
}


else if (result <= 70) {

  interpretation =
    "Elevated — increased calcification risk";

  status =
    "high";

  referenceRange =
  "55–70";
}


else {

  interpretation =
    "Critically elevated — high calcification risk";

  status =
    "critical";

  referenceRange =
  "≥70";
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