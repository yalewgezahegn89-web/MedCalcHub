"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { getFavorites } from "@/lib/favorites";
import {
  getCalculationHistory,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { getRecentCalculators } from "@/lib/recent";

import { calculatorRegistry } from "@/lib/calculators/registry";

/* ── subscribe helpers ── */

function subscribeFavorites(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-favorites-changed",
    handler,
  );
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-favorites-changed",
      handler,
    );
  };
}

function subscribeRecent(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-recent-changed",
    handler,
  );
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-recent-changed",
      handler,
    );
  };
}

function subscribeHistory(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-history-changed",
    handler,
  );
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-history-changed",
      handler,
    );
  };
}

/* ── snapshots ── */

function favSnapshot() {
  return JSON.stringify(getFavorites());
}
function favServer() {
  return "[]";
}

function recentSnapshot() {
  return JSON.stringify(getRecentCalculators());
}
function recentServer() {
  return "[]";
}

function historySnapshot() {
  return JSON.stringify(getCalculationHistory());
}
function historyServer() {
  return "[]";
}

/* ── page ── */

export default function WorkspacePage() {
  const favStr = useSyncExternalStore(
    subscribeFavorites,
    favSnapshot,
    favServer,
  );
  const favorites: string[] = JSON.parse(favStr);

  const recentStr = useSyncExternalStore(
    subscribeRecent,
    recentSnapshot,
    recentServer,
  );
  const recentIds: string[] = JSON.parse(recentStr);

  const historyStr = useSyncExternalStore(
    subscribeHistory,
    historySnapshot,
    historyServer,
  );
  const calculationHistory: CalculationHistoryItem[] =
    JSON.parse(historyStr);

  const favoriteCalculators = calculatorRegistry.filter(
    (calc) => favorites.includes(calc.id),
  );

  const recentCalculators = calculatorRegistry.filter(
    (calc) => recentIds.includes(calc.id),
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Clinical Workspace
        </h1>

        <p className="mt-3 text-slate-600">
          Your personalized MedCalcHub dashboard.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Favorites */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            ❤️ Favorites
          </h2>

          {favoriteCalculators.length === 0 ? (
            <p className="text-slate-500">
              No favorite calculators yet.
            </p>
          ) : (
            <div className="space-y-3">
              {favoriteCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  className="block rounded-lg border p-3 transition hover:bg-slate-50"
                >
                  <div className="font-medium">
                    {calc.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {calc.category}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Recent Calculations */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            🕒 Recent Calculations
          </h2>

          {calculationHistory.length === 0 ? (
            <p className="text-slate-500">
              No calculations yet.
            </p>
          ) : (
            <div className="space-y-3">
              {calculationHistory
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-3"
                  >
                    <div className="font-medium">
                      {item.calculatorName}
                    </div>

                    <div className="font-semibold text-blue-600">
                      {item.result}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {new Date(
                        item.timestamp,
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Recently Opened */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            ⚡ Recently Opened
          </h2>

          {recentCalculators.length === 0 ? (
            <p className="text-slate-500">
              No recently opened calculators.
            </p>
          ) : (
            <div className="space-y-3">
              {recentCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  className="block rounded-lg border p-3 transition hover:bg-slate-50"
                >
                  <div className="font-medium">
                    {calc.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {calc.category}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}