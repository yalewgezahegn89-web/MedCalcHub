import { Input } from "@/components/ui/input";
import { Select } from "@/components/forms/select";
import { FormFieldProps } from "./form-field.types";

export function FormField({
  input,
  inputId,
  value,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-foreground"
      >
        {input.label}
        {input.required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>

      <div className="flex items-center gap-2">
        {input.type === "select" ? (
          <Select
            id={inputId}
            value={value}
            onChange={onChange}
            required={input.required}
            error={!!error}
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
            value={value}
            onChange={onChange}
            placeholder={input.placeholder}
            required={input.required}
            min={input.min}
            max={input.max}
            step={input.step}
            error={!!error}
          />
        )}

        {input.unit && (
          <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
            {input.unit}
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}