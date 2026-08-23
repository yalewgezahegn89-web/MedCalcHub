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

export const nonHdlCholesterolCalculator: CalculatorDefinition = {
  id: "non-hdl-cholesterol",

  slug: "non-hdl-cholesterol",

  name: "Non-HDL Cholesterol",

  shortName: "Non-HDL Cholesterol",

  description:
    "Calculates non-HDL cholesterol (total cholesterol minus HDL cholesterol). Non-HDL captures all atherogenic apolipoprotein B-containing lipoproteins, including LDL, VLDL, IDL, and remnants, and is a secondary lipid treatment target per ATP III guidelines.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Non-HDL",
    "Cholesterol",
    "Lipids",
    "Dyslipidemia",
    "Apolipoprotein B",
    "Cardiovascular Risk",
    "Lipid Panel",
  ],

  formula:
    "Non-HDL cholesterol (mg/dL) = Total cholesterol − HDL cholesterol",

  normalRange: "< 160 mg/dL (optimal < 130)",

  referenceRanges: [
    {
      label: "Optimal",
      range: "< 130",
      context: "fasting",
    },
    {
      label: "Near optimal / above optimal",
      range: "130–159",
      context: "fasting",
    },
    {
      label: "Borderline high",
      range: "160–189",
      context: "fasting",
    },
    {
      label: "High",
      range: "190–219",
      context: "fasting",
    },
    {
      label: "Very high",
      range: "≥ 220",
      context: "fasting",
    },
  ],

  classification: [
    {
      label: "Optimal",
      range: "<130",
      max: 129.99,
      color: "green",
    },
    {
      label: "Near optimal / above optimal",
      range: "130–159",
      min: 130,
      max: 159.99,
      color: "green",
    },
    {
      label: "Borderline high",
      range: "160–189",
      min: 160,
      max: 189.99,
      color: "yellow",
    },
    {
      label: "High",
      range: "190–219",
      min: 190,
      max: 219.99,
      color: "orange",
    },
    {
      label: "Very high",
      range: "≥220",
      min: 220,
      color: "red",
    },
  ],



  clinicalNotes:
    "Non-HDL cholesterol answers a distinct clinical question from calculated LDL: it reflects the total atherogenic (apolipoprotein B-containing) particle burden, including VLDL and remnant cholesterol.",





  comparison: undefined,

  references: [
    "National Cholesterol Education Program. ATP III Executive Summary. JAMA. 2001;285:2486-2497.",
  ],

  relatedCalculators: [
    "ldl-cholesterol",
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
  ],

  calculate(values: Record<string, string>) {
    const total = positive(values, "totalCholesterol", "Total cholesterol");
    if ("err" in total) return critical(total.err);
    const hdl = positive(values, "hdl", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);

    const nonHdl = total.n - hdl.n;

    if (nonHdl <= 0) {
      return critical(
        "Calculated non-HDL cholesterol is not positive. Check that HDL is plausible relative to total cholesterol.",
      );
    }

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (nonHdl < 130) {
      interpretation = "Optimal non-HDL cholesterol.";
      status = "normal";
      referenceRange = "<130";
    } else if (nonHdl < 160) {
      interpretation =
        "Near optimal / above optimal non-HDL cholesterol.";
      status = "normal";
      referenceRange = "130–159";
    } else if (nonHdl < 190) {
      interpretation =
        "Borderline high non-HDL cholesterol.";
      status = "high";
      referenceRange = "160–189";
    } else if (nonHdl < 220) {
      interpretation =
        "High non-HDL cholesterol.";
      status = "high";
      referenceRange = "190–219";
    } else {
      interpretation =
        "Very high non-HDL cholesterol.";
      status = "critical";
      referenceRange = "≥220";
    }

    return {
      value: Number(nonHdl.toFixed(2)),
      unit: "mg/dL",
      interpretation,
      status,
      referenceRange,
    };
  },
};
