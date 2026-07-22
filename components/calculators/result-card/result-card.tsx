"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Alert } from "@/components/feedback/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type {
  ResultCardProps,
  ResultCardStatus,
} from "./result-card.types";

const statusBadgeVariant: Record<
  ResultCardStatus,
  "success" | "warning" | "destructive"
> = {
  normal: "success",
  low: "warning",
  high: "destructive",
  critical: "destructive",
};

const statusAlertVariant: Record<
  ResultCardStatus,
  "success" | "warning" | "destructive"
> = {
  normal: "success",
  low: "warning",
  high: "destructive",
  critical: "destructive",
};
export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  function ResultCard(
    {
      className,
      label,
      value,
      unit,
      interpretation,
      status,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-background p-4 sm:p-6",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            {label}
          </span>

          {status && (
            <Badge variant={statusBadgeVariant[status]} size="sm">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </span>

          {unit && (
            <span className="text-muted-foreground text-sm font-medium">
              {unit}
            </span>
          )}
        </div>

        {interpretation && (
          <div className="mt-3">
            <Alert variant={statusAlertVariant[status ?? "normal"]}>
              <p className="text-sm leading-relaxed">
                {interpretation}
              </p>
            </Alert>
          </div>
        )}

        {children}
      </Card>
    );
  },
);

ResultCard.displayName = "ResultCard";