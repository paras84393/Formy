import { FieldType } from '@/types';

export const FIELD_TYPES: Record<FieldType, { label: string; icon: string; category: string }> = {
  text: { label: 'Short Text', icon: '📝', category: 'input' },
  textarea: { label: 'Long Text', icon: '📄', category: 'input' },
  email: { label: 'Email', icon: '✉️', category: 'input' },
  number: { label: 'Number', icon: '🔢', category: 'input' },
  phone: { label: 'Phone', icon: '☎️', category: 'input' },
  url: { label: 'URL', icon: '🔗', category: 'input' },
  checkbox: { label: 'Checkbox', icon: '☑️', category: 'selection' },
  radio: { label: 'Radio', icon: '⭕', category: 'selection' },
  dropdown: { label: 'Dropdown', icon: '▼', category: 'selection' },
  multiselect: { label: 'Multi-Select', icon: '✓', category: 'selection' },
  toggle: { label: 'Toggle', icon: '🔘', category: 'selection' },
  date: { label: 'Date', icon: '📅', category: 'advanced' },
  time: { label: 'Time', icon: '🕐', category: 'advanced' },
  file: { label: 'File Upload', icon: '📎', category: 'advanced' },
  rating: { label: 'Rating', icon: '⭐', category: 'advanced' },
  signature: { label: 'Signature', icon: '✍️', category: 'advanced' },
  section: { label: 'Section', icon: '📑', category: 'layout' },
  image: { label: 'Image', icon: '🖼️', category: 'layout' },
  textblock: { label: 'Text Block', icon: '📌', category: 'layout' },
};

export const FIELD_CATEGORIES = {
  input: 'Text Input',
  selection: 'Selection',
  advanced: 'Advanced',
  layout: 'Layout',
};

export const VALIDATION_TYPES = [
  'required',
  'email',
  'url',
  'minLength',
  'maxLength',
  'min',
  'max',
  'pattern',
  'custom',
];

export const CONDITION_OPERATORS = [
  'equals',
  'notEquals',
  'contains',
  'greaterThan',
  'lessThan',
];

export const COLUMN_SPANS = [1, 2, 3, 4, 6, 12] as const;