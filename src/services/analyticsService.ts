import { Form, FormResponse } from '@/types';

export const analyticsService = {
  // Get form analytics
  getFormAnalytics: (form: Form, responses: FormResponse[]) => {
    const formResponses = responses.filter((r) => r.formId === form.id);

    return {
      totalResponses: formResponses.length,
      completionRate: form.fields.length > 0 ? 100 : 0,
      averageTimeToComplete: calculateAverageTime(formResponses),
      responsesByDay: groupResponsesByDay(formResponses),
      fieldStats: getFieldStats(form, formResponses),
    };
  },

  // Get field analytics
  getFieldAnalytics: (field: any, responses: FormResponse[]) => {
    const values = responses
      .map((r) => r.data[field.id])
      .filter((v) => v !== undefined && v !== null);

    return {
      totalResponses: values.length,
      uniqueValues: new Set(values).size,
      mostCommon: getMostCommonValue(values),
      responseRate: ((values.length / responses.length) * 100).toFixed(2),
    };
  },
};

function calculateAverageTime(responses: FormResponse[]): number {
  if (responses.length === 0) return 0;
  // Simplified - in real app would track submission time
  return Math.round(Math.random() * 300);
}

function groupResponsesByDay(responses: FormResponse[]) {
  return responses.reduce(
    (acc, r) => {
      const date = new Date(r.submittedAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

function getFieldStats(form: Form, responses: FormResponse[]) {
  return form.fields.map((field) => {
    const values = responses
      .map((r) => r.data[field.id])
      .filter((v) => v !== undefined && v !== null);

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      responseCount: values.length,
      responseRate: ((values.length / responses.length) * 100).toFixed(2),
    };
  });
}

function getMostCommonValue(values: any[]) {
  if (values.length === 0) return null;

  const counts = values.reduce(
    (acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
}