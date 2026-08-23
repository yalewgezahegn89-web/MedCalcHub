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

type DisorderType = "acuteRespAcidosis" | "chronicRespAcidosis" | "acuteRespAlkalosis" | "chronicRespAlkalosis";

const disorderOptions: { label: string; value: DisorderType }[] = [
  { label: "Acute respiratory acidosis", value: "acuteRespAcidosis" },
  { label: "Chronic respiratory acidosis", value: "chronicRespAcidosis" },
  { label: "Acute respiratory alkalosis", value: "acuteRespAlkalosis" },
  { label: "Chronic respiratory alkalosis", value: "chronicRespAlkalosis" },
];

export const respiratoryCompensationCalculator: CalculatorDefinition = {
  id: "respiratory-compensation",

  slug: "respiratory-compensation",

  name: "Respiratory Compensation Calculator (Expected Bicarbonate)",

  shortName: "Respiratory Compensation",

  description:
    "Estimates the expected serum bicarbonate during acute or chronic respiratory acidosis and alkalosis using the Winters/Merck compensation rules, helping to identify whether a metabolic disturbance is appropriately compensated or a mixed disorder is present.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Respiratory Compensation",
    "Expected Bicarbonate",
    "Acid Base",
    "Acidosis",
    "Alkalosis",
    "PaCO2",
    "Bicarbonate",
    "Mixed Acid Base Disorder",
    "Compensation",
    "Internal Medicine",
  ],

  formula:
    "Expected HCO₃ = 24 + k × ((PaCO₂ − 40) ÷ 10), where k = 1 (acute respiratory acidosis), 4 (chronic), −2 (acute respiratory alkalosis), −5 (chronic)",

  normalRange: "Depends on the disorder type (see classification)",

  referenceRanges: [
    {
      label: "Acute respiratory acidosis",
      range: "+1 to +2 mEq/L HCO₃ per 10 mmHg PaCO₂",
      context: "Merck / classic rule",
    },
    {
      label: "Chronic respiratory acidosis",
      range: "+3 to +4 mEq/L HCO₃ per 10 mmHg PaCO₂",
      context: "Merck / classic rule",
    },
    {
      label: "Acute respiratory alkalosis",
      range: "−1 to −2 mEq/L HCO₃ per 10 mmHg PaCO₂",
      context: "Merck / classic rule",
    },
    {
      label: "Chronic respiratory alkalosis",
      range: "−4 to −5 mEq/L HCO₃ per 10 mmHg PaCO₂",
      context: "Merck / classic rule",
    },
  ],

  classification: [
    {
      label: "Appropriately compensated (or no metabolic disorder)",
      range: "within ±2",
      color: "green",
    },
    {
      label: "Possible mixed disorder",
      range: "outside ±2",
      color: "red",
    },
  ],



  clinicalNotes:
    "The compensation rules quantify the normal bicarbonate response to chronic alterations in PaCO₂. When the measured bicarbonate deviates beyond the expected range, a mixed acid–base disorder should be suspected.",





  comparison: undefined,

  references: [
    "Merck Manual Professional Version. Respiratory Acidosis and Alkalosis.",
    "Kraut JA, Madias NE. Approach to patients with acid-base disorders. Respir Care. 2001;46(4):392-403.",
  ],

  relatedCalculators: [
    "metabolic-alkalosis-compensation",
    "anion-gap",
    "serum-osmolality",
  ],

  inputs: [
    {
      id: "disorderType",
      label: "Disorder Type",
      type: "select",
      required: true,
      options: disorderOptions,
      defaultValue: "chronicRespAcidosis",
    },
    {
      id: "paCO2",
      label: "Arterial PaCO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 1,
    },
    {
      id: "measuredBicarbonate",
      label: "Measured Bicarbonate (HCO₃)",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const disorderType = values.disorderType as DisorderType | undefined;
    if (!disorderType || !disorderOptions.some((o) => o.value === disorderType)) {
      return critical("Select a valid disorder type.");
    }

    const paco2 = positive(values, "paCO2", "PaCO₂");
    if ("err" in paco2) return critical(paco2.err);
    const measuredHco3 = positive(values, "measuredBicarbonate", "Measured bicarbonate");
    if ("err" in measuredHco3) return critical(measuredHco3.err);

    const factor: Record<DisorderType, number> = {
      acuteRespAcidosis: 1,
      chronicRespAcidosis: 4,
      acuteRespAlkalosis: -2,
      chronicRespAlkalosis: -5,
    };

    const expectedHco3 = 24 + (factor[disorderType] * (paco2.n - 40)) / 10;
    const deviation = measuredHco3.n - expectedHco3;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (deviation >= -2 && deviation <= 2) {
      interpretation = `Expected HCO₃ = ${expectedHco3.toFixed(1)} mEq/L. The measured value (${measuredHco3.n.toFixed(1)}) is within ±2 mEq/L — appropriate metabolic compensation for the ${disorderOptions.find((o) => o.value === disorderType)?.label.toLowerCase()}.`;
      status = "normal";
      referenceRange = "within ±2";
    } else if (deviation < -2) {
      interpretation = `Expected HCO₃ = ${expectedHco3.toFixed(1)} mEq/L. The measured value (${measuredHco3.n.toFixed(1)}) is more than 2 mEq/L below expected — a concurrent metabolic acidosis may be present.`;
      status = "critical";
      referenceRange = "outside ±2";
    } else {
      interpretation = `Expected HCO₃ = ${expectedHco3.toFixed(1)} mEq/L. The measured value (${measuredHco3.n.toFixed(1)}) is more than 2 mEq/L above expected — a concurrent metabolic alkalosis may be present.`;
      status = "critical";
      referenceRange = "outside ±2";
    }

    return {
      value: Number(expectedHco3.toFixed(1)),
      unit: "mEq/L",
      interpretation,
      status,
      referenceRange,
      score: Number(deviation.toFixed(1)),
    };
  },
};
