import type { CalculatorDefinition } from "./calculator.types";

export const heartRateCalculator: CalculatorDefinition = {
  id: "heart-rate",

  slug: "heart-rate",

  name: "heart-rate",

  shortName: "heart-rate",

  description:
    "Calculates heart rate from the number of beats counted over a measured time interval.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Heart Rate", "Cardiology", "Cardiac", "Pulse", "Bradycardia", "Tachycardia", "Vital Signs"],

  formula: "beats / time",

  normalRange: "60-100 bpm",

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
    id: "beats",
    label: "Number of Beats",
    type: "number",
    unit: "beats",
    required: true,
  },
  {
    id: "time",
    label: "Time",
    type: "number",
    unit: "minutes",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.beats === "" ||
  values.beats === undefined
) {
  return {
    value: 0,
    interpretation: "Number of Beats is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.beats))
) {
  return {
    value: 0,
    interpretation: "Invalid Number of Beats.",
    status: "critical",
  };
}


if (Number(values.beats) < 0) {
  return {
    value: 0,
    interpretation: "Number of Beats cannot be negative.",
    status: "critical",
  };
}


if (Number(values.beats) === 0) {
  return {
    value: 0,
    interpretation: "Number of Beats cannot be zero.",
    status: "critical",
  };
}


if (
  values.time === "" ||
  values.time === undefined
) {
  return {
    value: 0,
    interpretation: "Time is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.time))
) {
  return {
    value: 0,
    interpretation: "Invalid Time.",
    status: "critical",
  };
}


if (Number(values.time) < 0) {
  return {
    value: 0,
    interpretation: "Time cannot be negative.",
    status: "critical",
  };
}


if (Number(values.time) === 0) {
  return {
    value: 0,
    interpretation: "Time cannot be zero.",
    status: "critical",
  };
}



const beats = Number(values.beats);
const time = Number(values.time);


  const result =
    beats / time;


  
const interpretation =
  "Heart rate " +
  Number(result.toFixed(2)) +
  " bpm.";

const status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

const referenceRange =
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