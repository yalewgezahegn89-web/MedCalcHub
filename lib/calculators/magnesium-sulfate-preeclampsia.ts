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
    "Estimates the total 24-hour magnesium sulfate dose for a selected IV regimen (loading dose + maintenance infusion) used for prevention and treatment of eclampsia in appropriate preeclampsia/eclampsia settings, consistent with ACOG Practice Bulletin No. 222 (2020) and WHO recommendations. Magnesium sulfate is a high-risk medication: regimen choice depends on clinical setting, route, renal function, monitoring capability, and clinician judgment.",
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
    "Selected total 24-h dose (g) = Loading dose (g IV) + Maintenance rate (g/h) × 24 h",

  normalRange:
    "Educational reference only: therapeutic serum magnesium for seizure prophylaxis is approximately 4.8–8.4 mg/dL (2–3.5 mEq/L). Toxicity features are typically associated with loss of patellar reflexes (~10 mg/dL), respiratory depression (~12 mg/dL), and cardiac arrest (~15–17 mg/dL). These are monitoring concepts, not a prescription target.",

  referenceRanges: [
    {
      label: "Typical therapeutic serum magnesium",
      range: "4.8–8.4 mg/dL",
      context: "seizure prophylaxis monitoring target (educational)",
    },
  ],

  classification: [],



  clinicalNotes:
    "Indication: magnesium sulfate is used for the prevention of eclampsia in appropriately selected women with preeclampsia (especially severe preeclampsia) and for the treatment of eclampsia. WHO (2011) recommends magnesium sulfate for prevention of eclampsia in severe preeclampsia and for treatment of eclampsia in preference to other anticonvulsants. Prevention of eclampsia is distinct from acute treatment of an eclamptic seizure; regimens for each setting may differ. This calculator supports an educational estimate of a selected IV regimen's 24-hour total; it is not a mandate for any specific regimen. Regimen choice depends on clinical setting and protocol, route, renal function, monitoring capability, and clinician judgment. Magnesium sulfate is a high-risk medication: administration requires clinical monitoring (patellar reflexes, respiratory rate, urine output, and serum magnesium where available) and is not a routine self-calculation tool. Calcium gluconate should be available to treat magnesium toxicity. This content is educational decision-support, not prescriptive.",




  comparison: undefined,

  references: [
    "WHO recommendations for prevention and treatment of pre-eclampsia and eclampsia. Geneva: World Health Organization; 2011.",
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
      `Selected IV regimen 24-hour total: ${total.toFixed(0)} g (loading dose ${load.n.toFixed(0)} g IV + maintenance ${maintenance.n.toFixed(1)} g/h × 24 h). ` +
      "Magnesium sulfate is a high-risk medication used for prevention of eclampsia in appropriate preeclampsia settings and for treatment of eclampsia; regimen, route, and duration depend on the clinical setting and protocol. " +
      "Monitor patellar reflexes, respiratory rate, urine output, and serum magnesium where available; have calcium gluconate available to treat magnesium toxicity. " +
      "This estimate is educational decision-support only and must be interpreted by the clinical team, not used as a self-calculation tool.";

    return {
      value: total,
      unit: "g / 24 h",
      interpretation,
      status: "normal",
      referenceRange: "serum Mg 4.8–8.4 mg/dL (educational monitoring target)",
      warnings: [
        "Magnesium sulfate requires clinical monitoring and is not a routine self-calculation tool.",
        "Regimen selection depends on clinical setting/protocol, route, renal function, monitoring capability, and clinician judgment.",
      ],
      advice: [
        "Monitor patellar reflexes, respiratory rate, urine output, and serum magnesium where available.",
        "Have calcium gluconate available for management of magnesium toxicity.",
      ],
    };
  },
};
