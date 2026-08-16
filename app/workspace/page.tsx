"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Clock, Heart, X, Zap } from "lucide-react";

import { getFavorites, removeFavorite } from "@/lib/favorites";
import {
  getCalculationHistory,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { getRecentCalculators } from "@/lib/recent";
import { resolveWorkspaceCalculators } from "@/lib/workspace";

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

  const favoriteCalculators =
    resolveWorkspaceCalculators(favorites);

  const recentCalculators =
    resolveWorkspaceCalculators(recentIds);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Clinical Workspace
        </h1>

        <p className="mt-3 text-slate-600">
          Your personalized MedCalcHub dashboard. Save
          calculators for quick access and pick up where
          you left off.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Saved Calculators */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            Saved Calculators
          </h2>

          {favoriteCalculators.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Heart className="h-10 w-10 text-slate-300" />

              <p className="text-slate-500">
                No saved calculators yet.
              </p>

              <Link
                href="/"
                className="mt-1 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Calculators
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteCalculators.map((calc) => (
                <div
                  key={calc.id}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <Link
                    href={`/calculators/${calc.slug}`}
                    className="min-w-0 flex-1 transition hover:opacity-80"
                  >
                    <div className="truncate font-medium">
                      {calc.name}
                    </div>

                    <div className="text-sm text-slate-500">
                      {calc.category}
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      removeFavorite(calc.id)
                    }
                    aria-label={`Remove ${calc.name} from saved calculators`}
                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Calculations */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <Clock className="h-5 w-5 text-blue-600" />
            Recent Calculations
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
          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <Zap className="h-5 w-5 text-amber-500" />
            Recently Opened
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
