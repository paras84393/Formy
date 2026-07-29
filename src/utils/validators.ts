export const validators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  phone: (value: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
  },

  minLength: (value: string, min: number) => value.length >= min,

  maxLength: (value: string, max: number) => value.length <= max,

  min: (value: number, min: number) => value >= min,

  max: (value: number, max: number) => value <= max,

  required: (value: any) => value !== undefined && value !== null && value !== '',

  pattern: (value: string, pattern: string) => {
    try {
      const regex = new RegExp(pattern);
      return regex.test(value);
    } catch {
      return false;
    }
  },
};

export const validateField = (
  value: any,
  validationRules: any[]
): { isValid: boolean; error?: string } => {
  for (const rule of validationRules) {
    switch (rule.type) {
      case 'required':
        if (!validators.required(value)) {
          return { isValid: false, error: rule.message || 'This field is required' };
        }
        break;

      case 'email':
        if (value && !validators.email(value)) {
          return { isValid: false, error: rule.message || 'Invalid email address' };
        }
        break;

      case 'url':
        if (value && !validators.url(value)) {
          return { isValid: false, error: rule.message || 'Invalid URL' };
        }
        break;

      case 'minLength':
        if (value && !validators.minLength(value, rule.value)) {
          return { isValid: false, error: rule.message || `Minimum ${rule.value} characters` };
        }
        break;

      case 'maxLength':
        if (value && !validators.maxLength(value, rule.value)) {
          return { isValid: false, error: rule.message || `Maximum ${rule.value} characters` };
        }
        break;

      case 'min':
        if (value && !validators.min(Number(value), rule.value)) {
          return { isValid: false, error: rule.message || `Minimum value is ${rule.value}` };
        }
        break;

      case 'max':
        if (value && !validators.max(Number(value), rule.value)) {
          return { isValid: false, error: rule.message || `Maximum value is ${rule.value}` };
        }
        break;

      case 'pattern':
        if (value && !validators.pattern(value, rule.regex)) {
          return { isValid: false, error: rule.message || 'Invalid format' };
        }
        break;
    }
  }

  return { isValid: true };
};