/**
 * Sprint 1.8 — Clinical Content Types
 *
 * Extended clinical education content stored separately from
 * calculator definition and calculation logic.
 */

import type { FAQItem } from "@/lib/calculators/calculator.types";
import type { ComparisonMetadata } from "@/lib/calculators/calculator.types";
import type { CalculatorEvidence } from "@/lib/calculators/calculator.types";

/** Population-specific interpretation metadata */
export type InterpretationGuide = {
  /** General interpretation guidance text */
  guide?: string;
  /** Whether interpretation thresholds vary by sex */
  sexSpecific?: boolean;
  /** Whether interpretation thresholds vary by age */
  ageSpecific?: boolean;
  /** Whether pediatric ranges differ from adult ranges */
  pediatric?: boolean;
  /** Whether pregnancy-specific interpretation applies */
  pregnancy?: boolean;
};

/** Worked example for a calculator */
export type ClinicalExample = {
  /** Brief clinical scenario description */
  description?: string;
  /** Example input values keyed by input id */
  inputs?: Record<string, string>;
  /** Expected output description */
  expectedResult?: string;
};

/** Structured reference with citation metadata */
export type ClinicalReference = {
  /** Full citation text */
  citation: string;
  /** Optional link to the source */
  url?: string;
  /** Evidence level (e.g., "Level I", "Grade A", "Expert Consensus") */
  level?: string;
};

/** Extended clinical content for a calculator */
export type ClinicalContent = {
  /** What the calculator measures clinically */
  clinicalPurpose?: string;

  /** Step-by-step usage guidance */
  howToUse?: string[];

  /** Interpretation guide metadata */
  interpretation?: InterpretationGuide;

  /** Clinical scenarios where this calculator should be used */
  whenToUse?: string[];

  /** Clinical scenarios where this calculator should NOT be used */
  whenNotToUse?: string[];

  /** Known clinical limitations */
  limitations?: string[];

  /** Worked example with sample inputs and expected result */
  example?: ClinicalExample;

  /** Why this calculation matters clinically */
  clinicalSignificance?: string;

  /** Structured references with citation metadata */
  references?: ClinicalReference[];

  /** FAQ items (relocated from CalculatorDefinition for extended content) */
  faq?: FAQItem[];

  /** Comparison with other calculators */
  comparison?: ComparisonMetadata;

  /** Evidence and source information */
  evidence?: CalculatorEvidence;

  /** Clinical disclaimer shown to users */
  disclaimer?: string;
};