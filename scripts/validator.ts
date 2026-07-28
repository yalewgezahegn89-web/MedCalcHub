import fs from "node:fs";
import path from "node:path";

export function calculatorExists(
  slug: string,
): boolean {
  const file = path.join(
    process.cwd(),
    "lib",
    "calculators",
    `${slug}.ts`,
  );

  return fs.existsSync(file);
}

export function validateSlug(
  slug: string,
) {
  if (!slug) {
    throw new Error(
      "Slug cannot be empty.",
    );
  }

  if (
    !/^[a-z0-9-]+$/.test(slug)
  ) {
    throw new Error(
      "Slug must contain lowercase letters, numbers, and hyphens only.",
    );
  }

  if (calculatorExists(slug)) {
    throw new Error(
      `Calculator "${slug}" already exists.`,
    );
  }
}