/**
 * Sprint 1.8 — Clinical Content Panel
 *
 * Renders extended clinical content when available.
 * Falls back gracefully when no clinical content exists.
 */
import Link from "next/link";

import type { ClinicalContent } from "@/lib/clinical-content";

type ClinicalContentPanelProps = {
  content: ClinicalContent;
};

export function ClinicalContentPanel({
  content,
}: ClinicalContentPanelProps) {
  const hasContent =
    content.clinicalPurpose ||
    (content.howToUse && content.howToUse.length > 0) ||
    content.formulaExplanation ||
    (content.variables && content.variables.length > 0) ||
    content.interpretation?.guide ||
    content.clinicalSignificance ||
    (content.whenToUse && content.whenToUse.length > 0) ||
    (content.whenNotToUse && content.whenNotToUse.length > 0) ||
    (content.commonMistakes && content.commonMistakes.length > 0) ||
    content.clinicalPearl ||
    (content.limitations && content.limitations.length > 0) ||
    content.example ||
    content.evidence ||
    (content.references && content.references.length > 0) ||
    (content.faq && content.faq.length > 0) ||
    (content.comparison &&
      content.comparison.calculators &&
      content.comparison.calculators.length > 0) ||
    (content.relatedGuideIds && content.relatedGuideIds.length > 0) ||
    content.review ||
    content.disclaimer;

  if (!hasContent) {
    return null;
  }

  const listedCitations = new Set(
    (content.references ?? []).map((ref) => ref.citation),
  );
  const evidenceReferenceListed =
    !!content.evidence?.reference &&
    listedCitations.has(content.evidence.reference);
  const additionalEvidenceReferences = (
    content.evidence?.references ?? []
  ).filter(
    (citation) =>
      !listedCitations.has(citation) &&
      citation !== content.evidence?.reference,
  );

  return (
    <div className="space-y-6">
      {content.clinicalPurpose && (
        <Section title="What This Calculator Measures">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.clinicalPurpose}
          </p>
        </Section>
      )}

      {content.howToUse && content.howToUse.length > 0 && (
        <Section title="How to Use">
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Section>
      )}

      {content.formulaExplanation && (
        <Section title="How the Calculation Works">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.formulaExplanation}
          </p>
        </Section>
      )}

      {content.variables && content.variables.length > 0 && (
        <Section title="Variables Explained">
          <div className="space-y-3">
            {content.variables.map((variable, i) => (
              <div key={variable.inputId ?? i}>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {variable.label ?? variable.inputId}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {variable.explanation}
                </p>
                {variable.commonError && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Common error:</span>{" "}
                    {variable.commonError}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {content.interpretation?.guide && (
        <Section title="Interpretation Guide">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.interpretation.guide}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {content.interpretation.sexSpecific && (
              <Badge label="Sex-specific interpretation" />
            )}
            {content.interpretation.ageSpecific && (
              <Badge label="Age-specific interpretation" />
            )}
            {content.interpretation.pediatric && (
              <Badge label="Pediatric ranges differ" />
            )}
            {content.interpretation.pregnancy && (
              <Badge label="Pregnancy-specific" />
            )}
          </div>
        </Section>
      )}

      {content.clinicalSignificance && (
        <Section title="Clinical Significance">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.clinicalSignificance}
          </p>
        </Section>
      )}

      {content.whenToUse && content.whenToUse.length > 0 && (
        <Section title="When It Is Useful">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {content.whenToUse.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {content.whenNotToUse && content.whenNotToUse.length > 0 && (
        <Section title="When It Is Not Useful">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {content.whenNotToUse.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <Section title="Common Mistakes">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {content.commonMistakes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {content.clinicalPearl && (
        <Section title="Clinical Pearl">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.clinicalPearl}
          </p>
        </Section>
      )}

      {content.limitations && content.limitations.length > 0 && (
        <Section title="Limitations">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {content.limitations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {content.example && (
        <Section title="Worked Example">
          {content.example.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {content.example.description}
            </p>
          )}
          {content.example.inputs && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Inputs:
              </p>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {Object.entries(content.example.inputs).map(
                  ([key, val]) => (
                    <div key={key}>
                      <span className="text-gray-500 dark:text-gray-400">
                        {key}:
                      </span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        {val}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          {content.example.expectedResult && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Expected Result:</span>{" "}
              {content.example.expectedResult}
            </p>
          )}
        </Section>
      )}

      {content.evidence && (
        <Section title="Evidence &amp; References">
          <dl className="text-sm space-y-2">
            {content.evidence.source && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Source:
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {content.evidence.source}
                </dd>
              </div>
            )}
            {content.evidence.reference && !evidenceReferenceListed && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Reference:
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 break-words">
                  {content.evidence.reference}
                </dd>
              </div>
            )}
            {content.evidence.reviewedBy && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Reviewed by:
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {content.evidence.reviewedBy}
                </dd>
              </div>
            )}
            {content.evidence.updatedAt && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Content updated:
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {content.evidence.updatedAt}
                </dd>
              </div>
            )}
            {content.evidence.link && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Link:
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 break-all">
                  <a
                    href={content.evidence.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gray-400 hover:decoration-gray-600 break-all"
                  >
                    {content.evidence.link}
                  </a>
                </dd>
              </div>
            )}
          </dl>
          {additionalEvidenceReferences.length > 0 && (
            <ol className="mt-3 list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {additionalEvidenceReferences.map((ref, i) => (
                <li key={i} className="break-words">
                  {ref}
                </li>
              ))}
            </ol>
          )}
        </Section>
      )}

      {content.references && content.references.length > 0 && (
        <Section title="References">
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            {content.references.map((ref, i) => (
              <li key={i} className="break-words">
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gray-400 hover:decoration-gray-600"
                  >
                    {ref.citation}
                  </a>
                ) : (
                  <span>{ref.citation}</span>
                )}
                {ref.level && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {" "}
                    ({ref.level})
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {content.faq && content.faq.length > 0 && (
        <Section title="Frequently Asked Questions">
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <div key={i}>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {item.question}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {content.comparison &&
        content.comparison.calculators &&
        content.comparison.calculators.length > 0 && (
          <Section
            title={
              content.comparison.title ??
              "Related Clinical Calculators"
            }
          >
            <div className="space-y-3">
              {content.comparison.calculators.map((item, i) => (
                <div
                  key={item.href ?? i}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-3"
                >
                  <Link
                    href={item.href}
                    className="font-medium text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    {item.name}
                  </Link>
                  {item.bestFor && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.bestFor}
                    </p>
                  )}
                  {item.limitation && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.limitation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

      {Array.isArray(content.relatedGuideIds) &&
        content.relatedGuideIds.length > 0 &&
        false /* Guides system not yet implemented */ && (
          <Section title="Related Guides">
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {(content.relatedGuideIds ?? []).map((id, i) => (
                <li key={i}>{id}</li>
              ))}
            </ul>
          </Section>
        )}

      {content.review && (
        <Section title="Review">
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {content.review.reviewedDate && (
              <p>Reviewed: {content.review.reviewedDate}</p>
            )}
            {content.review.reviewer && (
              <p>Reviewer: {content.review.reviewer}</p>
            )}
            {typeof content.review.sourcesVerified === "boolean" && (
              <p>
                Sources verified: {content.review.sourcesVerified ? "Yes" : "No"}
              </p>
            )}
          </div>
        </Section>
      )}

      {content.disclaimer && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <span className="font-semibold">Disclaimer: </span>
            {content.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
      {label}
    </span>
  );
}