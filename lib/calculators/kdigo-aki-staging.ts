import type { CalculatorDefinition } from "./calculator.types";

export const kdigoAkiStagingCalculator: CalculatorDefinition = {
  id: "kdigo-aki-staging",

  slug: "kdigo-aki-staging",

  name: "KDIGO AKI Staging",

  shortName: "KDIGO AKI",

  description:
    "Classifies acute kidney injury (AKI) severity using the KDIGO 2012 criteria based on serum creatinine changes and urine output. The highest applicable stage is assigned when multiple criteria are met.",

  category: "Nephrology",

  specialty: "Nephrology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "AKI",
    "Acute Kidney Injury",
    "KDIGO",
    "Staging",
    "Creatinine",
    "Urine Output",
    "Nephrology",
    "Critical Care",
    "Renal",
  ],

  formula:
    "Stage 1: Cr rise ≥0.3 mg/dL within 48h OR 1.5–1.9× baseline within 7 days; UO <0.5 mL/kg/h for 6–12h. Stage 2: Cr 2.0–2.9× baseline; UO <0.5 mL/kg/h for ≥12h. Stage 3: Cr ≥3.0× baseline OR Cr ≥4.0 mg/dL OR initiation of RRT; UO <0.3 mL/kg/h for ≥24h OR anuria for ≥12h.",

  normalRange: "No AKI",

  referenceRanges: [
    {
      label: "No AKI",
      range: "None",
    },
    {
      label: "Stage 1",
      range: "Cr ≥0.3 mg/dL rise or 1.5–1.9× baseline; UO <0.5 mL/kg/h 6–12h",
    },
    {
      label: "Stage 2",
      range: "Cr 2.0–2.9× baseline; UO <0.5 mL/kg/h ≥12h",
    },
    {
      label: "Stage 3",
      range: "Cr ≥3.0× baseline or ≥4.0 mg/dL or RRT; UO <0.3 mL/kg/h ≥24h or anuria ≥12h",
    },
  ],



  clinicalNotes:
    "The KDIGO (Kidney Disease: Improving Global Outcomes) 2012 guidelines define AKI using serum creatinine and urine output criteria. AKI is staged 1–3 based on severity. The highest applicable stage from either criterion is assigned. KDIGO staging has replaced earlier RIFLE and AKIN criteria and is the current international standard for AKI classification.",





  comparison: {
    title: "AKI Classification Systems",
    calculators: [
      {
        name: "KDIGO AKI Staging",
        href: "/calculators/kdigo-aki-staging",
        bestFor: "Current international standard for AKI staging and severity classification.",
        limitation: "Does not distinguish prerenal vs. intrarenal vs. postrenal causes.",
      },
      {
        name: "CKD-EPI 2021",
        href: "/calculators/ckd-epi-2021",
        bestFor: "Estimating chronic GFR for CKD staging and monitoring.",
        limitation: "For chronic kidney disease, not acute kidney injury staging.",
      },
      {
        name: "FENa",
        href: "/calculators/fena",
        bestFor: "Differentiating prerenal azotemia from ATN in AKI.",
        limitation: "Does not stage AKI; assesses etiology of established AKI.",
      },
    ],
  },

  references: [
    "KDIGO Acute Kidney Injury Work Group. Kidney Int Suppl. 2012;2(1):1-138.",
    "Bellomo R, et al. Intensive Care Med. 2004;30(8):1417-1425.",
    "Mehta RL, et al. Crit Care. 2007;11(2):R31.",
  ],

  relatedCalculators: [
    "ckd-epi-2021",
    "fena",
    "feurea",
    "cockcroft-gault",
    "bun-creatinine-ratio",
  ],

  inputs: [
    {
      id: "baseline-creatinine",
      label: "Baseline Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: "Lowest creatinine in past 7 days, or estimated baseline if unknown.",
    },
    {
      id: "current-creatinine",
      label: "Current Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
    },
    {
      id: "weight",
      label: "Patient Weight",
      type: "number",
      unit: "kg",
      required: false,
      min: 0,
      max: 300,
      step: 0.1,
      helpText: "Required if assessing urine output criteria.",
    },
    {
      id: "urine-output-rate",
      label: "Urine Output Rate",
      type: "number",
      unit: "mL/kg/h",
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: "Average urine output rate over the assessment period.",
    },
    {
      id: "urine-output-duration",
      label: "Duration of Low Urine Output",
      type: "number",
      unit: "hours",
      required: false,
      min: 0,
      max: 168,
      step: 1,
      helpText: "How long urine output has been below threshold.",
    },
    {
      id: "on-rrt",
      label: "Currently on Renal Replacement Therapy",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values: Record<string, string>) {
    const rrtRaw = values["on-rrt"];
    if (rrtRaw === "" || rrtRaw === undefined) {
      return {
        value: 0,
        interpretation: "Renal Replacement Therapy status is required.",
        status: "critical" as const,
      };
    }
    const onRrt = rrtRaw === "yes";

    if (onRrt) {
      return {
        value: 3,
        interpretation:
          "KDIGO Stage 3 – Patient is on renal replacement therapy. This automatically classifies as Stage 3 AKI regardless of creatinine or urine output values.",
        status: "critical" as const,
        referenceRange: "Stage 3",
      };
    }

    let creatinineStage = 0;
    let urineStage = 0;
    let creatinineInfo = "";
    let urineInfo = "";

    const baselineRaw = values["baseline-creatinine"];
    const currentRaw = values["current-creatinine"];
    const hasBaseline = baselineRaw !== "" && baselineRaw !== undefined && !Number.isNaN(Number(baselineRaw));
    const hasCurrent = currentRaw !== "" && currentRaw !== undefined && !Number.isNaN(Number(currentRaw));

    if (hasBaseline && hasCurrent) {
      const baseline = Number(baselineRaw);
      const current = Number(currentRaw);

      if (baseline <= 0) {
        return {
          value: 0,
          interpretation: "Baseline creatinine must be greater than zero.",
          status: "critical" as const,
        };
      }
      if (current <= 0) {
        return {
          value: 0,
          interpretation: "Current creatinine must be greater than zero.",
          status: "critical" as const,
        };
      }

      const absoluteRise = current - baseline;
      const ratio = current / baseline;

      if (current >= 4.0) {
        creatinineStage = 3;
        creatinineInfo = `Current Cr ≥4.0 mg/dL (${current} mg/dL)`;
      } else if (ratio >= 3.0) {
        creatinineStage = 3;
        creatinineInfo = `Cr ≥3.0× baseline (ratio ${ratio.toFixed(1)})`;
      } else if (ratio >= 2.0) {
        creatinineStage = 2;
        creatinineInfo = `Cr 2.0–2.9× baseline (ratio ${ratio.toFixed(1)})`;
      } else if (absoluteRise >= 0.3) {
        creatinineStage = 1;
        creatinineInfo = `Cr rise ≥0.3 mg/dL (${absoluteRise.toFixed(2)} mg/dL)`;
      } else if (ratio >= 1.5) {
        creatinineStage = 1;
        creatinineInfo = `Cr 1.5–1.9× baseline (ratio ${ratio.toFixed(1)})`;
      } else {
        creatinineStage = 0;
        creatinineInfo = `No creatinine-based AKI (rise ${absoluteRise.toFixed(2)} mg/dL, ratio ${ratio.toFixed(1)})`;
      }
    } else if (hasCurrent) {
      const current = Number(currentRaw);
      if (current >= 4.0) {
        creatinineStage = 3;
        creatinineInfo = `Current Cr ≥4.0 mg/dL (${current} mg/dL) — no baseline available, staging based on absolute value`;
      } else {
        creatinineInfo = "Baseline creatinine not provided; creatinine staging requires both baseline and current values.";
      }
    } else {
      creatinineInfo = "Creatinine values not provided.";
    }

    const weightRaw = values.weight;
    const uoRateRaw = values["urine-output-rate"];
    const uoDurationRaw = values["urine-output-duration"];
    const hasWeight = weightRaw !== "" && weightRaw !== undefined && !Number.isNaN(Number(weightRaw));
    const hasUoRate = uoRateRaw !== "" && uoRateRaw !== undefined && !Number.isNaN(Number(uoRateRaw));
    const hasDuration = uoDurationRaw !== "" && uoDurationRaw !== undefined && !Number.isNaN(Number(uoDurationRaw));

    if (hasWeight && hasUoRate && hasDuration) {
      const weight = Number(weightRaw);
      const uoRate = Number(uoRateRaw);
      const duration = Number(uoDurationRaw);

      if (weight <= 0) {
        return {
          value: 0,
          interpretation: "Patient weight must be greater than zero.",
          status: "critical" as const,
        };
      }

      if (uoRate < 0.3 && duration >= 24) {
        urineStage = 3;
        urineInfo = `UO <0.3 mL/kg/h for ≥24h (rate ${uoRate} mL/kg/h for ${duration}h)`;
      } else if (uoRate < 0.3 && duration >= 12) {
        urineStage = 2;
        urineInfo = `UO <0.3 mL/kg/h for 12–24h (rate ${uoRate} mL/kg/h for ${duration}h)`;
      } else if (uoRate < 0.5 && duration >= 6) {
        if (duration >= 12) {
          urineStage = 2;
          urineInfo = `UO <0.5 mL/kg/h for ≥12h (rate ${uoRate} mL/kg/h for ${duration}h)`;
        } else {
          urineStage = 1;
          urineInfo = `UO <0.5 mL/kg/h for 6–12h (rate ${uoRate} mL/kg/h for ${duration}h)`;
        }
      } else {
        urineStage = 0;
        urineInfo = `No urine output-based AKI (rate ${uoRate} mL/kg/h for ${duration}h)`;
      }
    } else {
      urineInfo = "Urine output data incomplete; urine output staging requires weight, rate, and duration.";
    }

    const finalStage = Math.max(creatinineStage, urineStage);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    const stageDetails: string[] = [];
    if (creatinineInfo) stageDetails.push(`Creatinine: ${creatinineInfo}`);
    if (urineInfo) stageDetails.push(`Urine Output: ${urineInfo}`);

    switch (finalStage) {
      case 0:
        interpretation = `No AKI detected. ${stageDetails.join(". ")}.`;
        status = "normal";
        break;
      case 1:
        interpretation = `KDIGO Stage 1 AKI. ${stageDetails.join(". ")}. Monitor creatinine and urine output closely. Identify and treat reversible causes. Avoid nephrotoxins.`;
        status = "low";
        break;
      case 2:
        interpretation = `KDIGO Stage 2 AKI. ${stageDetails.join(". ")}. Consider urgent nephrology consultation. Perform renal ultrasound to exclude obstruction. Adjust renally cleared medications.`;
        status = "high";
        break;
      default:
        interpretation = `KDIGO Stage 3 AKI. ${stageDetails.join(". ")}. Consider nephrology consultation and possible renal replacement therapy. Manage hyperkalemia, metabolic acidosis, and fluid overload.`;
        status = "critical";
        break;
    }

    const referenceRange = "No AKI → Stage 3";

    return {
      value: Number(finalStage.toFixed(2)),
      interpretation,
      status,
      referenceRange,
    };
  },
};
