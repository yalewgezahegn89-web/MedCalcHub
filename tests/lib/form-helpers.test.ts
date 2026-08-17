import { describe, it, expect } from "vitest";
import {
  buildInitialValues,
  mergeInitialValues,
} from "../../lib/calculators/form-helpers";
import type { CalculatorInput } from "../../lib/calculators";

function makeInput(
  overrides: Partial<CalculatorInput> = {},
): CalculatorInput {
  return {
    id: "weight",
    label: "Weight",
    type: "number",
    ...overrides,
  };
}

// -------------------------------------------------------
// buildInitialValues
// -------------------------------------------------------

describe("buildInitialValues", () => {
  it("returns empty string when defaultValue is absent", () => {
    const inputs = [makeInput({ id: "weight" })];
    const result = buildInitialValues(inputs);
    expect(result).toEqual({ weight: "" });
  });

  it("uses defaultValue when defined", () => {
    const inputs = [
      makeInput({ id: "weight", defaultValue: "70" }),
    ];
    const result = buildInitialValues(inputs);
    expect(result).toEqual({ weight: "70" });
  });

  it("handles empty inputs array", () => {
    const result = buildInitialValues([]);
    expect(result).toEqual({});
  });

  it("handles multiple inputs with mixed defaultValue", () => {
    const inputs = [
      makeInput({ id: "weight", defaultValue: "70" }),
      makeInput({ id: "height", defaultValue: undefined }),
      makeInput({ id: "age", defaultValue: "30" }),
    ];
    const result = buildInitialValues(inputs);
    expect(result).toEqual({
      weight: "70",
      height: "",
      age: "30",
    });
  });

  it("only includes declared input IDs in result", () => {
    const inputs = [
      makeInput({ id: "weight", defaultValue: "70" }),
    ];
    const result = buildInitialValues(inputs);
    expect(result).not.toHaveProperty("height");
    expect(result).not.toHaveProperty("unknown");
  });

  it("empty string defaultValue is preserved", () => {
    const inputs = [
      makeInput({ id: "weight", defaultValue: "" }),
    ];
    const result = buildInitialValues(inputs);
    expect(result).toEqual({ weight: "" });
  });
});

// -------------------------------------------------------
// mergeInitialValues
// -------------------------------------------------------

describe("mergeInitialValues", () => {
  const base = { weight: "70", height: "175", age: "" };

  it("returns base unchanged when no initialValues provided", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height", "age"],
    );
    expect(result).toEqual(base);
  });

  it("returns base unchanged when initialValues is undefined", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height", "age"],
      undefined,
    );
    expect(result).toEqual(base);
  });

  it("overrides matching keys from initialValues", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height", "age"],
      { weight: "80" },
    );
    expect(result.weight).toBe("80");
    expect(result.height).toBe("175");
  });

  it("ignores initialValues keys not in input IDs", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height"],
      { weight: "80", unknown: "value" },
    );
    expect(result).not.toHaveProperty("unknown");
    expect(result.weight).toBe("80");
  });

  it("does not mutate the base object", () => {
    const original = { ...base };
    mergeInitialValues(base, ["weight"], { weight: "999" });
    expect(base).toEqual(original);
  });

  it("saved initialValues override defaultValue-based base", () => {
    const baseWithDefaults = {
      weight: "70",
      height: "175",
    };
    const result = mergeInitialValues(
      baseWithDefaults,
      ["weight", "height"],
      { weight: "100", height: "200" },
    );
    expect(result).toEqual({ weight: "100", height: "200" });
  });

  it("partial initialValues only override matching keys", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height", "age"],
      { weight: "100" },
    );
    expect(result).toEqual({
      weight: "100",
      height: "175",
      age: "",
    });
  });

  it("empty initialValues object results in no changes", () => {
    const result = mergeInitialValues(
      base,
      ["weight", "height", "age"],
      {},
    );
    expect(result).toEqual(base);
  });
});
