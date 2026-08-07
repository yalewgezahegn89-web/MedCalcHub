import { buildSearchIndex } from "./search-index";
import type {
  SearchDocument,
  SearchResult,
} from "./search.types";

const WEIGHTS: Record<string, number> = {
  title: 100,
  keywords: 60,
  category: 40,
  specialty: 30,
  description: 20,
};

export function searchCalculators(
  query: string,
): SearchResult[] {
  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const terms = trimmed
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  if (terms.length === 0) {
    return [];
  }

  const index = buildSearchIndex();

  const results: SearchResult[] = [];

  for (const doc of index) {
    const { score, matchedFields } = scoreDocument(
      doc,
      terms,
    );

    if (score > 0) {
      results.push({
        document: doc,
        score,
        matchedFields,
      });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.document.title.localeCompare(
      b.document.title,
    );
  });

  return results;
}

function scoreDocument(
  doc: SearchDocument,
  terms: string[],
): { score: number; matchedFields: string[] } {
  let totalScore = 0;
  const matchedFieldsSet = new Set<string>();

  for (const term of terms) {
    const titleMatch = doc.title
      .toLowerCase()
      .includes(term);
    const keywordsMatch = doc.keywords.some((k) =>
      k.toLowerCase().includes(term),
    );
    const categoryMatch = doc.category
      .toLowerCase()
      .includes(term);
    const specialtyMatch = doc.specialty
      .toLowerCase()
      .includes(term);
    const descriptionMatch = doc.description
      .toLowerCase()
      .includes(term);

    if (titleMatch) {
      totalScore += WEIGHTS.title;
      matchedFieldsSet.add("title");
    }
    if (keywordsMatch) {
      totalScore += WEIGHTS.keywords;
      matchedFieldsSet.add("keywords");
    }
    if (categoryMatch) {
      totalScore += WEIGHTS.category;
      matchedFieldsSet.add("category");
    }
    if (specialtyMatch) {
      totalScore += WEIGHTS.specialty;
      matchedFieldsSet.add("specialty");
    }
    if (descriptionMatch) {
      totalScore += WEIGHTS.description;
      matchedFieldsSet.add("description");
    }
  }

  return {
    score: totalScore,
    matchedFields: Array.from(matchedFieldsSet),
  };
}