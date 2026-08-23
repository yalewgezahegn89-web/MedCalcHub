import type { CalculatorDefinition } from "./calculator.types";

export const gcsCalculator: CalculatorDefinition = {
  id: "gcs",

  slug: "gcs",

  name: "gcs",

  shortName: "gcs",

  description:
    "Glasgow Coma Scale.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Glasgow Coma Scale", "Neurology", "Trauma", "Consciousness", "Emergency", "TBI"],

  formula: "Eye + Verbal + Motor",

  normalRange: "3–15",

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
    id: "eye",
    label: "Eye Opening",
    type: "select",
    required: true,
    options: [
      { label: "4 – Spontaneous", value: "4" },
      { label: "3 – To speech", value: "3" },
      { label: "2 – To pain", value: "2" },
      { label: "1 – None", value: "1" },
    ],
  },
  {
    id: "verbal",
    label: "Verbal Response",
    type: "select",
    required: true,
    options: [
      { label: "5 – Oriented", value: "5" },
      { label: "4 – Confused", value: "4" },
      { label: "3 – Inappropriate words", value: "3" },
      { label: "2 – Incomprehensible sounds", value: "2" },
      { label: "1 – None", value: "1" },
    ],
  },
  {
    id: "motor",
    label: "Motor Response",
    type: "select",
    required: true,
    options: [
      { label: "6 – Obeys commands", value: "6" },
      { label: "5 – Localizes to pain", value: "5" },
      { label: "4 – Withdraws to pain", value: "4" },
      { label: "3 – Abnormal flexion", value: "3" },
      { label: "2 – Abnormal extension", value: "2" },
      { label: "1 – None", value: "1" },
    ],
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.eye === "" ||
  values.eye === undefined
) {
  return {
    value: 0,
    interpretation: "Eye Opening is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.eye))
) {
  return {
    value: 0,
    interpretation: "Invalid Eye Opening.",
    status: "critical",
  };
}


if (Number(values.eye) < 0) {
  return {
    value: 0,
    interpretation: "Eye Opening cannot be negative.",
    status: "critical",
  };
}


if (Number(values.eye) === 0) {
  return {
    value: 0,
    interpretation: "Eye Opening cannot be zero.",
    status: "critical",
  };
}


if (
  values.verbal === "" ||
  values.verbal === undefined
) {
  return {
    value: 0,
    interpretation: "Verbal Response is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.verbal))
) {
  return {
    value: 0,
    interpretation: "Invalid Verbal Response.",
    status: "critical",
  };
}


if (Number(values.verbal) < 0) {
  return {
    value: 0,
    interpretation: "Verbal Response cannot be negative.",
    status: "critical",
  };
}


if (Number(values.verbal) === 0) {
  return {
    value: 0,
    interpretation: "Verbal Response cannot be zero.",
    status: "critical",
  };
}


if (
  values.motor === "" ||
  values.motor === undefined
) {
  return {
    value: 0,
    interpretation: "Motor Response is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.motor))
) {
  return {
    value: 0,
    interpretation: "Invalid Motor Response.",
    status: "critical",
  };
}


if (Number(values.motor) < 0) {
  return {
    value: 0,
    interpretation: "Motor Response cannot be negative.",
    status: "critical",
  };
}


if (Number(values.motor) === 0) {
  return {
    value: 0,
    interpretation: "Motor Response cannot be zero.",
    status: "critical",
  };
}



const eye = Number(values.eye);
const verbal = Number(values.verbal);
const motor = Number(values.motor);


  const result =
    eye + verbal + motor;


  
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

if (result >= 13) {

  interpretation =
    "GCS 13–15 – Mild brain injury";

  status =
    "normal";

  referenceRange =
  "13–15";
}

else if (result >= 9) {

  interpretation =
    "GCS 9–12 – Moderate brain injury";

  status =
    "high";

  referenceRange =
  "9–12";
}

else {

  interpretation =
    "GCS 3–8 – Severe brain injury";

  status =
    "critical";

  referenceRange =
  "3–8";
}




let guidanceAdvice: string;
let guidanceFollowUp: string[];

if (result >= 13) {
  guidanceAdvice =
    "A mild reduction in consciousness warrants attention to any fall from the patient's baseline; a declining trend can be more significant than the absolute score.";
  guidanceFollowUp = [
    "Repeat the GCS if the level of consciousness changes and reassess serially in any patient under observation after head injury.",
  ];
} else if (result >= 9) {
  guidanceAdvice =
    "Serial assessment is important: a falling GCS indicates deterioration and should prompt urgent re-evaluation of the underlying cause.";
  guidanceFollowUp = [
    "Reassess the GCS at regular intervals and immediately after any neurologic change; document each score to track trends.",
  ];
} else {
  guidanceAdvice =
    "Worsening scores indicate progressive impairment of consciousness and demand urgent reassessment; a GCS \u2264 8 is commonly used as a threshold for considering airway protection.";
  guidanceFollowUp = [
    "Monitor continuously with repeat GCS assessments, and reassess immediately after any intervention or change in neurologic status.",
  ];
}

return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,

  warnings: [
    "The GCS assesses the level of consciousness only; it does not by itself identify the underlying cause.",
    "Sedation, paralysis, intoxication, intubation, aphasia, language barriers, and other factors can confound scoring and lower the achievable score.",
    result < 9
      ? "A severely reduced GCS is an emergency finding and should prompt urgent clinical assessment."
      : "Interpret the score against the patient's baseline and clinical context rather than in isolation.",
  ],

  advice: [guidanceAdvice],

  followUp: guidanceFollowUp,
};
},

};