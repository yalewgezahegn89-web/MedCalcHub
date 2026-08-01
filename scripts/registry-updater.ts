import fs from "node:fs";
import path from "node:path";
import { calculatorVariable } from "./utils";


export function updateRegistry(
  slug: string,
) {

  const registryPath =
    path.join(
      process.cwd(),
      "lib",
      "calculators",
      "registry.ts",
    );


  let registry =
    fs.readFileSync(
      registryPath,
      "utf8",
    );


  const variable =
    calculatorVariable(slug);


  const importLine =
    `import { ${variable} } from "./${slug}";`;


  // Add import only once
  if (!registry.includes(importLine)) {

    registry =
      registry.replace(
        'import type { CalculatorDefinition } from "./calculator.types";',
        `import type { CalculatorDefinition } from "./calculator.types";\n${importLine}`,
      );
  }



  const registryEntry =
    `  ${variable},`;



  // Add calculator only once
  if (!registry.includes(registryEntry)) {

    const marker =
      "export const calculatorRegistry: CalculatorDefinition[] = [";


    registry =
      registry.replace(
        marker,
        `${marker}\n${registryEntry}`,
      );
  }



  fs.writeFileSync(
    registryPath,
    registry,
    "utf8",
  );


  console.log(
    "✓ Registry updated",
  );
}