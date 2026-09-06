/**
 * Batch 2E — High-Value Clinical Content Enrichment Tests
 *
 * Focused regression tests for the five calculators enriched in Batch 2E
 * (AdSense-readiness clinical content):
 *   - corrected-calcium
 *   - anion-gap
 *   - corrected-sodium
 *   - serum-osmolality
 *   - shock-index
 *
 * Verifies (without broad snapshots):
 *   - No generic placeholder clinicalNotes or references remain
 *   - Named, authoritative references are present
 *   - Key calculator-specific clinical concepts are covered
 *   - Formulas and representative outputs are unchanged
 *   - Registry remains at exactly 143 with unchanged slugs
 */

import { describe, it, expect } from "vitest";

import { correctedCalciumCalculator } from "../../lib/calculators/corrected-calcium";
import { anionGapCalculator } from "../../lib/calculators/anion-gap";
import { correctedSodiumCalculator } from "../../lib/calculators/corrected-sodium";
import { serumOsmolalityCalculator } from "../../lib/calculators/serum-osmolality";
import { shockIndexCalculator } from "../../lib/calculators/shock-index";
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
  correctedCalciumCalculator,
  anionGapCalculator,
  correctedSodiumCalculator,
  serumOsmolalityCalculator,
  shockIndexCalculator,
];

function collectNotes(refs: string[], notes?: string) {
  return [...refs, notes ?? ""].join(" ");
}

describe("Batch 2E — no generic placeholder content remains", () => {
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

describe("Batch 2E — named authoritative references", () => {
  it.each(TARGETS.map((c) => c.slug))(
    "%s has at least two named references",
    (slug) => {
      const calc = TARGETS.find((c) => c.slug === slug)!;
      expect(calc.references?.length ?? 0).toBeGreaterThanOrEqual(2);
      for (const ref of calc.references ?? []) {
        expect(ref).not.toContain("MedCalcHub Clinical References");
        expect(ref.length).toBeGreaterThan(20);
      }
    },
  );

  it("corrected-calcium cites Payne BMJ 1973 and Bushinsky Lancet 1998", () => {
    const refs = (correctedCalciumCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Payne/i);
    expect(refs).toMatch(/BMJ\. 1973/);
    expect(refs).toMatch(/Bushinsky/i);
    expect(refs).toMatch(/Lancet\. 1998/);
  });

  it("anion-gap cites Emmett & Narins 1977 and Kraut & Madias 2007", () => {
    const refs = (anionGapCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Emmett/i);
    expect(refs).toMatch(/1977/);
    expect(refs).toMatch(/Kraut/i);
    expect(refs).toMatch(/Clin J Am Soc Nephrol\. 2007/);
  });

  it("corrected-sodium cites Katz NEJM 1973 and Hillier Am J Med 1999", () => {
    const refs = (correctedSodiumCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Katz/i);
    expect(refs).toMatch(/N Engl J Med\. 1973/);
    expect(refs).toMatch(/Hillier/i);
    expect(refs).toMatch(/Am J Med\. 1999/);
  });

  it("serum-osmolality cites Dorwart Clin Chem 1975 and Tintinalli 9th ed", () => {
    const refs = (serumOsmolalityCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Dorwart/i);
    expect(refs).toMatch(/Clin Chem\. 1975/);
    expect(refs).toMatch(/Tintinalli/i);
    expect(refs).toMatch(/9th ed\./);
  });

  it("shock-index cites Rady Ann Emerg Med 1994 and Cannon J Trauma 2009", () => {
    const refs = (shockIndexCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Rady/i);
    expect(refs).toMatch(/Ann Emerg Med\. 1994/);
    expect(refs).toMatch(/Cannon/i);
    expect(refs).toMatch(/J Trauma\. 2009/);
  });
});

describe("Batch 2E — calculator-specific clinical concepts", () => {
  it("corrected-calcium covers albumin binding, ionized calcium, and the Payne assumption", () => {
    const notes = correctedCalciumCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("albumin");
    expect(notes).toContain("ionized");
    expect(notes).toContain("protein-bound");
    expect(notes).toContain("payne");
  });

  it("anion-gap covers unmeasured anions, albumin effect, and the lab reference range", () => {
    const notes = anionGapCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("unmeasured anions");
    expect(notes).toContain("albumin");
    expect(notes).toContain("laboratory reference range");
  });

  it("corrected-sodium covers dilution by hyperglycemia and measured vs corrected", () => {
    const notes = correctedSodiumCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("hyperglycemia");
    expect(notes).toContain("dilut");
    expect(notes).toContain("measured sodium");
    expect(notes).toContain("estimate");
  });

  it("serum-osmolality covers calculated vs measured osmolarity and the osmolar gap", () => {
    const notes = serumOsmolalityCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("measured osmolality");
    expect(notes).toContain("osmolar gap");
    expect(notes).toContain("2 x sodium");
  });

  it("shock-index covers adjunctive trending, not automatic diagnosis", () => {
    const notes = shockIndexCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("adjunctive");
    expect(notes).toContain("trend");
    expect(notes).toContain("does not diagnose");
  });
});

describe("Batch 2E — formulas and output values unchanged", () => {
  it("corrected-calcium formula and output are unchanged", () => {
    expect(correctedCalciumCalculator.formula).toContain("0.8");
    const result = correctedCalciumCalculator.calculate({
      calcium: "8.0",
      albumin: "2.0",
    });
    expect(result.value).toBe(9.6);
    expect(result.status).toBe("normal");
  });

  it("anion-gap formula and output are unchanged", () => {
    expect(anionGapCalculator.formula).toContain("Na");
    const result = anionGapCalculator.calculate({
      sodium: "140",
      chloride: "105",
      bicarbonate: "12",
    });
    expect(result.value).toBe(23);
    expect(result.status).toBe("critical");
  });

  it("corrected-sodium formula and output are unchanged", () => {
    expect(correctedSodiumCalculator.formula).toContain("1.6");
    const result = correctedSodiumCalculator.calculate({
      sodium: "130",
      glucose: "400",
    });
    expect(result.value).toBe(134.8);
    expect(result.status).toBe("low");
  });

  it("serum-osmolality formula and output are unchanged", () => {
    expect(serumOsmolalityCalculator.formula).toContain("2");
    const result = serumOsmolalityCalculator.calculate({
      sodium: "140",
      glucose: "200",
      bun: "14",
    });
    expect(result.value).toBe(296.11);
    expect(result.status).toBe("high");
  });

  it("shock-index formula and output are unchanged", () => {
    expect(shockIndexCalculator.formula).toContain("Heart Rate");
    const result = shockIndexCalculator.calculate({
      "heart-rate": "120",
      sbp: "80",
    });
    expect(result.value).toBe(1.5);
    expect(result.status).toBe("critical");
  });
});

describe("Batch 2E — registry integrity", () => {
  it("registry still contains exactly 143 calculators with the five targets", () => {
    expect(calculatorRegistry.length).toBe(143);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const expected = [
      "corrected-calcium",
      "anion-gap",
      "corrected-sodium",
      "serum-osmolality",
      "shock-index",
    ];
    for (const slug of expected) {
      expect(slugs).toContain(slug);
    }
  });
});