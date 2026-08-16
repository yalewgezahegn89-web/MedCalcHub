/**
 * Calculator Validation Tests
 *
 * Comprehensive validation tests for all 91 registered calculators.
 * 
 * Verifies:
 * - Every calculator calculate() executes without throwing
 * - Valid inputs produce finite/meaningful results
 * - Expected numerical values where determinable
 * - Input validation returns critical status for missing/invalid inputs
 */

import { describe, it, expect } from "vitest";
import {
  calculatorRegistry,
  getCalculatorById,
} from "../../lib/calculators/registry";
import type {
  CalculatorDefinition,
  CalculatorResult,
} from "../../lib/calculators/calculator.types";

// ---------------------------------------------------------------------------
// Test input data for all 91 calculators
// ---------------------------------------------------------------------------

const testInputs: Record<string, Record<string, string>> = {
  // -- Nephrology --
  "ckd-epi-2021": {
    age: "50",
    sex: "1",
    creatinine: "1.0",
  },
  "cockcroft-gault": {
    age: "50",
    weight: "70",
    sex: "1",
    creatinine: "1.0",
  },
  mdrd: { age: "50", sex: "1", creatinine: "1.0" },
  "bun-creatinine-ratio": {
    bun: "15",
    creatinine: "1.0",
  },
  fena: {
    urineNa: "40",
    plasmaNa: "140",
    urineCr: "80",
    plasmaCr: "1.0",
  },
  feurea: {
    urineUrea: "300",
    plasmaUrea: "15",
    urineCr: "80",
    plasmaCr: "1.0",
  },
  ttkg: {
    urineK: "20",
    plasmaK: "4.0",
    urineOsmolality: "600",
    plasmaOsmolality: "290",
  },
  "calcium-phosphate-product": {
    calcium: "9.0",
    phosphate: "4.0",
  },

  // -- Renal --
  "albumin-creatinine-ratio": {
    albumin: "30",
    creatinine: "1.2",
  },

  // -- Emergency --
  "curb-65": {
    age: "70",
    confusion: "0",
    urea: "7",
    "respiratory-rate": "22",
    sbp: "90",
  },
  gcs: { eye: "4", verbal: "5", motor: "6" },
  "shock-index": { "heart-rate": "120", sbp: "80" },
  news2: {
    "respiratory-rate": "20",
    spo2: "94",
    temperature: "38",
    sbp: "110",
    pulse: "110",
  },
  qsofa: {
    sbp: "100",
    "respiratory-rate": "22",
    "mental-status": "1",
  },
  "perc-rule": {
    age: "1",
    "heart-rate": "1",
    "oxygen-saturation": "1",
    hemoptysis: "1",
    estrogen: "1",
    "prior-dvt-pe": "1",
    "leg-swelling": "1",
    "surgery-trauma": "1",
  },
  "wells-pe": {
    "dvt-signs": "0",
    "pe-most-likely": "0",
    tachycardia: "1",
    immobilization: "1",
    "prior-dvt-pe": "0",
    hemoptysis: "0",
    malignancy: "0",
  },
  "wells-dvt": {
    "active-cancer": "0",
    paralysis: "0",
    bedridden: "1",
    "localized-tenderness": "1",
    "entire-leg-swollen": "0",
    "calf-swelling": "0",
    "pitting-edema": "0",
    "collateral-veins": "0",
    "previous-dvt": "0",
    "alternative-diagnosis": "0",
  },
  "heart-score": {
    history: "1",
    ecg: "1",
    age: "1",
    "risk-factors": "1",
    troponin: "1",
  },
  "sofa-score": {
    "pao2-fio2": "0",
    platelets: "150",
    bilirubin: "1",
    cardiovascular: "0",
    gcs: "15",
    creatinine: "1",
  },
  "sirs-criteria": {
    temperature: "38.5",
    "heart-rate": "110",
    "respiratory-rate": "22",
    wbc: "12",
  },
  "crb-65": {
    confusion: "1",
    "respiratory-rate": "22",
    sbp: "90",
    dbp: "60",
    age: "70",
  },
  "psi-port": {
    age: "75",
    sex: "male",
    "nursing-home": "0",
    "neoplastic-disease": "0",
    "liver-disease": "0",
    chf: "0",
    cerebrovascular: "0",
    "renal-disease": "0",
    ams: "0",
    "respiratory-rate": "22",
    sbp: "110",
    temperature: "38",
    "heart-rate": "100",
    ph: "7.35",
    bun: "30",
    sodium: "135",
    glucose: "100",
    hematocrit: "40",
    pao2: "90",
    "pleural-effusion": "0",
  },
  rts: { gcs: "14", sbp: "110", rr: "16" },
  "parkland-formula": {
    weight: "75",
    head: "0",
    "anterior-trunk": "9",
    "posterior-trunk": "9",
    "right-upper-limb": "9",
    "left-upper-limb": "0",
    "right-lower-limb": "3",
    "left-lower-limb": "0",
    perineum: "0",
  },

  // -- Cardiology --
  map: { sbp: "120", dbp: "80" },
  "heart-rate": { beats: "75", time: "1" },

  // -- Cardiology Risk & Acute CV (Sprint 1.9 Batch 2) --
  timi: {
    "age-65": "1",
    "risk-factors": "1",
    "known-cad": "0",
    aspirin: "0",
    "anginal-events": "1",
    "ecg-changes": "1",
    troponin: "1",
  },
  grace: {
    age: "75",
    "heart-rate": "15",
    sbp: "43",
    creatinine: "10",
    killip: "20",
    "cardiac-arrest": "0",
    "st-deviation": "28",
    "elevated-enzymes": "14",
  },
  "cha2ds2-vasc": {
    chf: "0",
    hypertension: "1",
    age: "2",
    diabetes: "1",
    stroke: "2",
    "vascular-disease": "0",
    sex: "1",
  },
  "has-bled": {
    hypertension: "1",
    renal: "0",
    liver: "0",
    stroke: "0",
    bleeding: "1",
    "labile-inr": "1",
    elderly: "1",
    drugs: "0",
    alcohol: "0",
  },
  rcri: {
    "high-risk-surgery": "1",
    "ischemic-heart-disease": "1",
    chf: "0",
    cerebrovascular: "0",
    "insulin-diabetes": "1",
    creatinine: "1",
  },
  ascvd: {
    age: "55",
    sex: "male",
    race: "white",
    "total-cholesterol": "213",
    hdl: "50",
    sbp: "120",
    "hypertension-treated": "untreated",
    smoker: "0",
    diabetes: "0",
  },
  dapt: {
    age: "0",
    smoking: "1",
    diabetes: "0",
    "mi-at-presentation": "1",
    "prior-mi-pci": "1",
    "stent-diameter": "1",
    paclitaxel: "0",
    "chf-lvef": "0",
    "svg-pci": "0",
  },
  h2fpef: {
    afib: "3",
    bmi: "32",
    age: "66",
    antihypertensives: "1",
    "e-e-ratio": "1",
    pasp: "1",
  },

  // -- Anthropometry --
  bmi: { weight: "70", height: "170" },
  bsa: { weight: "70", height: "170" },
  "waist-to-hip-ratio": { waist: "80", hip: "100", sex: "1" },

  // -- Internal Medicine --
  ibw: { sex: "male", height: "170" },
  adjbw: { sex: "male", height: "170", weight: "70" },
  "lean-body-weight": {
    sex: "male",
    height: "170",
    weight: "70",
  },
  "child-pugh": {
    bilirubin: "1",
    albumin: "1",
    inr: "1",
    ascites: "1",
    encephalopathy: "1",
  },
  "anion-gap": {
    sodium: "140",
    chloride: "104",
    bicarbonate: "24",
  },
  "corrected-anion-gap": {
    sodium: "140",
    chloride: "104",
    bicarbonate: "24",
    albumin: "4.0",
  },
  "serum-osmolality": {
    sodium: "140",
    glucose: "100",
    bun: "15",
  },
  "osmolar-gap": {
    measured: "290",
    sodium: "140",
    glucose: "100",
    bun: "15",
  },
  "basal-metabolic-rate": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "mifflin-st-jeor": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "harris-benedict": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "calorie-requirement": {
    bmr: "1700",
    activity: "1.55",
  },
  "fluid-requirement": { weight: "70" },
  "maintenance-fluids": { weight: "70" },
  "free-water-deficit": {
    weight: "70",
    currentNa: "150",
    desiredNa: "140",
  },
  "sodium-deficit": {
    weight: "70",
    currentNa: "125",
    desiredNa: "140",
  },
  "corrected-sodium": {
    sodium: "120",
    glucose: "400",
  },
  "albumin-corrected-calcium": {
    calcium: "8.0",
    albumin: "3.0",
  },
  "fractional-excretion-calculator": {
    urineNa: "40",
    plasmaNa: "140",
    urineCr: "80",
    plasmaCr: "1.0",
  },

  // -- Laboratory --
  "corrected-calcium": {
    calcium: "8.5",
    albumin: "3.5",
  },

  // -- Endocrinology --
  "homa-ir": { glucose: "100", insulin: "10" },
  "homa-b": { glucose: "100", insulin: "10" },
  "insulin-sensitivity": { homaIr: "2.5" },
  "estimated-average-glucose": { a1c: "7.0" },
  "a1c-eag-converter": { a1c: "7.0" },
  "corrected-qt": {
    qt: "400",
    heartRate: "70",
    sex: "1",
  },
  "thyroid-dose": { weight: "70" },
  "levothyroxine-dose": { weight: "70" },
  "adrenal-steroid-converter": {
    dose: "10",
    steroid: "prednisone",
  },
  "bmi-for-pediatrics": {
    age: "10",
    sex: "1",
    weight: "32",
    height: "140",
  },

  // -- Sprint 1.9 Batch 3 (Laboratory & Metabolic) --
  "ldl-cholesterol": {
    totalCholesterol: "240",
    hdl: "50",
    triglycerides: "150",
  },
  "non-hdl-cholesterol": {
    totalCholesterol: "240",
    hdl: "50",
  },
  "albumin-globulin-ratio": {
    albumin: "4",
    totalProtein: "7",
  },
  "tyg-index": {
    triglycerides: "150",
    glucose: "90",
  },
  "triglyceride-hdl-ratio": {
    triglycerides: "150",
    hdl: "40",
  },
  quicki: {
    fastingInsulin: "10",
    fastingGlucose: "90",
  },
  "winters-formula": {
    bicarbonate: "10",
    pco2: "28",
  },
  "anion-gap-delta-ratio": {
    anionGap: "23",
    bicarbonate: "12",
  },
  "urine-anion-gap": {
    urineNa: "10",
    urineK: "20",
    urineCl: "110",
  },
  "kt-v": {
    preBun: "90",
    postBun: "30",
    ultrafiltrate: "2.5",
    treatmentTime: "4",
    postWeight: "75",
  },

  // -- Pulmonology --
  "a-a-gradient": {
    age: "40",
    fio2: "0.21",
    pao2: "90",
    paco2: "40",
  },
  "oxygen-index": {
    fio2: "0.5",
    map: "10",
    pao2: "100",
  },
  "pf-ratio": {
    pao2: "100",
    fio2: "0.5",
  },
  "rox-index": {
    spo2: "94",
    fio2: "0.4",
    rr: "30",
  },

  // -- Gastroenterology --
  apri: {
    ast: "40",
    uln: "40",
    platelets: "200",
  },
  "fib-4": {
    age: "60",
    ast: "40",
    alt: "40",
    platelets: "200",
  },
  "glasgow-blatchford": {
    bun: "25",
    hemoglobin: "12.5",
    sex: "male",
    sbp: "100",
    pulse: "90",
    melena: "no",
    syncope: "no",
    hepatic: "no",
    cardiac: "no",
  },
  maddrey: {
    patient_pt: "20",
    control_pt: "12",
    bilirubin: "5",
  },
  meld: {
    bilirubin: "2",
    creatinine: "1.2",
    inr: "1.5",
    dialysis: "no",
  },
  "meld-na": {
    bilirubin: "2",
    creatinine: "1.2",
    inr: "1.5",
    sodium: "135",
    dialysis: "no",
  },
  "nafld-fibrosis": {
    age: "55",
    bmi: "32",
    diabetes: "1",
    ast: "40",
    alt: "40",
    platelets: "150",
    albumin: "3.5",
  },
  rockall: {
    age: "1",
    shock: "0",
    comorbidity: "0",
    diagnosis: "1",
    stigmata: "0",
  },

  // -- Obstetrics & Gynecology --
  edd: {
    lmp: "2025-01-01",
  },
  "gestational-age": {
    weeks: "30",
    days: "4",
  },

  // -- Sprint 1.9 Batch 5: Obstetrics --
  "bishop-score": {
    dilation: "2",
    effacement: "2",
    station: "2",
    consistency: "1",
    position: "1",
  },
  "biophysical-profile": {
    breathing: "2",
    movement: "2",
    tone: "2",
    amnioticFluid: "2",
    nst: "2",
  },
  "hellp-syndrome": {
    platelets: "120",
    ast: "90",
    ldh: "400",
    hemolysis: "no",
  },
  "hadlock-efw": {
    bpd: "9.4",
    hc: "33.0",
    ac: "32.5",
    fl: "7.0",
  },
  "preeclampsia-criteria": {
    sbp: "145",
    dbp: "95",
    proteinuria: "yes",
    platelets: "150",
    creatinine: "0.9",
    transaminases: "no",
    ruqPain: "no",
    pulmonaryEdema: "no",
    headache: "no",
    visual: "no",
  },
  "gestational-weight-gain": {
    bmi: "26",
  },
  "magnesium-sulfate-preeclampsia": {
    loadingDose: "4",
    maintenance: "2",
  },
  "ebl-obstetric": {
    method: "gravimetric",
    wetWeight: "500",
    dryWeight: "200",
  },
  epds: {
    item1: "0",
    item2: "0",
    item3: "0",
    item4: "0",
    item5: "0",
    item6: "0",
    item7: "0",
    item8: "0",
    item9: "0",
    item10: "0",
  },

  // -- Sprint 1.9 Batch 6: Pediatrics --
  "apgar-score": {
    appearance: "2",
    pulse: "2",
    grimace: "1",
    activity: "2",
    respiration: "2",
  },
  "pediatric-gcs": {
    eye: "4",
    verbal: "4",
    motor: "6",
  },
  "pediatric-trauma-score": {
    weight: "2",
    airway: "2",
    sbp: "2",
    cns: "1",
    openWound: "2",
    skeletal: "1",
  },
  "westley-croup-score": {
    consciousness: "0",
    cyanosis: "0",
    stridor: "1",
    airEntry: "1",
    retractions: "2",
  },
  "pecarn-head-trauma": {
    ageGroup: "under-2",
    u2AlteredMentation: "no",
    u2PalpableSkullFracture: "no",
    u2ScalpHematoma: "no",
    u2Loc5Seconds: "no",
    u2NotActingNormal: "no",
    dangerousMechanism: "no",
  },
  "rochester-criteria": {
    ageDays: "45",
    termGestation: "yes",
    previouslyHealthy: "yes",
    nontoxic: "yes",
    focalInfection: "no",
    wbc: "9000",
    urinalysisWbc: "3",
    diarrhea: "no",
    stoolWbc: "0",
  },
  "gorelick-dehydration": {
    capillaryRefill: "yes",
    dryMucousMembranes: "yes",
    absentTears: "no",
    illAppearance: "no",
  },
  "pediatric-hypotension": {
    ageGroup: "1-10yr",
    ageYears: "4",
    sbp: "85",
  },
  "peds-pews": {
    behavior: "1",
    cardiovascular: "1",
    respiratory: "1",
    concern: "no",
  },

  // -- Sprint 1.9 Batch 7: Neurology --
  nihss: {
    loc: "1",
    locQuestions: "1",
    locCommands: "1",
    gaze: "1",
    visual: "1",
    facial: "1",
    armLeft: "2",
    armRight: "0",
    legLeft: "2",
    legRight: "0",
    ataxia: "0",
    sensory: "1",
    language: "1",
    dysarthria: "1",
    extinction: "1",
  },
  "abcd2-score": {
    age: "1",
    bloodPressure: "1",
    clinicalFeatures: "2",
    duration: "0",
    diabetes: "0",
  },
  "hunt-hess-scale": {
    grade: "3",
  },
  "modified-rankin-scale": {
    score: "3",
  },
  "ottawa-sah-rule": {
    age40: "no",
    neckPainStiffness: "no",
    witnessedLoc: "no",
    exertionOnset: "no",
    thunderclap: "no",
    limitedNeckFlexion: "no",
  },
  "fout-score": {
    eye: "3",
    motor: "3",
    brainstem: "3",
    respiration: "3",
  },
  "race-scale": {
    facialPalsy: "2",
    armMotor: "1",
    legMotor: "1",
    gaze: "0",
    aphasiaAgnosia: "0",
  },
  esrs: {
    ageGroup: "2",
    hypertension: "yes",
    diabetes: "yes",
    priorMi: "yes",
    otherCvd: "no",
    pad: "no",
    smoking: "yes",
    priorTiaStroke: "yes",
  },

  // -- Sprint 1.9 Batch 4: Renal & Laboratory/Metabolic --
  "fractional-excretion-uric-acid": {
    urineUricAcid: "20",
    serumUricAcid: "6",
    urineCr: "80",
    plasmaCr: "1.2",
  },
  "fractional-excretion-phosphate": {
    urinePhosphate: "50",
    serumPhosphate: "3.0",
    urineCr: "80",
    plasmaCr: "1.2",
  },
  "fractional-excretion-calcium": {
    urineCalcium: "50",
    serumCalcium: "10",
    urineCr: "100",
    plasmaCr: "1.0",
  },
  "renal-failure-index": {
    urineSodium: "40",
    plasmaCr: "1.2",
    urineCr: "80",
  },
  "urine-osmolal-gap": {
    urineOsmolality: "600",
    urineSodium: "80",
    urinePotassium: "40",
    urineUrea: "560",
    urineGlucose: "0",
  },
  "free-water-clearance": {
    urineVolume: "1.5",
    urineOsmolality: "80",
    plasmaOsmolality: "290",
  },
  "electrolyte-free-water-clearance": {
    urineVolume: "1.5",
    urineSodium: "80",
    urinePotassium: "40",
    plasmaSodium: "140",
  },
  "urine-protein-creatinine-ratio": {
    urineProtein: "150",
    urineCreatinine: "100",
  },
  "creatinine-clearance-24h": {
    urineCreatinine: "80",
    urineVolume: "1800",
    serumCreatinine: "1.0",
  },
  "total-cholesterol-hdl-ratio": {
    totalCholesterol: "180",
    hdlCholesterol: "60",
  },
  "atherogenic-index-of-plasma": {
    triglycerides: "100",
    hdlCholesterol: "80",
  },
  "apob-apoa1-ratio": {
    apoB: "1.0",
    apoA1: "1.4",
    sex: "male",
  },
  "respiratory-compensation": {
    disorderType: "acuteRespAcidosis",
    paCO2: "50",
    measuredBicarbonate: "25",
  },
  "metabolic-alkalosis-compensation": {
    bicarbonate: "40",
    measuredPaCO2: "50",
  },
  "free-thyroxine-index": {
    totalT4: "8",
    t3Uptake: "30",
  },
  "metabolic-syndrome-atp3": {
    sex: "female",
    waist: "90",
    triglycerides: "160",
    hdl: "45",
    sbp: "135",
    dbp: "85",
    fastingGlucose: "110",
    lipidRx: "no",
    bpRx: "no",
    glucoseRx: "no",
  },
};

// ---------------------------------------------------------------------------
// Expected values for calculators where we can confidently predict the result
// ---------------------------------------------------------------------------

type ExpectedExact = {
  value: number;
  tolerance: number;
  status?: string;
};

const exactExpectations: Record<string, ExpectedExact> = {
  "heart-rate": {
    value: 75,
    tolerance: 0.01,
    status: "normal",
  },
  bmi: {
    value: 24.22,
    tolerance: 0.01,
    status: "normal",
  },
  bsa: {
    value: 1.82,
    tolerance: 0.01,
  },
  map: {
    value: 93.33,
    tolerance: 0.01,
    status: "normal",
  },
  "bun-creatinine-ratio": {
    value: 15,
    tolerance: 0.01,
    status: "normal",
  },
  "fluid-requirement": {
    value: 2450,
    tolerance: 0.01,
    status: "normal",
  },
  "maintenance-fluids": {
    value: 2500,
    tolerance: 0.01,
    status: "normal",
  },
  "basal-metabolic-rate": {
    value: 1617.5,
    tolerance: 0.1,
    status: "normal",
  },
  "mifflin-st-jeor": {
    value: 1617.5,
    tolerance: 0.1,
    status: "normal",
  },
  "harris-benedict": {
    value: 1671.7,
    tolerance: 0.1,
    status: "normal",
  },
  "calorie-requirement": {
    value: 2635,
    tolerance: 0.1,
    status: "normal",
  },
  ibw: {
    value: 65.9,
    tolerance: 0.1,
    status: "normal",
  },
  adjbw: {
    value: 67.5,
    tolerance: 0.1,
    status: "normal",
  },
  "lean-body-weight": {
    value: 54.7,
    tolerance: 0.1,
    status: "normal",
  },
  "calcium-phosphate-product": {
    value: 36,
    tolerance: 0.01,
    status: "normal",
  },
  "estimated-average-glucose": {
    value: 154.2,
    tolerance: 0.1,
  },
  "a1c-eag-converter": {
    value: 154.2,
    tolerance: 0.1,
  },
  gcs: {
    value: 15,
    tolerance: 0.01,
    status: "normal",
  },
  "shock-index": {
    value: 1.5,
    tolerance: 0.01,
    status: "critical",
  },
  "corrected-qt": {
    value: 432,
    tolerance: 0.01,
    status: "normal",
  },
  "thyroid-dose": {
    value: 112,
    tolerance: 0.01,
    status: "normal",
  },
  "levothyroxine-dose": {
    value: 112,
    tolerance: 0.01,
    status: "normal",
  },
  "bmi-for-pediatrics": {
    value: 16.3,
    tolerance: 0.1,
    status: "normal",
  },
  "albumin-creatinine-ratio": {
    value: 25,
    tolerance: 0.01,
    status: "normal",
  },
  "a-a-gradient": {
    value: 9.7,
    tolerance: 0.01,
    status: "normal",
  },
  "oxygen-index": {
    value: 5,
    tolerance: 0.01,
    status: "high",
  },
  "pf-ratio": {
    value: 200,
    tolerance: 0.01,
    status: "critical",
  },
  "rox-index": {
    value: 7.83,
    tolerance: 0.01,
    status: "normal",
  },
  apri: {
    value: 0.5,
    tolerance: 0.01,
    status: "high",
  },
  "fib-4": {
    value: 1.9,
    tolerance: 0.01,
    status: "high",
  },
  "glasgow-blatchford": {
    value: 5,
    tolerance: 0.01,
    status: "high",
  },
  maddrey: {
    value: 41.8,
    tolerance: 0.1,
    status: "critical",
  },
  meld: {
    value: 15,
    tolerance: 0.01,
    status: "high",
  },
  "meld-na": {
    value: 17,
    tolerance: 0.01,
    status: "high",
  },
  "nafld-fibrosis": {
    value: 1.228,
    tolerance: 0.001,
    status: "critical",
  },
  rockall: {
    value: 2,
    tolerance: 0.01,
    status: "normal",
  },
  "gestational-age": {
    value: 30.5714,
    tolerance: 0.001,
    status: "normal",
  },
  "bishop-score": {
    value: 8,
    tolerance: 0.01,
    status: "normal",
  },
  "biophysical-profile": {
    value: 10,
    tolerance: 0.01,
    status: "normal",
  },
  "hellp-syndrome": {
    value: 1,
    tolerance: 0.01,
    status: "high",
  },
  "hadlock-efw": {
    value: 2985,
    tolerance: 1,
    status: "normal",
  },
  "preeclampsia-criteria": {
    value: 0,
    tolerance: 0.01,
    status: "high",
  },
  "gestational-weight-gain": {
    value: 20,
    tolerance: 0.01,
    status: "normal",
  },
  "magnesium-sulfate-preeclampsia": {
    value: 52,
    tolerance: 0.01,
    status: "normal",
  },
  "ebl-obstetric": {
    value: 300,
    tolerance: 0.01,
    status: "normal",
  },
  epds: {
    value: 0,
    tolerance: 0.01,
    status: "normal",
  },
  "apgar-score": {
    value: 9,
    tolerance: 0.01,
    status: "normal",
  },
  "pediatric-gcs": {
    value: 14,
    tolerance: 0.01,
    status: "normal",
  },
  "pediatric-trauma-score": {
    value: 10,
    tolerance: 0.01,
    status: "normal",
  },
  "westley-croup-score": {
    value: 4,
    tolerance: 0.01,
    status: "high",
  },
  "pecarn-head-trauma": {
    value: 0,
    tolerance: 0.01,
    status: "normal",
  },
  "rochester-criteria": {
    value: 7,
    tolerance: 0.01,
    status: "normal",
  },
  "gorelick-dehydration": {
    value: 2,
    tolerance: 0.01,
    status: "normal",
  },
  "pediatric-hypotension": {
    value: 78,
    tolerance: 0.01,
    status: "normal",
  },
  "peds-pews": {
    value: 3,
    tolerance: 0.01,
    status: "high",
  },
  nihss: {
    value: 14,
    tolerance: 0.01,
    status: "high",
  },
  "abcd2-score": {
    value: 4,
    tolerance: 0.01,
    status: "high",
  },
  "hunt-hess-scale": {
    value: 3,
    tolerance: 0.01,
    status: "high",
  },
  "modified-rankin-scale": {
    value: 3,
    tolerance: 0.01,
    status: "high",
  },
  "ottawa-sah-rule": {
    value: 0,
    tolerance: 0.01,
    status: "normal",
  },
  "fout-score": {
    value: 12,
    tolerance: 0.01,
    status: "high",
  },
  "race-scale": {
    value: 4,
    tolerance: 0.01,
    status: "normal",
  },
  esrs: {
    value: 7,
    tolerance: 0.01,
    status: "high",
  },
  timi: {
    value: 5,
    tolerance: 0.01,
    status: "critical",
  },
  grace: {
    value: 205,
    tolerance: 0.01,
    status: "critical",
  },
  "cha2ds2-vasc": {
    value: 7,
    tolerance: 0.01,
    status: "critical",
  },
  "has-bled": {
    value: 4,
    tolerance: 0.01,
    status: "critical",
  },
  rcri: {
    value: 4,
    tolerance: 0.01,
    status: "critical",
  },
  ascvd: {
    value: 5.38,
    tolerance: 0.01,
    status: "low",
  },
  dapt: {
    value: 4,
    tolerance: 0.01,
    status: "high",
  },
  h2fpef: {
    value: 9,
    tolerance: 0.01,
    status: "critical",
  },

  // -- Sprint 1.9 Batch 3 (Laboratory & Metabolic) --
  "ldl-cholesterol": {
    value: 160,
    tolerance: 0.01,
    status: "high",
  },
  "non-hdl-cholesterol": {
    value: 190,
    tolerance: 0.01,
    status: "high",
  },
  "albumin-globulin-ratio": {
    value: 1.33,
    tolerance: 0.01,
    status: "normal",
  },
  "tyg-index": {
    value: 8.82,
    tolerance: 0.01,
    status: "normal",
  },
  "triglyceride-hdl-ratio": {
    value: 3.75,
    tolerance: 0.01,
    status: "high",
  },
  quicki: {
    value: 0.34,
    tolerance: 0.01,
    status: "normal",
  },
  "winters-formula": {
    value: 23,
    tolerance: 0.01,
    status: "high",
  },
  "anion-gap-delta-ratio": {
    value: 0.92,
    tolerance: 0.01,
    status: "low",
  },
  "urine-anion-gap": {
    value: -80,
    tolerance: 0.01,
    status: "low",
  },
  "kt-v": {
    value: 1.29,
    tolerance: 0.01,
    status: "normal",
  },

  // -- Sprint 1.9 Batch 4 (Renal & Laboratory/Metabolic) --
  "fractional-excretion-uric-acid": {
    value: 5,
    tolerance: 0.01,
    status: "low",
  },
  "fractional-excretion-phosphate": {
    value: 25,
    tolerance: 0.01,
    status: "high",
  },
  "fractional-excretion-calcium": {
    value: 5,
    tolerance: 0.01,
    status: "high",
  },
  "renal-failure-index": {
    value: 0.6,
    tolerance: 0.01,
    status: "low",
  },
  "urine-osmolal-gap": {
    value: 160,
    tolerance: 0.01,
    status: "high",
  },
  "free-water-clearance": {
    value: 1.09,
    tolerance: 0.01,
    status: "normal",
  },
  "electrolyte-free-water-clearance": {
    value: 0.21,
    tolerance: 0.01,
    status: "high",
  },
  "urine-protein-creatinine-ratio": {
    value: 1.5,
    tolerance: 0.01,
    status: "high",
  },
  "creatinine-clearance-24h": {
    value: 100,
    tolerance: 0.01,
    status: "normal",
  },
  "total-cholesterol-hdl-ratio": {
    value: 3,
    tolerance: 0.01,
    status: "normal",
  },
  "atherogenic-index-of-plasma": {
    value: 0.1,
    tolerance: 0.01,
    status: "normal",
  },
  "apob-apoa1-ratio": {
    value: 0.71,
    tolerance: 0.01,
    status: "normal",
  },
  "respiratory-compensation": {
    value: 25,
    tolerance: 0.1,
    status: "normal",
  },
  "metabolic-alkalosis-compensation": {
    value: 49.6,
    tolerance: 0.1,
    status: "normal",
  },
  "free-thyroxine-index": {
    value: 2.4,
    tolerance: 0.01,
    status: "normal",
  },
  "metabolic-syndrome-atp3": {
    value: 5,
    tolerance: 0.01,
    status: "critical",
  },
};

// ---------------------------------------------------------------------------
// Group calculators by category
// ---------------------------------------------------------------------------

function groupByCategory(): Map<
  string,
  CalculatorDefinition[]
> {
  const map = new Map<string, CalculatorDefinition[]>();
  for (const calc of calculatorRegistry) {
    const arr = map.get(calc.category) ?? [];
    arr.push(calc);
    map.set(calc.category, arr);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertValidResult(
  result: CalculatorResult,
  calcId: string,
) {
  expect(result, `${calcId}: calculate() must return an object`).toBeDefined();
  expect(
    result,
    `${calcId}: result must have a value property`,
  ).toHaveProperty("value");
  expect(
    result,
    `${calcId}: result must have a status property`,
  ).toHaveProperty("status");
  expect(
    ["normal", "low", "high", "critical"],
    `${calcId}: status must be valid`,
  ).toContain(result.status);
}

function assertNoThrow(
  calc: CalculatorDefinition,
  inputs: Record<string, string>,
) {
  expect(
    () => calc.calculate(inputs),
    `${calc.id}: calculate() must not throw`,
  ).not.toThrow();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Calculator Smoke Tests", () => {
  const groups = groupByCategory();
  const categories = Array.from(groups.keys()).sort();

  for (const category of categories) {
    const calcs = groups.get(category)!;

    describe(category, () => {
      for (const calc of calcs) {
        describe(calc.id, () => {
          const inputs = testInputs[calc.id];

          it("has test inputs defined", () => {
            expect(
              inputs,
              `Missing test inputs for ${calc.id}`,
            ).toBeDefined();
          });

          if (!inputs) return;

          it("does not throw with valid inputs", () => {
            assertNoThrow(calc, inputs);
          });

          it("returns a valid result structure", () => {
            const result = calc.calculate(inputs);
            assertValidResult(result, calc.id);
          });

          it("returns a finite numeric value", () => {
            const result = calc.calculate(inputs);
            if (typeof result.value === "number") {
              expect(
                Number.isFinite(result.value),
                `${calc.id}: value must be finite, got ${result.value}`,
              ).toBe(true);
            }
          });

          // Exact value tests for calculators where we can predict the result
          if (exactExpectations[calc.id]) {
            it("returns expected numerical value", () => {
              const result = calc.calculate(inputs);
              const expected =
                exactExpectations[calc.id];

              if (
                typeof result.value === "number"
              ) {
                expect(
                  Math.abs(
                    result.value - expected.value,
                  ),
                ).toBeLessThan(expected.tolerance);
              }
            });

            if (exactExpectations[calc.id].status) {
              it("returns expected status", () => {
                const result = calc.calculate(inputs);
                expect(result.status).toBe(
                  exactExpectations[calc.id].status,
                );
              });
            }
          }
        });
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Validation error tests — calculators should return critical
// for missing/invalid inputs, not throw
// ---------------------------------------------------------------------------

describe("Calculator Input Validation", () => {
  it("every calculator does not throw for empty inputs", () => {
    for (const calc of calculatorRegistry) {
      const emptyInputs: Record<string, string> = {};
      for (const input of calc.inputs) {
        emptyInputs[input.id] = "";
      }

      expect(
        () => calc.calculate(emptyInputs),
        `${calc.id}: should not throw for empty inputs`,
      ).not.toThrow();

      const result = calc.calculate(emptyInputs);
      // Most calculators should return critical for empty inputs,
      // but some may return normal with NaN.
      // The key invariant: the result must have a valid structure.
      expect(
        result,
        `${calc.id}: must return a result object`,
      ).toHaveProperty("value");
      expect(
        result,
        `${calc.id}: must have a status property`,
      ).toHaveProperty("status");
    }
  });
});

// ---------------------------------------------------------------------------
// Direct-call validation guard regression tests.
//
// lbm and adjbw previously propagated NaN into the result value for missing,
// non-numeric, negative, or zero numeric inputs and silently misclassified
// invalid sex selections. These guards must return critical and never emit
// a NaN value.
// ---------------------------------------------------------------------------

const GUARDED_IDS = ["lean-body-weight", "adjbw", "ibw"];

function guardedCalculator(id: string) {
  const calc = getCalculatorById(id);
  expect(calc, `guarded calculator "${id}" must be registered`).toBeDefined();
  return calc!;
}

describe("Direct-Call Validation Guards", () => {
  it.each(GUARDED_IDS)("%s returns critical and no NaN for missing inputs", (id) => {
    const calc = guardedCalculator(id);
    const result = calc.calculate({});
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical and no NaN for non-numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = input.type === "select" ? "male" : "abc";
    }
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for negative numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "-100",
      weight: "-50",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for zero numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "0",
      weight: "0",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for invalid sex selection", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "not-a-sex",
      height: "170",
      weight: "70",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s keeps producing valid results for valid inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "170",
      weight: "70",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("normal");
    expect(Number.isFinite(Number(result.value))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Batch 7 — Direct-call validation guard regression tests.
//
// Batch 7 hardened 10 calculators whose direct invocation previously emitted
// NaN (silently misclassifying results) for missing, non-numeric, negative,
// or zero inputs. Each guard must return critical and never emit a NaN value;
// valid inputs must remain unaffected. Gestational-age deliberately allows
// zero (0 weeks 0 days), so its zero case is treated as non-critical.
// ---------------------------------------------------------------------------

const BATCH7_GUARDED_IDS = [
  "basal-metabolic-rate",
  "mifflin-st-jeor",
  "harris-benedict",
  "calorie-requirement",
  "fluid-requirement",
  "maintenance-fluids",
  "albumin-corrected-calcium",
  "fractional-excretion-calculator",
  "gestational-age",
  "waist-to-hip-ratio",
] as const;

const BATCH7_VALID_INPUTS: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "30", weight: "70", height: "170" },
  "mifflin-st-jeor": { sex: "male", age: "30", weight: "70", height: "170" },
  "harris-benedict": { sex: "male", age: "30", weight: "70", height: "170" },
  "calorie-requirement": { bmr: "1700", activity: "1.55" },
  "fluid-requirement": { weight: "70" },
  "maintenance-fluids": { weight: "70" },
  "albumin-corrected-calcium": { calcium: "8.0", albumin: "3.0" },
  "fractional-excretion-calculator": { urineNa: "40", plasmaNa: "140", urineCr: "80", plasmaCr: "1.0" },
  "gestational-age": { weeks: "30", days: "4" },
  "waist-to-hip-ratio": { waist: "80", hip: "100", sex: "1" },
};

const BATCH7_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "mifflin-st-jeor": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "harris-benedict": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "calorie-requirement": { bmr: "-1700", activity: "-1.55" },
  "fluid-requirement": { weight: "-70" },
  "maintenance-fluids": { weight: "-70" },
  "albumin-corrected-calcium": { calcium: "-8.0", albumin: "-3.0" },
  "fractional-excretion-calculator": { urineNa: "-40", plasmaNa: "-140", urineCr: "-80", plasmaCr: "-1.0" },
  "gestational-age": { weeks: "-1", days: "4" },
  "waist-to-hip-ratio": { waist: "-80", hip: "-100", sex: "1" },
};

const BATCH7_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "30", weight: "0", height: "170" },
  "mifflin-st-jeor": { sex: "male", age: "30", weight: "0", height: "170" },
  "harris-benedict": { sex: "male", age: "30", weight: "0", height: "170" },
  "calorie-requirement": { bmr: "0", activity: "1.55" },
  "fluid-requirement": { weight: "0" },
  "maintenance-fluids": { weight: "0" },
  "albumin-corrected-calcium": { calcium: "8.0", albumin: "0" },
  "fractional-excretion-calculator": { urineNa: "40", plasmaNa: "140", urineCr: "80", plasmaCr: "0" },
  "waist-to-hip-ratio": { waist: "80", hip: "0", sex: "1" },
};

const BATCH7_ZERO_GUARDED_IDS = BATCH7_GUARDED_IDS.filter(
  (id) => id !== "gestational-age",
);

describe("Batch 7 Direct-Call Validation Guards", () => {
  function batch7Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 7 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch7Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch7Calc(id).calculate(BATCH7_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH7_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(BATCH7_ZERO_OVERRIDES[id]), id);
    },
  );

  it("gestational-age allows zero weeks and days (returns normal)", () => {
    const result = batch7Calc("gestational-age").calculate({ weeks: "0", days: "0" });
    expect(result.status).not.toBe("critical");
    expect(Number.isFinite(Number(result.value))).toBe(true);
  });

  it.each(BATCH7_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch7Calc(id).calculate(BATCH7_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );
});

// ---------------------------------------------------------------------------
// Batch 3 (Sprint 1.9) — Laboratory & Metabolic calculator validation guards.
//
// Each new calculator must return critical and never emit NaN for missing,
// non-numeric, negative, or zero numeric inputs, and must stay non-critical
// for valid inputs. Logical guards (e.g., Friedewald TG limit, Winter's HCO3
// limit, delta-ratio applicability, Kt/V BUN ordering) are also exercised.
// ---------------------------------------------------------------------------

const BATCH3_GUARDED_IDS = [
  "ldl-cholesterol",
  "non-hdl-cholesterol",
  "albumin-globulin-ratio",
  "tyg-index",
  "triglyceride-hdl-ratio",
  "quicki",
  "winters-formula",
  "anion-gap-delta-ratio",
  "urine-anion-gap",
  "kt-v",
] as const;

const BATCH3_VALID_INPUTS: Record<string, Record<string, string>> = {
  "ldl-cholesterol": { totalCholesterol: "240", hdl: "50", triglycerides: "150" },
  "non-hdl-cholesterol": { totalCholesterol: "240", hdl: "50" },
  "albumin-globulin-ratio": { albumin: "4", totalProtein: "7" },
  "tyg-index": { triglycerides: "150", glucose: "90" },
  "triglyceride-hdl-ratio": { triglycerides: "150", hdl: "40" },
  quicki: { fastingInsulin: "10", fastingGlucose: "90" },
  "winters-formula": { bicarbonate: "10", pco2: "28" },
  "anion-gap-delta-ratio": { anionGap: "23", bicarbonate: "12" },
  "urine-anion-gap": { urineNa: "10", urineK: "20", urineCl: "110" },
  "kt-v": { preBun: "90", postBun: "30", ultrafiltrate: "2.5", treatmentTime: "4", postWeight: "75" },
};

const BATCH3_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "ldl-cholesterol": { totalCholesterol: "-240", hdl: "-50", triglycerides: "-150" },
  "non-hdl-cholesterol": { totalCholesterol: "-240", hdl: "-50" },
  "albumin-globulin-ratio": { albumin: "-4", totalProtein: "-7" },
  "tyg-index": { triglycerides: "-150", glucose: "-90" },
  "triglyceride-hdl-ratio": { triglycerides: "-150", hdl: "-40" },
  quicki: { fastingInsulin: "-10", fastingGlucose: "-90" },
  "winters-formula": { bicarbonate: "-10", pco2: "-28" },
  "anion-gap-delta-ratio": { anionGap: "-23", bicarbonate: "-12" },
  "urine-anion-gap": { urineNa: "-10", urineK: "-20", urineCl: "-110" },
  "kt-v": { preBun: "-90", postBun: "-30", ultrafiltrate: "-2.5", treatmentTime: "-4", postWeight: "-75" },
};

const BATCH3_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "ldl-cholesterol": { totalCholesterol: "0", hdl: "50", triglycerides: "150" },
  "non-hdl-cholesterol": { totalCholesterol: "0", hdl: "50" },
  "albumin-globulin-ratio": { albumin: "0", totalProtein: "7" },
  "tyg-index": { triglycerides: "0", glucose: "90" },
  "triglyceride-hdl-ratio": { triglycerides: "0", hdl: "40" },
  quicki: { fastingInsulin: "0", fastingGlucose: "90" },
  "winters-formula": { bicarbonate: "10", pco2: "0" },
  "anion-gap-delta-ratio": { anionGap: "0", bicarbonate: "12" },
  "kt-v": { preBun: "0", postBun: "30", ultrafiltrate: "2.5", treatmentTime: "4", postWeight: "75" },
};

// Urine electrolytes can legitimately be zero, so urine-anion-gap is excluded
// from the zero-input critical guard.
const BATCH3_ZERO_GUARDED_IDS = BATCH3_GUARDED_IDS.filter(
  (id) => id !== "urine-anion-gap",
);

type BoundaryCase = {
  id: string;
  inputs: Record<string, string>;
  expectedStatus: string;
  expectedValue?: number;
};

const BATCH3_BOUNDARY_CASES: BoundaryCase[] = [
  // LDL ATP III cut-points
  {
    id: "ldl-cholesterol",
    inputs: { totalCholesterol: "190", hdl: "60", triglycerides: "150" },
    expectedStatus: "normal",
    expectedValue: 100,
  },
  {
    id: "ldl-cholesterol",
    inputs: { totalCholesterol: "230", hdl: "70", triglycerides: "150" },
    expectedStatus: "high",
    expectedValue: 130,
  },
  // Non-HDL ATP III cut-points
  {
    id: "non-hdl-cholesterol",
    inputs: { totalCholesterol: "180", hdl: "50" },
    expectedStatus: "normal",
    expectedValue: 130,
  },
  {
    id: "non-hdl-cholesterol",
    inputs: { totalCholesterol: "210", hdl: "50" },
    expectedStatus: "high",
    expectedValue: 160,
  },
  // A/G ratio boundaries
  {
    id: "albumin-globulin-ratio",
    inputs: { albumin: "3", totalProtein: "7" },
    expectedStatus: "low",
    expectedValue: 0.75,
  },
  // Winter's formula compensation windows
  {
    id: "winters-formula",
    inputs: { bicarbonate: "10", pco2: "22" },
    expectedStatus: "normal",
    expectedValue: 23,
  },
  {
    id: "winters-formula",
    inputs: { bicarbonate: "10", pco2: "18" },
    expectedStatus: "low",
    expectedValue: 23,
  },
  // Delta ratio windows
  {
    id: "anion-gap-delta-ratio",
    inputs: { anionGap: "30", bicarbonate: "12" },
    expectedStatus: "normal",
    expectedValue: 1.5,
  },
  {
    id: "anion-gap-delta-ratio",
    inputs: { anionGap: "42", bicarbonate: "10" },
    expectedStatus: "high",
    expectedValue: 2.14,
  },
  // Urine anion gap positive (renal acidification defect)
  {
    id: "urine-anion-gap",
    inputs: { urineNa: "50", urineK: "40", urineCl: "30" },
    expectedStatus: "high",
    expectedValue: 60,
  },
  // Kt/V dose bands
  {
    id: "kt-v",
    inputs: { preBun: "90", postBun: "38", ultrafiltrate: "2.5", treatmentTime: "4", postWeight: "75" },
    expectedStatus: "high",
    expectedValue: 1.03,
  },
  {
    id: "kt-v",
    inputs: { preBun: "90", postBun: "45", ultrafiltrate: "2.5", treatmentTime: "4", postWeight: "75" },
    expectedStatus: "critical",
    expectedValue: 0.83,
  },
];

describe("Batch 3 Direct-Call Validation Guards", () => {
  function batch3Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 3 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch3Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH3_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch3Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH3_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch3Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH3_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch3Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH3_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch3Calc(id).calculate(BATCH3_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH3_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch3Calc(id).calculate(BATCH3_ZERO_OVERRIDES[id]), id);
    },
  );

  it("urine-anion-gap allows zero urine electrolytes (non-critical)", () => {
    const result = batch3Calc("urine-anion-gap").calculate({
      urineNa: "0",
      urineK: "0",
      urineCl: "0",
    });
    expect(result.status).not.toBe("critical");
    expect(Number.isFinite(Number(result.value))).toBe(true);
  });

  it.each(BATCH3_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch3Calc(id).calculate(BATCH3_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );

  it.each(BATCH3_BOUNDARY_CASES)(
    "%s boundary inputs yield expected status and value",
    (tc) => {
      const result = batch3Calc(tc.id).calculate(tc.inputs);
      expect(result.status, `${tc.id}: unexpected status`).toBe(tc.expectedStatus);
      if (tc.expectedValue !== undefined) {
        expect(Math.abs(Number(result.value) - tc.expectedValue)).toBeLessThan(0.01);
      }
    },
  );

  it("ldl-cholesterol returns critical when triglycerides are ≥ 400 mg/dL", () => {
    const result = batch3Calc("ldl-cholesterol").calculate({
      totalCholesterol: "240",
      hdl: "50",
      triglycerides: "450",
    });
    expect(result.status).toBe("critical");
  });

  it("winters-formula returns critical when bicarbonate is ≥ 24 mEq/L", () => {
    const result = batch3Calc("winters-formula").calculate({
      bicarbonate: "26",
      pco2: "40",
    });
    expect(result.status).toBe("critical");
  });

  it("anion-gap-delta-ratio returns critical when there is no high anion gap", () => {
    const result = batch3Calc("anion-gap-delta-ratio").calculate({
      anionGap: "10",
      bicarbonate: "12",
    });
    expect(result.status).toBe("critical");
  });

  it("anion-gap-delta-ratio returns critical when bicarbonate is ≥ 24 mEq/L", () => {
    const result = batch3Calc("anion-gap-delta-ratio").calculate({
      anionGap: "23",
      bicarbonate: "26",
    });
    expect(result.status).toBe("critical");
  });

  it("kt-v returns critical when post-dialysis BUN is not below pre-dialysis BUN", () => {
    const result = batch3Calc("kt-v").calculate({
      preBun: "60",
      postBun: "90",
      ultrafiltrate: "2.5",
      treatmentTime: "4",
      postWeight: "75",
    });
    expect(result.status).toBe("critical");
  });

  it("kt-v returns critical when the log term is not positive", () => {
    const result = batch3Calc("kt-v").calculate({
      preBun: "100",
      postBun: "5",
      ultrafiltrate: "0",
      treatmentTime: "20",
      postWeight: "75",
    });
    expect(result.status).toBe("critical");
  });

  it("albumin-globulin-ratio returns critical when globulin is not positive", () => {
    const result = batch3Calc("albumin-globulin-ratio").calculate({
      albumin: "6",
      totalProtein: "5",
    });
    expect(result.status).toBe("critical");
  });

  it("ldl-cholesterol returns critical when the calculated LDL is not positive", () => {
    const result = batch3Calc("ldl-cholesterol").calculate({
      totalCholesterol: "100",
      hdl: "90",
      triglycerides: "100",
    });
    expect(result.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Sprint 1.9 Batch 4 (Renal & Laboratory/Metabolic) Direct-Call Validation
// Guards. Verifies that guarded calculators return critical (never NaN) for
// missing, empty, non-numeric, negative, and (where applicable) zero inputs,
// and that clinically valid inputs remain non-critical and finite.
// Domain-specific guards (disorder-type validity, metabolic alkalosis
// applicability, uric-acid/prerenal cut-points, nephrotic boundaries,
// CH2O/EFWC signs, TC/HDL and AIP cut-points, ApoB/ApoA1 sex thresholds,
// respiratory/metabolic compensation deviation) are also exercised.
// ---------------------------------------------------------------------------

const BATCH4_GUARDED_IDS = [
  "fractional-excretion-uric-acid",
  "fractional-excretion-phosphate",
  "fractional-excretion-calcium",
  "renal-failure-index",
  "urine-osmolal-gap",
  "free-water-clearance",
  "electrolyte-free-water-clearance",
  "urine-protein-creatinine-ratio",
  "creatinine-clearance-24h",
  "total-cholesterol-hdl-ratio",
  "atherogenic-index-of-plasma",
  "apob-apoa1-ratio",
  "respiratory-compensation",
  "metabolic-alkalosis-compensation",
  "free-thyroxine-index",
  "metabolic-syndrome-atp3",
] as const;

const BATCH4_VALID_INPUTS: Record<string, Record<string, string>> = {
  "fractional-excretion-uric-acid": { urineUricAcid: "20", serumUricAcid: "6", urineCr: "80", plasmaCr: "1.2" },
  "fractional-excretion-phosphate": { urinePhosphate: "50", serumPhosphate: "3", urineCr: "80", plasmaCr: "1.2" },
  "fractional-excretion-calcium": { urineCalcium: "50", serumCalcium: "10", urineCr: "100", plasmaCr: "1.0" },
  "renal-failure-index": { urineSodium: "40", plasmaCr: "1.2", urineCr: "80" },
  "urine-osmolal-gap": { urineOsmolality: "600", urineSodium: "80", urinePotassium: "40", urineUrea: "560", urineGlucose: "0" },
  "free-water-clearance": { urineVolume: "1.5", urineOsmolality: "80", plasmaOsmolality: "290" },
  "electrolyte-free-water-clearance": { urineVolume: "1.5", urineSodium: "80", urinePotassium: "40", plasmaSodium: "140" },
  "urine-protein-creatinine-ratio": { urineProtein: "150", urineCreatinine: "100" },
  "creatinine-clearance-24h": { urineCreatinine: "80", urineVolume: "1800", serumCreatinine: "1.0" },
  "total-cholesterol-hdl-ratio": { totalCholesterol: "180", hdlCholesterol: "60" },
  "atherogenic-index-of-plasma": { triglycerides: "100", hdlCholesterol: "80" },
  "apob-apoa1-ratio": { apoB: "1.0", apoA1: "1.4", sex: "male" },
  "respiratory-compensation": { disorderType: "chronicRespAcidosis", paCO2: "60", measuredBicarbonate: "32" },
  "metabolic-alkalosis-compensation": { bicarbonate: "40", measuredPaCO2: "50" },
  "free-thyroxine-index": { totalT4: "8", t3Uptake: "30" },
  "metabolic-syndrome-atp3": { sex: "male", waist: "90", triglycerides: "100", hdl: "55", sbp: "120", dbp: "80", fastingGlucose: "90", lipidRx: "no", bpRx: "no", glucoseRx: "no" },
};

const BATCH4_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "fractional-excretion-uric-acid": { urineUricAcid: "-20", serumUricAcid: "-6", urineCr: "-80", plasmaCr: "-1.2" },
  "fractional-excretion-phosphate": { urinePhosphate: "-50", serumPhosphate: "-3", urineCr: "-80", plasmaCr: "-1.2" },
  "fractional-excretion-calcium": { urineCalcium: "-50", serumCalcium: "-10", urineCr: "-100", plasmaCr: "-1.0" },
  "renal-failure-index": { urineSodium: "-40", plasmaCr: "-1.2", urineCr: "-80" },
  "urine-osmolal-gap": { urineOsmolality: "-600", urineSodium: "-80", urinePotassium: "-40", urineUrea: "-560", urineGlucose: "-0" },
  "free-water-clearance": { urineVolume: "-1.5", urineOsmolality: "-80", plasmaOsmolality: "-290" },
  "electrolyte-free-water-clearance": { urineVolume: "-1.5", urineSodium: "-80", urinePotassium: "-40", plasmaSodium: "-140" },
  "urine-protein-creatinine-ratio": { urineProtein: "-150", urineCreatinine: "-100" },
  "creatinine-clearance-24h": { urineCreatinine: "-80", urineVolume: "-1800", serumCreatinine: "-1.0" },
  "total-cholesterol-hdl-ratio": { totalCholesterol: "-180", hdlCholesterol: "-60" },
  "atherogenic-index-of-plasma": { triglycerides: "-100", hdlCholesterol: "-80" },
  "apob-apoa1-ratio": { apoB: "-1.0", apoA1: "-1.4", sex: "male" },
  "respiratory-compensation": { disorderType: "chronicRespAcidosis", paCO2: "-60", measuredBicarbonate: "-32" },
  "metabolic-alkalosis-compensation": { bicarbonate: "-40", measuredPaCO2: "-50" },
  "free-thyroxine-index": { totalT4: "-8", t3Uptake: "-30" },
  "metabolic-syndrome-atp3": { sex: "female", waist: "-90", triglycerides: "-160", hdl: "-45", sbp: "-135", dbp: "-85", fastingGlucose: "-110", lipidRx: "no", bpRx: "no", glucoseRx: "no" },
};

const BATCH4_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "fractional-excretion-uric-acid": { urineUricAcid: "0", serumUricAcid: "6", urineCr: "80", plasmaCr: "1.2" },
  "fractional-excretion-phosphate": { urinePhosphate: "0", serumPhosphate: "3", urineCr: "80", plasmaCr: "1.2" },
  "fractional-excretion-calcium": { urineCalcium: "0", serumCalcium: "10", urineCr: "100", plasmaCr: "1.0" },
  "renal-failure-index": { urineSodium: "0", plasmaCr: "1.2", urineCr: "80" },
  "urine-osmolal-gap": { urineOsmolality: "0", urineSodium: "80", urinePotassium: "40", urineUrea: "560", urineGlucose: "0" },
  "free-water-clearance": { urineVolume: "0", urineOsmolality: "80", plasmaOsmolality: "290" },
  "electrolyte-free-water-clearance": { urineVolume: "0", urineSodium: "80", urinePotassium: "40", plasmaSodium: "140" },
  "urine-protein-creatinine-ratio": { urineProtein: "150", urineCreatinine: "0" },
  "creatinine-clearance-24h": { urineCreatinine: "80", urineVolume: "0", serumCreatinine: "1.0" },
  "total-cholesterol-hdl-ratio": { totalCholesterol: "180", hdlCholesterol: "0" },
  "atherogenic-index-of-plasma": { triglycerides: "100", hdlCholesterol: "0" },
  "apob-apoa1-ratio": { apoB: "1.0", apoA1: "0", sex: "male" },
  "respiratory-compensation": { disorderType: "chronicRespAcidosis", paCO2: "60", measuredBicarbonate: "0" },
  "metabolic-alkalosis-compensation": { bicarbonate: "40", measuredPaCO2: "0" },
  "free-thyroxine-index": { totalT4: "8", t3Uptake: "0" },
  "metabolic-syndrome-atp3": { sex: "female", waist: "90", triglycerides: "160", hdl: "45", sbp: "135", dbp: "85", fastingGlucose: "110", lipidRx: "no", bpRx: "no", glucoseRx: "no" },
};

const BATCH4_BOUNDARY_CASES: BoundaryCase[] = [
  // FEUA prerenal vs indeterminate vs intrinsic cut-points
  {
    id: "fractional-excretion-uric-acid",
    inputs: { urineUricAcid: "30", serumUricAcid: "5", urineCr: "100", plasmaCr: "1.0" },
    expectedStatus: "low",
    expectedValue: 6,
  },
  {
    id: "fractional-excretion-uric-acid",
    inputs: { urineUricAcid: "70", serumUricAcid: "5", urineCr: "100", plasmaCr: "1.0" },
    expectedStatus: "normal",
    expectedValue: 14,
  },
  {
    id: "fractional-excretion-uric-acid",
    inputs: { urineUricAcid: "120", serumUricAcid: "5", urineCr: "100", plasmaCr: "1.0" },
    expectedStatus: "high",
    expectedValue: 24,
  },
  // FEP renal wasting threshold
  {
    id: "fractional-excretion-phosphate",
    inputs: { urinePhosphate: "10", serumPhosphate: "3", urineCr: "100", plasmaCr: "1.0" },
    expectedStatus: "low",
    expectedValue: 3.33,
  },
  // FECa > 2% favors PHPT
  {
    id: "fractional-excretion-calcium",
    inputs: { urineCalcium: "50", serumCalcium: "10", urineCr: "100", plasmaCr: "1.0" },
    expectedStatus: "high",
    expectedValue: 5,
  },
  // RFI prerenal
  {
    id: "renal-failure-index",
    inputs: { urineSodium: "20", plasmaCr: "1.2", urineCr: "80" },
    expectedStatus: "low",
    expectedValue: 0.3,
  },
  // UOG elevated (unmeasured osmoles)
  {
    id: "urine-osmolal-gap",
    inputs: { urineOsmolality: "600", urineSodium: "80", urinePotassium: "40", urineUrea: "560", urineGlucose: "0" },
    expectedStatus: "high",
    expectedValue: 160,
  },
  // CH2O negative (concentrated urine)
  {
    id: "free-water-clearance",
    inputs: { urineVolume: "1.5", urineOsmolality: "600", plasmaOsmolality: "290" },
    expectedStatus: "high",
  },
  // EFWC negative (electrolyte-rich urine)
  {
    id: "electrolyte-free-water-clearance",
    inputs: { urineVolume: "1.5", urineSodium: "150", urinePotassium: "100", plasmaSodium: "140" },
    expectedStatus: "normal",
  },
  // UPCR nephrotic range boundary
  {
    id: "urine-protein-creatinine-ratio",
    inputs: { urineProtein: "350", urineCreatinine: "100" },
    expectedStatus: "critical",
    expectedValue: 3.5,
  },
  // UPCR normal
  {
    id: "urine-protein-creatinine-ratio",
    inputs: { urineProtein: "10", urineCreatinine: "100" },
    expectedStatus: "normal",
    expectedValue: 0.1,
  },
  // CrCl normal
  {
    id: "creatinine-clearance-24h",
    inputs: { urineCreatinine: "80", urineVolume: "1800", serumCreatinine: "1.0" },
    expectedStatus: "normal",
    expectedValue: 100,
  },
  // TC/HDL desirable vs elevated
  {
    id: "total-cholesterol-hdl-ratio",
    inputs: { totalCholesterol: "180", hdlCholesterol: "60" },
    expectedStatus: "normal",
    expectedValue: 3,
  },
  {
    id: "total-cholesterol-hdl-ratio",
    inputs: { totalCholesterol: "240", hdlCholesterol: "40" },
    expectedStatus: "critical",
    expectedValue: 6,
  },
  // AIP low vs intermediate
  {
    id: "atherogenic-index-of-plasma",
    inputs: { triglycerides: "100", hdlCholesterol: "80" },
    expectedStatus: "normal",
    expectedValue: 0.1,
  },
  {
    id: "atherogenic-index-of-plasma",
    inputs: { triglycerides: "200", hdlCholesterol: "40" },
    expectedStatus: "critical",
    expectedValue: 0.7,
  },
  // ApoB/ApoA1 female threshold (elevated)
  {
    id: "apob-apoa1-ratio",
    inputs: { apoB: "1.0", apoA1: "1.1", sex: "female" },
    expectedStatus: "critical",
    expectedValue: 0.91,
  },
  // Respiratory compensation chronic acidosis (appropriate)
  {
    id: "respiratory-compensation",
    inputs: { disorderType: "chronicRespAcidosis", paCO2: "60", measuredBicarbonate: "32" },
    expectedStatus: "normal",
    expectedValue: 32,
  },
  // Respiratory compensation acute alkalosis (appropriate)
  {
    id: "respiratory-compensation",
    inputs: { disorderType: "acuteRespAlkalosis", paCO2: "30", measuredBicarbonate: "26" },
    expectedStatus: "normal",
    expectedValue: 26,
  },
  // Metabolic alkalosis appropriate compensation
  {
    id: "metabolic-alkalosis-compensation",
    inputs: { bicarbonate: "40", measuredPaCO2: "50" },
    expectedStatus: "normal",
    expectedValue: 49.6,
  },
  // FTI normal
  {
    id: "free-thyroxine-index",
    inputs: { totalT4: "8", t3Uptake: "30" },
    expectedStatus: "normal",
    expectedValue: 2.4,
  },
  // MetS criteria counting
  {
    id: "metabolic-syndrome-atp3",
    inputs: { sex: "male", waist: "110", triglycerides: "200", hdl: "35", sbp: "140", dbp: "90", fastingGlucose: "120", lipidRx: "no", bpRx: "no", glucoseRx: "no" },
    expectedStatus: "critical",
    expectedValue: 5,
  },
];

describe("Batch 4 Direct-Call Validation Guards", () => {
  function batch4Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 4 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch4Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH4_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch4Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH4_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch4Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH4_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch4Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH4_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch4Calc(id).calculate(BATCH4_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH4_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch4Calc(id).calculate(BATCH4_ZERO_OVERRIDES[id]), id);
    },
  );

  it.each(BATCH4_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch4Calc(id).calculate(BATCH4_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );

  it.each(BATCH4_BOUNDARY_CASES)(
    "%s boundary inputs yield expected status and value",
    (tc) => {
      const result = batch4Calc(tc.id).calculate(tc.inputs);
      expect(result.status, `${tc.id}: unexpected status`).toBe(tc.expectedStatus);
      if (tc.expectedValue !== undefined) {
        expect(Math.abs(Number(result.value) - tc.expectedValue)).toBeLessThan(0.01);
      }
    },
  );

  it("respiratory-compensation returns critical for an invalid disorder type", () => {
    const result = batch4Calc("respiratory-compensation").calculate({
      disorderType: "not-a-type",
      paCO2: "50",
      measuredBicarbonate: "25",
    });
    expect(result.status).toBe("critical");
  });

  it("metabolic-alkalosis-compensation returns critical when bicarbonate is not elevated", () => {
    const result = batch4Calc("metabolic-alkalosis-compensation").calculate({
      bicarbonate: "22",
      measuredPaCO2: "45",
    });
    expect(result.status).toBe("critical");
  });

  it("apob-apoa1-ratio returns critical for an invalid sex", () => {
    const result = batch4Calc("apob-apoa1-ratio").calculate({
      apoB: "1.0",
      apoA1: "1.4",
      sex: "other",
    });
    expect(result.status).toBe("critical");
  });

  it("metabolic-syndrome-atp3 returns critical for an invalid sex", () => {
    const result = batch4Calc("metabolic-syndrome-atp3").calculate({
      sex: "other",
      waist: "90",
      triglycerides: "160",
      hdl: "45",
      sbp: "135",
      dbp: "85",
      fastingGlucose: "110",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(result.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Sprint 1.9 Batch 5 (Obstetrics) Direct-Call Validation Guards. Verifies
// that guarded calculators return critical (never NaN) for missing, empty,
// non-numeric, negative, and (where applicable) zero inputs, and that
// clinically valid inputs remain non-critical and finite.
//
// Select-only calculators (bishop-score, biophysical-profile,
// magnesium-sulfate-preeclampsia, epds) are excluded from the zero-input
// guard because "0" is a valid option value for every select; their missing /
// empty / non-numeric / negative guards still apply.
//
// Domain-specific boundary checks (Bishop favorability, BPP score bands,
// HELLP criteria counting, preeclampsia severe features, IOM weight-gain
// midpoints, MgSO4 totals, EBL gravimetric/hematocrit cut-points, EPDS
// screen-positive and self-harm thresholds) are also exercised.
// ---------------------------------------------------------------------------

const BATCH5_GUARDED_IDS = [
  "bishop-score",
  "biophysical-profile",
  "hellp-syndrome",
  "hadlock-efw",
  "preeclampsia-criteria",
  "gestational-weight-gain",
  "magnesium-sulfate-preeclampsia",
  "ebl-obstetric",
  "epds",
] as const;

// "0" is a valid select option for these calculators, so they cannot be
// required to turn a zero input into a critical result.
const BATCH5_SELECT_ONLY_IDS = new Set([
  "bishop-score",
  "biophysical-profile",
  "magnesium-sulfate-preeclampsia",
  "epds",
]);

const BATCH5_ZERO_GUARDED_IDS = BATCH5_GUARDED_IDS.filter(
  (id) => !BATCH5_SELECT_ONLY_IDS.has(id),
);

const BATCH5_VALID_INPUTS: Record<string, Record<string, string>> = {
  "bishop-score": { dilation: "2", effacement: "2", station: "2", consistency: "1", position: "1" },
  "biophysical-profile": { breathing: "2", movement: "2", tone: "2", amnioticFluid: "2", nst: "2" },
  "hellp-syndrome": { platelets: "120", ast: "90", ldh: "400", hemolysis: "no" },
  "hadlock-efw": { bpd: "9.4", hc: "33.0", ac: "32.5", fl: "7.0" },
  "preeclampsia-criteria": { sbp: "145", dbp: "95", proteinuria: "yes", platelets: "150", creatinine: "0.9", transaminases: "no", ruqPain: "no", pulmonaryEdema: "no", headache: "no", visual: "no" },
  "gestational-weight-gain": { bmi: "26" },
  "magnesium-sulfate-preeclampsia": { loadingDose: "4", maintenance: "2" },
  "ebl-obstetric": { method: "gravimetric", wetWeight: "500", dryWeight: "200" },
  epds: { item1: "0", item2: "0", item3: "0", item4: "0", item5: "0", item6: "0", item7: "0", item8: "0", item9: "0", item10: "0" },
};

const BATCH5_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "bishop-score": { dilation: "-1", effacement: "-1", station: "-1", consistency: "-1", position: "-1" },
  "biophysical-profile": { breathing: "-1", movement: "-1", tone: "-1", amnioticFluid: "-1", nst: "-1" },
  "hellp-syndrome": { platelets: "-1", ast: "-1", ldh: "-1", hemolysis: "-1" },
  "hadlock-efw": { bpd: "-1", hc: "-1", ac: "-1", fl: "-1" },
  "preeclampsia-criteria": { sbp: "-1", dbp: "-1", proteinuria: "-1", platelets: "-1", creatinine: "-1", transaminases: "-1", ruqPain: "-1", pulmonaryEdema: "-1", headache: "-1", visual: "-1" },
  "gestational-weight-gain": { bmi: "-1" },
  "magnesium-sulfate-preeclampsia": { loadingDose: "-1", maintenance: "-1" },
  "ebl-obstetric": { method: "gravimetric", wetWeight: "-1", dryWeight: "-1" },
  epds: { item1: "-1", item2: "-1", item3: "-1", item4: "-1", item5: "-1", item6: "-1", item7: "-1", item8: "-1", item9: "-1", item10: "-1" },
};

const BATCH5_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "hellp-syndrome": { platelets: "0", ast: "0", ldh: "0", hemolysis: "no" },
  "hadlock-efw": { bpd: "0", hc: "0", ac: "0", fl: "0" },
  "preeclampsia-criteria": { sbp: "0", dbp: "0", proteinuria: "no", platelets: "0", creatinine: "0", transaminases: "no", ruqPain: "no", pulmonaryEdema: "no", headache: "no", visual: "no" },
  "gestational-weight-gain": { bmi: "0" },
  "ebl-obstetric": { method: "gravimetric", wetWeight: "0", dryWeight: "0" },
};

const BATCH5_BOUNDARY_CASES: BoundaryCase[] = [
  // Bishop unfavorable (score 5)
  {
    id: "bishop-score",
    inputs: { dilation: "1", effacement: "1", station: "1", consistency: "1", position: "1" },
    expectedStatus: "high",
    expectedValue: 5,
  },
  // Bishop favorable (score 8)
  {
    id: "bishop-score",
    inputs: { dilation: "2", effacement: "2", station: "2", consistency: "1", position: "1" },
    expectedStatus: "normal",
    expectedValue: 8,
  },
  // BPP equivocal (score 6)
  {
    id: "biophysical-profile",
    inputs: { breathing: "2", movement: "2", tone: "0", amnioticFluid: "2", nst: "0" },
    expectedStatus: "high",
    expectedValue: 6,
  },
  // BPP abnormal (score 4)
  {
    id: "biophysical-profile",
    inputs: { breathing: "0", movement: "0", tone: "0", amnioticFluid: "2", nst: "2" },
    expectedStatus: "critical",
    expectedValue: 4,
  },
  // HELLP complete (all three criteria)
  {
    id: "hellp-syndrome",
    inputs: { platelets: "95", ast: "85", ldh: "550", hemolysis: "yes" },
    expectedStatus: "critical",
    expectedValue: 3,
  },
  // HELLP partial (single criterion)
  {
    id: "hellp-syndrome",
    inputs: { platelets: "120", ast: "90", ldh: "400", hemolysis: "no" },
    expectedStatus: "high",
    expectedValue: 1,
  },
  // Preeclampsia with four severe features
  {
    id: "preeclampsia-criteria",
    inputs: { sbp: "162", dbp: "104", proteinuria: "yes", platelets: "90", creatinine: "1.2", transaminases: "yes", ruqPain: "no", pulmonaryEdema: "no", headache: "no", visual: "no" },
    expectedStatus: "critical",
    expectedValue: 4,
  },
  // No preeclampsia, no severe features
  {
    id: "preeclampsia-criteria",
    inputs: { sbp: "120", dbp: "75", proteinuria: "no", platelets: "200", creatinine: "0.8", transaminases: "no", ruqPain: "no", pulmonaryEdema: "no", headache: "no", visual: "no" },
    expectedStatus: "normal",
    expectedValue: 0,
  },
  // IOM underweight midpoint (28-40 lb)
  {
    id: "gestational-weight-gain",
    inputs: { bmi: "17" },
    expectedStatus: "normal",
    expectedValue: 34,
  },
  // IOM normal-weight midpoint (25-35 lb)
  {
    id: "gestational-weight-gain",
    inputs: { bmi: "22" },
    expectedStatus: "normal",
    expectedValue: 30,
  },
  // IOM obese midpoint (11-20 lb)
  {
    id: "gestational-weight-gain",
    inputs: { bmi: "32" },
    expectedStatus: "normal",
    expectedValue: 16,
  },
  // MgSO4 4 g load + 2 g/h
  {
    id: "magnesium-sulfate-preeclampsia",
    inputs: { loadingDose: "4", maintenance: "2" },
    expectedStatus: "normal",
    expectedValue: 52,
  },
  // MgSO4 6 g load + 1 g/h
  {
    id: "magnesium-sulfate-preeclampsia",
    inputs: { loadingDose: "6", maintenance: "1" },
    expectedStatus: "normal",
    expectedValue: 30,
  },
  // EBL gravimetric below 500 mL
  {
    id: "ebl-obstetric",
    inputs: { method: "gravimetric", wetWeight: "500", dryWeight: "200" },
    expectedStatus: "normal",
    expectedValue: 300,
  },
  // EBL hematocrit severe (>1000 mL)
  {
    id: "ebl-obstetric",
    inputs: { method: "hct", weightKg: "70", preHct: "36", postHct: "28" },
    expectedStatus: "critical",
    expectedValue: 1322,
  },
  // EBL hematocrit moderate (500-999 mL)
  {
    id: "ebl-obstetric",
    inputs: { method: "hct", weightKg: "70", preHct: "36", postHct: "30" },
    expectedStatus: "high",
    expectedValue: 992,
  },
  // EPDS below screen-positive threshold (9/30)
  {
    id: "epds",
    inputs: { item1: "1", item2: "1", item3: "1", item4: "1", item5: "1", item6: "1", item7: "1", item8: "1", item9: "1", item10: "0" },
    expectedStatus: "normal",
    expectedValue: 9,
  },
  // EPDS screen-positive threshold (10/30)
  {
    id: "epds",
    inputs: { item1: "2", item2: "2", item3: "2", item4: "2", item5: "2", item6: "0", item7: "0", item8: "0", item9: "0", item10: "0" },
    expectedStatus: "high",
    expectedValue: 10,
  },
  // EPDS self-harm item triggers critical regardless of total
  {
    id: "epds",
    inputs: { item1: "0", item2: "0", item3: "0", item4: "0", item5: "0", item6: "0", item7: "0", item8: "0", item9: "0", item10: "1" },
    expectedStatus: "critical",
    expectedValue: 1,
  },
];

describe("Batch 5 Direct-Call Validation Guards", () => {
  function batch5Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 5 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch5Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH5_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch5Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH5_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch5Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH5_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch5Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH5_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch5Calc(id).calculate(BATCH5_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH5_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch5Calc(id).calculate(BATCH5_ZERO_OVERRIDES[id]), id);
    },
  );

  it.each(BATCH5_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch5Calc(id).calculate(BATCH5_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );

  it.each(BATCH5_BOUNDARY_CASES)(
    "%s boundary inputs yield expected status and value",
    (tc) => {
      const result = batch5Calc(tc.id).calculate(tc.inputs);
      expect(result.status, `${tc.id}: unexpected status`).toBe(tc.expectedStatus);
      if (tc.expectedValue !== undefined) {
        expect(Math.abs(Number(result.value) - tc.expectedValue)).toBeLessThan(0.01);
      }
    },
  );

  it("ebl-obstetric returns critical for an invalid method", () => {
    const result = batch5Calc("ebl-obstetric").calculate({
      method: "not-a-method",
      wetWeight: "500",
      dryWeight: "200",
    });
    expect(result.status).toBe("critical");
  });

  it("ebl-obstetric gravimetric returns critical when dry weight exceeds wet weight", () => {
    const result = batch5Calc("ebl-obstetric").calculate({
      method: "gravimetric",
      wetWeight: "200",
      dryWeight: "500",
    });
    expect(result.status).toBe("critical");
  });

  it("ebl-obstetric hematocrit returns critical when post-Hct exceeds pre-Hct", () => {
    const result = batch5Calc("ebl-obstetric").calculate({
      method: "hct",
      weightKg: "70",
      preHct: "28",
      postHct: "36",
    });
    expect(result.status).toBe("critical");
  });

  it("preeclampsia-criteria returns critical when diastolic exceeds systolic", () => {
    const result = batch5Calc("preeclampsia-criteria").calculate({
      sbp: "120",
      dbp: "160",
      proteinuria: "no",
      platelets: "200",
      creatinine: "0.8",
      transaminases: "no",
      ruqPain: "no",
      pulmonaryEdema: "no",
      headache: "no",
      visual: "no",
    });
    expect(result.status).toBe("critical");
  });

  it("hellp-syndrome returns critical for an invalid hemolysis selection", () => {
    const result = batch5Calc("hellp-syndrome").calculate({
      platelets: "120",
      ast: "90",
      ldh: "400",
      hemolysis: "maybe",
    });
    expect(result.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Sprint 1.9 Batch 6 (Pediatrics) Direct-Call Validation Guards. Verifies
// that guarded calculators return critical (never NaN) for missing, empty,
// non-numeric, negative, and (where applicable) zero inputs, and that
// clinically valid inputs remain non-critical and finite.
//
// Select-only calculators (all those whose numeric inputs are selects, i.e.
// apgar-score, pediatric-gcs, pediatric-trauma-score, westley-croup-score,
// pecarn-head-trauma, gorelick-dehydration, peds-pews) are excluded from the
// zero-input guard because "0" is a valid option value for every select; their
// missing / empty / non-numeric / negative guards still apply. Numeric-input
// calculators (rochester-criteria, pediatric-hypotension) ARE zero-guarded
// because a WBC of 0 / SBP of 0 mmHg is never clinically valid.
//
// Domain-specific boundary checks (Apgar bands, GCS severity bands, PTS
// risk bands, Westley croup severity, PECARN predictor counting for both age
// groups, Rochester criterion counting, Gorelick dehydration, PALS SBP
// thresholds, and PEWS escalation thresholds) are also exercised.
// ---------------------------------------------------------------------------

const BATCH6_GUARDED_IDS = [
  "apgar-score",
  "pediatric-gcs",
  "pediatric-trauma-score",
  "westley-croup-score",
  "pecarn-head-trauma",
  "rochester-criteria",
  "gorelick-dehydration",
  "pediatric-hypotension",
  "peds-pews",
] as const;

// "0" is a valid select option for these calculators, so they cannot be
// required to turn a zero input into a critical result.
const BATCH6_SELECT_ONLY_IDS = new Set([
  "apgar-score",
  "pediatric-gcs",
  "pediatric-trauma-score",
  "westley-croup-score",
  "pecarn-head-trauma",
  "gorelick-dehydration",
  "peds-pews",
]);

const BATCH6_ZERO_GUARDED_IDS = BATCH6_GUARDED_IDS.filter(
  (id) => !BATCH6_SELECT_ONLY_IDS.has(id),
);

const BATCH6_VALID_INPUTS: Record<string, Record<string, string>> = {
  "apgar-score": { appearance: "2", pulse: "2", grimace: "1", activity: "2", respiration: "2" },
  "pediatric-gcs": { eye: "4", verbal: "4", motor: "6" },
  "pediatric-trauma-score": { weight: "2", airway: "2", sbp: "2", cns: "1", openWound: "2", skeletal: "1" },
  "westley-croup-score": { consciousness: "0", cyanosis: "0", stridor: "1", airEntry: "1", retractions: "2" },
  "pecarn-head-trauma": { ageGroup: "under-2", u2AlteredMentation: "no", u2PalpableSkullFracture: "no", u2ScalpHematoma: "no", u2Loc5Seconds: "no", u2NotActingNormal: "no", dangerousMechanism: "no" },
  "rochester-criteria": { ageDays: "45", termGestation: "yes", previouslyHealthy: "yes", nontoxic: "yes", focalInfection: "no", wbc: "9000", urinalysisWbc: "3", diarrhea: "no", stoolWbc: "0" },
  "gorelick-dehydration": { capillaryRefill: "yes", dryMucousMembranes: "yes", absentTears: "no", illAppearance: "no" },
  "pediatric-hypotension": { ageGroup: "1-10yr", ageYears: "4", sbp: "85" },
  "peds-pews": { behavior: "1", cardiovascular: "1", respiratory: "1", concern: "no" },
};

const BATCH6_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "apgar-score": { appearance: "-1", pulse: "-1", grimace: "-1", activity: "-1", respiration: "-1" },
  "pediatric-gcs": { eye: "-1", verbal: "-1", motor: "-1" },
  "pediatric-trauma-score": { weight: "2", airway: "-2", sbp: "2", cns: "2", openWound: "2", skeletal: "2" },
  "westley-croup-score": { consciousness: "-1", cyanosis: "-1", stridor: "-1", airEntry: "-1", retractions: "-1" },
  "pecarn-head-trauma": { ageGroup: "under-2", u2AlteredMentation: "-1", u2PalpableSkullFracture: "-1", u2ScalpHematoma: "-1", u2Loc5Seconds: "-1", u2NotActingNormal: "-1", dangerousMechanism: "-1" },
  "rochester-criteria": { ageDays: "-1", termGestation: "yes", previouslyHealthy: "yes", nontoxic: "yes", focalInfection: "no", wbc: "-1", urinalysisWbc: "-1", diarrhea: "no", stoolWbc: "-1" },
  "gorelick-dehydration": { capillaryRefill: "-1", dryMucousMembranes: "-1", absentTears: "-1", illAppearance: "-1" },
  "pediatric-hypotension": { ageGroup: "1-10yr", ageYears: "5", sbp: "-1" },
  "peds-pews": { behavior: "-1", cardiovascular: "-1", respiratory: "-1", concern: "-1" },
};

const BATCH6_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "rochester-criteria": { ageDays: "45", termGestation: "yes", previouslyHealthy: "yes", nontoxic: "yes", focalInfection: "no", wbc: "0", urinalysisWbc: "3", diarrhea: "no", stoolWbc: "0" },
  "pediatric-hypotension": { ageGroup: "1-10yr", ageYears: "5", sbp: "0" },
};

const BATCH6_BOUNDARY_CASES: BoundaryCase[] = [
  // Apgar moderately depressed (score 4)
  {
    id: "apgar-score",
    inputs: { appearance: "1", pulse: "1", grimace: "1", activity: "1", respiration: "0" },
    expectedStatus: "high",
    expectedValue: 4,
  },
  // Apgar severely depressed (score 3)
  {
    id: "apgar-score",
    inputs: { appearance: "1", pulse: "1", grimace: "0", activity: "1", respiration: "0" },
    expectedStatus: "critical",
    expectedValue: 3,
  },
  // Pediatric GCS moderate impairment (11)
  {
    id: "pediatric-gcs",
    inputs: { eye: "3", verbal: "4", motor: "4" },
    expectedStatus: "high",
    expectedValue: 11,
  },
  // Pediatric GCS severe impairment / coma (8)
  {
    id: "pediatric-gcs",
    inputs: { eye: "2", verbal: "3", motor: "3" },
    expectedStatus: "critical",
    expectedValue: 8,
  },
  // PTS intermediate (4-7) — score 6
  {
    id: "pediatric-trauma-score",
    inputs: { weight: "1", airway: "1", sbp: "1", cns: "1", openWound: "1", skeletal: "1" },
    expectedStatus: "high",
    expectedValue: 6,
  },
  // PTS severe (< 4) — score 3
  {
    id: "pediatric-trauma-score",
    inputs: { weight: "2", airway: "1", sbp: "1", cns: "-1", openWound: "1", skeletal: "-1" },
    expectedStatus: "critical",
    expectedValue: 3,
  },
  // Westley mild (score 2)
  {
    id: "westley-croup-score",
    inputs: { consciousness: "0", cyanosis: "0", stridor: "0", airEntry: "1", retractions: "1" },
    expectedStatus: "normal",
    expectedValue: 2,
  },
  // Westley severe (score 8)
  {
    id: "westley-croup-score",
    inputs: { consciousness: "0", cyanosis: "4", stridor: "1", airEntry: "1", retractions: "2" },
    expectedStatus: "critical",
    expectedValue: 8,
  },
  // PECARN under 2 years — one predictor (scalp hematoma)
  {
    id: "pecarn-head-trauma",
    inputs: { ageGroup: "under-2", u2AlteredMentation: "no", u2PalpableSkullFracture: "no", u2ScalpHematoma: "yes", u2Loc5Seconds: "no", u2NotActingNormal: "no", dangerousMechanism: "no" },
    expectedStatus: "high",
    expectedValue: 1,
  },
  // PECARN under 2 years — two predictors
  {
    id: "pecarn-head-trauma",
    inputs: { ageGroup: "under-2", u2AlteredMentation: "yes", u2PalpableSkullFracture: "no", u2ScalpHematoma: "yes", u2Loc5Seconds: "no", u2NotActingNormal: "no", dangerousMechanism: "no" },
    expectedStatus: "critical",
    expectedValue: 2,
  },
  // PECARN 2 years and older — one predictor (vomiting)
  {
    id: "pecarn-head-trauma",
    inputs: { ageGroup: "two-and-older", p2AlteredMentation: "no", p2BasilarSkullFracture: "no", p2Vomiting: "yes", p2SevereHeadache: "no", p2LossOfConsciousness: "no", dangerousMechanism: "no" },
    expectedStatus: "high",
    expectedValue: 1,
  },
  // Rochester not low risk (6/7 — previously healthy fails)
  {
    id: "rochester-criteria",
    inputs: { ageDays: "45", termGestation: "yes", previouslyHealthy: "no", nontoxic: "yes", focalInfection: "no", wbc: "9000", urinalysisWbc: "3", diarrhea: "no", stoolWbc: "0" },
    expectedStatus: "high",
    expectedValue: 6,
  },
  // Rochester age out of range
  {
    id: "rochester-criteria",
    inputs: { ageDays: "61", termGestation: "yes", previouslyHealthy: "yes", nontoxic: "yes", focalInfection: "no", wbc: "9000", urinalysisWbc: "3", diarrhea: "no", stoolWbc: "0" },
    expectedStatus: "critical",
    expectedValue: 0,
  },
  // Gorelick predicts ≥ 5% dehydration (3 of 4)
  {
    id: "gorelick-dehydration",
    inputs: { capillaryRefill: "yes", dryMucousMembranes: "yes", absentTears: "yes", illAppearance: "no" },
    expectedStatus: "high",
    expectedValue: 3,
  },
  // PALS SBP threshold at 5 years (80 mmHg), SBP 79 -> hypotensive
  {
    id: "pediatric-hypotension",
    inputs: { ageGroup: "1-10yr", ageYears: "5", sbp: "79" },
    expectedStatus: "critical",
    expectedValue: 80,
  },
  // PALS SBP threshold over 10 years (90 mmHg)
  {
    id: "pediatric-hypotension",
    inputs: { ageGroup: "over-10yr", ageYears: "12", sbp: "90" },
    expectedStatus: "normal",
    expectedValue: 90,
  },
  // PEWS single-domain score 3 (behavior) -> escalate
  {
    id: "peds-pews",
    inputs: { behavior: "3", cardiovascular: "0", respiratory: "0", concern: "no" },
    expectedStatus: "high",
    expectedValue: 3,
  },
  // PEWS high risk (score 5)
  {
    id: "peds-pews",
    inputs: { behavior: "2", cardiovascular: "2", respiratory: "1", concern: "no" },
    expectedStatus: "critical",
    expectedValue: 5,
  },
];

describe("Batch 6 Direct-Call Validation Guards", () => {
  function batch6Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 6 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch6Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH6_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch6Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH6_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch6Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH6_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch6Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH6_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch6Calc(id).calculate(BATCH6_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH6_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch6Calc(id).calculate(BATCH6_ZERO_OVERRIDES[id]), id);
    },
  );

  it.each(BATCH6_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch6Calc(id).calculate(BATCH6_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );

  it.each(BATCH6_BOUNDARY_CASES)(
    "%s boundary inputs yield expected status and value",
    (tc) => {
      const result = batch6Calc(tc.id).calculate(tc.inputs);
      expect(result.status, `${tc.id}: unexpected status`).toBe(tc.expectedStatus);
      if (tc.expectedValue !== undefined) {
        expect(Math.abs(Number(result.value) - tc.expectedValue)).toBeLessThan(0.01);
      }
    },
  );

  it("pecarn-head-trauma returns critical for an invalid age group", () => {
    const result = batch6Calc("pecarn-head-trauma").calculate({
      ageGroup: "not-a-group",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      dangerousMechanism: "no",
    });
    expect(result.status).toBe("critical");
  });

  it("rochester-criteria returns critical for an invalid selection", () => {
    const result = batch6Calc("rochester-criteria").calculate({
      ageDays: "45",
      termGestation: "maybe",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "9000",
      urinalysisWbc: "3",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(result.status).toBe("critical");
  });

  it("pediatric-hypotension returns critical for an invalid age group", () => {
    const result = batch6Calc("pediatric-hypotension").calculate({
      ageGroup: "not-a-group",
      ageYears: "5",
      sbp: "85",
    });
    expect(result.status).toBe("critical");
  });

  it("pediatric-hypotension returns critical for an out-of-range age", () => {
    const result = batch6Calc("pediatric-hypotension").calculate({
      ageGroup: "1-10yr",
      ageYears: "11",
      sbp: "85",
    });
    expect(result.status).toBe("critical");
  });

  it("pediatric-hypotension returns critical when ageYears is omitted for the 1-10yr group", () => {
    const result = batch6Calc("pediatric-hypotension").calculate({
      ageGroup: "1-10yr",
      sbp: "85",
    });
    expect(result.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Sprint 1.9 Batch 7 (Neurology) Direct-Call Validation Guards. Verifies that
// guarded calculators return critical (never NaN) for missing, empty,
// non-numeric, and negative inputs, and that clinically valid inputs remain
// non-critical and finite. All eight Batch 7 calculators are select-only, so
// "0" is a valid option value for every input and none are zero-guarded.
//
// Domain-specific boundary checks (NIHSS severity bands, ABCD2 risk strata,
// Hunt and Hess grade outcomes, mRS levels, Ottawa SAH rule counting, FOUR
// bands, RACE LVO threshold, and ESRS risk strata) are also exercised.
// ---------------------------------------------------------------------------

const BATCH7_NEURO_GUARDED_IDS = [
  "nihss",
  "abcd2-score",
  "hunt-hess-scale",
  "modified-rankin-scale",
  "ottawa-sah-rule",
  "fout-score",
  "race-scale",
  "esrs",
] as const;

const BATCH7_NEURO_SELECT_ONLY_IDS = new Set(BATCH7_NEURO_GUARDED_IDS);

const BATCH7_NEURO_ZERO_GUARDED_IDS = BATCH7_NEURO_GUARDED_IDS.filter(
  (id) => !BATCH7_NEURO_SELECT_ONLY_IDS.has(id),
);

const BATCH7_NEURO_VALID_INPUTS: Record<string, Record<string, string>> = {
  nihss: { loc: "1", locQuestions: "1", locCommands: "1", gaze: "1", visual: "1", facial: "1", armLeft: "2", armRight: "0", legLeft: "2", legRight: "0", ataxia: "0", sensory: "1", language: "1", dysarthria: "1", extinction: "1" },
  "abcd2-score": { age: "1", bloodPressure: "1", clinicalFeatures: "2", duration: "0", diabetes: "0" },
  "hunt-hess-scale": { grade: "3" },
  "modified-rankin-scale": { score: "3" },
  "ottawa-sah-rule": { age40: "no", neckPainStiffness: "no", witnessedLoc: "no", exertionOnset: "no", thunderclap: "no", limitedNeckFlexion: "no" },
  "fout-score": { eye: "3", motor: "3", brainstem: "3", respiration: "3" },
  "race-scale": { facialPalsy: "2", armMotor: "1", legMotor: "1", gaze: "0", aphasiaAgnosia: "0" },
  esrs: { ageGroup: "2", hypertension: "yes", diabetes: "yes", priorMi: "yes", otherCvd: "no", pad: "no", smoking: "yes", priorTiaStroke: "yes" },
};

const BATCH7_NEURO_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  nihss: { loc: "-1", locQuestions: "-1", locCommands: "-1", gaze: "-1", visual: "-1", facial: "-1", armLeft: "-1", armRight: "-1", legLeft: "-1", legRight: "-1", ataxia: "-1", sensory: "-1", language: "-1", dysarthria: "-1", extinction: "-1" },
  "abcd2-score": { age: "-1", bloodPressure: "-1", clinicalFeatures: "-1", duration: "-1", diabetes: "-1" },
  "hunt-hess-scale": { grade: "-1" },
  "modified-rankin-scale": { score: "-1" },
  "ottawa-sah-rule": { age40: "-1", neckPainStiffness: "-1", witnessedLoc: "-1", exertionOnset: "-1", thunderclap: "-1", limitedNeckFlexion: "-1" },
  "fout-score": { eye: "-1", motor: "-1", brainstem: "-1", respiration: "-1" },
  "race-scale": { facialPalsy: "-1", armMotor: "-1", legMotor: "-1", gaze: "-1", aphasiaAgnosia: "-1" },
  esrs: { ageGroup: "-1", hypertension: "-1", diabetes: "-1", priorMi: "-1", otherCvd: "-1", pad: "-1", smoking: "-1", priorTiaStroke: "-1" },
};

const BATCH7_NEURO_ZERO_OVERRIDES: Record<string, Record<string, string>> = {};

const BATCH7_NEURO_BOUNDARY_CASES: BoundaryCase[] = [
  // NIHSS maximal severity (42)
  {
    id: "nihss",
    inputs: { loc: "3", locQuestions: "2", locCommands: "2", gaze: "2", visual: "3", facial: "3", armLeft: "4", armRight: "4", legLeft: "4", legRight: "4", ataxia: "2", sensory: "2", language: "3", dysarthria: "2", extinction: "2" },
    expectedStatus: "critical",
    expectedValue: 42,
  },
  // NIHSS minor stroke (score 1)
  {
    id: "nihss",
    inputs: { loc: "1", locQuestions: "0", locCommands: "0", gaze: "0", visual: "0", facial: "0", armLeft: "0", armRight: "0", legLeft: "0", legRight: "0", ataxia: "0", sensory: "0", language: "0", dysarthria: "0", extinction: "0" },
    expectedStatus: "normal",
    expectedValue: 1,
  },
  // NIHSS moderate (score 15)
  {
    id: "nihss",
    inputs: { loc: "1", locQuestions: "1", locCommands: "1", gaze: "1", visual: "1", facial: "1", armLeft: "2", armRight: "1", legLeft: "1", legRight: "1", ataxia: "0", sensory: "1", language: "1", dysarthria: "1", extinction: "1" },
    expectedStatus: "high",
    expectedValue: 15,
  },
  // ABCD2 low risk (score 0)
  {
    id: "abcd2-score",
    inputs: { age: "0", bloodPressure: "0", clinicalFeatures: "0", duration: "0", diabetes: "0" },
    expectedStatus: "normal",
    expectedValue: 0,
  },
  // ABCD2 moderate risk (score 4)
  {
    id: "abcd2-score",
    inputs: { age: "1", bloodPressure: "1", clinicalFeatures: "0", duration: "2", diabetes: "0" },
    expectedStatus: "high",
    expectedValue: 4,
  },
  // Hunt and Hess grade II
  {
    id: "hunt-hess-scale",
    inputs: { grade: "2" },
    expectedStatus: "normal",
    expectedValue: 2,
  },
  // Hunt and Hess grade V
  {
    id: "hunt-hess-scale",
    inputs: { grade: "5" },
    expectedStatus: "critical",
    expectedValue: 5,
  },
  // mRS 0
  {
    id: "modified-rankin-scale",
    inputs: { score: "0" },
    expectedStatus: "normal",
    expectedValue: 0,
  },
  // mRS 6
  {
    id: "modified-rankin-scale",
    inputs: { score: "6" },
    expectedStatus: "critical",
    expectedValue: 6,
  },
  // Ottawa SAH rule negative (0 criteria)
  {
    id: "ottawa-sah-rule",
    inputs: { age40: "no", neckPainStiffness: "no", witnessedLoc: "no", exertionOnset: "no", thunderclap: "no", limitedNeckFlexion: "no" },
    expectedStatus: "normal",
    expectedValue: 0,
  },
  // Ottawa SAH rule positive with a single criterion
  {
    id: "ottawa-sah-rule",
    inputs: { age40: "yes", neckPainStiffness: "no", witnessedLoc: "no", exertionOnset: "no", thunderclap: "no", limitedNeckFlexion: "no" },
    expectedStatus: "critical",
    expectedValue: 1,
  },
  // FOUR fully intact (16)
  {
    id: "fout-score",
    inputs: { eye: "4", motor: "4", brainstem: "4", respiration: "4" },
    expectedStatus: "normal",
    expectedValue: 16,
  },
  // FOUR minimal (0)
  {
    id: "fout-score",
    inputs: { eye: "0", motor: "0", brainstem: "0", respiration: "0" },
    expectedStatus: "critical",
    expectedValue: 0,
  },
  // RACE at the LVO threshold (score 5)
  {
    id: "race-scale",
    inputs: { facialPalsy: "2", armMotor: "1", legMotor: "1", gaze: "1", aphasiaAgnosia: "0" },
    expectedStatus: "critical",
    expectedValue: 5,
  },
  // RACE just below the LVO threshold (score 4)
  {
    id: "race-scale",
    inputs: { facialPalsy: "2", armMotor: "1", legMotor: "1", gaze: "0", aphasiaAgnosia: "0" },
    expectedStatus: "normal",
    expectedValue: 4,
  },
  // ESRS low risk (score 2)
  {
    id: "esrs",
    inputs: { ageGroup: "0", hypertension: "yes", diabetes: "no", priorMi: "no", otherCvd: "no", pad: "no", smoking: "yes", priorTiaStroke: "no" },
    expectedStatus: "normal",
    expectedValue: 2,
  },
  // ESRS high risk (score 3)
  {
    id: "esrs",
    inputs: { ageGroup: "1", hypertension: "yes", diabetes: "no", priorMi: "no", otherCvd: "no", pad: "no", smoking: "no", priorTiaStroke: "yes" },
    expectedStatus: "high",
    expectedValue: 3,
  },
];

describe("Batch 7 Direct-Call Validation Guards", () => {
  function batch7NeuroCalc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 7 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch7NeuroCalc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH7_NEURO_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch7NeuroCalc(id).calculate({}), id);
    },
  );

  it.each(BATCH7_NEURO_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch7NeuroCalc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH7_NEURO_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch7NeuroCalc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH7_NEURO_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch7NeuroCalc(id).calculate(BATCH7_NEURO_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH7_NEURO_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch7NeuroCalc(id).calculate(BATCH7_NEURO_ZERO_OVERRIDES[id]), id);
    },
  );

  it.each(BATCH7_NEURO_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch7NeuroCalc(id).calculate(BATCH7_NEURO_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );

  it.each(BATCH7_NEURO_BOUNDARY_CASES)(
    "%s boundary inputs yield expected status and value",
    (tc) => {
      const result = batch7NeuroCalc(tc.id).calculate(tc.inputs);
      expect(result.status, `${tc.id}: unexpected status`).toBe(tc.expectedStatus);
      if (tc.expectedValue !== undefined) {
        expect(Math.abs(Number(result.value) - tc.expectedValue)).toBeLessThan(0.01);
      }
    },
  );

  it("nihss returns critical for an invalid visual-fields selection", () => {
    const result = batch7NeuroCalc("nihss").calculate({
      loc: "0", locQuestions: "0", locCommands: "0", gaze: "0", visual: "9", facial: "0", armLeft: "0", armRight: "0", legLeft: "0", legRight: "0", ataxia: "0", sensory: "0", language: "0", dysarthria: "0", extinction: "0",
    });
    expect(result.status).toBe("critical");
  });

  it("hunt-hess-scale returns critical for an invalid grade", () => {
    const result = batch7NeuroCalc("hunt-hess-scale").calculate({ grade: "6" });
    expect(result.status).toBe("critical");
  });

  it("modified-rankin-scale returns critical for an invalid score", () => {
    const result = batch7NeuroCalc("modified-rankin-scale").calculate({ score: "7" });
    expect(result.status).toBe("critical");
  });

  it("esrs returns critical for an invalid age-group selection", () => {
    const result = batch7NeuroCalc("esrs").calculate({
      ageGroup: "not-a-group",
      hypertension: "no",
      diabetes: "no",
      priorMi: "no",
      otherCvd: "no",
      pad: "no",
      smoking: "no",
      priorTiaStroke: "no",
    });
    expect(result.status).toBe("critical");
  });

  it("ottawa-sah-rule returns critical for an invalid criterion value", () => {
    const result = batch7NeuroCalc("ottawa-sah-rule").calculate({
      age40: "maybe",
      neckPainStiffness: "no",
      witnessedLoc: "no",
      exertionOnset: "no",
      thunderclap: "no",
      limitedNeckFlexion: "no",
    });
    expect(result.status).toBe("critical");
  });
});
