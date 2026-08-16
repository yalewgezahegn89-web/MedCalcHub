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

  clinicalGuidance: {
    advice: [
      "QUICKI is calculated from a single fasting blood sample and requires an insulin assay.",
      "Interpret the value descriptively and in the context of the patient's metabolic risk profile; track changes over time.",
      "It correlates with euglycemic-hyperinsulinemic clamp measures of insulin sensitivity.",
    ],
    warnings: [
      "Insulin assays are not standardized; values are not directly comparable across different laboratories or assay methods.",
      "There is no universally accepted diagnostic cut-point for QUICKI.",
      "Fasting insulin is not measured routinely; its main clinical role is in the evaluation of hypoglycemia and research protocols.",
    ],
    followUp: [
      "If QUICKI is low, screen for glucose intolerance, metabolic syndrome, and cardiovascular risk factors.",
      "Address modifiable risk factors; recheck fasting glucose and lipids after lifestyle intervention.",
      "Do not use QUICKI alone to diagnose diabetes — use standard glycemic criteria.",
    ],
  },

  clinicalNotes:
    "QUICKI is the reciprocal of the sum of logarithmic fasting insulin and glucose. Because both inputs are log-transformed, the index is less sensitive to high insulin values than HOMA-IR, which can become unstable at high insulin concentrations.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Katz A, Nambi SS, Mather K, et al. Quantitative insulin sensitivity check index: a simple, accurate method for assessing insulin sensitivity in humans. J Clin Endocrinol Metab. 2000;85(7):2402-2410.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Katz A, et al. J Clin Endocrinol Metab. 2000;85(7):2402-2410.",
      "Muniyappa R, et al. Current approaches for assessing insulin sensitivity and resistance in vivo: advantages, limitations, and appropriate usage. Am J Physiol Endocrinol Metab. 2008;294(1):E15-E26.",
    ],
  },

  faq: [
    {
      question: "What is the difference between QUICKI and HOMA-IR?",
      answer:
        "Both estimate insulin sensitivity from fasting insulin and glucose. QUICKI uses the log-transformed values and is more robust at high insulin concentrations; HOMA-IR can be unstable when insulin is very high. In practice they agree closely in most patients.",
    },
    {
      question: "What units are required?",
      answer:
        "Fasting insulin in µU/mL (also written mU/L or μIU/mL) and fasting glucose in mg/dL. If glucose is in mmol/L, convert to mg/dL by multiplying by 18.018.",
    },
    {
      question: "Is QUICKI used for clinical diagnosis?",
      answer:
        "Not for any specific diagnosis. It is a research and screening surrogate for insulin resistance and should be interpreted with the clinical picture.",
    },
  ],

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
