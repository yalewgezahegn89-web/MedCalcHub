import { findClassification } from "@/lib/calculators/utils/classification";

type ClassificationItem = {
  label: string;
  range: string;
  min?: number;
  max?: number;
  color?: "green" | "yellow" | "orange" | "red" | "gray";
};

type Props = {
  title?: string;
  value?: number;
  classification?: ClassificationItem[];
};

const colorClasses = {
  green: "border-green-500 bg-green-50 dark:bg-green-950/30",
  yellow: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
  orange: "border-orange-500 bg-orange-50 dark:bg-orange-950/30",
  red: "border-red-500 bg-red-50 dark:bg-red-950/30",
  gray: "border-gray-500 bg-gray-50 dark:bg-gray-900/30",
};

export function ClassificationCard({
  title = "Classification",
  value,
  classification,
}: Props) {
  if (
    value === undefined ||
    !classification ||
    classification.length === 0
  ) {
    return null;
  }

  const active = findClassification(
    value,
    classification,
  );

  return (
    <section className="mt-8 rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      <div className="space-y-2">
        {classification.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border p-3 ${
              active?.label === item.label
                ? colorClasses[item.color ?? "gray"]
                : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {item.label}
              </span>

              <span className="text-muted-foreground">
                {item.range}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}