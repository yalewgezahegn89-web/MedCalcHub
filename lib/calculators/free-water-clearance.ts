import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function positive(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n <= 0) return { err: `${label} must be a positive number.` };
  return { n };
}

export const freeWaterClearanceCalculator: CalculatorDefinition = {
  id: "free-water-clearance",

  slug: "free-water-clearance",

  name: "Free Water Clearance (CH₂O)",

  shortName: "CH₂O",

  description:
    "Calculates renal free water clearance (CH₂O) from urine flow, urine osmolality, and plasma osmolality to characterize renal water handling in polyuria, hyponatremia, and hypernatremia.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Free Water Clearance",
    "CH2O",
    "Osmolar Clearance",
    "Urine Osmolality",
    "Polyuria",
    "Hyponatremia",
    "Hypernatremia",
    "Diabetes Insipidus",
    "SIADH",
    "Nephrology",
  ],

  formula: "CH₂O = V × (1 − Urine Osmolality ÷ Plasma Osmolality)",

  normalRange:
    "Positive (dilute urine, free water excretion); negative (concentrated urine, free water reabsorption)",

  referenceRanges: [
    {
      label: "Positive — free water excretion",
      range: "> 0 mL/min",
      context: "dilute urine (Uosm < Posm); DI, polydipsia",
    },
    {
      label: "Negative — free water reabsorption",
      range: "< 0 mL/min",
      context: "concentrated urine (Uosm > Posm); SIADH, dehydration",
    },
  ],

  classification: [
    {
      label: "Free water excretion",
      range: ">0",
      min: 0.01,
      color: "green",
    },
    {
      label: "Free water reabsorption",
      range: "<0",
      max: -0.01,
      color: "yellow",
    },
  ],



  clinicalNotes:
    "Free water clearance is the classic renal physiology metric of water handling: it is the portion of urine flow that is free of osmotically active solute. It remains useful in the bedside evaluation of polyuria and dysnatremia.",





  comparison: undefined,

  references: [
    "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
    "Goldberg M. Med Clin North Am. 1981;65(2):251-269.",
  ],

  relatedCalculators: [
    "electrolyte-free-water-clearance",
    "urine-osmolal-gap",
    "serum-osmolality",
    "free-water-deficit",
  ],

  inputs: [
    {
      id: "urineVolume",
      label: "Urine Flow Rate",
      type: "number",
      unit: "mL/min",
      required: true,
      min: 1,
      helpText: "Any consistent urine flow unit works; the result shares the unit.",
    },
    {
      id: "urineOsmolality",
      label: "Urine Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 1,
    },
    {
      id: "plasmaOsmolality",
      label: "Plasma Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const v = positive(values, "urineVolume", "Urine flow rate");
    if ("err" in v) return critical(v.err);
    const uosm = positive(values, "urineOsmolality", "Urine osmolality");
    if ("err" in uosm) return critical(uosm.err);
    const posm = positive(values, "plasmaOsmolality", "Plasma osmolality");
    if ("err" in posm) return critical(posm.err);

    const ch2o = v.n * (1 - uosm.n / posm.n);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ch2o > 0) {
      interpretation =
        "CH₂O > 0 — positive free water clearance: the kidney is excreting dilute urine (Uosm < Posm). Seen in diabetes insipidus, polydipsia, or after water loading.";
      status = "normal";
      referenceRange = ">0";
    } else if (ch2o === 0) {
      interpretation =
        "CH₂O = 0 — urine is iso-osmolar to plasma; no net free water excretion.";
      status = "normal";
      referenceRange = "=0";
    } else {
      interpretation =
        "CH₂O < 0 — negative free water clearance: the kidney is conserving water with concentrated urine (Uosm > Posm). Seen in SIADH, volume depletion, or dehydration.";
      status = "high";
      referenceRange = "<0";
    }

    return {
      value: Number(ch2o.toFixed(2)),
      unit: "mL/min",
      interpretation,
      status,
      referenceRange,
      score: Number(ch2o.toFixed(2)),
    };
  },
};
