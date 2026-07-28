import type {
  Classification,
} from "./calculator.types";

export type ResultStatus =
  | "normal"
  | "low"
  | "high"
  | "critical";

export type EngineResult = {
  interpretation: string;
  status: ResultStatus;
  color:
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "gray";
};

export function classifyResult(
  value: number,
  classifications: Classification[],
): EngineResult {
  for (const classification of classifications) {
    const aboveMin =
      classification.min === undefined ||
      value >= classification.min;

    const belowMax =
      classification.max === undefined ||
      value <= classification.max;

    if (aboveMin && belowMax) {
      let status: ResultStatus = "normal";

      switch (classification.color) {
        case "green":
          status = "normal";
          break;

        case "yellow":
          status = "low";
          break;

        case "orange":
          status = "high";
          break;

        case "red":
        case "gray":
          status = "critical";
          break;
      }

      return {
        interpretation:
          classification.label,
        status,
        color:
          classification.color ??
          "green",
      };
    }
  }

  return {
    interpretation: "Unknown",
    status: "normal",
    color: "green",
  };
}