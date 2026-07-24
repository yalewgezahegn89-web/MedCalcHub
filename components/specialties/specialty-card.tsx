import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { Specialty } from "@/lib/specialties/specialty.types";

type Props = Specialty & {
  count: number;
};

export function SpecialtyCard({
  name,
  slug,
  description,
  icon,
  count,
}: Props) {
  return (
    <Link href={`/specialties/${slug}`} className="block h-full">
      <Card className="h-full p-6 transition hover:border-primary hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{icon}</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="text-sm font-medium text-primary">
              {count} calculator{count === 1 ? "" : "s"} →
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}