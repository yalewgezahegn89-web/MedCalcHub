import {
  suggestCalculator,
} from "./generator/core/calculator-intelligence";


const result =
  suggestCalculator("bsa");


console.log(result.formula);
console.log(result.normalRange);