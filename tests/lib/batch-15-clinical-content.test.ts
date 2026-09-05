/**
 * Batch 15 — High-Value Clinical Content Upgrade Tests
 *
 * Verifies that placeholder clinicalNotes and generic references
 * have been replaced with authoritative content for BMI, CKD-EPI 2021,
 * GCS, Heart Rate, and NEWS2.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { calculatorRegistry } from "../../lib/calculators/registry";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function readCalculator(slug: string): string {
  const filePath = path.join(
    process.cwd(),
    "lib",
    "calculators",
    `${slug}.ts`,
  );
  return fs.readFileSync(filePath, "utf-8");
}

function findCalc(slug: string) {
  return calculatorRegistry.find((c) => c.slug === slug);
}

const TARGET_SLUGS = [
  "bmi",
  "ckd-epi-2021",
  "gcs",
  "heart-rate",
  "news2",
] as const;

/* ------------------------------------------------------------------ */
/*  1. Placeholder clinicalNotes removed                               */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Placeholder clinicalNotes removed", () => {
  for (const slug of TARGET_SLUGS) {
    it(`${slug}: no longer has placeholder clinicalNotes`, () => {
      const source = readCalculator(slug);
      expect(source).not.toContain(
        "Interpret results together with the patient's clinical presentation.",
      );
    });
  }
});

/* ------------------------------------------------------------------ */
/*  2. Generic placeholder reference removed                           */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Generic placeholder reference removed", () => {
  for (const slug of TARGET_SLUGS) {
    it(`${slug}: no longer has "MedCalcHub Clinical References"`, () => {
      const source = readCalculator(slug);
      expect(source).not.toContain("MedCalcHub Clinical References");
    });
  }
});

/* ------------------------------------------------------------------ */
/*  3. Authoritative references present                                */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Authoritative references present", () => {
  it("bmi: references WHO", () => {
    const source = readCalculator("bmi");
    expect(source).toContain("WHO");
  });

  it("ckd-epi-2021: references Inker/NEJM and KDIGO", () => {
    const source = readCalculator("ckd-epi-2021");
    expect(source).toContain("Inker LA");
    expect(source).toContain("KDIGO");
  });

  it("gcs: references Teasdale and Jennett", () => {
    const source = readCalculator("gcs");
    expect(source).toContain("Teasdale");
    expect(source).toContain("Jennett");
  });

  it("heart-rate: references AHA", () => {
    const source = readCalculator("heart-rate");
    expect(source).toContain("American Heart Association");
  });

  it("news2: references Royal College of Physicians", () => {
    const source = readCalculator("news2");
    expect(source).toContain("Royal College of Physicians");
  });
});

/* ------------------------------------------------------------------ */
/*  4. Clinical notes content quality                                  */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Clinical notes content quality", () => {
  it("bmi: clinicalNotes mention BMI definition", () => {
    const source = readCalculator("bmi");
    expect(source).toContain("weight-for-height");
  });

  it("bmi: clinicalNotes mention WHO classification", () => {
    const source = readCalculator("bmi");
    expect(source).toContain("18.5");
    expect(source).toContain("25");
    expect(source).toContain("30");
  });

  it("bmi: clinicalNotes mention limitations (body fat)", () => {
    const source = readCalculator("bmi");
    expect(source).toContain("body fat");
  });

  it("ckd-epi-2021: clinicalNotes mention eGFR is an estimate", () => {
    const source = readCalculator("ckd-epi-2021");
    expect(source).toContain("estimate");
  });

  it("ckd-epi-2021: clinicalNotes mention CKD staging", () => {
    const source = readCalculator("ckd-epi-2021");
    expect(source).toContain("CKD staging");
  });

  it("ckd-epi-2021: clinicalNotes mention race removal", () => {
    const source = readCalculator("ckd-epi-2021");
    expect(source).toContain("race");
  });

  it("gcs: clinicalNotes explain three components", () => {
    const source = readCalculator("gcs");
    expect(source).toContain("Eye Opening");
    expect(source).toContain("Verbal Response");
    expect(source).toContain("Motor Response");
  });

  it("gcs: clinicalNotes mention confounding factors", () => {
    const source = readCalculator("gcs");
    expect(source).toContain("Sedation");
    expect(source).toContain("intubation");
  });

  it("gcs: clinicalNotes mention airway protection threshold", () => {
    const source = readCalculator("gcs");
    expect(source).toContain("airway protection");
  });

  it("heart-rate: clinicalNotes distinguish calculation from diagnosis", () => {
    const source = readCalculator("heart-rate");
    expect(source).toContain("does not diagnose");
  });

  it("heart-rate: clinicalNotes mention factors affecting heart rate", () => {
    const source = readCalculator("heart-rate");
    expect(source).toContain("medications");
  });

  it("heart-rate: clinicalNotes mention bradycardia/tachycardia thresholds", () => {
    const source = readCalculator("heart-rate");
    expect(source).toContain("60");
    expect(source).toContain("100");
  });

  it("news2: clinicalNotes explain scoring components", () => {
    const source = readCalculator("news2");
    expect(source).toContain("respiratory rate");
    expect(source).toContain("SpO");
    expect(source).toContain("temperature");
  });

  it("news2: clinicalNotes explain escalation purpose", () => {
    const source = readCalculator("news2");
    expect(source).toContain("escalation");
  });

  it("news2: clinicalNotes mention Scale 2 for chronic respiratory failure", () => {
    const source = readCalculator("news2");
    expect(source).toContain("chronic hypercapnic respiratory failure");
  });
});

/* ------------------------------------------------------------------ */
/*  5. Formulas and slugs unchanged                                   */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Formulas and slugs unchanged", () => {
  it("bmi: formula and slug preserved", () => {
    const calc = findCalc("bmi");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("bmi");
    expect(calc!.formula).toContain("weight / (height * height)");
  });

  it("ckd-epi-2021: formula and slug preserved", () => {
    const calc = findCalc("ckd-epi-2021");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("ckd-epi-2021");
    expect(calc!.formula).toContain("142");
    expect(calc!.formula).toContain("0.9938");
  });

  it("gcs: formula and slug preserved", () => {
    const calc = findCalc("gcs");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("gcs");
    expect(calc!.formula).toBe("Eye + Verbal + Motor");
  });

  it("heart-rate: formula and slug preserved", () => {
    const calc = findCalc("heart-rate");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("heart-rate");
    expect(calc!.formula).toBe("beats / time");
  });

  it("news2: formula and slug preserved", () => {
    const calc = findCalc("news2");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("news2");
    expect(calc!.formula).toContain("RR");
    expect(calc!.formula).toContain("SpO");
  });
});

/* ------------------------------------------------------------------ */
/*  6. Calculation outputs unchanged                                   */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Calculation outputs unchanged", () => {
  it("bmi: 68kg / 1.65m\u00B2 = 24.98", () => {
    const calc = findCalc("bmi");
    const result = calc!.calculate({ weight: "68", height: "165" });
    expect(result.value).toBe(24.98);
  });

  it("ckd-epi-2021: 65yo female Cr 1.1 = ~56", () => {
    const calc = findCalc("ckd-epi-2021");
    const result = calc!.calculate({
      age: "65",
      sex: "2",
      creatinine: "1.1",
    });
    expect(result.value).toBeCloseTo(55.82, 0);
  });

  it("gcs: Eye 3 + Verbal 4 + Motor 5 = 12", () => {
    const calc = findCalc("gcs");
    const result = calc!.calculate({ eye: "3", verbal: "4", motor: "5" });
    expect(result.value).toBe(12);
  });

  it("heart-rate: 72 beats / 1 min = 72 bpm", () => {
    const calc = findCalc("heart-rate");
    const result = calc!.calculate({ beats: "72", time: "1" });
    expect(result.value).toBe(72);
  });

  it("news2: example inputs yield expected score", () => {
    const calc = findCalc("news2");
    const result = calc!.calculate({
      "spo2-scale": "standard",
      "respiratory-rate": "24",
      spo2: "93",
      temperature: "38.2",
      sbp: "100",
      pulse: "110",
    });
    expect(result.value).toBe(8);
  });
});

/* ------------------------------------------------------------------ */
/*  7. Registry count preserved at 143                                 */
/* ------------------------------------------------------------------ */

describe("Batch 15 — Registry count preserved", () => {
  it("calculator registry still has 143 entries", () => {
    expect(calculatorRegistry.length).toBe(143);
  });

  it("all five target calculators are present", () => {
    for (const slug of TARGET_SLUGS) {
      expect(findCalc(slug)).toBeDefined();
    }
  });
});
