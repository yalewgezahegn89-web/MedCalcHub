import fs from "fs";
import path from "path";

export function writeGeneratedFile(
  relativePath: string,
  content: string,
) {
  const fullPath = path.join(
    process.cwd(),
    relativePath,
  );

  const directory = path.dirname(fullPath);

  fs.mkdirSync(directory, {
    recursive: true,
  });

  fs.writeFileSync(
    fullPath,
    content,
    "utf8",
  );

  console.log(
    `✓ Generated ${relativePath}`,
  );
}