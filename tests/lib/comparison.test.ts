import { describe, it, expect } from "vitest";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";
import { calculatorRegistry } from "@/lib/calculators/registry";

import {
  MAX_COMPARISON,
  buildSuggestedGroups,
  decodeSelection,
  encodeSelection,
  getComparisonQuery,
  normalizeSelection,
  prepareComparisonRows,
  resolveSelectedCalculators,
  shouldShowSafetyNote,
} from "@/lib/comparison";

function fakeCalculator(
  overrides: Partial<CalculatorDefinition> = {},
): CalculatorDefinition {
  const base: CalculatorDefinition = {
    id: "fake-calculator",
    slug: "fake-calculator",
    name: "Fake Calculator",
    shortName: "Fake",
    description: "A fixture calculator used by comparison tests.",
    category: "Fixture",
    inputs: [],
    calculate: () => ({ value: 0 }),
  };
  return { ...base, ...overrides };
}

describe("normalizeSelection", () => {
  it("removes duplicate ids and preserves first-seen order", () => {
    expect(normalizeSelection(["bmi", "gcs", "bmi", "gcs"])).toEqual([
      "bmi",
      "gcs",
    ]);
  });

  it("removes unknown calculator ids and slugs", () => {
    expect(
      normalizeSelection(["bmi", "not-a-calculator", "gcs", ""]),
    ).toEqual(["bmi", "gcs"]);
  });

  it("caps the selection at 3 calculators", () => {
    const many = ["bmi", "gcs", "map", "qsofa", "news2"];
    expect(normalizeSelection(many)).toEqual(["bmi", "gcs", "map"]);
    expect(normalizeSelection(many)).toHaveLength(MAX_COMPARISON);
  });

  it("resolves id/slug mismatches to canonical slugs", () => {
    expect(normalizeSelection(["meld"])).toEqual(["meld-score"]);
    expect(normalizeSelection(["meld-score", "meld"])).toEqual([
      "meld-score",
    ]);
  });

  it("handles empty input safely", () => {
    expect(normalizeSelection([])).toEqual([]);
  });
});

describe("decodeSelection", () => {
  it("decodes repeated c params into canonical slugs", () => {
    expect(
      decodeSelection(new URLSearchParams("?c=bmi&c=gcs")),
    ).toEqual(["bmi", "gcs"]);
  });

  it("dedupes, filters unknown values, and caps at 3", () => {
    expect(
      decodeSelection(
        new URLSearchParams(
          "?c=bmi&c=bmi&c=unknown&c=gcs&c=map&c=qsofa",
        ),
      ),
    ).toEqual(["bmi", "gcs", "map"]);
  });

  it("decodes id values when id !== slug", () => {
    expect(decodeSelection(new URLSearchParams("?c=meld"))).toEqual([
      "meld-score",
    ]);
  });

  it("returns an empty selection when no c params exist", () => {
    expect(decodeSelection(new URLSearchParams("?foo=bar"))).toEqual([]);
  });
});

describe("encodeSelection", () => {
  it("encodes slugs as repeated c params", () => {
    expect(encodeSelection(["bmi", "gcs"]).toString()).toBe(
      "c=bmi&c=gcs",
    );
  });

  it("normalizes, dedupes, and caps while encoding", () => {
    expect(
      encodeSelection([
        "bmi",
        "bmi",
        "unknown",
        "gcs",
        "map",
        "qsofa",
      ]).toString(),
    ).toBe("c=bmi&c=gcs&c=map");
  });

  it("round-trips through the URL form", () => {
    const query = getComparisonQuery(["meld", "bmi", "gcs"]);
    expect(decodeSelection(new URLSearchParams(query))).toEqual([
      "meld-score",
      "bmi",
      "gcs",
    ]);
  });
});

describe("prepareComparisonRows", () => {
  it("prepares input labels for a calculator", () => {
    const bmi = calculatorRegistry.find((calc) => calc.slug === "bmi")!;
    const rows = prepareComparisonRows([bmi]);
    expect(rows[0]?.inputs).toEqual(["Weight", "Height"]);
  });

  it("falls back to an em dash when purpose is missing", () => {
    const rows = prepareComparisonRows([fakeCalculator()]);
    expect(rows[0]?.purpose).toBe("—");
  });

  it("falls back to an em dash when limitation is missing", () => {
    const rows = prepareComparisonRows([fakeCalculator()]);
    expect(rows[0]?.limitation).toBe("—");
  });

  it("handles missing input metadata safely", () => {
    const rows = prepareComparisonRows([fakeCalculator()]);
    expect(rows[0]?.inputs).toEqual([]);
  });

  it("falls back to an em dash for absent specialty, formula, and notes", () => {
    const rows = prepareComparisonRows([fakeCalculator()]);
    expect(rows[0]?.specialty).toBe("—");
    expect(rows[0]?.formula).toBe("—");
    expect(rows[0]?.clinicalNotes).toBe("—");
  });

  it("uses the comparison self-item purpose and limitation when available", () => {
    const fake = fakeCalculator({
      comparison: {
        calculators: [
          {
            name: "Fake Calculator",
            href: "/calculators/fake-calculator",
            bestFor: "Fixture purpose",
            limitation: "Fixture limitation",
          },
        ],
      },
    });
    const rows = prepareComparisonRows([fake]);
    expect(rows[0]?.purpose).toBe("Fixture purpose");
    expect(rows[0]?.limitation).toBe("Fixture limitation");
  });

  it("handles id/slug mismatches in row output", () => {
    const meld = calculatorRegistry.find((calc) => calc.id === "meld")!;
    const rows = prepareComparisonRows([meld]);
    expect(rows[0]?.id).toBe("meld");
    expect(rows[0]?.slug).toBe("meld-score");
  });

  it("produces JSON-serializable rows without functions", () => {
    const rows = prepareComparisonRows(calculatorRegistry.slice(0, 3));
    const serialized = JSON.stringify(rows);
    expect(serialized.length).toBeGreaterThan(0);
    const parsed = JSON.parse(serialized);
    expect(parsed.length).toBe(3);
    expect(parsed[0]).not.toHaveProperty("calculate");
    expect(typeof parsed[0]?.slug).toBe("string");
    expect(Array.isArray(parsed[0]?.inputs)).toBe(true);
  });
});

describe("buildSuggestedGroups", () => {
  const groups = buildSuggestedGroups();

  it("contains only registered calculator slugs", () => {
    const slugs = new Set(calculatorRegistry.map((calc) => calc.slug));
    for (const group of groups) {
      for (const slug of group.slugs) {
        expect(slugs.has(slug), `${slug} is not registered`).toBe(true);
      }
    }
  });

  it("contains no duplicate slugs within a group", () => {
    for (const group of groups) {
      expect(new Set(group.slugs).size).toBe(group.slugs.length);
    }
  });

  it("caps groups at 3 and keeps at least 2 calculators", () => {
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.slugs.length).toBeLessThanOrEqual(MAX_COMPARISON);
      expect(group.slugs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("contains no duplicate groups", () => {
    const keys = new Set(
      groups.map((group) => [...group.slugs].sort().join("|")),
    );
    expect(keys.size).toBe(groups.length);
  });

  it("is deterministic across calls", () => {
    expect(groups).toEqual(buildSuggestedGroups());
  });
});

describe("resolveSelectedCalculators", () => {
  it("resolves slugs to calculators in deterministic registry order", () => {
    const calculators = resolveSelectedCalculators(["gcs", "bmi"]);
    expect(calculators.map((calc) => calc.slug)).toEqual(["gcs", "bmi"]);
  });

  it("filters unknown slugs and respects the 3-cap", () => {
    const calculators = resolveSelectedCalculators([
      "bmi",
      "unknown",
      "gcs",
      "map",
      "qsofa",
    ]);
    expect(calculators.map((calc) => calc.slug)).toEqual([
      "gcs",
      "map",
      "bmi",
    ]);
  });
});

describe("shouldShowSafetyNote", () => {
  it("flags calculators spanning different categories", () => {
    const bmi = calculatorRegistry.find((calc) => calc.slug === "bmi")!;
    const nihss = calculatorRegistry.find((calc) => calc.slug === "nihss")!;
    expect(shouldShowSafetyNote([bmi, nihss])).toBe(true);
  });

  it("does not flag calculators sharing a category and specialty", () => {
    const ckd = calculatorRegistry.find(
      (calc) => calc.slug === "ckd-epi-2021",
    )!;
    const cockcroft = calculatorRegistry.find(
      (calc) => calc.slug === "cockcroft-gault",
    )!;
    expect(shouldShowSafetyNote([ckd, cockcroft])).toBe(false);
  });
});
