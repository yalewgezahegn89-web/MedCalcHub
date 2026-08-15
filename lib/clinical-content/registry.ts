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
      "Enter the measured serum osmolality (mOsm/kg) from the laboratory.",
      "Enter serum sodium (mmol/L), glucose (mg/dL), and BUN (mg/dL).",
      "Review the osmolar gap and its interpretation.",
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
        "A 30-year-old man presents with altered mental status and metabolic acidosis. Measured serum osmolality is 330 mOsm/kg, sodium is 140 mmol/L, glucose is 100 mg/dL, and BUN is 15 mg/dL.",
      inputs: {
        measured: "330",
        sodium: "140",
        glucose: "100",
        bun: "15",
      },
      expectedResult:
        "Calculated osmolality ≈ 2 × 140 + 100/18 + 15/2.8 = 280 + 5.6 + 5.4 = 291 mOsm/kg. Osmolar gap ≈ 330 − 291 = 39 mOsm/kg. This elevated osmolar gap, in the context of metabolic acidosis, raises concern for unmeasured osmoles such as toxic alcohol ingestion.",
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
        "A 72-year-old woman on the surgical ward has respiratory rate 24/min, SpO₂ 93% on air, temperature 38.2°C, systolic BP 100 mmHg, and pulse 110 bpm, and is alert.",
      inputs: {
        "respiratory-rate": "24",
        spo2: "93",
        temperature: "38.2",
        sbp: "100",
        pulse: "110",
      },
      expectedResult:
        "NEWS2 sub-scores: RR 2, SpO₂ 2, temperature 1, SBP 2, pulse 2 — aggregate 9, indicating very high clinical risk and requiring emergency clinical assessment.",
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

  "curb-65": {
    clinicalPurpose:
      "Stratifies severity and 30-day mortality risk in adults with community-acquired pneumonia (CAP) to help guide site-of-care decisions.",
    howToUse: [
      "Confirm the patient has community-acquired pneumonia before applying the score.",
      "Enter the patient's age, urea, respiratory rate, and systolic blood pressure.",
      "Select whether new-onset confusion is present.",
      "Review the score and the corresponding severity-based management suggestion.",
    ],
    interpretation: {
      guide:
        "CURB-65 is scored 0–5 with one point each for new-onset confusion, urea > 7 mmol/L, respiratory rate ≥ 30/min, systolic blood pressure < 90 mmHg, and age ≥ 65. Scores of 0–1 are typically managed as outpatients; a score of 2 suggests hospital admission; a score ≥ 3 indicates severe pneumonia and consideration of ICU-level care.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Severity assessment in community-acquired pneumonia in adults",
      "Site-of-care decision (outpatient vs hospital vs ICU)",
      "Mortality risk stratification at presentation",
    ],
    whenNotToUse: [
      "Hospital-acquired or ventilator-associated pneumonia",
      "Pediatric pneumonia — CURB-65 is not validated in children",
      "As a substitute for clinical judgment in unstable patients",
      "As the sole determinant of disposition in patients with severe hypoxia or sepsis",
    ],
    limitations: [
      "Derived and validated in adults with community-acquired pneumonia; not validated in children.",
      "Urea must reflect the current presentation and can be affected by renal function, dehydration, and GI bleeding.",
      "Age contributes a fixed point regardless of comorbidity burden.",
      "Does not account for hypoxia, immunocompromise, or sepsis severity beyond hypotension.",
      "The score should be combined with clinical judgment and assessment of oxygen requirements.",
    ],
    example: {
      description:
        "A 70-year-old man with community-acquired pneumonia has no new-onset confusion, urea 8.5 mmol/L, respiratory rate 24/min, and systolic blood pressure 105 mmHg.",
      inputs: {
        age: "70",
        confusion: "0",
        urea: "8.5",
        "respiratory-rate": "24",
        sbp: "105",
      },
      expectedResult:
        "CURB-65 = 2 (age ≥ 65 and urea > 7 mmol/L). Moderate severity — strongly consider hospital admission.",
    },
    clinicalSignificance:
      "CURB-65 is a validated, widely used tool that predicts 30-day mortality in community-acquired pneumonia and helps avoid both unnecessary admission of low-risk patients and unsafe discharge of high-risk patients.",
    references: [
      {
        citation:
          "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
        level: "Derivation/Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Severity scores inform but do not replace clinical judgment, especially in patients with hypoxia, sepsis, or significant comorbidity.",
  },

  "qsofa": {
    clinicalPurpose:
      "Identifies adults with suspected infection who are at high risk of sepsis-related organ dysfunction and death, prompting escalation of care.",
    howToUse: [
      "Use in a patient with suspected infection to prompt further assessment.",
      "Measure the respiratory rate and systolic blood pressure and assess mental status.",
      "Enter each value; each criterion met scores 1 point.",
      "A score of 2 or more should prompt escalation, including assessment for organ dysfunction and consideration of ICU-level care.",
    ],
    interpretation: {
      guide:
        "qSOFA ranges from 0–3. A score of 0 is low concern, 1 indicates moderate concern, and ≥ 2 indicates high risk of sepsis-related organ dysfunction and mortality and should prompt escalation of care.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Bedside screening in patients with suspected infection outside the ICU",
      "Rapid triage in the emergency department",
      "Serial reassessment for clinical deterioration in suspected sepsis",
    ],
    whenNotToUse: [
      "As the sole diagnostic tool for sepsis — use full clinical sepsis criteria and assessment",
      "In pediatric patients — qSOFA is not validated in children",
      "As a substitute for thorough clinical assessment and vital sign monitoring",
      "In pregnancy, where physiological changes may alter normal blood pressure and respiratory rate",
    ],
    limitations: [
      "qSOFA is a screening tool, not a diagnostic test for sepsis.",
      "It has lower sensitivity than the full SOFA score; a low qSOFA does not exclude sepsis.",
      "Intended primarily for non-ICU settings; predictive value is reduced in the ICU.",
      "Does not include lactate or other biomarkers.",
      "Physiological changes in pregnancy may affect interpretation of blood pressure and respiratory rate.",
    ],
    example: {
      description:
        "A 58-year-old woman with suspected urinary sepsis has a systolic blood pressure of 95 mmHg, respiratory rate 24/min, and is alert and oriented.",
      inputs: {
        sbp: "95",
        "respiratory-rate": "24",
        "mental-status": "0",
      },
      expectedResult:
        "qSOFA = 2 (SBP ≤ 100 mmHg and RR ≥ 22/min). High risk of sepsis-related organ dysfunction — escalate care urgently.",
    },
    clinicalSignificance:
      "qSOFA provides a rapid bedside screen that, in the setting of suspected infection, flags patients at elevated risk of poor outcomes and enables earlier recognition and treatment of sepsis.",
    references: [
      {
        citation:
          "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):762-774.",
        level: "Derivation/Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. qSOFA is a screening tool and must not replace full clinical assessment or delay treatment in patients with suspected sepsis.",
  },

  "gcs": {
    clinicalPurpose:
      "Provides a standardized measure of the level of consciousness based on eye, verbal, and motor responses, widely used in trauma, neurology, and critical care.",
    howToUse: [
      "Assess the best eye, verbal, and motor response, using noxious stimulation when the patient does not respond spontaneously or to voice.",
      "Record the best response in each component.",
      "Sum the three component scores to obtain the total GCS (3–15).",
      "Repeat at intervals and document trends — a fall of 2 points is clinically significant.",
    ],
    interpretation: {
      guide:
        "GCS 13–15 is generally considered mild impairment, 9–12 moderate, and ≤ 8 severe. A GCS ≤ 8 is commonly used as a threshold for consideration of airway protection. Scores must be interpreted in the context of sedation, intoxication, and baseline neurologic status, and pediatric verbal scoring differs for pre-verbal children.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Initial and serial assessment of consciousness after head trauma",
      "Monitoring neurologic status in critical illness",
      "Standardized communication of level of consciousness",
      "Triggering consideration of airway protection in severe brain injury",
    ],
    whenNotToUse: [
      "As the sole determinant of neurologic prognosis",
      "In patients whose responses are confounded by paralysis, deep sedation, or intubation (a modified GCS should be documented instead)",
      "As a replacement for a full neurologic examination including pupils",
    ],
    limitations: [
      "Does not assess brainstem function, pupil reactivity, or focal deficits.",
      "Interobserver variability exists; the best response should be recorded.",
      "Intubation, sedation, paralysis, and language barriers confound the verbal component.",
      "Pre-verbal children require age-adjusted verbal scoring.",
      "A single score is less informative than the trend over time.",
    ],
    example: {
      description:
        "A 40-year-old man after a fall opens his eyes to speech, is confused in conversation, and localizes to pain.",
      inputs: {
        eye: "3",
        verbal: "4",
        motor: "5",
      },
      expectedResult:
        "GCS = 3 + 4 + 5 = 12, indicating moderate impairment (9–12 range). Serial reassessment is warranted.",
    },
    clinicalSignificance:
      "The Glasgow Coma Scale is one of the most widely used clinical scales; it standardizes communication about the level of consciousness and correlates with outcome after traumatic brain injury.",
    references: [
      {
        citation:
          "Teasdale G, Jennett B. Assessment of coma and impaired consciousness: a practical scale. Lancet. 1974;304(7872):81-84.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The GCS is one component of neurologic assessment and must be interpreted alongside the full clinical picture.",
  },

  "shock-index": {
    clinicalPurpose:
      "Relates heart rate to systolic blood pressure to flag patients whose heart rate is inappropriately high relative to blood pressure, indicating impaired hemodynamic reserve.",
    howToUse: [
      "Obtain heart rate (bpm) and systolic blood pressure (mmHg) at the same time.",
      "Enter both values.",
      "Compare the result against the normal range (approximately 0.5–0.7).",
      "Use serial measurements to track trends during resuscitation.",
    ],
    interpretation: {
      guide:
        "A shock index of 0.5–0.7 is generally considered normal. Values above 0.7 are commonly regarded as elevated and warrant investigation; progressively higher values indicate increasing concern for impaired hemodynamic reserve, particularly in trauma, hemorrhage, and sepsis.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Rapid bedside assessment in trauma and suspected hemorrhage",
      "Screening for occult hypoperfusion in sepsis and critical illness",
      "Monitoring response to volume resuscitation",
      "Emergency triage when hemodynamics are concerning",
    ],
    whenNotToUse: [
      "As the sole indicator of shock",
      "In patients with bradycardia, pacemakers, or arrhythmias where heart rate is not a reliable marker",
      "In children, where normal values differ by age",
      "As a replacement for blood pressure, lactate, urine output, or perfusion assessment",
    ],
    limitations: [
      "Heart rate is affected by rate-control medications, pacemakers, and autonomic dysfunction.",
      "Does not measure cardiac output, lactate, or tissue perfusion directly.",
      "Normal reference values differ in children.",
      "A single normal value does not exclude compensated shock.",
    ],
    example: {
      description:
        "A 45-year-old man after a motor vehicle accident has a heart rate of 120 bpm and a systolic blood pressure of 80 mmHg.",
      inputs: {
        "heart-rate": "120",
        sbp: "80",
      },
      expectedResult:
        "Shock Index = 120 / 80 = 1.5. This is well above the normal range (0.5–0.7) and indicates significant hemodynamic compromise requiring urgent evaluation.",
    },
    clinicalSignificance:
      "The shock index is a simple, inexpensive screening tool that can identify compensated shock before frank hypotension develops, because heart rate often rises before blood pressure falls.",
    references: [
      {
        citation:
          "Rady MY, Smithline HA, Blake H, et al. A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department. Ann Emerg Med. 1994;24(4):685-690.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The shock index is a screening adjunct and must be interpreted with full hemodynamic and clinical assessment.",
  },

  "map": {
    clinicalPurpose:
      "Calculates mean arterial pressure (MAP), the average pressure driving perfusion of vital organs, from systolic and diastolic blood pressure.",
    howToUse: [
      "Measure the systolic and diastolic blood pressure.",
      "Enter both values.",
      "Review the calculated MAP against normal values and perfusion targets.",
    ],
    interpretation: {
      guide:
        "Normal resting MAP is approximately 70–100 mmHg. In sepsis and septic shock, a MAP ≥ 65 mmHg is a commonly cited target to support organ perfusion. Very low MAP raises concern for organ hypoperfusion, while the optimal target varies with the patient's baseline blood pressure and condition.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Hemodynamic assessment in the critically ill",
      "Guiding blood pressure targets in sepsis and shock",
      "Monitoring vasopressor therapy",
      "Assessing the risk of organ hypoperfusion",
    ],
    whenNotToUse: [
      "As a substitute for full hemodynamic monitoring (cardiac output, lactate, urine output)",
      "In isolation without clinical context",
    ],
    limitations: [
      "The formula estimates MAP from a formula rather than a direct measurement.",
      "It is less reliable with wide pulse pressures or very high heart rates.",
      "Optimal MAP targets vary by patient and condition (e.g., chronic hypertension, age).",
      "Does not reflect the adequacy of cardiac output or tissue perfusion.",
    ],
    example: {
      description:
        "A 60-year-old man with septic shock has a blood pressure of 90/60 mmHg.",
      inputs: {
        sbp: "90",
        dbp: "60",
      },
      expectedResult:
        "MAP = (90 + 2 × 60) / 3 = 70 mmHg, meeting the commonly cited ≥ 65 mmHg perfusion target in sepsis.",
    },
    clinicalSignificance:
      "MAP reflects the driving pressure for organ perfusion more closely than systolic or diastolic pressure alone and is a central parameter in resuscitation and vasopressor management.",
    references: [
      {
        citation:
          "Meaney E, Alva F, Moguel R, et al. Formula and nomogram for the sphygmomanometric calculation of the mean arterial pressure. Heart. 2000;84(1):64.",
        level: "Original Description",
      },
      {
        citation:
          "Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. MAP targets should be individualized based on clinical context and institutional protocols.",
  },

  "mdrd": {
    clinicalPurpose:
      "Estimates glomerular filtration rate (eGFR) using the 4-variable MDRD equation, primarily encountered in older laboratory reports and historical comparisons.",
    howToUse: [
      "Enter the patient's age, sex, and serum creatinine (mg/dL).",
      "Review the estimated eGFR and the corresponding CKD G stage.",
      "For new clinical decisions, prefer the CKD-EPI 2021 equation when available.",
    ],
    interpretation: {
      guide:
        "MDRD eGFR is interpreted using the same KDIGO G stages as CKD-EPI: G1 ≥ 90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, and G5 < 15 mL/min/1.73 m². The equation applies a female adjustment factor (× 0.742).",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Comparing with older laboratory reports that still report MDRD eGFR",
      "Historical interpretation of eGFR trends",
      "Where CKD-EPI is unavailable",
    ],
    whenNotToUse: [
      "For new clinical decisions when CKD-EPI is available",
      "For medication dosing without drug-specific guidance (Cockcroft-Gault is commonly referenced)",
      "In acute kidney injury with unstable creatinine",
      "At extremes of body size or muscle mass without clinical correlation",
    ],
    limitations: [
      "Tends to underestimate GFR when the true GFR is above 60 mL/min/1.73 m².",
      "Was developed in patients with known CKD and is less accurate in healthy individuals.",
      "Values may differ from CKD-EPI; trends should be compared within the same equation.",
      "Less accurate at extremes of muscle mass and body habitus.",
    ],
    example: {
      description:
        "A 65-year-old woman has a serum creatinine of 1.1 mg/dL.",
      inputs: {
        age: "65",
        sex: "2",
        creatinine: "1.1",
      },
      expectedResult:
        "eGFR ≈ 175 × 1.1^-1.154 × 65^-0.203 × 0.742 ≈ 50 mL/min/1.73 m², corresponding to CKD stage G3a (45–59).",
    },
    clinicalSignificance:
      "The MDRD equation made eGFR reporting practical and remains important for interpreting older laboratory results and understanding why CKD-EPI has replaced it.",
    references: [
      {
        citation:
          "Levey AS, Bosch JP, Lewis JB, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130(6):461-470.",
        level: "Original Description",
      },
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. eGFR is an estimate and MDRD has been largely superseded by CKD-EPI for current clinical decisions.",
  },

  "fena": {
    clinicalPurpose:
      "Quantifies the fractional excretion of sodium to help distinguish prerenal azotemia from intrinsic renal injury (such as acute tubular necrosis) in acute kidney injury.",
    howToUse: [
      "Obtain a spot urine sodium and urine creatinine together with paired plasma sodium and plasma creatinine.",
      "Enter all four values.",
      "Review the FENa and its suggested category.",
      "In patients receiving diuretics, consider FEUrea instead.",
    ],
      interpretation: {
        guide:
          "FENa < 1% suggests prerenal azotemia (the kidneys are appropriately conserving sodium), 1–2% is indeterminate, and > 2% suggests intrinsic renal injury such as ATN. Interpretation is unreliable in the setting of diuretics, chronic kidney disease, and in the elderly.",
        sexSpecific: false,
        ageSpecific: false,
      },
      whenToUse: [
        "Evaluation of acute kidney injury to differentiate prerenal from intrinsic causes",
        "When paired urine and plasma electrolytes are available",
        "Complementing the BUN/Cr ratio and FEUrea",
      ],
    whenNotToUse: [
      "In patients receiving diuretics — prefer FEUrea",
      "In chronic kidney disease or the elderly, where thresholds are less reliable",
      "In acute kidney injury with rapidly changing renal function",
      "As a standalone diagnostic test",
    ],
    limitations: [
      "Diuretics increase urinary sodium excretion and invalidate the test.",
      "Chronic kidney disease and older age reduce its discriminating ability.",
      "Requires spot urine and plasma samples from the same time point.",
      "Results may be variable with obstruction and other intrinsic causes.",
      "Does not, by itself, establish the cause of acute kidney injury.",
    ],
    example: {
      description:
        "A 55-year-old man with diarrhea-induced volume depletion has a urine sodium of 20 mmol/L, plasma sodium 140 mmol/L, urine creatinine 100 mg/dL, and plasma creatinine 1.0 mg/dL.",
      inputs: {
        urineNa: "20",
        plasmaNa: "140",
        urineCr: "100",
        plasmaCr: "1.0",
      },
      expectedResult:
        "FENa = (20/140) ÷ (100/1.0) × 100 ≈ 0.14%. This low value suggests prerenal azotemia — the kidneys are conserving sodium appropriately.",
    },
    clinicalSignificance:
      "FENa is a classic bedside test that helps clinicians identify potentially reversible prerenal causes of AKI, where prompt volume resuscitation may prevent progression to intrinsic injury.",
    references: [
      {
        citation:
          "Carvounis CP, et al. Significance of the fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62(3):1184-1191.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FENa must be interpreted with the clinical context and is unreliable in patients on diuretics or with chronic kidney disease.",
  },

  "feurea": {
    clinicalPurpose:
      "Estimates the fractional excretion of urea to help distinguish prerenal azotemia from intrinsic renal injury, particularly useful when diuretics make FENa unreliable.",
    howToUse: [
      "Use when the patient is receiving diuretics or FENa is otherwise unreliable.",
      "Obtain paired urine urea, plasma urea, urine creatinine, and plasma creatinine.",
      "Enter all four values.",
      "Review the FEUrea and its suggested category.",
    ],
    interpretation: {
      guide:
        "FEUrea < 35% suggests prerenal azotemia, 35–50% is indeterminate, and > 50% suggests intrinsic renal injury such as ATN. Because urea reabsorption is less affected by diuretics than sodium, FEUrea retains diagnostic utility in patients on diuretics.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "AKI evaluation when diuretics have been given",
      "Complementing FENa in the prerenal-versus-intrinsic distinction",
      "When the BUN/Cr ratio is inconclusive",
    ],
    whenNotToUse: [
      "As a replacement for FENa when no diuretics are involved",
      "As a standalone diagnostic test",
      "In severe liver disease, where urea production is reduced",
    ],
    limitations: [
      "Less widely validated than FENa.",
      "Urea handling is influenced by protein intake, catabolic states, and corticosteroids.",
      "Reduced hepatic urea production affects both serum and urine urea.",
      "Thresholds are less well established in some populations.",
    ],
    example: {
      description:
        "A 68-year-old woman with heart failure on furosemide has a urine urea of 300 mg/dL, plasma urea 25 mg/dL, urine creatinine 100 mg/dL, and plasma creatinine 1.5 mg/dL.",
      inputs: {
        urineUrea: "300",
        plasmaUrea: "25",
        urineCr: "100",
        plasmaCr: "1.5",
      },
      expectedResult:
        "FEUrea = (300/25) ÷ (100/1.5) × 100 ≈ 18%. This value below 35% suggests prerenal azotemia.",
    },
    clinicalSignificance:
      "Because diuretics blunt the diagnostic utility of FENa, FEUrea provides a useful complementary test for the prerenal-versus-intrinsic distinction in patients on diuretics.",
    references: [
      {
        citation:
          "Pépin MN, et al. Reassessment of the fractional excretion of urea for the differential diagnosis of acute renal failure. Clin Invest Med. 2007;30(5):E163-167.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEUrea is a complementary test and must be interpreted alongside FENa, urine studies, and clinical context.",
  },

  "albumin-creatinine-ratio": {
    clinicalPurpose:
      "Quantifies urine albumin relative to urine creatinine to screen for and stage chronic kidney disease (albuminuria categories A1–A3).",
    howToUse: [
      "Obtain a spot urine sample; a first-morning void is preferred.",
      "Enter urine albumin (mg/L) and urine creatinine (g/L).",
      "Review the ACR and the corresponding albuminuria category.",
      "Confirm persistence with repeated measurements over at least 3 months before diagnosing CKD.",
    ],
    interpretation: {
      guide:
        "ACR < 30 mg/g is normal to mildly increased albuminuria (A1), 30–300 mg/g is moderately increased (A2), and > 300 mg/g is severely increased (A3). Albuminuria should be interpreted together with eGFR, and persistent elevation for at least 3 months supports a diagnosis of CKD. Pediatric reference values and pregnancy-specific criteria differ and require age- and pregnancy-appropriate interpretation.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
      pregnancy: true,
    },
    whenToUse: [
      "CKD screening in diabetes, hypertension, and cardiovascular disease",
      "CKD staging alongside eGFR",
      "Monitoring response to renin-angiotensin system blockade",
      "Risk stratification for CKD progression",
    ],
    whenNotToUse: [
      "To diagnose CKD from a single abnormal result",
      "During acute conditions causing transient albuminuria (fever, exercise, urinary tract infection, heart failure decompensation)",
      "As a replacement for eGFR assessment",
      "Without pregnancy-specific guidance in pregnant patients",
    ],
    limitations: [
      "Transient albuminuria from fever, exercise, or urinary tract infection can elevate the ratio.",
      "Urine creatinine varies with muscle mass, affecting the ratio at extremes of body habitus.",
      "First-morning voids are preferred; the collection method and urine concentration affect the result.",
      "Pediatric reference values and pregnancy-specific thresholds differ from adult non-pregnant values.",
      "Assesses albuminuria only — it does not measure kidney function (eGFR).",
    ],
    example: {
      description:
        "A 52-year-old man with type 2 diabetes has a spot urine albumin of 250 mg/L and urine creatinine of 1.0 g/L.",
      inputs: {
        albumin: "250",
        creatinine: "1.0",
      },
      expectedResult:
        "ACR = 250 / 1.0 = 250 mg/g, indicating moderately increased albuminuria (A2). Repeat measurement is needed to confirm persistence.",
    },
    clinicalSignificance:
      "ACR is a cornerstone of CKD screening and staging; it detects early kidney damage before eGFR declines and independently stratifies cardiovascular and renal risk.",
    references: [
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Persistent albuminuria and the diagnosis of CKD require confirmatory testing over at least 3 months alongside eGFR.",
  },

  "corrected-calcium": {
    clinicalPurpose:
      "Adjusts measured total serum calcium for hypoalbuminemia to estimate the physiologically relevant total calcium, since a large fraction of serum calcium is albumin-bound.",
    howToUse: [
      "Measure total serum calcium (mg/dL) and albumin (g/dL) from the same blood sample.",
      "Enter both values.",
      "Review the corrected calcium against the normal range.",
      "When ionized calcium is available, use it for clinical decisions, especially in the critically ill.",
    ],
    interpretation: {
      guide:
        "Corrected calcium < 8.5 mg/dL indicates hypocalcemia, 8.5–10.5 mg/dL is normal, ≥ 10.6 mg/dL is hypercalcemia, and ≥ 12.5 mg/dL is severe hypercalcemia. The correction assumes a normal albumin of 4.0 g/dL and becomes less reliable when albumin is below 2.0 g/dL. In neonates and children, correction factors and reference ranges differ.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
    },
    whenToUse: [
      "Interpreting total calcium when serum albumin is low (liver disease, nephrotic syndrome, malnutrition)",
      "Initial assessment for possible hypocalcemia or hypercalcemia",
      "When ionized calcium measurement is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients, where ionized calcium is preferred",
      "When hypercalcemia is suspected — the correction is not validated for that setting",
      "In neonates and children, where reference ranges and correction factors differ",
      "In patients with marked acid-base disturbance, which alters calcium–albumin binding",
    ],
    limitations: [
      "Assumes a fixed relationship between albumin and calcium binding that varies across populations.",
      "Does not account for serum pH, which changes calcium–protein binding.",
      "Becomes less reliable when albumin is below 2.0 g/dL.",
      "Is not a substitute for ionized calcium measurement.",
      "The 0.8 correction factor is an estimate; some institutions use 0.7 or 0.73.",
    ],
    example: {
      description:
        "A 63-year-old woman with cirrhosis has a measured total calcium of 8.0 mg/dL and serum albumin of 2.0 g/dL.",
      inputs: {
        calcium: "8.0",
        albumin: "2.0",
      },
      expectedResult:
        "Corrected calcium = 8.0 + 0.8 × (4 − 2) = 9.6 mg/dL, within the normal range. The low measured calcium was explained by hypoalbuminemia.",
    },
    clinicalSignificance:
      "Because a large fraction of serum calcium is protein-bound, low albumin can mask true calcium status; correction helps avoid unnecessary treatment of spurious hypocalcemia.",
    references: [
      {
        citation:
          "Pay DA, et al. Corrected calcium in hypercalcaemia and hypocalcaemia. Ann Clin Biochem. 2004;41(6):486-488.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The correction is an estimate; ionized calcium is the preferred measurement in the critically ill and when hypercalcemia is suspected.",
  },

  "homa-b": {
    clinicalPurpose:
      "Estimates pancreatic beta-cell function relative to the prevailing fasting glucose, complementing HOMA-IR in the assessment of glucose–insulin homeostasis.",
    howToUse: [
      "Obtain fasting plasma glucose (mmol/L) and fasting serum insulin (µU/mL).",
      "Enter both values.",
      "Review the HOMA-B percentage against the reference ranges.",
      "Interpret together with HOMA-IR to separate beta-cell dysfunction from insulin resistance.",
    ],
    interpretation: {
      guide:
        "HOMA-B of 100–200% is generally considered normal beta-cell function; 50–100% suggests reduced function; < 50% suggests significant beta-cell dysfunction; and ≥ 200% reflects hyperinsulinemia. Values must be interpreted in the context of the patient's fasting glucose and insulin.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Estimating beta-cell function in type 2 diabetes",
      "Research and longitudinal tracking of beta-cell decline",
      "Pairing with HOMA-IR to characterize glucose handling",
    ],
    whenNotToUse: [
      "In type 1 diabetes or in patients on exogenous insulin",
      "As a diagnostic test for diabetes",
      "When the patient is not fasting",
      "As a substitute for C-peptide when precise beta-cell assessment is needed",
    ],
    limitations: [
      "Requires fasting samples; non-fasting values are unreliable.",
      "Insulin assay variability limits comparability across laboratories and studies.",
      "May be transiently elevated in newly diagnosed type 2 diabetes due to glucotoxicity.",
      "Not validated for type 1 diabetes or exogenous insulin use.",
      "Is an estimate, not a direct measure of beta-cell mass.",
    ],
    example: {
      description:
        "A 50-year-old man with type 2 diabetes has a fasting glucose of 6.0 mmol/L and fasting insulin of 10 µU/mL.",
      inputs: {
        glucose: "6.0",
        insulin: "10",
      },
      expectedResult:
        "HOMA-B = (20 × 10) / (6.0 − 3.5) = 80%, suggesting reduced beta-cell function (50–100% range).",
    },
    clinicalSignificance:
      "HOMA-B provides a practical estimate of beta-cell function from routine fasting labs and helps track the progressive beta-cell decline characteristic of type 2 diabetes.",
    references: [
      {
        citation:
          "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-B is an estimate of beta-cell function and must not be used as a standalone diagnostic test.",
  },

  "insulin-sensitivity": {
    clinicalPurpose:
      "Presents insulin resistance as its reciprocal so that higher values indicate better insulin sensitivity, providing an intuitive complement to HOMA-IR.",
    howToUse: [
      "Enter the patient's HOMA-IR value.",
      "Review the insulin sensitivity score.",
      "Higher values (toward 1.0) reflect better sensitivity.",
    ],
    interpretation: {
      guide:
        "A score > 0.4 is generally considered good insulin sensitivity; 0.2–0.4 suggests reduced sensitivity; and < 0.2 indicates significant insulin resistance.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Quick clinic or bedside estimate of insulin sensitivity",
      "Presenting HOMA-IR results in a more intuitive direction",
      "Monitoring response to lifestyle interventions",
    ],
    whenNotToUse: [
      "In type 1 diabetes",
      "In patients on exogenous insulin",
      "As a dynamic measure of the insulin response to meals",
      "As a standalone diagnostic test",
    ],
    limitations: [
      "Is derived entirely from HOMA-IR and inherits its fasting and assay limitations.",
      "Captures a single fasting measurement, not the dynamic response to meals.",
      "Not validated in type 1 diabetes.",
      "Insulin assay variability affects the result.",
    ],
    example: {
      description:
        "A 48-year-old woman has a HOMA-IR of 4.0.",
      inputs: {
        homaIr: "4.0",
      },
      expectedResult:
        "Insulin sensitivity = 1 / 4.0 = 0.25, in the reduced range (0.2–0.4), consistent with meaningful insulin resistance.",
    },
    clinicalSignificance:
      "Expressing insulin resistance as sensitivity (1/HOMA-IR) makes results more intuitive for patients and clinicians tracking improvement, since values rise as metabolic health improves.",
    references: [
      {
        citation:
          "Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27(6):1487-1495.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. Insulin sensitivity derived from HOMA-IR is an estimate and should not be used as a standalone diagnostic test.",
  },

  "bsa": {
    clinicalPurpose:
      "Estimates body surface area using the Mosteller formula, used to normalize physiological parameters and to dose selected medications.",
    howToUse: [
      "Measure weight (kg) and height (cm).",
      "Enter both values.",
      "Review the calculated BSA in m².",
    ],
    interpretation: {
      guide:
        "Typical adult BSA ranges from approximately 1.4–2.2 m². The value is used to index physiological parameters such as cardiac output and to dose certain medications normalized to body surface area.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Dosing medications that are normalized to body surface area",
      "Indexing cardiac output, renal, or other physiological parameters",
      "Assessment of body size in clinical studies",
    ],
    whenNotToUse: [
      "As a measure of body fatness — use BMI and body composition instead",
      "In place of weight-based dosing where the drug label specifies weight-based dosing",
      "As a substitute for the direct assessment of burn surface area",
    ],
    limitations: [
      "Several BSA formulas exist (Mosteller, DuBois, Haycock) and results differ slightly between them.",
      "Assumes a fixed weight–height relationship that is less accurate at extremes of body habitus.",
      "Is not a measure of body composition.",
      "Pediatric use is common, but the formula chosen should be consistent within an institution.",
    ],
    example: {
      description:
        "A 40-year-old woman weighs 70 kg and is 170 cm tall.",
      inputs: {
        weight: "70",
        height: "170",
      },
      expectedResult:
        "BSA = √((170 × 70) / 3600) ≈ 1.82 m², within the typical adult range.",
    },
    clinicalSignificance:
      "BSA is a standard index in physiology and pharmacology, used to scale physiological variables and guide dosing of several high-risk medications.",
    references: [
      {
        citation:
          "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dosing decisions must always follow drug-specific labeling and institutional protocols.",
  },

  "ideal-body-weight": {
    clinicalPurpose:
      "Estimates ideal body weight using the Devine formula, providing a size-adjusted reference weight used in drug dosing and physiological comparisons.",
    howToUse: [
      "Select the patient's sex.",
      "Enter height in centimeters.",
      "Review the estimated ideal body weight in kg.",
    ],
    interpretation: {
      guide:
        "IBW provides a reference weight for a given height and sex; it does not define health or body composition. It is commonly used as the weight basis for certain drug-dosing calculations and for deriving adjusted body weight.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "As a size-adjusted weight for drug dosing",
      "Calculating adjusted body weight for dosing in obesity",
      "Comparing patient weight against a height-based reference",
    ],
    whenNotToUse: [
      "To diagnose obesity or underweight — use BMI",
      "As a target weight for weight-loss programs",
      "In children, where age- and height-based references are needed",
      "In patients with major amputations without adjustment",
    ],
    limitations: [
      "The Devine formula was derived for adults and is not validated in children.",
      "May underestimate for patients with high lean mass and overestimate in other body types.",
      "IBW is a mathematical reference, not a measure of health.",
      "Different formulas (Devine, Robinson, Miller, Hamwi) yield different values.",
    ],
    example: {
      description:
        "A 35-year-old man is 180 cm tall.",
      inputs: {
        sex: "male",
        height: "180",
      },
      expectedResult:
        "IBW = 50 + 2.3 × (180/2.54 − 60) ≈ 75.0 kg using the Devine formula.",
    },
    clinicalSignificance:
      "IBW is the foundation for several weight-based dosing adjustments, particularly adjusted body weight in obese patients, and is widely used in clinical pharmacy and dosing practice.",
    references: [
      {
        citation:
          "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8(11):650-655.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Ideal body weight is an estimate and dosing decisions must follow drug-specific guidance.",
  },

  "adjusted-body-weight": {
    clinicalPurpose:
      "Provides a dosing weight for overweight and obese adults by combining ideal body weight with a fraction of the excess weight, used when medications require a body-weight-adjusted dose.",
    howToUse: [
      "Confirm the patient is overweight or obese, as this adjustment is intended for that population.",
      "Select sex, and enter height and actual weight.",
      "Review the adjusted body weight in kg.",
      "Use the adjusted weight in place of actual weight only where drug-specific guidance calls for it.",
    ],
    interpretation: {
      guide:
        "Adjusted body weight falls between ideal and actual body weight. It is intended for medication dosing in overweight and obese adults, where actual weight may lead to over-dosing and ideal weight to under-dosing.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Medication dosing in overweight and obese adults where the drug label or guidance specifies adjusted weight",
      "As a size-adjusted dosing weight when actual weight overestimates the relevant lean mass",
    ],
    whenNotToUse: [
      "In normal-weight patients, where the adjustment provides no benefit",
      "For all medications — many drugs are dosed by actual weight",
      "In children, where pediatric weight references apply",
      "Without checking drug-specific dosing guidance",
    ],
    limitations: [
      "The 0.4 adjustment factor is empirical and varies by source.",
      "Applies to adults; pediatric use requires other references.",
      "Is not a measure of body composition or lean mass.",
      "Whether to use actual, ideal, or adjusted weight depends on the specific drug.",
    ],
    example: {
      description:
        "A 45-year-old man who is 180 cm tall weighs 110 kg.",
      inputs: {
        sex: "male",
        height: "180",
        weight: "110",
      },
      expectedResult:
        "AdjBW = 75.0 + 0.4 × (110 − 75.0) = 89.0 kg, the adjusted dosing weight for this patient.",
    },
    clinicalSignificance:
      "Adjusted body weight helps balance the risk of over-dosing (with actual weight) and under-dosing (with ideal weight) for weight-based medications in obesity, where both extremes carry clinical risk.",
    references: [
      {
        citation:
          "ClinCalc Drug Dosing Reference. Adjusted Body Weight.",
        level: "Reference",
      },
      {
        citation:
          "ASHP Clinical Guidelines on medication dosing in obese patients.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Medication dosing must follow drug-specific labeling, pharmacokinetics, and institutional protocols.",
  },

  "child-pugh": {
    clinicalPurpose:
      "Scores the severity and prognosis of chronic liver disease and cirrhosis using bilirubin, albumin, INR, ascites, and hepatic encephalopathy.",
    howToUse: [
      "Confirm the patient has chronic liver disease or cirrhosis before applying the score.",
      "Select the point value for total bilirubin, albumin, INR, ascites, and encephalopathy.",
      "Sum the five component scores to obtain the total (5–15 points).",
      "Use the resulting class to guide prognosis and treatment planning.",
    ],
    interpretation: {
      guide:
        "Class A (5–6 points) reflects well-compensated liver disease with an estimated 1-year survival of ≈95%. Class B (7–9 points) reflects significant functional compromise (≈80% 1-year survival). Class C (10–15 points) indicates decompensated disease with a poor prognosis (≈45% 1-year survival).",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessing prognosis in patients with cirrhosis",
      "Estimating surgical risk in patients with liver disease",
      "Evaluating candidacy for treatment and transplantation planning",
      "Monitoring disease progression over time",
    ],
    whenNotToUse: [
      "In acute liver failure without cirrhosis",
      "As the sole basis for transplantation listing — transplant candidacy requires additional evaluation",
      "In patients without confirmed chronic liver disease",
    ],
    limitations: [
      "Subject to inter-observer variability in grading ascites and encephalopathy.",
      "Does not capture portal hypertension complications such as variceal bleeding or hepatorenal syndrome.",
      "Not validated for acute liver injury.",
    ],
    example: {
      description:
        "A 58-year-old man with alcoholic cirrhosis has a bilirubin of 1.5 mg/dL (<2, 1 point), albumin 3.8 g/dL (>3.5, 1 point), INR 1.2 (<1.7, 1 point), mild ascites (2 points), and grade I–II encephalopathy (2 points).",
      inputs: {
        bilirubin: "1",
        albumin: "1",
        inr: "1",
        ascites: "2",
        encephalopathy: "2",
      },
      expectedResult:
        "Total score = 7 points, Child-Pugh Class B — significant functional compromise with an estimated 1-year survival of ≈80%.",
    },
    clinicalSignificance:
      "The Child-Pugh score stratifies the severity of cirrhosis, informs surgical and procedural risk assessment, and helps identify patients who need early referral for liver transplantation evaluation.",
    references: [
      {
        citation:
          "Pugh RNH, Murray-Lyon IM, Dawson JL, et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60(8):646-649.",
        level: "Original Description",
      },
      {
        citation:
          "Child CG, Turcotte JG. Surgery and portal hypertension. Major Probl Clin Surg. 1964;1:1-85.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Hepatology Literature",
      reference: "Pugh RNH, et al. Br J Surg. 1973;60(8):646-649.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1973",
      references: [
        "Pugh RNH, et al. Br J Surg. 1973;60(8):646-649.",
        "Child CG, Turcotte JG. Major Probl Clin Surg. 1964;1:1-85.",
        "AASLD Practice Guidance on cirrhosis.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Child-Pugh score is one component of a full prognostic assessment and does not replace specialist evaluation.",
  },

  "corrected-anion-gap": {
    clinicalPurpose:
      "Adjusts the serum anion gap for hypoalbuminemia to unmask a hidden high anion gap metabolic acidosis (HAGMA) that a low albumin would otherwise conceal.",
    howToUse: [
      "Measure serum sodium, chloride, bicarbonate, and albumin from the same blood draw.",
      "Enter each value in the appropriate field.",
      "Compare the corrected result to the reference range of 8–12 mmol/L.",
      "If elevated, pursue the same differential as for a standard high anion gap acidosis.",
    ],
    interpretation: {
      guide:
        "A corrected anion gap of 8–12 mmol/L is normal. ≥13 mmol/L indicates a high corrected anion gap, and ≥20 mmol/L is markedly elevated. Each 1 g/dL drop in albumin below 4.0 g/dL lowers the measured anion gap by roughly 2.5 mmol/L.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Hypoalbuminemic patients (critical illness, nephrotic syndrome, liver disease, malnutrition)",
      "Critically ill patients with suspected acid-base disorders",
      "Any evaluation of metabolic acidosis when albumin is low",
    ],
    whenNotToUse: [
      "When serum albumin is normal — the standard anion gap calculator is sufficient",
      "As a standalone diagnostic without ABG and clinical correlation",
    ],
    limitations: [
      "The 2.5 mmol/L correction factor is an approximation; some sources use 2.4 or 2.8.",
      "Very low albumin (<2.0 g/dL) may reduce the reliability of the correction.",
      "Does not account for other unmeasured proteins or anions.",
    ],
    example: {
      description:
        "A 62-year-old ICU patient has sodium 140 mmol/L, chloride 105 mmol/L, bicarbonate 12 mmol/L, and albumin 3.0 g/dL.",
      inputs: {
        sodium: "140",
        chloride: "105",
        bicarbonate: "12",
        albumin: "3.0",
      },
      expectedResult:
        "Corrected AG = (140 − (105 + 12)) + 2.5 × (4 − 3) = 23 + 2.5 = 25.5 mmol/L — markedly elevated, consistent with a high anion gap metabolic acidosis.",
    },
    clinicalSignificance:
      "Albumin normally contributes roughly 75% of the anion gap. In hypoalbuminemia the measured gap is falsely low, so correction is essential in critically ill patients where a HAGMA could otherwise be missed.",
    references: [
      {
        citation:
          "Figge J, Jabor A, Kazda A, et al. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.",
        level: "Primary Study",
      },
      {
        citation:
          "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Critical Care Medicine",
      reference: "Figge J, et al. Crit Care Med. 1998;26(11):1807-1810.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "Figge J, et al. Crit Care Med. 1998;26(11):1807-1810.",
        "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
      ],
    },
    faq: [
      {
        question:
          "Why does low albumin lower the measured anion gap?",
        answer:
          "Albumin is a negatively charged protein that contributes significantly to the normal anion gap. When albumin is low, there are fewer unmeasured negative charges, so the calculated gap falls even when an acidosis is present.",
      },
      {
        question:
          "What correction factor should I use?",
        answer:
          "The most common correction adds 2.5 mmol/L to the measured anion gap for every 1 g/dL that albumin falls below 4.0 g/dL. Some sources use 2.4 or 2.8 mmol/L per g/dL depending on the population.",
      },
    ],
    comparison: {
      title: "Which Anion Gap Calculator Should I Use?",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          bestFor: "Routine screening when albumin is normal.",
          limitation: "Falsely low in hypoalbuminemia.",
        },
        {
          name: "Albumin-Corrected Anion Gap",
          href: "/calculators/corrected-anion-gap",
          bestFor: "Unmasking HAGMA in hypoalbuminemic patients.",
          limitation: "Correction factor is approximate.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Interpret the corrected anion gap together with arterial blood gas and the clinical context.",
  },

  "serum-osmolality": {
    clinicalPurpose:
      "Estimates serum osmolality from sodium, glucose, and blood urea nitrogen, supporting evaluation of electrolyte disorders, hydration status, and toxic ingestions.",
    howToUse: [
      "Enter serum sodium (mmol/L), glucose (mg/dL), and BUN (mg/dL).",
      "Review the calculated osmolality (normal ≈ 275–295 mOsm/kg).",
      "If a measured osmolality is available, compare it with the calculated value to derive the osmolar gap.",
    ],
    interpretation: {
      guide:
        "Normal serum osmolality is 275–295 mOsm/kg. Values below ~275 mOsm/kg suggest dilutional hyponatremia. Values ≥296 mOsm/kg are high and ≥320 mOsm/kg are critically elevated, indicating hypernatremia, hyperglycemia, uremia, or ingestion of osmotically active substances.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of hyponatremia and hypernatremia",
      "Assessment of hydration status",
      "Suspected toxic alcohol ingestion (paired with the osmolar gap)",
      "Guiding the rate of hypernatremia correction",
    ],
    whenNotToUse: [
      "Without a measured osmolality when calculating the osmolar gap",
      "When glucose and BUN are entered in different units than mg/dL",
      "As a substitute for measured osmolality when the clinical question demands it",
    ],
    limitations: [
      "Requires glucose and BUN in mg/dL; results are incorrect with other units.",
      "Does not account for ethanol — add ethanol/4.6 for effective osmolality.",
      "An elevated osmolar gap requires a measured osmolality from the laboratory.",
    ],
    example: {
      description:
        "A 45-year-old man with poor intake and nausea has sodium 140 mmol/L, glucose 200 mg/dL, and BUN 14 mg/dL.",
      inputs: {
        sodium: "140",
        glucose: "200",
        bun: "14",
      },
      expectedResult:
        "Calculated osmolality = 2(140) + 200/18 + 14/2.8 = 280 + 11.1 + 5 = 296.1 mOsm/kg — high, warranting a measured osmolality to assess the osmolar gap.",
    },
    clinicalSignificance:
      "Serum osmolality is a core component of evaluating sodium disorders, guides the interpretation of the osmolar gap for toxic alcohol exposure, and informs the rate of hypernatremia correction.",
    references: [
      {
        citation:
          "Dorwart WV, Chalmers T. Comparison of methods for calculating serum osmolality from chemical concentrations, and the prognostic value of such calculations. Clin Chem. 1975;21(2):190-194.",
        level: "Primary Study",
      },
      {
        citation:
          "UpToDate. Serum osmolality.",
        level: "Reference",
      },
    ],
    evidence: {
      source: "Emergency Medicine / Nephrology",
      reference: "Dorwart WV, Chalmers T. Clin Chem. 1975;21(2):190-194.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "Dorwart WV, Chalmers T. Clin Chem. 1975;21(2):190-194.",
        "Tintinalli's Emergency Medicine, 9th ed.",
      ],
    },
    faq: [
      {
        question:
          "What is the osmolar gap and why does it matter?",
        answer:
          "The osmolar gap is the difference between measured and calculated osmolality. An elevated gap (>10 mOsm/kg) suggests unmeasured osmotically active substances such as methanol, ethylene glycol, or ethanol.",
      },
      {
        question:
          "How does ethanol affect osmolality?",
        answer:
          "Ethanol contributes to measured osmolality but not to this calculated value. Add approximately ethanol (mg/dL)/4.6 to account for its contribution when estimating effective osmolality.",
      },
    ],
    comparison: {
      title: "Which Osmolality Calculator Should I Use?",
      calculators: [
        {
          name: "Serum Osmolality",
          href: "/calculators/serum-osmolality",
          bestFor: "Estimating osmolality from basic labs.",
          limitation: "Does not include ethanol or unmeasured osmoles.",
        },
        {
          name: "Osmolar Gap",
          href: "/calculators/osmolar-gap",
          bestFor: "Detecting toxic alcohol ingestion.",
          limitation: "Requires a measured osmolality.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Confirm critical results with a measured osmolality and interpret within the clinical context.",
  },

  "ttkg": {
    clinicalPurpose:
      "Calculates the transtubular potassium gradient (TTKG) to assess renal potassium handling, primarily in the evaluation of hyperkalemia.",
    howToUse: [
      "Collect simultaneous urine and plasma potassium, and urine and plasma osmolality.",
      "Enter urine potassium (mmol/L), plasma potassium (mmol/L), urine osmolality (mOsm/kg), and plasma osmolality (mOsm/kg).",
      "Review the TTKG against the reference range of 8–12.",
    ],
    interpretation: {
      guide:
        "A TTKG of 8–12 reflects a normal renal potassium response. In hyperkalemia, a TTKG <8 suggests impaired distal potassium secretion (e.g., hypoaldosteronism or acute kidney injury), while a value >10 suggests intact aldosterone-mediated potassium secretion.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluating hyperkalemia of unclear cause",
      "Assessing the renal response to potassium handling",
      "Differentiating hypoaldosteronism from other causes of hyperkalemia",
    ],
    whenNotToUse: [
      "In patients on potassium-wasting or potassium-sparing diuretics without caution",
      "As the sole diagnostic test — some experts question its physiological validity",
      "When urine and plasma values are not collected simultaneously",
    ],
    limitations: [
      "Interpretation may be confounded by diuretics and renal conditions.",
      "The physiological validity of TTKG has been questioned by some experts.",
      "Requires simultaneous collection of all four values for meaningful results.",
    ],
    example: {
      description:
        "A 70-year-old man with diabetic nephropathy has hyperkalemia (plasma K 5.0 mmol/L). Urine K is 40 mmol/L, urine osmolality 400 mOsm/kg, and plasma osmolality 300 mOsm/kg.",
      inputs: {
        urineK: "40",
        plasmaK: "5.0",
        urineOsmolality: "400",
        plasmaOsmolality: "300",
      },
      expectedResult:
        "TTKG = (40 × 300) / (5.0 × 400) = 12,000 / 2,000 = 6.0 — impaired K⁺ secretion (<8), suggesting hypoaldosteronism; check aldosterone and renin levels.",
    },
    clinicalSignificance:
      "TTKG helps localize the cause of hyperkalemia to the kidney by evaluating distal potassium secretion, guiding further evaluation for hypoaldosteronism and tubular disorders.",
    references: [
      {
        citation:
          "Kamel KS, Halperin ML. Transtubular potassium gradient: a useful tool in the assessment of hyperkalemia. J Am Soc Nephrol. 2001;12(8):1839-1844.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Nephrology Literature",
      reference: "Kamel KS, Halperin ML. J Am Soc Nephrol. 2001;12(8):1839-1844.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2001",
      references: [
        "Kamel KS, Halperin ML. J Am Soc Nephrol. 2001;12(8):1839-1844.",
      ],
    },
    faq: [
      {
        question:
          "What does a low TTKG mean in hyperkalemia?",
        answer:
          "A low TTKG (<8) in the setting of hyperkalemia suggests impaired distal potassium secretion, often due to hypoaldosteronism or distal tubular dysfunction.",
      },
      {
        question:
          "Is TTKG still used clinically?",
        answer:
          "TTKG remains a useful bedside tool, though some experts have questioned its physiological basis. It should be interpreted alongside other clinical data.",
      },
    ],
    comparison: {
      title: "Which Renal Function Calculator Should I Use?",
      calculators: [
        {
          name: "TTKG",
          href: "/calculators/ttkg",
          bestFor: "Assessing renal potassium secretion.",
          limitation: "Physiological validity has been questioned.",
        },
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor: "Distinguishing prerenal azotemia from intrinsic AKI.",
          limitation: "Does not assess potassium handling.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. TTKG should be interpreted within the full clinical context and not used alone.",
  },

  "calcium-phosphate-product": {
    clinicalPurpose:
      "Calculates the calcium–phosphate product to assess the risk of metastatic and vascular calcification, particularly in chronic kidney disease and dialysis patients.",
    howToUse: [
      "Enter serum calcium (mg/dL) and serum phosphate (mg/dL) from the same blood draw.",
      "Review the product against the target of <55 mg²/dL².",
      "For elevated results, evaluate mineral metabolism including PTH and vitamin D.",
    ],
    interpretation: {
      guide:
        "A product <55 mg²/dL² is acceptable. Values of 55–70 mg²/dL² are elevated with increased calcification risk, and values ≥70 mg²/dL² are critically elevated with high calcification risk.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Monitoring patients with chronic kidney disease",
      "Assessing vascular calcification risk in dialysis patients",
      "Guiding management of hyperphosphatemia",
    ],
    whenNotToUse: [
      "As a substitute for assessing PTH, vitamin D, or FGF23 status",
      "In isolation without considering the renal and mineral metabolism picture",
    ],
    limitations: [
      "Does not directly measure PTH, vitamin D, or vascular calcification burden.",
      "Interpretation should always be with the patient's renal and mineral metabolism status.",
      "Historical targets have been debated; KDIGO emphasizes managing underlying mineral abnormalities.",
    ],
    example: {
      description:
        "A 65-year-old woman on hemodialysis has serum calcium 9.5 mg/dL and phosphate 6.0 mg/dL.",
      inputs: {
        calcium: "9.5",
        phosphate: "6.0",
      },
      expectedResult:
        "Calcium–phosphate product = 9.5 × 6.0 = 57 mg²/dL² — elevated, indicating increased calcification risk; review phosphorus intake and phosphate binder use.",
    },
    clinicalSignificance:
      "An elevated calcium–phosphate product is associated with increased vascular calcification and cardiovascular morbidity, making it an important monitoring target in CKD-MBD management.",
    references: [
      {
        citation:
          "KDIGO. Clinical practice guideline update for the diagnosis, evaluation, prevention, and treatment of CKD-MBD. Kidney Int Suppl. 2017;7(1):1-59.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "KDIGO",
      reference: "KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017;7(1):1-59.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2017",
      references: [
        "KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017;7(1):1-59.",
      ],
    },
    faq: [
      {
        question:
          "How do I lower an elevated calcium–phosphate product?",
        answer:
          "Reduce dietary phosphorus, use phosphate binders, and optimize dialysis adequacy. Avoid excessive calcium-based binders to prevent hypercalcemia.",
      },
      {
        question:
          "Why does the product matter in CKD?",
        answer:
          "In CKD and dialysis patients, elevated calcium and phosphate drive vascular and soft-tissue calcification, which is linked to increased cardiovascular risk.",
      },
    ],
    comparison: {
      title: "Which Mineral Metabolism Calculator Should I Use?",
      calculators: [
        {
          name: "Calcium-Phosphate Product",
          href: "/calculators/calcium-phosphate-product",
          bestFor: "Assessing calcification risk in CKD.",
          limitation: "Does not measure PTH or vitamin D.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Estimating kidney function.",
          limitation: "Does not assess mineral metabolism.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Manage the underlying mineral abnormalities rather than treating the number alone.",
  },

  "a1c-eag-converter": {
    clinicalPurpose:
      "Converts between hemoglobin A1c and estimated average glucose (eAG) using the ADAG equation, helping patients relate A1c to familiar glucose readings.",
    howToUse: [
      "Enter the NGSP-standardized HbA1c value (%).",
      "Review the corresponding eAG in mg/dL.",
      "Use the ADA target of A1c <7% (eAG <154 mg/dL) for most non-pregnant adults as a starting point.",
    ],
    interpretation: {
      guide:
        "A1c <6.1% is in the normal range, 6.0–6.5% is the pre-diabetes range, and ≥6.5% is diagnostic of diabetes. An A1c of 7% corresponds to an eAG of approximately 154 mg/dL.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Explaining A1c results to patients in glucose units",
      "Setting and reviewing glycemic targets",
      "Translating between A1c and eAG in diabetes care",
    ],
    whenNotToUse: [
      "When A1c is unreliable (haemoglobinopathies, iron deficiency, pregnancy, altered red cell turnover)",
      "With assays not standardized to NGSP",
      "As a measure of glycemic variability",
    ],
    limitations: [
      "eAG is an average and does not capture glucose variability or hypoglycemic episodes.",
      "The ADAG formula applies to NGSP-standardized assays only.",
      "A1c may be falsely low or high with altered red blood cell lifespan.",
    ],
    example: {
      description:
        "A 52-year-old patient with type 2 diabetes has an HbA1c of 7.0%.",
      inputs: {
        a1c: "7",
      },
      expectedResult:
        "eAG = 28.7 × 7 − 46.7 = 154.2 mg/dL, consistent with the ADA target of <7% (eAG <154 mg/dL).",
    },
    clinicalSignificance:
      "Converting A1c to eAG translates a percentage into everyday glucose units, improving patient understanding and engagement in diabetes self-management.",
    references: [
      {
        citation:
          "Nathan DM, Kuenen J, Borg R, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.",
        level: "Primary Study",
      },
      {
        citation:
          "American Diabetes Association. Standards of Care in Diabetes. Diabetes Care. 2025.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "ADA / ADAG Study",
      reference: "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
        "ADA Standards of Care in Diabetes. 2025.",
      ],
    },
    faq: [
      {
        question:
          "What is the ADA target for most adults with diabetes?",
        answer:
          "The ADA recommends an HbA1c target of <7% (eAG <154 mg/dL) for most non-pregnant adults, with individualization based on age, comorbidities, and hypoglycemia risk.",
      },
      {
        question:
          "How accurate is the A1c to eAG conversion?",
        answer:
          "The ADAG equation explains most of the relationship between A1c and average glucose, but individual results vary with assay standardization and red cell turnover.",
      },
    ],
    comparison: {
      title: "Which Glycemic Calculator Should I Use?",
      calculators: [
        {
          name: "A1c ↔ eAG Converter",
          href: "/calculators/a1c-eag-converter",
          bestFor: "Bidirectional A1c ↔ eAG conversion.",
          limitation: "Same underlying ADAG formula.",
        },
        {
          name: "Estimated Average Glucose",
          href: "/calculators/estimated-average-glucose",
          bestFor: "A1c to eAG conversion only.",
          limitation: "Unidirectional.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Glycemic targets should be individualized and verified with appropriate laboratory assays.",
  },

  "estimated-average-glucose": {
    clinicalPurpose:
      "Estimates mean plasma glucose from HbA1c using the ADAG equation, translating A1c into a mg/dL value patients can compare with home glucose readings.",
    howToUse: [
      "Enter the NGSP-standardized HbA1c value (%).",
      "Review the estimated average glucose in mg/dL.",
      "Interpret against the normal range of 70–140 mg/dL and the ADA target of eAG ≈154 mg/dL.",
    ],
    interpretation: {
      guide:
        "eAG <140 mg/dL is normal, 140–200 mg/dL is the pre-diabetic range, and ≥200 mg/dL is in the diabetic range. eAG reflects average glucose over the preceding 2–3 months.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Translating A1c into familiar glucose units for patient education",
      "Assessing overall glycemic control over 2–3 months",
      "Setting and reviewing glycemic targets",
    ],
    whenNotToUse: [
      "In conditions altering red cell lifespan (iron deficiency, sickle cell trait, pregnancy)",
      "As a substitute for CGM or self-monitoring data when variability is the question",
    ],
    limitations: [
      "Derived from continuous glucose monitoring studies and may differ from finger-stick averages.",
      "Does not reflect glucose variability or hypoglycemic episodes.",
      "Affected by conditions that change red blood cell survival.",
    ],
    example: {
      description:
        "A 60-year-old patient with impaired glucose tolerance has an HbA1c of 6.0%.",
      inputs: {
        a1c: "6.0",
      },
      expectedResult:
        "eAG = 28.7 × 6.0 − 46.7 = 125.5 mg/dL — normal average glucose range.",
    },
    clinicalSignificance:
      "eAG converts A1c into a practical mg/dL value, improving patient comprehension and facilitating shared decision-making about glycemic control.",
    references: [
      {
        citation:
          "Nathan DM, Kuenen J, Borg R, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "ADA / ADAG Study",
      reference: "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      ],
    },
    faq: [
      {
        question:
          "What is estimated average glucose?",
        answer:
          "eAG converts HbA1c into the estimated average blood glucose in mg/dL over the preceding 2–3 months, making it easier for patients to relate A1c to home glucose readings.",
      },
      {
        question:
          "What A1c corresponds to an eAG of 126 mg/dL?",
        answer:
          "An eAG of 126 mg/dL corresponds to an HbA1c of approximately 6.0% using the ADAG formula.",
      },
    ],
    comparison: {
      title: "Which Glycemic Calculator Should I Use?",
      calculators: [
        {
          name: "Estimated Average Glucose",
          href: "/calculators/estimated-average-glucose",
          bestFor: "Converting A1c to mg/dL average.",
          limitation: "Unidirectional.",
        },
        {
          name: "A1c ↔ eAG Converter",
          href: "/calculators/a1c-eag-converter",
          bestFor: "Bidirectional conversion.",
          limitation: "Same underlying formula.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use NGSP-standardized A1c values and interpret within the clinical context.",
  },

  "bmi-for-pediatrics": {
    clinicalPurpose:
      "Calculates BMI for children and adolescents (ages 2–20) and classifies weight status using CDC 2000 BMI-for-age percentile references.",
    howToUse: [
      "Enter the child's age (2–20 years), sex, weight (kg), and height (cm).",
      "Review the BMI and the BMI-for-age percentile.",
      "Classify using the percentile: <5th underweight, 5th–<85th healthy, 85th–<95th overweight, ≥95th obesity.",
    ],
    interpretation: {
      guide:
        "Pediatric BMI must be interpreted by age- and sex-specific percentiles, not raw BMI. Underweight <5th percentile; healthy weight 5th–<85th; overweight 85th–<95th; obesity ≥95th percentile.",
      sexSpecific: true,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Growth and weight assessment in children and adolescents aged 2–20 years",
      "Screening for overweight, obesity, and underweight",
      "Monitoring growth trajectory over time",
    ],
    whenNotToUse: [
      "In children under 2 years — use weight-for-length WHO charts",
      "Without age and sex to reference percentiles",
      "As a direct measure of body fat",
    ],
    limitations: [
      "BMI does not distinguish fat from muscle mass.",
      "Percentile references are population-based and may not apply to all ethnic groups.",
      "Clinical assessment should include growth velocity, pubertal stage, and family history.",
    ],
    example: {
      description:
        "A 10-year-old boy weighs 35 kg and is 140 cm tall.",
      inputs: {
        age: "10",
        sex: "1",
        weight: "35",
        height: "140",
      },
      expectedResult:
        "BMI = 35 / (1.40)² = 17.9 kg/m², at the 94.3rd percentile — Overweight (85th–<95th percentile).",
    },
    clinicalSignificance:
      "BMI-for-age percentiles are the standard screening tool for pediatric weight status, informing interventions for childhood obesity and its metabolic consequences.",
    references: [
      {
        citation:
          "Kuczmarski RJ, Ogden CL, Guo SS, et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital Health Stat 11. 2002;(246):1-190.",
        level: "Reference Standard",
      },
    ],
    evidence: {
      source: "CDC Growth Charts",
      reference: "Kuczmarski RJ, et al. Vital Health Stat 11. 2002;(246):1-190.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2000",
      references: [
        "Kuczmarski RJ, et al. Vital Health Stat 11. 2002;(246):1-190.",
      ],
    },
    faq: [
      {
        question:
          "Why can't I interpret a pediatric BMI like an adult BMI?",
        answer:
          "Children are still growing, so BMI changes with age and sex. Percentiles relative to age- and sex-matched CDC references are required for correct interpretation.",
      },
      {
        question:
          "When is pediatric BMI-for-age not appropriate?",
        answer:
          "BMI-for-age percentiles are not valid for children under 2 years of age, where weight-for-length charts should be used instead.",
      },
    ],
    comparison: {
      title: "Which BMI Calculator Should I Use?",
      calculators: [
        {
          name: "Pediatric BMI",
          href: "/calculators/bmi-for-pediatrics",
          bestFor: "Children and adolescents aged 2–20 years.",
          limitation: "Requires age and sex for percentile interpretation.",
        },
        {
          name: "BMI",
          href: "/calculators/bmi",
          bestFor: "Adults with fixed BMI thresholds.",
          limitation: "Not applicable to children.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Pediatric weight assessment should also consider growth velocity, pubertal stage, and family history.",
  },

  "lean-body-weight": {
    clinicalPurpose:
      "Estimates lean body weight using the Boer formula, useful for drug dosing, anesthesia, and nutritional assessment.",
    howToUse: [
      "Select the patient's sex.",
      "Enter height (cm) and weight (kg).",
      "Review the estimated lean body weight in kg.",
      "Use it for dosing decisions only where the drug-specific guidance supports lean body weight.",
    ],
    interpretation: {
      guide:
        "Lean body weight approximates the weight of body mass excluding fat. Male: 0.407 × weight + 0.267 × height − 19.2. Female: 0.252 × weight + 0.473 × height − 48.3.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Drug dosing in medications where lean body weight is the size descriptor (e.g., certain anesthetics and antimicrobials)",
      "Nutritional and metabolic assessment",
      "Anesthesia dosing considerations",
    ],
    whenNotToUse: [
      "Where the drug label specifies actual or ideal body weight",
      "As a direct measure of body fat or muscle mass",
      "Without confirming the drug-specific dosing guidance",
    ],
    limitations: [
      "The Boer formula is an estimate validated in adult populations.",
      "May be less accurate at the extremes of body size.",
      "Does not capture hydration status or muscle mass directly.",
    ],
    example: {
      description:
        "A 40-year-old man is 180 cm tall and weighs 80 kg.",
      inputs: {
        sex: "male",
        height: "180",
        weight: "80",
      },
      expectedResult:
        "LBW = 0.407 × 80 + 0.267 × 180 − 19.2 = 61.4 kg.",
    },
    clinicalSignificance:
      "Lean body weight better reflects drug distribution volume than total body weight in some medications, reducing dosing error in patients at the extremes of body size.",
    references: [
      {
        citation:
          "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Am J Physiol. 1984;247(4):F632-F635.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Body Composition Literature",
      reference: "Boer P. Am J Physiol. 1984;247(4):F632-F635.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1984",
      references: [
        "Boer P. Am J Physiol. 1984;247(4):F632-F635.",
      ],
    },
    faq: [
      {
        question:
          "When should lean body weight be used for dosing?",
        answer:
          "Use it when the drug-specific labeling or institutional guidance specifies lean body weight as the dosing size descriptor — it is common in some anesthetic and antimicrobial regimens.",
      },
      {
        question:
          "How does lean body weight differ from ideal body weight?",
        answer:
          "Ideal body weight is a height-based reference, whereas lean body weight is an estimate of the fat-free mass and therefore also incorporates measured weight.",
      },
    ],
    comparison: {
      title: "Which Body Weight Calculator Should I Use?",
      calculators: [
        {
          name: "Lean Body Weight",
          href: "/calculators/lean-body-weight",
          bestFor: "Estimating fat-free mass for dosing.",
          limitation: "Formula-based estimate only.",
        },
        {
          name: "Ideal Body Weight",
          href: "/calculators/ideal-body-weight",
          bestFor: "Height-based dosing reference.",
          limitation: "Ignores actual weight.",
        },
        {
          name: "Adjusted Body Weight",
          href: "/calculators/adjusted-body-weight",
          bestFor: "Dosing in overweight and obese adults.",
          limitation: "Empirical adjustment factor.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dosing decisions must follow drug-specific labeling and institutional protocols.",
  },

  "mifflin-st-jeor": {
    clinicalPurpose:
      "Estimates resting energy expenditure (REE) using the Mifflin-St Jeor equation for nutritional assessment and weight management.",
    howToUse: [
      "Select sex and enter age (years), weight (kg), and height (cm).",
      "Review the estimated resting energy expenditure in kcal/day.",
      "Multiply by an activity factor to estimate total daily calorie needs.",
    ],
    interpretation: {
      guide:
        "REE is the energy required at rest. Mifflin-St Jeor: male = 10 × weight + 6.25 × height − 5 × age + 5; female = 10 × weight + 6.25 × height − 5 × age − 161.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Estimating resting energy expenditure in healthy and overweight adults",
      "Baseline for calorie planning in weight management",
      "Nutritional assessment in clinical practice",
    ],
    whenNotToUse: [
      "In critically ill patients where indirect calorimetry is preferred",
      "In children (formula validated in adults)",
      "As a substitute for individualized metabolic assessment",
    ],
    limitations: [
      "Estimate only; actual needs vary with body composition and clinical status.",
      "Less accurate at extremes of body size.",
      "Does not account for illness, activity, or thermic effect of food.",
    ],
    example: {
      description:
        "A 40-year-old man weighs 80 kg, is 180 cm tall, and is sedentary.",
      inputs: {
        sex: "male",
        age: "40",
        weight: "80",
        height: "180",
      },
      expectedResult:
        "REE = 10 × 80 + 6.25 × 180 − 5 × 40 + 5 = 1,730 kcal/day.",
    },
    clinicalSignificance:
      "The Mifflin-St Jeor equation is one of the most accurate predictive equations for resting energy expenditure and is widely used to anchor nutrition and weight-management plans.",
    references: [
      {
        citation:
          "Mifflin MD, St Jeor ST, Hill LA, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "Nutrition Literature",
      reference: "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1990",
      references: [
        "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
      ],
    },
    faq: [
      {
        question:
          "How does Mifflin-St Jeor compare to Harris-Benedict?",
        answer:
          "Mifflin-St Jeor is generally considered more accurate than the original Harris-Benedict equation in modern, overweight populations and is preferred by many nutrition guidelines.",
      },
      {
        question:
          "How do I convert REE to total daily calories?",
        answer:
          "Multiply REE by an activity factor — approximately 1.2 for sedentary, 1.375 for light activity, 1.55 for moderate, and 1.725 for active individuals.",
      },
    ],
    comparison: {
      title: "Which Energy Expenditure Calculator Should I Use?",
      calculators: [
        {
          name: "Mifflin-St Jeor",
          href: "/calculators/mifflin-st-jeor",
          bestFor: "Modern REE estimation in adults.",
          limitation: "Adult populations only.",
        },
        {
          name: "Harris-Benedict",
          href: "/calculators/harris-benedict",
          bestFor: "Historical BMR estimation.",
          limitation: "May overestimate in overweight patients.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. REE is an estimate and nutrition plans should be individualized.",
  },

  "harris-benedict": {
    clinicalPurpose:
      "Estimates basal metabolic rate (BMR) using the Harris-Benedict equation for nutritional assessment and calorie planning.",
    howToUse: [
      "Select sex and enter age (years), weight (kg), and height (cm).",
      "Review the estimated BMR in kcal/day.",
      "Multiply by an activity factor for total daily energy needs.",
    ],
    interpretation: {
      guide:
        "BMR is the energy expended at complete rest. Harris-Benedict (revised): male = 88.362 + 13.397 × weight + 4.799 × height − 5.677 × age; female = 447.593 + 9.247 × weight + 3.098 × height − 4.33 × age.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Estimating basal metabolic rate in adults",
      "Baseline calorie needs for weight management",
      "Nutritional assessment when indirect calorimetry is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients needing measured energy expenditure",
      "In children",
      "As a substitute for individualized metabolic assessment",
    ],
    limitations: [
      "May overestimate energy needs in overweight and obese patients.",
      "Estimate only; individual needs vary by body composition and clinical status.",
      "Original equation dates from 1918–1919; revised coefficients improved accuracy.",
    ],
    example: {
      description:
        "A 40-year-old man weighs 80 kg, is 180 cm tall, and is sedentary.",
      inputs: {
        sex: "male",
        age: "40",
        weight: "80",
        height: "180",
      },
      expectedResult:
        "BMR = 88.362 + 13.397 × 80 + 4.799 × 180 − 5.677 × 40 ≈ 1,796.9 kcal/day.",
    },
    clinicalSignificance:
      "The Harris-Benedict equation is a historical cornerstone of energy estimation and remains a commonly used reference for baseline calorie planning.",
    references: [
      {
        citation:
          "Harris JA, Benedict FG. A biometric study of basal metabolism in man. Washington, DC: Carnegie Institution of Washington; 1919.",
        level: "Original Description",
      },
      {
        citation:
          "Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40(1):168-182.",
        level: "Revision",
      },
    ],
    evidence: {
      source: "Nutrition Literature",
      reference: "Roza AM, Shizgal HM. Am J Clin Nutr. 1984;40(1):168-182.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1919",
      references: [
        "Harris JA, Benedict FG. Carnegie Institution of Washington. 1919.",
        "Roza AM, Shizgal HM. Am J Clin Nutr. 1984;40(1):168-182.",
      ],
    },
    faq: [
      {
        question:
          "What is the difference between BMR and REE?",
        answer:
          "BMR is measured under strictly standardized resting conditions, while REE is measured under slightly less strict conditions. In practice the terms are often used interchangeably in equations.",
      },
      {
        question:
          "How do I calculate total daily energy needs?",
        answer:
          "Multiply BMR by an activity factor (e.g., 1.2 sedentary, 1.55 moderate activity, 1.725 very active) to estimate total daily energy expenditure.",
      },
    ],
    comparison: {
      title: "Which Energy Expenditure Calculator Should I Use?",
      calculators: [
        {
          name: "Harris-Benedict",
          href: "/calculators/harris-benedict",
          bestFor: "Historical BMR estimation.",
          limitation: "May overestimate in overweight patients.",
        },
        {
          name: "Mifflin-St Jeor",
          href: "/calculators/mifflin-st-jeor",
          bestFor: "Modern REE estimation.",
          limitation: "Adult populations only.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Energy estimates should be individualized and verified clinically.",
  },

  "sodium-deficit": {
    clinicalPurpose:
      "Estimates the total sodium deficit to guide hyponatremia correction, helping clinicians plan replacement while avoiding over-correction.",
    howToUse: [
      "Enter the patient's weight (kg), current serum sodium, and target sodium (mmol/L).",
      "Review the estimated sodium deficit in mmol.",
      "Correct slowly — limit to 8–10 mmol/L in the first 24 hours to reduce the risk of osmotic demyelination.",
    ],
    interpretation: {
      guide:
        "The sodium deficit is calculated as 0.6 × weight × (target Na − current Na) using an estimated total body water of 0.6 × weight. Values are interpreted against the clinical urgency of correction rather than a fixed normal range.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Planning correction of chronic hyponatremia",
      "Estimating sodium replacement needs in hypovolemic hyponatremia",
      "Guiding the rate of sodium correction in hospitalized patients",
    ],
    whenNotToUse: [
      "As the sole guide for acute severe symptomatic hyponatremia — use hypertonic saline and institutional protocols",
      "Without accounting for ongoing losses and intake",
      "When the desired target exceeds safe correction limits",
    ],
    limitations: [
      "Uses an estimated total body water of 0.6 × weight; actual TBW varies with body composition.",
      "Does not account for ongoing free water intake or losses.",
      "Over-correction risk requires close monitoring regardless of the calculated deficit.",
    ],
    example: {
      description:
        "A 70 kg man with chronic hyponatremia has a serum sodium of 125 mmol/L; the goal is 135 mmol/L.",
      inputs: {
        weight: "70",
        currentNa: "125",
        desiredNa: "135",
      },
      expectedResult:
        "Sodium deficit = 0.6 × 70 × (135 − 125) = 420 mmol. Correct slowly, limiting the rise to 8–10 mmol/L in the first 24 hours.",
    },
    clinicalSignificance:
      "Estimating the sodium deficit helps clinicians replace sodium methodically and avoid osmotic demyelination syndrome caused by over-rapid correction.",
    references: [
      {
        citation:
          "Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.",
        level: "Review",
      },
      {
        citation:
          "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372(1):55-65.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Nephrology Literature",
      reference: "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1581-1589.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2000",
      references: [
        "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1581-1589.",
        "Sterns RH. N Engl J Med. 2015;372(1):55-65.",
      ],
    },
    faq: [
      {
        question:
          "How fast should sodium be corrected?",
        answer:
          "For chronic hyponatremia, limit correction to 8–10 mmol/L in the first 24 hours and 18 mmol/L in 48 hours to reduce the risk of osmotic demyelination syndrome.",
      },
      {
        question:
          "Why does the estimate use 0.6 × weight?",
        answer:
          "Total body water is approximately 60% of body weight in men and 50% in women. This calculator uses 0.6 × weight as a default estimate.",
      },
    ],
    comparison: {
      title: "Which Sodium Disorder Calculator Should I Use?",
      calculators: [
        {
          name: "Sodium Deficit",
          href: "/calculators/sodium-deficit",
          bestFor: "Planning hyponatremia correction.",
          limitation: "Does not account for ongoing losses.",
        },
        {
          name: "Free Water Deficit",
          href: "/calculators/free-water-deficit",
          bestFor: "Estimating water replacement in hypernatremia.",
          limitation: "Addresses hypernatremia, not hyponatremia.",
        },
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor: "Adjusting sodium for hyperglycemia.",
          limitation: "Does not estimate the sodium deficit.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Sodium correction must be guided by frequent monitoring and institutional protocols.",
  },

  "heart-rate": {
    clinicalPurpose:
      "Calculates heart rate from the number of beats counted over a measured time interval.",
    howToUse: [
      "Count the number of beats over a measured interval (e.g., 15, 30, or 60 seconds).",
      "Enter the beat count and the time in minutes.",
      "Review the calculated heart rate in beats per minute.",
    ],
    interpretation: {
      guide:
        "A normal resting heart rate for adults is 60–100 bpm. Values below 60 bpm may indicate bradycardia, and values above 100 bpm may indicate tachycardia, though athletes and certain medications affect these thresholds.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Bedside calculation of heart rate from pulse counting",
      "Estimating heart rate from ECG or pulse when only a short interval is counted",
      "Rapid vital sign assessment",
    ],
    whenNotToUse: [
      "For a detailed ECG rhythm diagnosis",
      "When the rhythm is grossly irregular — a longer count interval is preferable",
    ],
    limitations: [
      "Accuracy depends on the counting interval; longer intervals are more accurate.",
      "The calculator reports beats per minute but does not diagnose the rhythm.",
      "Physiological interpretation requires clinical context (age, medications, fitness).",
    ],
    example: {
      description:
        "A nurse counts 72 beats over 1 minute in an adult patient.",
      inputs: {
        beats: "72",
        time: "1",
      },
      expectedResult:
        "Heart rate = 72 / 1 = 72 bpm, within the normal adult range of 60–100 bpm.",
    },
    clinicalSignificance:
      "Heart rate is a fundamental vital sign used to assess hemodynamic status, guide further evaluation of bradycardia or tachycardia, and monitor response to treatment.",
    references: [
      {
        citation:
          "Al-Khatib SM, et al. 2017 AHA/ACC/HRS guideline for management of patients with ventricular arrhythmias and sudden cardiac death. Circulation. 2018.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "Cardiology Literature",
      reference: "AHA/ACC Guidelines on heart rhythm and rate assessment.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "AHA/ACC/HRS Guideline. Circulation. 2018.",
      ],
    },
    faq: [
      {
        question:
          "What is a normal resting heart rate?",
        answer:
          "The normal resting heart rate for adults is 60–100 bpm. Well-trained athletes may have rates below 60 bpm without pathology.",
      },
      {
        question:
          "When is a longer count interval better?",
        answer:
          "For irregular rhythms such as atrial fibrillation, count over 30–60 seconds to obtain a more accurate average heart rate.",
      },
    ],
    comparison: {
      title: "Which Vital Sign Calculator Should I Use?",
      calculators: [
        {
          name: "Heart Rate",
          href: "/calculators/heart-rate",
          bestFor: "Computing bpm from a beat count.",
          limitation: "Does not diagnose rhythm.",
        },
        {
          name: "Mean Arterial Pressure",
          href: "/calculators/map",
          bestFor: "Assessing tissue perfusion pressure.",
          limitation: "Separate from heart rate.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Heart rate interpretation requires clinical context and is not a substitute for ECG when arrhythmia is suspected.",
  },

  "waist-to-hip-ratio": {
    clinicalPurpose:
      "Calculates waist-to-hip ratio (WHR) to assess central adiposity and cardiovascular risk.",
    howToUse: [
      "Measure waist circumference at the narrowest point between the rib cage and iliac crest.",
      "Measure hip circumference at the widest point of the buttocks.",
      "Divide waist by hip to obtain the ratio.",
    ],
    interpretation: {
      guide:
        "WHR classifies central adiposity and risk using sex-specific thresholds. For males, <0.90 is low risk, 0.90–0.99 moderate risk, and ≥1.0 high risk. For females, WHO thresholds are <0.85 low risk and ≥0.85 increased risk.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessing central (abdominal) adiposity",
      "Cardiovascular and type 2 diabetes risk assessment",
      "Metabolic syndrome evaluation",
    ],
    whenNotToUse: [
      "As the only cardiovascular risk assessment",
      "Without standardized measurement technique",
    ],
    limitations: [
      "Measurement technique must be standardized for consistent results.",
      "Thresholds differ between sexes and populations.",
      "Should be interpreted alongside blood pressure, lipids, and glucose.",
    ],
    example: {
      description:
        "A 48-year-old man has a waist circumference of 95 cm and hip circumference of 100 cm.",
      inputs: {
        waist: "95",
        hip: "100",
      },
      expectedResult:
        "WHR = 95 / 100 = 0.95 — moderate cardiovascular risk for a male.",
    },
    clinicalSignificance:
      "Waist-to-hip ratio captures central adiposity, which is a strong predictor of cardiovascular disease and type 2 diabetes, complementing BMI in risk assessment.",
    references: [
      {
        citation:
          "World Health Organization. Waist circumference and waist-hip ratio: report of a WHO expert consultation. Geneva: WHO; 2008.",
        level: "Guideline",
      },
      {
        citation:
          "Yusuf S, et al. Obesity and the risk of myocardial infarction in 27,000 participants from 52 countries. Lancet. 2005;366(9497):1640-1649.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "WHO",
      reference: "WHO. Waist circumference and waist-hip ratio. Geneva: WHO; 2008.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "WHO. Waist circumference and waist-hip ratio. 2008.",
        "Yusuf S, et al. Lancet. 2005;366(9497):1640-1649.",
      ],
    },
    faq: [
      {
        question:
          "What does waist-to-hip ratio measure?",
        answer:
          "WHR measures the distribution of body fat — specifically central or abdominal adiposity, which is a strong predictor of cardiovascular and metabolic risk.",
      },
      {
        question:
          "What are the sex-specific thresholds?",
        answer:
          "For males, WHR <0.90 is low risk, 0.90–0.99 moderate risk, and ≥1.0 high risk. For females, WHO defines <0.85 as low risk and ≥0.85 as increased risk.",
      },
    ],
    comparison: {
      title: "Which Body Composition Calculator Should I Use?",
      calculators: [
        {
          name: "Waist-to-Hip Ratio",
          href: "/calculators/waist-to-hip-ratio",
          bestFor: "Assessing central adiposity.",
          limitation: "Requires standardized measurement.",
        },
        {
          name: "BMI",
          href: "/calculators/bmi",
          bestFor: "General obesity screening.",
          limitation: "Does not capture fat distribution.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. WHR should be interpreted alongside other cardiovascular risk factors.",
  },

  "calorie-requirement": {
    clinicalPurpose:
      "Estimates total daily calorie requirement by multiplying an individual's basal metabolic rate (BMR) by an activity factor.",
    howToUse: [
      "Obtain a basal metabolic rate — for example from the Mifflin-St Jeor or Harris-Benedict calculator.",
      "Select an activity factor reflecting the patient's typical daily activity (e.g., 1.2 sedentary, 1.55 moderate, 1.725 active).",
      "Enter the BMR (kcal/day) and the chosen activity factor.",
      "Review the estimated daily calorie requirement in kcal/day.",
    ],
    interpretation: {
      guide:
        "The result estimates total daily energy expenditure. Multiplying BMR by an activity factor converts resting energy needs into a daily calorie target: sedentary ≈ 1.2× BMR, light ≈ 1.375×, moderate ≈ 1.55×, very active ≈ 1.725×, extremely active ≈ 1.9×.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Estimating daily calorie targets in nutrition and weight management",
      "Planning dietary energy goals in stable outpatients",
      "As a starting point when indirect calorimetry is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients, where measured energy expenditure (indirect calorimetry) is preferred",
      "As a substitute for individualized dietary prescription",
      "Without an appropriate BMR input — the result depends entirely on the BMR entered",
    ],
    limitations: [
      "The accuracy of the estimate depends on the accuracy of the BMR entered.",
      "Does not account for illness, fever, body composition, or ongoing metabolic stress.",
      "Activity factors are approximations and vary between individuals.",
    ],
    example: {
      description:
        "A 40-year-old man has a resting energy expenditure (Mifflin-St Jeor) of 1,730 kcal/day and is moderately active.",
      inputs: {
        bmr: "1730",
        activity: "1.55",
      },
      expectedResult:
        "Daily calorie requirement = 1,730 × 1.55 = 2,682 kcal/day.",
    },
    clinicalSignificance:
      "Daily calorie requirements are the foundation of nutrition planning; estimating them from BMR and activity lets clinicians set rational energy targets rather than relying on guesswork.",
    references: [
      {
        citation:
          "Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids (Macronutrients). Washington, DC: The National Academies Press; 2005.",
        level: "Guideline",
      },
      {
        citation:
          "Food and Agriculture Organization / World Health Organization / United Nations University. Human Energy Requirements: Report of a Joint FAO/WHO/UNU Expert Consultation. Rome: FAO; 2004.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "FAO/WHO/UNU & IOM",
      reference: "FAO/WHO/UNU Human Energy Requirements. 2004.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2004",
      references: [
        "FAO/WHO/UNU. Human Energy Requirements. 2004.",
        "Institute of Medicine. Dietary Reference Intakes for Energy. 2005.",
      ],
    },
    faq: [
      {
        question: "What is an activity factor?",
        answer:
          "An activity factor reflects how much a person moves relative to resting energy expenditure — roughly 1.2 for sedentary, 1.375 light, 1.55 moderate, 1.725 active, and 1.9 extremely active individuals.",
      },
      {
        question: "How do I get the BMR input?",
        answer:
          "BMR (or REE) can be estimated with the Mifflin-St Jeor or Harris-Benedict calculator, which use sex, age, weight, and height.",
      },
    ],
    comparison: {
      title: "Which Energy Calculators Work Together?",
      calculators: [
        {
          name: "Calorie Requirement",
          href: "/calculators/calorie-requirement",
          bestFor: "Daily calorie targets from a known BMR.",
          limitation: "Requires a BMR input.",
        },
        {
          name: "Mifflin-St Jeor",
          href: "/calculators/mifflin-st-jeor",
          bestFor: "Estimating the resting energy expenditure input.",
          limitation: "Adult populations only.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Calorie targets are estimates and nutrition plans should be individualized.",
  },

  "fluid-requirement": {
    clinicalPurpose:
      "Estimates a simple daily maintenance fluid requirement using a fixed 35 mL/kg/day rule based on body weight.",
    howToUse: [
      "Enter the patient's weight in kg.",
      "Review the estimated maintenance fluid volume in mL/day.",
      "Adjust for clinical context — the result is a starting estimate only.",
    ],
    interpretation: {
      guide:
        "The result approximates daily maintenance fluid needs at 35 mL/kg/day. For a 70 kg adult this is 2,450 mL/day (~2.5 L), consistent with typical adult maintenance estimates.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Rough daily maintenance fluid planning in adults",
      "Estimating baseline hydration needs in stable patients",
      "As a teaching estimate for maintenance fluid volumes",
    ],
    whenNotToUse: [
      "In patients with ongoing fluid losses, fever, vomiting, diarrhea, or drains",
      "In heart failure, renal impairment, or fluid overload states",
      "As a substitute for individualized fluid prescription",
    ],
    limitations: [
      "A fixed per-kilogram estimate cannot capture individual variation in losses or clinical status.",
      "Does not account for electrolyte content or route of administration.",
      "Weight-based rules are approximations and require clinical judgment.",
    ],
    example: {
      description:
        "A 70 kg adult requires an estimate of daily maintenance fluid.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Fluid requirement = 70 × 35 = 2,450 mL/day (~2.5 L).",
    },
    clinicalSignificance:
      "Simple weight-based rules give clinicians a rapid baseline for maintenance fluid planning, helping avoid both under- and over-hydration in routine care.",
    references: [
      {
        citation:
          "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Guideline CG174. London: NICE; 2013 (updated 2017).",
        level: "Guideline",
      },
      {
        citation:
          "Clinical practice references on adult maintenance fluid management.",
        level: "Expert Consensus",
      },
    ],
    evidence: {
      source: "NICE CG174",
      reference: "NICE. Intravenous fluid therapy in adults in hospital. CG174; 2013.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2017",
      references: [
        "NICE CG174. Intravenous fluid therapy in adults in hospital. 2013.",
      ],
    },
    faq: [
      {
        question: "Why 35 mL/kg/day?",
        answer:
          "It is a common adult approximation for daily maintenance water needs. The Maintenance Fluids calculator uses the more granular 100/50/20 weight-based rule.",
      },
    ],
    comparison: {
      title: "Which Fluid Calculator Should I Use?",
      calculators: [
        {
          name: "Fluid Requirement",
          href: "/calculators/fluid-requirement",
          bestFor: "Quick daily volume estimate in adults.",
          limitation: "Fixed per-kg rule; no hourly detail.",
        },
        {
          name: "Maintenance Fluids",
          href: "/calculators/maintenance-fluids",
          bestFor: "Weight-based 100/50/20 maintenance rule.",
          limitation: "Assumes no significant ongoing losses.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fluid management must account for the individual's clinical status, losses, and comorbidities.",
  },

  "maintenance-fluids": {
    clinicalPurpose:
      "Estimates daily maintenance fluid volume using the weight-based 100/50/20 rule: 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg thereafter.",
    howToUse: [
      "Enter the patient's weight in kg.",
      "Review the estimated maintenance fluid volume in mL/day.",
      "Convert to an hourly rate if prescribing (divide by 24).",
    ],
    interpretation: {
      guide:
        "The 100/50/20 rule (Holliday-Segar) estimates maintenance water needs by body weight. For a 70 kg adult: 1,000 + 500 + 1,000 = 2,500 mL/day.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Estimating maintenance fluid volume in children and adults",
      "As a starting point for daily fluid prescription",
      "Teaching the classic Holliday-Segar maintenance approach",
    ],
    whenNotToUse: [
      "In patients with ongoing losses, hypovolemia, or fluid overload",
      "In heart failure, renal impairment, or states requiring fluid restriction",
      "As a substitute for individualized fluid prescription",
    ],
    limitations: [
      "The rule assumes no significant ongoing fluid losses and normal renal function.",
      "Does not provide electrolyte composition or route guidance.",
      "Designed for maintenance needs, not replacement of deficits.",
    ],
    example: {
      description:
        "A 70 kg adult needs an estimate of daily maintenance fluids.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Maintenance fluids = 100 mL/kg × 10 kg + 50 mL/kg × 10 kg + 20 mL/kg × 50 kg = 2,500 mL/day.",
    },
    clinicalSignificance:
      "The Holliday-Segar 100/50/20 rule remains a widely taught and clinically used starting point for maintenance fluid volumes across children and adults.",
    references: [
      {
        citation:
          "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832.",
        level: "Original Description",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Guideline CG174. London: NICE; 2013.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "Holliday & Segar",
      reference: "Holliday MA, Segar WE. Pediatrics. 1957;19(5):823-832.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1957",
      references: [
        "Holliday MA, Segar WE. Pediatrics. 1957;19(5):823-832.",
        "NICE CG174. Intravenous fluid therapy in adults in hospital. 2013.",
      ],
    },
    faq: [
      {
        question: "How is the 100/50/20 rule applied?",
        answer:
          "The first 10 kg of body weight contributes 100 mL/kg/day, the second 10 kg 50 mL/kg/day, and every kilogram above 20 kg contributes 20 mL/kg/day. The three amounts are summed.",
      },
      {
        question: "How do I convert mL/day to an hourly rate?",
        answer:
          "Divide the daily volume by 24. For 2,500 mL/day this is approximately 104 mL/hour.",
      },
    ],
    comparison: {
      title: "Which Fluid Calculator Should I Use?",
      calculators: [
        {
          name: "Maintenance Fluids",
          href: "/calculators/maintenance-fluids",
          bestFor: "Weight-based 100/50/20 maintenance rule.",
          limitation: "Assumes no significant ongoing losses.",
        },
        {
          name: "Fluid Requirement",
          href: "/calculators/fluid-requirement",
          bestFor: "Quick daily volume estimate in adults.",
          limitation: "Fixed per-kg rule; no hourly detail.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Maintenance fluid plans must account for clinical status, losses, and organ function.",
  },
};