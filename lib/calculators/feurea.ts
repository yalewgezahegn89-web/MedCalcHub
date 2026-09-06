import type { CalculatorDefinition } from "./calculator.types";

export const feureaCalculator: CalculatorDefinition = {
  id: "feurea",

  slug: "feurea",

  name: "Fractional Excretion of Urea (FEUrea)",

  shortName: "feurea",

  description:
    "Calculates the fractional excretion of urea for renal evaluation, particularly useful when diuretics are present.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Fractional Excretion of Urea", "FEUrea", "Kidney", "Renal", "Acute Kidney Injury", "AKI", "Nephrology"],

  formula: "FEUrea = (urineurea / plasmaurea) / (urinecr / plasmacr) * 100",

  normalRange: "< 35% in prerenal azotemia",

  referenceRanges: [
  {
    label: "Prerenal azotemia",
    range: "<35.1",
  },
  {
    label: "Indeterminate",
    range: "35–50",
  },
  {
    label: "Intrinsic renal injury (ATN)",
    range: "≥50",
  }
],



  clinicalNotes:
    "The fractional excretion of urea (FEUrea) expresses the proportion of filtered urea that is excreted rather than reabsorbed: (urine urea ÷ plasma urea) ÷ (urine creatinine ÷ plasma creatinine) × 100. In the setting of intact renal tubular responses, a low value reflects appropriate renal conservation of urea and supports prerenal physiology.\n\nFEUrea is used as an adjunct in the assessment of acute kidney injury, most often in patients who have received diuretics. Because diuretics can raise urinary sodium and make FENa unreliable, and because urea reabsorption is generally less affected by loop and thiazide diuretics than sodium handling, FEUrea may retain greater utility in this situation. It remains less widely validated than FENa and is best used as a complement rather than a replacement.\n\nUrea handling is influenced by several confounders, including hepatic urea production (liver disease and malnutrition), catabolic states, corticosteroids, and dietary protein intake. FEUrea must never be interpreted alone; it is one component of the AKI evaluation alongside history, volume status, urine microscopy, and other laboratory data, and the result does not by itself establish the cause of kidney injury or constitute a diagnosis.",





  comparison: {"title":"Which Renal Assessment Should I Use?","calculators":[{"name":"FEUrea","href":"/calculators/feurea","bestFor":"Renal assessment when diuretics are present.","limitation":"Less widely validated than FENa."},{"name":"FENa","href":"/calculators/fena","bestFor":"Distinguishing prerenal azotemia from ATN.","limitation":"Unreliable with diuretic use."},{"name":"BUN/Creatinine Ratio","href":"/calculators/bun-creatinine-ratio","bestFor":"Rapid bedside assessment.","limitation":"Not a direct tubular function test."}]},

  references: [
    "Kaplan AA, Kohn OF. Fractional excretion of urea as a guide to renal dysfunction. Am J Nephrol. 1992;12(1-2):49-54.",
    "Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1-138.",
  ],

  relatedCalculators: ["fena","bun-creatinine-ratio","ttkg"],

  inputs: [
  {
    id: "urineUrea",
    label: "Urine Urea",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "plasmaUrea",
    label: "Plasma Urea",
    type: "number",
    unit: "mg/dL",
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
  values.urineUrea === "" ||
  values.urineUrea === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Urea is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urineUrea))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Urea.",
    status: "critical",
  };
}


if (Number(values.urineUrea) < 0) {
  return {
    value: 0,
    interpretation: "Urine Urea cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urineUrea) === 0) {
  return {
    value: 0,
    interpretation: "Urine Urea cannot be zero.",
    status: "critical",
  };
}


if (
  values.plasmaUrea === "" ||
  values.plasmaUrea === undefined
) {
  return {
    value: 0,
    interpretation: "Plasma Urea is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.plasmaUrea))
) {
  return {
    value: 0,
    interpretation: "Invalid Plasma Urea.",
    status: "critical",
  };
}


if (Number(values.plasmaUrea) < 0) {
  return {
    value: 0,
    interpretation: "Plasma Urea cannot be negative.",
    status: "critical",
  };
}


if (Number(values.plasmaUrea) === 0) {
  return {
    value: 0,
    interpretation: "Plasma Urea cannot be zero.",
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



const urineUrea = Number(values.urineUrea);
const plasmaUrea = Number(values.plasmaUrea);
const urineCr = Number(values.urineCr);
const plasmaCr = Number(values.plasmaCr);


  const result =
    (urineUrea / plasmaUrea) / (urineCr / plasmaCr) * 100;


  
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


else if (result <= 35) {

  interpretation =
    "Prerenal azotemia";

  status =
    "low";

  referenceRange =
  "<35.1";
}


else if (result >= 35 && result <= 50) {

  interpretation =
    "Indeterminate";

  status =
    "normal";

  referenceRange =
  "35–50";
}


else {

  interpretation =
    "Intrinsic renal injury (ATN)";

  status =
    "high";

  referenceRange =
  "≥50";
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