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

export const atherogenicIndexPlasmaCalculator: CalculatorDefinition = {
  id: "atherogenic-index-of-plasma",

  slug: "atherogenic-index-of-plasma",

  name: "Atherogenic Index of Plasma (AIP)",

  shortName: "AIP",

  description:
    "Calculates the atherogenic index of plasma (AIP), a logarithmically transformed ratio of triglycerides to HDL cholesterol that reflects the balance of atherogenic and protective lipoproteins.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Atherogenic Index of Plasma",
    "AIP",
    "Triglyceride HDL Ratio",
    "Lipoprotein Particle Size",
    "Cardiovascular Risk",
    "Insulin Resistance",
    "Lipid Panel",
    "Laboratory",
  ],

  formula: "AIP = log₁₀(Triglycerides ÷ HDL Cholesterol)",

  normalRange: "Typically between 0.1 and 0.24 in the general population; lower is better",

  referenceRanges: [
    {
      label: "Low atherogenic risk",
      range: "<0.11",
      context: "Dobiásová categories",
    },
    {
      label: "Intermediate atherogenic risk",
      range: "0.11–0.21",
      context: "Dobiásová categories",
    },
    {
      label: "High atherogenic risk",
      range: ">0.21",
      context: "Dobiásová categories",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "<0.11",
      max: 0.109,
      color: "green",
    },
    {
      label: "Intermediate risk",
      range: "0.11–0.21",
      min: 0.11,
      max: 0.21,
      color: "yellow",
    },
    {
      label: "High risk",
      range: ">0.21",
      min: 0.211,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use fasting triglycerides and HDL cholesterol measured on the same sample.",
      "AIP < 0.11 indicates low atherogenic risk; > 0.21 indicates high risk in the Dobiásová classification.",
      "Higher AIP correlates with smaller, denser LDL particles and higher cardiovascular risk.",
    ],
    warnings: [
      "The categorical cutoffs (0.11 / 0.21) derive from the original Dobiásová work and are not a universal clinical standard.",
      "Non-fasting samples and high dietary fat intake inflate triglycerides and raise AIP.",
      "AIP is an adjunct marker; use it alongside LDL, non-HDL cholesterol, and global risk scores.",
    ],
    followUp: [
      "For elevated AIP, address triglycerides (lifestyle, weight, alcohol, glycemic control) and reassess with a fasting panel.",
      "Incorporate the result into the full dyslipidemia and cardiovascular risk evaluation.",
    ],
  },

  clinicalNotes:
    "The atherogenic index of plasma (log10 TG/HDL) was introduced by Dobiásová and colleagues. It correlates with LDL particle size and is used as a research and clinical marker of atherogenic risk.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Dobiásová M, Frohlich J. The plasma parameter log (TG/HDL-C) as an atherogenic index: correlation with lipoprotein particle size and esterification rate in apoB-lipoprotein-depleted plasma (FERHDL). Clin Biochem. 2001;34(7):583-588.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Dobiásová M, Frohlich J. Clin Biochem. 2001;34(7):583-588.",
      "Dobiásová M. Atherogenic index of plasma [log(triglycerides/HDL-cholesterol)]: theoretical and practical implications. Clin Chem. 2004;50(7):1113-1115.",
    ],
  },

  faq: [
    {
      question: "What does the AIP actually measure?",
      answer:
        "AIP reflects the balance between atherogenic triglyceride-rich lipoproteins and protective HDL. Higher values correlate with smaller, denser LDL particles and increased cardiovascular risk.",
    },
    {
      question: "How do I compute AIP when TG and HDL are in mmol/L?",
      answer:
        "The ratio TG/HDL is unit-independent (it is a ratio), so AIP can be computed with mg/dL or mmol/L values; only the logarithmic transformation matters.",
    },
  ],

  comparison: undefined,

  references: [
    "Dobiásová M, Frohlich J. Clin Biochem. 2001;34(7):583-588.",
    "Dobiásová M. Clin Chem. 2004;50(7):1113-1115.",
  ],

  relatedCalculators: [
    "total-cholesterol-hdl-ratio",
    "apob-apoa1-ratio",
    "metabolic-syndrome-atp3",
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
      id: "hdlCholesterol",
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
    const hdl = positive(values, "hdlCholesterol", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);

    const aip = Math.log10(tg.n / hdl.n);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (aip < 0.11) {
      interpretation =
        "AIP < 0.11 — low atherogenic risk (Dobiásová classification).";
      status = "normal";
      referenceRange = "<0.11";
    } else if (aip <= 0.21) {
      interpretation =
        "AIP 0.11–0.21 — intermediate atherogenic risk; review lifestyle and the full lipid profile.";
      status = "high";
      referenceRange = "0.11–0.21";
    } else {
      interpretation =
        "AIP > 0.21 — high atherogenic risk; associated with smaller, denser LDL particles. Intensify risk factor modification.";
      status = "critical";
      referenceRange = ">0.21";
    }

    return {
      value: Number(aip.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
      score: Number(aip.toFixed(2)),
    };
  },
};
