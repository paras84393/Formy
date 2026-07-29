export type FieldType = 
  | 'text' | 'textarea' | 'email' | 'number' | 'phone' | 'url'
  | 'checkbox' | 'radio' | 'dropdown' | 'multiselect' | 'toggle'
  | 'date' | 'time' | 'file' | 'rating' | 'signature'
  | 'section' | 'image' | 'textblock';

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'url' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'custom';
  message: string;
  value?: string | number;
  regex?: string;
}

export interface ConditionalRule {
  id: string;
  condition: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  fieldId: string;
  value: string;
  action: 'show' | 'hide' | 'require' | 'disable';
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  disabled: boolean;
  helpText?: string;
  defaultValue?: string | number | boolean;
  options?: FieldOption[];
  allowCustom?: boolean;
  validations: ValidationRule[];
  conditionals: ConditionalRule[];
  className?: string;
  columnSpan?: 1 | 2 | 3 | 4 | 6 | 12;
  createdAt: number;
  updatedAt: number;
}