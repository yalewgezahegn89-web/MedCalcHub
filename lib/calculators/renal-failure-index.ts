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

  clinicalGuidance: {
    advice: [
      "Use RFI as one component of the AKI workup together with FENa, FEUrea, urine microscopy, and clinical volume assessment.",
      "The RFI is computed as urine sodium (mEq/L) × plasma creatinine (mg/dL) ÷ urine creatinine (mg/dL).",
      "RFI < 1 supports a prerenal pattern; RFI > 1 favors intrinsic renal injury (ATN).",
    ],
    warnings: [
      "RFI shares the limitations of FENa: diuretics and saline resuscitation raise urine sodium and can cause false 'ATN-like' values in prerenal patients.",
      "The <1/>1 convention comes from classic literature (Miller et al., 1968) and is not a validated diagnostic threshold alone.",
      "Do not use RFI when urine output is absent or when creatinine assays are not standardized.",
    ],
    followUp: [
      "When RFI is indeterminate (1–2), combine with FEUrea and clinical response to volume expansion.",
      "Reassess after diuretic washout if clinically safe and the diagnosis remains unclear.",
    ],
  },

  clinicalNotes:
    "The renal failure index was introduced by Miller and colleagues in 1968 as a urinary index for acute renal failure. It is essentially FENa without the plasma sodium term and is interpreted with the same caveats.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Miller TR, et al. Urinary diagnostic indices in acute renal failure: a prospective study. Ann Intern Med. 1978;89(1):47-50.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Miller TR, et al. Ann Intern Med. 1978;89(1):47-50.",
      "Espinel CH. The FENa test: use in the differential diagnosis of acute renal failure. JAMA. 1976;236(6):579-581.",
    ],
  },

  faq: [
    {
      question: "How does RFI differ from FENa?",
      answer:
        "FENa divides by the plasma sodium and expresses the result as a percentage; RFI omits the plasma sodium term. Both use urine sodium and the urine:plasma creatinine ratio and are interpreted similarly.",
    },
    {
      question: "Is RFI still used?",
      answer:
        "FENa and FEUrea are more commonly used today, but RFI remains a classic, quick index taught for the AKI differential and is easily calculated at the bedside.",
    },
  ],

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
