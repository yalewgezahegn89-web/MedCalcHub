"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { CalendarDays, ShieldCheck, Star } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";

import type { CalculatorHeaderProps } from "./calculator-header.types";

export const CalculatorHeader = forwardRef<
  HTMLDivElement,
  CalculatorHeaderProps
>(function CalculatorHeader(
  {
    className,
    title,
    description,
    updatedAt,
    specialty,
    category,
    featured,
    actions,
    ...props
  },
  ref,
) {
  const specialtySlug = specialty
    ? `/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  const categorySlug = category
    ? `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <Card
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm dark:from-slate-900 dark:to-slate-950",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {category && categorySlug && (
              <Link
                href={categorySlug}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {category}
              </Link>
            )}

            {specialty && specialtySlug && (
              <Link
                href={specialtySlug}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
              >
                {specialty}
              </Link>
            )}

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Evidence-Based
            </span>

            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                Featured
              </span>
            )}

            {updatedAt && (
              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Updated {updatedAt}
              </span>
            )}
          </div>
        </div>

        {actions && (
          <div className="shrink-0">
            {actions}
          </div>
        )}
      </div>
    </Card>
  );
});

CalculatorHeader.displayName = "CalculatorHeader";