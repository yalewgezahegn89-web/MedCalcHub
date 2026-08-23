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

export const biophysicalProfileCalculator: CalculatorDefinition = {
  id: "biophysical-profile",

  slug: "biophysical-profile",

  name: "Biophysical Profile (BPP)",

  shortName: "BPP",

  description:
    "Scores fetal well-being (Manning 1980) from five components — fetal breathing, gross body movement, fetal tone, amniotic fluid volume, and (in the full BPP) a non-stress test — each scored 0 or 2 for a total of 0–10. Higher scores indicate reassuring fetal status; lower scores identify fetuses at risk who warrant delivery planning.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Biophysical Profile",
    "BPP",
    "Fetal Well-Being",
    "Fetal Breathing",
    "Fetal Movement",
    "Fetal Tone",
    "Amniotic Fluid",
    "Non-Stress Test",
    "Antepartum Testing",
    "Obstetrics",
  ],

  formula:
    "BPP = Breathing (0/2) + Movement (0/2) + Tone (0/2) + Amniotic fluid volume (0/2) + NST (0/2) → total 0–10",

  normalRange:
    "8–10 normal; 6 equivocal (repeat within 24 hours); ≤ 4 abnormal (concerning, delivery planning).",

  referenceRanges: [
    {
      label: "Normal",
      range: "8–10",
      context: "reassuring",
    },
    {
      label: "Equivocal",
      range: "6",
      context: "repeat in 24 h",
    },
    {
      label: "Abnormal",
      range: "0–4",
      context: "concerning; delivery planning",
    },
  ],

  classification: [
    {
      label: "Normal",
      range: "8–10",
      min: 8,
      max: 10,
      color: "green",
    },
    {
      label: "Equivocal",
      range: "6",
      min: 6,
      max: 6,
      color: "yellow",
    },
    {
      label: "Abnormal",
      range: "0–4",
      min: 0,
      max: 4,
      color: "red",
    },
  ],



  clinicalNotes:
    "The biophysical profile (Manning 1980) combines acute markers of fetal well-being (breathing, movement, tone, NST) with a chronic marker (amniotic fluid volume). Each component is scored 2 (normal) or 0 (absent/abnormal), summing to 10. A score of 8–10 is reassuring, 6 is equivocal (repeat in 24 hours), and ≤ 4 is abnormal.",




  comparison: undefined,

  references: [
    "Manning FA, et al. Am J Obstet Gynecol. 1981;140(3):289-294.",
    "ACOG Practice Bulletin No. 145: Antepartum fetal surveillance. Obstet Gynecol. 2014;124(1):182-201.",
  ],

  relatedCalculators: [
    "gestational-age",
    "bishop-score",
    "hadlock-efw",
    "preeclampsia-criteria",
  ],

  inputs: [
    {
      id: "breathing",
      label: "Fetal Breathing",
      type: "select",
      required: true,
      options: [
        { label: "Absent (0)", value: "0" },
        { label: "Present ≥ 1 episode ≥ 30 s in 30 min (2)", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "movement",
      label: "Gross Body Movement",
      type: "select",
      required: true,
      options: [
        { label: "Absent (0)", value: "0" },
        { label: "Present ≥ 3 movements in 30 min (2)", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "tone",
      label: "Fetal Tone",
      type: "select",
      required: true,
      options: [
        { label: "Absent or poor (0)", value: "0" },
        {
          label: "Present ≥ 1 episode of flexion/extension (2)",
          value: "2",
        },
      ],
      defaultValue: "2",
    },
    {
      id: "amnioticFluid",
      label: "Amniotic Fluid Volume",
      type: "select",
      required: true,
      options: [
        { label: "Reduced: SDP < 2 cm (0)", value: "0" },
        { label: "Normal: SDP ≥ 2 cm (2)", value: "2" },
      ],
      defaultValue: "2",
      helpText: "Single deepest pocket (SDP) measured on ultrasound.",
    },
    {
      id: "nst",
      label: "Non-Stress Test (NST)",
      type: "select",
      required: true,
      options: [
        { label: "Nonreactive (0)", value: "0" },
        { label: "Reactive (2)", value: "2" },
      ],
      defaultValue: "2",
    },
  ],

  calculate(values: Record<string, string>) {
    const breathing = selectOption(values, "breathing", "Fetal breathing", [
      "0",
      "2",
    ]);
    if ("err" in breathing) return critical(breathing.err);
    const movement = selectOption(values, "movement", "Fetal movement", [
      "0",
      "2",
    ]);
    if ("err" in movement) return critical(movement.err);
    const tone = selectOption(values, "tone", "Fetal tone", ["0", "2"]);
    if ("err" in tone) return critical(tone.err);
    const fluid = selectOption(values, "amnioticFluid", "Amniotic fluid volume", [
      "0",
      "2",
    ]);
    if ("err" in fluid) return critical(fluid.err);
    const nst = selectOption(values, "nst", "Non-stress test", ["0", "2"]);
    if ("err" in nst) return critical(nst.err);

    const score = breathing.n + movement.n + tone.n + fluid.n + nst.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (score >= 8) {
      interpretation =
        `BPP ${score}/10 — NORMAL, reassuring fetal status. ` +
        "All or most components are reassuring; continue routine obstetric care and periodic surveillance as indicated.";
      status = "normal";
      referenceRange = "8–10";
    } else if (score === 6) {
      interpretation =
        `BPP ${score}/10 — EQUIVOCAL. ` +
        "Repeat the BPP within 24 hours; management depends on the indication for testing, gestational age, and which component was abnormal.";
      status = "high";
      referenceRange = "6";
    } else {
      interpretation =
        `BPP ${score}/10 — ABNORMAL, concerning fetal status. ` +
        "Notify the obstetric provider; delivery planning is typically indicated, especially with reduced amniotic fluid.";
      status = "critical";
      referenceRange = "0–4";
    }

    return {
      value: score,
      unit: "/10",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
