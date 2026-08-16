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

export const apobApoa1RatioCalculator: CalculatorDefinition = {
  id: "apob-apoa1-ratio",

  slug: "apob-apoa1-ratio",

  name: "ApoB / ApoA1 Ratio (ApoB:ApoA1)",

  shortName: "ApoB/ApoA1",

  description:
    "Calculates the apolipoprotein B to apolipoprotein A1 ratio (ApoB:ApoA1), an index of the balance between atherogenic (ApoB) and anti-atherogenic (ApoA1) lipoproteins used in cardiovascular risk assessment.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "ApoB ApoA1 Ratio",
    "Apolipoprotein B",
    "Apolipoprotein A1",
    "ApoB",
    "ApoA1",
    "Cardiovascular Risk",
    "Dyslipidemia",
    "Lipoprotein",
    "Laboratory",
  ],

  formula: "ApoB:ApoA1 = ApoB (g/L) ÷ ApoA1 (g/L)",

  normalRange:
    "Male: 0.3–1.0 (ratio 1.0 as a general upper reference); Female: 0.3–0.8",

  referenceRanges: [
    {
      label: "Male reference range",
      range: "0.30–1.00",
      sex: "male",
      context: "typical laboratory reference interval",
    },
    {
      label: "Female reference range",
      range: "0.30–0.80",
      sex: "female",
      context: "typical laboratory reference interval",
    },
    {
      label: "Elevated (increased risk)",
      range: ">1.0 (male) / >0.8 (female)",
      context: "cardiovascular risk marker",
    },
  ],

  classification: [
    {
      label: "Normal (male)",
      range: "0.3–1.0",
      min: 0.3,
      max: 1.0,
      color: "green",
    },
    {
      label: "Elevated (male)",
      range: ">1.0",
      min: 1.01,
      color: "red",
    },
    {
      label: "Normal (female)",
      range: "0.3–0.8",
      min: 0.3,
      max: 0.8,
      color: "green",
    },
    {
      label: "Elevated (female)",
      range: ">0.8",
      min: 0.81,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use ApoB and ApoA1 measured in the same units (typically g/L).",
      "A ratio above 1.0 in men and above 0.8 in women is generally considered elevated and associated with higher cardiovascular risk.",
      "ApoB approximates the number of atherogenic particles and is a recognized alternative to LDL for risk assessment.",
    ],
    warnings: [
      "The 1.0/0.8 thresholds are population reference conventions (e.g., FINRISK and general laboratory intervals), not guideline treatment targets.",
      "Ratios vary by assay, ethnicity, and age; use the reference interval from the performing laboratory.",
      "Do not use the ratio alone to decide statin initiation — apply validated risk scores.",
    ],
    followUp: [
      "For an elevated ratio, assess global cardiovascular risk and consider statin therapy if indicated.",
      "Repeat ApoB/ApoA1 after lipid-lowering therapy to gauge response.",
    ],
  },

  clinicalNotes:
    "ApoB is present on all atherogenic lipoproteins (LDL, VLDL, IDL, Lp(a)) while ApoA1 is the main protein of HDL. The ApoB:ApoA1 ratio summarizes the atherogenic-to-protective balance and has been studied in large cohorts such as INTERHEART.",

  evidence: {
    source: "Epidemiological association (peer-reviewed)",
    reference:
      "Walldius G, Jungner I. The apoB/apoA-I ratio: a strong, new risk factor for cardiovascular disease and a target for lipid-lowering therapy—a review of the evidence. J Intern Med. 2006;259(5):493-519.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Walldius G, Jungner I. J Intern Med. 2006;259(5):493-519.",
      "Yusuf S, et al. Effect of potentially modifiable risk factors associated with myocardial infarction in 52 countries (INTERHEART). Lancet. 2004;364(9438):937-952.",
    ],
  },

  faq: [
    {
      question: "Why is the ApoB:ApoA1 ratio used?",
      answer:
        "It reflects the balance between atherogenic and protective lipoproteins, and in epidemiological studies (e.g., INTERHEART, AMORIS) it has performed well as a cardiovascular risk marker.",
    },
    {
      question: "What is the difference between ApoB and LDL?",
      answer:
        "LDL cholesterol measures cholesterol mass; ApoB counts the number of atherogenic particles (one per particle), which better captures risk from small, dense LDL and remnant particles.",
    },
  ],

  comparison: undefined,

  references: [
    "Walldius G, Jungner I. J Intern Med. 2006;259(5):493-519.",
    "Yusuf S, et al. Lancet. 2004;364(9438):937-952.",
  ],

  relatedCalculators: [
    "total-cholesterol-hdl-ratio",
    "atherogenic-index-of-plasma",
    "metabolic-syndrome-atp3",
  ],

  inputs: [
    {
      id: "apoB",
      label: "ApoB",
      type: "number",
      unit: "g/L",
      required: true,
      min: 0.01,
      step: 0.01,
    },
    {
      id: "apoA1",
      label: "ApoA1",
      type: "number",
      unit: "g/L",
      required: true,
      min: 0.01,
      step: 0.01,
    },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      defaultValue: "male",
    },
  ],

  calculate(values: Record<string, string>) {
    const apob = positive(values, "apoB", "ApoB");
    if ("err" in apob) return critical(apob.err);
    const apoa1 = positive(values, "apoA1", "ApoA1");
    if ("err" in apoa1) return critical(apoa1.err);
    const sex = values.sex;
    if (sex !== "male" && sex !== "female") return critical("Select a valid sex.");

    const ratio = apob.n / apoa1.n;
    const limit = sex === "male" ? 1.0 : 0.8;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ratio <= limit) {
      interpretation = `ApoB:ApoA1 = ${ratio.toFixed(2)} — within the reference range for ${sex}s (≤ ${limit.toFixed(1)}).`;
      status = "normal";
      referenceRange = sex === "male" ? "0.3–1.0" : "0.3–0.8";
    } else {
      interpretation = `ApoB:ApoA1 = ${ratio.toFixed(2)} — above the reference limit for ${sex}s (> ${limit.toFixed(1)}), associated with higher cardiovascular risk.`;
      status = "critical";
      referenceRange = sex === "male" ? ">1.0" : ">0.8";
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
