import { calculatorKnowledge } from "./generator/knowledge";
import { calculatorRegistry } from "../lib/calculators/registry";

interface AuditResult {
  slug: string;
  name: string;
  hasKnowledge: boolean;
  hasClinicalGuidance: boolean;
  hasFAQ: boolean;
  hasEvidence: boolean;
  hasComparison: boolean;
  hasRelatedCalculators: boolean;
  hasReferenceRanges: boolean;
  hasClassification: boolean;
  hasSEOMetadata: boolean;
  manuallyMaintained: boolean;
  v2Complete: boolean;
}

function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-")
    .trim();
}

const results: AuditResult[] = [];

for (const calc of calculatorRegistry) {
  const key = normalizeKey(calc.slug || calc.id);
  const knowledge = calculatorKnowledge[key as keyof typeof calculatorKnowledge];

  const hasKnowledge = Boolean(knowledge);
  const hasClinicalGuidance = hasKnowledge && Boolean(
    (knowledge as any).clinicalGuidance ||
    (knowledge as any).clinical
  );
  const hasFAQ = hasKnowledge && Boolean((knowledge as any).faq);
  const hasEvidence = hasKnowledge && Boolean((knowledge as any).evidence);
  const hasComparison = hasKnowledge && Boolean((knowledge as any).comparison);
  const hasRelatedCalculators = hasKnowledge && Boolean((knowledge as any).relatedCalculators);
  const hasReferenceRanges = hasKnowledge && Boolean((knowledge as any).referenceRanges || (knowledge as any).classification);
  const hasClassification = hasKnowledge && Boolean((knowledge as any).classification);

  // SEO metadata: keywords from knowledge
  const hasSEOMetadata = hasKnowledge && Boolean((knowledge as any).keywords?.length > 0);

  // Manually maintained: has calculate function with imports from utils
  const fs = require("fs");
  const path = `lib/calculators/${calc.slug || calc.id}.ts`;
  let manuallyMaintained = false;
  try {
    const content = fs.readFileSync(path, "utf-8");
    manuallyMaintained = content.includes('from "./utils/') || content.includes("from './utils/");
  } catch {
    manuallyMaintained = false;
  }

  const v2Complete = hasKnowledge && hasClinicalGuidance && hasFAQ && hasEvidence && hasComparison && hasRelatedCalculators;

  results.push({
    slug: calc.slug || calc.id,
    name: calc.name,
    hasKnowledge,
    hasClinicalGuidance,
    hasFAQ,
    hasEvidence,
    hasComparison,
    hasRelatedCalculators,
    hasReferenceRanges,
    hasClassification,
    hasSEOMetadata,
    manuallyMaintained,
    v2Complete,
  });
}

console.log("\n=== GENERATOR V2 AUDIT ===\n");

console.log(`Total calculators in registry: ${results.length}`);
console.log(`Knowledge entries: ${Object.keys(calculatorKnowledge).length}`);
console.log(`Calculators with knowledge: ${results.filter(r => r.hasKnowledge).length}`);
console.log(`Calculators with V2 complete: ${results.filter(r => r.v2Complete).length}`);
console.log(`Manually maintained: ${results.filter(r => r.manuallyMaintained).length}`);

console.log("\n--- V2 COMPLETE ---");
for (const r of results.filter(r => r.v2Complete)) {
  console.log(`  ✓ ${r.slug} (${r.name})`);
}

console.log("\n--- MISSING KNOWLEDGE ---");
for (const r of results.filter(r => !r.hasKnowledge)) {
  console.log(`  ✗ ${r.slug} (${r.name})`);
}

console.log("\n--- PARTIAL KNOWLEDGE (missing V2 features) ---");
for (const r of results.filter(r => r.hasKnowledge && !r.v2Complete)) {
  const missing: string[] = [];
  if (!r.hasClinicalGuidance) missing.push("clinicalGuidance");
  if (!r.hasFAQ) missing.push("faq");
  if (!r.hasEvidence) missing.push("evidence");
  if (!r.hasComparison) missing.push("comparison");
  if (!r.hasRelatedCalculators) missing.push("relatedCalculators");
  console.log(`  ~ ${r.slug} (${r.name}) — missing: ${missing.join(", ")}`);
}

console.log("\n--- MANUALLY MAINTAINED ---");
for (const r of results.filter(r => r.manuallyMaintained)) {
  console.log(`  🔧 ${r.slug} (${r.name})`);
}

console.log("\n--- FULL DETAIL ---");
for (const r of results) {
  const checks = [
    r.hasKnowledge ? "knowledge" : "×knowledge",
    r.hasClinicalGuidance ? "guidance" : "×guidance",
    r.hasFAQ ? "faq" : "×faq",
    r.hasEvidence ? "evidence" : "×evidence",
    r.hasComparison ? "comparison" : "×comparison",
    r.hasRelatedCalculators ? "related" : "×related",
    r.hasReferenceRanges ? "refRanges" : "×refRanges",
    r.hasClassification ? "classification" : "×classification",
    r.hasSEOMetadata ? "seo" : "×seo",
    r.manuallyMaintained ? "manual" : "",
  ].filter(Boolean).join(" | ");
  console.log(`  ${r.slug}: ${checks}`);
}