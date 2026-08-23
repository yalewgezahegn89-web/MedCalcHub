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

export const quickiCalculator: CalculatorDefinition = {
  id: "quicki",

  slug: "quicki",

  name: "Quantitative Insulin Sensitivity Check Index (QUICKI)",

  shortName: "QUICKI",

  description:
    "Calculates QUICKI, an index of insulin sensitivity derived from fasting insulin and fasting glucose: QUICKI = 1 / (log10 fasting insulin [µU/mL] + log10 fasting glucose [mg/dL]). Lower values indicate greater insulin resistance; the index is primarily a research and screening tool.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "QUICKI",
    "Insulin Sensitivity",
    "Insulin Resistance",
    "HOMA-IR",
    "Fasting Insulin",
    "Fasting Glucose",
    "Euglycemic Clamp",
    "Metabolic Risk",
  ],

  formula:
    "QUICKI = 1 ÷ ( log10 fasting insulin [µU/mL] + log10 fasting glucose [mg/dL] )",

  normalRange:
    "Descriptive — published means: nonobese ≈ 0.38, obese ≈ 0.33, diabetic ≈ 0.30",

  referenceRanges: [
    {
      label: "Nonobese (published mean)",
      range: "≈ 0.38",
      context: "Katz et al., J Clin Endocrinol Metab 2000",
    },
    {
      label: "Obese (published mean)",
      range: "≈ 0.33",
      context: "Katz et al., J Clin Endocrinol Metab 2000",
    },
    {
      label: "Diabetic (published mean)",
      range: "≈ 0.30",
      context: "Katz et al., J Clin Endocrinol Metab 2000",
    },
  ],

  classification: [
    {
      label: "Higher",
      range: "Greater insulin sensitivity",
      color: "green",
    },
    {
      label: "Lower",
      range: "Greater insulin resistance",
      color: "orange",
    },
  ],



  clinicalNotes:
    "QUICKI is the reciprocal of the sum of logarithmic fasting insulin and glucose. Because both inputs are log-transformed, the index is less sensitive to high insulin values than HOMA-IR, which can become unstable at high insulin concentrations.",





  comparison: undefined,

  references: [
    "Katz A, et al. J Clin Endocrinol Metab. 2000;85(7):2402-2410.",
    "Muniyappa R, et al. Am J Physiol Endocrinol Metab. 2008;294(1):E15-E26.",
  ],

  relatedCalculators: [
    "homa-ir",
    "insulin-sensitivity",
    "tyg-index",
  ],

  inputs: [
    {
      id: "fastingInsulin",
      label: "Fasting Insulin",
      type: "number",
      unit: "µU/mL",
      required: true,
      min: 1,
    },
    {
      id: "fastingGlucose",
      label: "Fasting Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const insulin = positive(values, "fastingInsulin", "Fasting insulin");
    if ("err" in insulin) return critical(insulin.err);
    const glucose = positive(values, "fastingGlucose", "Fasting glucose");
    if ("err" in glucose) return critical(glucose.err);

    const quicki =
      1 / (Math.log10(insulin.n) + Math.log10(glucose.n));

    const interpretation =
      "QUICKI is a descriptive surrogate of insulin sensitivity — lower values indicate greater insulin resistance. Compare with published means (nonobese ≈ 0.38, obese ≈ 0.33, diabetic ≈ 0.30) and prior results in the same patient.";

    return {
      value: Number(quicki.toFixed(2)),
      unit: "index",
      interpretation,
      status: "normal",
    };
  },
};
