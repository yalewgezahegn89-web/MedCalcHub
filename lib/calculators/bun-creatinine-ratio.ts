import type { CalculatorDefinition } from "./calculator.types";

export const bunCreatinineRatioCalculator: CalculatorDefinition = {
  id: "bun-creatinine-ratio",

  slug: "bun-creatinine-ratio",

  name: "BUN/Creatinine Ratio",

  shortName: "bun-creatinine-ratio",

  description:
    "Calculates the Blood Urea Nitrogen to Creatinine ratio to help differentiate causes of kidney dysfunction.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["BUN", "Kidney", "Renal", "Creatinine", "Kidney Function", "Azotemia"],

  formula: "BUN = bun / creatinine",

  normalRange: "10:1 – 20:1",

  referenceRanges: [
  {
    label: "Low ratio",
    range: "<9.1",
  },
  {
    label: "Normal ratio",
    range: "10–20",
  },
  {
    label: "Elevated ratio",
    range: "≥21",
  }
],



  clinicalNotes:
    "The blood urea nitrogen (BUN) to creatinine ratio relates two renally cleared solutes. Urea is produced in the liver, filtered, and substantially reabsorbed by the tubules, whereas creatinine is largely filtered with minimal net reabsorption. Changes in tubular urea handling therefore shift the BUN out of proportion to creatinine. In the appropriate context, an elevated ratio can support the possibility of prerenal physiology, where reduced renal perfusion increases tubular urea reabsorption, while a normal ratio is typical of intrinsic kidney damage.\n\nThe ratio is supportive rather than diagnostic and should never be used as a definitive threshold for a specific cause. Numerous factors raise BUN independent of renal perfusion, including gastrointestinal bleeding, high protein intake or catabolic states, corticosteroid use, and decreased effective circulating volume from dehydration. BUN can also fall with a low protein diet or liver disease. Any of these can alter the ratio without indicating prerenal azotemia as the mechanism.\n\nMany clinical pictures produce an overlap in values, and no single ratio cleanly separates prerenal from intrinsic disease. The ratio is most useful as one element of a broader assessment that includes urine microscopy, the fractional excretion of sodium, urine osmolality, and the patient's volume status and medications.\n\nThis calculation provides an educational index that supports differential diagnosis of azotemia; it is not a diagnosis of kidney disease and should be interpreted together with concurrent laboratory values and the clinical situation.",





  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"BUN/Creatinine Ratio","href":"/calculators/bun-creatinine-ratio","bestFor":"Differentiating prerenal from intrinsic renal causes.","limitation":"Not a direct measure of kidney function."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Estimating GFR for CKD staging.","limitation":"Does not differentiate etiology."},{"name":"FENa","href":"/calculators/fena","bestFor":"Confirming prerenal vs. intrinsic AKI.","limitation":"Affected by diuretic use."}]},

  references: [
    "Rifai N, et al. Tietz Textbook of Clinical Chemistry and Molecular Diagnostics. 6th ed. Elsevier; 2018.",
  ],

  relatedCalculators: ["ckd-epi-2021","cockcroft-gault","fena","feurea"],

  inputs: [
  {
    id: "bun",
    label: "Blood Urea Nitrogen",
    type: "number",
    unit: "mg/dL",
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
  values.bun === "" ||
  values.bun === undefined
) {
  return {
    value: 0,
    interpretation: "Blood Urea Nitrogen is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.bun))
) {
  return {
    value: 0,
    interpretation: "Invalid Blood Urea Nitrogen.",
    status: "critical",
  };
}


if (Number(values.bun) < 0) {
  return {
    value: 0,
    interpretation: "Blood Urea Nitrogen cannot be negative.",
    status: "critical",
  };
}


if (Number(values.bun) === 0) {
  return {
    value: 0,
    interpretation: "Blood Urea Nitrogen cannot be zero.",
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



const bun = Number(values.bun);
const creatinine = Number(values.creatinine);


  const result =
    bun / creatinine;


  
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


else if (result < 10) {

  interpretation =
    "Low ratio";

  status =
    "low";

  referenceRange =
  "<9.1";
}

else if (result <= 20) {

  interpretation =
    "Normal ratio";

  status =
    "normal";

  referenceRange =
  "10–20";
}


else {

  interpretation =
    "Elevated ratio";

  status =
    "high";

  referenceRange =
  "≥21";
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