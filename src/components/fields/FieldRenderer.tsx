import React from 'react';
import { Field } from '@/types';
import { TextField } from './input/TextField';
import { TextAreaField } from './input/TextAreaField';
import { EmailField } from './input/EmailField';
import { NumberField } from './input/NumberField';
import { PhoneField } from './input/PhoneField';
import { URLField } from './input/URLField';
import { CheckboxField } from './selection/ChechkboxField';
import { RadioField } from './selection/RadioField';
import { DropdownField } from './selection/DropdownField';
import { MultiSelectField } from './selection/MultiSelectField';
import { ToggleField } from './selection/ToggleField';
import { DateField } from './advanced/DataField';
import { TimeField } from './advanced/TimeField';
import { FileUploadField } from './advanced/FileUploadField';
import { RatingField } from './advanced/RatingField';
import { SignatureField } from './advanced/SignatureField';
import { SectionField } from './layout/SectionField';
import { ImageField } from './layout/ImageField';
import { TextBlockField } from './layout/TextBlockField';

interface FieldRendererProps {
  field: Field;
  value?: any;
  onChange?: (value: any) => void;
  isEditing?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  isEditing = false,
}) => {
  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value} onChange={onChange} isEditing={isEditing} />;
    case 'textarea':
      return <TextAreaField field={field} value={value} onChange={onChange} />;
    case 'email':
      return <EmailField field={field} value={value} onChange={onChange} />;
    case 'number':
      return <NumberField field={field} value={value} onChange={onChange} />;
    case 'phone':
      return <PhoneField field={field} value={value} onChange={onChange} />;
    case 'url':
      return <URLField field={field} value={value} onChange={onChange} />;
    case 'checkbox':
      return <CheckboxField field={field} value={value} onChange={onChange} />;
    case 'radio':
      return <RadioField field={field} value={value} onChange={onChange} />;
    case 'dropdown':
      return <DropdownField field={field} value={value} onChange={onChange} />;
    case 'multiselect':
      return <MultiSelectField field={field} value={value} onChange={onChange} />;
    case 'toggle':
      return <ToggleField field={field} value={value} onChange={onChange} />;
    case 'date':
      return <DateField field={field} value={value} onChange={onChange} />;
    case 'time':
      return <TimeField field={field} value={value} onChange={onChange} />;
    case 'file':
      return <FileUploadField field={field} value={value} onChange={onChange} />;
    case 'rating':
      return <RatingField field={field} value={value} onChange={onChange} />;
    case 'signature':
      return <SignatureField field={field} value={value} onChange={onChange} />;
    case 'section':
      return <SectionField field={field} />;
    case 'image':
      return <ImageField field={field} value={value} onChange={onChange} />;
    case 'textblock':
      return <TextBlockField field={field} />;
    default:
      return <div>Unknown field type: {field.type}</div>;
  }
};