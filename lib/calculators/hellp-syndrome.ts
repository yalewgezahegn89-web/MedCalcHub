import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function positive(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n <= 0) return { err: `${label} must be a positive number.` };
  return { n };
}

function isYes(value: string | undefined) {
  return value === "yes";
}

export const hellpSyndromeCalculator: CalculatorDefinition = {
  id: "hellp-syndrome",

  slug: "hellp-syndrome",

  name: "HELLP Syndrome Criteria (Tennessee)",

  shortName: "HELLP",

  description:
    "Assesses the HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets) using the Tennessee (Sibai) diagnostic criteria: hemolysis (LDH ≥ 600 U/L or schistocytes/low haptoglobin), AST ≥ 70 U/L, and platelets < 100,000/µL. HELLP is a severe form of preeclampsia with substantial maternal and fetal risk.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "HELLP",
    "HELLP Syndrome",
    "Hemolysis",
    "Elevated Liver Enzymes",
    "Low Platelets",
    "Preeclampsia",
    "Tennessee Criteria",
    "Sibai",
    "Obstetrics",
    "Pregnancy",
  ],

  formula:
    "HELLP criteria: Hemolysis (LDH ≥ 600 U/L OR schistocytes/low haptoglobin) + Liver enzymes (AST ≥ 70 U/L) + Low platelets (< 100,000/µL); complete HELLP = all three present",

  normalRange:
    "Complete HELLP: all 3 criteria present; partial HELLP: 1–2 criteria present.",

  referenceRanges: [
    {
      label: "None",
      range: "0 criteria",
      context: "no HELLP features",
    },
    {
      label: "Partial HELLP",
      range: "1–2 criteria",
      context: "features present, not all",
    },
    {
      label: "Complete HELLP",
      range: "3 criteria",
      context: "all Tennessee criteria met",
    },
  ],

  classification: [
    {
      label: "None",
      range: "0 criteria",
      max: 0,
      color: "green",
    },
    {
      label: "Partial HELLP",
      range: "1–2 criteria",
      min: 1,
      max: 2,
      color: "yellow",
    },
    {
      label: "Complete HELLP",
      range: "3 criteria",
      min: 3,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Tennessee (Sibai) criteria define HELLP syndrome as hemolysis (abnormal peripheral smear with schistocytes, low haptoglobin, LDH ≥ 600 U/L, or total bilirubin > 1.2 mg/dL), elevated liver enzymes (AST ≥ 70 U/L), and low platelets (< 100,000/µL). Complete HELLP requires all three; patients with only some features are often labeled partial or atypical HELLP and managed similarly.",




  comparison: undefined,

  references: [
    "Sibai BM, et al. Am J Obstet Gynecol. 1993;169(4):1000-1006.",
    "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
  ],

  relatedCalculators: [
    "preeclampsia-criteria",
    "magnesium-sulfate-preeclampsia",
    "ebl-obstetric",
    "gestational-weight-gain",
  ],

  inputs: [
    {
      id: "platelets",
      label: "Platelets",
      type: "number",
      unit: "×10³/µL",
      required: true,
      min: 0,
      helpText: "Platelet count (e.g., 95 for 95,000/µL).",
    },
    {
      id: "ast",
      label: "AST",
      type: "number",
      unit: "U/L",
      required: true,
      min: 0,
    },
    {
      id: "ldh",
      label: "LDH",
      type: "number",
      unit: "U/L",
      required: true,
      min: 0,
    },
    {
      id: "hemolysis",
      label: "Hemolysis evidence on smear (schistocytes) or low haptoglobin",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Abnormal peripheral smear with schistocytes or low haptoglobin.",
    },
  ],

  calculate(values: Record<string, string>) {
    const platelets = positive(values, "platelets", "Platelets");
    if ("err" in platelets) return critical(platelets.err);
    const ast = positive(values, "ast", "AST");
    if ("err" in ast) return critical(ast.err);
    const ldh = positive(values, "ldh", "LDH");
    if ("err" in ldh) return critical(ldh.err);
    const hemolysisSelect = values.hemolysis;
    if (hemolysisSelect !== "yes" && hemolysisSelect !== "no") {
      return critical("Hemolysis evidence selection is required.");
    }

    const hemolysis =
      ldh.n >= 600 || isYes(values.hemolysis);
    const liverEnzymes = ast.n >= 70;
    const lowPlatelets = platelets.n < 100;

    const criteria: string[] = [];
    if (hemolysis) {
      criteria.push(
        `Hemolysis (LDH ${ldh.n.toFixed(0)} U/L${ldh.n >= 600 ? " ≥ 600" : ""}${
          isYes(values.hemolysis) ? "; schistocytes/low haptoglobin" : ""
        })`,
      );
    }
    if (liverEnzymes) {
      criteria.push(`Elevated liver enzymes (AST ${ast.n.toFixed(0)} U/L ≥ 70)`);
    }
    if (lowPlatelets) {
      criteria.push(
        `Low platelets (${platelets.n.toFixed(0)} ×10³/µL < 100)`,
      );
    }

    const count = criteria.length;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (count >= 3) {
      interpretation =
        "COMPLETE HELLP syndrome — all three Tennessee criteria are met. " +
        "This is a severe obstetric emergency; arrange urgent delivery and multidisciplinary management.";
      status = "critical";
      referenceRange = "3 criteria";
    } else if (count >= 1) {
      interpretation =
        `PARTIAL (${count}/3) HELLP features present — ${
          criteria.join("; ") || "no criteria"
        }. ` +
        "HELLP syndrome cannot be excluded; manage as a hypertensive disorder of pregnancy with close monitoring and delivery planning.";
      status = "high";
      referenceRange = "1–2 criteria";
    } else {
      interpretation =
        "No HELLP criteria met. If preeclampsia is suspected, continue standard management and monitoring.";
      status = "normal";
      referenceRange = "0 criteria";
    }

    return {
      value: count,
      unit: "criteria met",
      interpretation,
      status,
      referenceRange,
      score: count,
      advice: criteria,
    };
  },
};
