import type { CalculatorDefinition } from "./calculator.types";

export const anionGapCalculator: CalculatorDefinition = {
  id: "anion-gap",

  slug: "anion-gap",

  name: "Anion Gap",

  shortName: "anion-gap",

  description:
    "Calculates the serum anion gap using sodium, chloride, and bicarbonate. The anion gap helps differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["AG", "Metabolic Acidosis", "Electrolytes", "Acid-Base", "Anion Gap Metabolic Acidosis"],

  formula: "Anion Gap = Na − (Cl + HCO₃)",

  normalRange: "8–12 mmol/L",

  referenceRanges: [
  {
    label: "Low anion gap",
    range: "<7.1",
  },
  {
    label: "Normal anion gap",
    range: "8–12",
  },
  {
    label: "High anion gap",
    range: "≥13",
  },
  {
    label: "Markedly elevated anion gap",
    range: "≥20",
  }
],



  clinicalNotes:
    "The serum anion gap is an acid-base screening calculation derived from routinely measured electrolytes: anion gap = Na - (Cl + HCO3). It approximates the concentration of unmeasured anions, notably albumin, phosphate, sulfate, and organic anions. In metabolic acidosis, a widened anion gap is classically associated with accumulation of unmeasured anions such as lactate, ketoacids, and ingested toxins.\n\nAlbumin is a major contributor to the expected gap, so hypoalbuminemia lowers the expected anion gap and can mask a high anion gap metabolic acidosis. When albumin is low, an albumin-corrected calculation (adding roughly 2.5 mmol/L per 1 g/dL of albumin below 4.0 g/dL) is more appropriate. Because normal values vary with the laboratory method, interpret the result against the local laboratory reference range rather than a universal cutoff.\n\nThe anion gap is a pattern-recognition tool within a broader acid-base assessment. It must be interpreted alongside the arterial blood gas, other electrolytes, the delta ratio, the osmolar gap, and the clinical context. A normal anion gap does not exclude metabolic acidosis, and an elevated gap does not by itself identify the underlying cause.\n\nThis calculator performs a single arithmetic calculation for educational decision support. It does not diagnose acidosis or identify its mechanism; confirmatory laboratory assessment and clinical correlation are required.",





  comparison: {"title":"Which Acid-Base Calculator Should I Use?","calculators":[{"name":"Anion Gap","href":"/calculators/anion-gap","bestFor":"Screening for high anion gap metabolic acidosis.","limitation":"Does not account for hypoalbuminemia."},{"name":"Albumin-Corrected Anion Gap","href":"/calculators/corrected-anion-gap","bestFor":"Detecting hidden HAGMA in hypoalbuminemic patients.","limitation":"Requires albumin measurement."},{"name":"Serum Osmolality","href":"/calculators/serum-osmolality","bestFor":"Assessing osmolality in toxic ingestions and electrolyte disorders.","limitation":"Does not directly measure the anion gap."}]},

  references: [
    "Emmett M, Narins RG. Clinical use of the anion gap. Medicine (Baltimore). 1977;56(1):38-54.",
    "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
  ],

  relatedCalculators: ["corrected-anion-gap","serum-osmolality","osmolar-gap","corrected-calcium","bun-creatinine-ratio"],

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



const sodium = Number(values.sodium);
const na = sodium;
const chloride = Number(values.chloride);
const cl = chloride;
const bicarbonate = Number(values.bicarbonate);
const hco3 = bicarbonate;
const hco = bicarbonate;


  const result =
    sodium - (chloride + bicarbonate);


  
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


else if (result < 8) {

  interpretation =
    "Low anion gap";

  status =
    "low";

  referenceRange =
  "<7.1";
}


else if (result <= 12) {

  interpretation =
    "Normal anion gap";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else if (result >= 20) {

  interpretation =
    "Markedly elevated anion gap";

  status =
    "critical";

  referenceRange =
  "≥20";
}

else {

  interpretation =
    "High anion gap";

  status =
    "high";

  referenceRange =
  "≥13";
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