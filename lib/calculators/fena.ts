import type { CalculatorDefinition } from "./calculator.types";

export const fenaCalculator: CalculatorDefinition = {
  id: "fena",

  slug: "fena",

  name: "fena",

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

  clinicalGuidance: {
    advice: ["FENa < 1% suggests prerenal azotemia; FENa > 2% suggests intrinsic renal injury (e.g. acute tubular necrosis).","Use urine studies and clinical context to guide interpretation."],
    warnings: ["FENa may be unreliable in patients receiving diuretics, which increase urinary sodium excretion.","In the elderly and in chronic kidney disease, FENa may not accurately distinguish prerenal from intrinsic causes."],
    followUp: ["If FENa is equivocal (1–2%), consider FEUrea as a complementary test.","Repeat urine electrolytes if the clinical picture does not match the initial result."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Nephrology Literature","reference":"Carvounis CP, et al. Significance of fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62:1184-1191.","reviewedBy":"MedCalcHub Clinical Team","version":"2002","updatedAt":"2026-07","references":["Renal physiology references","Clinical nephrology references"]},

  faq: [{"question":"What does FENa < 1% mean?","answer":"A FENa < 1% suggests prerenal azotemia, meaning the kidneys are appropriately retaining sodium in response to decreased perfusion."},{"question":"When is FENa unreliable?","answer":"FENa is unreliable in patients on diuretics, in chronic kidney disease, and in the elderly. Consider FEUrea in these situations."}],

  comparison: {"title":"Which Renal Assessment Should I Use?","calculators":[{"name":"FENa","href":"/calculators/fena","bestFor":"Distinguishing prerenal azotemia from ATN in AKI.","limitation":"Unreliable with diuretic use."},{"name":"FEUrea","href":"/calculators/feurea","bestFor":"Renal assessment when diuretics are present.","limitation":"Less widely validated than FENa."},{"name":"BUN/Creatinine Ratio","href":"/calculators/bun-creatinine-ratio","bestFor":"Rapid bedside assessment.","limitation":"Not a direct tubular function test."}]},

  references: [
    "MedCalcHub Clinical References",
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


else if (result >= 2) {

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