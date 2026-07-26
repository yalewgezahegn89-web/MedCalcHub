"use client";

import { Calculator, Heart, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  calculator: CalculatorDefinition;
};

export function CalculatorHeader({ calculator }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">

      {/* Decorative Background */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />

      <div className="relative z-10">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          <div className="flex gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Calculator className="h-10 w-10" />
            </div>

            <div>

              <div className="mb-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                  {calculator.category}
                </span>

                {calculator.specialty && (
                  <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-sm font-semibold">
                    {calculator.specialty}
                  </span>
                )}

              </div>

              <h1 className="text-4xl font-extrabold">
                {calculator.name}
              </h1>

              <p className="mt-4 max-w-3xl text-blue-100">
                {calculator.description}
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25">
              <Heart className="h-5 w-5" />
            </button>

            <button className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25">
              <Share2 className="h-5 w-5" />
            </button>

          </div>

        </div>

        <div className="mt-8">

          <Link
            href={`${calculator.slug}/calculate`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow transition hover:scale-105"
          >
            Open Calculator
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </div>

    </section>
  );
}