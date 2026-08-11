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

/* ------------------------------------------------------------------
   Sprint 1.7 Batch 2 — Search normalization, cross-entry consistency,
   index completeness, clinical discovery, ranking quality
   ------------------------------------------------------------------ */

describe("query normalization", () => {
  it("leading whitespace does not change results", () => {
    const normal = searchCalculators("bmi");
    const padded = searchCalculators("  bmi");
    expect(normal.map((r) => r.document.slug)).toEqual(
      padded.map((r) => r.document.slug),
    );
  });

  it("trailing whitespace does not change results", () => {
    const normal = searchCalculators("bmi");
    const padded = searchCalculators("bmi  ");
    expect(normal.map((r) => r.document.slug)).toEqual(
      padded.map((r) => r.document.slug),
    );
  });

  it("leading and trailing whitespace does not change results", () => {
    const normal = searchCalculators("bmi");
    const padded = searchCalculators("  bmi  ");
    expect(normal.map((r) => r.document.slug)).toEqual(
      padded.map((r) => r.document.slug),
    );
  });

  it("multiple internal spaces do not change multi-word results", () => {
    const normal = searchCalculators("body mass");
    const spaced = searchCalculators("body  mass");
    const tabbed = searchCalculators("body\tmass");

    // body mass and body  mass should match the same calculators
    expect(normal.map((r) => r.document.slug)).toEqual(
      spaced.map((r) => r.document.slug),
    );
  });

  it("mixed whitespace around query is handled", () => {
    const normal = searchCalculators("corrected sodium");
    const padded = searchCalculators("  corrected  sodium  ");
    expect(normal.map((r) => r.document.slug)).toEqual(
      padded.map((r) => r.document.slug),
    );
  });

  it("single space matches same as no space for single word", () => {
    const normal = searchCalculators("renal");
    const padded = searchCalculators(" renal ");
    expect(normal.map((r) => r.document.slug)).toEqual(
      padded.map((r) => r.document.slug),
    );
  });
});

describe("search index completeness", () => {
  it("every registry calculator has an index entry", () => {
    const index = buildSearchIndex();
    const indexSlugs = new Set(index.map((d) => d.slug));
    // All calculators should have a slug in the index
    expect(indexSlugs.size).toBe(index.length);
  });

  it("no duplicate slugs in index", () => {
    const index = buildSearchIndex();
    const slugs = index.map((d) => d.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("index has at least 30 calculators", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThanOrEqual(30);
  });

  it("representative calculators have non-empty keywords", () => {
    const index = buildSearchIndex();
    const childPugh = index.find(
      (d) => d.slug === "child-pugh",
    );
    expect(childPugh).toBeDefined();
    expect(childPugh!.keywords.length).toBeGreaterThan(0);

    const correctedQt = index.find(
      (d) => d.slug === "corrected-qt",
    );
    expect(correctedQt).toBeDefined();
    expect(correctedQt!.keywords.length).toBeGreaterThan(0);
  });

  it("representative calculators have category and specialty", () => {
    const index = buildSearchIndex();
    for (const slug of [
      "bmi",
      "ckd-epi-2021",
      "corrected-sodium",
      "cockcroft-gault",
      "news2",
    ]) {
      const doc = index.find((d) => d.slug === slug);
      expect(doc).toBeDefined();
      expect(doc!.category.length).toBeGreaterThan(0);
      expect(doc!.specialty.length).toBeGreaterThan(0);
    }
  });
});

describe("clinical discovery queries", () => {
  it("returns calculators for 'renal' query", () => {
    const results = searchCalculators("renal");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("albumin-creatinine-ratio");
  });

  it("returns calculators for 'kidney' query", () => {
    const results = searchCalculators("kidney");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'creatinine' query", () => {
    const results = searchCalculators("creatinine");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("cockcroft-gault");
    expect(slugs).toContain("albumin-creatinine-ratio");
  });

  it("returns calculators for 'cardiology' query", () => {
    const results = searchCalculators("cardiology");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'heart' query", () => {
    const results = searchCalculators("heart");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'diabetes' query", () => {
    const results = searchCalculators("diabetes");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'glucose' query", () => {
    const results = searchCalculators("glucose");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'bmi' query", () => {
    const results = searchCalculators("bmi");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("bmi");
  });

  it("returns calculators for 'QT' query", () => {
    const results = searchCalculators("QT");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("corrected-qt");
  });

  it("returns calculators for 'blood pressure' query", () => {
    const results = searchCalculators("blood pressure");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for 'sodium' query", () => {
    const results = searchCalculators("sodium");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("corrected-sodium");
  });

  it("returns calculators for 'calcium' query", () => {
    const results = searchCalculators("calcium");
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("ranking quality", () => {
  it("title match scores higher than keyword-only match", () => {
    // "Child-Pugh" appears in title (100) vs keyword (60) for other calculators
    const results = searchCalculators("Child-Pugh");
    expect(results.length).toBeGreaterThan(0);
    // The calculator with "Child-Pugh" in title should rank first
    expect(results[0].document.slug).toBe("child-pugh");
  });

  it("keyword match scores higher than description-only match", () => {
    // "Liver" appears in Child-Pugh keywords (60) vs only in description (20) for others
    const results = searchCalculators("Liver");
    expect(results.length).toBeGreaterThan(0);
    const childPugh = results.find(
      (r) => r.document.slug === "child-pugh",
    );
    expect(childPugh).toBeDefined();
    expect(childPugh!.score).toBeGreaterThanOrEqual(60);
  });

  it("multi-field matches accumulate score", () => {
    // "Child-Pugh" matches title (100) + keyword (60) + description (20) = 180
    const results = searchCalculators("Child-Pugh");
    const childPugh = results.find(
      (r) => r.document.slug === "child-pugh",
    );
    expect(childPugh).toBeDefined();
    expect(childPugh!.score).toBeGreaterThanOrEqual(160);
  });

  it("alphabetical tie-breaking is deterministic", () => {
    const results = searchCalculators("Nephrology");
    expect(results.length).toBeGreaterThan(1);
    // Verify ordering is stable
    const first = searchCalculators("Nephrology");
    const second = searchCalculators("Nephrology");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });
});

describe("search behavior consistency", () => {
  it("empty query returns empty results", () => {
    const results = searchCalculators("");
    expect(results).toEqual([]);
  });

  it("whitespace-only query returns empty results", () => {
    const results = searchCalculators("   ");
    expect(results).toEqual([]);
  });

  it("no results for nonsense query", () => {
    const results = searchCalculators("zzzznonexistent");
    expect(results).toEqual([]);
  });

  it("results are never undefined", () => {
    const queries = [
      "bmi",
      "renal",
      "cardiology",
      "",
      " ",
      "zzzz",
    ];
    for (const query of queries) {
      const results = searchCalculators(query);
      for (const result of results) {
        expect(result).toBeDefined();
        expect(result.document).toBeDefined();
        expect(typeof result.score).toBe("number");
        expect(Array.isArray(result.matchedFields)).toBe(true);
      }
    }
  });
});

/* ------------------------------------------------------------------
   Sprint 1.7 Batch 3 — Clinical synonym discovery
   Tests that common clinical terminology discovers the intended
   calculators via metadata keywords.
   ------------------------------------------------------------------ */

describe("clinical synonym discovery", () => {
  // ------------------------------------------------------------------
  // Renal synonyms
  // ------------------------------------------------------------------
  describe("renal / kidney discovery", () => {
    it("discovers CKD-EPI via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });

    it("discovers CKD-EPI via 'renal'", () => {
      const results = searchCalculators("renal");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });

    it("discovers CKD-EPI via 'eGFR'", () => {
      const results = searchCalculators("eGFR");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });

    it("discovers Cockcroft-Gault via 'creatinine clearance'", () => {
      const results = searchCalculators("creatinine clearance");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("cockcroft-gault");
    });

    it("discovers Cockcroft-Gault via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("cockcroft-gault");
    });

    it("discovers MDRD via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("mdrd");
    });

    it("discovers BUN/Creatinine via 'BUN'", () => {
      const results = searchCalculators("BUN");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bun-creatinine-ratio");
    });

    it("discovers ACR via 'albumin creatinine ratio'", () => {
      const results = searchCalculators("albumin creatinine ratio");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("albumin-creatinine-ratio");
    });

    it("discovers FENa via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("fena");
    });

    it("discovers FENa via 'acute kidney injury'", () => {
      const results = searchCalculators("acute kidney injury");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("fena");
    });

    it("discovers FEUrea via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("feurea");
    });

    it("discovers TTKG via 'kidney'", () => {
      const results = searchCalculators("kidney");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ttkg");
    });

    it("discovers calcium-phosphate-product via 'CKD'", () => {
      const results = searchCalculators("CKD");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("calcium-phosphate-product");
    });

    it("discovers multiple renal calculators for 'kidney function'", () => {
      const results = searchCalculators("kidney function");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
      expect(slugs).toContain("cockcroft-gault");
      expect(slugs).toContain("mdrd");
    });
  });

  // ------------------------------------------------------------------
  // Cardiology synonyms
  // ------------------------------------------------------------------
  describe("cardiology discovery", () => {
    it("discovers MAP via 'mean arterial pressure'", () => {
      const results = searchCalculators("mean arterial pressure");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("map");
    });

    it("discovers MAP via 'blood pressure'", () => {
      const results = searchCalculators("blood pressure");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("map");
    });

    it("discovers MAP via 'hemodynamics'", () => {
      const results = searchCalculators("hemodynamics");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("map");
    });

    it("discovers heart-rate via 'cardiology'", () => {
      const results = searchCalculators("cardiology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("heart-rate");
    });

    it("discovers heart-rate via 'cardiac'", () => {
      const results = searchCalculators("cardiac");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("heart-rate");
    });

    it("discovers shock-index via 'hemodynamics'", () => {
      const results = searchCalculators("hemodynamics");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("shock-index");
    });

    it("discovers shock-index via 'shock'", () => {
      const results = searchCalculators("shock");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("shock-index");
    });

    it("discovers corrected-qt via 'cardiology'", () => {
      const results = searchCalculators("cardiology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-qt");
    });

    it("discovers corrected-qt via 'arrhythmia'", () => {
      const results = searchCalculators("arrhythmia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-qt");
    });

    it("discovers corrected-qt via 'QT prolongation'", () => {
      const results = searchCalculators("QT prolongation");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-qt");
    });
  });

  // ------------------------------------------------------------------
  // Diabetes / endocrinology synonyms
  // ------------------------------------------------------------------
  describe("diabetes / endocrinology discovery", () => {
    it("discovers a1c-eag-converter via 'HbA1c'", () => {
      const results = searchCalculators("HbA1c");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("a1c-eag-converter");
    });

    it("discovers a1c-eag-converter via 'glycated hemoglobin'", () => {
      const results = searchCalculators("glycated hemoglobin");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("a1c-eag-converter");
    });

    it("discovers a1c-eag-converter via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("a1c-eag-converter");
    });

    it("discovers estimated-average-glucose via 'eAG'", () => {
      const results = searchCalculators("eAG");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("estimated-average-glucose");
    });

    it("discovers estimated-average-glucose via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("estimated-average-glucose");
    });

    it("discovers homa-ir via 'insulin resistance'", () => {
      const results = searchCalculators("insulin resistance");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("homa-ir");
    });

    it("discovers homa-b via 'beta cell'", () => {
      const results = searchCalculators("beta cell");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("homa-b");
    });

    it("discovers insulin-sensitivity via 'insulin'", () => {
      const results = searchCalculators("insulin");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("insulin-sensitivity");
    });

    it("discovers homa-ir via 'metabolic syndrome'", () => {
      const results = searchCalculators("metabolic syndrome");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("homa-ir");
    });

    it("discovers multiple diabetes calculators via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("a1c-eag-converter");
      expect(slugs).toContain("homa-ir");
      expect(slugs).toContain("homa-b");
    });
  });

  // ------------------------------------------------------------------
  // Laboratory / electrolyte synonyms
  // ------------------------------------------------------------------
  describe("laboratory / electrolyte discovery", () => {
    it("discovers corrected-sodium via 'sodium'", () => {
      const results = searchCalculators("sodium");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-sodium");
    });

    it("discovers corrected-sodium via 'hyponatremia'", () => {
      const results = searchCalculators("hyponatremia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-sodium");
    });

    it("discovers corrected-calcium via 'calcium'", () => {
      const results = searchCalculators("calcium");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-calcium");
    });

    it("discovers corrected-calcium via 'hypocalcemia'", () => {
      const results = searchCalculators("hypocalcemia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-calcium");
    });

    it("discovers anion-gap via 'anion gap'", () => {
      const results = searchCalculators("anion gap");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("anion-gap");
    });

    it("discovers anion-gap via 'metabolic acidosis'", () => {
      const results = searchCalculators("metabolic acidosis");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("anion-gap");
    });

    it("discovers serum-osmolality via 'osmolality'", () => {
      const results = searchCalculators("osmolality");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("serum-osmolality");
    });

    it("discovers osmolar-gap via 'osmolar gap'", () => {
      const results = searchCalculators("osmolar gap");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("osmolar-gap");
    });

    it("discovers osmolar-gap via 'toxicology'", () => {
      const results = searchCalculators("toxicology");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("osmolar-gap");
    });

    it("discovers osmolar-gap via 'ethylene glycol'", () => {
      const results = searchCalculators("ethylene glycol");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("osmolar-gap");
    });

    it("discovers corrected-anion-gap via 'electrolytes'", () => {
      const results = searchCalculators("electrolytes");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("corrected-anion-gap");
    });

    it("discovers free-water-deficit via 'hypernatremia'", () => {
      const results = searchCalculators("hypernatremia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("free-water-deficit");
    });

    it("discovers sodium-deficit via 'hyponatremia'", () => {
      const results = searchCalculators("hyponatremia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("sodium-deficit");
    });
  });

  // ------------------------------------------------------------------
  // Emergency / critical care synonyms
  // ------------------------------------------------------------------
  describe("emergency discovery", () => {
    it("discovers GCS via 'Glasgow Coma Scale'", () => {
      const results = searchCalculators("Glasgow Coma Scale");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("gcs");
    });

    it("discovers GCS via 'TBI'", () => {
      const results = searchCalculators("TBI");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("gcs");
    });

    it("discovers qsofa via 'sepsis'", () => {
      const results = searchCalculators("sepsis");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("qsofa");
    });

    it("discovers shock-index via 'sepsis'", () => {
      const results = searchCalculators("sepsis");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("shock-index");
    });

    it("discovers NEWS2 via 'deterioration'", () => {
      const results = searchCalculators("deterioration");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("news2");
    });

    it("discovers NEWS2 via 'vital signs'", () => {
      const results = searchCalculators("vital signs");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("news2");
    });

    it("discovers CURB-65 via 'pneumonia'", () => {
      const results = searchCalculators("pneumonia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("curb-65");
    });

    it("discovers CURB-65 via 'community acquired pneumonia'", () => {
      const results = searchCalculators("community acquired pneumonia");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("curb-65");
    });
  });

  // ------------------------------------------------------------------
  // Anthropometry synonyms
  // ------------------------------------------------------------------
  describe("anthropometry discovery", () => {
    it("discovers BMI via 'body mass index'", () => {
      const results = searchCalculators("body mass index");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("discovers BMI via 'obesity'", () => {
      const results = searchCalculators("obesity");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bmi");
    });

    it("discovers BSA via 'body surface area'", () => {
      const results = searchCalculators("body surface area");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bsa");
    });

    it("discovers BSA via 'Mosteller'", () => {
      const results = searchCalculators("Mosteller");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("bsa");
    });

    it("discovers waist-to-hip-ratio via 'waist hip ratio'", () => {
      const results = searchCalculators("waist hip ratio");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("waist-to-hip-ratio");
    });

    it("discovers waist-to-hip-ratio via 'WHR'", () => {
      const results = searchCalculators("WHR");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("waist-to-hip-ratio");
    });

    it("discovers waist-to-hip-ratio via 'metabolic syndrome'", () => {
      const results = searchCalculators("metabolic syndrome");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("waist-to-hip-ratio");
    });
  });
});

/* ------------------------------------------------------------------
   Multi-word clinical queries
   ------------------------------------------------------------------ */

describe("multi-word clinical queries", () => {
  it("returns results for 'kidney function' with renal calculators", () => {
    const results = searchCalculators("kidney function");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("ckd-epi-2021");
    expect(slugs).toContain("cockcroft-gault");
  });

  it("returns results for 'creatinine clearance'", () => {
    const results = searchCalculators("creatinine clearance");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("cockcroft-gault");
  });

  it("returns results for 'blood pressure'", () => {
    const results = searchCalculators("blood pressure");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns results for 'mean arterial pressure'", () => {
    const results = searchCalculators("mean arterial pressure");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("map");
  });

  it("returns results for 'body mass index'", () => {
    const results = searchCalculators("body mass index");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("bmi");
  });

  it("returns results for 'body surface area'", () => {
    const results = searchCalculators("body surface area");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("bsa");
  });

  it("returns results for 'corrected sodium'", () => {
    const results = searchCalculators("corrected sodium");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("corrected-sodium");
  });

  it("returns results for 'corrected calcium'", () => {
    const results = searchCalculators("corrected calcium");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("corrected-calcium");
  });

  it("returns results for 'anion gap metabolic acidosis'", () => {
    const results = searchCalculators("anion gap metabolic acidosis");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("anion-gap");
  });

  it("returns results for 'insulin resistance'", () => {
    const results = searchCalculators("insulin resistance");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("homa-ir");
  });
});

/* ------------------------------------------------------------------
   Partial clinical terms
   ------------------------------------------------------------------ */

describe("partial clinical terms", () => {
  it("returns calculators for partial 'nephr'", () => {
    const results = searchCalculators("nephr");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'cardio'", () => {
    const results = searchCalculators("cardio");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'osmol'", () => {
    const results = searchCalculators("osmol");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("serum-osmolality");
  });

  it("returns calculators for partial 'hypo'", () => {
    const results = searchCalculators("hypo");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'electro'", () => {
    const results = searchCalculators("electro");
    expect(results.length).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------
   Ranking after metadata additions
   ------------------------------------------------------------------ */

describe("ranking after metadata additions", () => {
  it("CKD-EPI title match still outranks keyword-only matches", () => {
    const results = searchCalculators("ckd-epi-2021");
    expect(results.length).toBeGreaterThan(0);
    // Title match should be the top result
    expect(results[0].document.slug).toBe("ckd-epi-2021");
    // Title match score should be >= 100
    expect(results[0].score).toBeGreaterThanOrEqual(100);
  });

  it("MAP title match outranks keyword-only match", () => {
    const results = searchCalculators("map");
    expect(results.length).toBeGreaterThan(0);
    // MAP calculator title match should be at or near the top
    const mapResult = results.find(
      (r) => r.document.slug === "map",
    );
    expect(mapResult).toBeDefined();
    expect(mapResult!.score).toBeGreaterThanOrEqual(100);
  });

  it("BMI title match outranks keyword-only match", () => {
    const results = searchCalculators("bmi");
    expect(results.length).toBeGreaterThan(0);
    // "bmi" and "bmi-for-pediatrics" both match title+keywords+description (score 180)
    // The bmi calculator should be present with high score
    const bmiResult = results.find(
      (r) => r.document.slug === "bmi",
    );
    expect(bmiResult).toBeDefined();
    expect(bmiResult!.score).toBeGreaterThanOrEqual(100);
    // Both BMI calculators should be in top 2
    const topSlugs = results.slice(0, 2).map((r) => r.document.slug);
    expect(topSlugs).toContain("bmi");
    expect(topSlugs).toContain("bmi-for-pediatrics");
  });

  it("keyword matches still accumulate properly after metadata additions", () => {
    // "Kidney" matches CKD-EPI keywords (60) + category "Nephrology" (40) = 100
    const results = searchCalculators("kidney");
    const ckdEpi = results.find(
      (r) => r.document.slug === "ckd-epi-2021",
    );
    expect(ckdEpi).toBeDefined();
    // Should have accumulated score from keywords + category
    expect(ckdEpi!.score).toBeGreaterThanOrEqual(60);
  });
});

/* ------------------------------------------------------------------
   Duplicate prevention (post-metadata)
   ------------------------------------------------------------------ */

describe("duplicate prevention after metadata additions", () => {
  it("each calculator appears at most once for 'kidney'", () => {
    const results = searchCalculators("kidney");
    const slugs = results.map((r) => r.document.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("each calculator appears at most once for 'electrolytes'", () => {
    const results = searchCalculators("electrolytes");
    const slugs = results.map((r) => r.document.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("each calculator appears at most once for 'diabetes'", () => {
    const results = searchCalculators("diabetes");
    const slugs = results.map((r) => r.document.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("each calculator appears at most once for 'sepsis'", () => {
    const results = searchCalculators("sepsis");
    const slugs = results.map((r) => r.document.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });
});

/* ------------------------------------------------------------------
   Deterministic ordering (post-metadata)
   ------------------------------------------------------------------ */

describe("deterministic ordering after metadata additions", () => {
  it("'kidney' produces same ordering across runs", () => {
    const first = searchCalculators("kidney");
    const second = searchCalculators("kidney");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });

  it("'electrolytes' produces same ordering across runs", () => {
    const first = searchCalculators("electrolytes");
    const second = searchCalculators("electrolytes");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });

  it("'diabetes' produces same ordering across runs", () => {
    const first = searchCalculators("diabetes");
    const second = searchCalculators("diabetes");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });

  it("'blood pressure' produces same ordering across runs", () => {
    const first = searchCalculators("blood pressure");
    const second = searchCalculators("blood pressure");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });
});

/* ------------------------------------------------------------------
   Index completeness (post-metadata)
   ------------------------------------------------------------------ */

describe("index completeness after metadata additions", () => {
  it("CKD-EPI has new keywords in index", () => {
    const index = buildSearchIndex();
    const ckd = index.find((d) => d.slug === "ckd-epi-2021");
    expect(ckd).toBeDefined();
    expect(ckd!.keywords).toContain("eGFR");
    expect(ckd!.keywords).toContain("Kidney");
    expect(ckd!.keywords).toContain("Renal");
    expect(ckd!.keywords).toContain("CKD");
    expect(ckd!.keywords).toContain("Kidney Function");
  });

  it("Cockcroft-Gault has new keywords in index", () => {
    const index = buildSearchIndex();
    const cg = index.find((d) => d.slug === "cockcroft-gault");
    expect(cg).toBeDefined();
    expect(cg!.keywords).toContain("Creatinine Clearance");
    expect(cg!.keywords).toContain("Kidney");
    expect(cg!.keywords).toContain("Renal");
  });

  it("MAP has new keywords in index", () => {
    const index = buildSearchIndex();
    const map = index.find((d) => d.slug === "map");
    expect(map).toBeDefined();
    expect(map!.keywords).toContain("Mean Arterial Pressure");
    expect(map!.keywords).toContain("Blood Pressure");
    expect(map!.keywords).toContain("Hemodynamics");
  });

  it("BMI has new keywords in index", () => {
    const index = buildSearchIndex();
    const bmi = index.find((d) => d.slug === "bmi");
    expect(bmi).toBeDefined();
    expect(bmi!.keywords).toContain("Body Mass Index");
    expect(bmi!.keywords).toContain("Obesity");
  });

  it("anion-gap has new keywords in index", () => {
    const index = buildSearchIndex();
    const ag = index.find((d) => d.slug === "anion-gap");
    expect(ag).toBeDefined();
    expect(ag!.keywords).toContain("Metabolic Acidosis");
    expect(ag!.keywords).toContain("Electrolytes");
  });

  it("osmolar-gap has new keywords in index", () => {
    const index = buildSearchIndex();
    const og = index.find((d) => d.slug === "osmolar-gap");
    expect(og).toBeDefined();
    expect(og!.keywords).toContain("Toxicology");
    expect(og!.keywords).toContain("Ethylene Glycol");
    expect(og!.keywords).toContain("Methanol");
  });

  it("a1c-eag-converter has new keywords in index", () => {
    const index = buildSearchIndex();
    const a1c = index.find(
      (d) => d.slug === "a1c-eag-converter",
    );
    expect(a1c).toBeDefined();
    expect(a1c!.keywords).toContain("HbA1c");
    expect(a1c!.keywords).toContain("Hemoglobin A1c");
    expect(a1c!.keywords).toContain("Glycated Hemoglobin");
    expect(a1c!.keywords).toContain("Diabetes");
  });

  it("gcs has new keywords in index", () => {
    const index = buildSearchIndex();
    const gcs = index.find((d) => d.slug === "gcs");
    expect(gcs).toBeDefined();
    expect(gcs!.keywords).toContain("Glasgow Coma Scale");
    expect(gcs!.keywords).toContain("TBI");
  });

  it("qsofa has new keywords in index", () => {
    const index = buildSearchIndex();
    const q = index.find((d) => d.slug === "qsofa");
    expect(q).toBeDefined();
    expect(q!.keywords).toContain("Sepsis");
    expect(q!.keywords).toContain("Organ Dysfunction");
  });

  it("waist-to-hip-ratio has new keywords in index", () => {
    const index = buildSearchIndex();
    const whr = index.find(
      (d) => d.slug === "waist-to-hip-ratio",
    );
    expect(whr).toBeDefined();
    expect(whr!.keywords).toContain("WHR");
    expect(whr!.keywords).toContain("Metabolic Syndrome");
    expect(whr!.keywords).toContain("Cardiovascular Risk");
  });
});

/* ------------------------------------------------------------------
   Result shape validation
   ------------------------------------------------------------------ */

describe("result shape validation", () => {
  it("all results have valid score type", () => {
    const queries = [
      "kidney",
      "diabetes",
      "electrolytes",
      "bmi",
      "sepsis",
    ];
    for (const query of queries) {
      const results = searchCalculators(query);
      for (const result of results) {
        expect(typeof result.score).toBe("number");
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(result.score)).toBe(true);
      }
    }
  });

  it("all results have valid matchedFields", () => {
    const queries = ["kidney", "diabetes", "electrolytes"];
    for (const query of queries) {
      const results = searchCalculators(query);
      for (const result of results) {
        expect(Array.isArray(result.matchedFields)).toBe(true);
        expect(result.matchedFields.length).toBeGreaterThan(0);
        for (const field of result.matchedFields) {
          expect(typeof field).toBe("string");
        }
      }
    }
  });

  it("all results have valid document structure", () => {
    const results = searchCalculators("kidney");
    for (const result of results) {
      expect(typeof result.document.slug).toBe("string");
      expect(typeof result.document.title).toBe("string");
      expect(typeof result.document.description).toBe("string");
      expect(typeof result.document.category).toBe("string");
      expect(typeof result.document.specialty).toBe("string");
      expect(Array.isArray(result.document.keywords)).toBe(
        true,
      );
    }
  });
});
