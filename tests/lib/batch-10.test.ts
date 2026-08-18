/**
 * Batch 10 — Regression Tests
 *
 * Accessibility Hardening + Dead Code Cleanup
 *
 * Covers:
 * 1. Dead code removal verification
 * 2. Favorites clear API contract
 * 3. Toolbar accessibility source contracts
 * 4. Result-card accessibility source contracts
 * 5. Form-field aria-required source contracts
 * 6. Mobile nav accessibility source contracts
 * 7. Decorative icon accessibility source contracts
 * 8. Registry dead searchCalculators removal
 * 9. Barrel export cleanup
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

/* ------------------------------------------------------------------
   1. Dead code removal — file existence checks
   ------------------------------------------------------------------ */

import { existsSync } from "fs";

describe("dead code removal (Batch 10)", () => {
  const targets = [
    "lib/formula-engine/formula-engine.ts",
    "lib/formula-engine/formulas.ts",
    "lib/formula-engine/formula.types.ts",
    "lib/calculators/result-engine.ts",
    "lib/calculators/clinical-pearl.tsx",
    "lib/calculators/utils/renal.ts",
    "lib/calculators/utils/validation.ts",
    "lib/favorites/storage.ts",
    "components/ui/stat-card.tsx",
  ];

  for (const target of targets) {
    it(`${target} is removed`, () => {
      expect(existsSync(join(__dirname, "../../", target))).toBe(false);
    });
  }

  it("components/layout/heading/ directory is removed", () => {
    expect(existsSync(join(__dirname, "../../components/layout/heading"))).toBe(false);
  });

  it("components/ui/badge/ directory is removed", () => {
    expect(existsSync(join(__dirname, "../../components/ui/badge"))).toBe(false);
  });
});

/* ------------------------------------------------------------------
   2. Favorites clear API contract
   ------------------------------------------------------------------ */

import { existsSync as fsExists } from "fs";

describe("favorites API contract", () => {
  it("lib/favorites.ts exports clearFavorites", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/favorites.ts"),
      "utf-8",
    );
    expect(source).toContain("export function clearFavorites");
  });

  it("lib/favorites.ts exports removeFavorite", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/favorites.ts"),
      "utf-8",
    );
    expect(source).toContain("export function removeFavorite");
  });

  it("lib/favorites.ts exports addFavorite", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/favorites.ts"),
      "utf-8",
    );
    expect(source).toContain("export function addFavorite");
  });

  it("favorites page imports clearFavorites", () => {
    const source = readFileSync(
      join(__dirname, "../../app/favorites/page.tsx"),
      "utf-8",
    );
    expect(source).toContain("clearFavorites");
  });

  it("favorites page imports removeFavorite", () => {
    const source = readFileSync(
      join(__dirname, "../../app/favorites/page.tsx"),
      "utf-8",
    );
    expect(source).toContain("removeFavorite");
  });

  it("favorites page has clear all button", () => {
    const source = readFileSync(
      join(__dirname, "../../app/favorites/page.tsx"),
      "utf-8",
    );
    expect(source).toContain("Clear all");
  });

  it("favorites page has remove button per item", () => {
    const source = readFileSync(
      join(__dirname, "../../app/favorites/page.tsx"),
      "utf-8",
    );
    expect(source).toContain("Remove");
    expect(source).toContain("aria-label");
  });
});

/* ------------------------------------------------------------------
   3. Toolbar accessibility source contracts
   ------------------------------------------------------------------ */

describe("toolbar accessibility (Batch 10)", () => {
  const source = readFileSync(
    join(__dirname, "../../components/calculators/toolbar/calculator-toolbar.tsx"),
    "utf-8",
  );

  it("Reset button has aria-label", () => {
    expect(source).toContain('aria-label="Reset calculator"');
  });

  it("Copy button has aria-label", () => {
    expect(source).toContain('aria-label="Copy result"');
  });

  it("Print button has aria-label", () => {
    expect(source).toContain('aria-label="Print result"');
  });

  it("Share button has aria-label", () => {
    expect(source).toContain('aria-label="Share calculator"');
  });

  it("Save button has aria-label", () => {
    expect(source).toContain('aria-label="Save calculation"');
  });

  it("Favorite button has conditional aria-label", () => {
    expect(source).toContain('aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}');
  });

  it("all emoji are wrapped in aria-hidden spans", () => {
    expect(source).toContain('<span aria-hidden="true">🔄</span>');
    expect(source).toContain('<span aria-hidden="true">📋</span>');
    expect(source).toContain('<span aria-hidden="true">🖨️</span>');
    expect(source).toContain('<span aria-hidden="true">🔗</span>');
    expect(source).toContain('<span aria-hidden="true">{isFavorite ? "❤️" : "🤍"}</span>');
    expect(source).toContain('<span aria-hidden="true">💾</span>');
  });
});

/* ------------------------------------------------------------------
   4. Result-card accessibility source contracts
   ------------------------------------------------------------------ */

describe("result-card accessibility (Batch 10)", () => {
  const source = readFileSync(
    join(__dirname, "../../components/calculators/result-card.tsx"),
    "utf-8",
  );

  it("result value has aria-live=\"polite\"", () => {
    expect(source).toContain('aria-live="polite"');
  });

  it("section has aria-label", () => {
    expect(source).toContain('aria-label="Calculation result"');
  });

  it("disclaimer uses WCAG-AA contrast (text-slate-600)", () => {
    expect(source).toContain("text-slate-600");
    expect(source).not.toMatch(/text-slate-500.* Estimates/);
  });

  it("dark mode disclaimer uses sufficient contrast (text-slate-300)", () => {
    expect(source).toContain("dark:text-slate-300");
  });
});

/* ------------------------------------------------------------------
   5. Form-field aria-required source contracts
   ------------------------------------------------------------------ */

describe("form-field aria-required (Batch 10)", () => {
  const formFieldSource = readFileSync(
    join(__dirname, "../../components/calculators/form-field/form-field.tsx"),
    "utf-8",
  );

  it("Input receives aria-required when input.required is true", () => {
    expect(formFieldSource).toContain('aria-required={input.required || undefined}');
  });

  it("Select receives aria-required when input.required is true", () => {
    // Both Input and Select should have it — the source uses the same pattern
    const matches = formFieldSource.match(/aria-required=\{input\.required \|\| undefined\}/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  it("preserves native required attribute", () => {
    expect(formFieldSource).toContain('required={input.required}');
  });

  it("preserves aria-describedby", () => {
    expect(formFieldSource).toContain("aria-describedby={describedBy}");
  });

  it("preserves aria-invalid via error prop", () => {
    expect(formFieldSource).toContain("error={!!error}");
  });
});

/* ------------------------------------------------------------------
   6. Mobile nav accessibility source contracts
   ------------------------------------------------------------------ */

describe("mobile nav accessibility (Batch 10)", () => {
  const source = readFileSync(
    join(__dirname, "../../components/navbar.tsx"),
    "utf-8",
  );

  it("mobile dialog has aria-modal=\"true\"", () => {
    expect(source).toContain('aria-modal="true"');
  });

  it("mobile dialog has role=\"dialog\"", () => {
    expect(source).toContain('role="dialog"');
  });

  it("mobile dialog has aria-label", () => {
    expect(source).toContain('aria-label="Navigation menu"');
  });

  it("focus trap function exists", () => {
    expect(source).toContain("getMobileFocusableElements");
  });

  it("Tab key handling for focus trap exists", () => {
    expect(source).toContain('e.key === "Tab"');
  });

  it("Shift+Tab reverse cycling exists", () => {
    expect(source).toContain("e.shiftKey");
  });

  it("Escape key still closes and returns focus", () => {
    expect(source).toContain('e.key === "Escape"');
    expect(source).toContain("buttonRef.current?.focus()");
  });
});

/* ------------------------------------------------------------------
   7. Decorative icon accessibility source contracts
   ------------------------------------------------------------------ */

describe("decorative icon accessibility (Batch 10)", () => {
  it("navbar desktop icons have aria-hidden", () => {
    const source = readFileSync(
      join(__dirname, "../../components/navbar.tsx"),
      "utf-8",
    );
    expect(source).toContain('<Icon className="h-4 w-4" aria-hidden="true" />');
  });

  it("specialty-card icon is wrapped in aria-hidden span", () => {
    const source = readFileSync(
      join(__dirname, "../../components/home/specialty-card.tsx"),
      "utf-8",
    );
    expect(source).toContain('<span aria-hidden="true">{icon}</span>');
  });

  it("specialties page uses unique link text with sr-only", () => {
    const source = readFileSync(
      join(__dirname, "../../app/specialties/[slug]/page.tsx"),
      "utf-8",
    );
    expect(source).toContain("sr-only");
    expect(source).toContain("Open ");
  });
});

/* ------------------------------------------------------------------
   8. Registry dead searchCalculators removal
   ------------------------------------------------------------------ */

describe("registry dead searchCalculators removal", () => {
  it("searchCalculators is no longer exported from registry", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/calculators/registry.ts"),
      "utf-8",
    );
    expect(source).not.toContain("export function searchCalculators");
  });

  it("registry still exports calculatorRegistry", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/calculators/registry.ts"),
      "utf-8",
    );
    expect(source).toContain("export const calculatorRegistry");
  });

  it("registry still exports getCalculatorById", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/calculators/registry.ts"),
      "utf-8",
    );
    expect(source).toContain("export function getCalculatorById");
  });

  it("registry still exports getFeaturedCalculators", () => {
    const source = readFileSync(
      join(__dirname, "../../lib/calculators/registry.ts"),
      "utf-8",
    );
    expect(source).toContain("export function getFeaturedCalculators");
  });
});

/* ------------------------------------------------------------------
   9. Barrel export cleanup
   ------------------------------------------------------------------ */

describe("barrel export cleanup", () => {
  it("components/ui/index.ts no longer exports badge", () => {
    const source = readFileSync(
      join(__dirname, "../../components/ui/index.ts"),
      "utf-8",
    );
    expect(source).not.toContain("badge");
  });

  it("components/layout/index.ts no longer exports heading", () => {
    const source = readFileSync(
      join(__dirname, "../../components/layout/index.ts"),
      "utf-8",
    );
    expect(source).not.toContain("heading");
  });

  it("components/ui/index.ts still exports button and input", () => {
    const source = readFileSync(
      join(__dirname, "../../components/ui/index.ts"),
      "utf-8",
    );
    expect(source).toContain("button");
    expect(source).toContain("input");
  });

  it("components/layout/index.ts still exports container", () => {
    const source = readFileSync(
      join(__dirname, "../../components/layout/index.ts"),
      "utf-8",
    );
    expect(source).toContain("container");
  });
});
