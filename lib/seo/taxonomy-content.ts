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
/*  Editorial model                                                     */
/*                                                                       */
/*  Two taxonomies, two distinct editorial jobs:                         */
/*                                                                       */
/*  - Category copy answers "what is being calculated?" — the subject    */
/*    of the tool (risk scores, estimations, staging, dosing aids).      */
/*  - Specialty copy answers "where and why is it used?" — the clinical  */
/*    area, the setting, and the decision the number feeds into.         */
/*                                                                       */
/*  Each taxonomy has a long form (descriptions, rendered on detail      */
/*  pages) and a short form (summaries, rendered on index cards).        */
/*  Cross-taxonomy sentences must not be copied: see                     */
/*  tests/lib/phase4-hub-taxonomy.test.ts, which rejects shared          */
/*  substantive sentences and long shared word runs between the two.     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Category descriptions                                               */
/* ------------------------------------------------------------------ */

/**
 * Long-form category copy (subject-of-the-calculation framing).
 * Rendered on /categories/[category].
 */
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

/**
 * Short-form category copy for index cards on /categories.
 * Must describe the subject area, not the practice setting.
 */
export const categorySummaries: Record<string, string> = {
  Anthropometry:
    "Body composition, weight, and adiposity measurements used for dosing and nutrition assessment.",
  Cardiology:
    "Cardiac risk scores, anticoagulation tools, and haemodynamic calculations for heart disease.",
  Emergency:
    "Rapid scoring and decision rules for trauma, sepsis, chest pain, and acute illness.",
  Endocrinology:
    "Glucose, insulin resistance, thyroid, and steroid equivalence calculations.",
  Gastroenterology:
    "Liver severity, fibrosis, and gastrointestinal bleeding scores.",
  Geriatrics:
    "Comorbidity and functional status measures used in the care of older adults.",
  "Infectious Disease":
    "Pneumonia severity and streptococcal pharyngitis scores that support antibiotic stewardship.",
  "Internal Medicine":
    "Acid-base, fluid and electrolyte, weight, and organ function calculations.",
  Laboratory:
    "Interpretation tools that turn laboratory values into clinically meaningful estimates.",
  "Mental Health":
    "Depression, anxiety, sleepiness, and sleep apnoea screening questionnaires.",
  Nephrology:
    "Kidney filtration estimates, dialysis adequacy, tubular tests, and injury staging.",
  Neurology:
    "Stroke, haemorrhage, TIA, and head injury scoring systems.",
  "Obstetrics & Gynecology":
    "Pregnancy dating, fetal assessment, pre-eclampsia screening, and perinatal mood tools.",
  Oncology:
    "Performance status and functional capacity grading used across oncology practice.",
  Pediatrics:
    "Age-specific scoring for newborns, children, and adolescents.",
  Pulmonology:
    "Oxygenation indices, gas exchange ratios, and composite COPD prognosis tools.",
  "Sleep Medicine":
    "Daytime sleepiness and obstructive sleep apnoea screening instruments.",
};

/* ------------------------------------------------------------------ */
/*  Specialty descriptions                                              */
/*                                                                       */
/*  Practice-area framing: settings, users, and the decisions a number  */
/*  feeds — deliberately distinct from the subject framing of the       */
/*  category copy above. Reword these when tool lists change; never      */
/*  reuse category sentences here.                                       */
/* ------------------------------------------------------------------ */

/**
 * Long-form specialty copy (where-and-why-it-is-used framing).
 * Rendered on /specialties/[slug].
 */
export const specialtyDescriptions: Record<string, string> = {
  Cardiology:
    "Cardiologists, anticoagulation services, and pre-assessment clinics use these scores to convert a history, an ECG, and routine laboratory results into risk categories: whether atrial fibrillation justifies anticoagulation, how much bleeding that choice carries, how long dual antiplatelet therapy should run, and whether elective surgery can safely proceed. Composite indices also describe heart failure physiology and perfusion pressure. Scores set thresholds rather than dictate therapy; imaging, comorbidity, and what the patient wants usually decide the plan.",

  "Critical Care":
    "Intensivists apply these tools at the bedside and on ward rounds: quantifying dysfunction across several organ systems, screening for sepsis when laboratory results are still pending, and tracking whether a patient is improving or declining. Numbers are most informative when repeated, so a trend across several days says more than any isolated reading. The same scores also frame escalation discussions with families and eligibility screening for critical care research.",

  "Emergency Medicine":
    "Emergency physicians reach for calculations that must be finished in seconds and before imaging: triage scores that separate low-risk chest pain from infarction, quick sepsis screens, and decision rules that help move appendicitis, pulmonary embolism, or subarachnoid haemorrhage towards or away from investigation. Throughput and safety-netting are the priorities, because most rules were derived in fast-moving cohorts. A reassuring score never overrides a concerning history or an unstable examination.",

  Endocrinology:
    "Endocrine calculators turn routine laboratory results into dosing and screening decisions in diabetes and thyroid clinics: estimating insulin resistance, translating HbA1c into an average glucose figure, matching glucocorticoid doses across different preparations, and working out starting levothyroxine requirements. They are revisited as treatment is titrated, so results are read against the patient's current regimen, comorbidities, and the most recent measurements rather than in isolation.",

  "General Medicine":
    "This specialty collects tools that cross departmental boundaries — comorbidity and functional-status scoring, body-size estimates, and screening questionnaires for mood, sleep, and streptococcal pharyngitis. They are common in general practice, ward rounds, and pre-assessment clinics, where the usual question is who needs closer assessment rather than what the final diagnosis is. Because the tools span several organ systems, findings work best alongside history-taking and examination.",

  "Internal Medicine":
    "The widest practice area in the registry: internists use these calculations daily on the wards and in clinic — sorting out an acid-base disorder, balancing fluids and electrolytes, converting doses to body size, and staging chronic disease. Much of the toolset is arithmetic supporting a broader clinical picture, so numbers are read alongside examination, medication review, and how successive results move over days.",

  Nephrology:
    "Nephrology practice runs on figures that shift over hours: estimating filtration when creatinine is unstable, dosing drugs safely as kidney function declines, staging acute injury, and confirming that a dialysis session cleared enough solute. Urine chemistries help separate pre-renal states from intrinsic disease, though recent diuretic exposure and volume status can distort the answer. Serial measurements usually carry more information than any single value.",

  Neurology:
    "In stroke units and neurology wards these scales replace subjective descriptions with shared numbers: quantifying deficit severity, grading how unwell someone is after a haemorrhage, and estimating the chance of another event after a transient ischaemic attack. They also underpin trial eligibility and service audit. Scoring consistency depends on training, so two examiners rarely agree perfectly and trends are best judged by the same rater.",

  Pulmonology:
    "Pulmonary calculators answer two bedside questions: how well oxygen is reaching the blood, and how someone with chronic airflow disease is likely to do over the next few years. Intensivists use ratio-based indices to grade lung injury and adjust ventilator settings, while COPD clinics use composite measures such as BODE when discussing prognosis, rehabilitation, or transplant referral.",

  Gastroenterology:
    "Hepatology and endoscopy teams use these numbers to rank patients for transplant, estimate scarring without a biopsy, and decide how urgently a bleed needs intervention. Scores such as MELD, APRI, FIB-4, Glasgow-Blatchford, and Maddrey compress laboratory results and clinical findings into a single figure; calibration differs between institutions, so confirm which version your centre reports before acting on it.",

  Obstetrics:
    "Obstetric tools are date-bound: most are only valid within a defined gestational window, and several are repeated at every antenatal visit so change can be tracked. Clinicians use them to date a pregnancy, estimate fetal size, judge readiness for labour, screen for pre-eclampsia, and check mood through the perinatal period. Estimated blood loss and magnesium dosing support the emergency response when complications occur.",

  Pediatrics:
    "Paediatric practice works from growth charts and age-specific norms rather than adult cutoffs, and these calculators embed that logic — Apgar scoring, head-injury rules, croup severity, dehydration assessment, and early-warning thresholds. They are applied in delivery suites, emergency departments, and general wards, with interpretation always tied to the child's exact age and weight. Adult thresholds should never be transferred to a child.",
};

/**
 * Short-form specialty copy for index cards on /specialties.
 * Must describe the clinical setting or use, not the subject taxonomy.
 */
export const specialtySummaries: Record<string, string> = {
  Cardiology:
    "Where cardiologists and anticoagulation clinics apply risk and bleeding scores.",
  "Critical Care":
    "Bedside scoring for organ dysfunction and sepsis across an ICU stay.",
  "Emergency Medicine":
    "Fast decision rules for triage, sepsis, and common emergency presentations.",
  Endocrinology:
    "How diabetes and thyroid clinics turn laboratory results into dosing decisions.",
  "General Medicine":
    "Cross-cutting tools used in general practice, ward rounds, and pre-assessment.",
  "Internal Medicine":
    "Everyday ward and clinic calculations for fluids, dosing, and staging.",
  Nephrology:
    "Filtration, dosing, and dialysis checks that move as kidney function changes.",
  Neurology:
    "Shared numeric scales for stroke units, haemorrhage grading, and recurrence risk.",
  Pulmonology:
    "Oxygenation and prognosis measures used on the wards and in respiratory clinics.",
  Gastroenterology:
    "Transplant ranking, fibrosis staging, and bleed triage in hepatology and endoscopy.",
  Obstetrics:
    "Date-bound antenatal tools repeated through pregnancy for dating and screening.",
  Pediatrics:
    "Growth- and age-referenced tools used from the delivery suite to paediatric wards.",
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
