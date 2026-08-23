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



  clinicalNotes:
    "The atherogenic index of plasma (log10 TG/HDL) was introduced by Dobiásová and colleagues. It correlates with LDL particle size and is used as a research and clinical marker of atherogenic risk.",





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
