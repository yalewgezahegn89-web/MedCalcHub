import {
  calculatorKnowledge,
  CalculatorKey,
} from "../knowledge/index";


export type BatchMode =
  | "v2"
  | "specialty";


export function getCalculatorsByMode(
  mode: BatchMode,
  specialty?: string,
): CalculatorKey[] {

  const allKeys =
    Object.keys(
      calculatorKnowledge,
    ) as CalculatorKey[];


  switch (mode) {

    case "v2":
      return allKeys;


    case "specialty": {

      if (!specialty) {
        throw new Error(
          "Specialty mode requires --specialty flag.\n" +
          "Example: npm run generate:specialty -- --specialty=nephrology",
        );
      }


      const filtered =
        allKeys.filter((key) => {
          const entry =
            calculatorKnowledge[key];
          return (
            entry.specialty
              ?.toLowerCase() ===
            specialty.toLowerCase()
          );
        });


      if (filtered.length === 0) {
        throw new Error(
          `No calculators found for specialty "${specialty}".\n` +
          `Available specialties: ${getAvailableSpecialties().join(", ")}`,
        );
      }


      return filtered;
    }

    default:
      throw new Error(
        `Unknown batch mode: "${mode}".\n` +
        `Supported modes: v2, specialty`,
      );
  }
}


export function getAvailableSpecialties(): string[] {
  const allKeys =
    Object.keys(
      calculatorKnowledge,
    ) as CalculatorKey[];

  const specialties =
    new Set<string>();

  for (const key of allKeys) {
    const entry =
      calculatorKnowledge[key];
    if (entry.specialty) {
      specialties.add(
        entry.specialty,
      );
    }
  }

  return [...specialties].sort();
}