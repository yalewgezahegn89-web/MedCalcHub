import Link from "next/link";
import {
  getSpecialties,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";

export default function SpecialtiesPage() {
  const specialties = getSpecialties();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Medical Specialties
        </h1>

        <p className="mt-3 text-gray-600">
          Browse calculators by medical specialty.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {specialties.map((specialty) => {
          const calculators =
            getCalculatorsBySpecialty(specialty);

          return (
            <Link
              key={specialty}
              href={`/specialties/${encodeURIComponent(
                specialty.toLowerCase().replace(/\s+/g, "-"),
              )}`}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold">
                {specialty}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {calculators.length} calculator
                {calculators.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}

      </div>

    </div>
  );
}