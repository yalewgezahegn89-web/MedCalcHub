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