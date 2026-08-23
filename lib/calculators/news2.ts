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
    id: "spo2-scale",
    label: "SpO₂ Scale",
    type: "select",
    required: true,
    options: [
      { label: "Scale 1 — Standard (target SpO₂ ≥ 94%)", value: "standard" },
      { label: "Scale 2 — Alternative (target SpO₂ 88–92% for chronic hypercapnic respiratory failure)", value: "alternative" },
    ],
    defaultValue: "standard",
  },
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
  values["spo2-scale"] === "" ||
  values["spo2-scale"] === undefined
) {
  return {
    value: 0,
    interpretation: "SpO\u2082 Scale is required.",
    status: "critical",
  };
}

const spo2Scale = values["spo2-scale"];

if (spo2Scale !== "standard" && spo2Scale !== "alternative") {
  return {
    value: 0,
    interpretation: "Invalid SpO\u2082 Scale selection.",
    status: "critical",
  };
}

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

// SpO2 Scale 1 - Standard (target SpO2 >= 94%)
function scoreSpo2Standard(v: number): number {
  if (v <= 91) return 3;
  if (v <= 93) return 2;
  if (v <= 95) return 1;
  return 0;
}

// SpO2 Scale 2 - Alternative (target SpO2 88-92% for chronic hypercapnic respiratory failure)
function scoreSpo2Alternative(v: number): number {
  if (v <= 83) return 3;
  if (v <= 85) return 2;
  if (v <= 87) return 1;
  if (v <= 92) return 0;
  if (v <= 94) return 1;
  if (v <= 96) return 2;
  return 3;
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
const spo2Score = spo2Scale === "alternative"
  ? scoreSpo2Alternative(spo2)
  : scoreSpo2Standard(spo2);
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

const scaleLabel = spo2Scale === "alternative"
  ? " (SpO\u2082 Scale 2)"
  : "";

if (result === 0) {
  interpretation =
    "NEWS2" + scaleLabel + " 0 \u2013 Low clinical risk.";
  status = "normal";
  referenceRange = "0";
} else if (result <= 4 && !singleParameterThree) {
  interpretation =
    "NEWS2" + scaleLabel + " " + result + " \u2013 Low-to-moderate risk.";
  status = "low";
  referenceRange = "1\u20134";
} else if (result <= 6) {
  interpretation =
    "NEWS2" + scaleLabel + " " + result + " \u2013 High risk.";
  status = "high";
  referenceRange = "5\u20136";
} else {
  interpretation =
    "NEWS2" + scaleLabel + " " + result + " \u2013 Very high risk.";
  status = "critical";
  referenceRange = "\u22657";
}

const baseWarnings = [
  "NEWS2 is a deterioration-monitoring score, not a diagnosis; it does not identify the underlying cause of acute illness.",
];

if (spo2Scale === "alternative") {
  baseWarnings.push(
    "SpO\u2082 Scale 2 is scored against a target range of 88\u201392% and is intended only for patients with confirmed chronic hypercapnic respiratory failure who are clinically designated for that target; do not apply Scale 2 routinely.",
  );
} else {
  baseWarnings.push(
    "SpO\u2082 is scored on Scale 1 (standard). For patients with confirmed chronic hypercapnic respiratory failure on an 88\u201392% target range, select SpO\u2082 Scale 2 instead.",
  );
}

let bandAdvice: string[];
let bandFollowUp: string[];

if (result === 0) {
  bandAdvice = [
    "Continue routine monitoring of vital signs and reassess with each set of observations.",
  ];
  bandFollowUp = [
    "Repeat NEWS2 at the monitoring frequency appropriate for the clinical setting and after any change in condition.",
  ];
} else if (result <= 4 && !singleParameterThree) {
  bandAdvice = [
    "Arrange review by a registered nurse or equivalent clinician and check that the observations were measured correctly.",
  ];
  bandFollowUp = [
    "Increase the observation frequency and repeat NEWS2 after any intervention or change in condition.",
  ];
} else if (result <= 6) {
  bandAdvice = [
    "Obtain urgent assessment by a clinician with competence in acute illness assessment and review the patient's management plan.",
  ];
  bandFollowUp = [
    "Repeat NEWS2 frequently and after every intervention; escalate further if the score rises or fails to fall as expected.",
  ];
} else {
  bandAdvice = [
    "Arrange emergency clinical assessment; continuous monitoring of vital signs should be considered while awaiting review.",
  ];
  bandFollowUp = [
    "Reassess NEWS2 continuously or after every intervention until the patient is stabilized, and involve critical-care teams according to local practice.",
  ];
}

const bandWarnings =
  singleParameterThree && result <= 6
    ? [
        ...baseWarnings,
        "A single parameter scoring 3 triggers the high-risk response even though the aggregate score is modest; do not defer escalation based on the total alone.",
      ]
    : baseWarnings;

return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,

  warnings: bandWarnings,

  advice: bandAdvice,

  followUp: bandFollowUp,
};
},

};