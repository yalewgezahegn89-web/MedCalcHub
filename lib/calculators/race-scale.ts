import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function selectOption(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { n: Number(v) };
}

export const raceScaleCalculator: CalculatorDefinition = {
  id: "race-scale",

  slug: "race-scale",

  name: "RACE Scale",

  shortName: "RACE Scale",

  description:
    "The RACE (Rapid Arterial oCclusion Evaluation) scale is a prehospital tool that scores 5 items — facial palsy, arm motor, leg motor, gaze deviation, and aphasia/agnosia — on a 0–9 scale. A score of 5 or more suggests a large vessel occlusion stroke.",

  category: "Neurology",

  specialty: "Neurology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "RACE Scale",
    "RACE",
    "Rapid Arterial oCclusion Evaluation",
    "Large vessel occlusion",
    "LVO",
    "Stroke",
    "Prehospital",
    "EMS",
    "Thrombectomy",
    "Neurology",
  ],

  formula:
    "RACE = Facial palsy (0–2) + Arm motor (0–2) + Leg motor (0–2) + Gaze deviation (0–1) + Aphasia or agnosia (0–2) → total 0–9",

  normalRange:
    "0–9; score ≥ 5 suggests large vessel occlusion (sensitivity 0.85, specificity 0.68) and supports transport to an endovascular-capable center.",

  referenceRanges: [
    {
      label: "LVO unlikely",
      range: "0–4",
      context: "Lower probability of large vessel occlusion",
    },
    {
      label: "LVO suspected",
      range: "5–9",
      context: "Suggestive of large vessel occlusion — activate endovascular pathway",
    },
  ],

  classification: [
    {
      label: "LVO unlikely",
      range: "0–4",
      min: 0,
      max: 4,
      color: "green",
    },
    {
      label: "LVO suspected",
      range: "5–9",
      min: 5,
      max: 9,
      color: "red",
    },
  ],



  clinicalNotes:
    "The RACE scale was developed and validated by Pérez de la Ossa and colleagues (Stroke 2014) specifically for prehospital identification of large vessel occlusion (LVO) in acute ischemic stroke. It scores facial palsy, arm and leg motor function, gaze deviation, and the presence of aphasia or neglect/agnosia, giving a total of 0–9. A cut-off of 5 yielded a sensitivity of 0.85 and specificity of 0.68 for LVO, enabling earlier activation of endovascular stroke pathways.",




  comparison: {
    title: "Acute stroke screening scales",
    calculators: [
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Detailed quantification of stroke severity",
        bestFor: "In-hospital severity and treatment decision-making",
      },
      {
        name: "ABCD2 Score",
        href: "/calculators/abcd2-score",
        use: "Short-term stroke risk after TIA",
        bestFor: "TIA risk stratification, not acute LVO detection",
      },
    ],
  },

  references: [
    "Pérez de la Ossa N, Carrera D, Gorchs M, et al. Design and validation of a prehospital scale to predict stroke severity: the RACE scale. Stroke. 2014;45(9):2678-2684.",
    "Carrera D, Gorchs M, Querol M, et al. Revalidation of the RACE scale after its regional implementation in Catalonia: a triage tool for large vessel occlusion. J Neurointerv Surg. 2019;11(8):751-756.",
  ],

  relatedCalculators: [
    "nihss",
    "abcd2-score",
    "esrs",
    "modified-rankin-scale",
  ],

  inputs: [
    {
      id: "facialPalsy",
      label: "Facial Palsy",
      type: "select",
      required: true,
      options: [
        { label: "0 — Absent", value: "0" },
        { label: "1 — Mild", value: "1" },
        { label: "2 — Moderate to severe", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "armMotor",
      label: "Arm Motor (left side)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal", value: "0" },
        { label: "1 — Mild weakness", value: "1" },
        { label: "2 — Moderate to severe weakness", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "legMotor",
      label: "Leg Motor (left side)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal", value: "0" },
        { label: "1 — Mild weakness", value: "1" },
        { label: "2 — Moderate to severe weakness", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "gaze",
      label: "Gaze Deviation",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal", value: "0" },
        { label: "1 — Deviation to the right or left", value: "1" },
      ],
      defaultValue: "0",
    },
    {
      id: "aphasiaAgnosia",
      label: "Aphasia or Agnosia",
      type: "select",
      required: true,
      options: [
        { label: "0 — Performs both tasks (name object; identify own arm)", value: "0" },
        { label: "1 — Performs one task correctly", value: "1" },
        { label: "2 — Performs neither task", value: "2" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const facialPalsy = selectOption(values, "facialPalsy", "Facial palsy", ["0", "1", "2"]);
    if ("err" in facialPalsy) return critical(facialPalsy.err);
    const armMotor = selectOption(values, "armMotor", "Arm motor", ["0", "1", "2"]);
    if ("err" in armMotor) return critical(armMotor.err);
    const legMotor = selectOption(values, "legMotor", "Leg motor", ["0", "1", "2"]);
    if ("err" in legMotor) return critical(legMotor.err);
    const gaze = selectOption(values, "gaze", "Gaze deviation", ["0", "1"]);
    if ("err" in gaze) return critical(gaze.err);
    const aphasiaAgnosia = selectOption(values, "aphasiaAgnosia", "Aphasia or agnosia", ["0", "1", "2"]);
    if ("err" in aphasiaAgnosia) return critical(aphasiaAgnosia.err);

    const score = facialPalsy.n + armMotor.n + legMotor.n + gaze.n + aphasiaAgnosia.n;

    if (score < 5) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `RACE ${score}/9 — below the LVO threshold. ` +
          "Large vessel occlusion is less likely (sensitivity 0.85 at ≥ 5); continue standard stroke pathway and rapid transport.",
        status: "normal",
        referenceRange: "0–4",
        score,
      };
    }

    return {
      value: score,
      unit: "/9",
      interpretation:
        `RACE ${score}/9 — LARGE VESSEL OCCLUSION SUSPECTED. ` +
        "Score ≥ 5 suggests a large vessel occlusion; consider direct transport to an endovascular-capable stroke center and activate the stroke pathway.",
      status: "critical",
      referenceRange: "5–9",
      score,
    };
  },
};
