import { FormResponse } from '@/types';

export const responseService = {
  // Save responses to localStorage
  saveResponses: (responses: FormResponse[]) => {
    try {
      localStorage.setItem('responses', JSON.stringify(responses));
      return true;
    } catch (error) {
      console.error('Error saving responses:', error);
      return false;
    }
  },

  // Load responses from localStorage
  loadResponses: (): FormResponse[] => {
    try {
      const responses = localStorage.getItem('responses');
      return responses ? JSON.parse(responses) : [];
    } catch (error) {
      console.error('Error loading responses:', error);
      return [];
    }
  },

  // Get responses for a form
  getFormResponses: (responses: FormResponse[], formId: string): FormResponse[] => {
    return responses.filter((r) => r.formId === formId);
  },

  // Export responses as CSV
  exportAsCSV: (responses: FormResponse[], filename: string) => {
    const csv = responses
      .map((r) => JSON.stringify(r.data))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  },

  // Get response statistics
  getStats: (responses: FormResponse[]) => {
    return {
      total: responses.length,
      today: responses.filter((r) => {
        const today = new Date();
        const responseDate = new Date(r.submittedAt);
        return responseDate.toDateString() === today.toDateString();
      }).length,
    };
  },
};