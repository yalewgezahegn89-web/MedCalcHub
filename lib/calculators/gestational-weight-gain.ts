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

type GainRange = {
  category: string;
  minLb: number;
  maxLb: number;
  rateMinLb: number;
  rateMaxLb: number;
};

function rangeForBmi(bmi: number): GainRange | undefined {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      minLb: 28,
      maxLb: 40,
      rateMinLb: 1.0,
      rateMaxLb: 1.3,
    };
  }
  if (bmi < 25) {
    return {
      category: "Normal weight",
      minLb: 25,
      maxLb: 35,
      rateMinLb: 0.8,
      rateMaxLb: 1.0,
    };
  }
  if (bmi < 30) {
    return {
      category: "Overweight",
      minLb: 15,
      maxLb: 25,
      rateMinLb: 0.5,
      rateMaxLb: 0.7,
    };
  }
  return {
    category: "Obese",
    minLb: 11,
    maxLb: 20,
    rateMinLb: 0.4,
    rateMaxLb: 0.6,
  };
}

export const gestationalWeightGainCalculator: CalculatorDefinition = {
  id: "gestational-weight-gain",

  slug: "gestational-weight-gain",

  name: "Gestational Weight Gain (IOM 2009)",

  shortName: "GWG",

  description:
    "Provides the Institute of Medicine (IOM/NRC 2009) recommended total gestational weight gain and second/third-trimester rate based on pre-pregnancy body mass index (BMI). Categories: underweight (< 18.5), normal (18.5–24.9), overweight (25–29.9), and obese (≥ 30).",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Gestational Weight Gain",
    "GWG",
    "IOM",
    "Pregnancy Weight",
    "Weight Gain",
    "Pre-Pregnancy BMI",
    "BMI",
    "Obesity in Pregnancy",
    "Obstetrics",
  ],

  formula:
    "IOM 2009: Underweight 28–40 lb; Normal 25–35 lb; Overweight 15–25 lb; Obese 11–20 lb total (1st-trimester ~1–4.5 lb, then 2nd/3rd-trimester weekly rates per category)",

  normalRange:
    "Underweight: 28–40 lb (1.0–1.3 lb/wk); Normal: 25–35 lb (0.8–1.0 lb/wk); Overweight: 15–25 lb (0.5–0.7 lb/wk); Obese: 11–20 lb (0.4–0.6 lb/wk).",

  referenceRanges: [
    {
      label: "Underweight",
      range: "28–40 lb",
      context: "pre-pregnancy BMI < 18.5",
    },
    {
      label: "Normal weight",
      range: "25–35 lb",
      context: "pre-pregnancy BMI 18.5–24.9",
    },
    {
      label: "Overweight",
      range: "15–25 lb",
      context: "pre-pregnancy BMI 25–29.9",
    },
    {
      label: "Obese",
      range: "11–20 lb",
      context: "pre-pregnancy BMI ≥ 30",
    },
  ],

  classification: [
    {
      label: "Underweight",
      range: "BMI < 18.5",
      max: 18.4,
      color: "yellow",
    },
    {
      label: "Normal weight",
      range: "BMI 18.5–24.9",
      min: 18.5,
      max: 24.9,
      color: "green",
    },
    {
      label: "Overweight",
      range: "BMI 25–29.9",
      min: 25,
      max: 29.9,
      color: "yellow",
    },
    {
      label: "Obese",
      range: "BMI ≥ 30",
      min: 30,
      color: "orange",
    },
  ],



  clinicalNotes:
    "The IOM/NRC 2009 guidelines (weight gain during pregnancy) recommend total weight gain by pre-pregnancy BMI: underweight 28–40 lb, normal weight 25–35 lb, overweight 15–25 lb, and obese 11–20 lb, with 2nd/3rd-trimester rates of 1.0–1.3, 0.8–1.0, 0.5–0.7, and 0.4–0.6 lb/week respectively. The calculator returns the midpoint of the recommended total range for the entered BMI.",




  comparison: undefined,

  references: [
    "Institute of Medicine and National Research Council. Weight Gain During Pregnancy: Reexamining the Guidelines. National Academies Press; 2009.",
  ],

  relatedCalculators: [
    "bmi",
    "hadlock-efw",
    "preeclampsia-criteria",
    "gestational-age",
  ],

  inputs: [
    {
      id: "bmi",
      label: "Pre-Pregnancy BMI",
      type: "number",
      unit: "kg/m²",
      required: true,
      min: 1,
      step: 0.1,
      helpText: "Body mass index based on pre-pregnancy or first-visit weight and height.",
    },
  ],

  calculate(values: Record<string, string>) {
    const bmi = positive(values, "bmi", "Pre-pregnancy BMI");
    if ("err" in bmi) return critical(bmi.err);

    const range = rangeForBmi(bmi.n);
    if (!range) return critical("Unable to classify pre-pregnancy BMI.");

    const midpoint = Math.round((range.minLb + range.maxLb) / 2);

    const interpretation =
      `Pre-pregnancy BMI ${bmi.n.toFixed(1)} kg/m² (${range.category}) — recommended total gestational weight gain ` +
      `${range.minLb}–${range.maxLb} lb (midpoint ~${midpoint} lb), with a 2nd/3rd-trimester rate of ` +
      `${range.rateMinLb.toFixed(1)}–${range.rateMaxLb.toFixed(1)} lb/week. ` +
      "Track serial weights and compare against the IOM range at each visit.";

    return {
      value: midpoint,
      unit: "lb (midpoint)",
      interpretation,
      status: "normal",
      referenceRange: `${range.minLb}–${range.maxLb} lb`,
    };
  },
};
