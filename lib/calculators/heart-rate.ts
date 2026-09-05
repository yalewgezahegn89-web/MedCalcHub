import type { CalculatorDefinition } from "./calculator.types";

export const heartRateCalculator: CalculatorDefinition = {
  id: "heart-rate",

  slug: "heart-rate",

  name: "Heart Rate",

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



  clinicalNotes:
    "This calculator converts a counted number of beats over a measured time interval into a heart rate in beats per minute (bpm). The formula is heart rate = beats counted \u00F7 time (minutes).\n\nFor most adults, a normal resting heart rate is 60\u2013100 bpm. Well-trained athletes may have resting heart rates below 60 bpm without pathology. Heart rate is influenced by physical fitness, medications (e.g., beta-blockers, calcium channel blockers), emotional state, fever, dehydration, anemia, thyroid function, and pain.\n\nA resting heart rate consistently below 60 bpm (bradycardia) or above 100 bpm (tachycardia) warrants clinical assessment to identify the underlying cause. Heart rate alone does not determine the rhythm; an irregular rate may require electrocardiography (ECG) for further evaluation.\n\nThis calculator provides a rate measurement only. It does not diagnose bradycardia, tachycardia, or any cardiac rhythm abnormality. Always interpret the result alongside the patient\u2019s clinical context, symptoms, and other vital signs.",





  comparison: undefined,

  references: [
    "American Heart Association. All About Heart Rate (Pulse). https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    "Al-Khatib SM, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death. Circulation. 2018;138(12):e471-e508.",
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


const rate = Number(result.toFixed(2));

let interpretation: string;
let status: "normal" | "low" | "high" | "critical";

if (rate < 60) {
  interpretation =
    "Heart rate " + rate + " bpm — bradycardia (below normal resting range).";
  status = "low";
} else if (rate <= 100) {
  interpretation =
    "Heart rate " + rate + " bpm — within normal resting range.";
  status = "normal";
} else {
  interpretation =
    "Heart rate " + rate + " bpm — tachycardia (above normal resting range).";
  status = "high";
}




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,
};
},

};