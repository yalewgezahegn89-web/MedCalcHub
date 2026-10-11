import { Card } from "@/components/ui/card";
import type { ClinicalNotesProps } from "./clinical-notes.types";

export function ClinicalNotes({
  clinicalNotes,
  className,
}: ClinicalNotesProps) {
  if (!clinicalNotes) {
    return null;
  }

  return (
    <Card className={`p-6 ${className ?? ""}`}>
      <h2 className="mb-2 text-xl font-semibold">
        Clinical Notes
      </h2>

      <p className="text-sm leading-6 text-muted-foreground">
        {clinicalNotes}
      </p>
    </Card>
  );
}
