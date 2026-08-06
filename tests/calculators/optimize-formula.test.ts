import { describe, it, expect } from "vitest";

import {
  optimizeFormula,
} from "../../scripts/generator/core/formula/optimize-formula";

describe("optimizeFormula", () => {
  // ── Pass 1: Collapse duplicate whitespace ─────
  describe("Pass 1 — collapse whitespace", () => {
    it("should collapse multiple spaces", () => {
      expect(optimizeFormula("a   +   b")).toBe(
        "a + b",
      );
    });

    it("should trim leading/trailing whitespace", () => {
      expect(optimizeFormula("  a + b  ")).toBe(
        "a + b",
      );
    });
  });

  // ── Pass 2: Remove redundant outer parens ─────
  describe("Pass 2 — outer parentheses", () => {
    it("should remove ((x)) → x", () => {
      expect(optimizeFormula("((a))")).toBe("a");
    });

    it("should remove (((x))) → x", () => {
      expect(optimizeFormula("(((weight)))")).toBe(
        "weight",
      );
    });

    it("should not remove parens in (a + b)", () => {
      expect(optimizeFormula("(a + b)")).toBe(
        "(a + b)",
      );
    });

    it("should handle (a + (b)) — outer stays, inner removed", () => {
      expect(optimizeFormula("(a + (b))")).toBe(
        "(a + b)",
      );
    });
  });

  // ── Pass 3: Constant folding ──────────────────
  describe("Pass 3 — constant folding", () => {
    it("should fold 18 / 2 → 9", () => {
      expect(optimizeFormula("18 / 2")).toBe("9");
    });

    it("should fold 2 * 3 → 6", () => {
      expect(optimizeFormula("2 * 3")).toBe("6");
    });

    it("should fold 4 + 6 → 10", () => {
      expect(optimizeFormula("4 + 6")).toBe("10");
    });

    it("should fold 10 - 3 → 7", () => {
      expect(optimizeFormula("10 - 3")).toBe("7");
    });

    it("should not fold expressions with variables", () => {
      expect(optimizeFormula("a + 5")).toBe("a + 5");
    });

    it("should fold nested constant sub-expressions", () => {
      const result = optimizeFormula(
        "2 * 3 + 4",
      );
      expect(result).toBe("10");
    });
  });

  // ── Pass 4: Algebraic identities ──────────────
  describe("Pass 4 — algebraic identities", () => {
    it("should remove + 0", () => {
      expect(optimizeFormula("weight + 0")).toBe(
        "weight",
      );
    });

    it("should remove 0 +", () => {
      expect(optimizeFormula("0 + height")).toBe(
        "height",
      );
    });

    it("should remove - 0", () => {
      expect(optimizeFormula("value - 0")).toBe(
        "value",
      );
    });

    it("should remove * 1", () => {
      expect(optimizeFormula("height * 1")).toBe(
        "height",
      );
    });

    it("should remove 1 *", () => {
      expect(optimizeFormula("1 * x")).toBe("x");
    });

    it("should remove / 1", () => {
      expect(optimizeFormula("value / 1")).toBe(
        "value",
      );
    });
  });

  // ── Pass 5: Zero multiplication ───────────────
  describe("Pass 5 — zero multiplication", () => {
    it("should reduce x * 0 → 0", () => {
      expect(optimizeFormula("weight * 0")).toBe(
        "0",
      );
    });

    it("should reduce 0 * x → 0", () => {
      expect(optimizeFormula("0 * height")).toBe(
        "0",
      );
    });
  });

  // ── Pass 6: Power normalization ───────────────
  describe("Pass 6 — power normalization", () => {
    it("should convert height * height → height ** 2", () => {
      expect(
        optimizeFormula("height * height"),
      ).toBe("height ** 2");
    });

    it("should convert weight * weight → weight ** 2", () => {
      expect(
        optimizeFormula("weight * weight"),
      ).toBe("weight ** 2");
    });

    it("should not convert a * b → a ** 2", () => {
      expect(optimizeFormula("a * b")).toBe("a * b");
    });
  });

  // ── Pass 7: Repeated constant multiplication ──
  describe("Pass 7 — repeated constant mul", () => {
    it("should fold 2 * (3 * x) → 6 * x", () => {
      expect(
        optimizeFormula("2 * (3 * x)"),
      ).toBe("6 * x");
    });

    it("should fold 3 * (2 * weight) → 6 * weight", () => {
      expect(
        optimizeFormula("3 * (2 * weight)"),
      ).toBe("6 * weight");
    });
  });

  // ── Pass 8: Unary negatives ───────────────────
  describe("Pass 8 — unary negatives", () => {
    it("should convert a + -b → a - b", () => {
      expect(optimizeFormula("a + -b")).toBe(
        "a - b",
      );
    });

    it("should convert x + -y → x - y", () => {
      expect(
        optimizeFormula("weight + -height"),
      ).toBe("weight - height");
    });
  });

  // ── Pass 9: Decimal normalization ─────────────
  describe("Pass 9 — decimal normalization", () => {
    it("should normalize 2.000000 → 2", () => {
      expect(optimizeFormula("2.000000")).toBe("2");
    });

    it("should normalize 3.500000 → 3.5", () => {
      expect(optimizeFormula("3.500000")).toBe(
        "3.5",
      );
    });

    it("should keep 3.14159 as is", () => {
      expect(optimizeFormula("3.14159")).toBe(
        "3.14159",
      );
    });
  });

  // ── Pass 10: Idempotency ──────────────────────
  describe("Pass 10 — idempotency", () => {
    it("should produce identical output on repeated calls", () => {
      const input = "((a   +   0)) * 1";
      const first = optimizeFormula(input);
      const second = optimizeFormula(first);
      const third = optimizeFormula(second);
      expect(first).toBe(second);
      expect(second).toBe(third);
    });

    it("should be idempotent for complex expressions", () => {
      const input = "2 * (3 * x) + 0 + -y * 1";
      const first = optimizeFormula(input);
      const second = optimizeFormula(first);
      expect(first).toBe(second);
    });
  });

  // ── Integration: combined passes ──────────────
  describe("combined optimizations", () => {
    it("should optimize weight / (height * height) correctly", () => {
      const result = optimizeFormula(
        "weight / (height * height)",
      );
      expect(result).toBe(
        "weight / (height ** 2)",
      );
    });

    it("should not change a simple variable expression", () => {
      expect(optimizeFormula("x")).toBe("x");
    });

    it("should not change a normal expression", () => {
      expect(optimizeFormula("a + b")).toBe(
        "a + b",
      );
    });
  });
});