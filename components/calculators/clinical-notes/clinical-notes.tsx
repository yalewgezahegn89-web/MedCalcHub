import { Card } from "@/components/ui/card";
import type { ClinicalNotesProps } from "./clinical-notes.types";

export function ClinicalNotes({
  formula,
  normalRange,
  clinicalNotes,
  references,
}: ClinicalNotesProps) {
  if (
    !formula &&
    !normalRange &&
    !clinicalNotes &&
    (!references || references.length === 0)
  ) {
    return null;
  }

  return (
    <Card className="space-y-6 p-6">
      <h2 className="text-xl font-semibold">
        Clinical Notes
      </h2>

      {formula && (
        <section>
          <h3 className="mb-2 font-medium">
            Formula
          </h3>

          <p className="text-sm text-muted-foreground">
            {formula}
          </p>
        </section>
      )}

      {normalRange && (
        <section>
          <h3 className="mb-2 font-medium">
            Normal Range
          </h3>

          <p className="text-sm text-muted-foreground">
            {normalRange}
          </p>
        </section>
      )}

      {clinicalNotes && (
        <section>
          <h3 className="mb-2 font-medium">
            Clinical Notes
          </h3>

          <p className="text-sm leading-6 text-muted-foreground">
            {clinicalNotes}
          </p>
        </section>
      )}

      {references && references.length > 0 && (
        <section>
          <h3 className="mb-2 font-medium">
            References
          </h3>

          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {references.map((reference) => (
              <li key={reference}>
                {reference}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Card>
  );
}