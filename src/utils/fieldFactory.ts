import { Field, FieldType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const createField = (type: FieldType, label?: string): Field => {
  return {
    id: uuidv4(),
    type,
    label: label || `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    required: false,
    disabled: false,
    validations: [],
    conditionals: [],
    columnSpan: 12,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};