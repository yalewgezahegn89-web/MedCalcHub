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

function nonNegative(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n < 0) return { err: `${label} cannot be negative.` };
  return { n };
}

export const electrolyteFreeWaterClearanceCalculator: CalculatorDefinition = {
  id: "electrolyte-free-water-clearance",

  slug: "electrolyte-free-water-clearance",

  name: "Electrolyte-Free Water Clearance (EFWC)",

  shortName: "EFWC",

  description:
    "Calculates urinary electrolyte-free water clearance (EFWC) from urine flow and urinary/plasma sodium and potassium. It is used to distinguish renal from extrarenal water losses and to guide fluid therapy in dysnatremia.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Electrolyte-Free Water Clearance",
    "EFWC",
    "Free Water Clearance",
    "Hypernatremia",
    "Hyponatremia",
    "Dysnatremia",
    "Urine Sodium",
    "Osmotic Diuresis",
    "Nephrology",
  ],

  formula:
    "EFWC = V × (1 − (Urine Na + Urine K) ÷ Plasma Na)",

  normalRange:
    "Near zero in steady state; markedly positive with renal water losses (e.g., osmotic diuresis, diabetes insipidus)",

  referenceRanges: [
    {
      label: "Renal water loss (raises serum Na)",
      range: "positive (large)",
      context: "e.g., osmotic diuresis, furosemide, DI",
    },
    {
      label: "Extrarenal / insensible loss",
      range: "near zero or negative",
      context: "e.g., GI or insensible losses",
    },
  ],

  classification: [
    {
      label: "Free water loss (renal)",
      range: ">0",
      min: 0.01,
      color: "yellow",
    },
    {
      label: "No ongoing renal free water loss",
      range: "≤0",
      max: 0,
      color: "green",
    },
  ],



  clinicalNotes:
    "Electrolyte-free water clearance was introduced by Goldberg and popularized by Rose. Unlike CH₂O, it excludes urea, making it more accurate in osmotic diuresis and when predicting the direction of serum sodium change.",





  comparison: undefined,

  references: [
    "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
    "Nguyen MK, Kurtz I. Am J Physiol Renal Physiol. 2005;288(1):F1-7.",
  ],

  relatedCalculators: [
    "free-water-clearance",
    "free-water-deficit",
    "urine-osmolal-gap",
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
      id: "urineSodium",
      label: "Urine Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
    },
    {
      id: "urinePotassium",
      label: "Urine Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
    },
    {
      id: "plasmaSodium",
      label: "Plasma Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const v = positive(values, "urineVolume", "Urine flow rate");
    if ("err" in v) return critical(v.err);
    const una = nonNegative(values, "urineSodium", "Urine sodium");
    if ("err" in una) return critical(una.err);
    const uk = nonNegative(values, "urinePotassium", "Urine potassium");
    if ("err" in uk) return critical(uk.err);
    const pna = positive(values, "plasmaSodium", "Plasma sodium");
    if ("err" in pna) return critical(pna.err);

    const efwc = v.n * (1 - (una.n + uk.n) / pna.n);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (efwc > 0) {
      interpretation =
        "EFWC > 0 — ongoing renal electrolyte-free water loss (e.g., osmotic diuresis, diuretics, diabetes insipidus). This loss will tend to raise serum sodium.";
      status = "high";
      referenceRange = ">0";
    } else if (efwc === 0) {
      interpretation =
        "EFWC = 0 — urine is iso-tonic relative to plasma sodium + potassium; no net electrolyte-free water clearance.";
      status = "normal";
      referenceRange = "=0";
    } else {
      interpretation =
        "EFWC < 0 — no ongoing renal free water loss (urine is relatively electrolyte-rich); water loss is more consistent with extrarenal or insensible sources.";
      status = "normal";
      referenceRange = "<0";
    }

    return {
      value: Number(efwc.toFixed(2)),
      unit: "mL/min",
      interpretation,
      status,
      referenceRange,
      score: Number(efwc.toFixed(2)),
    };
  },
};
