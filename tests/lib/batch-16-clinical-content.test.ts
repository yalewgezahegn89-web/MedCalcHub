/**
 * Batch 16 — Clinical Content Quality Upgrade Tests
 *
 * Verifies that placeholder clinicalNotes and generic placeholder
 * references have been replaced with authoritative content for
 * CURB-65, Apgar Score, and EDD calculators.
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

const TARGET_SLUGS = ["curb-65", "apgar-score", "edd"] as const;

/* ------------------------------------------------------------------ */
/*  1. Placeholder clinicalNotes removed                               */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Placeholder clinicalNotes removed", () => {
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

describe("Batch 16 — Generic placeholder references removed", () => {
  it("edd: no longer has 'ACOG guidance'", () => {
    const source = readCalculator("edd");
    expect(source).not.toContain('"ACOG guidance"');
  });

  it("edd: no longer has 'Obstetrics references'", () => {
    const source = readCalculator("edd");
    expect(source).not.toContain('"Obstetrics references"');
  });
});

/* ------------------------------------------------------------------ */
/*  3. Authoritative references present                                */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Authoritative references present", () => {
  it("curb-65: references Lim WS et al. Thorax 2003", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("Lim WS");
    expect(source).toContain("Thorax");
  });

  it("curb-65: references BTS guidelines", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("BTS");
  });

  it("apgar-score: references Apgar V. 1953", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("Apgar V.");
    expect(source).toContain("1953");
  });

  it("apgar-score: references AAP/ACOG 2015 guideline", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("AAP");
    expect(source).toContain("2015");
  });

  it("edd: references ACOG Committee Opinion No. 700", () => {
    const source = readCalculator("edd");
    expect(source).toContain("ACOG");
    expect(source).toContain("700");
  });

  it("edd: references WHO antenatal care guidance", () => {
    const source = readCalculator("edd");
    expect(source).toContain("WHO");
  });
});

/* ------------------------------------------------------------------ */
/*  4. Clinical notes content quality                                  */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Clinical notes content quality", () => {
  it("curb-65: clinicalNotes explain five components", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("Confusion");
    expect(source).toContain("Urea");
    expect(source).toContain("Respiratory");
    expect(source).toContain("Blood pressure");
    expect(source).toContain("Age");
  });

  it("curb-65: clinicalNotes explain scoring ranges", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("0–1");
    expect(source).toContain("2");
    expect(source).toContain("≥ 3");
  });

  it("curb-65: clinicalNotes mention community-acquired pneumonia", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("community-acquired pneumonia");
  });

  it("curb-65: clinicalNotes mention clinical judgment", () => {
    const source = readCalculator("curb-65");
    expect(source).toContain("clinical judgment");
  });

  it("apgar-score: clinicalNotes explain five components", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("Appearance");
    expect(source).toContain("Pulse");
    expect(source).toContain("Grimace");
    expect(source).toContain("Activity");
    expect(source).toContain("Respiration");
  });

  it("apgar-score: clinicalNotes explain timing", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("1 minute");
    expect(source).toContain("5 minutes");
  });

  it("apgar-score: clinicalNotes mention score bands", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("7–10");
    expect(source).toContain("4–6");
    expect(source).toContain("0–3");
  });

  it("apgar-score: clinicalNotes explain limitations", () => {
    const source = readCalculator("apgar-score");
    expect(source).toContain("preterm");
    expect(source).toContain("should not be used alone");
  });

  it("edd: clinicalNotes explain Naegele rule", () => {
    const source = readCalculator("edd");
    expect(source).toContain("280 days");
    expect(source).toContain("last menstrual period");
  });

  it("edd: clinicalNotes explain LMP assumptions", () => {
    const source = readCalculator("edd");
    expect(source).toContain("28-day");
    expect(source).toContain("ovulation");
  });

  it("edd: clinicalNotes mention ultrasound dating", () => {
    const source = readCalculator("edd");
    expect(source).toContain("ultrasound");
  });

  it("edd: clinicalNotes explain limitations", () => {
    const source = readCalculator("edd");
    expect(source).toContain("irregular");
    expect(source).toContain("estimate");
  });

  it("edd: clinicalNotes state educational purpose", () => {
    const source = readCalculator("edd");
    expect(source).toContain("educational");
  });
});

/* ------------------------------------------------------------------ */
/*  5. Formulas and slugs unchanged                                   */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Formulas and slugs unchanged", () => {
  it("curb-65: formula and slug preserved", () => {
    const calc = findCalc("curb-65");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("curb-65");
    expect(calc!.formula).toContain("Confusion");
    expect(calc!.formula).toContain("Urea");
    expect(calc!.formula).toContain("RR");
    expect(calc!.formula).toContain("SBP");
    expect(calc!.formula).toContain("Age");
  });

  it("apgar-score: formula and slug preserved", () => {
    const calc = findCalc("apgar-score");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("apgar-score");
    expect(calc!.formula).toContain("Appearance");
    expect(calc!.formula).toContain("Pulse");
    expect(calc!.formula).toContain("Grimace");
    expect(calc!.formula).toContain("Activity");
    expect(calc!.formula).toContain("Respiration");
  });

  it("edd: formula and slug preserved", () => {
    const calc = findCalc("edd");
    expect(calc).toBeDefined();
    expect(calc!.slug).toBe("edd");
    expect(calc!.formula).toContain("LMP + 280 days");
  });
});

/* ------------------------------------------------------------------ */
/*  6. Calculation outputs unchanged                                   */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Calculation outputs unchanged", () => {
  it("curb-65: age 70, confusion 0, urea 8.5, RR 24, SBP 105 = score 2", () => {
    const calc = findCalc("curb-65");
    const result = calc!.calculate({
      age: "70",
      confusion: "0",
      urea: "8.5",
      "respiratory-rate": "24",
      sbp: "105",
    });
    expect(result.value).toBe(2);
  });

  it("apgar-score: all 2s = 10", () => {
    const calc = findCalc("apgar-score");
    const result = calc!.calculate({
      appearance: "2",
      pulse: "2",
      grimace: "2",
      activity: "2",
      respiration: "2",
    });
    expect(result.value).toBe(10);
  });

  it("edd: LMP 2026-01-01 = 2026-10-08", () => {
    const calc = findCalc("edd");
    const result = calc!.calculate({ lmp: "2026-01-01" });
    expect(result.value).toBe("2026-10-08");
  });
});

/* ------------------------------------------------------------------ */
/*  7. Registry count preserved at 143                                 */
/* ------------------------------------------------------------------ */

describe("Batch 16 — Registry count preserved", () => {
  it("calculator registry still has 143 entries", () => {
    expect(calculatorRegistry.length).toBe(143);
  });

  it("all three target calculators are present", () => {
    for (const slug of TARGET_SLUGS) {
      expect(findCalc(slug)).toBeDefined();
    }
  });
});
