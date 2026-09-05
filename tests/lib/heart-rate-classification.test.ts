/**
 * Heart Rate Calculator — Classification Correctness Tests
 *
 * Verifies that the calculator correctly classifies heart rate into:
 *   < 60 bpm  → bradycardia (status: "low")
 *   60–100 bpm → normal resting range (status: "normal")
 *   > 100 bpm → tachycardia (status: "high")
 */

import { describe, it, expect } from "vitest";
import { calculatorRegistry } from "../../lib/calculators/registry";

function findCalc(slug: string) {
  return calculatorRegistry.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  Calculation formula unchanged                                      */
/* ------------------------------------------------------------------ */

describe("Heart Rate — formula unchanged", () => {
  const calc = findCalc("heart-rate")!;

  it("formula is beats / time", () => {
    expect(calc.formula).toBe("beats / time");
  });

  it("59 beats / 1 min = 59", () => {
    const r = calc.calculate({ beats: "59", time: "1" });
    expect(r.value).toBe(59);
  });

  it("60 beats / 1 min = 60", () => {
    const r = calc.calculate({ beats: "60", time: "1" });
    expect(r.value).toBe(60);
  });

  it("72 beats / 1 min = 72", () => {
    const r = calc.calculate({ beats: "72", time: "1" });
    expect(r.value).toBe(72);
  });

  it("100 beats / 1 min = 100", () => {
    const r = calc.calculate({ beats: "100", time: "1" });
    expect(r.value).toBe(100);
  });

  it("101 beats / 1 min = 101", () => {
    const r = calc.calculate({ beats: "101", time: "1" });
    expect(r.value).toBe(101);
  });

  it("150 beats / 3 min = 50", () => {
    const r = calc.calculate({ beats: "150", time: "3" });
    expect(r.value).toBe(50);
  });
});

/* ------------------------------------------------------------------ */
/*  Classification boundaries                                          */
/* ------------------------------------------------------------------ */

describe("Heart Rate — classification boundaries", () => {
  const calc = findCalc("heart-rate")!;

  it("59 bpm → bradycardia (status: low)", () => {
    const r = calc.calculate({ beats: "59", time: "1" });
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("bradycardia");
  });

  it("60 bpm → normal (status: normal)", () => {
    const r = calc.calculate({ beats: "60", time: "1" });
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("normal resting range");
  });

  it("72 bpm → normal (status: normal)", () => {
    const r = calc.calculate({ beats: "72", time: "1" });
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("normal resting range");
  });

  it("100 bpm → normal (status: normal)", () => {
    const r = calc.calculate({ beats: "100", time: "1" });
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("normal resting range");
  });

  it("101 bpm → tachycardia (status: high)", () => {
    const r = calc.calculate({ beats: "101", time: "1" });
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("tachycardia");
  });
});

/* ------------------------------------------------------------------ */
/*  Result object shape                                                */
/* ------------------------------------------------------------------ */

describe("Heart Rate — result object shape", () => {
  const calc = findCalc("heart-rate")!;

  it("returns value, interpretation, and status", () => {
    const r = calc.calculate({ beats: "72", time: "1" });
    expect(r).toHaveProperty("value");
    expect(r).toHaveProperty("interpretation");
    expect(r).toHaveProperty("status");
  });

  it("value is a number", () => {
    const r = calc.calculate({ beats: "72", time: "1" });
    expect(typeof r.value).toBe("number");
  });

  it("interpretation is a string", () => {
    const r = calc.calculate({ beats: "72", time: "1" });
    expect(typeof r.interpretation).toBe("string");
  });
});

/* ------------------------------------------------------------------ */
/*  Invalid input behavior unchanged                                   */
/* ------------------------------------------------------------------ */

describe("Heart Rate — invalid input behavior unchanged", () => {
  const calc = findCalc("heart-rate")!;

  it("empty beats → critical", () => {
    const r = calc.calculate({ beats: "", time: "1" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("empty time → critical", () => {
    const r = calc.calculate({ beats: "72", time: "" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("NaN beats → critical", () => {
    const r = calc.calculate({ beats: "abc", time: "1" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("NaN time → critical", () => {
    const r = calc.calculate({ beats: "72", time: "abc" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("negative beats → critical", () => {
    const r = calc.calculate({ beats: "-10", time: "1" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("negative time → critical", () => {
    const r = calc.calculate({ beats: "72", time: "-1" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("zero beats → critical", () => {
    const r = calc.calculate({ beats: "0", time: "1" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });

  it("zero time → critical", () => {
    const r = calc.calculate({ beats: "72", time: "0" });
    expect(r.status).toBe("critical");
    expect(r.value).toBe(0);
  });
});

/* ------------------------------------------------------------------ */
/*  Registry count preserved                                           */
/* ------------------------------------------------------------------ */

describe("Heart Rate — registry count preserved", () => {
  it("calculator registry still has 143 entries", () => {
    expect(calculatorRegistry.length).toBe(143);
  });

  it("heart-rate calculator is present", () => {
    expect(findCalc("heart-rate")).toBeDefined();
  });
});
