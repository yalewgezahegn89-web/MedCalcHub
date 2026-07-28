import fs from "fs";
import path from "path";

const TEMPLATE_FOLDER =
  path.join(
    process.cwd(),
    "lib",
    "calculators",
    "templates",
  );

export function loadTemplate(
  file: string,
) {
  return fs.readFileSync(
    path.join(
      TEMPLATE_FOLDER,
      file,
    ),
    "utf8",
  );
}