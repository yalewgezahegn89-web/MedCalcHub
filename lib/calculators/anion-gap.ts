import type { CalculatorDefinition } from "./calculator.types";

export const anionGapCalculator: CalculatorDefinition = {
  id: "anion-gap",

  slug: "anion-gap",

  name: "anion-gap",

  shortName: "anion-gap",

  description:
    "Calculates the serum anion gap using sodium, chloride, and bicarbonate. The anion gap helps differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

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

  clinicalGuidance: {
    advice: ["An anion gap > 12 mmol/L in the context of metabolic acidosis suggests a high anion gap metabolic acidosis (MUDPILES mnemonic: methanol, uremia, DKA, propylene glycol, isoniazid, lactic acidosis, ethylene glycol, salicylates).","Always interpret the anion gap alongside serum albumin—hypoalbuminemia falsely lowers the anion gap and can mask a HAGMA.","Use the corrected anion gap calculator when albumin is low."],
    warnings: ["The anion gap is not reliable in isolation; interpret with arterial blood gas, serum electrolytes, and clinical context.","Hypernatremia, hypokalemia, hypercalcemia, and hypermagnesemia can all artifactually increase the anion gap.","Lithium, bromide, and iodide can cause spurious elevation of the measured anion gap."],
    followUp: ["If the anion gap is elevated, search for the underlying cause (lactic acidosis, ketoacidosis, toxic ingestions, renal failure).","If the cause is unclear, check lactate, ketones, BUN/creatinine, and consider a toxic alcohol screen.","Reassess the anion gap after treatment to confirm resolution."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Critical Care Medicine","reference":"Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174.","Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney."]},

  faq: [{"question":"What does an elevated anion gap mean?","answer":"An elevated anion gap (> 12 mmol/L) in the setting of metabolic acidosis suggests accumulation of unmeasured anions such as lactate, ketoacids, or toxic metabolites. Common causes include lactic acidosis, diabetic ketoacidosis, renal failure, and toxic alcohol ingestion."},{"question":"What does a low anion gap mean?","answer":"A low anion gap (< 8 mmol/L) may indicate hypoalbuminemia, lithium or bromide toxicity, or laboratory error. It can also be seen with hypercalcemia, hypermagnesemia, or hyperkalemia."},{"question":"Why should I correct for albumin?","answer":"About 80% of the normal anion gap is accounted for by albumin. In hypoalbuminemia, the anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. For every 1 g/dL drop in albumin below 4.0, the expected anion gap decreases by approximately 2.5 mmol/L."},{"question":"When should I use the corrected anion gap?","answer":"Use the albumin-corrected anion gap when the patient has known or suspected hypoalbuminemia (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition)."}],

  comparison: {"title":"Which Acid-Base Calculator Should I Use?","calculators":[{"name":"Anion Gap","href":"/calculators/anion-gap","bestFor":"Screening for high anion gap metabolic acidosis.","limitation":"Does not account for hypoalbuminemia."},{"name":"Albumin-Corrected Anion Gap","href":"/calculators/corrected-anion-gap","bestFor":"Detecting hidden HAGMA in hypoalbuminemic patients.","limitation":"Requires albumin measurement."},{"name":"Serum Osmolality","href":"/calculators/serum-osmolality","bestFor":"Assessing osmolality in toxic ingestions and electrolyte disorders.","limitation":"Does not directly measure the anion gap."}]},

  references: [
    "MedCalcHub Clinical References",
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


else if (result <= 7) {

  interpretation =
    "Low anion gap";

  status =
    "low";

  referenceRange =
  "<7.1";
}


else if (result >= 8 && result <= 12) {

  interpretation =
    "Normal anion gap";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else if (result >= 13) {

  interpretation =
    "High anion gap";

  status =
    "high";

  referenceRange =
  "≥13";
}


else if (result >= 20) {

  interpretation =
    "Markedly elevated anion gap";

  status =
    "critical";

  referenceRange =
  "≥20";
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