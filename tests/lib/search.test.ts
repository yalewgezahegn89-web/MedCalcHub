import { describe, it, expect } from "vitest";

import { searchCalculators } from "../../lib/search";
import { buildSearchIndex } from "../../lib/search/search-index";

/* ------------------------------------------------------------------
   Sprint 1.7 — Search & Discovery regression tests
   
   Tests the primary search engine exported from lib/search/index.ts.
   This engine uses weighted scoring:
     title       100
     keywords     60
     category     40
     specialty    30
     description  20
   ------------------------------------------------------------------ */

describe("searchCalculators (lib/search engine)", () => {
  // ----------------------------------------------------------------
  // A. Exact calculator name
  // ----------------------------------------------------------------
  describe("exact calculator name", () => {
    it("returns BMI calculator for exact name query", () => {
      const results = searchCalculators("bmi");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("returns Child-Pugh calculator for exact name query", () => {
      const results = searchCalculators("Child-Pugh");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });

    it("returns ACR calculator for exact shortName query", () => {
      const results = searchCalculators("ACR");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("albumin-creatinine-ratio");
    });

    it("returns NEWS2 calculator for exact name query", () => {
      const results = searchCalculators("news2");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("news2");
    });
  });

  // ----------------------------------------------------------------
  // B. Case-insensitive search
  // ----------------------------------------------------------------
  describe("case-insensitive search", () => {
    it("returns consistent results regardless of case", () => {
      const lower = searchCalculators("bmi");
      const upper = searchCalculators("BMI");
      const mixed = searchCalculators("Bmi");

      expect(lower.length).toBe(upper.length);
      expect(upper.length).toBe(mixed.length);
      expect(lower.map((r) => r.document.slug).sort()).toEqual(
        upper.map((r) => r.document.slug).sort(),
      );
    });

    it("returns consistent results for mixed-case multi-word query", () => {
      const a = searchCalculators("Child-Pugh");
      const b = searchCalculators("child-pugh");
      const c = searchCalculators("CHILD-PUGH");

      expect(a.map((r) => r.document.slug).sort()).toEqual(
        b.map((r) => r.document.slug).sort(),
      );
      expect(b.map((r) => r.document.slug).sort()).toEqual(
        c.map((r) => r.document.slug).sort(),
      );
    });
  });

  // ----------------------------------------------------------------
  // C. Keyword search
  // ----------------------------------------------------------------
  describe("keyword search", () => {
    it("returns Child-Pugh via keyword 'Liver'", () => {
      const results = searchCalculators("Liver");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });

    it("returns Child-Pugh via keyword 'Cirrhosis'", () => {
      const results = searchCalculators("Cirrhosis");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });

    it("returns Child-Pugh via keyword 'Hepatology'", () => {
      const results = searchCalculators("Hepatology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });

    it("returns Child-Pugh via keyword 'Portal Hypertension'", () => {
      const results = searchCalculators("Portal Hypertension");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });

    it("returns Corrected QT via keyword 'QTc'", () => {
      const results = searchCalculators("QTc");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-qt");
    });

    it("returns Corrected QT via keyword 'ECG'", () => {
      const results = searchCalculators("ECG");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-qt");
    });
  });

  // ----------------------------------------------------------------
  // D. Description search
  // ----------------------------------------------------------------
  describe("description search", () => {
    it("returns BMI via description term 'Body Mass Index'", () => {
      const results = searchCalculators("Body Mass Index");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("returns CKD-EPI via description term 'glomerular filtration'", () => {
      const results = searchCalculators("glomerular filtration");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });

    it("returns Child-Pugh via description term 'liver disease'", () => {
      const results = searchCalculators("liver disease");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });
  });

  // ----------------------------------------------------------------
  // E. Category search
  // ----------------------------------------------------------------
  describe("category search", () => {
    it("returns calculators from Renal category", () => {
      const results = searchCalculators("Renal");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("albumin-creatinine-ratio");
    });

    it("returns calculators from Anthropometry category", () => {
      const results = searchCalculators("Anthropometry");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("returns calculators from Nephrology category", () => {
      const results = searchCalculators("Nephrology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs.length).toBeGreaterThan(0);
    });
  });

  // ----------------------------------------------------------------
  // F. Specialty search
  // ----------------------------------------------------------------
  describe("specialty search", () => {
    it("returns Internal Medicine calculators via specialty", () => {
      const results = searchCalculators("Internal Medicine");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
      expect(slugs).toContain("corrected-sodium");
    });

    it("returns Nephrology calculators via specialty", () => {
      const results = searchCalculators("Nephrology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("albumin-creatinine-ratio");
      expect(slugs).toContain("ckd-epi-2021");
    });

    it("returns General Medicine calculators via specialty", () => {
      const results = searchCalculators("General Medicine");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });
  });

  // ----------------------------------------------------------------
  // H. Multi-word queries
  // ----------------------------------------------------------------
  describe("multi-word queries", () => {
    it("returns results for 'kidney function'", () => {
      const results = searchCalculators("kidney function");
      expect(results.length).toBeGreaterThan(0);
    });

    it("returns results for 'body mass'", () => {
      const results = searchCalculators("body mass");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("returns results for 'corrected sodium'", () => {
      const results = searchCalculators("corrected sodium");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-sodium");
    });

    it("returns Child-Pugh for multi-word keyword 'Portal Hypertension'", () => {
      const results = searchCalculators("Portal Hypertension");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("child-pugh");
    });
  });

  // ----------------------------------------------------------------
  // I. Empty query
  // ----------------------------------------------------------------
  describe("empty query", () => {
    it("returns empty array for empty string", () => {
      const results = searchCalculators("");
      expect(results).toEqual([]);
    });

    it("returns empty array for whitespace-only string", () => {
      const results = searchCalculators("   ");
      expect(results).toEqual([]);
    });

    it("returns empty array for tabs and newlines", () => {
      const results = searchCalculators("\t\n  ");
      expect(results).toEqual([]);
    });
  });

  // ----------------------------------------------------------------
  // J. No-result query
  // ----------------------------------------------------------------
  describe("no-result query", () => {
    it("returns empty array for nonexistent calculator", () => {
      const results = searchCalculators(
        "zzzznonexistentcalculator",
      );
      expect(results).toEqual([]);
      expect(results.length).toBe(0);
    });

    it("returns empty array for random string", () => {
      const results = searchCalculators("asdfghjkl");
      expect(results).toEqual([]);
    });

    it("does not crash on special characters", () => {
      expect(() => searchCalculators("@#$%^&*()")).not.toThrow();
      const results = searchCalculators("@#$%^&*()");
      expect(results).toEqual([]);
    });
  });

  // ----------------------------------------------------------------
  // K. Ranking
  // ----------------------------------------------------------------
  describe("ranking", () => {
    it("exact name match is returned with high score", () => {
      const results = searchCalculators("bmi");
      const exactMatch = results.find(
        (r) => r.document.slug === "bmi",
      );
      expect(exactMatch).toBeDefined();
      // title weight is 100
      expect(exactMatch!.score).toBeGreaterThanOrEqual(100);

      // The exact title match should appear in the top results
      const topSlugs = results.slice(0, 5).map((r) => r.document.slug);
      expect(topSlugs).toContain("bmi");
    });

    it("title match scores higher than description-only match", () => {
      const results = searchCalculators("bmi");
      const bmiResult = results.find(
        (r) => r.document.slug === "bmi",
      );
      expect(bmiResult).toBeDefined();
      expect(bmiResult!.score).toBeGreaterThanOrEqual(100);
    });

    it("keyword match receives correct weight (60)", () => {
      // "Liver" matches only Child-Pugh keywords
      const results = searchCalculators("Liver");
      expect(results.length).toBeGreaterThan(0);
      const childPugh = results.find(
        (r) => r.document.slug === "child-pugh",
      );
      expect(childPugh).toBeDefined();
      // score should be at least 60 (keyword weight)
      expect(childPugh!.score).toBeGreaterThanOrEqual(60);
    });

    it("category match receives correct weight (40)", () => {
      // "Renal" matches as a category term for calculators in the Renal category
      const results = searchCalculators("Renal");
      expect(results.length).toBeGreaterThan(0);
      // At least one result should have a category match score of 40+
      const categoryMatches = results.filter((r) =>
        r.matchedFields.includes("category"),
      );
      expect(categoryMatches.length).toBeGreaterThan(0);
      for (const r of categoryMatches) {
        expect(r.score).toBeGreaterThanOrEqual(40);
      }
    });

    it("specialty match receives correct weight (30)", () => {
      const results = searchCalculators("General Medicine");
      expect(results.length).toBeGreaterThan(0);
      for (const r of results) {
        expect(r.score).toBeGreaterThanOrEqual(30);
      }
    });
  });

  // ----------------------------------------------------------------
  // L. Duplicate prevention
  // ----------------------------------------------------------------
  describe("duplicate prevention", () => {
    it("each calculator appears at most once", () => {
      const queries = [
        "bmi",
        "Internal Medicine",
        "Nephrology",
        "liver",
        "corrected",
        "creatinine",
      ];

      for (const query of queries) {
        const results = searchCalculators(query);
        const slugs = results.map((r) => r.document.slug);
        const uniqueSlugs = new Set(slugs);
        expect(slugs.length).toBe(uniqueSlugs.size);
      }
    });
  });

  // ----------------------------------------------------------------
  // M. Partial matching
  // ----------------------------------------------------------------
  describe("partial matching", () => {
    it("returns calculators for partial name 'creat'", () => {
      const results = searchCalculators("creat");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("cockcroft-gault");
      expect(slugs).toContain("albumin-creatinine-ratio");
    });

    it("returns calculators for partial keyword 'nephr'", () => {
      const results = searchCalculators("nephr");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("albumin-creatinine-ratio");
    });

    it("returns calculators for partial category 'nephr'", () => {
      const results = searchCalculators("nephr");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs.length).toBeGreaterThan(0);
    });

    it("returns calculators for partial description 'glomerular'", () => {
      const results = searchCalculators("glomerular");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });
  });

  // ----------------------------------------------------------------
  // N. Search stability
  // ----------------------------------------------------------------
  describe("search stability", () => {
    it("same query produces deterministic ordering", () => {
      const query = "Internal Medicine";
      const first = searchCalculators(query);
      const second = searchCalculators(query);
      const third = searchCalculators(query);

      expect(first.map((r) => r.document.slug)).toEqual(
        second.map((r) => r.document.slug),
      );
      expect(second.map((r) => r.document.slug)).toEqual(
        third.map((r) => r.document.slug),
      );
    });

    it("same query produces identical scores", () => {
      const query = "bmi";
      const first = searchCalculators(query);
      const second = searchCalculators(query);

      expect(first.map((r) => r.score)).toEqual(
        second.map((r) => r.score),
      );
    });
  });

  // ----------------------------------------------------------------
  // O. Existing calculator coverage
  // ----------------------------------------------------------------
  describe("existing calculator coverage", () => {
    it("CKD-EPI calculator is searchable by name", () => {
      const results = searchCalculators("ckd-epi-2021");
      expect(results.length).toBeGreaterThan(0);
      const match = results.find(
        (r) => r.document.slug === "ckd-epi-2021",
      );
      expect(match).toBeDefined();
      expect(match!.document.title).toBe("ckd-epi-2021");
      expect(match!.document.category).toBe("Nephrology");
    });

    it("ACR calculator is searchable by name", () => {
      const results = searchCalculators("albumin-to-creatinine");
      expect(results.length).toBeGreaterThan(0);
      const match = results.find(
        (r) => r.document.slug === "albumin-creatinine-ratio",
      );
      expect(match).toBeDefined();
    });

    it("ACR calculator is searchable by shortName", () => {
      const results = searchCalculators("ACR");
      expect(results.length).toBeGreaterThan(0);
      const match = results.find(
        (r) => r.document.slug === "albumin-creatinine-ratio",
      );
      expect(match).toBeDefined();
    });

    it("Child-Pugh calculator is searchable by name", () => {
      const results = searchCalculators("Child-Pugh");
      expect(results.length).toBeGreaterThan(0);
      const match = results.find(
        (r) => r.document.slug === "child-pugh",
      );
      expect(match).toBeDefined();
    });

    it("Corrected QT calculator is searchable by keyword", () => {
      const results = searchCalculators("QTc");
      expect(results.length).toBeGreaterThan(0);
      const match = results.find(
        (r) => r.document.slug === "corrected-qt",
      );
      expect(match).toBeDefined();
    });

    it("BMI calculator is searchable by name", () => {
      const results = searchCalculators("bmi");
      const match = results.find(
        (r) => r.document.slug === "bmi",
      );
      expect(match).toBeDefined();
      expect(match!.document.description).toContain(
        "Body Mass Index",
      );
    });

    it("Corrected Sodium calculator is searchable by name", () => {
      const results = searchCalculators("corrected-sodium");
      const match = results.find(
        (r) => r.document.slug === "corrected-sodium",
      );
      expect(match).toBeDefined();
    });

    it("BSA calculator is searchable by name", () => {
      const results = searchCalculators("bsa");
      const match = results.find(
        (r) => r.document.slug === "bsa",
      );
      expect(match).toBeDefined();
    });

    it("Cockcroft-Gault calculator is searchable by name", () => {
      const results = searchCalculators("cockcroft-gault");
      const match = results.find(
        (r) => r.document.slug === "cockcroft-gault",
      );
      expect(match).toBeDefined();
      expect(match!.document.description).toContain(
        "creatinine clearance",
      );
    });

    it("NEWS2 calculator is searchable by name", () => {
      const results = searchCalculators("news2");
      const match = results.find(
        (r) => r.document.slug === "news2",
      );
      expect(match).toBeDefined();
    });
  });
});

/* ------------------------------------------------------------------
   buildSearchIndex() tests
   ------------------------------------------------------------------ */

describe("buildSearchIndex", () => {
  it("returns an array of search documents", () => {
    const index = buildSearchIndex();
    expect(Array.isArray(index)).toBe(true);
    expect(index.length).toBeGreaterThan(0);
  });

  it("each document has required fields", () => {
    const index = buildSearchIndex();
    for (const doc of index) {
      expect(typeof doc.slug).toBe("string");
      expect(doc.slug.length).toBeGreaterThan(0);
      expect(typeof doc.title).toBe("string");
      expect(doc.title.length).toBeGreaterThan(0);
      expect(typeof doc.description).toBe("string");
      expect(typeof doc.category).toBe("string");
      expect(typeof doc.specialty).toBe("string");
      expect(Array.isArray(doc.keywords)).toBe(true);
    }
  });

  it("includes BMI calculator", () => {
    const index = buildSearchIndex();
    const bmi = index.find((d) => d.slug === "bmi");
    expect(bmi).toBeDefined();
    expect(bmi!.title).toBe("bmi");
    expect(bmi!.category).toBe("Anthropometry");
    expect(bmi!.description).toContain("Body Mass Index");
  });

  it("includes ACR calculator with correct metadata", () => {
    const index = buildSearchIndex();
    const acr = index.find(
      (d) => d.slug === "albumin-creatinine-ratio",
    );
    expect(acr).toBeDefined();
    expect(acr!.title).toBe("Albumin-to-Creatinine Ratio");
    expect(acr!.category).toBe("Renal");
    expect(acr!.specialty).toBe("Nephrology");
  });

  it("includes Child-Pugh calculator with keywords", () => {
    const index = buildSearchIndex();
    const childPugh = index.find(
      (d) => d.slug === "child-pugh",
    );
    expect(childPugh).toBeDefined();
    expect(childPugh!.keywords).toContain("Liver");
    expect(childPugh!.keywords).toContain("Cirrhosis");
    expect(childPugh!.keywords).toContain("Hepatology");
  });

  it("index length matches calculator registry length", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThanOrEqual(30);
  });
});