/**
 * Sprint 1.8 — Clinical Content Registry
 *
 * Parallel registry mapping calculator slugs to extended clinical content.
 * This registry is independent of CalculatorDefinition and calculate().
 */

import type { ClinicalContent } from "./clinical-content.types";

/**
 * Clinical content registry keyed by calculator slug.
 * Each entry contains extended educational/clinical content
 * that supplements (but does not replace) the calculator definition.
 */
export const clinicalContentRegistry: Record<
  string,
  ClinicalContent
> = {
  "anion-gap": {
    clinicalPurpose:
      "Calculates the serum anion gap to help differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).",
    howToUse: [
      "Measure serum sodium, chloride, and bicarbonate from the same blood draw.",
      "Enter each value in the appropriate field.",
      "Review the calculated anion gap and its interpretation.",
      "If serum albumin is low, also use the Albumin-Corrected Anion Gap calculator.",
    ],
    interpretation: {
      guide:
        "An anion gap of 8–12 mmol/L is normal. Values above 12 mmol/L in the context of metabolic acidosis suggest HAGMA. Values below 7 mmol/L may indicate hypoalbuminemia or laboratory error.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of metabolic acidosis",
      "Suspected toxic ingestion (methanol, ethylene glycol)",
      "Diabetic ketoacidosis workup",
      "Lactic acidosis evaluation",
      "Critically ill patients with acid-base disorders",
    ],
    whenNotToUse: [
      "As a standalone diagnostic tool without clinical context",
      "When serum albumin is significantly low without correction",
    ],
    limitations: [
      "Does not account for hypoalbuminemia — use the corrected anion gap when albumin is low.",
      "Hypernatremia, hypokalemia, hypercalcemia, and hypermagnesemia can artifactually elevate the anion gap.",
      "Lithium, bromide, and iodide can cause spurious elevation.",
      "Not reliable in isolation; must interpret with ABG, electrolytes, and clinical context.",
    ],
    example: {
      description:
        "A 54-year-old man with known diabetes presents with Kussmaul breathing. Sodium is 140 mmol/L, chloride is 105 mmol/L, bicarbonate is 12 mmol/L.",
      inputs: {
        sodium: "140",
        chloride: "105",
        bicarbonate: "12",
      },
      expectedResult:
        "Anion gap = 140 − (105 + 12) = 23 mmol/L. This is markedly elevated and suggests a high anion gap metabolic acidosis, likely diabetic ketoacidosis.",
    },
    clinicalSignificance:
      "The anion gap is a fundamental tool in acid-base interpretation. An elevated anion gap in the setting of metabolic acidosis indicates accumulation of unmeasured anions and requires urgent investigation of the underlying cause.",
    references: [
      {
        citation:
          "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.",
        level: "Expert Review",
      },
      {
        citation:
          "Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.",
        level: "Textbook",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment. Always interpret laboratory values in the context of the individual patient's clinical presentation.",
  },

  "ckd-epi-2021": {
    clinicalPurpose:
      "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation, which removed the race variable.",
    howToUse: [
      "Enter the patient's age, sex, and serum creatinine (mg/dL).",
      "Use the most recent stable creatinine value.",
      "Review the eGFR and CKD stage.",
      "Repeat testing after 3 months to confirm chronicity before diagnosing CKD.",
    ],
    interpretation: {
      guide:
        "eGFR ≥90 is normal (G1). 60–89 is mildly decreased (G2). 45–59 is mild-to-moderate decrease (G3a). 30–44 is moderate-to-severe decrease (G3b). 15–29 is severely decreased (G4). <15 indicates kidney failure (G5).",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Routine estimation of kidney function",
      "CKD staging per KDIGO guidelines",
      "Monitoring progressive kidney disease",
      "Initial kidney function assessment",
    ],
    whenNotToUse: [
      "Medication dosing without checking drug-specific guidance (Cockcroft-Gault may be required)",
      "Acute kidney injury — use stable baseline creatinine",
      "Extremes of muscle mass without clinical correlation",
      "Pregnancy — use pregnancy-specific GFR estimation",
    ],
    limitations: [
      "CKD-EPI is an estimate; it may be inaccurate in extremes of muscle mass, amputees, or pregnancy.",
      "Do not use for medication dosing without checking drug-specific guidance.",
      "Less accurate at very high or very low GFR values.",
      "The 2021 equation does not include race, which improves equity but may differ from older equations in some populations.",
    ],
    example: {
      description:
        "A 65-year-old woman with diabetes has a serum creatinine of 1.1 mg/dL.",
      inputs: {
        age: "65",
        sex: "2",
        creatinine: "1.1",
      },
      expectedResult:
        "eGFR ≈ 54 mL/min/1.73 m², which corresponds to CKD stage G3a (mild-to-moderate decrease). Repeat in 3 months to confirm chronicity.",
    },
    clinicalSignificance:
      "eGFR is essential for CKD staging, drug dosing decisions, and monitoring kidney function over time. The 2021 CKD-EPI equation is the current standard recommended by KDIGO.",
    references: [
      {
        citation:
          "Inker LA, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385:1737-1749.",
        level: "Level I",
      },
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for CKD.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "NKF / KDIGO",
      reference:
        "Inker LA, et al. NEJM. 2021;385:1737-1749.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2021",
      references: [
        "Inker LA, et al. NEJM. 2021.",
        "KDIGO 2024 Clinical Practice Guideline for CKD.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. eGFR is an estimate and should be interpreted alongside clinical context. It does not replace direct GFR measurement or clinical judgment.",
  },

  "corrected-qt": {
    clinicalPurpose:
      "Corrects the QT interval for heart rate using the Bazett formula to assess QT prolongation risk.",
    howToUse: [
      "Measure the QT interval from the ECG (from the start of the QRS complex to the end of the T wave).",
      "Enter the QT interval in milliseconds.",
      "Enter the heart rate in beats per minute.",
      "Select the patient's sex (thresholds differ between men and women).",
      "Review the corrected QTc value and its interpretation.",
    ],
    interpretation: {
      guide:
        "QTc <450 ms (men) or <460 ms (women) is normal. 450–499 ms (men) or 460–499 ms (women) indicates prolongation. ≥500 ms indicates marked prolongation and increased risk of Torsades de Pointes.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessment of QT prolongation risk",
      "Patients with electrolyte abnormalities (hypokalemia, hypomagnesemia, hypocalcemia)",
      "Medication review for QT-prolonging drugs",
      "Pre-operative cardiac risk assessment",
      "Evaluation of syncope or family history of sudden cardiac death",
    ],
    whenNotToUse: [
      "As a standalone risk assessment without clinical context",
      "When the ECG tracing quality is poor and QT measurement is unreliable",
    ],
    limitations: [
      "The Bazett formula tends to over-correct at high heart rates and under-correct at low heart rates.",
      "QT measurement itself has significant inter-observer variability.",
      "Does not replace clinical assessment of arrhythmia risk.",
      "Other correction formulas (Fridericia, Framingham) may be more appropriate in certain clinical settings.",
    ],
    example: {
      description:
        "A 45-year-old woman has a QT interval of 460 ms and a heart rate of 72 bpm.",
      inputs: {
        qt: "460",
        heartRate: "72",
        sex: "2",
      },
      expectedResult:
        "QTc ≈ 435 ms (using Bazett formula). This is within the normal range for women (<460 ms).",
    },
    clinicalSignificance:
      "QT prolongation is a risk factor for Torsades de Pointes, a potentially fatal ventricular arrhythmia. Identifying prolonged QTc allows clinicians to address modifiable risk factors such as electrolyte abnormalities and QT-prolonging medications.",
    references: [
      {
        citation:
          "Bazett HC. An analysis of the time-relations of electrocardiograms. Heart. 1920;7:353-370.",
        level: "Original Description",
      },
      {
        citation:
          "ACHA ECG Guidelines for the Interpretation of the Resting 12-Lead ECG.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. QTc interpretation should always be performed in the context of the individual patient's clinical presentation, medication list, and ECG quality.",
  },

  "bmi": {
    clinicalPurpose:
      "Calculates Body Mass Index (BMI) to screen for underweight, normal weight, overweight, and obesity categories.",
    howToUse: [
      "Enter the patient's weight in kilograms.",
      "Enter the patient's height in centimeters.",
      "Review the BMI value and weight category.",
    ],
    interpretation: {
      guide:
        "BMI <18.5 is underweight. 18.5–24.9 is normal weight. 25–29.9 is overweight. ≥30 is obesity.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
    },
    whenToUse: [
      "Initial screening for weight status in adults",
      "Population-level health assessments",
      "Baseline measurement for weight management programs",
      "Cardiovascular and metabolic risk assessment",
    ],
    whenNotToUse: [
      "As a sole diagnostic criterion for obesity in athletes or individuals with high muscle mass",
      "In very elderly patients where body composition changes may affect interpretation",
      "As a replacement for more detailed body composition analysis when clinically needed",
    ],
    limitations: [
      "Does not distinguish between fat mass and lean mass.",
      "May misclassify muscular individuals as overweight or obese.",
      "Less accurate in elderly patients, athletes, and pregnant women.",
      "Does not account for fat distribution (use waist-to-hip ratio for central obesity assessment).",
      "Pediatric BMI interpretation requires age- and sex-specific percentiles.",
    ],
    example: {
      description:
        "A 35-year-old woman weighs 68 kg and is 165 cm tall.",
      inputs: {
        weight: "68",
        height: "165",
      },
      expectedResult:
        "BMI = 68 / (1.65)² = 24.98 kg/m². This is at the upper end of normal weight, bordering on overweight.",
    },
    clinicalSignificance:
      "BMI is a widely used screening tool that correlates with metabolic risk. While not a perfect measure of body fatness, it provides a quick, inexpensive assessment that guides further clinical evaluation and intervention.",
    references: [
      {
        citation:
          "WHO. Body Mass Index — BMI. World Health Organization.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical screening purposes only. BMI is a screening tool and does not diagnose body fatness or health. Clinical decisions should be based on comprehensive patient assessment.",
  },

  "bun-creatinine-ratio": {
    clinicalPurpose:
      "Calculates the blood urea nitrogen (BUN) to serum creatinine ratio to help differentiate causes of acute kidney injury and assess hydration status.",
    howToUse: [
      "Enter the BUN value in mg/dL.",
      "Enter the serum creatinine value in mg/dL.",
      "Review the ratio and its interpretation.",
    ],
    interpretation: {
      guide:
        "A BUN/Cr ratio >20:1 suggests a prerenal cause (dehydration, heart failure, GI bleeding). A ratio of 10–20:1 is normal or suggests intrinsic renal disease. A ratio <10:1 may indicate reduced protein intake, liver disease, or overhydration.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of acute kidney injury",
      "Differentiating prerenal from intrinsic renal causes",
      "Assessment of hydration status",
      "Evaluation of elevated BUN without elevated creatinine",
    ],
    whenNotToUse: [
      "As a standalone diagnostic tool",
      "In patients on dialysis",
      "When BUN is affected by upper GI bleeding or high-protein diet",
    ],
    limitations: [
      "Upper GI bleeding, high-protein diet, corticosteroids, and tetracycline can elevate BUN independently of creatinine.",
      "Severe liver disease can lower BUN, reducing the ratio.",
      "Muscle mass affects creatinine, which can alter the ratio in elderly or muscular patients.",
      "Should be interpreted alongside urine electrolytes and clinical context.",
    ],
    example: {
      description:
        "A 70-year-old man presents with dehydration. BUN is 45 mg/dL and creatinine is 2.0 mg/dL.",
      inputs: {
        bun: "45",
        creatinine: "2.0",
      },
      expectedResult:
        "BUN/Cr ratio = 45/2 = 22.5:1. This elevated ratio suggests a prerenal cause, consistent with dehydration.",
    },
    clinicalSignificance:
      "The BUN/Cr ratio is a simple, widely available tool for assessing the likely cause of elevated creatinine. It helps guide initial management decisions in acute kidney injury, particularly in distinguishing prerenal from intrinsic renal disease.",
    references: [
      {
        citation:
          "Powers KS. Acute renal failure: Diagnostic approach and management. Pediatr Rev. 2011;32:109-118.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The BUN/Cr ratio should be interpreted in the context of the individual patient's clinical presentation and other laboratory values.",
  },

  "corrected-sodium": {
    clinicalPurpose:
      "Corrects the measured serum sodium for hyperglycemia to reveal the true sodium status in patients with significant glucose elevation.",
    howToUse: [
      "Enter the measured serum sodium in mmol/L.",
      "Enter the serum glucose in mg/dL.",
      "Review the corrected sodium value.",
    ],
    interpretation: {
      guide:
        "Corrected sodium accounts for the dilutional effect of glucose. For every 100 mg/dL increase in glucose above 100 mg/dL, sodium decreases by approximately 1.6 mmol/L. A normal corrected sodium with a low measured sodium indicates true dilutional hyponatremia.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Diabetic ketoacidosis (DKA)",
      "Hyperosmolar hyperglycemic state (HHS)",
      "Any condition with significant hyperglycemia",
      "Interpretation of sodium in uncontrolled diabetes",
    ],
    whenNotToUse: [
      "When glucose is normal or only mildly elevated",
      "As a replacement for clinical assessment of fluid status",
    ],
    limitations: [
      "The correction factor (1.6 mmol/L per 100 mg/dL glucose) is an approximation.",
      "May be less accurate at very high glucose levels (>600 mg/dL).",
      "Does not account for other osmotic agents (mannitol, glycine).",
      "Should be used alongside clinical assessment of volume status.",
    ],
    example: {
      description:
        "A 58-year-old woman with DKA has a measured sodium of 128 mmol/L and glucose of 500 mg/dL.",
      inputs: {
        sodium: "128",
        glucose: "500",
      },
      expectedResult:
        "Corrected sodium ≈ 128 + 1.6 × (500−100)/100 = 128 + 6.4 = 134.4 mmol/L. The corrected sodium is near-normal, suggesting that the low measured sodium is primarily due to glucose-driven dilution.",
    },
    clinicalSignificance:
      "In hyperglycemic states, water shifts from the intracellular to the extracellular space, diluting serum sodium. Without correction, the true sodium status may be masked, leading to inappropriate fluid management.",
    references: [
      {
        citation:
          "Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399-403.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Sodium correction is an approximation and should be interpreted alongside clinical assessment of the patient's volume and glucose status.",
  },

  "osmolar-gap": {
    clinicalPurpose:
      "Calculates the difference between measured and calculated serum osmolality to detect the presence of unmeasured osmoles, which may indicate toxic alcohol ingestion.",
    howToUse: [
      "Enter serum sodium (mmol/L), BUN (mg/dL), glucose (mg/dL), and ethanol (mg/dL).",
      "Enter the measured serum osmolality (mOsm/kg) from the laboratory.",
      "Review the osmolar gap.",
    ],
    interpretation: {
      guide:
        "An osmolar gap >10 mOsm/kg may indicate the presence of unmeasured osmoles such as toxic alcohols (methanol, ethylene glycol), ethanol, or other ingestions. A normal osmolar gap does not completely exclude toxic ingestion in delayed presentations.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Suspected toxic alcohol ingestion (methanol, ethylene glycol, isopropanol)",
      "Emergency department evaluation of unknown ingestion",
      "Altered mental status with metabolic acidosis",
      "Evaluation of elevated anion gap with suspected ingestion",
    ],
    whenNotToUse: [
      "When measured osmolality is not available",
      "As a standalone diagnostic test for toxic ingestion",
      "When the clinical picture clearly points to a non-toxicological cause",
    ],
    limitations: [
      "A normal osmolar gap does not exclude toxic ingestion, particularly in delayed presentations where metabolism has occurred.",
      "Requires a measured serum osmolality from the laboratory.",
      "Ethanol ingestion elevates the osmolar gap but is not necessarily toxic.",
      "Uremia, ketoacidosis, and alcohol can also elevate the osmolar gap.",
    ],
    example: {
      description:
        "A 30-year-old man presents with altered mental status and metabolic acidosis. Sodium is 140 mmol/L, glucose is 100 mg/dL, BUN is 15 mg/dL, ethanol is 0 mg/dL, and measured osmolality is 330 mOsm/kg.",
      inputs: {
        sodium: "140",
        glucose: "100",
        bun: "15",
        ethanol: "0",
        measuredOsmolality: "330",
      },
      expectedResult:
        "Calculated osmolality ≈ 2 × 140 + 100/18 + 15/2.8 + 0 = 280 + 5.6 + 5.4 = 291 mOsm/kg. Osmolar gap ≈ 330 − 291 = 39 mOsm/kg. This markedly elevated osmolar gap, in the context of metabolic acidosis, raises concern for toxic alcohol ingestion.",
    },
    clinicalSignificance:
      "An elevated osmolar gap in the appropriate clinical setting suggests the presence of an unmeasured osmole, which may be a toxic alcohol. Early identification is critical because specific antidotes (fomepizole, ethanol) and dialysis can be life-saving.",
    references: [
      {
        citation:
          "Brent J, et al. Fomepizole for the treatment of methanol poisoning. N Engl J Med. 2001;344:424-429.",
        level: "Level I",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. An elevated osmolar gap requires urgent clinical evaluation. Do not delay treatment while awaiting laboratory confirmation.",
  },

  "news2": {
    clinicalPurpose:
      "Calculates the National Early Warning Score 2 (NEWS2) to standardize the assessment of acute illness severity and trigger appropriate clinical responses.",
    howToUse: [
      "Enter the patient's respiratory rate, SpO₂, supplemental oxygen, temperature, systolic blood pressure, heart rate, and level of consciousness (AVPU).",
      "Review the aggregate NEWS2 score and the corresponding clinical response level.",
    ],
    interpretation: {
      guide:
        "A NEWS2 score of 0 indicates low clinical risk. Scores of 1–4 suggest low-to-moderate risk; evaluate by a competent registered nurse. A score of 5–6 or any single score of 3 in any parameter indicates high risk; urgent assessment by a clinician with critical care competencies. A score of ≥7 indicates very high risk; emergency assessment, likely ICU admission.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Serial monitoring of acute inpatients",
      "Identifying clinical deterioration",
      "Standardizing communication about patient acuity",
      "Triggering escalation of care",
    ],
    whenNotToUse: [
      "In patients with Do Not Escalate (DNA-CPR) orders (use modified escalation pathways)",
      "In chronic conditions where baseline values may be persistently abnormal (consider individualized NEWS2)",
      "In pediatric patients (use PEWS instead)",
    ],
    limitations: [
      "Patients with chronic respiratory disease may have persistently low SpO₂ on air; consider using target SpO₂ ranges in the supplemental oxygen scoring.",
      "Does not replace comprehensive clinical assessment.",
      "A low score does not guarantee clinical stability.",
      "Patients on long-term oxygen therapy require individualized assessment.",
    ],
    example: {
      description:
        "A 72-year-old woman on the surgical ward has: respiratory rate 24, SpO₂ 93% on air, temperature 38.2°C, systolic BP 100 mmHg, heart rate 110 bpm, and is alert.",
      inputs: {
        respiratoryRate: "24",
        spO2: "93",
        supplementalOxygen: "0",
        temperature: "38.2",
        systolicBP: "100",
        heartRate: "110",
        consciousness: "1",
      },
      expectedResult:
        "NEWS2 score indicates moderate-to-high clinical risk, warranting urgent clinical review and increased monitoring frequency.",
    },
    clinicalSignificance:
      "NEWS2 provides a standardized, evidence-based approach to detecting clinical deterioration. It has been shown to improve patient outcomes by enabling early intervention before critical deterioration occurs.",
    references: [
      {
        citation:
          "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. RCP, 2017.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. NEWS2 should be used as part of a comprehensive clinical assessment and does not replace clinical judgment.",
  },

  "cockcroft-gault": {
    clinicalPurpose:
      "Estimates creatinine clearance (CrCl) to guide drug dosing adjustments, particularly for renally cleared medications.",
    howToUse: [
      "Enter the patient's age, weight (kg), and serum creatinine (mg/dL).",
      "Select the patient's sex.",
      "Review the estimated creatinine clearance.",
    ],
    interpretation: {
      guide:
        "CrCl >90 mL/min is normal. 60–89 is mildly decreased. 30–59 is moderately decreased. 15–29 is severely decreased. <15 indicates kidney failure. Use the result to adjust medication doses per drug-specific guidance.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Drug dosing for renally cleared medications (many antibiotics, anticoagulants, diabetes medications)",
      "Situations where a medication label specifically requires Cockcroft-Gault CrCl",
      "When eGFR-based dosing is not specified in drug labeling",
    ],
    whenNotToUse: [
      "For CKD staging (use CKD-EPI eGFR instead)",
      "In patients with rapidly changing renal function (use actual measured CrCl or consider real-time eGFR)",
      "As a precise measure of GFR — it is an estimate",
    ],
    limitations: [
      "Uses estimated rather than measured creatinine clearance.",
      "Weight choice matters: actual, ideal, or adjusted body weight may be appropriate depending on clinical context.",
      "Less accurate in obesity, extreme muscle mass, amputees, and unstable renal function.",
      "Many drug dosing guidelines still reference Cockcroft-Gault despite its age.",
    ],
    example: {
      description:
        "A 70-year-old man weighing 75 kg has a serum creatinine of 1.4 mg/dL.",
      inputs: {
        age: "70",
        weight: "75",
        creatinine: "1.4",
        sex: "1",
      },
      expectedResult:
        "CrCl ≈ (140 − 70) × 75 / (72 × 1.4) ≈ 54.7 mL/min. This indicates moderate renal impairment and may require dose adjustment for renally cleared drugs.",
    },
    clinicalSignificance:
      "The Cockcroft-Gault equation remains the most widely referenced method for drug dosing adjustments in renal impairment, as most drug labeling and pharmacokinetic studies used this equation for dose adjustments.",
    references: [
      {
        citation:
          "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Drug dosing decisions should always consider the individual patient's clinical context and current drug labeling.",
  },

  "homa-ir": {
    clinicalPurpose:
      "Calculates the Homeostatic Model Assessment for Insulin Resistance (HOMA-IR) to estimate insulin resistance from fasting glucose and insulin levels.",
    howToUse: [
      "Obtain fasting serum glucose (mg/dL) and fasting insulin (µU/mL).",
      "Enter both values into the calculator.",
      "Review the HOMA-IR value and interpretation.",
    ],
    interpretation: {
      guide:
        "HOMA-IR ≤2.5 is generally considered normal. Values >2.5 suggest increasing insulin resistance. Higher values indicate greater insulin resistance and metabolic risk.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Research settings assessing insulin resistance",
      "Clinical evaluation of metabolic syndrome",
      "Monitoring response to lifestyle interventions for insulin resistance",
      "Complementing HOMA-B to distinguish insulin resistance from beta-cell dysfunction",
    ],
    whenNotToUse: [
      "In type 1 diabetes (beta-cell destruction makes HOMA-IR unreliable)",
      "In patients on exogenous insulin (exogenous insulin affects the calculation)",
      "As a standalone diagnostic test for insulin resistance",
    ],
    limitations: [
      "Requires fasting samples; non-fasting values are unreliable.",
      "Less validated in certain ethnic populations and age groups.",
      "Does not replace dynamic tests such as the hyperinsulinemic-euglycemic clamp.",
      "Insulin assay variability between laboratories can affect results.",
    ],
    example: {
      description:
        "A 45-year-old woman with a family history of type 2 diabetes has a fasting glucose of 110 mg/dL and fasting insulin of 15 µU/mL.",
      inputs: {
        glucose: "110",
        insulin: "15",
      },
      expectedResult:
        "HOMA-IR = (110 × 15) / (405) ≈ 4.07. This indicates significant insulin resistance and warrants evaluation for metabolic syndrome.",
    },
    clinicalSignificance:
      "HOMA-IR provides a simple, inexpensive estimate of insulin resistance that is useful in identifying patients at risk for type 2 diabetes and cardiovascular disease, and in monitoring the effectiveness of lifestyle interventions.",
    references: [
      {
        citation:
          "Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412-419.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-IR is a research and screening tool and should not be used as a standalone diagnostic test. Clinical decisions should be based on comprehensive metabolic assessment.",
  },
};