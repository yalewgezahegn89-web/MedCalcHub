import type { CalculatorDefinition } from "./calculator.types";

export const mapCalculator: CalculatorDefinition = {
  id: "map",

  slug: "map",

  name: "map",

  shortName: "map",

  description:
    "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "MAP = (SBP + 2 × DBP) / 3",

  normalRange: "70-100 mmHg",

  referenceRanges: [
  {
    label: "Critically low",
    range: "<59.1",
  },
  {
    label: "Low",
    range: "60–69",
  },
  {
    label: "Normal",
    range: "70–100",
  },
  {
    label: "Elevated",
    range: "101–119",
  },
  {
    label: "Hypertensive crisis",
    range: "≥120",
  }
],

  clinicalGuidance: {
    advice: [
      "MAP is a key indicator of organ perfusion.",
      "A MAP ≥ 65 mmHg is generally required to maintain adequate organ perfusion in adults."
    ],
    warnings: [
      "MAP should be interpreted in the context of the patient's clinical status.",
      "Intra-arterial measurement is more accurate than non-invasive estimation."
    ],
    followUp: [
      "If MAP is low, assess for hypovolemia, sepsis, or cardiogenic shock.",
      "Consider vasopressor therapy if MAP remains below target despite fluid resuscitation."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What does MAP measure?",
      "answer": "Mean Arterial Pressure represents the average arterial pressure during a cardiac cycle. It is a key indicator of organ perfusion."
    },
    {
      "question": "What is a normal MAP?",
      "answer": "A normal MAP is 70-100 mmHg. A MAP ≥ 65 mmHg is generally considered adequate for organ perfusion in adults."
    },
    {
      "question": "How is MAP calculated?",
      "answer": "MAP = (SBP + 2 × DBP) / 3, where SBP is systolic blood pressure and DBP is diastolic blood pressure."
    }
  ],

  comparison: {
    "title": "Hemodynamic Calculators",
    "calculators": [
      {
        "name": "Heart Rate",
        "href": "/calculators/heart-rate",
        "use": "Cardiac rate assessment"
      }
    ]
  },

  clinical: {
    "advice": [
      "MAP is a key indicator of organ perfusion.",
      "A MAP ≥ 65 mmHg is generally required to maintain adequate organ perfusion in adults."
    ],
    "warnings": [
      "MAP should be interpreted in the context of the patient's clinical status.",
      "Intra-arterial measurement is more accurate than non-invasive estimation."
    ],
    "followUp": [
      "If MAP is low, assess for hypovolemia, sepsis, or cardiogenic shock.",
      "Consider vasopressor therapy if MAP remains below target despite fluid resuscitation."
    ]
  },

  evidence: {
    "source": "Clinical Guidelines",
    "reference": "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock.",
    "references": [
      "Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021."
    ]
  },

  relatedCalculators: [
    "heart-rate"
  ],

  inputs: [
  {
    id: "sbp",
    label: "Systolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  },
  {
    id: "dbp",
    label: "Diastolic Blood Pressure",
    type: "number",
    unit: "mmHg",
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





const sbp =
    Number(values.sbp);

const dbp =
    Number(values.dbp);


  const result =
    (sbp + 2 * dbp) / 3;


  
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

if (false) {}


else if (result <= 59) {

  interpretation =
    "Critically low";

  status =
    "critical";

  referenceRange =
  "<59.1";
}


else if (result >= 60 && result <= 69) {

  interpretation =
    "Low";

  status =
    "low";

  referenceRange =
  "60–69";
}


else if (result >= 70 && result <= 100) {

  interpretation =
    "Normal";

  status =
    "normal";

  referenceRange =
  "70–100";
}


else if (result >= 101 && result <= 119) {

  interpretation =
    "Elevated";

  status =
    "high";

  referenceRange =
  "101–119";
}


else if (result >= 120) {

  interpretation =
    "Hypertensive crisis";

  status =
    "critical";

  referenceRange =
  "≥120";
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