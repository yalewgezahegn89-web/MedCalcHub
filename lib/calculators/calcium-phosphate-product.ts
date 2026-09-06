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



  clinicalNotes:
    "The calcium-phosphate (Ca × P) product estimates the combined mineral load that may promote metastatic and vascular calcification. It is most often used in patients with chronic kidney disease (CKD) and CKD–mineral and bone disorder (CKD-MBD), where disordered calcium and phosphate homeostasis accelerates extraskeletal calcification.\n\nValues below 55 mg²/dL² are generally considered acceptable. Products of 55–70 mg²/dL² indicate an elevated calcification burden and warrant closer monitoring of phosphate binders, dietary phosphate, and vitamin D analogue dosing. Products of ≥70 mg²/dL² are critically elevated and are associated with a markedly increased risk of soft-tissue and vascular calcification, warranting urgent review of the CKD-MBD management plan.\n\nThe product should be interpreted alongside intact PTH, alkaline phosphatase, serum bicarbonate, vitamin D metabolites, and the clinical picture. An elevated Ca × P product reflects the combined effect of hypercalcemia, hyperphosphatemia, or both; the underlying cause determines management. Limitations include that it does not directly quantify tissue calcification, does not replace imaging when calcification is suspected, and should not be used in isolation to guide therapy. KDIGO guidelines recommend maintaining calcium and phosphate levels toward the normal range rather than targeting a specific product threshold.",





  comparison: {"title":"Which Mineral Metabolism Calculator Should I Use?","calculators":[{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not directly measure PTH or vitamin D status."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Estimating kidney function.","limitation":"Does not assess mineral metabolism."}]},

  references: [
    "KDIGO. Clinical Practice Guideline Update for the Diagnosis, Evaluation, Prevention, and Treatment of CKD-MBD. Kidney Int Suppl. 2017;7(1):1-59.",
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


  
let interpretation: string;

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