import { Form, FormResponse } from '@/types';

export const exportService = {
  // Export form as JSON
  exportFormAsJSON: (form: Form) => {
    const dataStr = JSON.stringify(form, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.title || 'form'}.json`;
    link.click();
  },

  // Export responses as CSV
  exportResponsesAsCSV: (
    form: Form,
    responses: FormResponse[]
  ) => {
    const headers = form.fields.map((f) => `"${f.label}"`).join(',');
    const rows = responses.map((r) =>
      form.fields
        .map((f) => {
          const value = r.data[f.id] || '';
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.title || 'responses'}.csv`;
    link.click();
  },

  // Export responses as JSON
  exportResponsesAsJSON: (
    form: Form,
    responses: FormResponse[]
  ) => {
    const data = {
      form: {
        id: form.id,
        title: form.title,
        description: form.description,
        fields: form.fields.map((f) => ({
          id: f.id,
          label: f.label,
          type: f.type,
        })),
      },
      responses,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.title || 'responses'}.json`;
    link.click();
  },
};