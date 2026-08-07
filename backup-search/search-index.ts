import { calculatorRegistry } from "@/lib/calculators/registry";
import type { SearchDocument } from "./search.types";

export function buildSearchIndex(): SearchDocument[] {
  return calculatorRegistry.map((calc) => ({
    slug: calc.slug,
    title: calc.name,
    description: calc.description,
    category: calc.category,
    specialty: calc.specialty ?? "",
    keywords: calc.keywords ?? [],
  }));
}