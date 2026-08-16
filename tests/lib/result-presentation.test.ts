import { describe, it, expect } from "vitest";

import type { CalculatorResult } from "@/lib/calculators";

import {
  buildResultText,
  findResultClassification,
  isValidationStyleResult,
  prepareResultSections,
} from "@/lib/result-presentation";

import type { ClassificationItem } from "@/lib/calculators/utils/classification";

const classifications: ClassificationItem[] = [
  {
    label: "Normal",
    range: "18.5–24.9",
    min: 18.5,
    max: 24.9,
  },
  {
    label: "Overweight",
    range: "25–29.9",
    min: 25,
    max: 29.9,
  },
];

describe("prepareResultSections", () => {
  it("returns empty sections for a bare result", () => {
    const sections = prepareResultSections({
      value: 10,
    });

    expect(sections.warnings).toEqual([]);
    expect(sections.advice).toEqual([]);
    expect(sections.followUp).toEqual([]);
    expect(sections.score).toBeUndefined();
    expect(sections.interpretation).toBeUndefined();
  });

  it("passes through score and interpretation", () => {
    const sections = prepareResultSections({
      value: 3,
      score: 3,
      interpretation: "Intermediate risk.",
    });

    expect(sections.score).toBe(3);
    expect(sections.interpretation).toBe(
      "Intermediate risk.",
    );
  });

  it("trims and drops empty strings from list fields", () => {
    const sections = prepareResultSections({
      value: 1,
      warnings: [
        "  Watch out.  ",
        "",
        "   ",
        "Second warning.",
      ],
    });

    expect(sections.warnings).toEqual([
      "Watch out.",
      "Second warning.",
    ]);
  });

  it("keeps list order intact", () => {
    const sections = prepareResultSections({
      value: 1,
      advice: ["First.", "Second."],
      followUp: ["Recheck."],
    });

    expect(sections.advice).toEqual([
      "First.",
      "Second.",
    ]);
    expect(sections.followUp).toEqual(["Recheck."]);
  });

  it("handles undefined list fields", () => {
    const sections = prepareResultSections({
      value: 1,
      warnings: undefined,
      advice: undefined,
      followUp: undefined,
    });

    expect(sections.warnings).toEqual([]);
    expect(sections.advice).toEqual([]);
    expect(sections.followUp).toEqual([]);
  });
});

describe("findResultClassification", () => {
  it("returns the matching classification for a numeric value", () => {
    expect(
      findResultClassification(22, classifications)
        ?.label,
    ).toBe("Normal");
  });

  it("converts string values to numbers", () => {
    expect(
      findResultClassification("27", classifications)
        ?.label,
    ).toBe("Overweight");
  });

  it("returns undefined for non-numeric values", () => {
    expect(
      findResultClassification("abc", classifications),
    ).toBeUndefined();
    expect(
      findResultClassification("NaN", classifications),
    ).toBeUndefined();
  });

  it("returns the first matching classification on shared boundaries", () => {
    const overlapping: ClassificationItem[] = [
      { label: "A", range: "0–10", min: 0, max: 10 },
      { label: "B", range: "10–20", min: 10, max: 20 },
    ];

    expect(
      findResultClassification(10, overlapping)?.label,
    ).toBe("A");
  });

  it("returns undefined when no classification metadata exists", () => {
    expect(findResultClassification(22)).toBeUndefined();
  });
});

describe("isValidationStyleResult", () => {
  it("returns true for validation text on a zero/critical/no-unit result", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        interpretation: "Weight is required.",
        status: "critical",
      }),
    ).toBe(true);
  });

  it("returns true for a numeric string zero with validation text", () => {
    expect(
      isValidationStyleResult({
        value: "0",
        interpretation: "Invalid Height.",
        status: "critical",
      }),
    ).toBe(true);
  });

  it("returns true for range-check validation text", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        interpretation:
          "Age must be between 18 and 110 years.",
        status: "critical",
      }),
    ).toBe(true);
  });

  it("returns false for a clinical interpretation on a zero/critical/no-unit result", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        interpretation: "G5: Kidney failure",
        status: "critical",
      }),
    ).toBe(false);

    expect(
      isValidationStyleResult({
        value: 0,
        interpretation:
          "High risk of HFNC failure. Consider early escalation of respiratory support.",
        status: "critical",
      }),
    ).toBe(false);
  });

  it("returns false for zero/critical results that carry a unit", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        unit: "mg/dL",
        interpretation: "Weight is required.",
        status: "critical",
      }),
    ).toBe(false);
  });

  it("returns false for non-zero critical results", () => {
    expect(
      isValidationStyleResult({
        value: 5,
        interpretation: "Weight is required.",
        status: "critical",
      }),
    ).toBe(false);
  });

  it("returns false when the interpretation is missing", () => {
    expect(
      isValidationStyleResult({
        value: "0",
        status: "critical",
      }),
    ).toBe(false);
  });

  it("does not flag zero values with non-critical statuses", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        interpretation: "Normal weight",
        status: "normal",
      }),
    ).toBe(false);
  });

  it("does not flag results without a status", () => {
    expect(
      isValidationStyleResult({
        value: 0,
        interpretation: "Weight is required.",
      }),
    ).toBe(false);
  });
});

describe("buildResultText", () => {
  it("includes label, result line and interpretation", () => {
    const text = buildResultText("BMI Calculator", {
      value: 24.5,
      interpretation: "Normal weight",
    });

    expect(text).toBe(
      [
        "BMI Calculator",
        "",
        "Result: 24.5",
        "",
        "Normal weight",
      ].join("\n"),
    );
  });

  it("includes warnings, advice and follow-up blocks", () => {
    const result: CalculatorResult = {
      value: 3,
      unit: "/9",
      score: 3,
      interpretation: "Intermediate risk of stroke.",
      warnings: ["Watch out."],
      advice: ["Consider anticoagulation."],
      followUp: ["Recheck in 3 months."],
    };

    expect(buildResultText("CHA2DS2-VASc", result)).toBe(
      [
        "CHA2DS2-VASc",
        "",
        "Result: 3 /9",
        "",
        "Intermediate risk of stroke.",
        "",
        "Warnings:",
        "- Watch out.",
        "",
        "Advice:",
        "- Consider anticoagulation.",
        "",
        "Follow-up:",
        "- Recheck in 3 months.",
      ].join("\n"),
    );
  });

  it("omits a score line when the score equals the value", () => {
    const text = buildResultText("Score", {
      value: 3,
      unit: "/9",
      score: 3,
    });

    expect(text).not.toContain("Score:");
  });

  it("includes a score line when the score differs from the value", () => {
    const text = buildResultText("EDD Calculator", {
      value: "2026-05-01",
      score: 5,
      interpretation: "Estimated date of delivery.",
    });

    expect(text).toBe(
      [
        "EDD Calculator",
        "",
        "Result: 2026-05-01",
        "Score: 5",
        "",
        "Estimated date of delivery.",
      ].join("\n"),
    );
  });

  it("omits interpretation and empty blocks when absent", () => {
    const text = buildResultText("Bare", {
      value: 10,
    });

    expect(text).toBe(["Bare", "", "Result: 10"].join("\n"));
  });
});
