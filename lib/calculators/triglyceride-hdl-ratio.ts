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

export const triglycerideHdlRatioCalculator: CalculatorDefinition = {
  id: "triglyceride-hdl-ratio",

  slug: "triglyceride-hdl-ratio",

  name: "Triglyceride to HDL Ratio (TG/HDL)",

  shortName: "TG/HDL Ratio",

  description:
    "Calculates the ratio of fasting triglycerides to HDL cholesterol. A ratio ≥ 3.0 (mg/dL units) has been used as a marker of insulin resistance in overweight non-diabetic adults. The predictive value is ethnicity-dependent and is not reliable in African American populations.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "TG/HDL Ratio",
    "Triglyceride HDL Ratio",
    "Insulin Resistance",
    "Lipids",
    "Metabolic Syndrome",
    "Cardiovascular Risk",
    "Dyslipidemia",
  ],

  formula:
    "TG/HDL ratio = Fasting triglycerides (mg/dL) ÷ HDL cholesterol (mg/dL)",

  normalRange: "< 3.0",

  referenceRanges: [
    {
      label: "Low",
      range: "< 3.0",
      context: "overweight non-diabetic adults (mg/dL units)",
    },
    {
      label: "High",
      range: "≥ 3.0",
      context: "overweight non-diabetic adults (mg/dL units)",
    },
  ],

  classification: [
    {
      label: "Low",
      range: "<3.0",
      max: 2.99,
      color: "green",
    },
    {
      label: "High",
      range: "≥3.0",
      min: 3,
      color: "orange",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use fasting triglycerides and HDL in mg/dL; the 3.0 cut-point is defined in mg/dL units.",
      "Interpret the ratio as one component of insulin resistance assessment, together with waist circumference, blood pressure, and glucose.",
      "The ratio is most applicable to overweight, non-diabetic adults and should be interpreted with caution in other populations.",
    ],
    warnings: [
      "The ratio is not reliable as an insulin resistance marker in African American populations.",
      "Severely elevated triglycerides make the ratio less informative for cardiovascular risk prediction.",
      "It is not a substitute for formal glucose tolerance testing or HbA1c in diagnosing diabetes.",
    ],
    followUp: [
      "If the ratio is ≥ 3.0, screen for glucose intolerance and metabolic syndrome components.",
      "Address modifiable factors: weight, physical activity, refined carbohydrates, and alcohol.",
      "Reassess lipids after lifestyle changes; consider pharmacotherapy per lipid guidelines.",
    ],
  },

  clinicalNotes:
    "In the derivation by McLaughlin and colleagues, a TG/HDL ratio ≥ 3.0 identified insulin-resistant overweight adults with high sensitivity and specificity, but this performance was not reproduced in African American cohorts.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "McLaughlin T, Abbasi F, Cheal K, et al. Use of metabolic markers to identify overweight individuals who are insulin resistant. Ann Intern Med. 2003;139(10):802-809.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "McLaughlin T, et al. Ann Intern Med. 2003;139(10):802-809.",
      "Sumner AE, et al. The TG/HDL ratio is not a reliable marker of insulin resistance in African Americans. Diabetes Care. 2005;28(6):1433-1438.",
    ],
  },

  faq: [
    {
      question: "What does a TG/HDL ratio ≥ 3.0 indicate?",
      answer:
        "In overweight non-diabetic adults, a ratio ≥ 3.0 was associated with insulin resistance as measured by clamp studies. It is a screening clue, not a diagnostic test.",
    },
    {
      question: "Why is the ratio less useful in African Americans?",
      answer:
        "Sumner and colleagues showed that the relationship between the TG/HDL ratio and clamp-measured insulin sensitivity does not hold in African American cohorts, so the cut-point is not reliable in this population.",
    },
    {
      question: "What units does this calculator use?",
      answer:
        "Both inputs are in mg/dL. If you have mmol/L values, convert triglycerides (×88.57) and HDL (×38.67) to mg/dL first, or use a calculator that supports unit conversion.",
    },
  ],

  comparison: undefined,

  references: [
    "McLaughlin T, et al. Ann Intern Med. 2003;139(10):802-809.",
    "Sumner AE, et al. Diabetes Care. 2005;28(6):1433-1438.",
  ],

  relatedCalculators: [
    "tyg-index",
    "homa-ir",
    "ldl-cholesterol",
    "non-hdl-cholesterol",
  ],

  inputs: [
    {
      id: "triglycerides",
      label: "Triglycerides",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "hdl",
      label: "HDL Cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const tg = positive(values, "triglycerides", "Triglycerides");
    if ("err" in tg) return critical(tg.err);
    const hdl = positive(values, "hdl", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);

    const ratio = tg.n / hdl.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (ratio < 3) {
      interpretation =
        "TG/HDL ratio below 3.0 — less likely to indicate insulin resistance by this marker.";
      status = "normal";
    } else {
      interpretation =
        "TG/HDL ratio ≥ 3.0 — associated with insulin resistance in overweight non-diabetic adults. Interpret with caution outside this population (not reliable in African Americans).";
      status = "high";
    }

    return {
      value: Number(ratio.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
    };
  },
};
