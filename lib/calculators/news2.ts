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

  keywords: ["NEWS2", "National Early Warning Score", "Deterioration", "Vital Signs", "Emergency", "Critical Care"],

  formula:
    "Aggregate of RR, SpO₂, temperature, SBP and pulse sub-scores (0–15)",

  normalRange: "0–15",

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
  values["respiratory-rate"] === "" ||
  values["respiratory-rate"] === undefined
) {
  return {
    value: 0,
    interpretation: "Respiratory Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values["respiratory-rate"]))
) {
  return {
    value: 0,
    interpretation: "Invalid Respiratory Rate.",
    status: "critical",
  };
}


if (Number(values["respiratory-rate"]) < 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(values["respiratory-rate"]) === 0) {
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



const respiratoryRate = Number(values["respiratory-rate"]);
const spo2 = Number(values.spo2);
const temperature = Number(values.temperature);
const sbp = Number(values.sbp);
const pulse = Number(values.pulse);

// NEWS2 physiological sub-scores (Royal College of Physicians, 2017)
function scoreRespiratoryRate(v: number): number {
  if (v <= 8) return 3;
  if (v <= 11) return 1;
  if (v <= 20) return 0;
  if (v <= 24) return 2;
  return 3;
}

function scoreSpo2(v: number): number {
  if (v <= 91) return 3;
  if (v <= 93) return 2;
  if (v <= 95) return 1;
  return 0;
}

function scoreTemperature(v: number): number {
  if (v <= 35) return 3;
  if (v <= 36) return 1;
  if (v <= 38) return 0;
  if (v <= 39) return 1;
  return 2;
}

function scoreSbp(v: number): number {
  if (v <= 90) return 3;
  if (v <= 100) return 2;
  if (v <= 110) return 1;
  if (v <= 219) return 0;
  return 3;
}

function scorePulse(v: number): number {
  if (v <= 40) return 3;
  if (v <= 50) return 1;
  if (v <= 90) return 0;
  if (v <= 110) return 1;
  if (v <= 130) return 2;
  return 3;
}

const respiratoryRateScore = scoreRespiratoryRate(respiratoryRate);
const spo2Score = scoreSpo2(spo2);
const temperatureScore = scoreTemperature(temperature);
const sbpScore = scoreSbp(sbp);
const pulseScore = scorePulse(pulse);

const score =
  respiratoryRateScore +
  spo2Score +
  temperatureScore +
  sbpScore +
  pulseScore;

const result = Math.min(score, 15);

// Any single parameter scoring 3 triggers the high-risk response
const singleParameterThree =
  respiratoryRateScore === 3 ||
  spo2Score === 3 ||
  temperatureScore === 3 ||
  sbpScore === 3 ||
  pulseScore === 3;

let interpretation: string;
let status:
  "normal" |
  "low" |
  "high" |
  "critical";
let referenceRange = "";

if (result === 0) {
  interpretation =
    "NEWS2 0 – Low clinical risk.";
  status = "normal";
  referenceRange = "0";
} else if (result <= 4 && !singleParameterThree) {
  interpretation =
    "NEWS2 " + result + " – Low-to-moderate risk.";
  status = "low";
  referenceRange = "1–4";
} else if (result <= 6) {
  interpretation =
    "NEWS2 " + result + " – High risk.";
  status = "high";
  referenceRange = "5–6";
} else {
  interpretation =
    "NEWS2 " + result + " – Very high risk.";
  status = "critical";
  referenceRange = "≥7";
}




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};