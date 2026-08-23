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

export const feuaCalculator: CalculatorDefinition = {
  id: "fractional-excretion-uric-acid",

  slug: "fractional-excretion-uric-acid",

  name: "Fractional Excretion of Uric Acid (FEUA)",

  shortName: "FEUA",

  description:
    "Calculates the fractional excretion of uric acid (FEUA) to help distinguish prerenal azotemia from intrinsic renal injury in acute kidney injury, and to assess uric acid handling (e.g., SIADH, tumor lysis, Fanconi syndrome).",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Fractional Excretion of Uric Acid",
    "FEUA",
    "FEUric",
    "Uric Acid",
    "Urate",
    "Acute Kidney Injury",
    "AKI",
    "Prerenal",
    "ATN",
    "SIADH",
    "Tumor Lysis",
    "Nephrology",
  ],

  formula:
    "FEUA (%) = (Urine Uric Acid × Plasma Creatinine) ÷ (Serum Uric Acid × Urine Creatinine) × 100",

  normalRange: "~10% in euvolemic healthy adults (varies with volume status)",

  referenceRanges: [
    {
      label: "Prerenal pattern (AKI)",
      range: "<12%",
      context: "acute kidney injury",
    },
    {
      label: "Indeterminate",
      range: "12–20%",
      context: "acute kidney injury",
    },
    {
      label: "Intrinsic renal injury (ATN) pattern",
      range: ">20%",
      context: "acute kidney injury",
    },
  ],

  classification: [
    {
      label: "Prerenal pattern (AKI)",
      range: "<12%",
      max: 11.99,
      color: "green",
    },
    {
      label: "Indeterminate",
      range: "12–20%",
      min: 12,
      max: 20,
      color: "yellow",
    },
    {
      label: "Intrinsic renal injury (ATN) pattern",
      range: ">20%",
      min: 20.01,
      color: "red",
    },
  ],



  clinicalNotes:
    "FEUA is the fractional excretion of urate across the proximal tubule. It is more stable than FENa in patients receiving diuretics and is used both in AKI differential diagnosis and in disorders of urate handling.",





  comparison: undefined,

  references: [
    "Steinhäuslin F, et al. J Am Soc Nephrol. 1994;4(7):1429-1437.",
    "Pépin MN, et al. Clin Invest Med. 2007;30(4):E163-167.",
  ],

  relatedCalculators: [
    "fena",
    "feurea",
    "renal-failure-index",
    "urine-anion-gap",
  ],

  inputs: [
    {
      id: "urineUricAcid",
      label: "Urine Uric Acid",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "serumUricAcid",
      label: "Serum Uric Acid",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "urineCr",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "plasmaCr",
      label: "Plasma Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const uua = positive(values, "urineUricAcid", "Urine uric acid");
    if ("err" in uua) return critical(uua.err);
    const sua = positive(values, "serumUricAcid", "Serum uric acid");
    if ("err" in sua) return critical(sua.err);
    const ucr = positive(values, "urineCr", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);
    const scr = positive(values, "plasmaCr", "Plasma creatinine");
    if ("err" in scr) return critical(scr.err);

    const feua = (uua.n * scr.n) / (sua.n * ucr.n) * 100;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (feua < 12) {
      interpretation =
        "FEUA < 12% — consistent with a prerenal pattern in AKI (low urate excretion).";
      status = "low";
      referenceRange = "<12%";
    } else if (feua <= 20) {
      interpretation =
        "FEUA 12–20% — indeterminate in the AKI differential; combine with FENa/FEUrea and clinical assessment.";
      status = "normal";
      referenceRange = "12–20%";
    } else {
      interpretation =
        "FEUA > 20% — more consistent with intrinsic renal injury (ATN) or elevated urate excretion (e.g., SIADH, tumor lysis, Fanconi syndrome).";
      status = "high";
      referenceRange = ">20%";
    }

    return {
      value: Number(feua.toFixed(2)),
      unit: "%",
      interpretation,
      status,
      referenceRange,
      score: Number(feua.toFixed(2)),
    };
  },
};
