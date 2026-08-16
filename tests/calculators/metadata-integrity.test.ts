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

  it("registry integrity remains intact (125 unique calculators)", () => {
    expect(registered).toHaveLength(125);
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

  it("all 125 registered calculators remain resolvable by id and slug", () => {
    for (const calc of registered) {
      const byId = registered.find((c) => c.id === calc.id);
      const bySlug = registered.find((c) => c.slug === calc.slug);
      expect(byId).toBe(calc);
      expect(bySlug).toBe(calc);
    }
  });
});
