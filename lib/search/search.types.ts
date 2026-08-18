export interface SearchDocument {
  slug: string;
  title: string;
  description: string;
  category: string;
  specialty: string;
  keywords: string[];
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  matchedFields: string[];
}