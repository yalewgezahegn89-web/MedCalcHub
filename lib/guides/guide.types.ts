import type { ClinicalReference } from "@/lib/clinical-content/clinical-content.types";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuidePublication = {
  publishedAt: string;
  updatedAt: string;
};

export type GuideDefinition = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category?: string;
  specialty?: string;
  introduction: string[];
  sections: GuideSection[];
  relatedCalculators: string[];
  relatedGuides?: string[];
  references: ClinicalReference[];
  publication: GuidePublication;
  disclaimer: string;
};