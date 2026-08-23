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

export const anionGapDeltaRatioCalculator: CalculatorDefinition = {
  id: "anion-gap-delta-ratio",

  slug: "anion-gap-delta-ratio",

  name: "Anion Gap Delta Ratio (ΔAG/ΔHCO3)",

  shortName: "Delta Gap Ratio",

  description:
    "Calculates the anion gap delta ratio to evaluate the acid-base response in a high anion gap metabolic acidosis: ΔAG/ΔHCO3 = (measured anion gap − 12) / (24 − measured HCO3). It helps identify mixed acid-base disorders such as a concurrent non-anion gap acidosis or metabolic alkalosis.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Delta Gap",
    "Delta Ratio",
    "Anion Gap",
    "Metabolic Acidosis",
    "High Anion Gap Acidosis",
    "Mixed Acid-Base Disorder",
    "HAGMA",
    "Acid-Base",
  ],

  formula:
    "ΔAG/ΔHCO3 = ( Anion gap − 12 ) ÷ ( 24 − HCO3 )",

  normalRange: "1.0–2.0",

  referenceRanges: [
    {
      label: "Low",
      range: "< 1.0",
      context: "mixed high anion gap + non-anion gap acidosis",
    },
    {
      label: "Normal",
      range: "1.0–2.0",
      context: "pure high anion gap metabolic acidosis",
    },
    {
      label: "High",
      range: "> 2.0",
      context: "concurrent metabolic alkalosis or pre-existing high HCO3",
    },
  ],

  classification: [
    {
      label: "Low",
      range: "<1.0",
      max: 0.99,
      color: "orange",
    },
    {
      label: "Normal",
      range: "1.0–2.0",
      min: 1,
      max: 2,
      color: "green",
    },
    {
      label: "High",
      range: ">2.0",
      min: 2.01,
      color: "orange",
    },
  ],



  clinicalNotes:
    "The delta ratio compares the observed increase in the anion gap to the observed decrease in bicarbonate. A ratio below 1 or above 2 suggests an additional acid-base disorder requiring separate evaluation.",





  comparison: undefined,

  references: [
    "Rastegar A. J Am Soc Nephrol. 2007;18(10):2631-2636.",
  ],

  relatedCalculators: [
    "anion-gap",
    "corrected-anion-gap",
    "urine-anion-gap",
    "winters-formula",
  ],

  inputs: [
    {
      id: "anionGap",
      label: "Anion Gap",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 12,
      helpText: "The delta ratio applies only to a high anion gap (AG > 12 mEq/L).",
    },
    {
      id: "bicarbonate",
      label: "Bicarbonate (HCO3)",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 1,
      max: 23,
      helpText: "Denominator uses 24 − HCO3; requires HCO3 < 24 mEq/L.",
    },
  ],

  calculate(values: Record<string, string>) {
    const ag = positive(values, "anionGap", "Anion gap");
    if ("err" in ag) return critical(ag.err);
    const hco3 = positive(values, "bicarbonate", "Bicarbonate");
    if ("err" in hco3) return critical(hco3.err);

    if (ag.n < 12) {
      return critical(
        "Anion gap is < 12 mEq/L — there is no high anion gap metabolic acidosis, so the delta ratio is not applicable.",
      );
    }

    if (hco3.n >= 24) {
      return critical(
        "Bicarbonate is ≥ 24 mEq/L — the denominator (24 − HCO3) is not positive, so the delta ratio is not applicable.",
      );
    }

    const ratio = (ag.n - 12) / (24 - hco3.n);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ratio < 1) {
      interpretation =
        "Delta ratio < 1 — consistent with a mixed high anion gap acidosis and a concurrent non-anion gap (hyperchloremic) metabolic acidosis.";
      status = "low";
      referenceRange = "<1.0";
    } else if (ratio <= 2) {
      interpretation =
        "Delta ratio between 1 and 2 — consistent with a pure high anion gap metabolic acidosis.";
      status = "normal";
      referenceRange = "1.0–2.0";
    } else {
      interpretation =
        "Delta ratio > 2 — consistent with a concurrent metabolic alkalosis or a pre-existing elevated bicarbonate.";
      status = "high";
      referenceRange = ">2.0";
    }

    return {
      value: Number(ratio.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
    };
  },
};
