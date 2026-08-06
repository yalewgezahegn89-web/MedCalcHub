import type { CalculatorDefinition } from "./calculator.types";

export const correctedAnionGapCalculator: CalculatorDefinition = {
  id: "corrected-anion-gap",

  slug: "corrected-anion-gap",

  name: "corrected-anion-gap",

  shortName: "corrected-anion-gap",

  description:
    "Calculates the albumin-corrected anion gap. In hypoalbuminemia, the measured anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. This correction adjusts for the albumin contribution.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

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

  clinicalGuidance: {
    advice: ["Use the corrected anion gap whenever serum albumin is low (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition) to unmask a hidden high anion gap metabolic acidosis.","For every 1 g/dL decrease in albumin below 4.0, the expected anion gap decreases by ~2.5 mmol/L.","This is especially important in ICU patients where hypoalbuminemia is common and a HAGMA may be missed on uncorrected values."],
    warnings: ["This correction factor (2.5) is derived from the assumption that each g/dL of albumin contributes ~2.5 mmol/L to the anion gap; exact values may vary.","The correction does not account for other proteins or anions that contribute to the gap.","Very low albumin (< 2.0 g/dL) may reduce the reliability of the correction."],
    followUp: ["If the corrected anion gap is elevated, pursue the same differential diagnosis as for a standard high anion gap acidosis.","Check lactate, ketones, and renal function; consider a toxic alcohol screen if clinically indicated.","Reassess after treatment to confirm normalization."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Critical Care Medicine","reference":"Figge J, et al. Hypoalbuminemia and the anion gap. Crit Care Med. 1998;26:1807–1810.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Figge J, et al. Crit Care Med. 1998;26:1807–1810.","Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174."]},

  faq: [{"question":"Why does hypoalbuminemia lower the anion gap?","answer":"Albumin is a negatively charged protein that contributes significantly to the normal anion gap (~75% of the gap in health). When albumin is low, fewer unmeasured negative charges are present, so the calculated anion gap decreases even if the underlying acid-base status is unchanged."},{"question":"What correction factor is used?","answer":"The standard correction adds 2.5 mmol/L to the measured anion gap for every 1 g/dL that serum albumin falls below 4.0 g/dL. Some studies suggest using 2.4 or 2.8 depending on the population."},{"question":"When should I suspect a missed HAGMA?","answer":"Consider a missed HAGMA when a patient is critically ill with acidosis, has a normal-appearing uncorrected anion gap, and has a low serum albumin. Apply the correction and reassess."}],

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
const chloride = Number(values.chloride);
const bicarbonate = Number(values.bicarbonate);
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


else if (result <= 7) {

  interpretation =
    "Low corrected anion gap";

  status =
    "low";

  referenceRange =
  "<7.1";
}


else if (result >= 8 && result <= 12) {

  interpretation =
    "Normal corrected anion gap";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else if (result >= 13) {

  interpretation =
    "High corrected anion gap";

  status =
    "high";

  referenceRange =
  "≥13";
}


else if (result >= 20) {

  interpretation =
    "Markedly elevated corrected anion gap";

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