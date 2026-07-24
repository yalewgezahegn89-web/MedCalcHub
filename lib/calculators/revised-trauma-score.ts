import type { CalculatorDefinition } from "./calculator.types";

export const revisedTraumaScoreCalculator: CalculatorDefinition = {
  id: "revised-trauma-score",

  slug: "revised-trauma-score",

  name: "Revised Trauma Score",

  shortName: "RTS",

  description:
    "Predicts mortality risk in trauma patients using respiratory rate, systolic blood pressure, and Glasgow Coma Scale.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Revised Trauma Score",
    "RTS",
    "Trauma",
    "Emergency",
  ],

  warnings: [
    "The Revised Trauma Score is a triage and prognostic tool and should be used alongside clinical assessment.",
  ],

  formula: "RTS = 0.9368 × GCS + 0.7326 × SBP + 0.2908 × RR",

  normalRange: "7.84–12.0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "7.84–12",
    },
    {
      label: "Moderate risk",
      range: "4–7.83",
    },
    {
      label: "High risk",
      range: "0–3.99",
    },
  ],

  clinicalNotes:
    "Lower revised trauma scores are associated with greater trauma severity and higher mortality risk.",

  references: [
    "Champion HR, et al. J Trauma. 1989.",
    "Trauma scoring systems",
  ],

  inputs: [
    {
      id: "gcs",
      label: "Glasgow Coma Scale",
      type: "number",
      required: true,
      min: 3,
      max: 15,
      step: 1,
    },
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 0,
      max: 300,
      step: 1,
    },
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 0,
      max: 60,
      step: 1,
    },
  ],

  calculate(values) {
    const gcs = parseFloat(values.gcs);
    const systolicBp = parseFloat(values.systolicBp);
    const respiratoryRate = parseFloat(values.respiratoryRate);

    const gcsScore = gcs >= 13 ? 4 : gcs >= 9 ? 3 : gcs >= 6 ? 2 : gcs > 4 ? 1 : 0;
    const sbpScore = systolicBp >= 90 ? 4 : systolicBp >= 70 ? 3 : systolicBp >= 50 ? 2 : systolicBp > 0 ? 1 : 0;
    const rrScore = respiratoryRate >= 10 && respiratoryRate <= 29 ? 4 : respiratoryRate >= 30 ? 3 : respiratoryRate >= 6 ? 2 : respiratoryRate > 0 ? 1 : 0;

    const score = Number((0.9368 * gcsScore + 0.7326 * sbpScore + 0.2908 * rrScore).toFixed(2));

    let interpretation = "Low trauma severity";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score < 4) {
      interpretation = "High mortality risk and severe trauma";
      status = "critical";
    } else if (score < 7.84) {
      interpretation = "Moderate trauma severity; monitor closely";
      status = "high";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
