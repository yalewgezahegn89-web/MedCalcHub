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

export const upcrCalculator: CalculatorDefinition = {
  id: "urine-protein-creatinine-ratio",

  slug: "urine-protein-creatinine-ratio",

  name: "Urine Protein-to-Creatinine Ratio (UPCR)",

  shortName: "UPCR",

  description:
    "Calculates the urine protein-to-creatinine ratio (UPCR) from a spot urine sample to estimate 24-hour proteinuria for CKD detection, monitoring, and nephrotic range proteinuria screening.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Urine Protein Creatinine Ratio",
    "UPCR",
    "Proteinuria",
    "Spot Urine",
    "Nephrotic Range",
    "Chronic Kidney Disease",
    "CKD",
    "Albuminuria",
    "Nephrology",
  ],

  formula:
    "UPCR (mg/mg) = Urine Protein (mg/dL) ÷ Urine Creatinine (mg/dL)",

  normalRange: "< 0.15 mg/mg (< 150 mg/g)",

  referenceRanges: [
    {
      label: "Normal",
      range: "<0.15 mg/mg",
      context: "<150 mg/g",
    },
    {
      label: "Mild proteinuria",
      range: "0.15–0.5 mg/mg",
      context: "moderate albuminuria equivalent",
    },
    {
      label: "Moderate proteinuria",
      range: "0.5–3.5 mg/mg",
      context: "sub-nephrotic",
    },
    {
      label: "Nephrotic range (adults)",
      range: "≥3.5 mg/mg",
      context: "≈ ≥3.5 g/day",
    },
  ],

  classification: [
    {
      label: "Normal",
      range: "<0.15",
      max: 0.149,
      color: "green",
    },
    {
      label: "Mild proteinuria",
      range: "0.15–0.5",
      min: 0.15,
      max: 0.5,
      color: "yellow",
    },
    {
      label: "Moderate proteinuria",
      range: "0.5–3.5",
      min: 0.51,
      max: 3.5,
      color: "orange",
    },
    {
      label: "Nephrotic range",
      range: "≥3.5",
      min: 3.51,
      color: "red",
    },
  ],



  clinicalNotes:
    "The spot UPCR is a validated estimate of 24-hour urinary protein excretion and is recommended by KDIGO for the detection and monitoring of proteinuria, avoiding the inconvenience of timed collections.",





  comparison: undefined,

  references: [
    "KDIGO 2012 CKD Guideline. Kidney Int Suppl. 2013;3(1):1-150.",
    "Ginsberg JM, et al. N Engl J Med. 1983;309(25):1543-1546.",
  ],

  relatedCalculators: [
    "albumin-creatinine-ratio",
    "ckd-epi-2021",
    "creatinine-clearance-24h",
  ],

  inputs: [
    {
      id: "urineProtein",
      label: "Urine Protein",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
    {
      id: "urineCreatinine",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const up = positive(values, "urineProtein", "Urine protein");
    if ("err" in up) return critical(up.err);
    const ucr = positive(values, "urineCreatinine", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);

    const upcr = up.n / ucr.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (upcr < 0.15) {
      interpretation =
        "UPCR < 0.15 mg/mg — normal; no significant proteinuria detected.";
      status = "normal";
      referenceRange = "<0.15";
    } else if (upcr < 0.5) {
      interpretation =
        "UPCR 0.15–0.5 mg/mg — mild proteinuria; quantify with ACR and repeat to confirm.";
      status = "high";
      referenceRange = "0.15–0.5";
    } else if (upcr < 3.5) {
      interpretation =
        "UPCR 0.5–3.5 mg/mg — moderate (sub-nephrotic) proteinuria; evaluate and treat the underlying renal disease.";
      status = "high";
      referenceRange = "0.5–3.5";
    } else {
      interpretation =
        "UPCR ≥ 3.5 mg/mg — nephrotic range proteinuria (adults); evaluate for nephrotic syndrome and its complications.";
      status = "critical";
      referenceRange = "≥3.5";
    }

    return {
      value: Number(upcr.toFixed(2)),
      unit: "mg/mg",
      interpretation,
      status,
      referenceRange,
      score: Number(upcr.toFixed(2)),
    };
  },
};
