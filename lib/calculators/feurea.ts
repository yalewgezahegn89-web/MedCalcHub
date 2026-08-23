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
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Renal Assessment Should I Use?","calculators":[{"name":"FEUrea","href":"/calculators/feurea","bestFor":"Renal assessment when diuretics are present.","limitation":"Less widely validated than FENa."},{"name":"FENa","href":"/calculators/fena","bestFor":"Distinguishing prerenal azotemia from ATN.","limitation":"Unreliable with diuretic use."},{"name":"BUN/Creatinine Ratio","href":"/calculators/bun-creatinine-ratio","bestFor":"Rapid bedside assessment.","limitation":"Not a direct tubular function test."}]},

  references: [
    "MedCalcHub Clinical References",
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


else if (result >= 50) {

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