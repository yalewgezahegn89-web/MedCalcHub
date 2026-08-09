import type { CalculatorDefinition } from "./calculator.types";

export const correctedCalciumCalculator: CalculatorDefinition = {
  id: "corrected-calcium",

  slug: "corrected-calcium",

  name: "corrected-calcium",

  shortName: "corrected-calcium",

  description:
    "Calculates corrected total serum calcium adjusted for hypoalbuminemia. In hypoalbuminemia, measured total calcium is falsely low because less calcium is protein-bound; this correction estimates the physiologically active total calcium.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Corrected Calcium = calcium + 0.8 * (4 - albumin)",

  normalRange: "8.5–10.5 mg/dL",

  referenceRanges: [
  {
    label: "Hypocalcemia",
    range: "<8.5",
  },
  {
    label: "Normal corrected calcium",
    range: "8.5–10.5",
  },
  {
    label: "Hypercalcemia",
    range: "≥10.6",
  },
  {
    label: "Severe hypercalcemia",
    range: "≥12.5",
  }
],

  clinicalGuidance: {
    advice: ["Use this correction when serum albumin is low (e.g. nephrotic syndrome, liver disease, malnutrition) and the measured total calcium appears falsely normal or low.","The corrected calcium is an estimate; ionized (free) calcium measurement is the gold standard when available.","This formula assumes albumin is 4.0 g/dL as normal; results become less reliable when albumin is < 2.0 g/dL."],
    warnings: ["This correction is not validated for hypercalcemia—ionized calcium is preferred in that setting.","Does not account for changes in serum pH, which also affect calcium binding to albumin.","The factor 0.8 may not apply across all patient populations; some institutions use 0.7 or 0.73."],
    followUp: ["If corrected calcium is abnormal, confirm with ionized calcium measurement.","Evaluate for underlying causes: hypoalbuminemia, hyperparathyroidism, vitamin D deficiency, malignancy.","In critically ill patients, measure ionized calcium directly rather than relying on correction."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"NACB / Lab Medicine","reference":"Pay DA, et al. Corrected calcium in hypercalcaemia and hypocalcaemia. Ann Clin Biochem. 2004;41:486–488.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Pay DA, et al. Ann Clin Biochem. 2004;41:486–488.","NACB Guidelines on Calcium and Phosphate Measurement.","KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017."]},

  faq: [{"question":"Why correct calcium for albumin?","answer":"About 40–50% of serum calcium is bound to albumin. When albumin is low (e.g. liver disease, nephrotic syndrome), total calcium appears falsely low even though ionized (biologically active) calcium may be normal. The correction factor estimates what total calcium would be at a normal albumin of 4.0 g/dL."},{"question":"What does a corrected calcium above normal mean?","answer":"A corrected calcium > 10.5 mg/dL suggests true hypercalcemia. Common causes include primary hyperparathyroidism, malignancy, vitamin D toxicity, and granulomatous disease. Confirm with ionized calcium and investigate accordingly."},{"question":"Is ionized calcium better than corrected calcium?","answer":"Yes. Ionized (free) calcium directly measures the physiologically active fraction and is not affected by albumin. It is the preferred test, but the correction is useful when ionized calcium measurement is unavailable."},{"question":"Can this formula be used in children?","answer":"The formula is validated in adults. Neonatal and paediatric reference ranges and correction factors differ; consult local guidelines for those populations."}],

  comparison: {"title":"Related Calcium / Mineral Metabolism Calculators","calculators":[{"name":"Corrected Calcium","href":"/calculators/corrected-calcium","bestFor":"Correcting total calcium in hypoalbuminemia.","limitation":"Does not replace ionized calcium measurement."},{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not assess albumin or calcium correction."},{"name":"Albumin-to-Creatinine Ratio","href":"/calculators/albumin-creatinine-ratio","bestFor":"CKD screening and staging.","limitation":"Assesses albuminuria, not serum calcium status."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["calcium-phosphate-product","albumin-creatinine-ratio","ckd-epi-2021","anion-gap"],

  inputs: [
  {
    id: "calcium",
    label: "Measured Calcium",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "albumin",
    label: "Albumin",
    type: "number",
    unit: "g/dL",
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
    interpretation: "Measured Calcium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.calcium))
) {
  return {
    value: 0,
    interpretation: "Invalid Measured Calcium.",
    status: "critical",
  };
}


if (Number(values.calcium) < 0) {
  return {
    value: 0,
    interpretation: "Measured Calcium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.calcium) === 0) {
  return {
    value: 0,
    interpretation: "Measured Calcium cannot be zero.",
    status: "critical",
  };
}


if (
  values.albumin === "" ||
  values.albumin === undefined
) {
  return {
    value: 0,
    interpretation: "Albumin is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.albumin))
) {
  return {
    value: 0,
    interpretation: "Invalid Albumin.",
    status: "critical",
  };
}


if (Number(values.albumin) < 0) {
  return {
    value: 0,
    interpretation: "Albumin cannot be negative.",
    status: "critical",
  };
}


if (Number(values.albumin) === 0) {
  return {
    value: 0,
    interpretation: "Albumin cannot be zero.",
    status: "critical",
  };
}



const calcium = Number(values.calcium);
const ca = calcium;
const albumin = Number(values.albumin);


  const result =
    calcium + 0.8 * (4 - albumin);


  
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

if (result < 8.5) {

  interpretation =
    "Hypocalcemia";

  status =
    "low";

  referenceRange =
  "<8.5";
}


else if (result <= 10.5) {

  interpretation =
    "Normal corrected calcium";

  status =
    "normal";

  referenceRange =
  "8.5–10.5";
}


else if (result >= 12.5) {

  interpretation =
    "Severe hypercalcemia";

  status =
    "critical";

  referenceRange =
  "≥12.5";
}


else {

  interpretation =
    "Hypercalcemia";

  status =
    "high";

  referenceRange =
  "≥10.6";
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