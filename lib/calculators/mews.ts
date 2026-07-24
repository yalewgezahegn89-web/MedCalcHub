import type { CalculatorDefinition } from "./calculator.types";

export const mewsCalculator: CalculatorDefinition = {
  id: "mews",

  slug: "mews",

  name: "Modified Early Warning Score",

  shortName: "MEWS",

  description:
    "A bedside early warning score for detecting clinical deterioration in hospitalized patients.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "MEWS",
    "Early Warning",
    "Deterioration",
    "Emergency",
  ],

  warnings: [
    "MEWS is a screening score and should be interpreted alongside full clinical assessment.",
  ],

  formula: "MEWS = respiratory rate + heart rate + systolic BP + temperature + AVPU score",

  normalRange: "0–1 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–1",
    },
    {
      label: "Moderate risk",
      range: "2–3",
    },
    {
      label: "High risk",
      range: "4+",
    },
  ],

  clinicalNotes:
    "Higher MEWS scores indicate a greater likelihood of deterioration and need for more frequent monitoring.",

  references: [
    "Subbe CP, et al. Resuscitation. 2001.",
    "Early warning scores",
  ],

  inputs: [
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 8,
      max: 80,
      step: 1,
    },
    {
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 220,
      step: 1,
    },
    {
      id: "temperature",
      label: "Temperature",
      type: "number",
      unit: "°C",
      required: true,
      min: 30,
      max: 42,
      step: 0.1,
    },
    {
      id: "avpu",
      label: "AVPU response",
      type: "select",
      required: true,
      options: [
        { label: "Alert", value: "alert" },
        { label: "Voice", value: "voice" },
        { label: "Pain", value: "pain" },
        { label: "Unresponsive", value: "unresponsive" },
      ],
    },
  ],

  calculate(values) {
    const respiratoryRate = parseFloat(values.respiratoryRate);
    const heartRate = parseFloat(values.heartRate);
    const systolicBp = parseFloat(values.systolicBp);
    const temperature = parseFloat(values.temperature);
    const avpu = values.avpu;

    let score = 0;
    if (respiratoryRate >= 30) score += 3;
    else if (respiratoryRate >= 21) score += 2;
    else if (respiratoryRate >= 9) score += 0;
    else score += 2;

    if (heartRate >= 131) score += 3;
    else if (heartRate >= 111) score += 2;
    else if (heartRate >= 91) score += 1;
    else if (heartRate >= 51) score += 0;
    else score += 1;

    if (systolicBp >= 161) score += 2;
    else if (systolicBp >= 141) score += 1;
    else if (systolicBp >= 81) score += 0;
    else if (systolicBp >= 71) score += 1;
    else score += 3;

    if (temperature >= 39) score += 2;
    else if (temperature >= 35.1) score += 0;
    else score += 1;

    if (avpu !== "alert") score += 3;

    let interpretation = "Low risk of deterioration";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 4) {
      interpretation = "High risk of deterioration; escalate care";
      status = "critical";
    } else if (score >= 2) {
      interpretation = "Moderate risk; urgent review recommended";
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
