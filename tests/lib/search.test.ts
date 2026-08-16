import { describe, it, expect } from "vitest";

import {
  searchCalculators,
  buildSearchIndex,
  getSuggestions,
} from "../../lib/search";
import { getRelatedCalculators } from "../../lib/search/related";
import { calculatorRegistry } from "../../lib/calculators/registry";

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

  describe("no-result query", () => {
    it("returns empty array for nonexistent calculator", () => {
      const results = searchCalculators("zzzznonexistentcalculator");
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

  describe("ranking", () => {
    it("exact name match is returned with high score", () => {
      const results = searchCalculators("bmi");
      const exactMatch = results.find((r) => r.document.slug === "bmi");
      expect(exactMatch).toBeDefined();
      expect(exactMatch!.score).toBeGreaterThanOrEqual(100);

      const topSlugs = results.slice(0, 5).map((r) => r.document.slug);
      expect(topSlugs).toContain("bmi");
    });

    it("title match scores higher than description-only match", () => {
      const results = searchCalculators("bmi");
      const bmiResult = results.find((r) => r.document.slug === "bmi");
      expect(bmiResult).toBeDefined();
      expect(bmiResult!.score).toBeGreaterThanOrEqual(100);
    });

    it("keyword match receives correct weight (60)", () => {
      const results = searchCalculators("Liver");
      expect(results.length).toBeGreaterThan(0);
      const childPugh = results.find(
        (r) => r.document.slug === "child-pugh",
      );
      expect(childPugh).toBeDefined();
      expect(childPugh!.score).toBeGreaterThanOrEqual(60);
    });

    it("category match receives correct weight (40)", () => {
      const results = searchCalculators("Renal");
      expect(results.length).toBeGreaterThan(0);
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
      const specialtyMatches = results.filter((r) =>
        r.matchedFields.includes("specialty"),
      );
      expect(specialtyMatches.length).toBeGreaterThan(0);
      for (const r of specialtyMatches) {
        expect(r.score).toBeGreaterThanOrEqual(30);
      }
    });
  });

  describe("duplicate prevention", () => {
    it("each calculator appears at most once", () => {
      const queries = [
        "bmi", "Internal Medicine", "Nephrology",
        "liver", "corrected", "creatinine",
      ];
      for (const query of queries) {
        const results = searchCalculators(query);
        const slugs = results.map((r) => r.document.slug);
        const uniqueSlugs = new Set(slugs);
        expect(slugs.length).toBe(uniqueSlugs.size);
      }
    });
  });

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
      expect(results.length).toBeGreaterThan(0);
    });

    it("returns calculators for partial description 'glomerular'", () => {
      const results = searchCalculators("glomerular");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
    });
  });

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
      const match = results.find((r) => r.document.slug === "bmi");
      expect(match).toBeDefined();
      expect(match!.document.description).toContain("Body Mass Index");
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
      const match = results.find((r) => r.document.slug === "bsa");
      expect(match).toBeDefined();
    });

    it("Cockcroft-Gault calculator is searchable by name", () => {
      const results = searchCalculators("cockcroft-gault");
      const match = results.find(
        (r) => r.document.slug === "cockcroft-gault",
      );
      expect(match).toBeDefined();
      expect(match!.document.description).toContain("creatinine clearance");
    });

    it("NEWS2 calculator is searchable by name", () => {
      const results = searchCalculators("news2");
      const match = results.find((r) => r.document.slug === "news2");
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
    const childPugh = index.find((d) => d.slug === "child-pugh");
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
   Query normalization
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

/* ------------------------------------------------------------------
   Search index completeness
   ------------------------------------------------------------------ */

describe("search index completeness", () => {
  it("every registry calculator has an index entry", () => {
    const index = buildSearchIndex();
    const indexSlugs = new Set(index.map((d) => d.slug));
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
    const childPugh = index.find((d) => d.slug === "child-pugh");
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
      "bmi", "ckd-epi-2021", "corrected-sodium",
      "cockcroft-gault", "news2",
    ]) {
      const doc = index.find((d) => d.slug === slug);
      expect(doc).toBeDefined();
      expect(doc!.category.length).toBeGreaterThan(0);
      expect(doc!.specialty.length).toBeGreaterThan(0);
    }
  });
});

/* ------------------------------------------------------------------
   Clinical discovery queries
   ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------
   Ranking quality
   ------------------------------------------------------------------ */

describe("ranking quality", () => {
  it("title match scores higher than keyword-only match", () => {
    const results = searchCalculators("Child-Pugh");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].document.slug).toBe("child-pugh");
  });

  it("keyword match scores higher than description-only match", () => {
    const results = searchCalculators("Liver");
    expect(results.length).toBeGreaterThan(0);
    const childPugh = results.find(
      (r) => r.document.slug === "child-pugh",
    );
    expect(childPugh).toBeDefined();
    expect(childPugh!.score).toBeGreaterThanOrEqual(60);
  });

  it("multi-field matches accumulate score", () => {
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
    const first = searchCalculators("Nephrology");
    const second = searchCalculators("Nephrology");
    expect(first.map((r) => r.document.slug)).toEqual(
      second.map((r) => r.document.slug),
    );
  });
});

/* ------------------------------------------------------------------
   Search behavior consistency
   ------------------------------------------------------------------ */

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
    const queries = ["bmi", "renal", "cardiology", "", " ", "zzzz"];
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
   Clinical synonym discovery
   ------------------------------------------------------------------ */

describe("clinical synonym discovery", () => {
  describe("renal / kidney discovery", () => {
    it("discovers CKD-EPI via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("ckd-epi-2021");
    });

    it("discovers CKD-EPI via 'renal'", () => {
      const results = searchCalculators("renal");
      expect(results.map((r) => r.document.slug)).toContain("ckd-epi-2021");
    });

    it("discovers CKD-EPI via 'eGFR'", () => {
      const results = searchCalculators("eGFR");
      expect(results.map((r) => r.document.slug)).toContain("ckd-epi-2021");
    });

    it("discovers Cockcroft-Gault via 'creatinine clearance'", () => {
      const results = searchCalculators("creatinine clearance");
      expect(results.map((r) => r.document.slug)).toContain("cockcroft-gault");
    });

    it("discovers Cockcroft-Gault via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("cockcroft-gault");
    });

    it("discovers MDRD via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("mdrd");
    });

    it("discovers BUN/Creatinine via 'BUN'", () => {
      const results = searchCalculators("BUN");
      expect(results.map((r) => r.document.slug)).toContain("bun-creatinine-ratio");
    });

    it("discovers ACR via 'albumin creatinine ratio'", () => {
      const results = searchCalculators("albumin creatinine ratio");
      expect(results.map((r) => r.document.slug)).toContain("albumin-creatinine-ratio");
    });

    it("discovers FENa via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("fena");
    });

    it("discovers FENa via 'acute kidney injury'", () => {
      const results = searchCalculators("acute kidney injury");
      expect(results.map((r) => r.document.slug)).toContain("fena");
    });

    it("discovers FEUrea via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("feurea");
    });

    it("discovers TTKG via 'kidney'", () => {
      const results = searchCalculators("kidney");
      expect(results.map((r) => r.document.slug)).toContain("ttkg");
    });

    it("discovers calcium-phosphate-product via 'CKD'", () => {
      const results = searchCalculators("CKD");
      expect(results.map((r) => r.document.slug)).toContain("calcium-phosphate-product");
    });

    it("discovers multiple renal calculators for 'kidney function'", () => {
      const results = searchCalculators("kidney function");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("ckd-epi-2021");
      expect(slugs).toContain("cockcroft-gault");
      expect(slugs).toContain("mdrd");
    });
  });

  describe("cardiology discovery", () => {
    it("discovers MAP via 'mean arterial pressure'", () => {
      const results = searchCalculators("mean arterial pressure");
      expect(results.map((r) => r.document.slug)).toContain("map");
    });

    it("discovers MAP via 'blood pressure'", () => {
      const results = searchCalculators("blood pressure");
      expect(results.map((r) => r.document.slug)).toContain("map");
    });

    it("discovers MAP via 'hemodynamics'", () => {
      const results = searchCalculators("hemodynamics");
      expect(results.map((r) => r.document.slug)).toContain("map");
    });

    it("discovers heart-rate via 'cardiology'", () => {
      const results = searchCalculators("cardiology");
      expect(results.map((r) => r.document.slug)).toContain("heart-rate");
    });

    it("discovers heart-rate via 'cardiac'", () => {
      const results = searchCalculators("cardiac");
      expect(results.map((r) => r.document.slug)).toContain("heart-rate");
    });

    it("discovers shock-index via 'hemodynamics'", () => {
      const results = searchCalculators("hemodynamics");
      expect(results.map((r) => r.document.slug)).toContain("shock-index");
    });

    it("discovers shock-index via 'shock'", () => {
      const results = searchCalculators("shock");
      expect(results.map((r) => r.document.slug)).toContain("shock-index");
    });

    it("discovers corrected-qt via 'cardiology'", () => {
      const results = searchCalculators("cardiology");
      expect(results.map((r) => r.document.slug)).toContain("corrected-qt");
    });

    it("discovers corrected-qt via 'arrhythmia'", () => {
      const results = searchCalculators("arrhythmia");
      expect(results.map((r) => r.document.slug)).toContain("corrected-qt");
    });

    it("discovers corrected-qt via 'QT prolongation'", () => {
      const results = searchCalculators("QT prolongation");
      expect(results.map((r) => r.document.slug)).toContain("corrected-qt");
    });
  });

  describe("diabetes / endocrinology discovery", () => {
    it("discovers a1c-eag-converter via 'HbA1c'", () => {
      const results = searchCalculators("HbA1c");
      expect(results.map((r) => r.document.slug)).toContain("a1c-eag-converter");
    });

    it("discovers a1c-eag-converter via 'glycated hemoglobin'", () => {
      const results = searchCalculators("glycated hemoglobin");
      expect(results.map((r) => r.document.slug)).toContain("a1c-eag-converter");
    });

    it("discovers a1c-eag-converter via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      expect(results.map((r) => r.document.slug)).toContain("a1c-eag-converter");
    });

    it("discovers estimated-average-glucose via 'eAG'", () => {
      const results = searchCalculators("eAG");
      expect(results.map((r) => r.document.slug)).toContain("estimated-average-glucose");
    });

    it("discovers estimated-average-glucose via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      expect(results.map((r) => r.document.slug)).toContain("estimated-average-glucose");
    });

    it("discovers homa-ir via 'insulin resistance'", () => {
      const results = searchCalculators("insulin resistance");
      expect(results.map((r) => r.document.slug)).toContain("homa-ir");
    });

    it("discovers homa-b via 'beta cell'", () => {
      const results = searchCalculators("beta cell");
      expect(results.map((r) => r.document.slug)).toContain("homa-b");
    });

    it("discovers insulin-sensitivity via 'insulin'", () => {
      const results = searchCalculators("insulin");
      expect(results.map((r) => r.document.slug)).toContain("insulin-sensitivity");
    });

    it("discovers homa-ir via 'metabolic syndrome'", () => {
      const results = searchCalculators("metabolic syndrome");
      expect(results.map((r) => r.document.slug)).toContain("homa-ir");
    });

    it("discovers multiple diabetes calculators via 'diabetes'", () => {
      const results = searchCalculators("diabetes");
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain("a1c-eag-converter");
      expect(slugs).toContain("homa-ir");
      expect(slugs).toContain("homa-b");
    });
  });

  describe("laboratory / electrolyte discovery", () => {
    it("discovers corrected-sodium via 'sodium'", () => {
      const results = searchCalculators("sodium");
      expect(results.map((r) => r.document.slug)).toContain("corrected-sodium");
    });

    it("discovers corrected-sodium via 'hyponatremia'", () => {
      const results = searchCalculators("hyponatremia");
      expect(results.map((r) => r.document.slug)).toContain("corrected-sodium");
    });

    it("discovers corrected-calcium via 'calcium'", () => {
      const results = searchCalculators("calcium");
      expect(results.map((r) => r.document.slug)).toContain("corrected-calcium");
    });

    it("discovers corrected-calcium via 'hypocalcemia'", () => {
      const results = searchCalculators("hypocalcemia");
      expect(results.map((r) => r.document.slug)).toContain("corrected-calcium");
    });

    it("discovers anion-gap via 'anion gap'", () => {
      const results = searchCalculators("anion gap");
      expect(results.map((r) => r.document.slug)).toContain("anion-gap");
    });

    it("discovers anion-gap via 'metabolic acidosis'", () => {
      const results = searchCalculators("metabolic acidosis");
      expect(results.map((r) => r.document.slug)).toContain("anion-gap");
    });

    it("discovers serum-osmolality via 'osmolality'", () => {
      const results = searchCalculators("osmolality");
      expect(results.map((r) => r.document.slug)).toContain("serum-osmolality");
    });

    it("discovers osmolar-gap via 'osmolar gap'", () => {
      const results = searchCalculators("osmolar gap");
      expect(results.map((r) => r.document.slug)).toContain("osmolar-gap");
    });

    it("discovers osmolar-gap via 'toxicology'", () => {
      const results = searchCalculators("toxicology");
      expect(results.map((r) => r.document.slug)).toContain("osmolar-gap");
    });

    it("discovers osmolar-gap via 'ethylene glycol'", () => {
      const results = searchCalculators("ethylene glycol");
      expect(results.map((r) => r.document.slug)).toContain("osmolar-gap");
    });

    it("discovers corrected-anion-gap via 'electrolytes'", () => {
      const results = searchCalculators("electrolytes");
      expect(results.map((r) => r.document.slug)).toContain("corrected-anion-gap");
    });

    it("discovers free-water-deficit via 'hypernatremia'", () => {
      const results = searchCalculators("hypernatremia");
      expect(results.map((r) => r.document.slug)).toContain("free-water-deficit");
    });

    it("discovers sodium-deficit via 'hyponatremia'", () => {
      const results = searchCalculators("hyponatremia");
      expect(results.map((r) => r.document.slug)).toContain("sodium-deficit");
    });
  });

  describe("emergency discovery", () => {
    it("discovers GCS via 'Glasgow Coma Scale'", () => {
      const results = searchCalculators("Glasgow Coma Scale");
      expect(results.map((r) => r.document.slug)).toContain("gcs");
    });

    it("discovers GCS via 'TBI'", () => {
      const results = searchCalculators("TBI");
      expect(results.map((r) => r.document.slug)).toContain("gcs");
    });

    it("discovers qsofa via 'sepsis'", () => {
      const results = searchCalculators("sepsis");
      expect(results.map((r) => r.document.slug)).toContain("qsofa");
    });

    it("discovers shock-index via 'sepsis'", () => {
      const results = searchCalculators("sepsis");
      expect(results.map((r) => r.document.slug)).toContain("shock-index");
    });

    it("discovers NEWS2 via 'deterioration'", () => {
      const results = searchCalculators("deterioration");
      expect(results.map((r) => r.document.slug)).toContain("news2");
    });

    it("discovers NEWS2 via 'vital signs'", () => {
      const results = searchCalculators("vital signs");
      expect(results.map((r) => r.document.slug)).toContain("news2");
    });

    it("discovers CURB-65 via 'pneumonia'", () => {
      const results = searchCalculators("pneumonia");
      expect(results.map((r) => r.document.slug)).toContain("curb-65");
    });

    it("discovers CURB-65 via 'community acquired pneumonia'", () => {
      const results = searchCalculators("community acquired pneumonia");
      expect(results.map((r) => r.document.slug)).toContain("curb-65");
    });
  });

  describe("anthropometry discovery", () => {
    it("discovers BMI via 'body mass index'", () => {
      const results = searchCalculators("body mass index");
      expect(results.map((r) => r.document.slug)).toContain("bmi");
    });

    it("discovers BMI via 'obesity'", () => {
      const results = searchCalculators("obesity");
      expect(results.map((r) => r.document.slug)).toContain("bmi");
    });

    it("discovers BSA via 'body surface area'", () => {
      const results = searchCalculators("body surface area");
      expect(results.map((r) => r.document.slug)).toContain("bsa");
    });

    it("discovers BSA via 'Mosteller'", () => {
      const results = searchCalculators("Mosteller");
      expect(results.map((r) => r.document.slug)).toContain("bsa");
    });

    it("discovers waist-to-hip-ratio via 'waist hip ratio'", () => {
      const results = searchCalculators("waist hip ratio");
      expect(results.map((r) => r.document.slug)).toContain("waist-to-hip-ratio");
    });

    it("discovers waist-to-hip-ratio via 'WHR'", () => {
      const results = searchCalculators("WHR");
      expect(results.map((r) => r.document.slug)).toContain("waist-to-hip-ratio");
    });

    it("discovers waist-to-hip-ratio via 'metabolic syndrome'", () => {
      const results = searchCalculators("metabolic syndrome");
      expect(results.map((r) => r.document.slug)).toContain("waist-to-hip-ratio");
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
    expect(results.map((r) => r.document.slug)).toContain("cockcroft-gault");
  });

  it("returns results for 'blood pressure'", () => {
    const results = searchCalculators("blood pressure");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns results for 'mean arterial pressure'", () => {
    const results = searchCalculators("mean arterial pressure");
    expect(results.map((r) => r.document.slug)).toContain("map");
  });

  it("returns results for 'body mass index'", () => {
    const results = searchCalculators("body mass index");
    expect(results.map((r) => r.document.slug)).toContain("bmi");
  });

  it("returns results for 'body surface area'", () => {
    const results = searchCalculators("body surface area");
    expect(results.map((r) => r.document.slug)).toContain("bsa");
  });

  it("returns results for 'corrected sodium'", () => {
    const results = searchCalculators("corrected sodium");
    expect(results.map((r) => r.document.slug)).toContain("corrected-sodium");
  });

  it("returns results for 'corrected calcium'", () => {
    const results = searchCalculators("corrected calcium");
    expect(results.map((r) => r.document.slug)).toContain("corrected-calcium");
  });

  it("returns results for 'anion gap metabolic acidosis'", () => {
    const results = searchCalculators("anion gap metabolic acidosis");
    expect(results.map((r) => r.document.slug)).toContain("anion-gap");
  });

  it("returns results for 'insulin resistance'", () => {
    const results = searchCalculators("insulin resistance");
    expect(results.map((r) => r.document.slug)).toContain("homa-ir");
  });
});

/* ------------------------------------------------------------------
   Partial clinical terms
   ------------------------------------------------------------------ */

describe("partial clinical terms", () => {
  it("returns calculators for partial 'nephr'", () => {
    expect(searchCalculators("nephr").length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'cardio'", () => {
    expect(searchCalculators("cardio").length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'osmol'", () => {
    const results = searchCalculators("osmol");
    expect(results.map((r) => r.document.slug)).toContain("serum-osmolality");
  });

  it("returns calculators for partial 'hypo'", () => {
    expect(searchCalculators("hypo").length).toBeGreaterThan(0);
  });

  it("returns calculators for partial 'electro'", () => {
    expect(searchCalculators("electro").length).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------
   Ranking after metadata additions
   ------------------------------------------------------------------ */

describe("ranking after metadata additions", () => {
  it("CKD-EPI title match still outranks keyword-only matches", () => {
    const results = searchCalculators("ckd-epi-2021");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].document.slug).toBe("ckd-epi-2021");
    expect(results[0].score).toBeGreaterThanOrEqual(100);
  });

  it("MAP title match outranks keyword-only match", () => {
    const results = searchCalculators("map");
    expect(results.length).toBeGreaterThan(0);
    const mapResult = results.find((r) => r.document.slug === "map");
    expect(mapResult).toBeDefined();
    expect(mapResult!.score).toBeGreaterThanOrEqual(100);
  });

  it("BMI title match outranks keyword-only match", () => {
    const results = searchCalculators("bmi");
    expect(results.length).toBeGreaterThan(0);
    const bmiResult = results.find((r) => r.document.slug === "bmi");
    expect(bmiResult).toBeDefined();
    expect(bmiResult!.score).toBeGreaterThanOrEqual(100);
    const topSlugs = results.slice(0, 2).map((r) => r.document.slug);
    expect(topSlugs).toContain("bmi");
    expect(topSlugs).toContain("bmi-for-pediatrics");
  });

  it("keyword matches still accumulate properly after metadata additions", () => {
    const results = searchCalculators("kidney");
    const ckdEpi = results.find(
      (r) => r.document.slug === "ckd-epi-2021",
    );
    expect(ckdEpi).toBeDefined();
    expect(ckdEpi!.score).toBeGreaterThanOrEqual(60);
  });
});

/* ------------------------------------------------------------------
   Duplicate prevention after metadata additions
   ------------------------------------------------------------------ */

describe("duplicate prevention after metadata additions", () => {
  it("each calculator appears at most once for 'kidney'", () => {
    const slugs = searchCalculators("kidney").map((r) => r.document.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("each calculator appears at most once for 'electrolytes'", () => {
    const slugs = searchCalculators("electrolytes").map((r) => r.document.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("each calculator appears at most once for 'diabetes'", () => {
    const slugs = searchCalculators("diabetes").map((r) => r.document.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("each calculator appears at most once for 'sepsis'", () => {
    const slugs = searchCalculators("sepsis").map((r) => r.document.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });
});

/* ------------------------------------------------------------------
   Deterministic ordering after metadata additions
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
   Index completeness after metadata additions
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
    const a1c = index.find((d) => d.slug === "a1c-eag-converter");
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
    const whr = index.find((d) => d.slug === "waist-to-hip-ratio");
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
    for (const query of ["kidney", "diabetes", "electrolytes", "bmi", "sepsis"]) {
      for (const result of searchCalculators(query)) {
        expect(typeof result.score).toBe("number");
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(result.score)).toBe(true);
      }
    }
  });

  it("all results have valid matchedFields", () => {
    for (const query of ["kidney", "diabetes", "electrolytes"]) {
      for (const result of searchCalculators(query)) {
        expect(Array.isArray(result.matchedFields)).toBe(true);
        expect(result.matchedFields.length).toBeGreaterThan(0);
        for (const field of result.matchedFields) {
          expect(typeof field).toBe("string");
        }
      }
    }
  });

  it("all results have valid document structure", () => {
    for (const result of searchCalculators("kidney")) {
      expect(typeof result.document.slug).toBe("string");
      expect(typeof result.document.title).toBe("string");
      expect(typeof result.document.description).toBe("string");
      expect(typeof result.document.category).toBe("string");
      expect(typeof result.document.specialty).toBe("string");
      expect(Array.isArray(result.document.keywords)).toBe(true);
    }
  });
});

/* ------------------------------------------------------------------
   getSuggestions tests — Sprint 1.7 new feature
   ------------------------------------------------------------------ */

describe("getSuggestions", () => {
  it("returns results for valid query", () => {
    const suggestions = getSuggestions("bmi");
    expect(suggestions.length).toBeGreaterThan(0);
    const slugs = suggestions.map((r) => r.document.slug);
    expect(slugs).toContain("bmi");
    expect(slugs).toContain("bmi-for-pediatrics");
  });

  it("returns empty array for empty string", () => {
    expect(getSuggestions("")).toEqual([]);
  });

  it("returns empty array for single character", () => {
    expect(getSuggestions("b")).toEqual([]);
  });

  it("returns empty array for whitespace-only", () => {
    expect(getSuggestions("   ")).toEqual([]);
  });

  it("limits results to 8", () => {
    expect(getSuggestions("a").length).toBeLessThanOrEqual(8);
  });

  it("returns ranked results (title matches first)", () => {
    const suggestions = getSuggestions("bmi");
    const topSlugs = suggestions.map((r) => r.document.slug).slice(0, 2);
    expect(topSlugs).toContain("bmi");
    expect(topSlugs).toContain("bmi-for-pediatrics");
  });

  it("returns empty for nonsense query", () => {
    expect(getSuggestions("zzzznonexistent")).toEqual([]);
  });

  it("is case-insensitive", () => {
    const lower = getSuggestions("bmi").map((r) => r.document.slug);
    const upper = getSuggestions("BMI").map((r) => r.document.slug);
    expect(lower).toEqual(upper);
  });
});

/* ------------------------------------------------------------------
   getRelatedCalculators tests — Sprint 1.7 new feature
   ------------------------------------------------------------------ */

describe("getRelatedCalculators", () => {
  it("returns related calculators from manual field", () => {
    const anionGap = calculatorRegistry.find((c) => c.id === "anion-gap")!;
    const related = getRelatedCalculators(anionGap);
    expect(related.length).toBeGreaterThan(0);
    expect(related.map((c) => c.slug)).toContain("corrected-anion-gap");
  });

  it("excludes current calculator from results", () => {
    const anionGap = calculatorRegistry.find((c) => c.id === "anion-gap")!;
    const related = getRelatedCalculators(anionGap);
    expect(related.map((c) => c.slug)).not.toContain("anion-gap");
  });

  it("respects limit option", () => {
    const anionGap = calculatorRegistry.find((c) => c.id === "anion-gap")!;
    const related = getRelatedCalculators(anionGap, { limit: 2 });
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("falls back to metadata discovery when no manual related", () => {
    const bmi = calculatorRegistry.find((c) => c.id === "bmi")!;
    expect(bmi.relatedCalculators).toEqual([]);
    const related = getRelatedCalculators(bmi);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(5);
  });

  it("returns deterministic results", () => {
    const ckdEpi = calculatorRegistry.find((c) => c.id === "ckd-epi-2021")!;
    const first = getRelatedCalculators(ckdEpi).map((c) => c.id);
    const second = getRelatedCalculators(ckdEpi).map((c) => c.id);
    expect(first).toEqual(second);
  });

  it("no calculator appears twice in results", () => {
    for (const calc of calculatorRegistry) {
      const ids = getRelatedCalculators(calc).map((c) => c.id);
      expect(ids.length).toBe(new Set(ids).size);
    }
  });

  it("no calculator recommends itself", () => {
    for (const calc of calculatorRegistry) {
      const related = getRelatedCalculators(calc);
      const ids = related.map((c) => c.id);
      expect(ids).not.toContain(calc.id);
    }
  });

  it("all related slugs map to registered calculators", () => {
    const registryIds = new Set(calculatorRegistry.map((c) => c.id));
    for (const calc of calculatorRegistry) {
      const related = getRelatedCalculators(calc);
      for (const rel of related) {
        expect(registryIds.has(rel.id)).toBe(true);
        expect(typeof rel.slug).toBe("string");
        expect(rel.slug.length).toBeGreaterThan(0);
      }
    }
  });

  it("related calculators never produce duplicate slugs across registry", () => {
    for (const calc of calculatorRegistry) {
      const related = getRelatedCalculators(calc);
      const slugs = related.map((c) => c.slug);
      expect(slugs.length).toBe(new Set(slugs).size);
    }
  });

  it("related calculators are bounded (max 5 default)", () => {
    for (const calc of calculatorRegistry) {
      const related = getRelatedCalculators(calc);
      expect(related.length).toBeLessThanOrEqual(5);
    }
  });

  it("related calculators are deterministic across repeated calls", () => {
    for (const calc of calculatorRegistry) {
      const first = getRelatedCalculators(calc).map((c) => c.id);
      const second = getRelatedCalculators(calc).map((c) => c.id);
      expect(first).toEqual(second);
    }
  });
});

/* ------------------------------------------------------------------
   Suggestions — additional regression tests
   ------------------------------------------------------------------ */

describe("getSuggestions (extended)", () => {
  it("returns deterministic results across repeated calls", () => {
    const a = getSuggestions("kidney").map((r) => r.document.slug);
    const b = getSuggestions("kidney").map((r) => r.document.slug);
    expect(a).toEqual(b);
  });

  it("returns deterministic results for 'bmi'", () => {
    const a = getSuggestions("bmi").map((r) => r.document.slug);
    const b = getSuggestions("bmi").map((r) => r.document.slug);
    expect(a).toEqual(b);
  });

  it("never returns more than 8 results", () => {
    const wide = getSuggestions("a");
    expect(wide.length).toBeLessThanOrEqual(8);
  });

  it("whitespace-only query returns empty", () => {
    expect(getSuggestions("   ")).toEqual([]);
  });

  it("single character returns empty (minimum 2 chars)", () => {
    expect(getSuggestions("a")).toEqual([]);
    expect(getSuggestions("b")).toEqual([]);
  });

  it("all suggestion slugs are valid route segments", () => {
    for (const q of ["bmi", "renal", "kidney", "sodium", "heart"]) {
      const suggestions = getSuggestions(q);
      for (const s of suggestions) {
        expect(s.document.slug).toBeTruthy();
        expect(typeof s.document.slug).toBe("string");
        expect(s.document.slug.length).toBeGreaterThan(0);
        expect(s.document.slug).not.toContain(" ");
      }
    }
  });

  it("suggestions are a subset of searchCalculators results", () => {
    for (const q of ["bmi", "renal", "kidney"]) {
      const suggestions = getSuggestions(q);
      const searchSlugs = searchCalculators(q).map((r) => r.document.slug);
      for (const s of suggestions) {
        expect(searchSlugs).toContain(s.document.slug);
      }
    }
  });

  it("does not return duplicate results", () => {
    for (const q of ["bmi", "renal", "kidney", "calcium"]) {
      const slugs = getSuggestions(q).map((r) => r.document.slug);
      expect(slugs.length).toBe(new Set(slugs).size);
    }
  });
});

/* ------------------------------------------------------------------
   Registry / Search integration — all calculators discoverable
   ------------------------------------------------------------------ */

describe("registry / search integration", () => {
  it("search index length matches registry length", () => {
    const index = buildSearchIndex();
    expect(index.length).toBe(calculatorRegistry.length);
  });

  it("every registry slug appears in search index", () => {
    const index = buildSearchIndex();
    const indexSlugs = new Set(index.map((d) => d.slug));
    for (const calc of calculatorRegistry) {
      expect(indexSlugs.has(calc.slug)).toBe(true);
    }
  });

  it("every registry calculator is discoverable by its name", () => {
    for (const calc of calculatorRegistry) {
      const results = searchCalculators(calc.name);
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain(calc.slug);
    }
  });

  it("every registry calculator is discoverable by its category", () => {
    for (const calc of calculatorRegistry) {
      const results = searchCalculators(calc.category);
      const slugs = results.map((r) => r.document.slug);
      expect(slugs).toContain(calc.slug);
    }
  });

  it("related calculator references are always registered", () => {
    const registryIds = new Set(calculatorRegistry.map((c) => c.id));
    for (const calc of calculatorRegistry) {
      if (calc.relatedCalculators) {
        for (const relId of calc.relatedCalculators) {
          expect(registryIds.has(relId)).toBe(true);
        }
      }
    }
  });

  it("no calculator appears twice in registry", () => {
    const ids = calculatorRegistry.map((c) => c.id);
    expect(ids.length).toBe(new Set(ids).size);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("every registry calculator has a valid slug", () => {
    for (const calc of calculatorRegistry) {
      expect(typeof calc.slug).toBe("string");
      expect(calc.slug.length).toBeGreaterThan(0);
      expect(calc.slug).not.toContain(" ");
    }
  });

  it("getRelatedCalculators results always reference registered calculators", () => {
    const registryIds = new Set(calculatorRegistry.map((c) => c.id));
    for (const calc of calculatorRegistry) {
      const related = getRelatedCalculators(calc);
      for (const rel of related) {
        expect(registryIds.has(rel.id)).toBe(true);
      }
    }
  });
});

/* ------------------------------------------------------------------
   Sprint 1.9 — Emergency / Critical Care discovery regression tests
   ------------------------------------------------------------------ */

describe("Sprint 1.9 emergency / critical care discovery", () => {
  const NEW_SLUGS = [
    "perc-rule",
    "wells-pe",
    "wells-dvt",
    "heart-score",
    "sofa-score",
    "sirs-criteria",
    "crb-65",
    "psi-port",
    "rts",
    "parkland-formula",
  ];

  it("every new calculator is in the search index", () => {
    const index = buildSearchIndex();
    const slugs = new Set(index.map((d) => d.slug));
    for (const slug of NEW_SLUGS) {
      expect(slugs.has(slug), `${slug} missing from search index`).toBe(true);
    }
  });

  it("discovers PERC rule via 'pulmonary embolism'", () => {
    const results = searchCalculators("pulmonary embolism");
    expect(results.map((r) => r.document.slug)).toContain("perc-rule");
    expect(results.map((r) => r.document.slug)).toContain("wells-pe");
  });

  it("discovers Wells PE via 'PE'", () => {
    const results = searchCalculators("PE");
    expect(results.map((r) => r.document.slug)).toContain("wells-pe");
  });

  it("discovers Wells DVT via 'deep vein thrombosis'", () => {
    const results = searchCalculators("deep vein thrombosis");
    expect(results.map((r) => r.document.slug)).toContain("wells-dvt");
  });

  it("discovers HEART score via 'chest pain'", () => {
    const results = searchCalculators("chest pain");
    expect(results.map((r) => r.document.slug)).toContain("heart-score");
  });

  it("discovers SOFA score via 'sepsis'", () => {
    const results = searchCalculators("sepsis");
    expect(results.map((r) => r.document.slug)).toContain("sofa-score");
  });

  it("discovers SIRS criteria via 'SIRS'", () => {
    const results = searchCalculators("SIRS");
    expect(results.map((r) => r.document.slug)).toContain("sirs-criteria");
  });

  it("discovers CRB-65 via 'pneumonia'", () => {
    const results = searchCalculators("pneumonia");
    expect(results.map((r) => r.document.slug)).toContain("crb-65");
    expect(results.map((r) => r.document.slug)).toContain("psi-port");
  });

  it("discovers PSI/PORT via 'pneumonia severity'", () => {
    const results = searchCalculators("pneumonia severity");
    expect(results.map((r) => r.document.slug)).toContain("psi-port");
  });

  it("discovers Revised Trauma Score via 'trauma'", () => {
    const results = searchCalculators("trauma");
    expect(results.map((r) => r.document.slug)).toContain("rts");
  });

  it("discovers Parkland formula via 'burn'", () => {
    const results = searchCalculators("burn");
    expect(results.map((r) => r.document.slug)).toContain("parkland-formula");
  });

  it("each new calculator appears at most once per query", () => {
    for (const slug of NEW_SLUGS) {
      const slugs = searchCalculators(slug).map((r) => r.document.slug);
      expect(slugs.length, `${slug} duplicate in results`).toBe(
        new Set(slugs).size,
      );
    }
  });
});

/* ------------------------------------------------------------------
   Sprint 1.9 Batch 3 — Laboratory & Metabolic discovery regression
   ------------------------------------------------------------------ */

describe("Sprint 1.9 Batch 3 laboratory / metabolic discovery", () => {
  const NEW_SLUGS = [
    "ldl-cholesterol",
    "non-hdl-cholesterol",
    "albumin-globulin-ratio",
    "tyg-index",
    "triglyceride-hdl-ratio",
    "quicki",
    "winters-formula",
    "anion-gap-delta-ratio",
    "urine-anion-gap",
    "kt-v",
  ];

  it("every new calculator is in the search index", () => {
    const index = buildSearchIndex();
    const slugs = new Set(index.map((d) => d.slug));
    for (const slug of NEW_SLUGS) {
      expect(slugs.has(slug), `${slug} missing from search index`).toBe(true);
    }
  });

  it("discovers calculated LDL via 'friedewald'", () => {
    const results = searchCalculators("friedewald");
    expect(results.map((r) => r.document.slug)).toContain("ldl-cholesterol");
  });

  it("discovers non-HDL cholesterol via 'non-HDL'", () => {
    const results = searchCalculators("non-HDL");
    expect(results.map((r) => r.document.slug)).toContain(
      "non-hdl-cholesterol",
    );
  });

  it("discovers A/G ratio via 'albumin'", () => {
    const results = searchCalculators("albumin");
    expect(results.map((r) => r.document.slug)).toContain(
      "albumin-globulin-ratio",
    );
  });

  it("discovers TyG index via 'TyG'", () => {
    const results = searchCalculators("TyG");
    expect(results.map((r) => r.document.slug)).toContain("tyg-index");
  });

  it("discovers TG/HDL ratio via 'triglyceride hdl'", () => {
    const results = searchCalculators("triglyceride hdl");
    expect(results.map((r) => r.document.slug)).toContain(
      "triglyceride-hdl-ratio",
    );
  });

  it("discovers QUICKI via 'quicki'", () => {
    const results = searchCalculators("quicki");
    expect(results.map((r) => r.document.slug)).toContain("quicki");
  });

  it("discovers QUICKI via 'insulin sensitivity'", () => {
    const results = searchCalculators("insulin sensitivity");
    expect(results.map((r) => r.document.slug)).toContain("quicki");
  });

  it("discovers Winter's formula via 'winters'", () => {
    const results = searchCalculators("winters");
    expect(results.map((r) => r.document.slug)).toContain("winters-formula");
  });

  it("discovers Winter's formula via 'metabolic acidosis'", () => {
    const results = searchCalculators("metabolic acidosis");
    expect(results.map((r) => r.document.slug)).toContain("winters-formula");
  });

  it("discovers delta gap ratio via 'delta gap'", () => {
    const results = searchCalculators("delta gap");
    expect(results.map((r) => r.document.slug)).toContain(
      "anion-gap-delta-ratio",
    );
  });

  it("discovers urine anion gap via 'urine anion gap'", () => {
    const results = searchCalculators("urine anion gap");
    expect(results.map((r) => r.document.slug)).toContain("urine-anion-gap");
  });

  it("discovers Kt/V via 'daugirdas'", () => {
    const results = searchCalculators("daugirdas");
    expect(results.map((r) => r.document.slug)).toContain("kt-v");
  });

  it("discovers Kt/V via 'dialysis adequacy'", () => {
    const results = searchCalculators("dialysis adequacy");
    expect(results.map((r) => r.document.slug)).toContain("kt-v");
  });

  it("discovers insulin resistance markers via 'insulin resistance'", () => {
    const results = searchCalculators("insulin resistance");
    const slugs = results.map((r) => r.document.slug);
    expect(slugs).toContain("tyg-index");
    expect(slugs).toContain("triglyceride-hdl-ratio");
    expect(slugs).toContain("quicki");
  });

  it("each new calculator appears at most once per query", () => {
    for (const slug of NEW_SLUGS) {
      const slugs = searchCalculators(slug).map((r) => r.document.slug);
      expect(slugs.length, `${slug} duplicate in results`).toBe(
        new Set(slugs).size,
      );
    }
  });
});

/* ------------------------------------------------------------------
   Sprint 1.9 Batch 4 — Renal & Laboratory/Metabolic discovery
   regression tests
   ------------------------------------------------------------------ */

describe("Sprint 1.9 Batch 4 renal / laboratory / metabolic discovery", () => {
  const NEW_SLUGS = [
    "fractional-excretion-uric-acid",
    "fractional-excretion-phosphate",
    "fractional-excretion-calcium",
    "renal-failure-index",
    "urine-osmolal-gap",
    "free-water-clearance",
    "electrolyte-free-water-clearance",
    "urine-protein-creatinine-ratio",
    "creatinine-clearance-24h",
    "total-cholesterol-hdl-ratio",
    "atherogenic-index-of-plasma",
    "apob-apoa1-ratio",
    "respiratory-compensation",
    "metabolic-alkalosis-compensation",
    "free-thyroxine-index",
    "metabolic-syndrome-atp3",
  ];

  it("every new calculator is in the search index", () => {
    const index = buildSearchIndex();
    const slugs = new Set(index.map((d) => d.slug));
    for (const slug of NEW_SLUGS) {
      expect(slugs.has(slug), `${slug} missing from search index`).toBe(true);
    }
  });

  it("discovers FEUA via 'FEUA'", () => {
    const results = searchCalculators("FEUA");
    expect(results.map((r) => r.document.slug)).toContain(
      "fractional-excretion-uric-acid",
    );
  });

  it("discovers FEUA via 'uric acid'", () => {
    const results = searchCalculators("uric acid");
    expect(results.map((r) => r.document.slug)).toContain(
      "fractional-excretion-uric-acid",
    );
  });

  it("discovers FEP via 'FEP'", () => {
    const results = searchCalculators("FEP");
    expect(results.map((r) => r.document.slug)).toContain(
      "fractional-excretion-phosphate",
    );
  });

  it("discovers FECa via 'FECa' and 'CCCR'", () => {
    const slugs = searchCalculators("FECa").map((r) => r.document.slug);
    expect(slugs).toContain("fractional-excretion-calcium");
    const cccr = searchCalculators("CCCR").map((r) => r.document.slug);
    expect(cccr).toContain("fractional-excretion-calcium");
  });

  it("discovers RFI via 'renal failure index'", () => {
    const results = searchCalculators("renal failure index");
    expect(results.map((r) => r.document.slug)).toContain(
      "renal-failure-index",
    );
  });

  it("discovers urine osmolal gap via 'urine osmolal gap'", () => {
    const results = searchCalculators("urine osmolal gap");
    expect(results.map((r) => r.document.slug)).toContain(
      "urine-osmolal-gap",
    );
  });

  it("discovers CH2O via 'free water clearance'", () => {
    const results = searchCalculators("free water clearance");
    expect(results.map((r) => r.document.slug)).toContain(
      "free-water-clearance",
    );
  });

  it("discovers EFWC via 'electrolyte-free water clearance'", () => {
    const results = searchCalculators("electrolyte-free water clearance");
    expect(results.map((r) => r.document.slug)).toContain(
      "electrolyte-free-water-clearance",
    );
  });

  it("discovers UPCR via 'urine protein creatinine'", () => {
    const results = searchCalculators("urine protein creatinine");
    expect(results.map((r) => r.document.slug)).toContain(
      "urine-protein-creatinine-ratio",
    );
  });

  it("discovers 24h CrCl via '24 hour urine'", () => {
    const results = searchCalculators("24 hour urine");
    expect(results.map((r) => r.document.slug)).toContain(
      "creatinine-clearance-24h",
    );
  });

  it("discovers TC/HDL via 'total cholesterol hdl'", () => {
    const results = searchCalculators("total cholesterol hdl");
    expect(results.map((r) => r.document.slug)).toContain(
      "total-cholesterol-hdl-ratio",
    );
  });

  it("discovers AIP via 'atherogenic index'", () => {
    const results = searchCalculators("atherogenic index");
    expect(results.map((r) => r.document.slug)).toContain(
      "atherogenic-index-of-plasma",
    );
  });

  it("discovers ApoB/ApoA1 via 'apolipoprotein'", () => {
    const results = searchCalculators("apolipoprotein");
    expect(results.map((r) => r.document.slug)).toContain(
      "apob-apoa1-ratio",
    );
  });

  it("discovers respiratory compensation via 'expected bicarbonate'", () => {
    const results = searchCalculators("expected bicarbonate");
    expect(results.map((r) => r.document.slug)).toContain(
      "respiratory-compensation",
    );
  });

  it("discovers metabolic alkalosis compensation via 'metabolic alkalosis'", () => {
    const results = searchCalculators("metabolic alkalosis");
    expect(results.map((r) => r.document.slug)).toContain(
      "metabolic-alkalosis-compensation",
    );
  });

  it("discovers FTI via 'free thyroxine index'", () => {
    const results = searchCalculators("free thyroxine index");
    expect(results.map((r) => r.document.slug)).toContain(
      "free-thyroxine-index",
    );
  });

  it("discovers metabolic syndrome via 'metabolic syndrome'", () => {
    const results = searchCalculators("metabolic syndrome");
    expect(results.map((r) => r.document.slug)).toContain(
      "metabolic-syndrome-atp3",
    );
  });

  it("each new calculator appears at most once per query", () => {
    for (const slug of NEW_SLUGS) {
      const slugs = searchCalculators(slug).map((r) => r.document.slug);
      expect(slugs.length, `${slug} duplicate in results`).toBe(
        new Set(slugs).size,
      );
    }
  });
});

/* ------------------------------------------------------------------
   Sprint 1.9 Batch 5 — Obstetrics discovery regression tests
   ------------------------------------------------------------------ */

describe("Sprint 1.9 Batch 5 obstetrics discovery", () => {
  const NEW_SLUGS = [
    "bishop-score",
    "biophysical-profile",
    "hellp-syndrome",
    "hadlock-efw",
    "preeclampsia-criteria",
    "gestational-weight-gain",
    "magnesium-sulfate-preeclampsia",
    "ebl-obstetric",
    "epds",
  ];

  it("every new calculator is in the search index", () => {
    const index = buildSearchIndex();
    const slugs = new Set(index.map((d) => d.slug));
    for (const slug of NEW_SLUGS) {
      expect(slugs.has(slug), `${slug} missing from search index`).toBe(true);
    }
  });

  it("discovers Bishop Score via 'bishop score'", () => {
    const results = searchCalculators("bishop score");
    expect(results.map((r) => r.document.slug)).toContain("bishop-score");
  });

  it("discovers BPP via 'biophysical profile' and 'BPP'", () => {
    const byName = searchCalculators("biophysical profile").map((r) => r.document.slug);
    const byAbbr = searchCalculators("BPP").map((r) => r.document.slug);
    expect(byName).toContain("biophysical-profile");
    expect(byAbbr).toContain("biophysical-profile");
  });

  it("discovers HELLP via 'HELLP syndrome'", () => {
    const results = searchCalculators("HELLP syndrome");
    expect(results.map((r) => r.document.slug)).toContain("hellp-syndrome");
  });

  it("discovers EFW via 'fetal weight' and 'estimated fetal weight'", () => {
    const byFetal = searchCalculators("fetal weight").map((r) => r.document.slug);
    const byFull = searchCalculators("estimated fetal weight").map((r) => r.document.slug);
    expect(byFetal).toContain("hadlock-efw");
    expect(byFull).toContain("hadlock-efw");
  });

  it("discovers preeclampsia criteria via 'preeclampsia' and 'pre eclampsia'", () => {
    const byTerm = searchCalculators("preeclampsia").map((r) => r.document.slug);
    const bySplit = searchCalculators("pre eclampsia").map((r) => r.document.slug);
    expect(byTerm).toContain("preeclampsia-criteria");
    expect(bySplit).toContain("preeclampsia-criteria");
  });

  it("discovers weight gain via 'gestational weight gain'", () => {
    const results = searchCalculators("gestational weight gain");
    expect(results.map((r) => r.document.slug)).toContain(
      "gestational-weight-gain",
    );
  });

  it("discovers MgSO4 via 'magnesium sulfate' and 'MgSO4'", () => {
    const byName = searchCalculators("magnesium sulfate").map((r) => r.document.slug);
    const byAbbr = searchCalculators("MgSO4").map((r) => r.document.slug);
    expect(byName).toContain("magnesium-sulfate-preeclampsia");
    expect(byAbbr).toContain("magnesium-sulfate-preeclampsia");
  });

  it("discovers EBL via 'estimated blood loss' and 'EBL'", () => {
    const byName = searchCalculators("estimated blood loss").map((r) => r.document.slug);
    const byAbbr = searchCalculators("EBL").map((r) => r.document.slug);
    expect(byName).toContain("ebl-obstetric");
    expect(byAbbr).toContain("ebl-obstetric");
  });

  it("discovers EPDS via 'edinburgh postnatal depression'", () => {
    const results = searchCalculators("edinburgh postnatal depression");
    expect(results.map((r) => r.document.slug)).toContain("epds");
  });

  it("each new calculator appears at most once per query", () => {
    for (const slug of NEW_SLUGS) {
      const slugs = searchCalculators(slug).map((r) => r.document.slug);
      expect(slugs.length, `${slug} duplicate in results`).toBe(
        new Set(slugs).size,
      );
    }
  });
});
