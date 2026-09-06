/**
 * Batch 2G — Clinical Content Enrichment Tests
 *
 * Focused regression tests for the five calculators enriched in Batch 2G:
 *   - map
 *   - bsa
 *   - corrected-anion-gap
 *   - osmolar-gap
 *   - free-water-deficit
 *
 * Verifies (without broad snapshots):
 *   - No generic placeholder clinicalNotes or placeholder markers remain
 *   - Authoritative references are present
 *   - Key calculator-specific safety/context concepts are covered
 *   - Formulas and representative outputs are unchanged
 *   - Adjustment/classification logic is unchanged
 *   - Osmolar gap and free water deficit calculation logic is structurally
 *     unchanged at the source level
 *   - Registry remains at exactly 143 with unchanged slugs
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

import { mapCalculator } from "../../lib/calculators/map";
import { bsaCalculator } from "../../lib/calculators/bsa";
import { correctedAnionGapCalculator } from "../../lib/calculators/corrected-anion-gap";
import { osmolarGapCalculator } from "../../lib/calculators/osmolar-gap";
import { freeWaterDeficitCalculator } from "../../lib/calculators/free-water-deficit";
import { calculatorRegistry } from "../../lib/calculators/registry";

const GENERIC_CLINICAL_NOTE =
  "Interpret results together with the patient's clinical presentation.";

const PLACEHOLDER_MARKERS = [
  "MedCalcHub Clinical References",
  "Placeholder",
  "TODO",
  "TBD",
  "lorem ipsum",
];

const TARGETS = [
  mapCalculator,
  bsaCalculator,
  correctedAnionGapCalculator,
  osmolarGapCalculator,
  freeWaterDeficitCalculator,
];

function collectNotes(refs: string[], notes?: string) {
  return [...refs, notes ?? ""].join(" ");
}

function readCalculatorSource(slug: string): string {
  const filePath = path.join(
    process.cwd(),
    "lib",
    "calculators",
    `${slug}.ts`,
  );
  return fs.readFileSync(filePath, "utf-8");
}

describe("Batch 2G — no generic placeholder content remains", () => {
  it.each(TARGETS.map((c) => c.slug))(
    "%s has no placeholder markers in clinicalNotes or references",
    (slug) => {
      const calc = TARGETS.find((c) => c.slug === slug)!;
      const text = collectNotes(
        calc.references ?? [],
        calc.clinicalNotes,
      ).toLowerCase();
      for (const marker of PLACEHOLDER_MARKERS) {
        expect(
          text,
          `found placeholder marker "${marker}"`,
        ).not.toContain(marker.toLowerCase());
      }
      expect(calc.clinicalNotes).not.toBe(GENERIC_CLINICAL_NOTE);
    },
  );

  it.each(TARGETS.map((c) => c.slug))(
    "%s clinicalNotes are substantive (multi-paragraph)",
    (slug) => {
      const calc = TARGETS.find((c) => c.slug === slug)!;
      const notes = calc.clinicalNotes ?? "";
      expect(notes.length).toBeGreaterThan(400);
      expect(notes).toContain("\n\n");
    },
  );
});

describe("Batch 2G — authoritative references present", () => {
  it("map cites Guyton & Hall", () => {
    const refs = (mapCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Guyton AC, Hall JE/);
    expect(refs).toMatch(/Elsevier; 2021/);
  });

  it("bsa cites Mosteller 1987", () => {
    const refs = (bsaCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Mosteller RD/);
    expect(refs).toMatch(/N Engl J Med\. 1987;317\(17\):1098/);
  });

  it("corrected-anion-gap cites Figge 1998", () => {
    const refs = (correctedAnionGapCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Figge J/);
    expect(refs).toMatch(/Crit Care Med\. 1998;26\(11\):1807-1810/);
  });

  it("osmolar-gap cites Dorwart & Chalmers and a toxicology source", () => {
    const refs = (osmolarGapCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Dorwart WV, Chalmers L/);
    expect(refs).toMatch(/Clin Chem\. 1975;21\(2\):190-194/);
    expect(refs).toMatch(/Goldfrank/);
    expect(refs).toMatch(/11th ed/);
  });

  it("free-water-deficit cites Adrogué & Madias 2000", () => {
    const refs = (freeWaterDeficitCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Adrogué HJ, Madias NE/);
    expect(refs).toMatch(/N Engl J Med\. 2000;342\(20\):1493-1499/);
  });
});

describe("Batch 2G — calculator-specific safety/context concepts", () => {
  it("map covers perfusion targets, diastolic weighting, and arrhythmia limits", () => {
    const notes = mapCalculator.clinicalNotes!;
    expect(notes).toContain("65 mmHg");
    expect(notes.toLowerCase()).toContain("perfusion");
    expect(notes.toLowerCase()).toContain("diastole");
    expect(notes.toLowerCase()).toContain("arrhythmia");
    expect(notes.toLowerCase()).toContain("cardiac output");
  });

  it("bsa covers Mosteller, indexing uses, and body composition limits", () => {
    const notes = bsaCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("mosteller");
    expect(notes).toContain("m²");
    expect(notes).toContain("1.73");
    expect(notes).toContain("body composition");
    expect(notes).toContain("does not distinguish lean");
  });

  it("corrected-anion-gap covers albumin correction and hypoalbuminemia", () => {
    const notes = correctedAnionGapCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("albumin");
    expect(notes).toContain("2.5");
    expect(notes).toContain("hypoalbuminemia");
    expect(notes).toContain("acidosis");
    expect(notes).toContain("4.0");
  });

  it("osmolar-gap covers toxic alcohols, delayed presentation, and units", () => {
    const notes = osmolarGapCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("methanol");
    expect(notes).toContain("ethylene glycol");
    expect(notes).toContain("normalize");
    expect(notes).toContain("2.8");
    expect(notes).toContain("mosm/kg");
    expect(notes).toContain("delayed presentations");
  });

  it("free-water-deficit covers total body water assumptions and gradual correction", () => {
    const notes = freeWaterDeficitCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("hypernatremia");
    expect(notes).toContain("total body water");
    expect(notes).toContain("0.6");
    expect(notes).toContain("gradually");
    expect(notes).toContain("serial");
  });
});

describe("Batch 2G — formulas and output values unchanged", () => {
  it("map formula and output are unchanged", () => {
    expect(mapCalculator.formula).toContain("(sbp + 2 * dbp) / 3");
    const result = mapCalculator.calculate({ sbp: "120", dbp: "80" });
    expect(result.value).toBeCloseTo(93.33, 1);
    expect(result.interpretation).toBe("Mean arterial pressure 93.33 mmHg.");
    expect(result.status).toBe("normal");
  });

  it("bsa formula and output are unchanged", () => {
    expect(bsaCalculator.formula).toContain("3600");
    const result = bsaCalculator.calculate({ weight: "70", height: "170" });
    expect(result.value).toBe(1.82);
    expect(result.interpretation).toBe("Body surface area 1.82 m².");
    expect(result.status).toBe("normal");
  });

  it("corrected-anion-gap formula and output are unchanged", () => {
    expect(correctedAnionGapCalculator.formula).toContain("2.5");
    const result = correctedAnionGapCalculator.calculate({
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
      albumin: "2.0",
    });
    expect(result.value).toBe(17);
    expect(result.interpretation).toBe("High corrected anion gap");
    expect(result.status).toBe("high");
  });

  it("osmolar-gap formula and output are unchanged", () => {
    expect(osmolarGapCalculator.formula).toContain(
      "2 * sodium + glucose / 18 + bun / 2.8",
    );
    const result = osmolarGapCalculator.calculate({
      measured: "302.64",
      sodium: "140",
      glucose: "90",
      bun: "20",
    });
    expect(result.value).toBeCloseTo(10.5, 0);
    expect(result.interpretation).toBe("Elevated osmolar gap");
    expect(result.status).toBe("high");
  });

  it("free-water-deficit formula and output are unchanged", () => {
    expect(freeWaterDeficitCalculator.formula).toContain("0.6");
    const result = freeWaterDeficitCalculator.calculate({
      weight: "70",
      currentNa: "150",
      desiredNa: "140",
    });
    expect(result.value).toBe(3);
    expect(result.interpretation).toBe("Mild free water deficit");
    expect(result.status).toBe("low");
  });
});

describe("Batch 2G — osmolar gap calculation logic structurally unchanged", () => {
  it("computes the gap with the same source expression and rounding", () => {
    const source = readCalculatorSource("osmolar-gap");
    expect(source).toContain(
      "measured - (2 * sodium + glucose / 18 + bun / 2.8);",
    );
    expect(source).toContain("Number(result.toFixed(2))");
  });

  it("preserves the same reference ranges and classification thresholds", () => {
    const source = readCalculatorSource("osmolar-gap");
    expect(source).toContain("<-9.9");
    expect(source).toContain("(result < -10)");
    expect(source).toContain("(result <= 10)");
    expect(source).toContain("(result >= 50)");
    expect(source).toContain("\"Negative");
  });
});

describe("Batch 2G — free water deficit calculation logic structurally unchanged", () => {
  it("calls the same util expression and rounding", () => {
    const source = readCalculatorSource("free-water-deficit");
    expect(source).toContain(
      "calculateFreeWaterDeficit(weight, currentNa, desiredNa);",
    );
    expect(source).toContain("Number(result.toFixed(2))");
  });

  it("preserves the same reference ranges and classification thresholds", () => {
    const source = readCalculatorSource("free-water-deficit");
    expect(source).toContain("≤0");
    expect(source).toContain("(result <= 0)");
    expect(source).toContain("(result <= 3)");
    expect(source).toContain("(result <= 7)");
    expect(source).toContain("\"No deficit\"");
  });
});

describe("Batch 2G — registry integrity", () => {
  it("registry still contains exactly 143 calculators with the five targets", () => {
    expect(calculatorRegistry.length).toBe(143);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const expected = [
      "map",
      "bsa",
      "corrected-anion-gap",
      "osmolar-gap",
      "free-water-deficit",
    ];
    for (const slug of expected) {
      expect(slugs).toContain(slug);
    }
  });
});