"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  Check,
  CheckCircle2,
  Clipboard,
  Info,
  Printer,
  Share2,
} from "lucide-react";

import { generateCalculatorReport } from "@/lib/pdf/generate-report";
import {
  buildResultText,
  type ResultSections,
} from "@/lib/result-presentation";

import type { CalculatorResult } from "@/lib/calculators";

type ResultCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  interpretation?: string;
  status?: "low" | "normal" | "high" | "critical";
  statusLabel?: string;
  sections?: ResultSections;
};

export default function ResultCard({
  label,
  value,
  unit,
  interpretation,
  status = "normal",
  statusLabel,
  sections,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const badge = {
    low: {
      color:
        "bg-blue-100 text-blue-700 border-blue-200",
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Low",
    },
    normal: {
      color:
        "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: "Normal",
    },
    high: {
      color:
        "bg-amber-100 text-amber-700 border-amber-200",
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "High",
    },
    critical: {
      color:
        "bg-red-100 text-red-700 border-red-200",
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Critical",
    },
  }[status];

  const score =
    sections?.score !== undefined &&
    String(sections.score) !== String(value)
      ? sections.score
      : undefined;

  const resultForText: CalculatorResult = {
    value,
    unit,
    score: sections?.score,
    interpretation,
    warnings: sections?.warnings,
    advice: sections?.advice,
    followUp: sections?.followUp,
  };

  async function copyResult() {
    await navigator.clipboard.writeText(
      buildResultText(label, resultForText),
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function exportPdf() {
    generateCalculatorReport({
      calculator: label,
      result: String(value),
      unit,
      interpretation,
    });
  }

  function printResult() {
    window.print();
  }

  async function shareResult() {
    const text = buildResultText(label, resultForText);

    if (navigator.share) {
      await navigator.share({
        title: label,
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 text-white">
        <h2 className="text-lg font-semibold">
          {label}
        </h2>

        <div className="mt-4 text-5xl font-bold">
          {value}

          {unit && (
            <span className="ml-2 text-xl font-medium opacity-80">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${badge.color}`}
          >
            {badge.icon}
            {statusLabel ?? badge.label}
          </div>

          {score !== undefined && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Score: {score}
            </div>
          )}
        </div>

        {interpretation && (
          <div>
            <h3 className="font-semibold">
              Interpretation
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {interpretation}
            </p>
          </div>
        )}

        {(sections?.warnings.length ?? 0) > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
            <h3 className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              Warnings
            </h3>

            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-900 dark:text-amber-200">
              {sections?.warnings.map((warning, i) => (
                <li key={i}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {(sections?.advice.length ?? 0) > 0 && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
            <h3 className="flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-300">
              <Info className="h-4 w-4" />
              Advice
            </h3>

            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-900 dark:text-blue-200">
              {sections?.advice.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {(sections?.followUp.length ?? 0) > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <h3 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
              <CalendarClock className="h-4 w-4" />
              Follow-up
            </h3>

            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
              {sections?.followUp.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-4">
          <button
            onClick={copyResult}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4" />
                Copy
              </>
            )}
          </button>

          <button
            onClick={shareResult}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>

          <button
            onClick={printResult}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>

          <button
            onClick={exportPdf}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Printer className="h-4 w-4" />
            PDF
          </button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          Estimates are for clinical reference only and do
          not constitute a diagnosis.
        </p>
      </div>
    </div>
  );
}
