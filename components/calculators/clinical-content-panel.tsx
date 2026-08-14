/**
 * Sprint 1.8 — Clinical Content Panel
 *
 * Renders extended clinical content when available.
 * Falls back gracefully when no clinical content exists.
 */

import type { ClinicalContent } from "@/lib/clinical-content";

type ClinicalContentPanelProps = {
  content: ClinicalContent;
};

export function ClinicalContentPanel({
  content,
}: ClinicalContentPanelProps) {
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

      {content.clinicalSignificance && (
        <Section title="Clinical Significance">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.clinicalSignificance}
          </p>
        </Section>
      )}

      {content.whenToUse &&
        content.whenToUse.length > 0 && (
          <Section title="When to Use">
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {content.whenToUse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

      {content.whenNotToUse &&
        content.whenNotToUse.length > 0 && (
          <Section title="When Not to Use">
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {content.whenNotToUse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
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

      {content.limitations &&
        content.limitations.length > 0 && (
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
                {Object.entries(
                  content.example.inputs,
                ).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-gray-500 dark:text-gray-400">
                      {key}:
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {content.example.expectedResult && (
            <p className="text-gray-700 dark:text-gray-300 text-sm italic">
              {content.example.expectedResult}
            </p>
          )}
        </Section>
      )}

      {content.references &&
        content.references.length > 0 && (
          <Section title="References">
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              {content.references.map((ref, i) => (
                <li key={i}>
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

      {content.disclaimer && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <span className="font-semibold">
              Disclaimer:{" "}
            </span>
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