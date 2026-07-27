"use client";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  calculators: CalculatorDefinition[];
};

export function ComparisonTable({
  calculators,
}: Props) {
  if (calculators.length < 2) {
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

            {calculators.map((calculator) => (
              <th
                key={calculator.id}
                className="border-b px-4 py-3 text-left font-semibold"
              >
                {calculator.shortName ?? calculator.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          <tr>
            <td className="border-b px-4 py-3 font-medium">
              Category
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="border-b px-4 py-3"
              >
                {calculator.category}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border-b px-4 py-3 font-medium">
              Specialty
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="border-b px-4 py-3"
              >
                {calculator.specialty ?? "—"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border-b px-4 py-3 font-medium">
              Inputs
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="border-b px-4 py-3"
              >
                {calculator.inputs.length}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border-b px-4 py-3 font-medium">
              Formula
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="border-b px-4 py-3 text-sm"
              >
                {calculator.formula ?? "—"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border-b px-4 py-3 font-medium">
              Clinical Notes
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="border-b px-4 py-3 text-sm"
              >
                {calculator.clinicalNotes ?? "—"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="px-4 py-3 font-medium">
              References
            </td>

            {calculators.map((calculator) => (
              <td
                key={calculator.id}
                className="px-4 py-3 text-sm"
              >
                {calculator.references?.length ?? 0}
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
}