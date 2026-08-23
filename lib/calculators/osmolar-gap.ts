import type { CalculatorDefinition } from "./calculator.types";

export const osmolarGapCalculator: CalculatorDefinition = {
  id: "osmolar-gap",

  slug: "osmolar-gap",

  name: "Osmolar Gap",

  shortName: "osmolar-gap",

  description:
    "Calculates the osmolar gap as the difference between measured and calculated serum osmolality. An elevated osmolar gap may suggest toxic alcohol ingestion (methanol, ethylene glycol) or other osmotically active substances.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Osmolar Gap", "Toxicology", "Ethylene Glycol", "Methanol", "Poisoning", "Osmolality"],

  formula: "measured - (2 * sodium + glucose / 18 + bun / 2.8)",

  normalRange: "-10 to +10 mOsm/kg",

  referenceRanges: [
  {
    label: "Negatively elevated gap (lab error or dilutional)",
    range: "<-9.9",
  },
  {
    label: "Normal osmolar gap",
    range: "-10–10",
  },
  {
    label: "Elevated osmolar gap",
    range: "≥11",
  },
  {
    label: "Markedly elevated osmolar gap — toxic ingestion likely",
    range: "≥50",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Toxicology Calculator Should I Use?","calculators":[{"name":"Osmolar Gap","href":"/calculators/osmolar-gap","bestFor":"Detecting unmeasured osmoles in toxic ingestion.","limitation":"Requires a measured osmolality from the lab."},{"name":"Serum Osmolality","href":"/calculators/serum-osmolality","bestFor":"Estimating calculated osmolality.","limitation":"Does not detect unmeasured osmoles."},{"name":"Anion Gap","href":"/calculators/anion-gap","bestFor":"Detecting high anion gap metabolic acidosis.","limitation":"May be normal in early toxic alcohol ingestion."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["serum-osmolality","anion-gap","corrected-anion-gap","bun-creatinine-ratio"],

  inputs: [
  {
    id: "measured",
    label: "Measured Osmolality",
    type: "number",
    unit: "mOsm/kg",
    required: true,
  },
  {
    id: "sodium",
    label: "Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "glucose",
    label: "Glucose",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "bun",
    label: "BUN",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.measured === "" ||
  values.measured === undefined
) {
  return {
    value: 0,
    interpretation: "Measured Osmolality is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.measured))
) {
  return {
    value: 0,
    interpretation: "Invalid Measured Osmolality.",
    status: "critical",
  };
}


if (Number(values.measured) < 0) {
  return {
    value: 0,
    interpretation: "Measured Osmolality cannot be negative.",
    status: "critical",
  };
}


if (Number(values.measured) === 0) {
  return {
    value: 0,
    interpretation: "Measured Osmolality cannot be zero.",
    status: "critical",
  };
}


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
  values.glucose === "" ||
  values.glucose === undefined
) {
  return {
    value: 0,
    interpretation: "Glucose is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.glucose))
) {
  return {
    value: 0,
    interpretation: "Invalid Glucose.",
    status: "critical",
  };
}


if (Number(values.glucose) < 0) {
  return {
    value: 0,
    interpretation: "Glucose cannot be negative.",
    status: "critical",
  };
}


if (Number(values.glucose) === 0) {
  return {
    value: 0,
    interpretation: "Glucose cannot be zero.",
    status: "critical",
  };
}


if (
  values.bun === "" ||
  values.bun === undefined
) {
  return {
    value: 0,
    interpretation: "BUN is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.bun))
) {
  return {
    value: 0,
    interpretation: "Invalid BUN.",
    status: "critical",
  };
}


if (Number(values.bun) < 0) {
  return {
    value: 0,
    interpretation: "BUN cannot be negative.",
    status: "critical",
  };
}


if (Number(values.bun) === 0) {
  return {
    value: 0,
    interpretation: "BUN cannot be zero.",
    status: "critical",
  };
}



const measured = Number(values.measured);
const sodium = Number(values.sodium);
const na = sodium;
const glucose = Number(values.glucose);
const bun = Number(values.bun);


  const result =
    measured - (2 * sodium + glucose / 18 + bun / 2.8);


  
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


else if (result < -10) {

  interpretation =
    "Negatively elevated gap (lab error or dilutional)";

  status =
    "low";

  referenceRange =
  "<-9.9";
}


else if (result <= 10) {

  interpretation =
    "Normal osmolar gap";

  status =
    "normal";

  referenceRange =
  "-10–10";
}


else if (result >= 50) {

  interpretation =
    "Markedly elevated osmolar gap — toxic ingestion likely";

  status =
    "critical";

  referenceRange =
  "≥50";
}

else {

  interpretation =
    "Elevated osmolar gap";

  status =
    "high";

  referenceRange =
  "≥11";
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