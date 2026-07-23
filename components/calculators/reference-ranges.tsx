"use client";

import { Card } from "@/components/ui/card";
import type { ReferenceRange } from "@/lib/calculators/calculator.types";

type Props = {
  normalRange?: string;
  referenceRanges?: ReferenceRange[];
};

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

      {referenceRanges && referenceRanges.length > 0 && (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Classification</th>
              <th className="py-2 text-left">Range</th>
            </tr>
          </thead>

          <tbody>
            {referenceRanges.map((item) => (
              <tr key={item.label} className="border-b">
                <td className="py-2">{item.label}</td>
                <td className="py-2">{item.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}