import type { CalculatorDefinition } from "./calculator.types";

export const shockClassCalculator: CalculatorDefinition = {
  id: "shock-class",

  slug: "shock-class",

  name: "Shock Class",

  shortName: "Shock",

  description:
    "Classifies hemorrhagic shock severity based on clinical signs and hemodynamics.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Shock",
    "Hemorrhagic Shock",
    "Resuscitation",
    "Cardiology",
  ],

  warnings: [
    "Shock class is a clinical severity classification and should be used together with full resuscitation assessment.",
  ],

  formula: "Shock class = blood loss + heart rate + blood pressure + mental status + urine output",

  normalRange: "Class I",

  referenceRanges: [
    {
      label: "Class I",
      range: "<15% blood loss",
    },
    {
      label: "Class II",
      range: "15–30% blood loss",
    },
    {
      label: "Class III",
      range: "30–40% blood loss",
    },
    {
      label: "Class IV",
      range: ">40% blood loss",
    },
  ],

  clinicalNotes:
    "Higher shock classes indicate greater severity of hemorrhagic shock and poorer perfusion.",

  references: [
    "ATLS trauma guidelines",
    "Hemorrhagic shock classification",
  ],

  inputs: [
    {
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 220,
      step: 1,
    },
    {
      id: "mentalStatus",
      label: "Mental status",
      type: "select",
      required: true,
      options: [
        { label: "Normal", value: "normal" },
        { label: "Anxious", value: "anxious" },
        { label: "Confused", value: "confused" },
        { label: "Lethargic", value: "lethargic" },
      ],
    },
    {
      id: "urineOutput",
      label: "Urine output",
      type: "number",
      unit: "mL/hr",
      required: true,
      min: 0,
      max: 400,
      step: 10,
    },
  ],

  calculate(values) {
    const heartRate = parseFloat(values.heartRate);
    const systolicBp = parseFloat(values.systolicBp);
    const mentalStatus = values.mentalStatus;
    const urineOutput = parseFloat(values.urineOutput);

    let classNumber = 1;
    let interpretation = "Class I: Minimal shock";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (heartRate > 120 || systolicBp < 90 || mentalStatus === "confused" || urineOutput < 30) {
      classNumber = 4;
      interpretation = "Class IV: Severe shock";
      status = "critical";
    } else if (heartRate > 100 || systolicBp < 100 || mentalStatus === "anxious" || urineOutput < 60) {
      classNumber = 3;
      interpretation = "Class III: Moderate shock";
      status = "high";
    } else if (heartRate > 80 || mentalStatus === "anxious" || urineOutput < 80) {
      classNumber = 2;
      interpretation = "Class II: Mild shock";
      status = "high";
    }

    return {
      value: classNumber,
      unit: "class",
      interpretation,
      status,
    };
  },
};
