import type { CalculatorDefinition } from "./calculator.types";

export const correctedCalciumCalculator: CalculatorDefinition = {
  id: "corrected-calcium",

  slug: "corrected-calcium",

  name: "Corrected Calcium",

  shortName: "corrected-calcium",

  description:
    "Calculates corrected total serum calcium adjusted for hypoalbuminemia. In hypoalbuminemia, measured total calcium is falsely low because less calcium is protein-bound; this correction estimates the physiologically active total calcium.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Calcium", "Albumin", "Electrolytes", "Hypocalcemia", "Hypercalcemia"],

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



  clinicalNotes:
    "Total serum calcium exists in three fractions: protein-bound (mostly attached to albumin), complexed, and ionized (free) calcium, with the ionized fraction being the physiologically active form. Because roughly 40-50% of total calcium is bound to albumin, hypoalbuminemia lowers the measured total calcium even when ionized calcium is normal. This calculator applies the Payne correction (corrected calcium = measured total calcium + 0.8 x (4 - albumin)) to estimate the total calcium level expected at a normal albumin of 4.0 g/dL.\n\nThe correction is an estimate, not a measurement. It assumes a fixed calcium-albumin binding relationship that varies across patients and becomes progressively less reliable at very low albumin concentrations and in states that alter protein binding, such as acid-base disturbances. The formula is not validated for every setting; it is especially unreliable when screening for hypercalcemia, and the corrected value should not replace ionized calcium measurement when the physiologically active fraction is needed, most notably in critically ill patients.\n\nIonized calcium directly reflects the biologically active fraction and is unaffected by albumin concentration; it is the preferred test when a calcium-albumin binding artifact is suspected or when the clinical question concerns the active form. The corrected value is best used as a transitional estimate to interpret total calcium in patients with abnormal albumin while weighing whether a direct ionized measurement is required.\n\nInterpret the result together with total protein, pH, kidney function, and the clinical presentation. This is an educational decision-support estimate and does not by itself diagnose hypocalcemia or hypercalcemia.",





  comparison: {"title":"Related Calcium / Mineral Metabolism Calculators","calculators":[{"name":"Corrected Calcium","href":"/calculators/corrected-calcium","bestFor":"Correcting total calcium in hypoalbuminemia.","limitation":"Does not replace ionized calcium measurement."},{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not assess albumin or calcium correction."},{"name":"Albumin-to-Creatinine Ratio","href":"/calculators/albumin-creatinine-ratio","bestFor":"CKD screening and staging.","limitation":"Assesses albuminuria, not serum calcium status."}]},

  references: [
    "Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. BMJ. 1973;4(5893):643-646.",
    "Bushinsky DA, Monk RD. Calcium. Lancet. 1998;352(9124):306-311.",
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
  "Result calculated. Interpret in clinical context.";

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