/**
 * Phase 1 — ClinicalContent data model + rendering regression tests.
 *
 * Verifies:
 * 1. ClinicalContent accepts new optional fields.
 * 2. Existing objects without new fields remain valid.
 * 3. Rendering behavior: only render sections when data exists.
 * 4. No empty placeholder sections.
 * 5. relatedGuideIds do not create broken links.
 * 6. Registry count remains 143.
 */
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import type { ClinicalContent } from "../../lib/clinical-content/clinical-content.types";
import { ClinicalContentPanel } from "../../components/calculators/clinical-content-panel";
import { calculatorRegistry } from "../../lib/calculators/registry";

describe("Phase 1: ClinicalContent type supports new optional fields", () => {
  it("allows empty object (backward compatible)", () => {
    const content: ClinicalContent = {};
    expect(content).toBeDefined();
  });

  it("accepts all new optional fields", () => {
    const content: ClinicalContent = {
      formulaExplanation: "Explanation of formula.",
      variables: [
        {
          inputId: "age",
          label: "Age",
          explanation: "Patient age in years.",
          commonError: "Using months instead of years.",
        },
      ],
      commonMistakes: ["Mistake 1", "Mistake 2"],
      clinicalPearl: "Important clinical pearl.",
      relatedGuideIds: ["guide-1"],
      review: {
        reviewedDate: "2026-01-01",
        reviewer: "Review Team",
        sourcesVerified: true,
      },
    };
    expect(content.formulaExplanation).toBeDefined();
    expect(content.variables?.length).toBe(1);
    expect(content.commonMistakes?.length).toBe(2);
    expect(content.clinicalPearl).toBeDefined();
    expect(content.relatedGuideIds?.length).toBe(1);
    expect(content.review?.reviewedDate).toBe("2026-01-01");
    expect(content.review?.sourcesVerified).toBe(true);
  });

  it("existing content without new fields remains valid", () => {
    const legacy: ClinicalContent = {
      clinicalPurpose: "Purpose",
      howToUse: ["Step 1"],
      whenToUse: ["When"],
      limitations: ["Limitation"],
      clinicalSignificance: "Significance",
      references: [{ citation: "Ref", url: "https://example.com" }],
      faq: [{ question: "Q", answer: "A" }],
    };
    expect(legacy.formulaExplanation).toBeUndefined();
    expect(legacy.variables).toBeUndefined();
    expect(legacy.commonMistakes).toBeUndefined();
    expect(legacy.clinicalPearl).toBeUndefined();
    expect(legacy.relatedGuideIds).toBeUndefined();
    expect(legacy.review).toBeUndefined();
  });
});

describe("Phase 1: ClinicalContentPanel renders only when data exists", () => {
  it("renders nothing when all fields empty", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, { content: {} }),
    );
    expect(html).toBe("");
  });

  it("renders formulaExplanation only when present", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: { formulaExplanation: "How it works" },
      }),
    );
    expect(html).toContain("How the Calculation Works");
    expect(html).toContain("How it works");
  });

  it("does not render formulaExplanation section when absent", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: { clinicalPurpose: "Purpose" },
      }),
    );
    expect(html).not.toContain("How the Calculation Works");
  });

  it("renders variables only when present", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          variables: [
            {
              inputId: "age",
              label: "Age",
              explanation: "Age in years",
            },
          ],
        },
      }),
    );
    expect(html).toContain("Variables Explained");
    expect(html).toContain("Age");
    expect(html).toContain("Age in years");
  });

  it("renders commonMistakes only when present", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: { commonMistakes: ["Avoid X", "Avoid Y"] },
      }),
    );
    expect(html).toContain("Common Mistakes");
    expect(html).toContain("Avoid X");
    expect(html).toContain("Avoid Y");
  });

  it("renders clinicalPearl only when present", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: { clinicalPearl: "Pearl text" },
      }),
    );
    expect(html).toContain("Clinical Pearl");
    expect(html).toContain("Pearl text");
  });

  it("renders review only when present", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          review: {
            reviewedDate: "2026-09-07",
            reviewer: "Test Reviewer",
            sourcesVerified: true,
          },
        },
      }),
    );
    expect(html).toContain("Review");
    expect(html).toContain("2026-09-07");
    expect(html).toContain("Test Reviewer");
    expect(html).toContain("Sources verified");
  });

  it("does not render empty placeholder sections", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          formulaExplanation: "test",
          variables: [],
          commonMistakes: [],
          relatedGuideIds: [],
        },
      }),
    );
    expect(html).toContain("How the Calculation Works");
    expect(html).not.toContain("Variables Explained");
    expect(html).not.toContain("Common Mistakes");
    expect(html).not.toContain("Related Guides");
  });

  it("relatedGuideIds do not create broken links", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          relatedGuideIds: ["guide-1", "guide-2"],
        },
      }),
    );
    expect(html).not.toContain("Related Guides");
    expect(html).not.toContain("guide-1");
    expect(html).not.toContain("guide-2");
  });

  it("preserves existing sections when mixing new fields", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          clinicalPurpose: "Purpose",
          formulaExplanation: "Formula expl",
          clinicalPearl: "Pearl",
        },
      }),
    );
    expect(html).toContain("What This Calculator Measures");
    expect(html).toContain("How the Calculation Works");
    expect(html).toContain("Clinical Pearl");
  });
});

describe("Phase 1: Registry integrity", () => {
  it("registry count remains exactly 143", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });
});
