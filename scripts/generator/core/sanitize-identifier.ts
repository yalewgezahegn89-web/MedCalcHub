/**
 * Centralized TypeScript identifier sanitizer.
 *
 * Converts calculator slugs and other names into valid TypeScript
 * identifiers by removing invalid characters and applying camelCase.
 */

/**
 * Sanitize a name into a valid TypeScript identifier.
 *
 * Rules:
 * 1. Remove "-", "_", ".", "/", and spaces
 * 2. Convert following character to uppercase (camelCase)
 * 3. Remove any remaining non-alphanumeric characters
 * 4. If identifier starts with a digit, prefix "_"
 * 5. Preserve existing capitalization where reasonable
 * 6. Output is always a valid TypeScript identifier
 *
 * @example
 * sanitizeIdentifier("ckd-epi-2021") // => "ckdEpi2021"
 * sanitizeIdentifier("curb-65")      // => "curb65"
 * sanitizeIdentifier("q-sofa")       // => "qSofa"
 * sanitizeIdentifier("123-test")     // => "_123Test"
 */
export function sanitizeIdentifier(
  name: string,
): string {
  // Step 1: Split on any character that should trigger camelCase
  //         This handles "-", "_", ".", "/", and spaces
  const parts = name.split(/[-_./\s]+/);

  // Step 2: Build camelCase from parts
  let result = "";

  for (const part of parts) {
    if (!part) continue;

    if (result === "") {
      // First part: lowercase first char, keep rest as-is
      result =
        part.charAt(0).toLowerCase() + part.slice(1);
    } else {
      // Subsequent parts: uppercase first char, keep rest as-is
      result +=
        part.charAt(0).toUpperCase() + part.slice(1);
    }
  }

  // Step 3: Remove any remaining non-alphanumeric characters
  //         (catches edge cases like mixed unicode or special chars)
  result = result.replace(/[^a-zA-Z0-9]/g, "");

  // Step 4: If starts with a digit, prefix "_"
  if (/^[0-9]/.test(result)) {
    result = "_" + result;
  }

  return result;
}