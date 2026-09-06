/**
 * Batch 2F — Renal Clinical Content Enrichment Tests
 *
 * Focused regression tests for the five renal calculators enriched in Batch 2F:
 *   - cockcroft-gault
 *   - mdrd
 *   - fena
 *   - bun-creatinine-ratio
 *   - kdigo-aki-staging
 *
 * Verifies (without broad snapshots):
 *   - No generic placeholder clinicalNotes or references remain
 *   - Authoritative references are present
 *   - Key calculator-specific safety/context concepts are covered
 *   - Formulas and representative outputs are unchanged
 *   - KDIGO AKI staging logic is unchanged
 *   - Registry remains at exactly 143 with unchanged slugs
 */

import { describe, it, expect } from "vitest";

import { cockcroftGaultCalculator } from "../../lib/calculators/cockcroft-gault";
import { mdrdCalculator } from "../../lib/calculators/mdrd";
import { fenaCalculator } from "../../lib/calculators/fena";
import { bunCreatinineRatioCalculator } from "../../lib/calculators/bun-creatinine-ratio";
import { kdigoAkiStagingCalculator } from "../../lib/calculators/kdigo-aki-staging";
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
  cockcroftGaultCalculator,
  mdrdCalculator,
  fenaCalculator,
  bunCreatinineRatioCalculator,
  kdigoAkiStagingCalculator,
];

function collectNotes(refs: string[], notes?: string) {
  return [...refs, notes ?? ""].join(" ");
}

describe("Batch 2F — no generic placeholder content remains", () => {
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

describe("Batch 2F — authoritative references present", () => {
  it("cockcroft-gault cites Cockcroft & Gault 1976 and KDIGO 2024", () => {
    const refs = (cockcroftGaultCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Cockcroft DW, Gault MH/);
    expect(refs).toMatch(/Nephron\. 1976/);
    expect(refs).toMatch(/KDIGO 2024/);
    expect(refs).toMatch(/Kidney Int\. 2024;105\(4S\)/);
  });

  it("mdrd cites Levey 1999, Levey 2006, and KDIGO 2024", () => {
    const refs = (mdrdCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Levey AS/);
    expect(refs).toMatch(/Ann Intern Med\. 1999/);
    expect(refs).toMatch(/Ann Intern Med\. 2006;145\(4\):247-254/);
    expect(refs).toMatch(/KDIGO 2024/);
  });

  it("fena cites Espinel JAMA 1976 and the KDIGO AKI guideline", () => {
    const refs = (fenaCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Espinel CH/);
    expect(refs).toMatch(/JAMA\. 1976;236\(6\):579-581/);
    expect(refs).toMatch(/Kidney Int Suppl\. 2012;2\(1\):1-138/);
  });

  it("bun-creatinine-ratio cites the Tietz textbook", () => {
    const refs = (bunCreatinineRatioCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Tietz Textbook of Clinical Chemistry/);
  });

  it("kdigo-aki-staging retains KDIGO, Bellomo, and Mehta references", () => {
    const refs = (kdigoAkiStagingCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/KDIGO Acute Kidney Injury Work Group/);
    expect(refs).toMatch(/Kidney Int Suppl\. 2012;2\(1\):1-138/);
    expect(refs).toMatch(/Bellomo R/);
    expect(refs).toMatch(/Mehta RL/);
  });
});

describe("Batch 2F — calculator-specific safety/context concepts", () => {
  it("cockcroft-gault distinguishes CrCl from eGFR and flags units/weight limits", () => {
    const notes = cockcroftGaultCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("creatinine clearance");
    expect(notes).toContain("egfr");
    expect(notes).toContain("88.4");
    expect(notes).toContain("mg/dl");
    expect(notes).toContain("not a diagnosis");
  });

  it("mdrd covers IDMS standardization, CKD-EPI differences, and adult limits", () => {
    const notes = mdrdCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("idms");
    expect(notes).toContain("ckd-epi");
    expect(notes).toContain("1.73");
    expect(notes).toContain("adults");
    expect(notes).toContain("not a diagnosis");
    expect(notes).toContain("acute kidney injury");
  });

  it("fena covers diuretics, early AKI, and adjunct-not-diagnosis framing", () => {
    const notes = fenaCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("diuretic");
    expect(notes).toContain("adjunctive");
    expect(notes).toContain("acute kidney injury");
    expect(notes).toContain("not a diagnosis");
  });

  it("bun-creatinine-ratio covers confounders and supportive-not-diagnostic framing", () => {
    const notes = bunCreatinineRatioCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("gastrointestinal bleeding");
    expect(notes).toContain("supportive rather than diagnostic");
    expect(notes).toContain("corticosteroid");
    expect(notes).toContain("not a diagnosis");
  });

  it("kdigo-aki-staging covers baseline uncertainty, oliguria, pediatrics, and non-diagnosis", () => {
    const notes = kdigoAkiStagingCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("baseline");
    expect(notes).toContain("oliguria");
    expect(notes).toContain("pediatric");
    expect(notes).toContain("etiology");
    expect(notes).toContain("does not, by itself, establish the cause");
  });
});

describe("Batch 2F — formulas and output values unchanged", () => {
  it("cockcroft-gault formula and output are unchanged", () => {
    expect(cockcroftGaultCalculator.formula).toContain("0.85");
    const result = cockcroftGaultCalculator.calculate({
      age: "50",
      weight: "70",
      sex: "1",
      creatinine: "1.0",
    });
    expect(result.value).toBe(87.5);
    expect(result.interpretation).toBe("Mild renal impairment");
    expect(result.status).toBe("normal");
  });

  it("mdrd formula and output are unchanged", () => {
    expect(mdrdCalculator.formula).toContain("175");
    expect(mdrdCalculator.formula).toContain("0.742");
    const result = mdrdCalculator.calculate({
      age: "50",
      sex: "1",
      creatinine: "1.0",
    });
    expect(result.value).toBeCloseTo(79.1, 1);
    expect(result.interpretation).toBe("G2: Mildly decreased");
    expect(result.status).toBe("normal");
  });

  it("fena formula and output are unchanged", () => {
    expect(fenaCalculator.formula).toContain("* 100");
    const result = fenaCalculator.calculate({
      urineNa: "20",
      plasmaNa: "140",
      urineCr: "120",
      plasmaCr: "2.0",
    });
    expect(result.value).toBe(0.24);
    expect(result.interpretation).toBe("Prerenal azotemia");
    expect(result.status).toBe("low");
  });

  it("bun-creatinine-ratio formula and output are unchanged", () => {
    expect(bunCreatinineRatioCalculator.formula).toContain("/");
    const result = bunCreatinineRatioCalculator.calculate({
      bun: "63",
      creatinine: "3",
    });
    expect(result.value).toBe(21);
    expect(result.interpretation).toBe("Elevated ratio");
    expect(result.status).toBe("high");
  });
});

describe("Batch 2F — KDIGO AKI staging logic unchanged", () => {
  it("no AKI when creatinine unchanged", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "1.0",
      "on-rrt": "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("Stage 1 by absolute rise", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "1.4",
      "on-rrt": "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("Stage 2 by ratio", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "2.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("Stage 3 by ratio", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "3.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("Stage 3 by absolute Cr without baseline", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "current-creatinine": "4.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("RRT overrides to Stage 3", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "1.1",
      "on-rrt": "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("highest applicable stage wins across creatinine and urine output", () => {
    const r = kdigoAkiStagingCalculator.calculate({
      "baseline-creatinine": "1.0",
      "current-creatinine": "1.4",
      weight: "70",
      "urine-output-rate": "0.4",
      "urine-output-duration": "14",
      "on-rrt": "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });
});

describe("Batch 2F — registry integrity", () => {
  it("registry still contains exactly 143 calculators with the five targets", () => {
    expect(calculatorRegistry.length).toBe(143);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const expected = [
      "cockcroft-gault",
      "mdrd",
      "fena",
      "bun-creatinine-ratio",
      "kdigo-aki-staging",
    ];
    for (const slug of expected) {
      expect(slugs).toContain(slug);
    }
  });
});