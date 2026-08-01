import {
  normalizeFormula,
} from "./generator/core/formula-engine/normalize";

console.log(
  normalizeFormula(
    "BMI = weight / height²",
  ),
);

console.log(
  normalizeFormula(
    "MAP = (SBP + 2 × DBP) / 3",
  ),
);

console.log(
  normalizeFormula(
    "BSA = √((height × weight)/3600)",
  ),
);