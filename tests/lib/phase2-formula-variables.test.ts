/**
 * Phase 2 — Formula and variable explanations coverage tests.
 */
import { describe, it, expect } from "vitest";

import {
  calculatorRegistry,
} from "../../lib/calculators/registry";
import { clinicalContentRegistry } from "../../lib/clinical-content/registry";

const badKeys = new Set([
  "faq",
  "interpretation",
  "guide",
  "howToUse",
  "whenToUse",
  "whenNotToUse",
  "limitations",
  "example",
  "clinicalPurpose",
  "clinicalSignificance",
  "references",
  "evidence",
  "disclaimer",
  "expectedResult",
  "inputs",
  "description",
  "citation",
  "url",
  "level",
  "source",
  "reference",
  "reviewedBy",
  "version",
  "updatedAt",
  "links",
  "inputId",
  "label",
  "explanation",
  "commonError",
  "reviewedDate",
  "reviewer",
  "sourcesVerified",
  "variables",
  "commonMistakes",
  "clinicalPearl",
  "relatedGuideIds",
  "review",
  "formulaExplanation",
  "question",
  "answer",
]);

function getAllCalculatorSlugs(): string[] {
  return calculatorRegistry.map((c) => c.slug).sort();
}

function getClinicalContentKeys(): string[] {
  return Object.keys(clinicalContentRegistry).filter(
    (k) => !badKeys.has(k) && k.length >= 3,
  );
}

describe("Phase 2: coverage baseline", () => {
  it("registry count remains 143", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("clinical content has entries for all calculator slugs", () => {
    const calcSlugs = getAllCalculatorSlugs();
    const clinKeys = new Set(getClinicalContentKeys());
    const missing = calcSlugs.filter((s) => !clinKeys.has(s));
    expect(missing).toEqual([]);
  });
});

describe("Phase 2: formula and variable requirements", () => {
  const calcSlugs = getAllCalculatorSlugs();

  for (const slug of calcSlugs) {
    describe(slug, () => {
      it("has formulaExplanation", () => {
        const content = clinicalContentRegistry[slug];
        expect(content?.formulaExplanation).toBeDefined();
        expect(
          typeof content?.formulaExplanation,
        ).toBe("string");
        expect(
          content!.formulaExplanation!.trim(),
        ).toBeTruthy();
      });

      it("has variables array covering meaningful inputs", () => {
        const content = clinicalContentRegistry[slug];
        expect(content?.variables).toBeDefined();
        expect(Array.isArray(content?.variables)).toBe(
          true,
        );
        expect(content!.variables!.length).toBeGreaterThan(
          0,
        );
      });

      it("all variable inputIds are valid for this calculator", () => {
        const calc = calculatorRegistry.find(
          (c) => c.slug === slug,
        );
        const content = clinicalContentRegistry[slug];
        const inputIds = new Set(
          calc?.inputs?.map((i) => i.id) ?? [],
        );
        const vars = content?.variables ?? [];
        for (const v of vars) {
          expect(v.inputId).toBeDefined();
          expect(typeof v.inputId).toBe("string");
          expect(inputIds.has(v.inputId)).toBe(true);
        }
      });

      it("no duplicate variable inputIds", () => {
        const content = clinicalContentRegistry[slug];
        const vars = content?.variables ?? [];
        const ids = vars.map((v) => v.inputId);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("each variable has explanation", () => {
        const content = clinicalContentRegistry[slug];
        const vars = content?.variables ?? [];
        for (const v of vars) {
          expect(v.explanation).toBeDefined();
          expect(typeof v.explanation).toBe("string");
          expect(v.explanation.trim()).toBeTruthy();
        }
      });
    });
  }
});
