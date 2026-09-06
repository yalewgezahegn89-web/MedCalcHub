/**
 * Final Interpretation Completion Tests
 *
 * Verifies that all registered calculators have completed interpretation
 * text and no longer contain placeholder/pending strings.
 */

import { describe, it, expect } from "vitest";
import {
  calculatorRegistry,
} from "../../lib/calculators/registry";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "../..");
const calcDir = join(root, "lib/calculators");

const ORPHAN_SLUGS = new Set(["a1c-eag-converter"]);

function allCalculatorSources(): string[] {
  return readdirSync(calcDir)
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        !f.endsWith(".test.ts") &&
        !ORPHAN_SLUGS.has(f.replace(/\.ts$/, "")),
    )
    .map((f) => readFileSync(join(calcDir, f), "utf8"));
}

describe("Final interpretation completion", () => {
  it("registry contains exactly 143 calculators", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("no registered calculator source file contains 'Clinical interpretation pending.'", () => {
    const sources = allCalculatorSources();
    const offenders: string[] = [];
    for (const source of sources) {
      if (source.includes("Clinical interpretation pending.")) {
        offenders.push("found");
      }
    }
    expect(offenders).toHaveLength(0);
  });

  it("no registered calculator source file contains 'MedCalcHub Clinical References'", () => {
    const sources = allCalculatorSources();
    const offenders: string[] = [];
    for (const source of sources) {
      if (source.includes("MedCalcHub Clinical References")) {
        offenders.push("found");
      }
    }
    expect(offenders).toHaveLength(0);
  });

  it("all calculator IDs are unique", () => {
    const ids = calculatorRegistry.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all calculator slugs are unique", () => {
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("Representative calculation contracts unchanged", () => {
  it("BMI calculator produces valid result for standard input", async () => {
    const { bmiCalculator } = await import(
      "../../lib/calculators/bmi"
    );
    const result = bmiCalculator.calculate({
      weight: "70",
      height: "170",
    });
    expect(result.value).toBeCloseTo(24.22, 1);
    expect(result.status).toBe("normal");
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });

  it("CKD-EPI 2021 calculator produces valid result", async () => {
    const { ckdEpi2021Calculator } = await import(
      "../../lib/calculators/ckd-epi-2021"
    );
    const result = ckdEpi2021Calculator.calculate({
      creatinine: "1.0",
      age: "50",
      sex: "1",
    });
    expect(result.value).toBeGreaterThan(0);
    expect(result.status).toMatch(/^(normal|low|high|critical)$/);
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });

  it("GCS calculator produces valid result", async () => {
    const { gcsCalculator } = await import(
      "../../lib/calculators/gcs"
    );
    const result = gcsCalculator.calculate({
      eye: "4",
      verbal: "5",
      motor: "6",
    });
    expect(result.value).toBe(15);
    expect(result.status).toBe("normal");
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });

  it("Anion gap calculator produces valid result", async () => {
    const { anionGapCalculator } = await import(
      "../../lib/calculators/anion-gap"
    );
    const result = anionGapCalculator.calculate({
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
    });
    expect(result.value).toBe(12);
    expect(result.status).toBe("normal");
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });

  it("Cockcroft-Gault calculator produces valid result", async () => {
    const { cockcroftGaultCalculator } = await import(
      "../../lib/calculators/cockcroft-gault"
    );
    const result = cockcroftGaultCalculator.calculate({
      age: "50",
      weight: "70",
      creatinine: "1.0",
      sex: "1",
    });
    expect(result.value).toBeGreaterThan(0);
    expect(result.status).toMatch(/^(normal|low|high|critical)$/);
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });

  it("HOMA-IR calculator produces valid result", async () => {
    const { homaIrCalculator } = await import(
      "../../lib/calculators/homa-ir"
    );
    const result = homaIrCalculator.calculate({
      glucose: "90",
      insulin: "10",
    });
    expect(result.value).toBeCloseTo(2.25, 1);
    expect(result.status).toBe("normal");
    expect(result.interpretation).not.toBe(
      "Clinical interpretation pending.",
    );
  });
});
