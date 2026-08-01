import type {
  ClassificationRule,
} from "../../../types";

import {
  buildClassification,
} from "./classification-builder";


export interface InterpretationOptions {

  name?: string;

  shortName?: string;

  slug?: string;

  category?: string;

  specialty?: string;

  description?: string;

  formula?: string;

  normalRange?: string;

  keywords?: string[];

  reference?: string;

  reviewedBy?: string;

  classification?: readonly ClassificationRule[];

}



export function buildInterpretation(
  options: InterpretationOptions,
): string {

  return buildClassification(
    options.classification ?? [],
  );

}