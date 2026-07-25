import type { CalculatorDefinition } from "./calculator.types";

export const pneumoniaSeverityIndexCalculator: CalculatorDefinition = {
  id: "pneumonia-severity-index",

  slug: "pneumonia-severity-index",

  name: "Pneumonia Severity Index",

  shortName: "PSI / PORT",

  description:
    "Predicts mortality risk and guides disposition for adults with community-acquired pneumonia.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "PSI",
    "PORT Score",
    "Pneumonia",
    "CAP",
    "Community Acquired Pneumonia",
  ],

  warnings: [
    "Validated only for adults with community-acquired pneumonia.",
    "Not intended for hospital-acquired or ventilator-associated pneumonia.",
  ],

  formula:
    "Total score is calculated by summing demographic, comorbidity, physical examination, and laboratory variables.",

  clinicalNotes:
    "The Pneumonia Severity Index stratifies patients into five mortality risk classes and helps determine outpatient versus inpatient management.",

  references: [
    "Fine MJ et al. N Engl J Med. 1997.",
    "IDSA/ATS Community-Acquired Pneumonia Guidelines.",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
      step: 1,
    },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
    },
    {
      id: "nursingHome",
      label: "Nursing Home Resident",
      type: "select",
      required: true,
      options: [
        {
          label: "No",
          value: "0",
        },
        {
          label: "Yes",
          value: "10",
        },
      ],
    },
    {
      id: "neoplasm",
      label: "Neoplastic Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "30" },
      ],
    },
    {
      id: "liverDisease",
      label: "Liver Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "heartFailure",
      label: "Congestive Heart Failure",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },    {
      id: "cerebrovascularDisease",
      label: "Cerebrovascular Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "renalDisease",
      label: "Renal Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "mentalStatus",
      label: "Altered Mental Status",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "respRate",
      label: "Respiratory Rate ≥30/min",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "sbp",
      label: "Systolic BP <90 mmHg",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "temperature",
      label: "Temperature <35°C or ≥40°C",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "15" },
      ],
    },
    {
      id: "pulse",
      label: "Pulse ≥125/min",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "ph",
      label: "Arterial pH <7.35",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "30" },
      ],
    },
    {
      id: "bun",
      label: "BUN ≥30 mg/dL",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "sodium",
      label: "Sodium <130 mmol/L",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "20" },
      ],
    },
    {
      id: "glucose",
      label: "Glucose ≥250 mg/dL",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "hematocrit",
      label: "Hematocrit <30%",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "oxygen",
      label: "PaO₂ <60 mmHg or SpO₂ <90%",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
    {
      id: "pleuralEffusion",
      label: "Pleural Effusion",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "10" },
      ],
    },
  ],

  calculate(values) {    let score =
      parseFloat(values.age);

    if (values.sex === "female") {
      score -= 10;
    }

    score += parseFloat(values.nursingHome);
    score += parseFloat(values.neoplasm);
    score += parseFloat(values.liverDisease);
    score += parseFloat(values.heartFailure);
    score += parseFloat(values.cerebrovascularDisease);
    score += parseFloat(values.renalDisease);
    score += parseFloat(values.mentalStatus);
    score += parseFloat(values.respRate);
    score += parseFloat(values.sbp);
    score += parseFloat(values.temperature);
    score += parseFloat(values.pulse);
    score += parseFloat(values.ph);
    score += parseFloat(values.bun);
    score += parseFloat(values.sodium);
    score += parseFloat(values.glucose);
    score += parseFloat(values.hematocrit);
    score += parseFloat(values.oxygen);
    score += parseFloat(values.pleuralEffusion);

    const total = Math.round(score);

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (total <= 50) {
      interpretation =
        "Risk Class I–II: Low mortality. Outpatient treatment is usually appropriate.";
      status = "normal";
    } else if (total <= 70) {
      interpretation =
        "Risk Class III: Low mortality. Brief observation or short hospitalization may be appropriate.";
      status = "high";
    } else if (total <= 90) {
      interpretation =
        "Risk Class IV: Moderate mortality. Hospital admission is recommended.";
      status = "high";
    } else if (total <= 130) {
      interpretation =
        "Risk Class IV: High mortality. Inpatient treatment is recommended.";
      status = "critical";
    } else {
      interpretation =
        "Risk Class V: Very high mortality. Hospitalization with consideration for ICU-level care is recommended.";
      status = "critical";
    }

    return {
      value: total,
      interpretation,
      status,
    }; 
  },
};