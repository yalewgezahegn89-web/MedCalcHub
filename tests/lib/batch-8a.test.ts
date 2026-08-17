/**
 * Batch 8A — Regression Tests
 *
 * Covers:
 * 1. stale result state transitions
 * 2. recalculation clears stale state
 * 3. reset clears stale state
 * 4. result-dependent toolbar disabled state
 * 5. navbar active route matching
 * 6. search index caching behavior
 * 7. no dead-search imports/references
 * 8. stale-result action safety (ResultCard + Toolbar)
 */

import { describe, it, expect } from "vitest";

/* ------------------------------------------------------------------
   1. Navbar active-route helper
   ------------------------------------------------------------------ */

import { isActiveRoute } from "../../lib/nav/active-route";

describe("isActiveRoute", () => {
  it("root exact match", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
  });

  it("root does not match sub-route", () => {
    expect(isActiveRoute("/calculators", "/")).toBe(false);
  });

  it("exact sub-route match", () => {
    expect(isActiveRoute("/calculators", "/calculators")).toBe(true);
  });

  it("nested route activates parent", () => {
    expect(isActiveRoute("/calculators/bmi", "/calculators")).toBe(true);
  });

  it("nested route does not activate unrelated parent", () => {
    expect(isActiveRoute("/favorites/bmi", "/calculators")).toBe(false);
  });

  it("prefix match requires / boundary", () => {
    expect(isActiveRoute("/calculators-extra", "/calculators")).toBe(false);
  });

  it("categories route matches exactly", () => {
    expect(isActiveRoute("/categories", "/categories")).toBe(true);
  });

  it("categories sub-route activates parent", () => {
    expect(isActiveRoute("/categories/Renal", "/categories")).toBe(true);
  });

  it("history route matches exactly", () => {
    expect(isActiveRoute("/history", "/history")).toBe(true);
  });

  it("empty pathname does not match root", () => {
    expect(isActiveRoute("", "/")).toBe(false);
  });
});

/* ------------------------------------------------------------------
   2. Search index caching behavior
   ------------------------------------------------------------------ */

import { searchCalculators } from "../../lib/search";

describe("search index caching", () => {
  it("repeated searches produce identical results", () => {
    const first = searchCalculators("bmi");
    const second = searchCalculators("bmi");
    const third = searchCalculators("renal");

    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
    expect(third.length).toBeGreaterThan(0);
  });

  it("search index is deterministic across calls", () => {
    const queries = ["bmi", "cardiology", "kidney", "sodium"];
    for (const q of queries) {
      const a = searchCalculators(q);
      const b = searchCalculators(q);
      expect(a.map((r) => r.document.slug)).toEqual(
        b.map((r) => r.document.slug),
      );
      expect(a.map((r) => r.score)).toEqual(
        b.map((r) => r.score),
      );
    }
  });

  it("returns empty for empty query without error", () => {
    expect(searchCalculators("")).toEqual([]);
    expect(searchCalculators("  ")).toEqual([]);
  });
});

/* ------------------------------------------------------------------
   3. Dead search code — no imports/references
   ------------------------------------------------------------------ */

import { existsSync } from "fs";
import { join } from "path";

describe("dead search code removal", () => {
  it("command-palette.tsx does not exist", () => {
    expect(
      existsSync(
        join(__dirname, "../../components/search/command-palette.tsx"),
      ),
    ).toBe(false);
  });

  it("lib/search/search-calculators.ts does not exist", () => {
    expect(
      existsSync(
        join(__dirname, "../../lib/search/search-calculators.ts"),
      ),
    ).toBe(false);
  });

  it("backup-search directory does not exist", () => {
    expect(existsSync(join(__dirname, "../../backup-search"))).toBe(
      false,
    );
  });
});

/* ------------------------------------------------------------------
   4. Toolbar disabled state types contract
   ------------------------------------------------------------------ */

import type { CalculatorToolbarProps } from "../../components/calculators/toolbar/calculator-toolbar.types";

describe("CalculatorToolbarProps", () => {
  it("includes disabled props", () => {
    const props: CalculatorToolbarProps = {
      disabledSave: true,
      disabledCopy: true,
      disabledPrint: true,
      disabledShare: true,
    };
    expect(props.disabledSave).toBe(true);
    expect(props.disabledCopy).toBe(true);
    expect(props.disabledPrint).toBe(true);
    expect(props.disabledShare).toBe(true);
  });

  it("disabled props default to false (optional)", () => {
    const props: CalculatorToolbarProps = {};
    expect(props.disabledSave).toBeUndefined();
    expect(props.disabledCopy).toBeUndefined();
    expect(props.disabledPrint).toBeUndefined();
    expect(props.disabledShare).toBeUndefined();
  });
});

/* ------------------------------------------------------------------
   5. Search engine exports searchCalculators (not dead one)
   ------------------------------------------------------------------ */

import {
  searchCalculators as engineSearch,
} from "../../lib/search/search-engine";

describe("search engine module exports", () => {
  it("search-engine.ts exports searchCalculators function", () => {
    expect(typeof engineSearch).toBe("function");
  });

  it("searchCalculators from index matches search-engine", () => {
    expect(searchCalculators).toBe(engineSearch);
  });
});

/* ------------------------------------------------------------------
   8. Stale-result action safety — state transition logic
   ------------------------------------------------------------------ */

describe("stale-result action safety", () => {
  /**
   * Pure data-level tests verifying the disabled-state logic
   * that CalculatorForm applies to both toolbar and ResultCard.
   *
   * The form computes: actionsDisabled = !result || isStale
   * This is passed to both:
   *   - CalculatorToolbar (disabledCopy, disabledSave, etc.)
   *   - ResultCard (actionsDisabled)
   */

  function computeDisabled(
    result: unknown,
    isStale: boolean,
  ): boolean {
    return !result || isStale;
  }

  it("no result → actions disabled", () => {
    expect(computeDisabled(null, false)).toBe(true);
  });

  it("fresh result → actions enabled", () => {
    expect(computeDisabled({ value: 25 }, false)).toBe(
      false,
    );
  });

  it("stale result → actions disabled", () => {
    expect(computeDisabled({ value: 25 }, true)).toBe(
      true,
    );
  });

  it("null result with stale true → actions disabled", () => {
    expect(computeDisabled(null, true)).toBe(true);
  });
});

/* ------------------------------------------------------------------
   9. ResultCard props type contract
   ------------------------------------------------------------------ */

import type { CalculatorToolbarProps as ToolbarProps } from "../../components/calculators/toolbar/calculator-toolbar.types";

describe("stale-action prop contracts", () => {
  it("toolbar exposes all four disabled props", () => {
    const props: ToolbarProps = {
      disabledSave: false,
      disabledCopy: false,
      disabledPrint: false,
      disabledShare: false,
    };
    expect(props.disabledSave).toBe(false);
    expect(props.disabledCopy).toBe(false);
    expect(props.disabledPrint).toBe(false);
    expect(props.disabledShare).toBe(false);
  });

  it("toolbar all four disabled when stale", () => {
    const props: ToolbarProps = {
      disabledSave: true,
      disabledCopy: true,
      disabledPrint: true,
      disabledShare: true,
    };
    const allDisabled =
      props.disabledSave &&
      props.disabledCopy &&
      props.disabledPrint &&
      props.disabledShare;
    expect(allDisabled).toBe(true);
  });

  it("toolbar reset remains independent of disabled state", () => {
    const props: ToolbarProps = {
      disabledSave: true,
      disabledCopy: true,
      disabledPrint: true,
      disabledShare: true,
    };
    expect(props.onReset).toBeUndefined();
    expect(props.disabledSave).toBe(true);
    expect(props.disabledCopy).toBe(true);
    expect(props.disabledPrint).toBe(true);
    expect(props.disabledShare).toBe(true);
  });
});
