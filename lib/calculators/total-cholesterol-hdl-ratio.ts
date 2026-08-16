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

export const totalCholesterolHdlRatioCalculator: CalculatorDefinition = {
  id: "total-cholesterol-hdl-ratio",

  slug: "total-cholesterol-hdl-ratio",

  name: "Total Cholesterol / HDL Ratio (TC/HDL)",

  shortName: "TC/HDL",

  description:
    "Calculates the total cholesterol to HDL ratio (TC/HDL), a lipid-based cardiovascular risk indicator that compares total cholesterol with the protective HDL fraction.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Total Cholesterol HDL Ratio",
    "TC/HDL",
    "Lipid Panel",
    "Cholesterol",
    "HDL",
    "Cardiovascular Risk",
    "Atherosclerosis",
    "Laboratory",
  ],

  formula: "TC/HDL = Total Cholesterol (mg/dL) ÷ HDL Cholesterol (mg/dL)",

  normalRange: "Generally < 4 in low-risk adults; lower is better",

  referenceRanges: [
    {
      label: "Desirable",
      range: "<4",
      context: "lower cardiovascular risk",
    },
    {
      label: "Moderate",
      range: "4–5",
      context: "intermediate risk",
    },
    {
      label: "Elevated",
      range: ">5",
      context: "higher cardiovascular risk",
    },
  ],

  classification: [
    {
      label: "Desirable",
      range: "<4",
      max: 3.99,
      color: "green",
    },
    {
      label: "Moderate",
      range: "4–5",
      min: 4,
      max: 5,
      color: "yellow",
    },
    {
      label: "Elevated",
      range: ">5",
      min: 5.01,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use a fasting lipid panel for consistency; a TC/HDL ratio near 3.5 or lower is associated with lower cardiovascular risk.",
      "Interpret alongside LDL, non-HDL cholesterol, triglycerides, and the full cardiovascular risk assessment (e.g., pooled cohort equations).",
      "TC/HDL is a simple risk marker, not a treatment target.",
    ],
    warnings: [
      "The ratio does not replace LDL or non-HDL cholesterol for guiding statin therapy in most modern guidelines.",
      "Acute illness, recent meals, and non-fasting samples can alter triglycerides and the calculated ratio.",
      "Healthy women typically have a lower TC/HDL than men of the same age.",
    ],
    followUp: [
      "Repeat the lipid panel per guideline intervals (often annually or after medication changes).",
      "Incorporate the ratio into a global risk score rather than using it in isolation.",
    ],
  },

  clinicalNotes:
    "The TC/HDL ratio is one of several lipid ratios studied in cardiovascular epidemiology (e.g., PROCAM, Framingham cohorts). Lower values reflect a higher HDL proportion and are generally associated with lower atherosclerotic risk.",

  evidence: {
    source: "Epidemiological association (peer-reviewed)",
    reference:
      "Stampfer MJ, et al. A prospective study of cholesterol, apolipoproteins, and the risk of myocardial infarction. N Engl J Med. 1991;325(6):373-381.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Stampfer MJ, et al. N Engl J Med. 1991;325(6):373-381.",
      "Assmann G, et al. The role of HDL cholesterol in the metabolic syndrome. Atheroscler Suppl. 2002;3(4):35-41.",
    ],
  },

  faq: [
    {
      question: "What is a good TC/HDL ratio?",
      answer:
        "Values below 4 are generally considered desirable, with some risk models favoring values around 3.5 or lower. The ratio should be interpreted in the context of overall cardiovascular risk.",
    },
    {
      question: "Is TC/HDL still recommended?",
      answer:
        "Modern guidelines emphasize LDL and non-HDL cholesterol for treatment decisions, but the TC/HDL ratio remains a useful, inexpensive risk indicator and patient-education tool.",
    },
  ],

  comparison: undefined,

  references: [
    "Stampfer MJ, et al. N Engl J Med. 1991;325(6):373-381.",
    "Assmann G, et al. Atheroscler Suppl. 2002;3(4):35-41.",
  ],

  relatedCalculators: [
    "atherogenic-index-of-plasma",
    "apob-apoa1-ratio",
    "metabolic-syndrome-atp3",
  ],

  inputs: [
    {
      id: "totalCholesterol",
      label: "Total Cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "hdlCholesterol",
      label: "HDL Cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const tc = positive(values, "totalCholesterol", "Total cholesterol");
    if ("err" in tc) return critical(tc.err);
    const hdl = positive(values, "hdlCholesterol", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);

    const ratio = tc.n / hdl.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ratio < 4) {
      interpretation =
        "TC/HDL < 4 — desirable; associated with lower cardiovascular risk.";
      status = "normal";
      referenceRange = "<4";
    } else if (ratio <= 5) {
      interpretation =
        "TC/HDL 4–5 — moderate; interpret with LDL, non-HDL cholesterol, and the global cardiovascular risk assessment.";
      status = "high";
      referenceRange = "4–5";
    } else {
      interpretation =
        "TC/HDL > 5 — elevated; associated with higher cardiovascular risk. Reinforce lifestyle modification and reassess risk-based targets.";
      status = "critical";
      referenceRange = ">5";
    }

    return {
      value: Number(ratio.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
      score: Number(ratio.toFixed(2)),
    };
  },
};
