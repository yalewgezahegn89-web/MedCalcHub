/**
 * Phase 3 — Editorial quality, review provenance, and duplication regression tests.
 *
 * Verifies:
 * 1. Calculator-specific commonMistakes and FAQ coverage for all 143 calculators.
 * 2. Review provenance honesty: no fabricated reviewers, no unsubstantiated trust
 *    claims, no invented day-precision dates, no review status before human review.
 * 3. Single-render contract: formula, ranges, references, and guidance each render
 *    from exactly one source component.
 * 4. No substantial boilerplate duplicated across calculators (citations exempt).
 * 5. Registry count remains 143.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import type { ClinicalContent } from "../../lib/clinical-content/clinical-content.types";
import { clinicalContentRegistry } from "../../lib/clinical-content/registry";
import { calculatorRegistry } from "../../lib/calculators/registry";
import { ClinicalContentPanel } from "../../components/calculators/clinical-content-panel";
import { ClinicalNotes } from "../../components/calculators/clinical-notes";
import { generateCalculatorReport } from "../../lib/pdf/generate-report";

const { mockDoc } = vi.hoisted(() => ({
  mockDoc: {
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    text: vi.fn(),
    splitTextToSize: vi.fn((text: string) => [text]),
    addPage: vi.fn(),
    save: vi.fn(),
    setDrawColor: vi.fn(),
    line: vi.fn(),
  },
}));

vi.mock("jspdf", () => ({
  jsPDF: vi.fn(function () {
    return mockDoc;
  }),
}));

const contentRegistry = clinicalContentRegistry as unknown as Record<
  string,
  ClinicalContent
>;
const contentSlugs = Object.keys(contentRegistry);
const calcSlugs = calculatorRegistry.map((calc) => calc.slug);

const root = join(__dirname, "../..");

function readSource(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

function walkSources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      walkSources(rel, out);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

function decodeEntities(html: string): string {
  return html
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const STANDARD_DISCLAIMER_OPENINGS = [
  "This calculator is intended for educational and clinical decision support purposes only.",
  "This calculator is intended for educational and research purposes only.",
  "This calculator is intended for educational and clinical screening purposes only.",
];

const FORBIDDEN_TRUST_CLAIMS = [
  "MedCalcHub Clinical Team",
  "Editorial Team",
  "physician-reviewed",
  "clinically reviewed",
  "medically reviewed",
  "expert-reviewed",
];

const DATE_FORMAT = /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/;
const MONTH_ONLY = /^\d{4}-(0[1-9]|1[0-2])$/;
const TODAY = "2026-10-09";

// ─────────────────────────────────────────────────────────────
// 1. Coverage
// ─────────────────────────────────────────────────────────────

describe("Phase 3: commonMistakes and FAQ coverage", () => {
  it("registry and content registry both contain exactly 143 calculators", () => {
    expect(calculatorRegistry).toHaveLength(143);
    expect(contentSlugs).toHaveLength(143);
    expect([...contentSlugs].sort()).toEqual([...calcSlugs].sort());
  });

  it("every calculator has at least 3 calculator-specific commonMistakes", () => {
    for (const slug of contentSlugs) {
      const mistakes = contentRegistry[slug].commonMistakes;
      expect(mistakes, `${slug}.commonMistakes`).toBeDefined();
      expect(mistakes!.length, `${slug}.commonMistakes`).toBeGreaterThanOrEqual(3);
    }
  });

  it("every commonMistake is substantive and self-contained", () => {
    for (const slug of contentSlugs) {
      for (const [index, mistake] of (contentRegistry[slug].commonMistakes ?? []).entries()) {
        expect(mistake.trim(), `${slug}.commonMistakes[${index}]`).toBe(mistake);
        expect(mistake.length, `${slug}.commonMistakes[${index}]`).toBeGreaterThanOrEqual(45);
        expect(/\b(TODO|TBD|FIXME|lorem ipsum|placeholder)\b/i.test(mistake)).toBe(false);
        expect(/\b([A-Za-z]{3,})\s+\1\b/i.test(mistake), `${slug}: ${mistake}`).toBe(false);
      }
    }
  });

  it("no commonMistake text is copy-pasted between calculators", () => {
    const seen = new Map<string, string>();
    for (const slug of contentSlugs) {
      for (const mistake of contentRegistry[slug].commonMistakes ?? []) {
        expect(seen.has(mistake), `duplicate mistake shared by ${seen.get(mistake)} and ${slug}`).toBe(false);
        seen.set(mistake, slug);
      }
    }
    expect(seen.size).toBeGreaterThanOrEqual(143 * 3);
  });

  it("every calculator has at least one FAQ with a substantive question and answer", () => {
    for (const slug of contentSlugs) {
      const faq = contentRegistry[slug].faq;
      expect(faq, `${slug}.faq`).toBeDefined();
      expect(faq!.length, `${slug}.faq`).toBeGreaterThanOrEqual(1);
      for (const [index, item] of faq!.entries()) {
        expect(item.question.length, `${slug}.faq[${index}].question`).toBeGreaterThanOrEqual(10);
        expect(item.answer.length, `${slug}.faq[${index}].answer`).toBeGreaterThanOrEqual(50);
        expect(item.answer.trim()).toBe(item.answer);
        expect(/\b(TODO|TBD|FIXME|lorem ipsum|placeholder)\b/i.test(item.answer)).toBe(false);
      }
    }
  });

  it("no FAQ answer is copy-pasted between calculators", () => {
    const seen = new Map<string, string>();
    for (const slug of contentSlugs) {
      for (const item of contentRegistry[slug].faq ?? []) {
        expect(seen.has(item.answer), `duplicate answer shared by ${seen.get(item.answer)} and ${slug}`).toBe(false);
        seen.set(item.answer, slug);
      }
    }
    expect(seen.size).toBeGreaterThanOrEqual(143);
  });

  it("every calculator has a clinicalPurpose and a disclaimer", () => {
    for (const slug of contentSlugs) {
      expect(contentRegistry[slug].clinicalPurpose?.length ?? 0, `${slug}.clinicalPurpose`).toBeGreaterThan(0);
      expect(contentRegistry[slug].disclaimer?.length ?? 0, `${slug}.disclaimer`).toBeGreaterThan(0);
    }
  });

  it("disclaimers are standardized where interchangeable and unique per calculator", () => {
    const firstSentences = new Set<string>();
    const disclaimers = new Set<string>();
    for (const slug of contentSlugs) {
      const disclaimer = contentRegistry[slug].disclaimer!;
      disclaimers.add(disclaimer);
      const firstSentence = disclaimer.split(/(?<=\.)\s/)[0];
      expect(
        STANDARD_DISCLAIMER_OPENINGS.includes(firstSentence),
        `${slug} disclaimer opening: ${firstSentence}`,
      ).toBe(true);
      firstSentences.add(firstSentence);
    }
    expect(disclaimers.size).toBe(143);
    expect(firstSentences.size).toBeLessThanOrEqual(STANDARD_DISCLAIMER_OPENINGS.length);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. Review provenance honesty
// ─────────────────────────────────────────────────────────────

describe("Phase 3: review provenance honesty", () => {
  it("no calculator claims a review that has not happened", () => {
    for (const slug of contentSlugs) {
      expect(contentRegistry[slug].review, `${slug}.review must stay empty until a human reviews it`).toBeUndefined();
    }
  });

  it("no evidence block names an unverified reviewer", () => {
    let evidenceCount = 0;
    for (const slug of contentSlugs) {
      const evidence = contentRegistry[slug].evidence;
      if (!evidence) continue;
      evidenceCount += 1;
      expect(evidence.reviewedBy, `${slug}.evidence.reviewedBy`).toBeUndefined();
    }
    expect(evidenceCount).toBeGreaterThanOrEqual(140);
  });

  it("evidence dates stay at month precision — no invented day-precision provenance", () => {
    for (const slug of contentSlugs) {
      const updatedAt = contentRegistry[slug].evidence?.updatedAt;
      if (!updatedAt) continue;
      expect(MONTH_ONLY.test(updatedAt), `${slug}.evidence.updatedAt = ${updatedAt}`).toBe(true);
      expect(updatedAt <= TODAY, `${slug}.evidence.updatedAt is in the future`).toBe(true);
    }
  });

  it("calculator update dates use real date formats and are not in the future", () => {
    for (const calc of calculatorRegistry) {
      const updatedAt = calc.updatedAt;
      expect(updatedAt, `${calc.slug}.updatedAt must be present`).toBeTruthy();
      expect(DATE_FORMAT.test(updatedAt!), `${calc.slug}.updatedAt = ${updatedAt}`).toBe(true);
      expect(updatedAt! <= TODAY, `${calc.slug}.updatedAt is in the future`).toBe(true);
    }
  });

  it("no app source claims an organizational clinical review", () => {
    const sources = [
      ...walkSources("app"),
      ...walkSources("lib"),
      ...walkSources("components"),
    ];
    expect(sources.length).toBeGreaterThan(50);
    for (const rel of sources) {
      const source = readSource(rel);
      for (const claim of FORBIDDEN_TRUST_CLAIMS) {
        expect(
          countOccurrences(source, claim),
          `${rel} must not claim "${claim}"`,
        ).toBe(0);
      }
    }
  });

  it("ClinicalContentPanel only shows a reviewer when one is supplied", () => {
    const withoutReviewer = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          evidence: {
            source: "Original derivation (peer-reviewed)",
            updatedAt: "2026-08",
          },
        },
      }),
    );
    expect(withoutReviewer).not.toContain("Reviewed by");
    expect(withoutReviewer).toContain("Content updated:");

    const withReviewer = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          evidence: {
            source: "Original derivation (peer-reviewed)",
            reviewedBy: "Dr. Jane Reviewer",
            updatedAt: "2026-08",
          },
        },
      }),
    );
    expect(withReviewer).toContain("Reviewed by");
    expect(withReviewer).toContain("Dr. Jane Reviewer");
  });

  it("PDF export does not fabricate a reviewer", () => {
    vi.clearAllMocks();
    mockDoc.splitTextToSize.mockImplementation((text: string) => [text]);

    generateCalculatorReport({ calculator: "BMI", result: "24.9" });
    const renderedText: string[] = mockDoc.text.mock.calls.map(
      (call) => String(call[0]),
    );
    const reviewedLine = renderedText.find((line) => line.startsWith("Reviewed By:"));
    expect(reviewedLine).toBeDefined();
    expect(reviewedLine).not.toContain("MedCalcHub Clinical Team");
    expect(reviewedLine).not.toContain("Editorial Team");
    expect(reviewedLine).toContain("Not yet reviewed");
  });
});

// ─────────────────────────────────────────────────────────────
// 3. Single-render contract
// ─────────────────────────────────────────────────────────────

describe("Phase 3: each fact renders from exactly one component", () => {
  const pageSource = readSource("app/calculators/[slug]/page.tsx");
  const clientSource = readSource("components/calculators/calculator-client.tsx");
  const notesSource = readSource("components/calculators/clinical-notes/clinical-notes.tsx");

  it("the calculator page renders guidance and evidence through the clinical content panel only", () => {
    expect(pageSource).not.toContain("ClinicalGuidancePanel");
    expect(pageSource).not.toContain("EvidenceCard");
    expect(countOccurrences(pageSource, "<ClinicalContentPanel")).toBe(1);
    expect(countOccurrences(pageSource, "<CalculatorMetadataCard")).toBe(1);
    expect(countOccurrences(pageSource, "<ReferenceRanges")).toBe(1);
  });

  it("formula, ranges, and references are no longer passed into ClinicalNotes", () => {
    const notesTag = /<ClinicalNotes[\s\S]*?\/>/.exec(clientSource);
    expect(notesTag, "ClinicalNotes must be rendered by calculator-client").not.toBeNull();
    const tag = notesTag![0];
    expect(tag).not.toContain("formula=");
    expect(tag).not.toContain("normalRange=");
    expect(tag).not.toContain("references=");
    expect(countOccurrences(clientSource, "<ClinicalNotes")).toBe(1);
  });

  it("ClinicalNotes renders only the clinical notes text", () => {
    expect(notesSource).not.toContain("formula");
    expect(notesSource).not.toContain("normalRange");
    expect(notesSource).not.toContain("references");

    const html = renderToStaticMarkup(
      React.createElement(ClinicalNotes, {
        clinicalNotes: "Interpret alongside volume status and hydration.",
      }),
    );
    expect(html).toContain("Interpret alongside volume status and hydration.");
    expect(html).not.toContain("Formula");
    expect(html).not.toContain("Reference Range");
    expect(html).not.toContain("References");
  });

  it("ClinicalNotes renders nothing without clinical notes", () => {
    const html = renderToStaticMarkup(React.createElement(ClinicalNotes, {}));
    expect(html).toBe("");
  });

  it("a citation shared by the reference list and the evidence block renders once", () => {
    const html = renderToStaticMarkup(
      React.createElement(ClinicalContentPanel, {
        content: {
          references: [
            {
              citation: "Shared citation for deduplication test.",
              url: "https://example.com/shared",
            },
          ],
          evidence: {
            source: "Original derivation (peer-reviewed)",
            reference: "Shared citation for deduplication test.",
            references: [
              "Shared citation for deduplication test.",
              "Evidence-only citation for deduplication test.",
            ],
          },
        },
      }),
    );
    const decoded = decodeEntities(html);
    expect(countOccurrences(decoded, "Shared citation for deduplication test.")).toBe(1);
    expect(countOccurrences(decoded, "Evidence-only citation for deduplication test.")).toBe(1);
    expect(decoded).not.toContain(">Reference:<");
    expect(decoded).toContain(">References<");
  });

  it("an evidence reference that is not in the bibliography still renders", () => {
    const html = decodeEntities(
      renderToStaticMarkup(
        React.createElement(ClinicalContentPanel, {
          content: {
            references: [
              { citation: "Listed citation for deduplication test." },
            ],
            evidence: {
              source: "Original derivation (peer-reviewed)",
              reference: "Unlisted evidence reference for deduplication test.",
            },
          },
        }),
      ),
    );
    expect(html).toContain(">Reference:<");
    expect(html).toContain("Unlisted evidence reference for deduplication test.");
    expect(countOccurrences(html, "Listed citation for deduplication test.")).toBe(1);
  });

  it("real registry citations shared by references and evidence render once per calculator", () => {
    let checked = 0;
    for (const slug of contentSlugs) {
      const content = contentRegistry[slug];
      const listed = (content.references ?? []).map((ref) => ref.citation);
      const overlapping = (content.evidence?.references ?? []).filter((citation) =>
        listed.includes(citation),
      );
      if (overlapping.length === 0) continue;
      const html = renderToStaticMarkup(
        React.createElement(ClinicalContentPanel, { content }),
      );
      for (const citation of overlapping) {
        checked += 1;
        expect(
          countOccurrences(decodeEntities(html), citation),
          `${slug} renders "${citation.slice(0, 60)}"`,
        ).toBe(1);
      }
    }
    expect(checked).toBeGreaterThanOrEqual(30);
  });
});

// ─────────────────────────────────────────────────────────────
// 4. Boilerplate / duplication
// ─────────────────────────────────────────────────────────────

describe("Phase 3: no substantial cross-calculator boilerplate", () => {
  function collectStrings(value: unknown, path: string, out: Map<string, string[]>, slug: string) {
    if (typeof value === "string") {
      if (value.length >= 120 && !/reference|citation/i.test(path)) {
        const users = out.get(value) ?? [];
        users.push(`${slug} (${path})`);
        out.set(value, users);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out, slug));
      return;
    }
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        collectStrings(child, `${path}.${key}`, out, slug);
      }
    }
  }

  it("no long editorial sentence is shared across two calculators", () => {
    const shared = new Map<string, string[]>();
    for (const slug of contentSlugs) {
      collectStrings(contentRegistry[slug], "content", shared, slug);
    }
    for (const calc of calculatorRegistry) {
      collectStrings(
        {
          clinicalNotes: calc.clinicalNotes,
          normalRange: calc.normalRange,
          formula: calc.formula,
          clinical: calc.clinical,
        },
        "calculator",
        shared,
        calc.slug,
      );
    }
    const duplicated = [...shared.entries()].filter(
      ([, users]) => new Set(users.map((user) => user.split(" ")[0])).size > 1,
    );
    expect(
      duplicated.map(([text, users]) => `${users.join(" | ")} :: ${text.slice(0, 80)}`),
      "shared editorial boilerplate",
    ).toEqual([]);
  });

  it("authored guidance text contains no cross-calculator copying or text defects", () => {
    for (const slug of contentSlugs) {
      const content = contentRegistry[slug];
      const authored = [
        ...(content.commonMistakes ?? []),
        ...(content.faq ?? []).flatMap((item) => [item.question, item.answer]),
        content.clinicalPearl ?? "",
        content.disclaimer ?? "",
      ];
      for (const text of authored) {
        if (!text) continue;
        expect(/[\u4e00-\u9fff\u0400-\u04ff\u0600-\u06ff\ufffd]/.test(text), `${slug}: ${text}`).toBe(false);
        expect(/\s{2,}/.test(text), `${slug}: ${text}`).toBe(false);
        expect(/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text), `${slug}: control char`).toBe(false);
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 5. Registry integrity
// ─────────────────────────────────────────────────────────────

describe("Phase 3: registry integrity", () => {
  it("registry count remains exactly 143", () => {
    expect(calculatorRegistry).toHaveLength(143);
    expect(contentSlugs).toHaveLength(143);
  });
});
