import { Injectable } from '@angular/core';

/**
 * Declarative validation rules supported by ValidationService.
 * Add a new rule type here + a matching `case` in `checkRule` to extend.
 */
export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'min'; value: number; message?: string }
  | { type: 'max'; value: number; message?: string }
  | { type: 'integer'; message?: string }
  | { type: 'positive'; message?: string };

export interface FieldSchema {
  /** Human-friendly label used in default error messages, e.g. "Zone name". */
  label?: string;
  rules: ValidationRule[];
}

export type ValidationSchema<T = Record<string, unknown>> = {
  [K in keyof T]?: FieldSchema;
};

export type ValidationErrors<T = Record<string, string>> = {
  [K in keyof T]?: string;
};

@Injectable({ providedIn: 'root' })
export class ValidationService {
  /** Validate a single value against a single field schema. Returns '' when valid. */
  validateField(value: unknown, schema: FieldSchema): string {
    const label = schema.label ?? 'Field';
    const stringValue = value === null || value === undefined ? '' : String(value);
    const trimmed = stringValue.trim();

    for (const rule of schema.rules) {
      const error = this.checkRule(trimmed, value, rule, label);
      if (error) return error;
    }
    return '';
  }

  /** Validate an object of values against a schema. Returns a `{ field: message }` map. */
  validate<T extends object>(
    values: T,
    schema: ValidationSchema<T>,
  ): ValidationErrors<T> {
    const errors: ValidationErrors<T> = {};
    (Object.keys(schema) as Array<keyof T>).forEach((key) => {
      const fieldSchema = schema[key];
      if (!fieldSchema) return;
      const error = this.validateField(values[key], fieldSchema);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  }

  /** True if any field has a non-empty error string. */
  hasErrors<T>(errors: ValidationErrors<T>): boolean {
    return Object.values(errors).some((msg) => !!msg);
  }

  /** First non-empty error in declaration order, useful for toasts. */
  firstError<T>(errors: ValidationErrors<T>): string {
    for (const msg of Object.values(errors)) {
      if (msg) return msg as string;
    }
    return '';
  }

  private checkRule(
    trimmed: string,
    rawValue: unknown,
    rule: ValidationRule,
    label: string,
  ): string {
    switch (rule.type) {
      case 'required': {
        const isEmpty =
          rawValue === null ||
          rawValue === undefined ||
          (typeof rawValue !== 'number' && trimmed.length === 0);
        return isEmpty ? (rule.message ?? `${label} is required.`) : '';
      }

      case 'minLength': {
        if (trimmed.length === 0) return '';
        return trimmed.length < rule.value
          ? (rule.message ?? `${label} must be at least ${rule.value} characters.`)
          : '';
      }

      case 'maxLength': {
        return trimmed.length > rule.value
          ? (rule.message ?? `${label} must be at most ${rule.value} characters.`)
          : '';
      }

      case 'pattern': {
        if (trimmed.length === 0) return '';
        return rule.value.test(trimmed)
          ? ''
          : (rule.message ?? `${label} is invalid.`);
      }

      case 'email': {
        if (trimmed.length === 0) return '';
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRe.test(trimmed)
          ? ''
          : (rule.message ?? `${label} must be a valid email.`);
      }

      case 'min': {
        if (rawValue === '' || rawValue === null || rawValue === undefined) return '';
        const num = Number(rawValue);
        if (Number.isNaN(num)) return '';
        return num < rule.value
          ? (rule.message ?? `${label} must be at least ${rule.value}.`)
          : '';
      }

      case 'max': {
        if (rawValue === '' || rawValue === null || rawValue === undefined) return '';
        const num = Number(rawValue);
        if (Number.isNaN(num)) return '';
        return num > rule.value
          ? (rule.message ?? `${label} must be at most ${rule.value}.`)
          : '';
      }

      case 'integer': {
        if (rawValue === '' || rawValue === null || rawValue === undefined) return '';
        const num = Number(rawValue);
        return Number.isInteger(num)
          ? ''
          : (rule.message ?? `${label} must be an integer.`);
      }

      case 'positive': {
        if (rawValue === '' || rawValue === null || rawValue === undefined) return '';
        const num = Number(rawValue);
        if (Number.isNaN(num)) return '';
        return num > 0
          ? ''
          : (rule.message ?? `${label} must be a positive number.`);
      }

      default:
        return '';
    }
  }
}
