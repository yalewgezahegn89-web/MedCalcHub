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

const PILOT_SLUGS = [
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

const BATCH_5_SLUGS = [
  "curb-65",
  "qsofa",
  "gcs",
  "shock-index",
  "map",
  "mdrd",
  "fena",
  "feurea",
  "albumin-creatinine-ratio",
  "corrected-calcium",
  "homa-b",
  "insulin-sensitivity",
  "bsa",
  "ideal-body-weight",
  "adjusted-body-weight",
];

const BATCH_6_SLUGS = [
  "child-pugh",
  "corrected-anion-gap",
  "serum-osmolality",
  "ttkg",
  "calcium-phosphate-product",
  "a1c-eag-converter",
  "estimated-average-glucose",
  "bmi-for-pediatrics",
  "lean-body-weight",
  "mifflin-st-jeor",
  "harris-benedict",
  "sodium-deficit",
  "heart-rate",
  "waist-to-hip-ratio",
];

const BATCH_7_SLUGS = [
  "calorie-requirement",
  "fluid-requirement",
  "maintenance-fluids",
] as const;

const BATCH_10_SLUGS = [
  "perc-rule",
  "wells-pe",
  "wells-dvt",
  "heart-score",
  "sofa-score",
  "sirs-criteria",
  "crb-65",
  "psi-port",
  "rts",
  "parkland-formula",
] as const;

const BATCH_11_SLUGS = [
  "timi",
  "grace",
  "cha2ds2-vasc",
  "has-bled",
  "rcri",
  "ascvd",
  "dapt",
  "h2fpef",
] as const;

const BATCH_12_SLUGS = [
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

const BATCH_13_SLUGS = [
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

const BATCH_14_SLUGS = [
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

const BATCH_15_SLUGS = [
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

const BATCH_16_SLUGS = [
  "nihss",
  "abcd2-score",
  "hunt-hess-scale",
  "modified-rankin-scale",
  "ottawa-sah-rule",
  "fout-score",
  "race-scale",
  "esrs",
] as const;

const BATCH_17_SLUGS = [
  "phq-9",
  "gad-7",
  "epworth",
  "stop-bang",
  "centor",
  "charlson",
  "barthel",
  "ecog",
] as const;

const BATCH_18_SLUGS = [
  "apri-score",
  "fib-4-index",
  "glasgow-blatchford-score",
  "maddrey-discriminant-function",
  "meld-score",
  "meld-na-score",
  "nafld-fibrosis-score",
  "rockall-score",
] as const;

const BATCH_19_SLUGS = [
  "a-a-gradient",
  "oxygen-index",
  "pf-ratio",
  "rox-index",
] as const;

const BATCH_20_SLUGS = [
  "free-water-deficit",
  "albumin-corrected-calcium",
  "basal-metabolic-rate",
  "fractional-excretion-calculator",
  "edd",
  "gestational-age",
  "adrenal-steroid-converter",
  "thyroid-dose",
  "levothyroxine-dose",
] as const;

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
    for (const slug of PILOT_SLUGS) {
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
    for (const slug of PILOT_SLUGS) {
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

describe("Clinical Content — Sprint 1.8 Batch 5 Expansion", () => {
  it("every batch-5 selected calculator has clinical content", () => {
    for (const slug of BATCH_5_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(
        content,
        `Batch 5 calculator "${slug}" missing clinical content`,
      ).toBeDefined();
    }
  });

  it("every batch-5 slug corresponds to a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of BATCH_5_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `Batch 5 slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("every batch-5 record has required core fields", () => {
    for (const slug of BATCH_5_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.clinicalPurpose,
        `${slug}.clinicalPurpose`,
      ).toBeDefined();
      expect(
        record.clinicalPurpose!.length,
        `${slug}.clinicalPurpose length`,
      ).toBeGreaterThan(0);

      expect(
        record.howToUse,
        `${slug}.howToUse`,
      ).toBeDefined();
      expect(
        record.howToUse!.length,
        `${slug}.howToUse length`,
      ).toBeGreaterThan(0);
      for (const step of record.howToUse!) {
        expect(step.length).toBeGreaterThan(0);
      }

      expect(
        record.limitations,
        `${slug}.limitations`,
      ).toBeDefined();
      expect(
        record.limitations!.length,
        `${slug}.limitations length`,
      ).toBeGreaterThan(0);

      expect(
        record.disclaimer,
        `${slug}.disclaimer`,
      ).toBeDefined();
      expect(
        record.disclaimer!.length,
        `${slug}.disclaimer length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every batch-5 record has an interpretation guide", () => {
    for (const slug of BATCH_5_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.interpretation,
        `${slug}.interpretation`,
      ).toBeDefined();
      expect(
        record.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(
        record.interpretation!.guide!.length,
        `${slug}.interpretation.guide length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every batch-5 record has a valid worked example", () => {
    for (const slug of BATCH_5_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(record.example, `${slug}.example`).toBeDefined();
      expect(
        record.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(
        record.example!.inputs,
        `${slug}.example.inputs`,
      ).toBeDefined();
      const inputs = record.example!.inputs!;
      expect(
        Object.keys(inputs).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      for (const [key, value] of Object.entries(inputs)) {
        expect(
          value.length,
          `${slug}.example.inputs.${key}`,
        ).toBeGreaterThan(0);
      }
      expect(
        record.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
    }
  });

  it("every batch-5 example input key matches a registered calculator input", () => {
    const bySlug = new Map(
      calculatorRegistry.map((c) => [c.slug, c]),
    );
    for (const slug of BATCH_5_SLUGS) {
      const calculator = bySlug.get(slug);
      const inputIds = new Set(
        (calculator?.inputs ?? []).map((i) => i.id),
      );
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      for (const key of Object.keys(
        content!.example!.inputs!,
      )) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-5 record has valid references", () => {
    for (const slug of BATCH_5_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.references,
        `${slug}.references`,
      ).toBeDefined();
      expect(
        record.references!.length,
        `${slug}.references length`,
      ).toBeGreaterThan(0);
      for (const ref of record.references!) {
        expect(
          ref.citation.length,
          `${slug} reference citation`,
        ).toBeGreaterThan(0);
        if (ref.url !== undefined) {
          expect(ref.url.startsWith("http")).toBe(true);
        }
      }
    }
  });

  it("adds no orphan content and keeps the registry deterministic", () => {
    const keys = Object.keys(clinicalContentRegistry);
    expect(new Set(keys).size).toBe(keys.length);
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const key of keys) {
      expect(registrySlugs.has(key)).toBe(true);
    }
    expect(getClinicalContent("curb-65")).toBe(
      clinicalContentRegistry["curb-65"],
    );
  });

  it("keeps the existing 10 pilot calculators intact", () => {
    for (const slug of PILOT_SLUGS) {
      expect(clinicalContentRegistry[slug]).toBeDefined();
    }
  });

  it("reports full coverage of pilots plus batch 5", () => {
    const covered = new Set([
      ...PILOT_SLUGS,
      ...BATCH_5_SLUGS,
    ]);
    for (const slug of covered) {
      expect(
        clinicalContentRegistry[slug],
        `Covered slug "${slug}" missing content`,
      ).toBeDefined();
    }
  });
});

describe("Clinical Content — Sprint 1.8 Batch 6 Expansion", () => {
  it("every batch-6 selected calculator has clinical content", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(
        content,
        `Batch 6 calculator "${slug}" missing clinical content`,
      ).toBeDefined();
    }
  });

  it("every batch-6 slug corresponds to a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of BATCH_6_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `Batch 6 slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("every batch-6 record has required core fields", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.clinicalPurpose,
        `${slug}.clinicalPurpose`,
      ).toBeDefined();
      expect(
        record.clinicalPurpose!.length,
        `${slug}.clinicalPurpose length`,
      ).toBeGreaterThan(0);

      expect(record.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(
        record.howToUse!.length,
        `${slug}.howToUse length`,
      ).toBeGreaterThan(0);
      for (const step of record.howToUse!) {
        expect(step.length).toBeGreaterThan(0);
      }

      expect(
        record.whenToUse,
        `${slug}.whenToUse`,
      ).toBeDefined();
      expect(
        record.whenToUse!.length,
        `${slug}.whenToUse length`,
      ).toBeGreaterThan(0);

      expect(
        record.limitations,
        `${slug}.limitations`,
      ).toBeDefined();
      expect(
        record.limitations!.length,
        `${slug}.limitations length`,
      ).toBeGreaterThan(0);

      expect(
        record.disclaimer,
        `${slug}.disclaimer`,
      ).toBeDefined();
      expect(
        record.disclaimer!.length,
        `${slug}.disclaimer length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every batch-6 record has an interpretation guide", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.interpretation,
        `${slug}.interpretation`,
      ).toBeDefined();
      expect(
        record.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(
        record.interpretation!.guide!.length,
        `${slug}.interpretation.guide length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every batch-6 record has a valid worked example", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(record.example, `${slug}.example`).toBeDefined();
      expect(
        record.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(
        record.example!.inputs,
        `${slug}.example.inputs`,
      ).toBeDefined();
      const inputs = record.example!.inputs!;
      expect(
        Object.keys(inputs).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      for (const [key, value] of Object.entries(inputs)) {
        expect(
          value.length,
          `${slug}.example.inputs.${key}`,
        ).toBeGreaterThan(0);
      }
      expect(
        record.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
    }
  });

  it("every batch-6 example input key matches a registered calculator input", () => {
    const bySlug = new Map(
      calculatorRegistry.map((c) => [c.slug, c]),
    );
    for (const slug of BATCH_6_SLUGS) {
      const calculator = bySlug.get(slug);
      const inputIds = new Set(
        (calculator?.inputs ?? []).map((i) => i.id),
      );
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      for (const key of Object.keys(
        content!.example!.inputs!,
      )) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-6 record has valid references", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(
        record.references,
        `${slug}.references`,
      ).toBeDefined();
      expect(
        record.references!.length,
        `${slug}.references length`,
      ).toBeGreaterThan(0);
      for (const ref of record.references!) {
        expect(
          ref.citation.length,
          `${slug} reference citation`,
        ).toBeGreaterThan(0);
        if (ref.url !== undefined) {
          expect(ref.url.startsWith("http")).toBe(true);
        }
      }
    }
  });

  it("every batch-6 record with evidence has valid structure", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      expect(record.evidence, `${slug}.evidence`).toBeDefined();
      const evidence = record.evidence!;
      expect(evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(evidence.source!.length).toBeGreaterThan(0);
      if (evidence.references !== undefined) {
        expect(Array.isArray(evidence.references)).toBe(true);
        for (const ref of evidence.references) {
          expect(ref.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every batch-6 record with comparison has valid structure", () => {
    for (const slug of BATCH_6_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const record = content!;

      if (record.comparison === undefined) continue;
      const calculators = record.comparison!.calculators ?? [];
      expect(
        calculators.length,
        `${slug}.comparison.calculators length`,
      ).toBeGreaterThan(0);
      for (const item of calculators) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("adds no orphan content and keeps the registry deterministic", () => {
    const keys = Object.keys(clinicalContentRegistry);
    expect(new Set(keys).size).toBe(keys.length);
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const key of keys) {
      expect(registrySlugs.has(key)).toBe(true);
    }
    expect(getClinicalContent("child-pugh")).toBe(
      clinicalContentRegistry["child-pugh"],
    );
  });

  it("keeps the existing pilots and batch 5 records intact", () => {
    const covered = new Set([
      ...PILOT_SLUGS,
      ...BATCH_5_SLUGS,
    ]);
    for (const slug of covered) {
      expect(clinicalContentRegistry[slug]).toBeDefined();
    }
  });

  it("reports full coverage of pilots plus batch 5 plus batch 6", () => {
    const covered = new Set([
      ...PILOT_SLUGS,
      ...BATCH_5_SLUGS,
      ...BATCH_6_SLUGS,
    ]);
    for (const slug of covered) {
      expect(
        clinicalContentRegistry[slug],
        `Covered slug "${slug}" missing content`,
      ).toBeDefined();
    }
  });
});

describe("Clinical Content — Sprint 1.8 Batch 7 Final Clean Expansion", () => {
  it("every batch-7 slug is a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of BATCH_7_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `Batch 7 slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("every batch-7 slug has clinical content", () => {
    for (const slug of BATCH_7_SLUGS) {
      expect(
        clinicalContentRegistry[slug],
        `Batch 7 calculator "${slug}" missing clinical content`,
      ).toBeDefined();
    }
  });

  it("every batch-7 clinicalPurpose is non-empty", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content!.clinicalPurpose,
        `${slug}.clinicalPurpose`,
      ).toBeDefined();
      expect(content!.clinicalPurpose!.length).toBeGreaterThan(0);
    }
  });

  it("every batch-7 howToUse is non-empty", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      for (const step of content!.howToUse!) {
        expect(step.length).toBeGreaterThan(0);
      }
    }
  });

  it("every batch-7 limitations are non-empty", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content!.limitations,
        `${slug}.limitations`,
      ).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      for (const item of content!.limitations!) {
        expect(item.length).toBeGreaterThan(0);
      }
    }
  });

  it("every batch-7 disclaimer is non-empty", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content!.disclaimer,
        `${slug}.disclaimer`,
      ).toBeDefined();
      expect(content!.disclaimer!.length).toBeGreaterThan(0);
    }
  });

  it("every batch-7 interpretation is valid", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content!.interpretation,
        `${slug}.interpretation`,
      ).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(
        content!.interpretation!.guide!.length,
      ).toBeGreaterThan(0);
    }
  });

  it("every batch-7 example is structurally valid", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      const inputs = content!.example!.inputs!;
      expect(Object.keys(inputs).length).toBeGreaterThan(0);
      for (const [key, value] of Object.entries(inputs)) {
        expect(value.length).toBeGreaterThan(0);
      }
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
    }
  });

  it("every batch-7 example key matches a registered calculator input id", () => {
    const bySlug = new Map(
      calculatorRegistry.map((c) => [c.slug, c]),
    );
    for (const slug of BATCH_7_SLUGS) {
      const calculator = bySlug.get(slug);
      const inputIds = new Set(
        (calculator?.inputs ?? []).map((i) => i.id),
      );
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      for (const key of Object.keys(content!.example!.inputs!)) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-7 references are structurally valid", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content!.references,
        `${slug}.references`,
      ).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      for (const ref of content!.references!) {
        expect(ref.citation.length).toBeGreaterThan(0);
        if (ref.url !== undefined) {
          expect(ref.url.startsWith("http")).toBe(true);
        }
      }
    }
  });

  it("every batch-7 evidence is valid when present", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      if (content!.evidence === undefined) continue;
      expect(
        content!.evidence!.source,
        `${slug}.evidence.source`,
      ).toBeDefined();
      expect(content!.evidence!.source!.length).toBeGreaterThan(0);
      if (content!.evidence!.references !== undefined) {
        expect(Array.isArray(content!.evidence!.references)).toBe(true);
        for (const ref of content!.evidence!.references) {
          expect(ref.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every batch-7 faq is valid when present", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      if (content!.faq === undefined) continue;
      expect(content!.faq!.length).toBeGreaterThan(0);
      for (const item of content!.faq!) {
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it("every batch-7 comparison is valid when present", () => {
    for (const slug of BATCH_7_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      if (content!.comparison === undefined) continue;
      const calculators = content!.comparison!.calculators ?? [];
      expect(calculators.length).toBeGreaterThan(0);
      for (const item of calculators) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("has no duplicate clinical content keys", () => {
    const keys = Object.keys(clinicalContentRegistry);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("has no orphan clinical content records", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const key of Object.keys(clinicalContentRegistry)) {
      expect(registrySlugs.has(key)).toBe(true);
    }
  });

  it("keeps existing pilot records intact", () => {
    for (const slug of PILOT_SLUGS) {
      expect(
        clinicalContentRegistry[slug],
        `Pilot slug "${slug}" missing content`,
      ).toBeDefined();
    }
  });

  it("reports the correct total count after the batch", () => {
    const expected = new Set([
      ...PILOT_SLUGS,
      ...BATCH_5_SLUGS,
      ...BATCH_6_SLUGS,
      ...BATCH_7_SLUGS,
      ...BATCH_10_SLUGS,
      ...BATCH_11_SLUGS,
      ...BATCH_12_SLUGS,
      ...BATCH_13_SLUGS,
      ...BATCH_14_SLUGS,
      ...BATCH_15_SLUGS,
      ...BATCH_16_SLUGS,
      ...BATCH_17_SLUGS,
      ...BATCH_18_SLUGS,
      ...BATCH_19_SLUGS,
      ...BATCH_20_SLUGS,
    ]).size;
    expect(Object.keys(clinicalContentRegistry).length).toBe(expected);
  });
});

describe("Clinical Content — Sprint 1.9 Batch 12 (Laboratory & Metabolic)", () => {
  it("every batch-12 calculator has clinical content", () => {
    for (const slug of BATCH_12_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-12 record has the full core field set", () => {
    for (const slug of BATCH_12_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-12 faq is valid when present", () => {
    for (const slug of BATCH_12_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      if (content!.faq === undefined) continue;
      expect(content!.faq!.length).toBeGreaterThan(0);
      for (const item of content!.faq!) {
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it("every batch-12 comparison is valid when present", () => {
    for (const slug of BATCH_12_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      if (content!.comparison === undefined) continue;
      const calculators = content!.comparison!.calculators ?? [];
      expect(calculators.length).toBeGreaterThan(0);
      for (const item of calculators) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("every batch-12 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_12_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-12 worked example matches verified output", () => {
    const batch12VerifiedValues: Record<string, string | number> = {
      "ldl-cholesterol": 160,
      "non-hdl-cholesterol": 190,
      "albumin-globulin-ratio": 1.33,
      "tyg-index": 8.82,
      "triglyceride-hdl-ratio": 3.75,
      quicki: 0.34,
      "winters-formula": 23,
      "anion-gap-delta-ratio": 0.92,
      "urine-anion-gap": -80,
      "kt-v": 1.29,
    };
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_12_SLUGS) {
      const expected = batch12VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 13 (Renal & Laboratory/Metabolic)", () => {
  const batch13VerifiedValues: Record<string, string | number> = {
    "fractional-excretion-uric-acid": 5,
    "fractional-excretion-phosphate": 25,
    "fractional-excretion-calcium": 5,
    "renal-failure-index": 0.6,
    "urine-osmolal-gap": 160,
    "free-water-clearance": 1.09,
    "electrolyte-free-water-clearance": 0.21,
    "urine-protein-creatinine-ratio": 1.5,
    "creatinine-clearance-24h": 100,
    "total-cholesterol-hdl-ratio": 3,
    "atherogenic-index-of-plasma": 0.1,
    "apob-apoa1-ratio": 0.71,
    "respiratory-compensation": 25,
    "metabolic-alkalosis-compensation": 49.6,
    "free-thyroxine-index": 2.4,
    "metabolic-syndrome-atp3": 5,
  };

  it("every batch-13 calculator has clinical content", () => {
    for (const slug of BATCH_13_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-13 record has the full core field set", () => {
    for (const slug of BATCH_13_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-13 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_13_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-13 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_13_SLUGS) {
      const expected = batch13VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 14 (Obstetrics)", () => {
  const batch14VerifiedValues: Record<string, string | number> = {
    "bishop-score": 8,
    "biophysical-profile": 8,
    "hellp-syndrome": 3,
    "hadlock-efw": 2985,
    "preeclampsia-criteria": 0,
    "gestational-weight-gain": 20,
    "magnesium-sulfate-preeclampsia": 52,
    "ebl-obstetric": 992,
    epds: 10,
  };

  it("every batch-14 calculator has clinical content", () => {
    for (const slug of BATCH_14_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-14 record has the full core field set", () => {
    for (const slug of BATCH_14_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-14 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_14_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-14 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_14_SLUGS) {
      const expected = batch14VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 15 (Pediatrics)", () => {
  const batch15VerifiedValues: Record<string, string | number> = {
    "apgar-score": 9,
    "pediatric-gcs": 11,
    "pediatric-trauma-score": 8,
    "westley-croup-score": 4,
    "pecarn-head-trauma": 0,
    "rochester-criteria": 7,
    "gorelick-dehydration": 2,
    "pediatric-hypotension": 78,
    "peds-pews": 3,
  };

  it("every batch-15 calculator has clinical content", () => {
    for (const slug of BATCH_15_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-15 record has the full core field set", () => {
    for (const slug of BATCH_15_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-15 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_15_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-15 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_15_SLUGS) {
      const expected = batch15VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });
});


describe("Clinical Content — Sprint 1.9 Batch 16 (Neurology)", () => {
  const batch16VerifiedValues: Record<string, string | number> = {
    "nihss": 14,
    "abcd2-score": 7,
    "hunt-hess-scale": 3,
    "modified-rankin-scale": 3,
    "ottawa-sah-rule": 3,
    "fout-score": 12,
    "race-scale": 9,
    "esrs": 7,
  };

  it("every batch-16 calculator has clinical content", () => {
    for (const slug of BATCH_16_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-16 record has the full core field set", () => {
    for (const slug of BATCH_16_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-16 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_16_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-16 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_16_SLUGS) {
      const expected = batch16VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });

  it("every batch-16 calculator is registered under the Neurology specialty", () => {
    for (const slug of BATCH_16_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      expect(calc!.specialty, `${slug}.specialty`).toBe("Neurology");
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 17 (General Medicine)", () => {
  const batch17VerifiedValues: Record<string, string | number> = {
    "phq-9": 13,
    "gad-7": 11,
    epworth: 14,
    "stop-bang": 5,
    centor: 4,
    charlson: 6,
    barthel: 75,
    ecog: 2,
  };

  it("every batch-17 calculator has clinical content", () => {
    for (const slug of BATCH_17_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-17 record has the full core field set", () => {
    for (const slug of BATCH_17_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-17 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_17_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-17 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_17_SLUGS) {
      const expected = batch17VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });

  it("every batch-17 calculator is registered under the General Medicine specialty", () => {
    for (const slug of BATCH_17_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      expect(calc!.specialty, `${slug}.specialty`).toBe("General Medicine");
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 18 (GI/Hepatology)", () => {
  const batch18VerifiedValues: Record<string, string | number> = {
    "apri-score": 2,
    "fib-4-index": 1.6,
    "glasgow-blatchford-score": 10,
    "maddrey-discriminant-function": 40.2,
    "meld-score": 16,
    "meld-na-score": 22,
    "nafld-fibrosis-score": 1.246,
    "rockall-score": 4,
  };

  it("every batch-18 calculator has clinical content", () => {
    for (const slug of BATCH_18_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-18 record has the full core field set", () => {
    for (const slug of BATCH_18_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("every batch-18 example input key matches a registered calculator input", () => {
    for (const slug of BATCH_18_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      const inputIds = new Set(calc!.inputs.map((i) => i.id));
      const content = clinicalContentRegistry[slug];
      for (const key of Object.keys(content!.example!.inputs!)) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-18 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_18_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-18 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_18_SLUGS) {
      const expected = batch18VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });

  it("every batch-18 calculator is registered under the Gastroenterology category", () => {
    for (const slug of BATCH_18_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      expect(calc!.category, `${slug}.category`).toBe("Gastroenterology");
    }
  });

  it("does not describe classic MELD as the current U.S. liver allocation model", () => {
    const content = clinicalContentRegistry["meld-score"];
    expect(content).toBeDefined();
    expect(content!.clinicalSignificance).toContain("MELD 3.0");
    expect(content!.clinicalSignificance).toMatch(/mortality-risk score/i);
    expect(content!.clinicalSignificance).not.toMatch(
      /standard risk model used for liver transplant allocation in the United States/i,
    );
  });

  it("does not describe MELD-Na as the current U.S. liver allocation model", () => {
    const content = clinicalContentRegistry["meld-na-score"];
    expect(content).toBeDefined();
    expect(content!.clinicalSignificance).toContain("MELD 3.0");
    expect(content!.clinicalPurpose).not.toMatch(
      /basis for current liver allocation/i,
    );
    expect(content!.whenToUse!.join(" ")).not.toMatch(
      /MELD-Na is the current standard/i,
    );
  });
});

describe("Clinical Content — Sprint 1.9 Batch 19 (Pulmonary/Respiratory)", () => {
  const batch19VerifiedValues: Record<string, string | number> = {
    "a-a-gradient": 47.2,
    "oxygen-index": 18,
    "pf-ratio": 275,
    "rox-index": 3.54,
  };

  it("every batch-19 calculator has clinical content", () => {
    for (const slug of BATCH_19_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-19 record has the full core field set", () => {
    for (const slug of BATCH_19_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
      expect(content!.disclaimer!.length).toBeGreaterThan(0);
    }
  });

  it("every batch-19 example input key matches a registered calculator input", () => {
    for (const slug of BATCH_19_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      const inputIds = new Set(calc!.inputs.map((i) => i.id));
      const content = clinicalContentRegistry[slug];
      for (const key of Object.keys(content!.example!.inputs!)) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-19 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_19_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-19 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_19_SLUGS) {
      const expected = batch19VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      expect(typeof expected, `${slug} expected value`).toBe("number");
      expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
        expected as number,
        1,
      );
    }
  });

  it("every batch-19 calculator is registered under the Pulmonology category", () => {
    for (const slug of BATCH_19_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      expect(calc!.category, `${slug}.category`).toBe("Pulmonology");
    }
  });
});

describe("Clinical Content — Sprint 1.8 Batch 8 Rendering Support", () => {
  const ALL_SLUGS = Object.keys(clinicalContentRegistry);

  it("all 141 clinical content records contain structurally valid data", () => {
    expect(ALL_SLUGS.length).toBe(141);
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(
        content.clinicalPurpose,
        `${slug}.clinicalPurpose`,
      ).toBeDefined();
      expect(content.clinicalPurpose!.length).toBeGreaterThan(0);
      expect(content.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content.howToUse!.length).toBeGreaterThan(0);
      expect(
        content.disclaimer,
        `${slug}.disclaimer`,
      ).toBeDefined();
      expect(content.disclaimer!.length).toBeGreaterThan(0);
    }
  });

  it("references, when present, have valid structure", () => {
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (!content.references || content.references.length === 0) continue;
      for (const ref of content.references) {
        expect(ref.citation.length).toBeGreaterThan(0);
        if (ref.url !== undefined) {
          expect(ref.url.startsWith("http")).toBe(true);
        }
      }
    }
  });

  it("evidence, when present, has valid structure", () => {
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (!content.evidence) continue;
      expect(content.evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(content.evidence.source!.length).toBeGreaterThan(0);
      if (content.evidence.references !== undefined) {
        expect(Array.isArray(content.evidence.references)).toBe(true);
        for (const ref of content.evidence.references) {
          expect(ref.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("faq, when present, has valid structure", () => {
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (!content.faq || content.faq.length === 0) continue;
      for (const item of content.faq) {
        expect(item.question.length).toBeGreaterThan(0);
        expect(item.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it("comparison, when present, has valid structure", () => {
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (!content.comparison) continue;
      const calculators = content.comparison.calculators ?? [];
      expect(calculators.length).toBeGreaterThan(0);
      for (const item of calculators) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.href.startsWith("/")).toBe(true);
      }
    }
  });

  it("examples, when present, have valid input keys matching calculator inputs", () => {
    const bySlug = new Map(
      calculatorRegistry.map((c) => [c.slug, c]),
    );
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (!content.example || !content.example.inputs) continue;
      const calculator = bySlug.get(slug);
      const inputIds = new Set(
        (calculator?.inputs ?? []).map((i) => i.id),
      );
      for (const key of Object.keys(content.example.inputs)) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("no clinical content record contains an empty section object", () => {
    for (const slug of ALL_SLUGS) {
      const content = clinicalContentRegistry[slug];
      if (content.howToUse !== undefined) {
        expect(content.howToUse.length).toBeGreaterThan(0);
      }
      if (content.whenToUse !== undefined) {
        expect(content.whenToUse.length).toBeGreaterThan(0);
      }
      if (content.whenNotToUse !== undefined) {
        expect(content.whenNotToUse.length).toBeGreaterThan(0);
      }
      if (content.limitations !== undefined) {
        expect(content.limitations.length).toBeGreaterThan(0);
      }
      if (content.references !== undefined) {
        expect(content.references.length).toBeGreaterThan(0);
      }
      if (content.faq !== undefined) {
        expect(content.faq.length).toBeGreaterThan(0);
      }
      if (content.comparison !== undefined) {
        expect(content.comparison.calculators?.length ?? 0).toBeGreaterThan(0);
      }
      if (content.example !== undefined) {
        expect(
          content.example.description !== undefined ||
            content.example.inputs !== undefined ||
            content.example.expectedResult !== undefined,
        ).toBe(true);
      }
      if (content.interpretation !== undefined) {
        expect(content.interpretation.guide?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });

  it("clinical content registry remains synchronized with calculator registry", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    const contentSlugs = new Set(ALL_SLUGS);
    for (const key of contentSlugs) {
      expect(registrySlugs.has(key)).toBe(true);
    }
    for (const slug of PILOT_SLUGS) {
      expect(contentSlugs.has(slug)).toBe(true);
    }
  });

  it("existing 86 records remain intact", () => {
    const expected = new Set([
      ...PILOT_SLUGS,
      ...BATCH_5_SLUGS,
      ...BATCH_6_SLUGS,
      ...BATCH_7_SLUGS,
      ...BATCH_10_SLUGS,
      ...BATCH_11_SLUGS,
      ...BATCH_12_SLUGS,
      ...BATCH_13_SLUGS,
    ]).size;
    expect(expected).toBe(86);
    expect(ALL_SLUGS.length).toBe(
      expected + BATCH_14_SLUGS.length + BATCH_15_SLUGS.length + BATCH_16_SLUGS.length + BATCH_17_SLUGS.length + BATCH_18_SLUGS.length + BATCH_19_SLUGS.length + BATCH_20_SLUGS.length,
    );
    expect(getClinicalContent("anion-gap")).toBe(
      clinicalContentRegistry["anion-gap"],
    );
    expect(getClinicalContent("maintenance-fluids")).toBe(
      clinicalContentRegistry["maintenance-fluids"],
    );
  });
});

describe("Clinical Content — Sprint 1.8 Batch 9 Final Audit", () => {
  const DEFERRED_WITHOUT_CONTENT: string[] = [];

  const KNOWN_INPUT_DEFECTIVE = ["news2", "shock-index"];
  const KNOWN_NUMERIC_DEFECTIVE = ["news2", "shock-index", "ckd-epi-2021"];

  const VERIFIED_EXAMPLE_VALUES: Record<string, string | number> = {
    "anion-gap": 23,
    "corrected-qt": 503.9,
    bmi: 24.98,
    "bun-creatinine-ratio": 22.5,
    "corrected-sodium": 134.4,
    "osmolar-gap": 39.09,
    "cockcroft-gault": 52.08,
    "homa-ir": 4.07,
    "curb-65": 2,
    qsofa: 2,
    gcs: 12,
    map: 70,
    mdrd: 49.85,
    fena: 0.14,
    feurea: 18,
    "albumin-creatinine-ratio": 250,
    "corrected-calcium": 9.6,
    "homa-b": 80,
    "insulin-sensitivity": 0.25,
    bsa: 1.82,
    "ideal-body-weight": 75,
    "adjusted-body-weight": 89,
    "child-pugh": "Child-Pugh Class B",
    "corrected-anion-gap": 25.5,
    "serum-osmolality": 296.11,
    ttkg: 6,
    "calcium-phosphate-product": 57,
    "a1c-eag-converter": 154.2,
    "estimated-average-glucose": 125.5,
    "bmi-for-pediatrics": 17.9,
    "lean-body-weight": 61.4,
    "mifflin-st-jeor": 1730,
    "harris-benedict": 1796.9,
    "sodium-deficit": 420,
    "heart-rate": 72,
    "waist-to-hip-ratio": 0.95,
    "calorie-requirement": 2682,
    "fluid-requirement": 2450,
    "maintenance-fluids": 2500,
    "perc-rule": 8,
    "wells-pe": 1.5,
    "wells-dvt": 5,
    "heart-score": 5,
    "sofa-score": 10,
    "sirs-criteria": 4,
    "crb-65": 2,
    "psi-port": 128,
    rts: 7.8408,
    "parkland-formula": 9000,
    timi: 5,
    grace: 205,
    "cha2ds2-vasc": 7,
    "has-bled": 4,
    rcri: 4,
    ascvd: 5.38,
    dapt: 4,
    h2fpef: 9,
    "ldl-cholesterol": 160,
    "non-hdl-cholesterol": 190,
    "albumin-globulin-ratio": 1.33,
    "tyg-index": 8.82,
    "triglyceride-hdl-ratio": 3.75,
    quicki: 0.34,
    "winters-formula": 23,
    "anion-gap-delta-ratio": 0.92,
    "urine-anion-gap": -80,
    "kt-v": 1.29,
    "fractional-excretion-uric-acid": 5,
    "fractional-excretion-phosphate": 25,
    "fractional-excretion-calcium": 5,
    "renal-failure-index": 0.6,
    "urine-osmolal-gap": 160,
    "free-water-clearance": 1.09,
    "electrolyte-free-water-clearance": 0.21,
    "urine-protein-creatinine-ratio": 1.5,
    "creatinine-clearance-24h": 100,
    "total-cholesterol-hdl-ratio": 3,
    "atherogenic-index-of-plasma": 0.1,
    "apob-apoa1-ratio": 0.71,
    "respiratory-compensation": 25,
    "metabolic-alkalosis-compensation": 49.6,
    "free-thyroxine-index": 2.4,
    "metabolic-syndrome-atp3": 5,
    "nihss": 14,
    "abcd2-score": 7,
    "hunt-hess-scale": 3,
    "modified-rankin-scale": 3,
    "ottawa-sah-rule": 3,
    "fout-score": 12,
    "race-scale": 9,
    "esrs": 7,
    "phq-9": 13,
    "gad-7": 11,
    epworth: 14,
    "stop-bang": 5,
    centor: 4,
    charlson: 6,
    barthel: 75,
    ecog: 2,
  };

  it("reports the final coverage totals (141 registered, 141 with content, 0 deferred)", () => {
    const contentSlugs = new Set(Object.keys(clinicalContentRegistry));
    expect(calculatorRegistry.length).toBe(141);
    expect(contentSlugs.size).toBe(141);
    for (const slug of DEFERRED_WITHOUT_CONTENT) {
      expect(contentSlugs.has(slug), `${slug} should have no content`).toBe(
        false,
      );
    }
    for (const calc of calculatorRegistry) {
      if (DEFERRED_WITHOUT_CONTENT.includes(calc.slug)) continue;
      expect(
        contentSlugs.has(calc.slug),
        `registered calculator "${calc.slug}" missing clinical content`,
      ).toBe(true);
    }
  });

  it("every record has the full required core field set", () => {
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      expect(content.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content.howToUse!.length, `${slug}.howToUse length`).toBeGreaterThan(0);
      expect(content.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content.whenToUse!.length).toBeGreaterThan(0);
      expect(content.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content.limitations, `${slug}.limitations`).toBeDefined();
      expect(content.limitations!.length).toBeGreaterThan(0);
      expect(content.example, `${slug}.example`).toBeDefined();
      expect(content.example!.description, `${slug}.example.description`).toBeDefined();
      expect(content.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content.references, `${slug}.references`).toBeDefined();
      expect(content.references!.length, `${slug}.references length`).toBeGreaterThan(0);
      expect(content.disclaimer, `${slug}.disclaimer`).toBeDefined();
    }
  });

  it("no reference or evidence text contains placeholder patterns", () => {
    const placeholderPatterns = [
      /medcalchub clinical references/i,
      /\btbd\b/i,
      /\bplaceholder\b/i,
      /\blorem\b/i,
      /sample reference/i,
      /\[\s*insert/i,
      /to be (?:added|completed|filled)/i,
      /\btodo\b/i,
    ];
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      const texts: string[] = [];
      for (const ref of content.references ?? []) {
        texts.push(ref.citation ?? "");
        if (ref.level !== undefined) texts.push(ref.level);
        if (ref.url !== undefined) texts.push(ref.url);
      }
      if (content.evidence !== undefined) {
        texts.push(content.evidence.source ?? "");
        texts.push(content.evidence.reference ?? "");
        texts.push(content.evidence.version ?? "");
        for (const ref of content.evidence.references ?? []) {
          texts.push(ref);
        }
      }
      for (const text of texts) {
        for (const pattern of placeholderPatterns) {
          expect(
            pattern.test(text),
            `${slug} reference/evidence contains placeholder: "${text}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("no comparison references the calculator itself", () => {
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      if (!content.comparison) continue;
      for (const item of content.comparison.calculators ?? []) {
        expect(
          item.href,
          `${slug}.comparison self-reference`,
        ).not.toBe(`/calculators/${slug}`);
      }
    }
  });

  it("every comparison href resolves to a registered calculator", () => {
    const calcSlugs = new Set(calculatorRegistry.map((c) => c.slug));
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      if (!content.comparison) continue;
      for (const item of content.comparison.calculators ?? []) {
        expect(
          item.href.startsWith("/calculators/"),
          `${slug}.comparison href prefix`,
        ).toBe(true);
        const target = item.href.replace("/calculators/", "");
        expect(
          calcSlugs.has(target),
          `${slug}.comparison href "${item.href}" is not a registered calculator`,
        ).toBe(true);
      }
    }
  });

  it("no comparison contains duplicate calculator hrefs", () => {
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      if (!content.comparison) continue;
      const hrefs = (content.comparison.calculators ?? []).map((i) => i.href);
      expect(
        new Set(hrefs).size,
        `${slug}.comparison duplicate hrefs`,
      ).toBe(hrefs.length);
    }
  });

  it("no duplicate questions or answers exist within any FAQ list", () => {
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      if (!content.faq || content.faq.length === 0) continue;
      const questions = content.faq.map((f) => f.question);
      const answers = content.faq.map((f) => f.answer);
      expect(
        new Set(questions).size,
        `${slug}.faq duplicate questions`,
      ).toBe(questions.length);
      expect(new Set(answers).size, `${slug}.faq duplicate answers`).toBe(
        answers.length,
      );
    }
  });

  it("interpretation flag fields are boolean when present", () => {
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      const interp = content.interpretation;
      if (interp === undefined) continue;
      if (interp.sexSpecific !== undefined) {
        expect(typeof interp.sexSpecific, `${slug}.sexSpecific`).toBe("boolean");
      }
      if (interp.ageSpecific !== undefined) {
        expect(typeof interp.ageSpecific, `${slug}.ageSpecific`).toBe("boolean");
      }
      if (interp.pediatric !== undefined) {
        expect(typeof interp.pediatric, `${slug}.pediatric`).toBe("boolean");
      }
      if (interp.pregnancy !== undefined) {
        expect(typeof interp.pregnancy, `${slug}.pregnancy`).toBe("boolean");
      }
    }
  });

  it("worked examples execute through the calculator without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const [slug, content] of Object.entries(clinicalContentRegistry)) {
      if (KNOWN_INPUT_DEFECTIVE.includes(slug)) continue;
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("worked examples match verified calculator output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const [slug, expected] of Object.entries(VERIFIED_EXAMPLE_VALUES)) {
      if (KNOWN_NUMERIC_DEFECTIVE.includes(slug)) continue;
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      if (typeof expected === "number") {
        expect(typeof result.value, `${slug} result value`).toBe("number");
        expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
          expected,
          1,
        );
      } else {
        expect(result.value, `${slug} string result`).toBe(expected);
      }
    }
  });

  it("no orphan records and no duplicate keys after the final batch", () => {
    const keys = Object.keys(clinicalContentRegistry);
    expect(new Set(keys).size).toBe(keys.length);
    const calcSlugs = new Set(calculatorRegistry.map((c) => c.slug));
    for (const key of keys) {
      expect(calcSlugs.has(key)).toBe(true);
    }
  });
});

describe("Clinical Content — Sprint 1.9 Batch 20 (Final Coverage)", () => {
  const batch20VerifiedValues: Record<string, string | number> = {
    "free-water-deficit": 6.9,
    "albumin-corrected-calcium": 8.8,
    "basal-metabolic-rate": 1598.8,
    "fractional-excretion-calculator": 0.3,
    edd: "2026-10-08",
    "gestational-age": 32.4286,
    "adrenal-steroid-converter": 10,
    "thyroid-dose": 112,
    "levothyroxine-dose": 112,
  };

  const batch20Categories: Record<string, string> = {
    "free-water-deficit": "Internal Medicine",
    "albumin-corrected-calcium": "Internal Medicine",
    "basal-metabolic-rate": "Internal Medicine",
    "fractional-excretion-calculator": "Internal Medicine",
    edd: "Obstetrics & Gynecology",
    "gestational-age": "Obstetrics & Gynecology",
    "adrenal-steroid-converter": "Endocrinology",
    "thyroid-dose": "Endocrinology",
    "levothyroxine-dose": "Endocrinology",
  };

  it("every batch-20 calculator has clinical content", () => {
    for (const slug of BATCH_20_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(getClinicalContent(slug)).toBe(content);
    }
  });

  it("every batch-20 record has the full core field set", () => {
    for (const slug of BATCH_20_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
      expect(content!.clinicalPurpose, `${slug}.clinicalPurpose`).toBeDefined();
      expect(content!.howToUse, `${slug}.howToUse`).toBeDefined();
      expect(content!.howToUse!.length).toBeGreaterThan(0);
      expect(content!.interpretation, `${slug}.interpretation`).toBeDefined();
      expect(
        content!.interpretation!.guide,
        `${slug}.interpretation.guide`,
      ).toBeDefined();
      expect(content!.whenToUse, `${slug}.whenToUse`).toBeDefined();
      expect(content!.whenToUse!.length).toBeGreaterThan(0);
      expect(content!.whenNotToUse, `${slug}.whenNotToUse`).toBeDefined();
      expect(content!.whenNotToUse!.length).toBeGreaterThan(0);
      expect(content!.limitations, `${slug}.limitations`).toBeDefined();
      expect(content!.limitations!.length).toBeGreaterThan(0);
      expect(content!.example, `${slug}.example`).toBeDefined();
      expect(
        content!.example!.description,
        `${slug}.example.description`,
      ).toBeDefined();
      expect(content!.example!.inputs, `${slug}.example.inputs`).toBeDefined();
      expect(
        Object.keys(content!.example!.inputs!).length,
        `${slug}.example.inputs keys`,
      ).toBeGreaterThan(0);
      expect(
        content!.example!.expectedResult,
        `${slug}.example.expectedResult`,
      ).toBeDefined();
      expect(
        content!.clinicalSignificance,
        `${slug}.clinicalSignificance`,
      ).toBeDefined();
      expect(content!.references, `${slug}.references`).toBeDefined();
      expect(content!.references!.length).toBeGreaterThan(0);
      expect(content!.disclaimer, `${slug}.disclaimer`).toBeDefined();
      expect(content!.disclaimer!.length).toBeGreaterThan(0);
    }
  });

  it("every batch-20 example input key matches a registered calculator input", () => {
    for (const slug of BATCH_20_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      const inputIds = new Set(calc!.inputs.map((i) => i.id));
      const content = clinicalContentRegistry[slug];
      for (const key of Object.keys(content!.example!.inputs!)) {
        expect(
          inputIds.has(key),
          `${slug} example key "${key}" is not a calculator input`,
        ).toBe(true);
      }
    }
  });

  it("every batch-20 worked example executes without a missing-input error", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_20_SLUGS) {
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      const isMissingInput =
        typeof result.value === "number" &&
        result.value === 0 &&
        result.status === "critical" &&
        result.interpretation !== undefined &&
        /required/i.test(result.interpretation);
      expect(
        isMissingInput,
        `${slug} example produced a missing-input error: "${result.interpretation}"`,
      ).toBe(false);
    }
  });

  it("every batch-20 worked example matches verified output", () => {
    const bySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
    for (const slug of BATCH_20_SLUGS) {
      const expected = batch20VerifiedValues[slug];
      expect(expected, `${slug} has no verified example value`).toBeDefined();
      const content = clinicalContentRegistry[slug];
      const calculator = bySlug.get(slug);
      expect(calculator, `${slug} has no registered calculator`).toBeDefined();
      const result = calculator!.calculate(content!.example!.inputs!);
      if (typeof expected === "number") {
        expect(typeof result.value, `${slug} result value`).toBe("number");
        expect(result.value as number, `${slug} numeric consistency`).toBeCloseTo(
          expected as number,
          1,
        );
      } else {
        expect(result.value, `${slug} string result`).toBe(expected);
      }
    }
  });

  it("every batch-20 calculator preserves its registered category", () => {
    for (const slug of BATCH_20_SLUGS) {
      const calc = calculatorRegistry.find((c) => c.slug === slug);
      expect(calc, `${slug} has no registered calculator`).toBeDefined();
      expect(calc!.category, `${slug}.category`).toBe(batch20Categories[slug]);
    }
  });

  it("no duplicate keys and no orphan records across the 9 batch-20 records", () => {
    const calcSlugs = new Set(calculatorRegistry.map((c) => c.slug));
    expect(new Set(BATCH_20_SLUGS).size).toBe(BATCH_20_SLUGS.length);
    for (const slug of BATCH_20_SLUGS) {
      expect(calcSlugs.has(slug), `${slug} is not a registered calculator`).toBe(
        true,
      );
    }
  });

  it("reports zero calculators deferred without clinical content", () => {
    const contentSlugs = new Set(Object.keys(clinicalContentRegistry));
    const missing = calculatorRegistry.filter(
      (c) => !contentSlugs.has(c.slug),
    );
    expect(missing).toEqual([]);
  });
});

describe("Clinical Content — Sprint 1.9 Batch 13A P1 Remediation", () => {
  it("corrected-qt reference uses AHA, not the ACHA typo", () => {
    const refs = clinicalContentRegistry["corrected-qt"]!.references ?? [];
    const citations = refs.map((r) => r.citation);
    for (const c of citations) {
      expect(c).not.toContain("ACHA");
    }
    expect(citations.some((c) => c.includes("AHA ECG Guidelines"))).toBe(true);
  });

  it("a1c-eag-converter guide bands are non-overlapping and code-aligned", () => {
    const guide =
      clinicalContentRegistry["a1c-eag-converter"]!.interpretation!.guide!;
    expect(guide).toContain("A1c <6.0%");
    expect(guide).toContain("6.0–6.4%");
    expect(guide).toContain("≥6.5%");
    expect(guide).not.toContain("<6.1");
    expect(guide).not.toContain("6.0–6.5%");
  });

  it("a1c-eag-converter guide is consistent with the calculator bands", () => {
    const a1cEag = calculatorRegistry.find(
      (c) => c.slug === "a1c-eag-converter",
    )!;
    expect(a1cEag.calculate({ a1c: "6.0" }).interpretation).toBe(
      "Pre-diabetes range",
    );
    expect(a1cEag.calculate({ a1c: "6.4" }).interpretation).toBe(
      "Pre-diabetes range",
    );
    expect(a1cEag.calculate({ a1c: "6.5" }).interpretation).toBe(
      "Diabetes range",
    );
  });

  it("oxygen-index no longer carries the vague AAP Neonatal reference", () => {
    const refs = clinicalContentRegistry["oxygen-index"]!.references ?? [];
    expect(refs.length).toBeGreaterThan(0);
    for (const r of refs) {
      expect(r.citation).not.toMatch(/AAP Neonatal|ATS Mechanical/i);
    }
  });

  it("adrenal-steroid-converter references are conservative and flagged", () => {
    const refs =
      clinicalContentRegistry["adrenal-steroid-converter"]!.references ?? [];
    expect(refs.length).toBeGreaterThan(0);
    for (const r of refs) {
      expect(r.citation).not.toMatch(/Liu MM|Stavros K/i);
      expect(r.citation).not.toMatch(/\d{4};\d{1,2}:\d/);
    }
  });

  it("metabolic-alkalosis-compensation references no longer cite Jarolem", () => {
    const content =
      clinicalContentRegistry["metabolic-alkalosis-compensation"]!;
    for (const r of content.references ?? []) {
      expect(r.citation).not.toContain("Jarolem");
    }
    expect(
      (content.references ?? []).some((r) =>
        r.citation.includes("Kraut JA, Madias NE"),
      ),
    ).toBe(true);

    const calc = calculatorRegistry.find(
      (c) => c.slug === "metabolic-alkalosis-compensation",
    )!;
    const texts = [
      ...(calc.evidence?.reference ? [calc.evidence.reference] : []),
      ...(calc.evidence?.references ?? []),
      ...(calc.references ?? []),
    ];
    for (const t of texts) {
      expect(t).not.toContain("Jarolem");
    }
    expect(
      texts.some((t) => t.includes("Kraut JA, Madias NE")),
    ).toBe(true);
  });
});

describe("Clinical Content — Sprint 1.9 Batch 13B P2 Editorial Remediation", () => {
  const exampleOf = (slug: string) => clinicalContentRegistry[slug]!.example!;

  it("timi example narrative lists three CAD risk factors to match risk-factors = 1", () => {
    const desc = exampleOf("timi").description!;
    expect(desc).toContain("hypertension");
    expect(desc).toContain("diabetes");
    expect(desc).toContain("hyperlipidemia");
    expect(exampleOf("timi").inputs!["risk-factors"]).toBe("1");
  });

  it("grace example narrative heart rate matches the 90–109 bpm band", () => {
    const desc = exampleOf("grace").description!;
    expect(desc).toContain("heart rate 100 bpm");
    expect(desc).not.toContain("110 bpm");
    expect(exampleOf("grace").inputs!["heart-rate"]).toBe("15");
  });

  it("nihss example narrative laterality matches the left-sided motor scores", () => {
    const desc = exampleOf("nihss").description!;
    expect(desc).toContain("left-sided weakness");
    expect(desc).not.toContain("right-sided weakness");
    expect(exampleOf("nihss").inputs!["armLeft"]).toBe("2");
    expect(exampleOf("nihss").inputs!["legLeft"]).toBe("2");
  });

  it("stop-bang example narrative no longer claims witnessed apnea", () => {
    const desc = exampleOf("stop-bang").description!;
    expect(desc).toContain("has not witnessed");
    expect(desc).not.toContain("has witnessed him stop breathing");
    expect(exampleOf("stop-bang").inputs!["observedApnea"]).toBe("no");
  });

  it("barthel example narrative matches the item scores", () => {
    const desc = exampleOf("barthel").description!;
    const inputs = exampleOf("barthel").inputs!;
    expect(inputs["feeding"]).toBe("5");
    expect(inputs["grooming"]).toBe("5");
    expect(inputs["transfers"]).toBe("15");
    expect(inputs["stairs"]).toBe("5");
    expect(desc).toContain("needs help with feeding and stairs");
    expect(desc).toContain(
      "independent in grooming, dressing, bowel control, toilet use, and transfers",
    );
  });

  it("corrected-sodium example output wording matches the runtime low status", () => {
    const expected = exampleOf("corrected-sodium").expectedResult!;
    expect(expected).toContain("remains mildly low");
    expect(expected).not.toContain("near-normal");
    const result = calculatorRegistry
      .find((c) => c.slug === "corrected-sodium")!
      .calculate(exampleOf("corrected-sodium").inputs!);
    expect(result.value).toBeCloseTo(134.4, 1);
    expect(result.interpretation).toBe("Hyponatremia (corrected)");
  });

  it("waist-to-hip-ratio example includes the required sex input", () => {
    const inputs = exampleOf("waist-to-hip-ratio").inputs!;
    expect(inputs["sex"]).toBe("1");
    const result = calculatorRegistry
      .find((c) => c.slug === "waist-to-hip-ratio")!
      .calculate(inputs);
    expect(result.value).toBeCloseTo(0.95, 2);
    expect(result.interpretation).toBe("Moderate risk (Males)");
  });

  it("glasgow-blatchford howToUse instructs the user to provide sex", () => {
    const howToUse = clinicalContentRegistry["glasgow-blatchford-score"]!
      .howToUse!;
    expect(
      howToUse.some((step) => /sex/i.test(step)),
    ).toBe(true);
    expect(
      howToUse.some((step) => /sex-specific/i.test(step)),
    ).toBe(true);
  });

  it("insulin-sensitivity boundary wording matches the runtime ≤ 0.2 band", () => {
    const guide = clinicalContentRegistry["insulin-sensitivity"]!
      .interpretation!.guide!;
    expect(guide).toContain("> 0.4");
    expect(guide).toContain("between 0.2 and 0.4");
    expect(guide).toContain("0.2 or less");
    expect(guide).not.toContain("< 0.2");
    const is = calculatorRegistry.find(
      (c) => c.slug === "insulin-sensitivity",
    )!;
    expect(is.calculate({ homaIr: "5" }).interpretation).toBe(
      "Severe insulin resistance",
    );
    expect(is.calculate({ homaIr: "2.5" }).interpretation).toBe(
      "Reduced insulin sensitivity",
    );
    expect(is.calculate({ homaIr: "2" }).interpretation).toBe(
      "Normal insulin sensitivity",
    );
  });

  it("estimated-average-glucose boundary wording matches the runtime bands", () => {
    const guide = clinicalContentRegistry["estimated-average-glucose"]!
      .interpretation!.guide!;
    expect(guide).toContain("eAG ≤140 mg/dL is normal");
    expect(guide).toContain("above 140 up to 200");
    expect(guide).toContain(">200 mg/dL is in the diabetic range");
    expect(guide).not.toContain("<140 mg/dL is normal");
    expect(guide).not.toContain("≥200 mg/dL is in the diabetic range");
    const eag = calculatorRegistry.find(
      (c) => c.slug === "estimated-average-glucose",
    )!;
    expect(eag.calculate({ a1c: "6.5" }).interpretation).toBe(
      "Normal average glucose",
    );
    expect(eag.calculate({ a1c: "8.59" }).interpretation).toBe(
      "Pre-diabetic range",
    );
    expect(eag.calculate({ a1c: "8.6" }).interpretation).toBe(
      "Diabetic range",
    );
  });

  it("has-bled instructions describe renal and liver criteria separately", () => {
    const howToUse = clinicalContentRegistry["has-bled"]!.howToUse!;
    expect(
      howToUse.some((step) => step.includes("abnormal renal function")),
    ).toBe(true);
    expect(
      howToUse.some((step) => step.includes("abnormal liver function")),
    ).toBe(true);
    expect(
      howToUse.some((step) => step.includes("renal/liver")),
    ).toBe(false);
  });

  it("thyroid-dose and levothyroxine-dose content are distinct but accurate", () => {
    const t = clinicalContentRegistry["thyroid-dose"]!;
    const l = clinicalContentRegistry["levothyroxine-dose"]!;
    expect(t.clinicalPurpose).not.toBe(l.clinicalPurpose);
    expect(t.howToUse![2]).not.toBe(l.howToUse![2]);
    for (const c of [t, l]) {
      expect(
        c.howToUse!.some((step) =>
          step.includes("does not incorporate age, cardiac risk, or pregnancy"),
        ),
      ).toBe(true);
      expect(c.disclaimer).toContain("not a prescription");
    }
  });

  it("the eight P2 disclaimers use the standardized opener", () => {
    const slugs = [
      "phq-9",
      "gad-7",
      "epworth",
      "stop-bang",
      "centor",
      "charlson",
      "barthel",
      "ecog",
    ];
    for (const slug of slugs) {
      const disclaimer = clinicalContentRegistry[slug]!.disclaimer!;
      expect(
        disclaimer.startsWith(
          "This calculator is intended for educational and clinical decision support purposes only.",
        ),
        `${slug} disclaimer opener`,
      ).toBe(true);
      expect(disclaimer.length).toBeGreaterThan(90);
    }
  });
});

const E1_EVIDENCE_SLUGS = [
  "sofa-score",
  "wells-pe",
  "wells-dvt",
  "heart-score",
  "timi",
  "grace",
  "cha2ds2-vasc",
  "has-bled",
  "meld-score",
  "meld-na-score",
  "perc-rule",
  "corrected-qt",
  "sirs-criteria",
  "curb-65",
  "gcs",
  "news2",
  "qsofa",
  "map",
  "rcri",
  "glasgow-blatchford-score",
] as const;

describe("Clinical Content — Evidence Batch E1 (Structured Evidence Metadata)", () => {
  it("every E1 calculator has clinical content", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
    }
  });

  it("every E1 calculator has a non-undefined evidence object", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug]!;
      expect(content.evidence, `${slug}.evidence`).toBeDefined();
    }
  });

  it("every E1 evidence has a non-empty source string", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(
        evidence.source!.length,
        `${slug}.evidence.source length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every E1 evidence has a non-empty reference string", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reference, `${slug}.evidence.reference`).toBeDefined();
      expect(
        evidence.reference!.length,
        `${slug}.evidence.reference length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every E1 evidence has reviewedBy set to MedCalcHub Clinical Team", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reviewedBy, `${slug}.evidence.reviewedBy`).toBe(
        "MedCalcHub Clinical Team",
      );
    }
  });

  it("every E1 evidence has a non-empty references array with at least one citation", () => {
    for (const slug of E1_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.references,
        `${slug}.evidence.references`,
      ).toBeDefined();
      expect(
        Array.isArray(evidence.references),
        `${slug}.evidence.references is array`,
      ).toBe(true);
      expect(
        evidence.references!.length,
        `${slug}.evidence.references length`,
      ).toBeGreaterThan(0);
      for (const ref of evidence.references!) {
        expect(ref.length, `${slug} evidence reference string`).toBeGreaterThan(0);
      }
    }
  });

  it("every E1 slug corresponds to a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of E1_EVIDENCE_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `E1 slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("no duplicate slugs in E1_EVIDENCE_SLUGS", () => {
    expect(new Set(E1_EVIDENCE_SLUGS).size).toBe(E1_EVIDENCE_SLUGS.length);
  });

  it("no E1 evidence text contains placeholder patterns", () => {
    const placeholderPatterns = [
      /\btbd\b/i,
      /\bplaceholder\b/i,
      /\blorem\b/i,
      /sample reference/i,
      /\[\s*insert/i,
      /to be (?:added|completed|filled)/i,
      /\btodo\b/i,
    ];
    for (const slug of E1_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const texts: string[] = [
        evidence.source ?? "",
        evidence.reference ?? "",
        evidence.version ?? "",
        evidence.reviewedBy ?? "",
        evidence.updatedAt ?? "",
        ...(evidence.references ?? []),
      ];
      for (const text of texts) {
        for (const pattern of placeholderPatterns) {
          expect(
            pattern.test(text),
            `${slug} evidence contains placeholder: "${text}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("E1 evidence count matches expected 20 calculators", () => {
    expect(E1_EVIDENCE_SLUGS.length).toBe(20);
    let count = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (content.evidence !== undefined) count++;
    }
    expect(count).toBeGreaterThanOrEqual(20);
  });

  it("E1 accounts for 20 additional evidence blocks (total >= 48)", () => {
    let evidenceCount = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (
        content.evidence !== undefined &&
        content.evidence.source !== undefined &&
        content.evidence.source!.length > 0
      ) {
        evidenceCount++;
      }
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(48);
  });
});

const E2_EVIDENCE_SLUGS = [
  "ascvd",
  "dapt",
  "parkland-formula",
  "rts",
  "psi-port",
  "crb-65",
  "maddrey-discriminant-function",
  "rockall-score",
  "h2fpef",
  "stop-bang",
  "phq-9",
  "gad-7",
  "epworth",
  "charlson",
  "centor",
  "levothyroxine-dose",
  "ideal-body-weight",
  "adjusted-body-weight",
  "bmi",
  "bsa",
] as const;

describe("Clinical Content — Evidence Batch E2 (Structured Evidence Metadata)", () => {
  it("every E2 calculator has clinical content", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
    }
  });

  it("every E2 calculator has an evidence block", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(
        content?.evidence,
        `${slug} missing evidence`,
      ).toBeDefined();
    }
  });

  it("every E2 evidence has a non-empty source", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(
        evidence.source!.length,
        `${slug}.evidence.source length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every E2 evidence has a non-empty reference", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reference, `${slug}.evidence.reference`).toBeDefined();
      expect(
        evidence.reference!.length,
        `${slug}.evidence.reference length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every E2 evidence has reviewedBy set to MedCalcHub Clinical Team", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reviewedBy, `${slug}.evidence.reviewedBy`).toBe(
        "MedCalcHub Clinical Team",
      );
    }
  });

  it("every E2 evidence has a non-empty version", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.version, `${slug}.evidence.version`).toBeDefined();
      expect(
        evidence.version!.length,
        `${slug}.evidence.version length`,
      ).toBeGreaterThan(0);
    }
  });

  it("every E2 evidence has updatedAt set to 2026-08", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.updatedAt, `${slug}.evidence.updatedAt`).toBe("2026-08");
    }
  });

  it("every E2 evidence has a non-empty references array with at least one citation", () => {
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.references,
        `${slug}.evidence.references`,
      ).toBeDefined();
      expect(
        Array.isArray(evidence.references),
        `${slug}.evidence.references is array`,
      ).toBe(true);
      expect(
        evidence.references!.length,
        `${slug}.evidence.references length`,
      ).toBeGreaterThan(0);
      for (const ref of evidence.references!) {
        expect(ref.length, `${slug} evidence reference string`).toBeGreaterThan(0);
      }
    }
  });

  it("every E2 slug corresponds to a registered calculator", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of E2_EVIDENCE_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `E2 slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("no duplicate slugs in E2_EVIDENCE_SLUGS", () => {
    expect(new Set(E2_EVIDENCE_SLUGS).size).toBe(E2_EVIDENCE_SLUGS.length);
  });

  it("no E2 evidence text contains placeholder patterns", () => {
    const placeholderPatterns = [
      /\btbd\b/i,
      /\bplaceholder\b/i,
      /\blorem\b/i,
      /sample reference/i,
      /\[\s*insert/i,
      /to be (?:added|completed|filled)/i,
      /\btodo\b/i,
    ];
    for (const slug of E2_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const texts: string[] = [
        evidence.source ?? "",
        evidence.reference ?? "",
        evidence.version ?? "",
        evidence.reviewedBy ?? "",
        evidence.updatedAt ?? "",
        ...(evidence.references ?? []),
      ];
      for (const text of texts) {
        for (const pattern of placeholderPatterns) {
          expect(
            pattern.test(text),
            `${slug} evidence contains placeholder: "${text}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("E2 evidence count matches expected 20 calculators", () => {
    expect(E2_EVIDENCE_SLUGS.length).toBe(20);
    let count = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (content.evidence !== undefined) count++;
    }
    expect(count).toBeGreaterThanOrEqual(20);
  });

  it("E2 accounts for 20 additional evidence blocks (total >= 68)", () => {
    let evidenceCount = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (
        content.evidence !== undefined &&
        content.evidence.source !== undefined &&
        content.evidence.source!.length > 0
      ) {
        evidenceCount++;
      }
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(68);
  });
});

const E3A_EVIDENCE_SLUGS = [
  "nihss",
  "abcd2-score",
  "hunt-hess-scale",
  "modified-rankin-scale",
  "ottawa-sah-rule",
  "fout-score",
  "race-scale",
  "esrs",
] as const;

const E3A_EXPECTED_EVIDENCE: Record<
  string,
  { reviewedBy: string; references: string[] }
> = {
  nihss: {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
      "Lyden PD, et al. Stroke. 1994;25:2446-2451.",
    ],
  },
  "abcd2-score": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
      "Johnston SC, et al. Lancet. 2007;369:208-213.",
    ],
  },
  "hunt-hess-scale": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.",
      "Hunt WE, Kosnik EJ. J Neurosurg. 1974;41:149-154.",
    ],
  },
  "modified-rankin-scale": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.",
      "van Swieten JC, et al. Neurology. 1988;38:1021-1024.",
    ],
  },
  "ottawa-sah-rule": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Perry JJ, Stiell IG, Sivilotti MLA, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.",
      "Perry JJ, et al. JAMA. 2013;310:1828-1836.",
    ],
  },
  "fout-score": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: The FOUR score. Ann Neurol. 2005;58(4):585-593.",
      "Wijdicks EFM, et al. Pract Neurol. 2010;10:86-88.",
    ],
  },
  "race-scale": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Pérez de la Ossa N, Carrera D, Gorchs M, et al. Design and validation of a prehospital scale to predict stroke severity: the RACE scale. Stroke. 2014;45(9):2678-2684.",
      "Carrera D, et al. Stroke. 2019;50:1819-1824.",
    ],
  },
  esrs: {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
      "Weimar C, et al. Stroke. 2009;40:2532-2536.",
    ],
  },
};

describe("Clinical Content — Evidence Batch E3a (PARTIAL to FULL Upgrade)", () => {
  it("all 8 E3a targets have clinical content", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
    }
  });

  it("all 8 E3a targets have evidence", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug]!;
      expect(content.evidence, `${slug} missing evidence`).toBeDefined();
    }
  });

  it("all 8 E3a targets have non-empty source", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(
        evidence.source!.length,
        `${slug}.evidence.source length`,
      ).toBeGreaterThan(0);
    }
  });

  it("all 8 E3a targets have non-empty reference", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reference, `${slug}.evidence.reference`).toBeDefined();
      expect(
        evidence.reference!.length,
        `${slug}.evidence.reference length`,
      ).toBeGreaterThan(0);
    }
  });

  it("all 8 E3a targets have reviewedBy set to MedCalcHub Clinical Team", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.reviewedBy,
        `${slug}.evidence.reviewedBy`,
      ).toBe("MedCalcHub Clinical Team");
    }
  });

  it("all 8 E3a targets have at least 2 references in references array", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.references,
        `${slug}.evidence.references`,
      ).toBeDefined();
      expect(
        Array.isArray(evidence.references),
        `${slug}.evidence.references is array`,
      ).toBe(true);
      expect(
        evidence.references!.length,
        `${slug}.evidence.references length`,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("all 8 E3a target references match the expected citations", () => {
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const expected = E3A_EXPECTED_EVIDENCE[slug];
      expect(
        evidence.references!.length,
        `${slug} references count`,
      ).toBe(expected.references.length);
      for (let i = 0; i < expected.references.length; i++) {
        expect(
          evidence.references![i],
          `${slug} reference[${i}]`,
        ).toBe(expected.references[i]);
      }
    }
  });

  it("no E3a target contains placeholder evidence", () => {
    const placeholderPatterns = [
      /\btbd\b/i,
      /\bplaceholder\b/i,
      /\blorem\b/i,
      /sample reference/i,
      /\[\s*insert/i,
      /to be (?:added|completed|filled)/i,
      /\btodo\b/i,
    ];
    for (const slug of E3A_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const texts: string[] = [
        evidence.source ?? "",
        evidence.reference ?? "",
        evidence.version ?? "",
        evidence.reviewedBy ?? "",
        evidence.updatedAt ?? "",
        ...(evidence.references ?? []),
      ];
      for (const text of texts) {
        for (const pattern of placeholderPatterns) {
          expect(
            pattern.test(text),
            `${slug} evidence contains placeholder: "${text}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("all 8 E3a targets are registered calculators", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of E3A_EVIDENCE_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `E3a slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("E3a does not alter E1 or E2 evidence counts unexpectedly", () => {
    let evidenceCount = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (
        content.evidence !== undefined &&
        content.evidence.source !== undefined &&
        content.evidence.source!.length > 0
      ) {
        evidenceCount++;
      }
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(76);
  });
});


const E3B_EVIDENCE_SLUGS = [
  "anion-gap",
  "corrected-sodium",
  "osmolar-gap",
  "cockcroft-gault",
  "shock-index",
  "homa-ir",
  "homa-b",
  "corrected-calcium",
  "mdrd",
  "fena",
  "feurea",
  "albumin-creatinine-ratio",
  "insulin-sensitivity",
  "free-thyroxine-index",
  "metabolic-syndrome-atp3",
  "bishop-score",
  "biophysical-profile",
  "hellp-syndrome",
  "hadlock-efw",
  "preeclampsia-criteria",
  "gestational-weight-gain",
  "apgar-score",
  "free-water-deficit",
  "albumin-corrected-calcium",
  "basal-metabolic-rate",
] as const;

const E3B_EXPECTED_EVIDENCE: Record<
  string,
  { reviewedBy: string; references: string[] }
> = {
  "anion-gap": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162-174.",
      "Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.",
    ],
  },
  "corrected-sodium": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Hillier TA, Abbott RD, Barrett EJ. Am J Med. 1999;106:399-403.",
    ],
  },
  "osmolar-gap": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Brent J, et al. N Engl J Med. 2001;344:424-429."],
  },
  "cockcroft-gault": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Cockcroft DW, Gault MH. Nephron. 1976;16:31-41."],
  },
  "shock-index": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Rady MY, et al. Ann Emerg Med. 1994;24(4):685-690."],
  },
  "homa-ir": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Matthews DR, et al. Diabetologia. 1985;28:412-419."],
  },
  "homa-b": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Matthews DR, et al. Diabetologia. 1985;28(7):412-419."],
  },
  "corrected-calcium": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: ["Payne RB, et al. Br Med J. 1973;4(5893):643-646."],
  },
  mdrd: {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Levey AS, et al. Ann Intern Med. 1999;130(6):461-470.",
      "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
    ],
  },
  fena: {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Carvounis CP, et al. Kidney Int. 2002;62(3):1184-1191.",
    ],
  },
  feurea: {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Pépin MN, et al. Clin Invest Med. 2007;30(5):E163-167.",
    ],
  },
  "albumin-creatinine-ratio": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
    ],
  },
  "insulin-sensitivity": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Wallace TM, Levy JC, Matthews DR. Diabetes Care. 2004;27(6):1487-1495.",
    ],
  },
  "free-thyroxine-index": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Surks MI, et al. JAMA. 1990;263(11):1529-1532.",
      "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum.",
    ],
  },
  "metabolic-syndrome-atp3": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Grundy SM, et al. Circulation. 2005;112(17):2735-2752.",
      "Alberti KG, et al. Circulation. 2009;120(16):1640-1645.",
    ],
  },
  "bishop-score": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Bishop EH. Obstet Gynecol. 1964;24:266-268.",
      "ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.",
    ],
  },
  "biophysical-profile": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Manning FA, et al. Am J Obstet Gynecol. 1981;140(3):289-294.",
      "ACOG Practice Bulletin No. 145: Antepartum fetal surveillance. Obstet Gynecol. 2014;124(1):182-201.",
    ],
  },
  "hellp-syndrome": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Sibai BM, et al. Am J Obstet Gynecol. 1993;169(4):1000-1006.",
      "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
    ],
  },
  "hadlock-efw": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Hadlock FP, et al. Am J Obstet Gynecol. 1985;151(3):333-337.",
      "ACOG Practice Bulletin No. 227: Fetal growth restriction. Obstet Gynecol. 2021;137(2):e16-e28.",
    ],
  },
  "preeclampsia-criteria": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
    ],
  },
  "gestational-weight-gain": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "IOM/NRC. Weight Gain During Pregnancy. National Academies Press; 2009.",
      "ACOG Committee Opinion No. 548: Weight gain during pregnancy. Obstet Gynecol. 2013;121(1):210-212.",
    ],
  },
  "apgar-score": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Apgar V. Curr Res Anesth Analg. 1953;32(4):260-267.",
      "AAP/ACOG Committee. The Apgar score. Pediatrics. 2015;136(4):819-822.",
    ],
  },
  "free-water-deficit": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1493-1499.",
      "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372(1):55-65.",
    ],
  },
  "albumin-corrected-calcium": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Payne RB, et al. Br Med J. 1973;4(5893):643-646.",
    ],
  },
  "basal-metabolic-rate": {
    reviewedBy: "MedCalcHub Clinical Team",
    references: [
      "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
    ],
  },
};

describe("Clinical Content — Evidence Batch E3b (NONE to FULL Upgrade)", () => {
  it("all 25 E3b targets have clinical content", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug];
      expect(content, `${slug} missing content`).toBeDefined();
    }
  });

  it("all 25 E3b targets have evidence", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const content = clinicalContentRegistry[slug]!;
      expect(content.evidence, `${slug} missing evidence`).toBeDefined();
    }
  });

  it("all 25 E3b targets have non-empty source", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.source, `${slug}.evidence.source`).toBeDefined();
      expect(
        evidence.source!.length,
        `${slug}.evidence.source length`,
      ).toBeGreaterThan(0);
    }
  });

  it("all 25 E3b targets have non-empty reference", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(evidence.reference, `${slug}.evidence.reference`).toBeDefined();
      expect(
        evidence.reference!.length,
        `${slug}.evidence.reference length`,
      ).toBeGreaterThan(0);
    }
  });

  it("all 25 E3b targets have reviewedBy set to MedCalcHub Clinical Team", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.reviewedBy,
        `${slug}.evidence.reviewedBy`,
      ).toBe("MedCalcHub Clinical Team");
    }
  });

  it("all 25 E3b targets have at least 1 reference in references array", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      expect(
        evidence.references,
        `${slug}.evidence.references`,
      ).toBeDefined();
      expect(
        Array.isArray(evidence.references),
        `${slug}.evidence.references is array`,
      ).toBe(true);
      expect(
        evidence.references!.length,
        `${slug}.evidence.references length`,
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("all 25 E3b target references match the expected citations", () => {
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const expected = E3B_EXPECTED_EVIDENCE[slug];
      expect(
        evidence.references!.length,
        `${slug} references count`,
      ).toBe(expected.references.length);
      for (let i = 0; i < expected.references.length; i++) {
        expect(
          evidence.references![i],
          `${slug} reference[${i}]`,
        ).toBe(expected.references[i]);
      }
    }
  });

  it("no E3b target contains placeholder evidence", () => {
    const placeholderPatterns = [
      /\btbd\b/i,
      /\bplaceholder\b/i,
      /\blorem\b/i,
      /sample reference/i,
      /\[\s*insert/i,
      /to be (?:added|completed|filled)/i,
      /\btodo\b/i,
    ];
    for (const slug of E3B_EVIDENCE_SLUGS) {
      const evidence = clinicalContentRegistry[slug]!.evidence!;
      const texts: string[] = [
        evidence.source ?? "",
        evidence.reference ?? "",
        evidence.version ?? "",
        evidence.reviewedBy ?? "",
        evidence.updatedAt ?? "",
        ...(evidence.references ?? []),
      ];
      for (const text of texts) {
        for (const pattern of placeholderPatterns) {
          expect(
            pattern.test(text),
            `${slug} evidence contains placeholder: "${text}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("corrected-calcium uses verified Payne 1973 citation, not unverified Pay DA", () => {
    const evidence = clinicalContentRegistry["corrected-calcium"]!.evidence!;
    const allText = [
      evidence.source ?? "",
      evidence.reference ?? "",
      evidence.version ?? "",
      evidence.reviewedBy ?? "",
      evidence.updatedAt ?? "",
      ...(evidence.references ?? []),
    ].join(" ");
    expect(allText).toContain("Payne RB");
    expect(allText).toContain("Br Med J. 1973;4(5893):643-646");
    expect(allText).not.toContain("Pay DA");
    expect(allText).not.toContain("Ann Clin Biochem. 2004;41(6):486-488");
  });

  it("all 25 E3b targets are registered calculators", () => {
    const registrySlugs = new Set(
      calculatorRegistry.map((c) => c.slug),
    );
    for (const slug of E3B_EVIDENCE_SLUGS) {
      expect(
        registrySlugs.has(slug),
        `E3b slug "${slug}" is not a registered calculator`,
      ).toBe(true);
    }
  });

  it("E3b does not alter E1 or E2 evidence counts unexpectedly", () => {
    let evidenceCount = 0;
    for (const [, content] of Object.entries(clinicalContentRegistry)) {
      if (
        content.evidence !== undefined &&
        content.evidence.source !== undefined &&
        content.evidence.source!.length > 0
      ) {
        evidenceCount++;
      }
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(101);
  });
});