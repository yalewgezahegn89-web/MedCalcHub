"use client";

import Link from "next/link";
import { Clock, Heart, ArrowRight } from "lucide-react";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { getFavorites } from "@/lib/favorites";
import { getRecentCalculators } from "@/lib/recent";

export default function Dashboard() {
  const favoriteIds = getFavorites();
  const recentIds = getRecentCalculators();

  const favorites = calculatorRegistry.filter((calc) =>
    favoriteIds.includes(calc.id),
  );

  const recent = recentIds
    .map((id) =>
      calculatorRegistry.find((calc) => calc.id === id),
    )
    .filter(Boolean);

  return (
    <div className="space-y-10">

      {/* Welcome */}

      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Continue where you left off or quickly access your
          favorite clinical calculators.
        </p>
      </section>

      {/* Recent */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Clock className="h-6 w-6 text-blue-600" />
            Continue Working
          </h2>

          <Link
            href="/recent"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {recent.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
              No recently used calculators.
            </div>
          ) : (
            recent.slice(0, 6).map((calc) => (
              <Link
                key={calc!.id}
                href={`/calculators/${calc!.slug}`}
                className="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {calc!.category}
                </span>

                <h3 className="mt-3 font-semibold">
                  {calc!.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {calc!.description}
                </p>
              </Link>
            ))
          )}

        </div>

      </section>

      {/* Favorites */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Heart className="h-6 w-6 fill-red-500 text-red-500" />
            Favorites
          </h2>

          <Link
            href="/favorites"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {favorites.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
              No favorite calculators yet.
            </div>
          ) : (
            favorites.slice(0, 6).map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  {calc.category}
                </span>

                <h3 className="mt-3 font-semibold">
                  {calc.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {calc.description}
                </p>
              </Link>
            ))
          )}

        </div>

      </section>

    </div>
  );
}