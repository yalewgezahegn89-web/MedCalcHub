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

function nonNegative(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n < 0) return { err: `${label} cannot be negative.` };
  return { n };
}

function isYes(v: string | undefined): boolean {
  return v === "yes";
}

export const metabolicSyndromeAtp3Calculator: CalculatorDefinition = {
  id: "metabolic-syndrome-atp3",

  slug: "metabolic-syndrome-atp3",

  name: "Metabolic Syndrome (ATP III Criteria)",

  shortName: "Metabolic Syndrome",

  description:
    "Assesses metabolic syndrome using the updated NCEP ATP III criteria, which require at least 3 of 5 components: elevated waist circumference, elevated triglycerides (or treatment), reduced HDL (or treatment), elevated blood pressure (or treatment), and elevated fasting glucose (or treatment).",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Metabolic Syndrome",
    "ATP III",
    "NCEP",
    "Insulin Resistance",
    "Waist Circumference",
    "Triglycerides",
    "HDL",
    "Blood Pressure",
    "Fasting Glucose",
    "Endocrinology",
  ],

  formula:
    "Metabolic syndrome = ≥ 3 of 5 ATP III criteria (waist, triglycerides, HDL, blood pressure, fasting glucose, each with treatment exemption)",

  normalRange: "Present when ≥ 3 of 5 criteria are met (ATP III)",

  referenceRanges: [
    {
      label: "No metabolic syndrome",
      range: "0–2 criteria",
      context: "ATP III definition",
    },
    {
      label: "Metabolic syndrome",
      range: "≥ 3 criteria",
      context: "ATP III definition",
    },
  ],

  classification: [
    {
      label: "No metabolic syndrome",
      range: "0–2 criteria",
      max: 2,
      color: "green",
    },
    {
      label: "Metabolic syndrome",
      range: "≥ 3 criteria",
      min: 3,
      color: "red",
    },
  ],



  clinicalNotes:
    "The updated NCEP ATP III criteria (2005) define metabolic syndrome as the presence of at least three of five components: abdominal obesity (waist ≥ 102 cm men / ≥ 88 cm women, or BMI ≥ 30), triglycerides ≥ 150 mg/dL or drug treatment, HDL < 40 mg/dL men / < 50 mg/dL women or drug treatment, blood pressure ≥ 130/85 mmHg or drug treatment, and fasting glucose ≥ 100 mg/dL or drug treatment.",





  comparison: undefined,

  references: [
    "Grundy SM, et al. Circulation. 2005;112(17):2735-2752.",
    "Alberti KG, et al. Circulation. 2009;120(16):1640-1645.",
  ],

  relatedCalculators: [
    "total-cholesterol-hdl-ratio",
    "atherogenic-index-of-plasma",
    "apob-apoa1-ratio",
    "bmi",
  ],

  inputs: [
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
    {
      id: "waist",
      label: "Waist Circumference",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
    },
    {
      id: "triglycerides",
      label: "Triglycerides",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
    {
      id: "hdl",
      label: "HDL Cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
    {
      id: "sbp",
      label: "Systolic Blood Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 0,
    },
    {
      id: "dbp",
      label: "Diastolic Blood Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 0,
    },
    {
      id: "fastingGlucose",
      label: "Fasting Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
    {
      id: "lipidRx",
      label: "On drug treatment for dyslipidemia (triglycerides/HDL)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "bpRx",
      label: "On drug treatment for hypertension",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "glucoseRx",
      label: "On drug treatment for elevated glucose",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
  ],

  calculate(values: Record<string, string>) {
    const sex = values.sex;
    if (sex !== "male" && sex !== "female") return critical("Select a valid sex.");

    const waist = positive(values, "waist", "Waist circumference");
    if ("err" in waist) return critical(waist.err);
    const tg = nonNegative(values, "triglycerides", "Triglycerides");
    if ("err" in tg) return critical(tg.err);
    const hdl = nonNegative(values, "hdl", "HDL cholesterol");
    if ("err" in hdl) return critical(hdl.err);
    const sbp = nonNegative(values, "sbp", "Systolic blood pressure");
    if ("err" in sbp) return critical(sbp.err);
    const dbp = nonNegative(values, "dbp", "Diastolic blood pressure");
    if ("err" in dbp) return critical(dbp.err);
    const glucose = nonNegative(values, "fastingGlucose", "Fasting glucose");
    if ("err" in glucose) return critical(glucose.err);

    const criteria: string[] = [];

    const waistThreshold = sex === "male" ? 102 : 88;
    if (waist.n >= waistThreshold) {
      criteria.push(`Elevated waist circumference (${waist.n.toFixed(0)} cm ≥ ${waistThreshold} cm)`);
    }

    if (tg.n >= 150 || isYes(values.lipidRx)) {
      criteria.push(
        isYes(values.lipidRx)
          ? "Dyslipidemia drug treatment (counts as elevated triglycerides)"
          : `Elevated triglycerides (${tg.n.toFixed(0)} mg/dL ≥ 150)`,
      );
    }

    const hdlThreshold = sex === "male" ? 40 : 50;
    if (hdl.n < hdlThreshold || isYes(values.lipidRx)) {
      criteria.push(
        isYes(values.lipidRx)
          ? "Dyslipidemia drug treatment (counts as reduced HDL)"
          : `Reduced HDL (${hdl.n.toFixed(0)} mg/dL < ${hdlThreshold})`,
      );
    }

    if (sbp.n >= 130 || dbp.n >= 85 || isYes(values.bpRx)) {
      criteria.push(
        isYes(values.bpRx)
          ? "Antihypertensive drug treatment (counts as elevated BP)"
          : `Elevated blood pressure (${sbp.n.toFixed(0)}/${dbp.n.toFixed(0)} mmHg)`,
      );
    }

    if (glucose.n >= 100 || isYes(values.glucoseRx)) {
      criteria.push(
        isYes(values.glucoseRx)
          ? "Glucose-lowering drug treatment (counts as elevated glucose)"
          : `Elevated fasting glucose (${glucose.n.toFixed(0)} mg/dL ≥ 100)`,
      );
    }

    const count = criteria.length;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (count >= 3) {
      interpretation = `Metabolic syndrome present: ${count} of 5 ATP III criteria met.`;
      status = "critical";
      referenceRange = "≥3 criteria";
    } else {
      interpretation = `No metabolic syndrome: ${count} of 5 ATP III criteria met (requires ≥ 3).`;
      status = "normal";
      referenceRange = "0–2 criteria";
    }

    return {
      value: count,
      unit: "criteria met",
      interpretation,
      status,
      referenceRange,
      score: count,
      advice: criteria,
    };
  },
};
