"use client";

import { useEffect } from "react";
import Link from "next/link";

type CalculatorErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CalculatorError({
  error,
  reset,
}: CalculatorErrorProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error("Calculator page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          Something went wrong
        </h2>

        <p className="mb-6 text-sm text-slate-600">
          This calculator encountered an unexpected error.
          Please try again or return to the calculators list.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>

          <Link
            href="/calculators"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to calculators
          </Link>
        </div>
      </div>
    </div>
  );
}