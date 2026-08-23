/**
 * Repository Integrity Tests
 *
 * Reliability Batch 6 — metadata reconciliation.
 * Guards against orphan companion metadata, dead legacy related modules,
 * and broken internal references introduced by future changes.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { clinicalContentRegistry } from "@/lib/clinical-content";

const ROOT = process.cwd();
const METADATA_ROOT = path.join(ROOT, "lib", "calculators");
const METADATA_DIRS = ["clinical", "comparisons", "evidence", "faqs", "related"];
const SOURCE_ROOTS = ["lib", "app", "components"];

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const SOURCE_CACHE = SOURCE_ROOTS.flatMap((root) =>
  walk(path.join(ROOT, root))
    .filter(
      (f) => !f.includes("node_modules") && /\.(ts|tsx)$/.test(f),
    )
    .map((f) => ({ file: f, text: fs.readFileSync(f, "utf8") })),
);

const METADATA_CACHE = METADATA_DIRS.flatMap((dir) =>
  walk(path.join(METADATA_ROOT, dir))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => ({
      dir,
      slug: path.basename(f, ".ts"),
      file: path.relative(ROOT, f),
      content: fs.readFileSync(f, "utf8"),
    })),
);

function extractStringList(text: string, match: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = match.exec(text)) !== null) out.push(m[1]);
  return out;
}

const registered = calculatorRegistry;
const registeredSlugs = new Set(registered.map((c) => c.slug));
const registeredIds = new Set(registered.map((c) => c.id));

const topLevelCalculatorFiles = new Set(
  walk(METADATA_ROOT)
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        METADATA_DIRS.every((d) => !f.includes(`${path.sep}${d}${path.sep}`)) &&
        /slug:\s*"[^"]+"/.test(fs.readFileSync(f, "utf8")),
    )
    .map((f) => path.basename(f, ".ts")),
);

describe("Calculator Metadata Repository Integrity", () => {
  it("no orphan ckd-epi companion metadata files remain", () => {
    const orphans = METADATA_CACHE.filter((f) => f.slug === "ckd-epi");
    expect(orphans).toHaveLength(0);
  });

  it("the dead legacy related module does not exist or remain referenced", () => {
    expect(
      fs.existsSync(path.join(METADATA_ROOT, "related.ts")),
    ).toBe(false);
    expect(
      fs.existsSync(path.join(METADATA_ROOT, "related-calculators.tsx")),
    ).toBe(false);

    const references = SOURCE_CACHE.filter((s) =>
      s.text.includes("lib/calculators/related"),
    );
    expect(references.map((s) => s.file)).toHaveLength(0);
  });

  it("every metadata companion belongs to a registered calculator", () => {
    for (const f of METADATA_CACHE) {
      const owned =
        registeredSlugs.has(f.slug) ||
        registeredIds.has(f.slug) ||
        topLevelCalculatorFiles.has(f.slug);
      expect(
        owned,
        `${f.file} has no registered calculator owner (slug "${f.slug}")`,
      ).toBe(true);
    }
  });

  it("every active (imported) metadata companion belongs to a registered calculator", () => {
    for (const f of METADATA_CACHE) {
      const imported = SOURCE_CACHE.some((s) =>
        s.text.includes(`${f.dir}/${f.slug}`),
      );
      if (!imported) continue;
      const owned =
        registeredSlugs.has(f.slug) ||
        registeredIds.has(f.slug) ||
        topLevelCalculatorFiles.has(f.slug);
      expect(
        owned,
        `${f.file} is imported but has no registered calculator owner`,
      ).toBe(true);
    }
  });

  it("comparison hrefs resolve to a registered calculator", () => {
    for (const f of METADATA_CACHE) {
      if (f.dir !== "comparisons") continue;
      const imported = SOURCE_CACHE.some((s) =>
        s.text.includes(`${f.dir}/${f.slug}`),
      );
      const hrefs = extractStringList(
        f.content,
        /href:\s*"\/calculators\/([^"]+)"/g,
      );
      for (const href of hrefs) {
        const resolvesToSlug = registeredSlugs.has(href);
        const resolvesToId = registeredIds.has(href);
        if (imported) {
          expect(
            resolvesToSlug,
            `${f.file}: imported comparison href "/calculators/${href}" is not a registered calculator slug`,
          ).toBe(true);
        } else {
          expect(
            resolvesToSlug || resolvesToId,
            `${f.file}: href "/calculators/${href}" does not resolve to any registered calculator`,
          ).toBe(true);
        }
      }
    }
  });

  it("every related companion reference resolves to a registered calculator id", () => {
    for (const f of METADATA_CACHE) {
      if (f.dir !== "related") continue;
      const arrayMatch = f.content.match(/=\s*\[([\s\S]*?)\]/);
      expect(arrayMatch, `${f.file} must export a string array`).toBeTruthy();
      const refs = extractStringList(arrayMatch![1], /"([^"]+)"/g);
      for (const ref of refs) {
        expect(
          registeredIds.has(ref),
          `${f.file}: references "${ref}" which is not a registered calculator id`,
        ).toBe(true);
      }
    }
  });

  it("no comparison companion lists the same target twice", () => {
    for (const f of METADATA_CACHE) {
      if (f.dir !== "comparisons") continue;
      const hrefs = extractStringList(
        f.content,
        /href:\s*"\/calculators\/([^"]+)"/g,
      );
      const unique = new Set(hrefs);
      expect(
        unique.size,
        `${f.file} contains duplicate comparison targets`,
      ).toBe(hrefs.length);
    }
  });

  it("no related companion lists the same id twice", () => {
    for (const f of METADATA_CACHE) {
      if (f.dir !== "related") continue;
      const arrayMatch = f.content.match(/=\s*\[([\s\S]*?)\]/);
      const refs = extractStringList(arrayMatch![1], /"([^"]+)"/g);
      const unique = new Set(refs);
      expect(unique.size, `${f.file} contains duplicate related ids`).toBe(
        refs.length,
      );
    }
  });

  it("registry integrity remains intact (143 unique calculators)", () => {
    expect(registered).toHaveLength(143);
    expect(new Set(registered.map((c) => c.id)).size).toBe(registered.length);
    expect(new Set(registered.map((c) => c.slug)).size).toBe(registered.length);
  });

  it("every ClinicalContent key maps to a registered calculator slug", () => {
    expect(Object.keys(clinicalContentRegistry).length).toBeGreaterThan(0);
    for (const slug of Object.keys(clinicalContentRegistry)) {
      expect(
        registeredSlugs.has(slug),
        `clinical content for "${slug}" has no registered calculator`,
      ).toBe(true);
    }
  });

  it("all 143 registered calculators remain resolvable by id and slug", () => {
    for (const calc of registered) {
      const byId = registered.find((c) => c.id === calc.id);
      const bySlug = registered.find((c) => c.slug === calc.slug);
      expect(byId).toBe(calc);
      expect(bySlug).toBe(calc);
    }
  });

  it("all relatedCalculators references resolve to registered calculator slugs", () => {
    for (const calc of registered) {
      if (!calc.relatedCalculators) continue;
      for (const ref of calc.relatedCalculators) {
        expect(
          registeredSlugs.has(ref),
          `${calc.slug}.relatedCalculators contains "${ref}" which is not a registered calculator slug`,
        ).toBe(true);
      }
    }
  });

  it("no calculator has itself in its relatedCalculators", () => {
    for (const calc of registered) {
      if (!calc.relatedCalculators) continue;
      expect(
        calc.relatedCalculators,
      ).not.toContain(calc.slug);
    }
  });

  it("no duplicate entries in any relatedCalculators array", () => {
    for (const calc of registered) {
      if (!calc.relatedCalculators) continue;
      const unique = new Set(calc.relatedCalculators);
      expect(
        unique.size,
        `${calc.slug}.relatedCalculators contains duplicates`,
      ).toBe(calc.relatedCalculators.length);
    }
  });

  it("albumin-globulin-ratio contains only valid corrected slugs", () => {
    const calc = registered.find((c) => c.id === "albumin-globulin-ratio");
    expect(calc).toBeDefined();
    expect(calc!.relatedCalculators).toEqual(
      expect.arrayContaining(["meld-score", "fib-4-index"]),
    );
    expect(calc!.relatedCalculators).not.toContain("meld");
    expect(calc!.relatedCalculators).not.toContain("fib-4");
  });

  it("saag contains corrected MELD slugs", () => {
    const calc = registered.find((c) => c.id === "saag");
    expect(calc).toBeDefined();
    expect(calc!.relatedCalculators).toEqual(
      expect.arrayContaining(["meld-score", "meld-na-score"]),
    );
    expect(calc!.relatedCalculators).not.toContain("meld");
    expect(calc!.relatedCalculators).not.toContain("meld-na");
  });

  it("rumack-matthew contains corrected MELD slugs", () => {
    const calc = registered.find((c) => c.id === "rumack-matthew");
    expect(calc).toBeDefined();
    expect(calc!.relatedCalculators).toEqual(
      expect.arrayContaining(["meld-score", "meld-na-score"]),
    );
    expect(calc!.relatedCalculators).not.toContain("meld");
    expect(calc!.relatedCalculators).not.toContain("meld-na");
  });

  it("albi-score contains all four corrected slugs", () => {
    const calc = registered.find((c) => c.id === "albi-score");
    expect(calc).toBeDefined();
    expect(calc!.relatedCalculators).toEqual(
      expect.arrayContaining([
        "meld-score",
        "meld-na-score",
        "apri-score",
        "fib-4-index",
      ]),
    );
    expect(calc!.relatedCalculators).not.toContain("meld");
    expect(calc!.relatedCalculators).not.toContain("meld-na");
    expect(calc!.relatedCalculators).not.toContain("apri");
    expect(calc!.relatedCalculators).not.toContain("fib-4");
  });

  it("none of the 10 stale slugs remain anywhere in active related-calculator metadata", () => {
    const staleSlugs = ["meld", "meld-na", "apri", "fib-4"];
    for (const calc of registered) {
      if (!calc.relatedCalculators) continue;
      for (const stale of staleSlugs) {
        expect(
          calc.relatedCalculators,
        ).not.toContain(stale);
      }
    }
  });

  it("every calculator has a non-empty human-readable name (no pure slug names)", () => {
    for (const calc of registered) {
      expect(calc.name).toBeTruthy();
      expect(calc.name.length).toBeGreaterThan(0);
      expect(
        /^[a-z0-9]+(-[a-z0-9]+)*$/.test(calc.name),
        `${calc.slug}: name "${calc.name}" is a pure slug — expected a human-readable display name`,
      ).toBe(false);
    }
  });

  it("every calculator has a specialty value", () => {
    for (const calc of registered) {
      expect(
        calc.specialty,
        `${calc.slug}: missing specialty`,
      ).toBeTruthy();
      expect(typeof calc.specialty).toBe("string");
    }
  });

  it("all specialty values belong to the existing taxonomy", () => {
    const validSpecialties = new Set([
      "Cardiology",
      "Critical Care",
      "Emergency Medicine",
      "Endocrinology",
      "Gastroenterology",
      "General Medicine",
      "Internal Medicine",
      "Nephrology",
      "Neurology",
      "Obstetrics",
      "Pediatrics",
      "Pulmonology",
    ]);
    for (const calc of registered) {
      expect(
        validSpecialties.has(calc.specialty!),
        `${calc.slug}: specialty "${calc.specialty}" is not in the valid taxonomy`,
      ).toBe(true);
    }
  });

  it("ACR category is Nephrology (not Renal)", () => {
    const acr = registered.find((c) => c.id === "albumin-creatinine-ratio");
    expect(acr).toBeDefined();
    expect(acr!.category).toBe("Nephrology");
  });

  it("gestational-weight-gain category is Obstetrics & Gynecology", () => {
    const gw = registered.find((c) => c.slug === "gestational-weight-gain");
    expect(gw).toBeDefined();
    expect(gw!.category).toBe("Obstetrics & Gynecology");
  });
});
