/**
 * Batch 4 — Taxonomy Content
 *
 * Provides concise, factual descriptions for each category and specialty,
 * plus helpers for cross-linking taxonomies derived from the calculator registry.
 *
 * Descriptions are informational and derived from the calculators in each
 * group. They do not make clinical recommendations or imply diagnosis.
 */

import {
  calculatorRegistry,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
  getCategories,
  getSpecialties,
} from "@/lib/calculators/registry";

/* ------------------------------------------------------------------ */
/*  Category descriptions                                              */
/* ------------------------------------------------------------------ */

export const categoryDescriptions: Record<string, string> = {
  Anthropometry:
    "Anthropometric calculators for assessing body composition, nutritional status, and central adiposity. This category includes tools for calculating body mass index (BMI), body surface area (BSA) for drug dosing and burn assessment, ideal and adjusted body weight for clinical dosing decisions, and waist-to-hip ratio for cardiometabolic risk stratification. These measurements are foundational in nutrition screening, pharmacokinetic dosing, and obesity-related risk assessment. Most require only height and weight, making them practical for outpatient and inpatient settings alike. Interpretations should account for patient age, sex, ethnicity, and clinical context — for example, BMI thresholds differ between paediatric and adult populations, and waist-to-hip ratio cutoffs vary by sex.",

  Cardiology:
    "Cardiac risk assessment and haemodynamic calculators spanning acute coronary syndromes, atrial fibrillation management, heart failure evaluation, and perioperative cardiac risk. Tools include the GRACE and TIMI scores for ACS prognosis, CHA₂DS₂-VASc for stroke risk in AF, HAS-BLED for bleeding risk on anticoagulation, the DAPT score for dual antiplatelet duration, and the RCRI for preoperative cardiac evaluation. Additional calculators support blood pressure assessment (mean arterial pressure, heart rate) and heart failure classification. These instruments guide treatment thresholds, anticoagulation decisions, and surgical risk counselling. Results should always be integrated with clinical presentation, imaging findings, and patient preferences rather than applied as standalone decision triggers.",

  Emergency:
    "Acute care and emergency medicine calculators for rapid clinical decision-making at the point of care. This category covers trauma scoring (Revised Trauma Score, Pediatric Trauma Score), sepsis and critical illness screening (qSOFA, SIRS, SOFA), pneumonia severity assessment (CURB-65, CRB-65, PSI/PORT), syncope and chest pain evaluation (HEART Score, Ottawa SAH Rule), and injury-specific rules (Alvarado Score for appendicitis, PERC for PE exclusion, Wells scores for DVT/PE). It also includes the NEWS2 early warning system, Glasgow Coma Scale, Rumack-Matthew nomogram for acetaminophen overdose, and the Parkland formula for burn resuscitation. These tools are designed for time-pressured environments and are most valid when applied to the populations in which they were derived.",

  Endocrinology:
    "Metabolic and endocrine calculators for glycaemic estimation, insulin resistance assessment, thyroid hormone dosing, and steroid equivalence conversion. Key tools include the HOMA-IR and HOMA-B calculators for insulin resistance and beta-cell function, QUICKI for insulin sensitivity, estimated average glucose from HbA1c, and the free thyroxine index. The levothyroxine dose calculator supports thyroid replacement planning, while the adrenal steroid converter provides approximate dose equivalences between common glucocorticoids. Metabolic syndrome screening (ATP III criteria) and atherogenic risk markers (TyG index, TG/HDL ratio, triglyceride-HDL ratio) round out the category. These calculators are adjuncts to clinical judgement — insulin resistance indices have limited validation in type 1 diabetes, and steroid equivalents are approximations that depend on indication and route.",

  Gastroenterology:
    "Hepatology and gastrointestinal calculators for liver disease severity, GI bleeding risk, hepatic fibrosis estimation, and transplant listing. Tools include the MELD and MELD-Na scores for liver transplant prioritisation, Child-Pugh and ALBI scores for liver function assessment, APRI and FIB-4 for non-invasive fibrosis estimation, and the NAFLD Fibrosis Score for steatohepatitis risk stratification. GI bleeding tools cover the Glasgow-Blatchford Score for pre-endoscopy triage and the Rockall Score for post-endoscopy rebleeding risk. The Maddrey Discriminant Function helps identify alcoholic hepatitis patients who may benefit from corticosteroid therapy, and the SAAG classifies ascites aetiologies. MELD scores are recalibrated periodically; always verify which version your institution uses.",

  Geriatrics:
    "Functional status and comorbidity assessment tools designed for older adults. The Charlson Comorbidity Index quantifies cumulative disease burden to predict one-year and ten-year mortality, incorporating 19 weighted conditions with optional age adjustment. The Barthel Index measures activities of daily living (ADLs) to track functional independence and rehabilitation progress. These instruments support clinical decision-making around goals of care, discharge planning, surgical candidacy, and long-term care placement. They are most useful when repeated over time to capture functional trajectory rather than as single time-point snapshots. Comorbidity indices should complement — not replace — comprehensive geriatric assessment including cognition, nutrition, and social support.",

  "Infectious Disease":
    "Infection-related clinical calculators focused on community-acquired pneumonia severity and streptococcal pharyngitis risk. The Modified Centor (McIsaac) Score estimates the probability of streptococcal pharyngitis to guide antibiotic prescribing and rapid antigen testing decisions, incorporating age adjustment. The CRB-65 and CURB-65 scores stratify pneumonia severity for site-of-care decisions. While this is a focused category, the calculators address high-frequency clinical scenarios where evidence-based thresholds can reduce unnecessary antibiotic use and improve patient safety. Interpretation should always account for local antimicrobial resistance patterns and patient-specific risk factors such as immunocompromise or recent hospitalisation.",

  "Internal Medicine":
    "The broadest clinical category, covering acid-base analysis, fluid and electrolyte management, body weight estimation, metabolic assessment, and organ function scoring. Tools include anion gap and delta ratio calculations for metabolic acidosis, corrected sodium for hyperglycaemia, serum osmolality and osmolar gap for toxic ingestion workup, and Winter's formula for expected respiratory compensation. Fluid management tools include maintenance fluids, sodium deficit, free water deficit, and calorie requirement calculators. Body weight tools (IBW, adjusted BW, lean body weight, BMR, Harris-Benedict) support drug dosing and nutritional planning. Organ function scores include Charlson Comorbidity Index and Child-Pugh. These are workhorses of daily inpatient and outpatient medicine — most are most accurate when used alongside clinical assessment rather than in isolation.",

  Laboratory:
    "Laboratory value interpretation tools for lipid panels, electrolyte abnormalities, and protein ratio assessment. Calculators include the Friedewald LDL estimation, non-HDL cholesterol, total cholesterol/HDL ratio, ApoB/ApoA1 ratio, and the atherogenic index of plasma for cardiovascular risk refinement. Corrected calcium and corrected magnesium account for albumin-bound fractions that can mask true abnormalities. The albumin-to-globulin ratio supports liver and kidney disease evaluation. These tools help translate raw laboratory numbers into clinically meaningful interpretations, but they all depend on accurate fasting status, specimen handling, and knowledge of interfering substances (e.g., Friedewald is unreliable when triglycerides exceed 400 mg/dL).",

  "Mental Health":
    "Screening and severity assessment tools for common psychiatric conditions encountered in primary care and specialist settings. The PHQ-9 screens for depression severity and monitors treatment response using nine DSM-aligned items. The GAD-7 assesses anxiety symptom burden over the preceding two weeks. Both are validated, freely available, and widely used in quality improvement and clinical research. The Epworth Sleepiness Scale and STOP-BANG questionnaire (also categorised under Sleep Medicine) screen for excessive daytime sleepiness and obstructive sleep apnoea risk respectively. These instruments are screening tools, not diagnostic tests — a positive screen warrants further clinical evaluation, and severity scores should be tracked longitudinally rather than interpreted in isolation.",

  Nephrology:
    "Kidney function estimation, renal replacement therapy adequacy, electrolyte handling, and acute kidney injury assessment. Core tools include the CKD-EPI 2021 and MDRD GFR equations for estimated glomerular filtration rate, Cockcroft-Gault for creatinine clearance (drug dosing), and 24-hour urine creatinine clearance. AKI staging uses the KDIGO criteria. Tubular function assessment covers fractional excretion of sodium, urea, calcium, phosphate, and uric acid, plus the transtubular potassium gradient. Fluid and electrolyte tools include the urine anion gap, osmolal gap, electrolyte-free water clearance, and calcium-phosphate product. Dialysis adequacy is assessed via Kt/V. These calculators are most valuable when interpreted alongside clinical context — fractional excretion values are unreliable with recent diuretic use, and GFR equations have reduced accuracy at extreme muscle mass.",

  Neurology:
    "Neurological scoring systems for stroke severity, subarachnoid haemorrhage grading, functional outcome prediction, and head injury assessment across adult and paediatric populations. The NIH Stroke Scale and modified Rankin Scale are standard in acute stroke care and clinical trials. The ABCD2 score stratifies transient ischaemic attack recurrence risk. The Essen Stroke Risk Score predicts long-term cerebrovascular events. For subarachnoid haemorrhage, the Hunt and Hess scale grades clinical severity, while the Ottawa SAH Rule guides CT/lumbar puncture decisions. The FOUR score provides neurological assessment for intubated patients where GCS cannot be reliably scored. The RACE scale supports prehospital stroke severity assessment. Most neurological scales have greatest inter-rater reliability when scoring is performed by trained clinicians.",

  "Obstetrics & Gynecology":
    "Pregnancy dating, fetal assessment, obstetric complication screening, and perinatal mental health tools. The EDD calculator supports pregnancy dating from last menstrual period or ultrasound parameters. Fetal weight estimation uses the Hadlock formula. The biophysical profile and Bishop score support antenatal surveillance and labour readiness assessment. Pre-eclampsia screening uses ACOG 2020 criteria, with HELLP syndrome criteria for severe variant identification. Magnesium sulfate dosing supports seizure prophylaxis. Estimated blood loss aids haemorrhage management. The Edinburgh Postnatal Depression Scale screens for perinatal mood disorders. Gestational weight gain follows IOM 2009 guidelines stratified by pre-pregnancy BMI. These tools are calibrated to specific gestational windows and populations — always verify the gestational age range for which a tool was validated.",

  Oncology:
    "Cancer prognosis and performance assessment tools. The ECOG Performance Status scale is the most widely used measure of functional capacity in oncology, influencing chemotherapy eligibility, clinical trial enrolment, and goals-of-care discussions. It grades patients from 0 (fully active) to 5 (dead) based on ambulatory status and ability to perform activities of daily living. While this is a single-calculator category, the ECOG score is one of the most frequently applied instruments in oncology practice and research. It should be interpreted alongside tumour staging, molecular markers, comorbidity burden, and patient preferences regarding treatment intensity.",

  Pediatrics:
    "Age-appropriate calculators for paediatric emergency, critical care, and primary care settings. Tools include the Apgar Score for newborn assessment, Pediatric Glasgow Coma Scale and Pediatric Trauma Score for neurological and trauma evaluation, PECARN rules for minor head trauma decision-making, and the Westley Croup Score for airway obstruction severity. The Gorelick scale and Rochester criteria support dehydration assessment and febrile infant evaluation. PEWS provides paediatric early warning for clinical deterioration, and PALS hypotension thresholds guide resuscitation. BMI-for-age assesses nutritional status in children and adolescents. These instruments use age- and size-specific norms that differ fundamentally from adult calculators — always verify the age range for which each tool is validated.",

  Pulmonology:
    "Respiratory physiology calculators for gas exchange assessment, oxygenation indices, and ventilator-based clinical ratios. The A-a oxygen gradient quantifies alveolar-arterial oxygen difference to evaluate ventilation-perfusion matching. The PaO₂/FiO₂ ratio and oxygen index assess ARDS severity and guide ventilator management. The ROX index predicts high-flow nasal cannula failure in hypoxaemic respiratory failure. The BODE Index integrates body mass, airflow obstruction, dyspnoea, and exercise capacity for COPD mortality prediction and transplant evaluation. These tools are most useful in critical care and pulmonology settings where objective oxygenation metrics complement clinical assessment of respiratory distress.",

  "Sleep Medicine":
    "Sleep disorder screening tools for evaluating excessive daytime sleepiness and obstructive sleep apnoea risk. The Epworth Sleepiness Scale measures propensity to fall asleep in eight everyday situations, distinguishing pathological sleepiness from normal variation. The STOP-BANG questionnaire screens for OSA using four symptoms (Snoring, Tiredness, Observed apnoea, Pressure/hypertension) and four demographic measures (BMI, Age, Neck circumference, Gender). Both are validated screening instruments, not diagnostic tests — a positive screen should prompt polysomnography or home sleep testing. The STOP-BANG has high sensitivity but moderate specificity, making it effective for ruling out OSA when negative.",
};

/* ------------------------------------------------------------------ */
/*  Specialty descriptions                                              */
/* ------------------------------------------------------------------ */

export const specialtyDescriptions: Record<string, string> = {
  Cardiology:
    "Cardiology calculators for cardiac risk stratification, anticoagulation management, and perioperative evaluation. This specialty includes the GRACE and TIMI scores for acute coronary syndrome prognosis, CHA₂DS₂-VASc for atrial fibrillation stroke risk, HAS-BLED for bleeding risk assessment, the DAPT score for dual antiplatelet therapy duration, and the RCRI for preoperative cardiac risk. Additional tools assess heart failure classification (H2FPEF), blood pressure (MAP, heart rate), and atherosclerotic risk (ASCVD pooled cohort equations). These calculators support guideline-concordant decision-making but must be interpreted alongside clinical presentation, echocardiographic findings, and patient treatment preferences.",

  "Critical Care":
    "Critical care calculators for organ dysfunction assessment, sepsis screening, and illness severity scoring in ICU patients. The SOFA (Sequential Organ Dysfunction Assessment) score quantifies respiratory, coagulation, hepatic, cardiovascular, neurological, and renal function to track organ failure trajectory. The qSOFA provides bedside sepsis screening without laboratory data. These instruments support early recognition of clinical deterioration, goal-setting discussions, and clinical trial enrolment criteria. SOFA trends over 48–72 hours are more clinically informative than single time-point scores.",

  "Emergency Medicine":
    "Emergency medicine calculators for rapid assessment of trauma, poisoning, infection, chest pain, and clinical decision rules in the emergency department. This specialty encompasses the widest breadth of acute care tools: trauma scoring (RTS, PTS), sepsis screening (qSOFA, SIRS, SOFA), pneumonia severity (CURB-65, CRB-65, PSI/PORT), cardiac risk (HEART Score, GRACE, TIMI), PE and DVT exclusion (Wells scores, PERC), syncope evaluation, and acetaminophen overdose management (Rumack-Matthew). The NEWS2 system supports ward-based early warning. These tools are optimised for speed and accuracy at the point of care, but their derived populations define their applicability — always consider whether your patient matches the validation cohort.",

  Endocrinology:
    "Endocrinology calculators for metabolic assessment, insulin resistance quantification, thyroid hormone management, and glucocorticoid equivalence conversion. Tools include HOMA-IR and HOMA-B for insulin resistance and beta-cell function, QUICKI for insulin sensitivity, estimated average glucose from HbA1c, and the free thyroxine index. The levothyroxine dose calculator supports thyroid replacement, and the adrenal steroid converter provides approximate dose equivalences. Metabolic syndrome screening (ATP III) and atherogenic risk markers (TyG index, TG/HDL) complete the category. Insulin resistance indices have limited validation in type 1 diabetes and in patients on exogenous insulin.",

  "General Medicine":
    "General medicine calculators for broadly applicable clinical assessments spanning functional status, comorbidity burden, body composition, mental health screening, and sleep disorders. Tools include the Charlson Comorbidity Index for disease burden quantification, Barthel Index for ADL functional assessment, ECOG Performance Status, BMI, BSA, waist-to-hip ratio, and screening instruments for depression (PHQ-9), anxiety (GAD-7), sleepiness (Epworth), and sleep apnoea (STOP-BANG). The Modified Centor score supports pharyngitis management. These calculators address high-frequency clinical scenarios across multiple specialties and care settings.",

  "Internal Medicine":
    "Internal Medicine is the largest specialty in this collection, encompassing core clinical calculators for acid-base analysis, fluid and electrolyte management, renal function assessment, metabolic evaluation, liver disease scoring, and body weight estimation. Tools include anion gap and delta ratio, corrected sodium and calcium, serum osmolality and osmolar gap, fractional excretion analyses, GFR estimation (CKD-EPI, MDRD), Cockcroft-Gault, MELD and Child-Pugh scores, and multiple body weight equations (IBW, adjusted BW, lean body weight, Harris-Benedict). These are the foundational tools of inpatient and outpatient medicine. Their accuracy depends on accurate clinical context — for example, fractional excretion values are unreliable with recent diuretic use, and MELD scores have been recalibrated over time.",

  Nephrology:
    "Nephrology calculators for kidney function estimation, dialysis adequacy, tubular function analysis, and renal-related fluid management. Core tools include the CKD-EPI 2021 equation for eGFR, 24-hour urine creatinine clearance, KDIGO AKI staging, and Kt/V for haemodialysis adequacy. Tubular function is assessed via fractional excretion of sodium, urea, calcium, phosphate, and uric acid, plus the transtubular potassium gradient and urine anion/osmolal gaps. These calculators are most valuable when interpreted alongside clinical volume status, medication history, and trend data rather than as isolated values.",

  Neurology:
    "Neurology calculators for stroke severity quantification, subarachnoid haemorrhage grading, functional outcome prediction, and head injury assessment. The NIH Stroke Scale and modified Rankin Scale are standards in acute stroke care and clinical research. The ABCD2 score stratifies TIA recurrence risk, and the Essen Stroke Risk Score predicts long-term cerebrovascular events. For subarachnoid haemorrhage, the Hunt and Hess scale grades severity. The FOUR score enables neurological assessment in intubated patients, and the RACE scale supports prehospital stroke evaluation. Inter-rater reliability improves with training and standardised scoring protocols.",

  Pulmonology:
    "Pulmonology calculators for respiratory physiology assessment, oxygenation indices, and COPD prognosis. The A-a oxygen gradient evaluates ventilation-perfusion matching. The PaO₂/FiO₂ ratio and oxygen index classify ARDS severity and guide ventilator management. The ROX index predicts high-flow nasal cannula failure. The BODE Index integrates BMI, airflow obstruction, dyspnoea, and exercise capacity for COPD mortality prediction and transplant candidacy evaluation. These tools are most applicable in critical care, pulmonary function laboratories, and chronic respiratory disease management.",

  Gastroenterology:
    "Gastroenterology calculators for liver disease severity, GI bleeding risk, hepatic fibrosis estimation, and transplant listing prioritisation. Tools include MELD and MELD-Na for transplant allocation, APRI and FIB-4 for non-invasive fibrosis staging, the NAFLD Fibrosis Score for steatohepatitis risk, Glasgow-Blatchford and Rockall for GI bleeding triage, and the Maddrey Discriminant Function for alcoholic hepatitis. The SAAG classifies ascites aetiologies. MELD score versions differ across institutions — verify which calibration your centre uses.",

  Obstetrics:
    "Obstetric calculators for pregnancy dating, fetal assessment, obstetric complication screening, perinatal mental health, and gestational weight management. Tools include EDD calculation, Hadlock fetal weight estimation, biophysical profile, Bishop score for labour readiness, ACOG 2020 pre-eclampsia criteria, HELLP syndrome criteria, magnesium sulfate dosing, estimated blood loss, Edinburgh Postnatal Depression Scale, and IOM 2009 gestational weight gain guidelines. These calculators are calibrated to specific gestational windows and populations — always verify the gestational age range for which each tool was validated.",

  Pediatrics:
    "Paediatric calculators for emergency, critical care, and primary care settings using age-specific norms. Tools include the Apgar Score for newborn assessment, Pediatric GCS and Pediatric Trauma Score for neurological evaluation, PECARN rules for minor head trauma, Westley Croup Score for airway obstruction, Gorelick dehydration scale, Rochester criteria for febrile infants, PEWS for early warning, and PALS hypotension thresholds. BMI-for-age assesses nutritional status. These instruments use fundamentally different reference ranges from adult calculators — always confirm the age range for which each tool is validated.",
};

/* ------------------------------------------------------------------ */
/*  Taxonomy cross-linking helpers                                      */
/* ------------------------------------------------------------------ */

/**
 * Returns the unique specialties whose calculators appear in a given category.
 * Derives the relationship directly from the registry — no hardcoded mappings.
 */
export function getSpecialtiesForCategory(
  category: string,
): string[] {
  const calcs = getCalculatorsByCategory(category);
  const specialties = calcs
    .map((c) => c.specialty)
    .filter((s): s is string => Boolean(s));
  return [...new Set(specialties)].sort();
}

/**
 * Returns the unique categories represented by a specialty's calculators.
 * Derives the relationship directly from the registry — no hardcoded mappings.
 */
export function getCategoriesForSpecialty(
  specialty: string,
): string[] {
  const calcs = getCalculatorsBySpecialty(specialty);
  const categories = calcs.map((c) => c.category);
  return [...new Set(categories)].sort();
}

/**
 * Converts a category or specialty name to its URL slug.
 */
export function taxonomyToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
