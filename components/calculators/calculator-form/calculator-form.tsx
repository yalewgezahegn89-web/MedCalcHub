"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { cn } from "@/lib/utils/cn";
import { FormField } from "@/components/calculators/form-field";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/calculators/result-card";
import { ClassificationCard } from "@/components/calculators/classification-card";
import { CalculatorToolbar } from "@/components/calculators/toolbar";

import { copyToClipboard } from "@/lib/clipboard";
import { saveCalculation } from "@/lib/history/history";
import {
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites";

import { toast } from "sonner";

import type { CalculatorFormProps } from "./calculator-form.types";
import type { CalculatorResult } from "@/lib/calculators";

const FAVORITES_EVENT = "medcalchub-favorites-changed";

function subscribeFavorites(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(FAVORITES_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(FAVORITES_EVENT, handler);
  };
}

function buildInitialValues(
  ids: string[],
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const id of ids) {
    values[id] = "";
  }

  return values;
}

export const CalculatorForm = forwardRef<
  HTMLFormElement,
  CalculatorFormProps
>(function CalculatorForm(
  { calculator, className, ...props },
  ref,
) {
  const [values, setValues] = useState<
    Record<string, string>
  >(() =>
    buildInitialValues(
      calculator.inputs.map((input) => input.id),
    ),
  );

  const [result, setResult] =
    useState<CalculatorResult | null>(null);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [favKey, setFavKey] = useState(0);

  const isFav = useSyncExternalStore(
    subscribeFavorites,
    () =>
      isFavorite(calculator.slug) + ":" + favKey,
    () => "false",
  );

  const handleChange = useCallback(
    (id: string, value: string) => {
      setValues((prev) => ({
        ...prev,
        [id]: value,
      }));

      setErrors((prev) => {
        if (!prev[id]) {
          return prev;
        }

        const next = { ...prev };
        delete next[id];

        return next;
      });
    },
    [],
  );

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {};

    for (const input of calculator.inputs) {
      const value = values[input.id].trim();

      if (input.required && !value) {
        nextErrors[input.id] =
          `${input.label} is required.`;
        continue;
      }

      if (input.type === "number" && value) {
        const number = Number(value);

        if (Number.isNaN(number)) {
          nextErrors[input.id] =
            `${input.label} must be a valid number.`;
          continue;
        }

        if (
          input.min !== undefined &&
          number < input.min
        ) {
          nextErrors[input.id] =
            `${input.label} must be at least ${input.min}.`;
          continue;
        }

        if (
          input.max !== undefined &&
          number > input.max
        ) {
          nextErrors[input.id] =
            `${input.label} must be at most ${input.max}.`;
        }
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }, [calculator.inputs, values]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      let calculated;

      try {
        calculated =
          calculator.calculate(values);
      } catch (err) {
        console.error(
          `Calculator ${calculator.id} failed:`,
          err,
        );

        toast.error("Calculation failed", {
          description:
            "An unexpected error occurred while calculating. Please check your inputs and try again.",
        });

        return;
      }

      setResult(calculated);

      try {
        saveCalculation({
          calculatorId: calculator.id,
          calculatorName: calculator.name,
          result: `${calculated.value}${
            calculated.unit
              ? ` ${calculated.unit}`
              : ""
          }`,
          timestamp: Date.now(),
        });
      } catch {
        // History save failure is non-critical — log silently
        console.warn(
          "Failed to save calculation history",
        );
      }
    },
    [calculator, values, validate],
  );

  const handleReset = useCallback(() => {
    setValues(
      buildInitialValues(
        calculator.inputs.map(
          (input) => input.id,
        ),
      ),
    );

    setErrors({});
    setResult(null);
  }, [calculator.inputs]);

  return (
    <form
      ref={ref}
      className={cn("space-y-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {calculator.inputs.map((input) => {
        const inputId = `${calculator.id}-${input.id}`;

        return (
          <FormField
            key={input.id}
            input={input}
            inputId={inputId}
            value={values[input.id]}
            error={errors[input.id]}
            onChange={(e) =>
              handleChange(
                input.id,
                e.target.value,
              )
            }
          />
        );
      })}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
      >
        Calculate
      </Button>

      <CalculatorToolbar
        isFavorite={isFav.startsWith("true")}
        onReset={handleReset}
        onCopy={async () => {
          if (!result) return;

          try {
            await copyToClipboard(
              `${calculator.name}

Result: ${result.value}${
                result.unit
                  ? ` ${result.unit}`
                  : ""
              }

Interpretation: ${
                result.interpretation
              }`,
            );

            toast.success(
              "Copied to clipboard!",
              {
                description: `${calculator.name} result copied successfully.`,
              },
            );
          } catch {
            toast.error("Copy failed", {
              description:
                "Unable to copy the calculator result.",
            });
          }
        }}
        onPrint={() => {
          window.print();
        }}
        onShare={async () => {
          const url = window.location.href;

          if (navigator.share) {
            try {
              await navigator.share({
                title: calculator.name,
                text: calculator.description,
                url,
              });
              return;
            } catch (err: unknown) {
              if (
                err instanceof DOMException &&
                err.name === "AbortError"
              ) {
                return;
              }
            }
          }

          try {
            const ok =
              await copyToClipboard(url);

            if (ok) {
              toast.success("Link copied!", {
                description:
                  "Calculator URL copied to clipboard.",
              });
            } else {
              toast.error(
                "Could not copy link",
              );
            }
          } catch {
            toast.error(
              "Could not copy link",
            );
          }
        }}
        onFavorite={() => {
          const added = toggleFavorite(
            calculator.slug,
          );
          setFavKey((k) => k + 1);
          toast.info(
            added
              ? "Added to favorites"
              : "Removed from favorites",
            { description: calculator.name },
          );
        }}
      />

      {result && (
        <>
          <ResultCard
            label={calculator.name}
            value={result.value}
            unit={result.unit}
            interpretation={
              result.interpretation
            }
            status={result.status}
          />

          <ClassificationCard
            title="Clinical Classification"
            value={Number(result.value)}
          />
        </>
      )}
    </form>
  );
});

CalculatorForm.displayName = "CalculatorForm";