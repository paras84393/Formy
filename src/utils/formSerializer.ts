import { Form } from '@/types';

export const formSerializer = {
  toJSON: (form: Form): string => {
    return JSON.stringify(form, null, 2);
  },

  fromJSON: (json: string): Form => {
    try {
      return JSON.parse(json);
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  },

  toCSV: (form: Form, responses: any[]): string => {
    const headers = form.fields.map((f) => `"${f.label}"`).join(',');
    const rows = responses.map((r) =>
      form.fields
        .map((f) => `"${r.data[f.id] || ''}"`)
        .join(',')
    );
    return [headers, ...rows].join('\n');
  },

  export: (form: Form) => {
    const dataStr = formSerializer.toJSON(form);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.title || 'form'}.json`;
    link.click();
  },
};