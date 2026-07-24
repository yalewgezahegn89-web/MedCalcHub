import { Card } from "@/components/ui/card";
import type { Specialty } from "@/lib/specialties/specialty.types";

type SpecialtyHeaderProps = {
  specialty: Specialty;
  count: number;
};

export function SpecialtyHeader({ specialty, count }: SpecialtyHeaderProps) {
  return (
    <Card className="border-none bg-background/60 p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{specialty.icon}</span>
            <div>
              <h1 className="text-3xl font-semibold">{specialty.name}</h1>
              <p className="text-sm text-muted-foreground">{specialty.description}</p>
            </div>
          </div>
        </div>

        <div className="rounded-full border border-border px-4 py-2 text-sm font-medium text-primary">
          {count} calculator{count === 1 ? "" : "s"}
        </div>
      </div>
    </Card>
  );
}
