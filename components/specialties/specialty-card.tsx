import Link from "next/link";
import { Card } from "@/components/ui/card";

type Props = {
  name: string;
  slug: string;
  description: string;
  count: number;
};

export function SpecialtyCard({
  name,
  slug,
  description,
  count,
}: Props) {
  return (
    <Link href={`/${slug}`}>
      <Card className="h-full p-6 transition hover:border-primary hover:shadow-md">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            {name}
          </h2>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          <div className="text-sm font-medium text-primary">
            {count} calculators →
          </div>
        </div>
      </Card>
    </Link>
  );
}