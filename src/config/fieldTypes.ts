import { FieldType } from '@/types';

export const fieldTypeConfig: Record<FieldType, any> = {
  text: {
    label: 'Short Text',
    icon: '📝',
    category: 'input',
    defaultProps: {
      placeholder: 'Enter text',
    },
  },
  textarea: {
    label: 'Long Text',
    icon: '📄',
    category: 'input',
    defaultProps: {
      placeholder: 'Enter text',
    },
  },
  email: {
    label: 'Email',
    icon: '✉️',
    category: 'input',
    defaultProps: {
      placeholder: 'your@email.com',
    },
  },
  number: {
    label: 'Number',
    icon: '🔢',
    category: 'input',
    defaultProps: {
      placeholder: 'Enter a number',
    },
  },
  phone: {
    label: 'Phone',
    icon: '☎️',
    category: 'input',
    defaultProps: {
      placeholder: '+1 (555) 000-0000',
    },
  },
  url: {
    label: 'URL',
    icon: '🔗',
    category: 'input',
    defaultProps: {
      placeholder: 'https://example.com',
    },
  },
  checkbox: {
    label: 'Checkbox',
    icon: '☑️',
    category: 'selection',
  },
  radio: {
    label: 'Radio',
    icon: '⭕',
    category: 'selection',
  },
  dropdown: {
    label: 'Dropdown',
    icon: '▼',
    category: 'selection',
  },
  multiselect: {
    label: 'Multi-Select',
    icon: '✓',
    category: 'selection',
  },
  toggle: {
    label: 'Toggle',
    icon: '🔘',
    category: 'selection',
  },
  date: {
    label: 'Date',
    icon: '📅',
    category: 'advanced',
  },
  time: {
    label: 'Time',
    icon: '🕐',
    category: 'advanced',
  },
  file: {
    label: 'File Upload',
    icon: '📎',
    category: 'advanced',
  },
  rating: {
    label: 'Rating',
    icon: '⭐',
    category: 'advanced',
  },
  signature: {
    label: 'Signature',
    icon: '✍️',
    category: 'advanced',
  },
  section: {
    label: 'Section',
    icon: '📑',
    category: 'layout',
  },
  image: {
    label: 'Image',
    icon: '🖼️',
    category: 'layout',
  },
  textblock: {
    label: 'Text Block',
    icon: '📌',
    category: 'layout',
  },
};