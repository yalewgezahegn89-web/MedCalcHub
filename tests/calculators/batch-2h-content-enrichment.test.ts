/**
 * Batch 2H — Endocrine/Metabolic + FEUrea Content Enrichment Tests
 *
 * Focused regression tests for the five calculators enriched in Batch 2H:
 *   - homa-ir
 *   - homa-b
 *   - insulin-sensitivity
 *   - estimated-average-glucose
 *   - feurea
 *
 * Verifies (without broad snapshots):
 *   - No generic placeholder clinicalNotes or placeholder markers remain
 *   - Authoritative references are present
 *   - Key calculator-specific safety/context concepts are covered
 *   - Formulas and representative outputs are unchanged
 *   - Registry remains at exactly 143 with unchanged slugs
 */

import { describe, it, expect } from "vitest";

import { homaIrCalculator } from "../../lib/calculators/homa-ir";
import { homaBCalculator } from "../../lib/calculators/homa-b";
import { insulinSensitivityCalculator } from "../../lib/calculators/insulin-sensitivity";
import { estimatedAverageGlucoseCalculator } from "../../lib/calculators/estimated-average-glucose";
import { feureaCalculator } from "../../lib/calculators/feurea";
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
  homaIrCalculator,
  homaBCalculator,
  insulinSensitivityCalculator,
  estimatedAverageGlucoseCalculator,
  feureaCalculator,
];

function collectNotes(refs: string[], notes?: string) {
  return [...refs, notes ?? ""].join(" ");
}

describe("Batch 2H — no generic placeholder content remains", () => {
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

describe("Batch 2H — authoritative references present", () => {
  it("homa-ir cites Matthews et al. 1985 (primary HOMA source)", () => {
    const refs = (homaIrCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Matthews DR/);
    expect(refs).toMatch(/Diabetologia\. 1985;28\(7\):412-419/);
  });

  it("homa-b cites Matthews et al. 1985 (primary HOMA source)", () => {
    const refs = (homaBCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Matthews DR/);
    expect(refs).toMatch(/Diabetologia\. 1985;28\(7\):412-419/);
  });

  it("insulin-sensitivity cites Matthews et al. 1985 (inverse HOMA-IR)", () => {
    const refs = (insulinSensitivityCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Matthews DR/);
    expect(refs).toMatch(/Diabetologia\. 1985;28\(7\):412-419/);
  });

  it("estimated-average-glucose cites the ADAG study (Nathan 2008)", () => {
    const refs = (estimatedAverageGlucoseCalculator.references ?? []).join(
      " ",
    );
    expect(refs).toMatch(/Nathan DM/);
    expect(refs).toMatch(/Diabetes Care\. 2008;31\(8\):1473-1478/);
  });

  it("feurea cites Kaplan & Kohn 1992 and the KDIGO AKI guideline", () => {
    const refs = (feureaCalculator.references ?? []).join(" ");
    expect(refs).toMatch(/Kaplan AA, Kohn OF/);
    expect(refs).toMatch(/Am J Nephrol\. 1992;12\(1-2\):49-54/);
    expect(refs).toMatch(/KDIGO/);
    expect(refs).toMatch(/Kidney Int Suppl\. 2012;2\(1\):1-138/);
  });
});

describe("Batch 2H — calculator-specific safety/context concepts", () => {
  it("homa-ir covers fasting dependence, cutoff caveats, and non-diagnostic framing", () => {
    const notes = homaIrCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("insulin resistance");
    expect(notes).toContain("405");
    expect(notes).toContain("2.5");
    expect(notes).toContain("fasting");
    expect(notes).toContain("no universally accepted diagnostic threshold");
    expect(notes).toContain("type 1 diabetes");
    expect(notes).toContain("exogenous insulin");
    expect(notes).toContain("should not be used alone to diagnose");
  });

  it("homa-b covers beta-cell function, indirect estimation, and pairing with HOMA-IR", () => {
    const notes = homaBCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("beta-cell function");
    expect(notes).toContain("3.5");
    expect(notes).toContain("not a direct measurement");
    expect(notes).toContain("beta-cell mass");
    expect(notes).toContain("type 1 diabetes");
    expect(notes).toContain("standalone");
    expect(notes).toContain("paired with homa-ir");
  });

  it("insulin-sensitivity covers reciprocal-of-HOMA-IR framing and measurement limits", () => {
    const notes = insulinSensitivityCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("reciprocal");
    expect(notes).toContain("mathematical transformation");
    expect(notes).toContain("not a direct measurement");
    expect(notes).toContain("clamp");
    expect(notes).toContain("type 1 diabetes");
    expect(notes).toContain("standalone diagnosis");
  });

  it("eAG covers ADAG equation, estimate nature, and red cell lifespan confounders", () => {
    const notes = estimatedAverageGlucoseCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("adag");
    expect(notes).toContain("28.7");
    expect(notes).toContain("46.7");
    expect(notes).toContain("2–3 months");
    expect(notes).toContain("not a direct glucose measurement");
    expect(notes).toContain("red cell lifespan");
    expect(notes).toContain("hemoglobin");
    expect(notes).toContain("smbg");
    expect(notes).toContain("cgm");
  });

  it("feurea covers AKI adjunct role, diuretic context, confounders, and non-diagnosis", () => {
    const notes = feureaCalculator.clinicalNotes!.toLowerCase();
    expect(notes).toContain("fractional excretion of urea");
    expect(notes).toContain("acute kidney injury");
    expect(notes).toContain("diuretics");
    expect(notes).toContain("fena");
    expect(notes).toContain("liver disease");
    expect(notes).toContain("corticosteroids");
    expect(notes).toContain("must never be interpreted alone");
    expect(notes).toContain("not by itself");
    expect(notes).toContain("diagnosis");
  });
});

describe("Batch 2H — formulas and output values unchanged", () => {
  it("homa-ir formula and output are unchanged", () => {
    expect(homaIrCalculator.formula).toContain("(glucose * insulin) / 405");
    const result = homaIrCalculator.calculate({
      glucose: "95",
      insulin: "10",
    });
    expect(result.value).toBe(2.35);
    expect(result.interpretation).toBe("Normal insulin sensitivity");
    expect(result.status).toBe("normal");
  });

  it("homa-b formula and output are unchanged", () => {
    expect(homaBCalculator.formula).toContain("(20 * insulin)");
    expect(homaBCalculator.formula).toContain("glucose - 3.5");
    const result = homaBCalculator.calculate({
      insulin: "8",
      glucose: "5.0",
    });
    expect(result.value).toBe(106.67);
    expect(result.interpretation).toBe("Normal beta-cell function");
    expect(result.status).toBe("normal");
  });

  it("insulin-sensitivity formula and output are unchanged", () => {
    expect(insulinSensitivityCalculator.formula).toContain("1 / homair");
    const result = insulinSensitivityCalculator.calculate({ homaIr: "2.0" });
    expect(result.value).toBe(0.5);
    expect(result.interpretation).toBe("Normal insulin sensitivity");
    expect(result.status).toBe("normal");
  });

  it("estimated-average-glucose formula and output are unchanged", () => {
    expect(estimatedAverageGlucoseCalculator.formula).toContain(
      "28.7 * a1c - 46.7",
    );
    const result = estimatedAverageGlucoseCalculator.calculate({ a1c: "5.0" });
    expect(result.value).toBe(96.8);
    expect(result.interpretation).toBe("Normal average glucose");
    expect(result.status).toBe("normal");
  });

  it("feurea formula and output are unchanged", () => {
    expect(feureaCalculator.formula).toContain("* 100");
    const result = feureaCalculator.calculate({
      urineUrea: "100",
      plasmaUrea: "10",
      urineCr: "50",
      plasmaCr: "1",
    });
    expect(result.value).toBe(20);
    expect(result.interpretation).toBe("Prerenal azotemia");
    expect(result.status).toBe("low");
  });
});

describe("Batch 2H — registry integrity", () => {
  it("registry still contains exactly 143 calculators with the five targets", () => {
    expect(calculatorRegistry.length).toBe(143);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const expected = [
      "homa-ir",
      "homa-b",
      "insulin-sensitivity",
      "estimated-average-glucose",
      "feurea",
    ];
    for (const slug of expected) {
      expect(slugs).toContain(slug);
    }
  });
});