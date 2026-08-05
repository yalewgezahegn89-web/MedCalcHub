import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const cardiologyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  map: {
    category: "Cardiology",
    specialty: "Emergency Medicine",
    description:
      "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",
    formula:
      "MAP = (SBP + 2 × DBP) / 3",
    normalRange:
      "70-100 mmHg",
    clinicalGuidance: {
      advice: [
        "MAP is a key indicator of organ perfusion.",
        "A MAP ≥ 65 mmHg is generally required to maintain adequate organ perfusion in adults.",
      ],
      warnings: [
        "MAP should be interpreted in the context of the patient's clinical status.",
        "Intra-arterial measurement is more accurate than non-invasive estimation.",
      ],
      followUp: [
        "If MAP is low, assess for hypovolemia, sepsis, or cardiogenic shock.",
        "Consider vasopressor therapy if MAP remains below target despite fluid resuscitation.",
      ],
    },
    classification: [
      { max: 59, label: "Critically low", status: "critical" },
      { min: 60, max: 69, label: "Low", status: "low" },
      { min: 70, max: 100, label: "Normal", status: "normal" },
      { min: 101, max: 119, label: "Elevated", status: "high" },
      { min: 120, label: "Hypertensive crisis", status: "critical" },
    ],
    relatedCalculators: [
      "heart-rate",
    ],
    faq: [
      {
        question: "What does MAP measure?",
        answer: "Mean Arterial Pressure represents the average arterial pressure during a cardiac cycle. It is a key indicator of organ perfusion.",
      },
      {
        question: "What is a normal MAP?",
        answer: "A normal MAP is 70-100 mmHg. A MAP ≥ 65 mmHg is generally considered adequate for organ perfusion in adults.",
      },
      {
        question: "How is MAP calculated?",
        answer: "MAP = (SBP + 2 × DBP) / 3, where SBP is systolic blood pressure and DBP is diastolic blood pressure.",
      },
    ],
    comparison: {
      title: "Hemodynamic Calculators",
      calculators: [
        { name: "Heart Rate", href: "/calculators/heart-rate", use: "Cardiac rate assessment" },
      ],
    },
    evidence: {
      source: "Clinical Guidelines",
      reference: "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock.",
      references: [
        "Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021.",
      ],
    },
    keywords: [
      "map",
      "mean arterial pressure",
      "blood pressure",
      "sbp",
      "dbp",
      "hemodynamics",
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
      },
    ],
  },

  "heart-rate": {
    category: "Cardiology",
    specialty: "Emergency Medicine",
    description:
      "Calculates heart rate from the number of beats counted over a measured time interval.",
    formula:
      "HR = beats / minutes",
    normalRange:
      "60-100 bpm",
    clinicalGuidance: {
      advice: [
        "Heart rate is a fundamental vital sign reflecting cardiac function.",
        "Tachycardia may indicate fever, pain, hypovolemia, thyrotoxicosis, or arrhythmia.",
      ],
      warnings: [
        "Heart rate alone does not determine cardiac output; also assess blood pressure and perfusion.",
        "Bradycardia may be physiological in athletes.",
      ],
      followUp: [
        "If abnormal, consider ECG monitoring and further cardiac evaluation.",
        "Assess for reversible causes such as medications, electrolyte abnormalities, or hypoxia.",
      ],
    },
    classification: [
      { max: 49, label: "Bradycardia", status: "low" },
      { min: 50, max: 99, label: "Normal", status: "normal" },
      { min: 100, max: 149, label: "Tachycardia", status: "high" },
      { min: 150, label: "Severe tachycardia", status: "critical" },
    ],
    relatedCalculators: [
      "map",
    ],
    faq: [
      {
        question: "What is a normal heart rate?",
        answer: "A normal resting heart rate for adults is 60-100 beats per minute.",
      },
      {
        question: "What does an elevated heart rate indicate?",
        answer: "Tachycardia (HR > 100 bpm) may indicate fever, pain, dehydration, thyroid dysfunction, or cardiac arrhythmia.",
      },
    ],
    comparison: {
      title: "Vital Signs Calculators",
      calculators: [
        { name: "Mean Arterial Pressure", href: "/calculators/map", use: "Organ perfusion assessment" },
      ],
    },
    evidence: {
      source: "Clinical Guidelines",
      reference: "AHA/ACC Guidelines for the Management of Patients with Supraventricular Arrhythmias.",
      references: [
        "Page RL, et al. 2015 ACC/AHA/APHRS Guideline for the Management of Adult Patients with Supraventricular Tachycardia. Circulation. 2016.",
      ],
    },
    keywords: [
      "heart rate",
      "pulse",
      "bpm",
      "cardiology",
      "vital signs",
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
      },
    ],
  },
};
