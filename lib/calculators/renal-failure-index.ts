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

export const rfiCalculator: CalculatorDefinition = {
  id: "renal-failure-index",

  slug: "renal-failure-index",

  name: "Renal Failure Index (RFI)",

  shortName: "RFI",

  description:
    "Calculates the renal failure index (RFI), a classic urinary index that uses urine sodium relative to the urine:plasma creatinine ratio to help distinguish prerenal azotemia from acute tubular necrosis (ATN).",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Renal Failure Index",
    "RFI",
    "Urine Sodium",
    "Fractional Excretion",
    "Acute Kidney Injury",
    "AKI",
    "Prerenal",
    "ATN",
    "Urinary Indices",
    "Nephrology",
  ],

  formula: "RFI = (Urine Sodium × Plasma Creatinine) ÷ Urine Creatinine",

  normalRange: "RFI < 1 supports prerenal azotemia; RFI > 1 suggests ATN",

  referenceRanges: [
    {
      label: "Prerenal azotemia",
      range: "<1",
      context: "classic urinary index",
    },
    {
      label: "Indeterminate",
      range: "1–2",
      context: "classic urinary index",
    },
    {
      label: "Intrinsic renal injury (ATN)",
      range: ">2",
      context: "classic urinary index",
    },
  ],

  classification: [
    {
      label: "Prerenal azotemia",
      range: "<1",
      max: 0.99,
      color: "green",
    },
    {
      label: "Indeterminate",
      range: "1–2",
      min: 1,
      max: 2,
      color: "yellow",
    },
    {
      label: "Intrinsic renal injury (ATN)",
      range: ">2",
      min: 2.01,
      color: "red",
    },
  ],



  clinicalNotes:
    "The renal failure index was introduced by Miller and colleagues in 1968 as a urinary index for acute renal failure. It is essentially FENa without the plasma sodium term and is interpreted with the same caveats.",





  comparison: undefined,

  references: [
    "Miller TR, et al. Ann Intern Med. 1978;89(1):47-50.",
    "Espinel CH. JAMA. 1976;236(6):579-581.",
  ],

  relatedCalculators: [
    "fena",
    "feurea",
    "fractional-excretion-uric-acid",
    "bun-creatinine-ratio",
  ],

  inputs: [
    {
      id: "urineSodium",
      label: "Urine Sodium",
      type: "number",
      unit: "mEq/L",
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
    {
      id: "urineCr",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const una = positive(values, "urineSodium", "Urine sodium");
    if ("err" in una) return critical(una.err);
    const scr = positive(values, "plasmaCr", "Plasma creatinine");
    if ("err" in scr) return critical(scr.err);
    const ucr = positive(values, "urineCr", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);

    const rfi = (una.n * scr.n) / ucr.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (rfi < 1) {
      interpretation =
        "RFI < 1 — supports prerenal azotemia (avid tubular sodium reabsorption).";
      status = "low";
      referenceRange = "<1";
    } else if (rfi <= 2) {
      interpretation =
        "RFI 1–2 — indeterminate; combine with FEUrea and the clinical response to volume expansion.";
      status = "normal";
      referenceRange = "1–2";
    } else {
      interpretation =
        "RFI > 2 — favors intrinsic renal injury (acute tubular necrosis).";
      status = "high";
      referenceRange = ">2";
    }

    return {
      value: Number(rfi.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
      score: Number(rfi.toFixed(2)),
    };
  },
};
