export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export function validateRequired(
  value: string,
  fieldName: string,
): ValidationResult {
  if (value.trim() === "") {
    return {
      valid: false,
      message: `${fieldName} is required.`,
    };
  }

  return {
    valid: true,
  };
}

export function validateNumber(
  value: string,
  fieldName: string,
): ValidationResult {
  const number = Number(value);

if (Number.isNaN(number)) {
    return {
      valid: false,
      message: `${fieldName} must be a valid number.`,
    };
  }

  return {
    valid: true,
  };
}
