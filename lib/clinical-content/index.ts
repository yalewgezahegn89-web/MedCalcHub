/**
 * Sprint 1.8 — Clinical Content barrel export
 */

export type {
  ClinicalContent,
  InterpretationGuide,
  ClinicalExample,
  ClinicalReference,
} from "./clinical-content.types";

export {
  clinicalContentRegistry,
} from "./registry";

import type { ClinicalContent } from "./clinical-content.types";
import { clinicalContentRegistry } from "./registry";

/**
 * Safe accessor for clinical content by calculator slug.
 * Returns undefined for unknown slugs — never throws.
 */
export function getClinicalContent(
  slug: string,
): ClinicalContent | undefined {
  return clinicalContentRegistry[slug];
}
