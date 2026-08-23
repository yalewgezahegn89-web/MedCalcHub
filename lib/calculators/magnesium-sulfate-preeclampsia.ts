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

export const magnesiumSulfatePreeclampsiaCalculator: CalculatorDefinition = {
  id: "magnesium-sulfate-preeclampsia",

  slug: "magnesium-sulfate-preeclampsia",

  name: "Magnesium Sulfate Dosing (Preeclampsia/Eclampsia)",

  shortName: "MgSO4",

  description:
    "Calculates the total 24-hour magnesium sulfate dose for seizure prophylaxis in preeclampsia with severe features or eclampsia using standard intravenous regimens (ACOG 2020): a 4–6 g IV loading dose over 20–30 minutes followed by a 1–2 g/hour maintenance infusion.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Magnesium Sulfate",
    "MgSO4",
    "Preeclampsia",
    "Eclampsia",
    "Seizure Prophylaxis",
    "Zuspan",
    "Pritchard",
    "Anticonvulsant",
    "Pregnancy",
    "Obstetrics",
  ],

  formula:
    "Total 24-h dose (g) = Loading dose (4–6 g IV) + Maintenance (1–2 g/h) × 24 h",

  normalRange:
    "Therapeutic serum magnesium target is 4.8–8.4 mg/dL (2–3.5 mEq/L); toxicity: loss of patellar reflexes ~ 10 mg/dL, respiratory depression ~ 12 mg/dL, cardiac arrest ~ 15–17 mg/dL.",

  referenceRanges: [
    {
      label: "Therapeutic",
      range: "4.8–8.4 mg/dL",
      context: "serum magnesium target",
    },
  ],

  classification: [],



  clinicalNotes:
    "Magnesium sulfate is the drug of choice for seizure prophylaxis in preeclampsia with severe features and for eclampsia. ACOG (PB 222, 2020) recommends an initial IV loading dose of 4–6 g over 20–30 minutes, followed by a maintenance infusion of 1–2 g/h (typically 2 g/h) for 24 hours. The Zuspan regimen (4 g IV + 2 g/h) and Pritchard regimen (4 g IV + 10 g IM, then 5 g IM every 4 h) are classic alternatives. This calculator sums the total 24-hour dose for the selected IV load and maintenance rate.",




  comparison: undefined,

  references: [
    "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
    "Zuspan FP. Clin Obstet Gynecol. 1966;9(4):954-972.",
    "Pritchard JA. Surg Gynecol Obstet. 1955;100(2):131-140.",
  ],

  relatedCalculators: [
    "preeclampsia-criteria",
    "hellp-syndrome",
    "ebl-obstetric",
  ],

  inputs: [
    {
      id: "loadingDose",
      label: "IV Loading Dose",
      type: "select",
      required: true,
      options: [
        { label: "4 g IV over 20–30 min", value: "4" },
        { label: "5 g IV over 20–30 min", value: "5" },
        { label: "6 g IV over 20–30 min", value: "6" },
      ],
      defaultValue: "4",
    },
    {
      id: "maintenance",
      label: "Maintenance Infusion Rate",
      type: "select",
      required: true,
      options: [
        { label: "1 g/h", value: "1" },
        { label: "2 g/h", value: "2" },
      ],
      defaultValue: "2",
    },
  ],

  calculate(values: Record<string, string>) {
    const load = selectOption(values, "loadingDose", "IV loading dose", [
      "4",
      "5",
      "6",
    ]);
    if ("err" in load) return critical(load.err);
    const maintenance = selectOption(values, "maintenance", "Maintenance rate", [
      "1",
      "2",
    ]);
    if ("err" in maintenance) return critical(maintenance.err);

    const total = load.n + maintenance.n * 24;

    const interpretation =
      `Total 24-hour magnesium sulfate dose: ${total.toFixed(0)} g (loading dose ${load.n.toFixed(0)} g IV + maintenance ${maintenance.n.toFixed(1)} g/h × 24 h). ` +
      "Therapeutic serum magnesium is 4.8–8.4 mg/dL. Monitor patellar reflexes, respiratory rate, urine output, and serum magnesium; for respiratory depression stop the infusion and give 10% calcium gluconate IV. Continue for 24 h postpartum (or after the last seizure) per protocol.";

    return {
      value: total,
      unit: "g / 24 h",
      interpretation,
      status: "normal",
      referenceRange: "serum Mg 4.8–8.4 mg/dL",
    };
  },
};
