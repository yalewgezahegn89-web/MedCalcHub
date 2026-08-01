import fs from "fs";
import path from "path";

import type { GeneratorOptions } from "../../types";

const FORMULA_FILE =
  path.join(
    process.cwd(),
    "lib",
    "formula-engine",
    "formulas.ts",
  );


export function updateFormulaRegistry(
  options: GeneratorOptions,
) {
  const file =
    fs.readFileSync(
      FORMULA_FILE,
      "utf8",
    );


  const entry = `
  ${options.slug}: (values) => {
    return {
      value: "",
      interpretation:
        "Clinical interpretation pending.",
      status: "normal",
    };
  },
`;


  if (
    file.includes(`${options.slug}:`)
  ) {
    return;
  }


  const updated =
    file.replace(
      "export const formulas = {",
      `export const formulas = {\n${entry}`,
    );


  fs.writeFileSync(
    FORMULA_FILE,
    updated,
    "utf8",
  );
}