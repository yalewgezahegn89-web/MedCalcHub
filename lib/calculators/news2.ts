import type { CalculatorDefinition } from "./calculator.types";

export const news2Calculator: CalculatorDefinition = {
  id: "news2",

  slug: "news2",

  name: "news2",

  shortName: "news2",

  description:
    "National Early Warning Score 2 (NEWS2).",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "",

  normalRange: "0–20",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: [],

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
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.respiratory_rate === "" ||
  values.respiratory_rate === undefined
) {
  return {
    value: 0,
    interpretation: "Respiratory Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.respiratory_rate))
) {
  return {
    value: 0,
    interpretation: "Invalid Respiratory Rate.",
    status: "critical",
  };
}


if (Number(values.respiratory_rate) < 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(values.respiratory_rate) === 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be zero.",
    status: "critical",
  };
}


if (
  values.spo2 === "" ||
  values.spo2 === undefined
) {
  return {
    value: 0,
    interpretation: "SpO₂ is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.spo2))
) {
  return {
    value: 0,
    interpretation: "Invalid SpO₂.",
    status: "critical",
  };
}


if (Number(values.spo2) < 0) {
  return {
    value: 0,
    interpretation: "SpO₂ cannot be negative.",
    status: "critical",
  };
}


if (Number(values.spo2) === 0) {
  return {
    value: 0,
    interpretation: "SpO₂ cannot be zero.",
    status: "critical",
  };
}


if (
  values.temperature === "" ||
  values.temperature === undefined
) {
  return {
    value: 0,
    interpretation: "Temperature is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.temperature))
) {
  return {
    value: 0,
    interpretation: "Invalid Temperature.",
    status: "critical",
  };
}


if (Number(values.temperature) < 0) {
  return {
    value: 0,
    interpretation: "Temperature cannot be negative.",
    status: "critical",
  };
}


if (Number(values.temperature) === 0) {
  return {
    value: 0,
    interpretation: "Temperature cannot be zero.",
    status: "critical",
  };
}


if (
  values.sbp === "" ||
  values.sbp === undefined
) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sbp))
) {
  return {
    value: 0,
    interpretation: "Invalid Systolic Blood Pressure.",
    status: "critical",
  };
}


if (Number(values.sbp) < 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sbp) === 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be zero.",
    status: "critical",
  };
}


if (
  values.pulse === "" ||
  values.pulse === undefined
) {
  return {
    value: 0,
    interpretation: "Pulse is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.pulse))
) {
  return {
    value: 0,
    interpretation: "Invalid Pulse.",
    status: "critical",
  };
}


if (Number(values.pulse) < 0) {
  return {
    value: 0,
    interpretation: "Pulse cannot be negative.",
    status: "critical",
  };
}


if (Number(values.pulse) === 0) {
  return {
    value: 0,
    interpretation: "Pulse cannot be zero.",
    status: "critical",
  };
}



const respiratory_rate = Number(values.respiratory_rate);
const spo2 = Number(values.spo2);
const oxygenSaturation = spo2;
const temperature = Number(values.temperature);
const sbp = Number(values.sbp);
const systolicBloodPressure = sbp;
const pulse = Number(values.pulse);


  let score = 0;
  score += respiratory_rate;
  score += spo2;
  score += temperature;
  score += sbp;
  score += pulse;


  const result = score;


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};