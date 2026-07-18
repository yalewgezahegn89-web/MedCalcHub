"use client";

import { forwardRef, useState, useCallback, type FormEvent } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/forms/select";
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

export const CalculatorForm = forwardRef<HTMLFormElement, CalculatorFormProps>(
  function CalculatorForm({ calculator, className, ...props }, ref) {
    const [values, setValues] = useState<Record<string, string>>(() =>
      buildInitialValues(calculator.inputs.map((input) => input.id)),
    );
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const handleChange = useCallback(
      (id: string, value: string) => {
        setValues((prev) => ({ ...prev, [id]: value }));
      },
      [],
    );

    const handleSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const calculated = calculator.calculate(values);
        setResult(calculated);
      },
      [calculator, values],
    );

    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="space-y-4">
          {calculator.inputs.map((input) => {
            const inputId = `${calculator.id}-${input.id}`;

            return (
              <div key={input.id} className="space-y-1.5">
                <label
                  htmlFor={inputId}
                  className="text-sm font-medium text-foreground"
                >
                  {input.label}
                  {input.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </label>

                <div className="flex items-center gap-2">
                  {input.type === "select" ? (
                    <Select
                      id={inputId}
                      value={values[input.id]}
                      onChange={(e) =>
                        handleChange(input.id, e.target.value)
                      }
                      required={input.required}
                    >
                      <option value="">
                        {input.placeholder ?? "Select..."}
                      </option>
                      {input.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      id={inputId}
                      type={input.type}
                      value={values[input.id]}
                      onChange={(e) =>
                        handleChange(input.id, e.target.value)
                      }
                      placeholder={input.placeholder}
                      required={input.required}
                    />
                  )}

                  {input.unit && (
                    <span className="text-muted-foreground whitespace-nowrap text-sm font-medium">
                      {input.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
  },
);

CalculatorForm.displayName = "CalculatorForm";
