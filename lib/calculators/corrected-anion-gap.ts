import type { CalculatorDefinition } from "./calculator.types";

export const correctedAnionGapCalculator: CalculatorDefinition = {
  id: "corrected-anion-gap",

  slug: "corrected-anion-gap",

  name: "Corrected Anion Gap",

  shortName: "corrected-anion-gap",

  description:
    "Calculates the albumin-corrected anion gap. In hypoalbuminemia, the measured anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. This correction adjusts for the albumin contribution.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Albumin Corrected Anion Gap", "Metabolic Acidosis", "Electrolytes", "Acid-Base", "Albumin"],

  formula: "Corrected AG = (Na − (Cl + HCO₃)) + 2.5 × (4 − Albumin)",

  normalRange: "8–12 mmol/L",

  referenceRanges: [
  {
    label: "Low corrected anion gap",
    range: "<7.1",
  },
  {
    label: "Normal corrected anion gap",
    range: "8–12",
  },
  {
    label: "High corrected anion gap",
    range: "≥13",
  },
  {
    label: "Markedly elevated corrected anion gap",
    range: "≥20",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Anion Gap Calculator Should I Use?","calculators":[{"name":"Anion Gap","href":"/calculators/anion-gap","bestFor":"Standard screening in patients with normal albumin.","limitation":"Falsely low in hypoalbuminemia."},{"name":"Albumin-Corrected Anion Gap","href":"/calculators/corrected-anion-gap","bestFor":"Detecting hidden HAGMA in hypoalbuminemic patients.","limitation":"Correction is approximate; interpret in context."},{"name":"Serum Osmolality","href":"/calculators/serum-osmolality","bestFor":"Assessing osmolality in toxic ingestions.","limitation":"Does not directly assess the anion gap."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["anion-gap","serum-osmolality","osmolar-gap","bun-creatinine-ratio","corrected-calcium"],

  inputs: [
  {
    id: "sodium",
    label: "Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "chloride",
    label: "Chloride",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "bicarbonate",
    label: "Bicarbonate (HCO₃)",
    type: "number",
    unit: "mmol/L",
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
  values.sodium === "" ||
  values.sodium === undefined
) {
  return {
    value: 0,
    interpretation: "Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sodium))
) {
  return {
    value: 0,
    interpretation: "Invalid Sodium.",
    status: "critical",
  };
}


if (Number(values.sodium) < 0) {
  return {
    value: 0,
    interpretation: "Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sodium) === 0) {
  return {
    value: 0,
    interpretation: "Sodium cannot be zero.",
    status: "critical",
  };
}


if (
  values.chloride === "" ||
  values.chloride === undefined
) {
  return {
    value: 0,
    interpretation: "Chloride is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.chloride))
) {
  return {
    value: 0,
    interpretation: "Invalid Chloride.",
    status: "critical",
  };
}


if (Number(values.chloride) < 0) {
  return {
    value: 0,
    interpretation: "Chloride cannot be negative.",
    status: "critical",
  };
}


if (Number(values.chloride) === 0) {
  return {
    value: 0,
    interpretation: "Chloride cannot be zero.",
    status: "critical",
  };
}


if (
  values.bicarbonate === "" ||
  values.bicarbonate === undefined
) {
  return {
    value: 0,
    interpretation: "Bicarbonate (HCO₃) is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.bicarbonate))
) {
  return {
    value: 0,
    interpretation: "Invalid Bicarbonate (HCO₃).",
    status: "critical",
  };
}


if (Number(values.bicarbonate) < 0) {
  return {
    value: 0,
    interpretation: "Bicarbonate (HCO₃) cannot be negative.",
    status: "critical",
  };
}


if (Number(values.bicarbonate) === 0) {
  return {
    value: 0,
    interpretation: "Bicarbonate (HCO₃) cannot be zero.",
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



const sodium = Number(values.sodium);
const na = sodium;
const chloride = Number(values.chloride);
const cl = chloride;
const bicarbonate = Number(values.bicarbonate);
const hco3 = bicarbonate;
const hco = bicarbonate;
const albumin = Number(values.albumin);


  const result =
    (sodium - (chloride + bicarbonate)) + 2.5 * (4 - albumin);


  
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


else if (result >= 20) {

  interpretation =
    "Markedly elevated corrected anion gap";

  status =
    "critical";

  referenceRange =
  "≥20";
}


else if (result >= 13) {

  interpretation =
    "High corrected anion gap";

  status =
    "high";

  referenceRange =
  "≥13";
}


else if (result >= 8) {

  interpretation =
    "Normal corrected anion gap";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else {

  interpretation =
    "Low corrected anion gap";

  status =
    "low";

  referenceRange =
  "<7.1";
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