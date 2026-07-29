import { useState } from 'react';
import { Field } from '@/types';
import { validateField } from '@/utils/validators';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (fields: Field[], formValues: Record<string, any>) => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const result = validateField(formValues[field.id], field.validations);
      if (!result.isValid && result.error) {
        newErrors[field.id] = result.error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors, setErrors };
};