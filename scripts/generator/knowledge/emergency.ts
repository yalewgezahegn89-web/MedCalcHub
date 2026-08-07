import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const emergencyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  "qsofa": {
    category: "Emergency",
    specialty: "Emergency Medicine",
    description:
      "Quick Sequential Organ Failure Assessment (qSOFA) for identifying patients at high risk of poor outcomes from suspected infection.",
    formula: {
      type: "score",
    },
    normalRange:
      "0–3 points",
    keywords: [
      "qsofa",
      "sepsis",
      "infection",
      "emergency",
      "critical care",
    ],
    inputs: [
      {
        id: "sbp",
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
      {
        id: "respiratory-rate",
        label: "Respiratory Rate",
        type: "number",
        unit: "/min",
        required: true,
      },
      {
        id: "mental-status",
        label: "Altered Mental Status",
        type: "select",
        required: true,
      },
    ],
  },

  "news2": {
    category: "Emergency",
    specialty: "Emergency Medicine",
    description:
      "National Early Warning Score 2 (NEWS2).",
    formula: {
      type: "score",
    },
    normalRange:
      "0–20",
    keywords: [
      "news2",
      "early warning score",
      "deterioration",
      "emergency",
    ],
    inputs: [
      {
        id: "respiratory-rate",
        label: "Respiratory Rate",
        type: "number",
        unit: "/min",
        required: true,
      },
      {
        id: "spo2",
        label: "SpO₂",
        type: "number",
        unit: "%",
        required: true,
      },
      {
        id: "temperature",
        label: "Temperature",
        type: "number",
        unit: "°C",
        required: true,
      },
      {
        id: "sbp",
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
      {
        id: "pulse",
        label: "Pulse",
        type: "number",
        unit: "bpm",
        required: true,
      },
    ],
  },

  "shock-index": {
    category: "Emergency",
    specialty: "Emergency Medicine",
    description:
      "Calculates Shock Index from heart rate and systolic blood pressure.",
    formula:
      "Shock Index = Heart Rate / SBP",
    normalRange:
      "0.5–0.7",
    keywords: [
      "shock index",
      "shock",
      "trauma",
      "emergency",
    ],
    inputs: [
      {
        id: "heart-rate",
        label: "Heart Rate",
        type: "number",
        unit: "bpm",
        required: true,
      },
      {
        id: "sbp",
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
    ],
  },

  "gcs": {
    category: "Emergency",
    specialty: "Emergency Medicine",
    description:
      "Glasgow Coma Scale.",
    formula:
      "Eye + Verbal + Motor",
    normalRange:
      "3–15",
    keywords: [
      "gcs",
      "glasgow coma scale",
      "neurology",
      "trauma",
    ],
    inputs: [
      {
        id: "eye",
        label: "Eye Opening",
        type: "select",
        required: true,
      },
      {
        id: "verbal",
        label: "Verbal Response",
        type: "select",
        required: true,
      },
      {
        id: "motor",
        label: "Motor Response",
        type: "select",
        required: true,
      },
    ],
  },

  "curb-65": {
    category: "Emergency",
    specialty: "Emergency Medicine",
    description:
      "CURB-65 severity score for community-acquired pneumonia.",
    formula:
      "Confusion + Urea + Respiratory Rate + Blood Pressure + Age ≥65",
    normalRange:
      "0–5",
    keywords: [
      "curb65",
      "pneumonia",
      "cap",
      "severity",
    ],
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        required: true,
      },
      {
        id: "urea",
        label: "Urea",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "respiratory-rate",
        label: "Respiratory Rate",
        type: "number",
        unit: "/min",
        required: true,
      },
      {
        id: "sbp",
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
    ],
  },
};