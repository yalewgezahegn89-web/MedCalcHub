import type { CalculatorDefinition } from "./calculator.types";

export const heartRateCalculator: CalculatorDefinition = {
  id: "heart-rate",

  slug: "heart-rate",

  name: "Heart Rate Calculator",

  shortName: "Heart Rate Calculator",

  description:
    "Calculates heart rate from the number of beats counted over a measured time interval.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-04",

  keywords: [],

  formula: "HR = beats / minutes",

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



for (
  const key of Object.keys(values)
) {

  const inputValue =
    Number(values[key]);


  if (
    values[key] === "" ||
    values[key] === undefined
  ) {

    return {

      value: 0,

      interpretation:
        "Required input missing.",

      status:
        "critical",

    };

  }


  if (
    Number.isNaN(inputValue)
  ) {

    return {

      value: 0,

      interpretation:
        "Invalid numeric input.",

      status:
        "critical",

    };

  }


  if (
    inputValue < 0
  ) {

    return {

      value: 0,

      interpretation:
        "Negative values are not allowed.",

      status:
        "critical",

    };

  }

}





const beats =
    Number(values.beats);

const time =
    Number(values.time);


  const result =
    beats / time;


  
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