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

export const tygIndexCalculator: CalculatorDefinition = {
  id: "tyg-index",

  slug: "tyg-index",

  name: "Triglyceride-Glucose (TyG) Index",

  shortName: "TyG Index",

  description:
    "Calculates the triglyceride-glucose (TyG) index, a surrogate marker of insulin resistance derived from fasting triglycerides and fasting plasma glucose: TyG = ln(TG × FPG / 2) with units in mg/dL. Elevated values indicate greater insulin resistance and higher cardiometabolic risk.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "TyG",
    "Triglyceride-Glucose Index",
    "Insulin Resistance",
    "Metabolic Syndrome",
    "Dysglycemia",
    "Fasting Glucose",
    "Triglycerides",
    "Cardiometabolic Risk",
  ],

  formula:
    "TyG index = ln( Fasting triglycerides [mg/dL] × Fasting plasma glucose [mg/dL] ÷ 2 )",

  normalRange: "Descriptive — no universal cut-point",

  referenceRanges: [
    {
      label: "Lower values",
      range: "Less insulin resistance",
      context: "population dependent",
    },
    {
      label: "Higher values",
      range: "Greater insulin resistance",
      context: "population dependent",
    },
  ],

  classification: [
    {
      label: "Lower",
      range: "Lower insulin resistance",
      color: "green",
    },
    {
      label: "Higher",
      range: "Greater insulin resistance",
      color: "orange",
    },
  ],



  clinicalNotes:
    "The original formula is ln(TG × FPG / 2) with units in mg/dL. Using mmol/L units requires the constant ln(0.144) to be subtracted; this calculator assumes mg/dL inputs.",





  comparison: undefined,

  references: [
    "Simental-Mendía LE, et al. Metab Syndr Relat Disord. 2008;6(4):299-304.",
    "Guerrero-Romero F, et al. J Clin Endocrinol Metab. 2010;95(7):3347-3351.",
  ],

  relatedCalculators: [
    "homa-ir",
    "quicki",
    "triglyceride-hdl-ratio",
    "insulin-sensitivity",
  ],

  inputs: [
    {
      id: "triglycerides",
      label: "Fasting Triglycerides",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "glucose",
      label: "Fasting Plasma Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const tg = positive(values, "triglycerides", "Fasting triglycerides");
    if ("err" in tg) return critical(tg.err);
    const glucose = positive(values, "glucose", "Fasting plasma glucose");
    if ("err" in glucose) return critical(glucose.err);

    const tyg = Math.log((tg.n * glucose.n) / 2);

    const interpretation =
      "The TyG index is a descriptive surrogate of insulin resistance — compare against locally established cut-points and prior results in the same patient. Higher values indicate greater insulin resistance.";

    return {
      value: Number(tyg.toFixed(2)),
      unit: "index",
      interpretation,
      status: "normal",
    };
  },
};
