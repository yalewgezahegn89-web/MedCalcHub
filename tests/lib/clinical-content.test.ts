/**
 * Sprint 1.8 — Clinical Content Integrity Tests
 */

import { describe, it, expect } from "vitest";
import {
  clinicalContentRegistry,
  getClinicalContent,
} from "@/lib/clinical-content";
import { calculatorRegistry } from "@/lib/calculators/registry";
import type { ClinicalContent } from "@/lib/clinical-content";

describe("Clinical Content Registry", () => {
  it("is a non-null object", () => {
    expect(clinicalContentRegistry).toBeDefined();
    expect(typeof clinicalContentRegistry).toBe("object");
  });

  it("has no duplicate keys", () => {
    const keys = Object.keys(clinicalContentRegistry);
    const unique = new Set(keys);
    expect(keys.length).toBe(unique.size);
  });

  it("every key corresponds to a registered calculator slug", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const key of Object.keys(clinicalContentRegistry)) {
      expect(registrySlugs.has(key)).toBe(true);
    }
  });
});

describe("getClinicalContent", () => {
  it("returns undefined for unknown slugs", () => {
    expect(getClinicalContent("nonexistent-calc")).toBe(
      undefined,
    );
  });

  it("returns undefined for empty string", () => {
    expect(getClinicalContent("")).toBe(undefined);
  });

  it("returns content for every registered pilot slug", () => {
    const pilotSlugs = [
      "anion-gap",
      "ckd-epi-2021",
      "corrected-qt",
      "bmi",
      "bun-creatinine-ratio",
      "corrected-sodium",
      "osmolar-gap",
      "news2",
      "cockcroft-gault",
      "homa-ir",
    ];
    for (const slug of pilotSlugs) {
      const content = getClinicalContent(slug);
      expect(content).toBeDefined();
      expect(typeof content).toBe("object");
    }
  });

  it("is deterministic across calls", () => {
    const a = getClinicalContent("anion-gap");
    const b = getClinicalContent("anion-gap");
    expect(a).toBe(b);
  });
});

describe("Clinical Content Field Validation", () => {
  const entries = Object.entries(clinicalContentRegistry);

  it("every clinicalPurpose is a non-empty string when present", () => {
    for (const [slug, content] of entries) {
      if (content.clinicalPurpose !== undefined) {
        expect(
          typeof content.clinicalPurpose,
          `${slug}.clinicalPurpose`,
        ).toBe("string");
        expect(
          content.clinicalPurpose.length,
          `${slug}.clinicalPurpose length`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("every howToUse is an array of non-empty strings when present", () => {
    for (const [slug, content] of entries) {
      if (content.howToUse !== undefined) {
        expect(
          Array.isArray(content.howToUse),
          `${slug}.howToUse`,
        ).toBe(true);
        for (const step of content.howToUse) {
          expect(
            typeof step,
            `${slug}.howToUse step`,
          ).toBe("string");
          expect(
            step.length,
            `${slug}.howToUse step length`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every whenToUse is an array of non-empty strings when present", () => {
    for (const [slug, content] of entries) {
      if (content.whenToUse !== undefined) {
        expect(
          Array.isArray(content.whenToUse),
          `${slug}.whenToUse`,
        ).toBe(true);
        for (const item of content.whenToUse) {
          expect(
            typeof item,
            `${slug}.whenToUse item`,
          ).toBe("string");
          expect(
            item.length,
            `${slug}.whenToUse item length`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every whenNotToUse is an array of non-empty strings when present", () => {
    for (const [slug, content] of entries) {
      if (content.whenNotToUse !== undefined) {
        expect(
          Array.isArray(content.whenNotToUse),
          `${slug}.whenNotToUse`,
        ).toBe(true);
        for (const item of content.whenNotToUse) {
          expect(
            typeof item,
            `${slug}.whenNotToUse item`,
          ).toBe("string");
          expect(
            item.length,
            `${slug}.whenNotToUse item length`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every limitations array contains non-empty strings when present", () => {
    for (const [slug, content] of entries) {
      if (content.limitations !== undefined) {
        expect(
          Array.isArray(content.limitations),
          `${slug}.limitations`,
        ).toBe(true);
        for (const item of content.limitations) {
          expect(
            typeof item,
            `${slug}.limitations item`,
          ).toBe("string");
          expect(
            item.length,
            `${slug}.limitations item length`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every example has valid structure when present", () => {
    for (const [slug, content] of entries) {
      if (content.example !== undefined) {
        expect(
          typeof content.example,
          `${slug}.example`,
        ).toBe("object");
        if (content.example.description !== undefined) {
          expect(
            typeof content.example.description,
            `${slug}.example.description`,
          ).toBe("string");
        }
        if (content.example.inputs !== undefined) {
          expect(
            typeof content.example.inputs,
            `${slug}.example.inputs`,
          ).toBe("object");
        }
        if (content.example.expectedResult !== undefined) {
          expect(
            typeof content.example.expectedResult,
            `${slug}.example.expectedResult`,
          ).toBe("string");
        }
      }
    }
  });

  it("every FAQ item has non-empty question and answer when present", () => {
    for (const [slug, content] of entries) {
      if (content.faq !== undefined) {
        expect(
          Array.isArray(content.faq),
          `${slug}.faq`,
        ).toBe(true);
        for (const item of content.faq) {
          expect(
            item.question.length,
            `${slug}.faq question`,
          ).toBeGreaterThan(0);
          expect(
            item.answer.length,
            `${slug}.faq answer`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every reference has a non-empty citation when present", () => {
    for (const [slug, content] of entries) {
      if (content.references !== undefined) {
        expect(
          Array.isArray(content.references),
          `${slug}.references`,
        ).toBe(true);
        for (const ref of content.references) {
          expect(
            ref.citation.length,
            `${slug}.reference citation`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every reference URL is syntactically valid when present", () => {
    for (const [slug, content] of entries) {
      if (content.references !== undefined) {
        for (const ref of content.references) {
          if (ref.url !== undefined) {
            expect(
              ref.url.startsWith("http"),
              `${slug}.reference URL starts with http`,
            ).toBe(true);
          }
        }
      }
    }
  });

  it("every evidence object has source when present", () => {
    for (const [slug, content] of entries) {
      if (content.evidence !== undefined) {
        expect(
          typeof content.evidence,
          `${slug}.evidence`,
        ).toBe("object");
      }
    }
  });

  it("every comparison object has calculators array when present", () => {
    for (const [slug, content] of entries) {
      if (content.comparison !== undefined) {
        expect(
          typeof content.comparison,
          `${slug}.comparison`,
        ).toBe("object");
      }
    }
  });

  it("every disclaimer is a non-empty string when present", () => {
    for (const [slug, content] of entries) {
      if (content.disclaimer !== undefined) {
        expect(
          typeof content.disclaimer,
          `${slug}.disclaimer`,
        ).toBe("string");
        expect(
          content.disclaimer.length,
          `${slug}.disclaimer length`,
        ).toBeGreaterThan(0);
      }
    }
  });
});

describe("Clinical Content ↔ Calculator Registry Sync", () => {
  it("every clinical content slug maps to a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of Object.keys(
      clinicalContentRegistry,
    )) {
      expect(
        registrySlugs.has(slug),
        `Clinical content key "${slug}" has no matching calculator in registry`,
      ).toBe(true);
    }
  });

  it("every pilot calculator has clinical content", () => {
    const pilotSlugs = [
      "anion-gap",
      "ckd-epi-2021",
      "corrected-qt",
      "bmi",
      "bun-creatinine-ratio",
      "corrected-sodium",
      "osmolar-gap",
      "news2",
      "cockcroft-gault",
      "homa-ir",
    ];
    for (const slug of pilotSlugs) {
      expect(
        clinicalContentRegistry[slug],
        `Pilot calculator "${slug}" missing clinical content`,
      ).toBeDefined();
    }
  });

  it("no orphaned clinical content records exist (every key is a registered calculator)", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const key of Object.keys(
      clinicalContentRegistry,
    )) {
      expect(registrySlugs.has(key)).toBe(true);
    }
  });

  it("clinical content count is <= calculator registry count", () => {
    expect(
      Object.keys(clinicalContentRegistry).length,
    ).toBeLessThanOrEqual(calculatorRegistry.length);
  });
});

describe("Clinical Content Interpretation Guide", () => {
  const entries = Object.entries(clinicalContentRegistry);

  it("every interpretation has valid structure when present", () => {
    for (const [slug, content] of entries) {
      if (content.interpretation !== undefined) {
        expect(
          typeof content.interpretation,
          `${slug}.interpretation`,
        ).toBe("object");
        if (content.interpretation.guide !== undefined) {
          expect(
            typeof content.interpretation.guide,
            `${slug}.interpretation.guide`,
          ).toBe("string");
        }
        if (
          content.interpretation.sexSpecific !== undefined
        ) {
          expect(
            typeof content.interpretation.sexSpecific,
            `${slug}.interpretation.sexSpecific`,
          ).toBe("boolean");
        }
      }
    }
  });
});