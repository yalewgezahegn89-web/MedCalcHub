"use client";

import { Card } from "@/components/ui/card";
import type { ReferenceRange } from "@/lib/calculators/calculator.types";

type Props = {
  normalRange?: string;
  referenceRanges?: ReferenceRange[];
};

function formatAgeGroup(ageGroup?: ReferenceRange["ageGroup"]): string | null {
  if (!ageGroup) return null;

  const unit = ageGroup.unit ?? "years";

  if (ageGroup.min !== undefined && ageGroup.max !== undefined) {
    return `${ageGroup.min}–${ageGroup.max} ${unit}`;
  }
  if (ageGroup.min !== undefined) {
    return `${ageGroup.min}+ ${unit}`;
  }
  if (ageGroup.max !== undefined) {
    return `≤ ${ageGroup.max} ${unit}`;
  }
  return null;
}

function formatMetadataLabel(item: ReferenceRange): string | null {
  const parts: string[] = [];

  if (item.population && item.population !== "all") {
    parts.push(item.population === "pediatric" ? "Pediatric" : "Adult");
  }

  if (item.sex && item.sex !== "all") {
    parts.push(item.sex === "male" ? "Male" : "Female");
  }

  const age = formatAgeGroup(item.ageGroup);
  if (age) {
    parts.push(`Age: ${age}`);
  }

  if (item.pregnancy === true) {
    parts.push("Pregnancy");
  }

  if (item.context) {
    parts.push(item.context);
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

export function ReferenceRanges({
  normalRange,
  referenceRanges,
}: Props) {
  if (
    !normalRange &&
    (!referenceRanges || referenceRanges.length === 0)
  ) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">
        📋 Reference Ranges
      </h2>

      {normalRange && (
        <div className="mb-4 rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">
            Normal Range
          </p>

          <p className="text-lg font-semibold">
            {normalRange}
          </p>
        </div>
      )}

      {referenceRanges &&
        referenceRanges.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">
                  Classification
                </th>

                <th className="py-2 text-left">
                  Range
                </th>
              </tr>
            </thead>

            <tbody>
              {referenceRanges.map((item) => {
                const metadataLabel = formatMetadataLabel(item);
                const rangeValue = item.unit
                  ? `${item.range} ${item.unit}`
                  : item.range;

                return (
                  <tr
                    key={item.label}
                    className="border-b"
                  >
                    <td className="py-2">
                      <div>
                        {item.label}

                        {metadataLabel && (
                          <div className="text-xs text-muted-foreground">
                            {metadataLabel}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-2">
                      {rangeValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
    </Card>
  );
}