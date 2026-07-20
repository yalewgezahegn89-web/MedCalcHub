"use client";
import { forwardRef, useState, useCallback, type FormEvent } from "react";
import { cn } from "@/lib/utils/cn";
import { FormField } from "@/components/calculators/form-field";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/calculators/result-card";
import { CalculatorToolbar } from "@/components/calculators/toolbar";
import { copyToClipboard } from "@/lib/clipboard";
import { toast } from "sonner";
import type { CalculatorFormProps } from "./calculator-form.types";
import type { CalculatorResult } from "@/lib/calculators";

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
>(function CalculatorForm({ calculator, className, ...props }, ref) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    buildInitialValues(calculator.inputs.map((input) => input.id)),
  );

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));

    setErrors((prev) => {
      if (!prev[id]) {
        return prev;
      }

      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {};
  
    for (const input of calculator.inputs) {
      const value = values[input.id].trim();
  
      if (input.required && !value) {
        nextErrors[input.id] = `${input.label} is required.`;
        continue;
      }
  
      if (input.type === "number" && value) {
        const number = Number(value);
  
        if (Number.isNaN(number)) {
          nextErrors[input.id] = `${input.label} must be a valid number.`;
          continue;
        }
  
        if (input.min !== undefined && number < input.min) {
          nextErrors[input.id] =
            `${input.label} must be at least ${input.min}.`;
          continue;
        }
  
        if (input.max !== undefined && number > input.max) {
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

      const calculated = calculator.calculate(values);

      setResult(calculated);
    },
    [calculator, values, validate],
  );
  const handleReset = useCallback(() => {
    setValues(
      buildInitialValues(
        calculator.inputs.map((input) => input.id),
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
            onChange={(e) => handleChange(input.id, e.target.value)}
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
  onReset={handleReset}
  onCopy={async () => {
  if (!result) return;

  try {
    await copyToClipboard(
      `${calculator.name}

Result: ${result.value}${result.unit ? ` ${result.unit}` : ""}

Interpretation: ${result.interpretation}`
    );

    toast.success("Copied to clipboard!", {
      description: `${calculator.name} result copied successfully.`,
    });
  } catch {
    toast.error("Copy failed", {
      description: "Unable to copy the calculator result.",
    });
  }
}}
  onPrint={() => console.log("Print")}
  onShare={() => console.log("Share")}
  onFavorite={() => console.log("Favorite")}
/>

      {result && (
        <ResultCard
          label={calculator.name}
          value={result.value}
          unit={result.unit}
          interpretation={result.interpretation}
          status={result.status}
        />
      )}
    </form>
  );
});

CalculatorForm.displayName = "CalculatorForm";