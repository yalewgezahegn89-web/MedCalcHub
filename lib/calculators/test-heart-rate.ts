import type {
  CalculatorDefinition,
} from "./calculator.types";


export const testHeartRateCalculator: CalculatorDefinition = {
  id: "test-heart-rate",

  slug: "test-heart-rate",

  name: "Test Heart Rate Calculator",

  shortName: "HR",

  description:
    "Calculates heart rate from number of beats and time duration.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-01",

  keywords: [
    "heart rate",
    "pulse",
    "bpm",
  ],

  formula:
    "HR = beats / time",

  normalRange:
    "60-100 bpm",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "American Heart Association",
  ],

  relatedCalculators: [],

  inputs: [
    {
      id: "beats",
      label: "Beats",
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
    },
  ],


  calculate(
    values: Record<string, string>,
  ) {
    const beats =
      Number(values.beats);

    const time =
      Number(values.time);


    if (
      !beats ||
      !time
    ) {
      return {
        value: "",
        interpretation:
          "Invalid input. Please enter valid beats and time.",
        status: "critical",
      };
    }


    const heartRate =
      beats / time;


    let status:
      | "normal"
      | "low"
      | "high" = "normal";


    if (heartRate < 60) {
      status = "low";
    }

    if (heartRate > 100) {
      status = "high";
    }


    return {
      value:
        heartRate.toFixed(1),

      interpretation:
        "Heart rate calculated in beats per minute.",

      status,
    };
  },
};