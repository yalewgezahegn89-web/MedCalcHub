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

<<<<<<< HEAD
  updatedAt: "2026-08-05",
=======
  updatedAt: "2026-08-06",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  keywords: [],

  formula: "beats / time",

  normalRange: "60-100 bpm",

  referenceRanges: [
  {
    label: "Bradycardia",
    range: "<49.1",
  },
  {
    label: "Normal",
    range: "50–99",
  },
  {
    label: "Tachycardia",
    range: "100–149",
  },
  {
    label: "Severe tachycardia",
    range: "≥150",
  }
],

  clinicalGuidance: {
    advice: [
      "Heart rate is a fundamental vital sign reflecting cardiac function.",
      "Tachycardia may indicate fever, pain, hypovolemia, thyrotoxicosis, or arrhythmia."
    ],
    warnings: [
      "Heart rate alone does not determine cardiac output; also assess blood pressure and perfusion.",
      "Bradycardia may be physiological in athletes."
    ],
    followUp: [
      "If abnormal, consider ECG monitoring and further cardiac evaluation.",
      "Assess for reversible causes such as medications, electrolyte abnormalities, or hypoxia."
    ],
  },

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

  faq: [
    {
      "question": "What is a normal heart rate?",
      "answer": "A normal resting heart rate for adults is 60-100 beats per minute."
    },
    {
      "question": "What does an elevated heart rate indicate?",
      "answer": "Tachycardia (HR > 100 bpm) may indicate fever, pain, dehydration, thyroid dysfunction, or cardiac arrhythmia."
    }
  ],

  comparison: {
    "title": "Vital Signs Calculators",
    "calculators": [
      {
        "name": "Mean Arterial Pressure",
        "href": "/calculators/map",
        "use": "Organ perfusion assessment"
      }
    ]
  },

  clinical: {
    "advice": [
      "Heart rate is a fundamental vital sign reflecting cardiac function.",
      "Tachycardia may indicate fever, pain, hypovolemia, thyrotoxicosis, or arrhythmia."
    ],
    "warnings": [
      "Heart rate alone does not determine cardiac output; also assess blood pressure and perfusion.",
      "Bradycardia may be physiological in athletes."
    ],
    "followUp": [
      "If abnormal, consider ECG monitoring and further cardiac evaluation.",
      "Assess for reversible causes such as medications, electrolyte abnormalities, or hypoxia."
    ]
  },

  evidence: {
    "source": "Clinical Guidelines",
    "reference": "AHA/ACC Guidelines for the Management of Patients with Supraventricular Arrhythmias.",
    "references": [
      "Page RL, et al. 2015 ACC/AHA/APHRS Guideline for the Management of Adult Patients with Supraventricular Tachycardia. Circulation. 2016."
    ]
  },

  relatedCalculators: [
    "map"
  ],

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


<<<<<<< HEAD

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

=======
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
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
}



<<<<<<< HEAD


const beats =
    Number(values.beats);

const time =
    Number(values.time);
=======
const beats = Number(values.beats);
const time = Number(values.time);
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1


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

<<<<<<< HEAD
if (false) {}


else if (result <= 49) {

  interpretation =
    "Bradycardia";

  status =
    "low";

  referenceRange =
  "<49.1";
}


else if (result >= 50 && result <= 99) {

  interpretation =
    "Normal";

  status =
    "normal";

  referenceRange =
  "50–99";
}


else if (result >= 100 && result <= 149) {

  interpretation =
    "Tachycardia";

  status =
    "high";

  referenceRange =
  "100–149";
}


else if (result >= 150) {

  interpretation =
    "Severe tachycardia";

  status =
    "critical";

  referenceRange =
  "≥150";
}


=======
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1



return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};