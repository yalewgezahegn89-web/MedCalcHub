import type { CalculatorDefinition } from "./calculator.types";

export const news2Calculator: CalculatorDefinition = {
  id: "news2",

  slug: "news2",

  name: "NEWS2",

  shortName: "NEWS2",

  description:
    "National Early Warning Score 2 for detecting clinical deterioration.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "NEWS2",
    "Early Warning",
    "Deterioration",
    "Emergency",
  ],

  warnings: [
    "NEWS2 is a screening tool; clinical assessment is still required.",
  ],

  formula: "NEWS2 = sum of respiratory rate, oxygen saturation, temperature, systolic BP, heart rate, and consciousness points",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–4",
    },
    {
      label: "Medium risk",
      range: "5–6",
    },
    {
      label: "High risk",
      range: "7+",
    },
  ],

  clinicalNotes:
    "A higher NEWS2 score indicates greater likelihood of deterioration and need for urgent review.",

  references: [
    "Royal College of Physicians",
    "NEWS2 guidance",
  ],

  inputs: [
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 8,
      max: 60,
      step: 1,
    },
    {
      id: "oxygenSaturation",
      label: "Oxygen Saturation",
      type: "number",
      unit: "%",
      required: true,
      min: 70,
      max: 100,
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
      id: "pulse",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
    {
      id: "consciousness",
      label: "Consciousness",
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
    const oxygenSaturation = parseFloat(values.oxygenSaturation);
    const temperature = parseFloat(values.temperature);
    const systolicBp = parseFloat(values.systolicBp);
    const pulse = parseFloat(values.pulse);
    const consciousness = values.consciousness;

    const scores = [
      respiratoryRate < 9 ? 3 : respiratoryRate <= 11 ? 1 : respiratoryRate <= 20 ? 0 : respiratoryRate <= 24 ? 1 : 2,
      oxygenSaturation < 91 ? 3 : oxygenSaturation <= 93 ? 2 : oxygenSaturation <= 95 ? 1 : 0,
      temperature < 35 ? 3 : temperature <= 36 ? 1 : temperature <= 38 ? 0 : temperature <= 39 ? 1 : 2,
      systolicBp < 91 ? 3 : systolicBp <= 100 ? 2 : systolicBp <= 110 ? 1 : 0,
      pulse < 41 ? 3 : pulse <= 50 ? 1 : pulse <= 90 ? 0 : pulse <= 110 ? 1 : pulse <= 130 ? 2 : 3,
      consciousness === "alert" ? 0 : consciousness === "voice" ? 3 : consciousness === "pain" ? 3 : 3,
    ];

    const score = scores.reduce((sum, item) => sum + item, 0);

    let interpretation = "Low risk of deterioration";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 7) {
      interpretation = "High risk of clinical deterioration";
      status = "critical";
    } else if (score >= 5) {
      interpretation = "Medium risk; urgent review recommended";
      status = "high";
    } else if (score > 0) {
      interpretation = "Low risk with some abnormal vitals";
      status = "low";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
