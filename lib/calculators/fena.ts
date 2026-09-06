import type { CalculatorDefinition } from "./calculator.types";

export const fenaCalculator: CalculatorDefinition = {
  id: "fena",

  slug: "fena",

  name: "Fractional Excretion of Sodium (FENa)",

  shortName: "fena",

  description:
    "Calculates the fractional excretion of sodium to distinguish prerenal azotemia from acute tubular necrosis.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Fractional Excretion of Sodium", "FENa", "Kidney", "Renal", "Acute Kidney Injury", "AKI", "Nephrology"],

  formula: "FENa = (urinena / plasmana) / (urinecr / plasmacr) * 100",

  normalRange: "< 1% in prerenal azotemia",

  referenceRanges: [
  {
    label: "Prerenal azotemia",
    range: "<1.1",
  },
  {
    label: "Indeterminate",
    range: "1–2",
  },
  {
    label: "Intrinsic renal injury (ATN)",
    range: "≥2",
  }
],



  clinicalNotes:
    "The fractional excretion of sodium (FENa) expresses the percentage of filtered sodium that is excreted in urine, calculated as (urine sodium / plasma sodium) divided by (urine creatinine / plasma creatinine), multiplied by 100. Because the healthy kidney normally resorbs most filtered sodium, a low FENa can reflect intact tubular sodium conservation, a pattern classically associated with prerenal azotemia, whereas a higher FENa can accompany intrinsic tubular damage such as acute tubular necrosis.\n\nFENa is an adjunctive index in the evaluation of acute kidney injury, not a stand-alone diagnostic test. A single value should never be interpreted in isolation; it is meaningful only alongside urine microscopy, urine osmolality, electrolyte values, and the overall clinical picture, and its interpretation relies on correct, contemporaneous urine and plasma samples.\n\nReliability declines in settings that alter sodium handling independently of tubular health. Loop and thiazide diuretics blunt the physiologic low FENa, so this index is unreliable in patients on these agents or in early acute kidney injury (within the first hours), where values may not yet reflect the underlying process. Low FENa values can also be seen in, for example, contrast-associated acute kidney injury and in conditions with intense tubular sodium avidity, so the numerical range alone does not prove a prerenal mechanism.\n\nThe result supports differential diagnosis of established kidney dysfunction and is not a diagnosis by itself. Interpretation requires the concurrent clinical context, and where diuretic use or an early time course confounds the result, alternatives such as the fractional excretion of urea may be more informative.",





  comparison: {"title":"Which Renal Assessment Should I Use?","calculators":[{"name":"FENa","href":"/calculators/fena","bestFor":"Distinguishing prerenal azotemia from ATN in AKI.","limitation":"Unreliable with diuretic use."},{"name":"FEUrea","href":"/calculators/feurea","bestFor":"Renal assessment when diuretics are present.","limitation":"Less widely validated than FENa."},{"name":"BUN/Creatinine Ratio","href":"/calculators/bun-creatinine-ratio","bestFor":"Rapid bedside assessment.","limitation":"Not a direct tubular function test."}]},

  references: [
    "Espinel CH. The FENa test: use in the differential diagnosis of acute renal failure. JAMA. 1976;236(6):579-581.",
    "Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1-138.",
  ],

  relatedCalculators: ["feurea","bun-creatinine-ratio","ttkg"],

  inputs: [
  {
    id: "urineNa",
    label: "Urine Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "plasmaNa",
    label: "Plasma Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "urineCr",
    label: "Urine Creatinine",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "plasmaCr",
    label: "Plasma Creatinine",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.urineNa === "" ||
  values.urineNa === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urineNa))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Sodium.",
    status: "critical",
  };
}


if (Number(values.urineNa) < 0) {
  return {
    value: 0,
    interpretation: "Urine Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urineNa) === 0) {
  return {
    value: 0,
    interpretation: "Urine Sodium cannot be zero.",
    status: "critical",
  };
}


if (
  values.plasmaNa === "" ||
  values.plasmaNa === undefined
) {
  return {
    value: 0,
    interpretation: "Plasma Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.plasmaNa))
) {
  return {
    value: 0,
    interpretation: "Invalid Plasma Sodium.",
    status: "critical",
  };
}


if (Number(values.plasmaNa) < 0) {
  return {
    value: 0,
    interpretation: "Plasma Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.plasmaNa) === 0) {
  return {
    value: 0,
    interpretation: "Plasma Sodium cannot be zero.",
    status: "critical",
  };
}


if (
  values.urineCr === "" ||
  values.urineCr === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Creatinine is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urineCr))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Creatinine.",
    status: "critical",
  };
}


if (Number(values.urineCr) < 0) {
  return {
    value: 0,
    interpretation: "Urine Creatinine cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urineCr) === 0) {
  return {
    value: 0,
    interpretation: "Urine Creatinine cannot be zero.",
    status: "critical",
  };
}


if (
  values.plasmaCr === "" ||
  values.plasmaCr === undefined
) {
  return {
    value: 0,
    interpretation: "Plasma Creatinine is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.plasmaCr))
) {
  return {
    value: 0,
    interpretation: "Invalid Plasma Creatinine.",
    status: "critical",
  };
}


if (Number(values.plasmaCr) < 0) {
  return {
    value: 0,
    interpretation: "Plasma Creatinine cannot be negative.",
    status: "critical",
  };
}


if (Number(values.plasmaCr) === 0) {
  return {
    value: 0,
    interpretation: "Plasma Creatinine cannot be zero.",
    status: "critical",
  };
}



const urineNa = Number(values.urineNa);
const plasmaNa = Number(values.plasmaNa);
const urineCr = Number(values.urineCr);
const plasmaCr = Number(values.plasmaCr);


  const result =
    (urineNa / plasmaNa) / (urineCr / plasmaCr) * 100;


  
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


else if (result <= 1) {

  interpretation =
    "Prerenal azotemia";

  status =
    "low";

  referenceRange =
  "<1.1";
}


else if (result >= 1 && result <= 2) {

  interpretation =
    "Indeterminate";

  status =
    "normal";

  referenceRange =
  "1–2";
}


else {

  interpretation =
    "Intrinsic renal injury (ATN)";

  status =
    "high";

  referenceRange =
  "≥2";
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