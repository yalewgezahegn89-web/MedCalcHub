import fs from "node:fs";
import path from "node:path";

const TEMPLATE_FOLDER = path.join(
  process.cwd(),
  "scripts",
  "generator",
  "templates",
);

export function loadTemplate(
  file: string,
): string {
  const templatePath = path.join(
    TEMPLATE_FOLDER,
    file,
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Template not found: ${templatePath}`,
    );
  }

  return fs.readFileSync(
    templatePath,
    "utf8",
  );
}