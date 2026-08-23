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

export const ldlCholesterolCalculator: CalculatorDefinition = {
  id: "ldl-cholesterol",

  slug: "ldl-cholesterol",

  name: "Calculated LDL (Friedewald Equation)",

  shortName: "Friedewald LDL",

  description:
    "Estimates low-density lipoprotein cholesterol (LDL-C) from a standard fasting lipid panel using the Friedewald equation: LDL = total cholesterol − HDL − (triglycerides / 5). Used for cardiovascular risk assessment and lipid-lowering treatment targets. Not valid when triglycerides are ≥ 400 mg/dL.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "LDL",
    "LDL-C",
    "Friedewald",
    "Cholesterol",
    "Lipids",
    "Dyslipidemia",
    "Cardiovascular Risk",
    "Atherosclerosis",
  ],

  formula:
    "LDL-C (mg/dL) = Total cholesterol − HDL − (Triglycerides / 5)",

  normalRange: "< 130 mg/dL (optimal < 100)",

  referenceRanges: [
    {
      label: "Optimal",
      range: "< 100",
      context: "fasting",
    },
    {
      label: "Near optimal / above optimal",
      range: "100–129",
      context: "fasting",
    },
    {
      label: "Borderline high",
      range: "130–159",
      context: "fasting",
    },
    {
      label: "High",
      range: "160–189",
      context: "fasting",
    },
    {
      label: "Very high",
      range: "≥ 190",
      context: "fasting",
    },
  ],

  classification: [
    {
      label: "Optimal",
      range: "<100",
      max: 99.99,
      color: "green",
    },
    {
      label: "Near optimal / above optimal",
      range: "100–129",
      min: 100,
      max: 129.99,
      color: "green",
    },
    {
      label: "Borderline high",
      range: "130–159",
      min: 130,
      max: 159.99,
      color: "yellow",
    },
    {
      label: "High",
      range: "160–189",
      min: 160,
      max: 189.99,
      color: "orange",
    },
    {
      label: "Very high",
      range: "≥190",
      min: 190,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Friedewald equation assumes VLDL cholesterol is approximately triglycerides/5 (mg/dL). It answers a distinct laboratory question from non-HDL cholesterol, which captures all apolipoprotein B-containing lipoproteins.",





  comparison: undefined,

  references: [
    "Friedewald WT, Levy RI, Fredrickson DS. Clin Chem. 1972;18(6):499-502.",
    "National Cholesterol Education Program. ATP III Executive Summary. JAMA. 2001;285:2486-2497.",
  ],

  relatedCalculators: [
    "non-hdl-cholesterol",
    "triglyceride-hdl-ratio",
    "tyg-index",
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
      id: "hdl",
      label: "HDL Cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "triglycerides",
      label: "Triglycerides",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 399,
      helpText: "Friedewald equation is not valid at triglycerides ≥ 400 mg/dL.",
    },
  ],

  calculate(values: Record<string, string>) {
    const total = positive(values, "totalCholesterol", "Total cholesterol");
    if ("err" in total) return critical(total.err);
    const hdl = positive(values, "hdl", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);
    const tg = positive(values, "triglycerides", "Triglycerides");
    if ("err" in tg) return critical(tg.err);

    if (tg.n >= 400) {
      return critical(
        "Triglycerides are ≥ 400 mg/dL — the Friedewald equation is not valid in this range. Use a direct LDL measurement.",
      );
    }

    const ldl = total.n - hdl.n - tg.n / 5;

    if (ldl <= 0) {
      return critical(
        "Calculated LDL is not positive. Check that HDL and triglyceride values are plausible relative to total cholesterol.",
      );
    }

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ldl < 100) {
      interpretation = "Optimal LDL cholesterol.";
      status = "normal";
      referenceRange = "<100";
    } else if (ldl < 130) {
      interpretation =
        "Near optimal / above optimal LDL cholesterol.";
      status = "normal";
      referenceRange = "100–129";
    } else if (ldl < 160) {
      interpretation =
        "Borderline high LDL cholesterol.";
      status = "high";
      referenceRange = "130–159";
    } else if (ldl < 190) {
      interpretation =
        "High LDL cholesterol.";
      status = "high";
      referenceRange = "160–189";
    } else {
      interpretation =
        "Very high LDL cholesterol.";
      status = "critical";
      referenceRange = "≥190";
    }

    return {
      value: Number(ldl.toFixed(2)),
      unit: "mg/dL",
      interpretation,
      status,
      referenceRange,
    };
  },
};
