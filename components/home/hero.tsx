"use client";

import Link from "next/link";
import {
  Calculator,
  Search,
  ArrowRight,
  Activity,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 px-8 py-16 text-white shadow-2xl">

      {/* Background decoration */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-24 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />

      <div className="relative z-10 max-w-4xl">

        {/* Badge */}

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          <Activity className="h-4 w-4" />
          Evidence-Based Clinical Calculators
        </div>

        {/* Title */}

        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
          MedCalcHub
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-8 text-blue-100">
          Professional medical calculators built for physicians,
          nurses, pharmacists, medical students, and healthcare
          professionals.
        </p>

        <p className="mt-4 max-w-3xl text-blue-100">
          Calculate clinical scores instantly with automatic
          interpretation, reference ranges, clinical notes,
          and evidence-based guidance.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:scale-105"
          >
            <Calculator className="h-5 w-5" />
            Browse Calculators
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
            Search Calculator
          </Link>

        </div>

        {/* Stats */}

        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">

          <div>
            <p className="text-3xl font-bold">40+</p>
            <p className="text-sm text-blue-100">
              Clinical Calculators
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-blue-100">
              Categories
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold">10+</p>
            <p className="text-sm text-blue-100">
              Medical Fields
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold">100%</p>
            <p className="text-sm text-blue-100">
              Free Access
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}