"use client";

import Link from "next/link";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import {
  MISSING_VALUE,
  prepareComparisonRows,
} from "@/lib/comparison";

type Props = {
  calculators: CalculatorDefinition[];
};

function Row({
  label,
  cells,
  last = false,
}: {
  label: string;
  cells: string[];
  last?: boolean;
}) {
  return (
    <tr>
      <td
        className={`px-4 py-3 font-medium ${last ? "" : "border-b"}`}
      >
        {label}
      </td>

      {cells.map((cell, index) => (
        <td
          key={index}
          className={`px-4 py-3 text-sm ${last ? "" : "border-b"}`}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
}

export function ComparisonTable({
  calculators,
}: Props) {
  const rows = prepareComparisonRows(calculators);

  if (rows.length < 2) {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th className="border-b px-4 py-3 text-left font-semibold">
              Feature
            </th>

            {rows.map((row) => (
              <th
                key={row.id}
                className="border-b px-4 py-3 text-left font-semibold"
              >
                <Link
                  href={`/calculators/${row.slug}`}
                  className="hover:underline"
                >
                  {row.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <Row
            label="Category"
            cells={rows.map((row) => row.category)}
          />

          <Row
            label="Specialty"
            cells={rows.map((row) => row.specialty)}
          />

          <Row
            label="Purpose / Best for"
            cells={rows.map((row) => row.purpose)}
          />

          <Row
            label="Limitation"
            cells={rows.map((row) => row.limitation)}
          />

          <Row
            label="Input fields"
            cells={rows.map((row) =>
              row.inputs.length > 0
                ? row.inputs.join(", ")
                : MISSING_VALUE,
            )}
          />

          <Row
            label="Formula"
            cells={rows.map((row) => row.formula)}
          />

          <Row
            label="Clinical notes"
            cells={rows.map((row) => row.clinicalNotes)}
          />

          <Row
            label="References"
            last
            cells={rows.map((row) =>
              row.referenceCount > 0
                ? String(row.referenceCount)
                : MISSING_VALUE,
            )}
          />
        </tbody>
      </table>
    </div>
  );
}
