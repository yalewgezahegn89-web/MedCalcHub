export interface SearchDocument {
  slug: string;
  title: string;
  description: string;
  category: string;
  specialty: string;
  keywords: string[];
  score?: number;
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  matchedFields: string[];
}