/**
 * Internationalization (i18n) Plugin
 *
 * Automatically extracts all user-facing text from
 * calculator knowledge and generates translation
 * resource files.
 *
 * This plugin MUST NOT modify calculators.
 * It only generates localization resources.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { GeneratorPlugin } from "./types";
import { calculatorKnowledge } from "../knowledge";
import type {
  CalculatorSuggestion,
} from "../core/calculator-intelligence";
import {
  getGeneratorConfig,
} from "../core/config";

const DISPLAY_NAMES: Record<string, string> = {
  en: "English",
  am: "Amharic",
  fr: "French",
  es: "Spanish",
  ar: "Arabic",
  pt: "Portuguese",
};

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(
  filePath: string,
  content: string,
): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function formatDisplayName(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

// ─────────────────────────────────────────────────
// Locale JSON Builder
// ─────────────────────────────────────────────────

interface InputLocale {
  [id: string]: string;
}

interface ClassificationLocale {
  [key: string]: string;
}

interface FaqLocale {
  question: string;
  answer: string;
}

interface ClinicalGuidanceLocale {
  advice: string[];
  warnings: string[];
  followUp: string[];
}

interface CalculatorLocale {
  title: string;
  description: string;
  inputs: InputLocale;
  classification: ClassificationLocale;
  faq: FaqLocale[];
  clinicalGuidance: ClinicalGuidanceLocale;
}

function buildEnglishLocale(
  slug: string,
  entry: CalculatorSuggestion,
): CalculatorLocale {
  const locale: CalculatorLocale = {
    title: formatDisplayName(slug),
    description: entry.description || "",
    inputs: {},
    classification: {},
    faq: [],
    clinicalGuidance: {
      advice: [],
      warnings: [],
      followUp: [],
    },
  };

  // Inputs
  if (entry.inputs) {
    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        label?: string;
      };
      locale.inputs[inpObj.id] =
        inpObj.label || formatDisplayName(inpObj.id);
    }
  }

  // Classification
  if (entry.classification) {
    for (const cls of entry.classification) {
      const clsObj = cls as {
        label?: string;
        range?: string;
      };
      const key = (
        clsObj.label || clsObj.range || ""
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      if (key) {
        locale.classification[key] =
          clsObj.label || clsObj.range || "";
      }
    }
  }

  // FAQ
  if (entry.faq) {
    locale.faq = entry.faq.map((f) => {
      const faq = f as {
        question: string;
        answer: string;
      };
      return {
        question: faq.question,
        answer: faq.answer,
      };
    });
  }

  // Clinical Guidance
  const cg = entry.clinicalGuidance as Record<
    string,
    string[]
  > | undefined;

  if (cg) {
    if (Array.isArray(cg.advice)) {
      locale.clinicalGuidance.advice =
        [...cg.advice];
    }

    if (Array.isArray(cg.warnings)) {
      locale.clinicalGuidance.warnings =
        [...cg.warnings];
    }

    if (Array.isArray(cg.followUp)) {
      locale.clinicalGuidance.followUp =
        [...cg.followUp];
    }
  }

  return locale;
}

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ─────────────────────────────────────────────────
// Plugin
// ─────────────────────────────────────────────────

const plugin: GeneratorPlugin = {
  name: "Internationalization",
  order: 96,
  enabled: true,
  execute(_context) {
    const config = getGeneratorConfig();
    const localesDir = path.resolve(
      process.cwd(),
      config.generator.localesDirectory,
    );
    const docsDir = path.resolve(
      process.cwd(),
      config.generator.docsDirectory,
    );
    const languages =
      config.localization.supportedLanguages;

    const knowledge =
      calculatorKnowledge as Record<
        string,
        CalculatorSuggestion
      >;

    const slugs =
      Object.keys(knowledge).sort();

    // Ensure locale directories exist
    for (const lang of languages) {
      ensureDir(
        path.join(localesDir, lang, "calculators"),
      );
    }

    // Generate locale files for each calculator
    for (const slug of slugs) {
      const entry = knowledge[slug];
      const enLocale = buildEnglishLocale(
        slug,
        entry,
      );

      for (const lang of languages) {
        const localeData =
          lang === "en"
            ? enLocale
            : deepCopy(enLocale);

        const filePath = path.join(
          localesDir,
          lang,
          "calculators",
          `${slug}.json`,
        );

        writeFile(
          filePath,
          JSON.stringify(localeData, null, 2) + "\n",
        );
      }
    }

    // Generate manifest
    const manifest = {
      languages,
      calculatorCount: slugs.length,
      generated: new Date().toISOString(),
    };

    writeFile(
      path.join(localesDir, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
    );

    // Generate i18n documentation
    const docLines: string[] = [];

    docLines.push("# Internationalization (i18n)");
    docLines.push("");
    docLines.push("## Supported Languages");
    docLines.push("");

    for (const lang of languages) {
      const name = DISPLAY_NAMES[lang] || lang;
      docLines.push(
        `- \`${lang}\` — ${name}`,
      );
    }

    docLines.push("");
    docLines.push(
      `**Total Calculators**: ${slugs.length}`,
    );
    docLines.push(
      `**Total Files**: ${slugs.length * languages.length}`,
    );
    docLines.push("");

    docLines.push("## Translation Progress");
    docLines.push("");
    docLines.push(
      "| Language | Status |",
    );
    docLines.push(
      "|----------|--------|",
    );
    docLines.push(
      "| English (en) | ✅ Complete |",
    );

    for (
      const lang of languages.slice(1)
    ) {
      const name = DISPLAY_NAMES[lang] || lang;
      docLines.push(
        `| ${name} (${lang}) | 🔄 Pending |`,
      );
    }

    docLines.push("");

    docLines.push("## Folder Structure");
    docLines.push("");
    docLines.push("```");
    docLines.push("locales/");

    for (const lang of languages) {
      docLines.push(`  ${lang}/`);
      docLines.push("    calculators/");
      docLines.push(`      <slug>.json`);
    }

    docLines.push("  manifest.json");
    docLines.push("```");
    docLines.push("");

    docLines.push("## How to Translate");
    docLines.push("");
    docLines.push(
      "1. Open the target language folder under `locales/`",
    );
    docLines.push(
      "2. Open the calculator JSON file (e.g., `locales/fr/calculators/bmi.json`)",
    );
    docLines.push(
      "3. Translate all string values while keeping the JSON keys unchanged",
    );
    docLines.push(
      "4. Do NOT modify the English (`en`) files directly",
    );
    docLines.push("");

    docLines.push("## How to Add a New Language");
    docLines.push("");
    docLines.push(
      "1. Add the language code to `localization.supportedLanguages` in `generator.config.ts`",
    );
    docLines.push(
      "2. Add a display name to the `DISPLAY_NAMES` map",
    );
    docLines.push(
      "3. Run the generator: `npm run generate`",
    );
    docLines.push(
      "4. Translate the generated placeholder files",
    );
    docLines.push("");

    writeFile(
      path.join(docsDir, "i18n.md"),
      docLines.join("\n"),
    );

    console.log(
      `🌐 Generated ${slugs.length * languages.length} locale files across ${languages.length} languages`,
    );
  },
};

export default plugin;