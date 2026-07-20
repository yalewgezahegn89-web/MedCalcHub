"use client";

import { forwardRef, useState, useCallback, type FormEvent } from "react";
import { cn } from "@/lib/utils/cn";
import { FormField } from "@/components/calculators/form-field";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/calculators/result-card";
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
      if (input.required && !values[input.id].trim()) {
        nextErrors[input.id] = `${input.label} is required.`;
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

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Calculate
      </Button>

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