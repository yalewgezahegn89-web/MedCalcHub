import { calculatorRegistry } from "@/lib/calculators/registry";

export function searchCalculators(query: string) {
  const search = query.trim().toLowerCase();

  if (!search) {
    return calculatorRegistry;
  }

  return calculatorRegistry.filter((calculator) => {
    const searchable = [
      calculator.name,
      calculator.shortName,
      calculator.description,
      calculator.category,
      ...(calculator.keywords ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(search);
  });
}