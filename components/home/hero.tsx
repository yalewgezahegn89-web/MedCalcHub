"use client";

import Link from "next/link";
import { Search, Calculator } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-8 py-16 text-white shadow-xl">

      <div className="relative z-10 max-w-3xl">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
          <Calculator className="h-4 w-4" />
          Evidence-Based Clinical Tools
        </div>

        <h1 className="text-5xl font-extrabold leading-tight">
          MedCalcHub
        </h1>

        <p className="mt-4 text-xl text-blue-100">
          Clinical calculators for physicians, nurses,
          pharmacists, and healthcare professionals.
        </p>

        <p className="mt-2 max-w-2xl text-blue-100">
          Fast, accurate and evidence-based medical calculations
          with instant interpretation and downloadable reports.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            href="/calculators"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow transition hover:scale-105"
          >
            Browse Calculators
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
            Search
          </Link>

        </div>

      </div>

      {/* Decorative circles */}

      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute right-20 bottom-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />

    </section>
  );
}