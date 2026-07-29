import { Form, FormResponse } from '@/types';

export const formService = {
  // Save form to localStorage
  saveForms: (forms: Form[]) => {
    try {
      localStorage.setItem('forms', JSON.stringify(forms));
      return true;
    } catch (error) {
      console.error('Error saving forms:', error);
      return false;
    }
  },

  // Load forms from localStorage
  loadForms: (): Form[] => {
    try {
      const forms = localStorage.getItem('forms');
      return forms ? JSON.parse(forms) : [];
    } catch (error) {
      console.error('Error loading forms:', error);
      return [];
    }
  },

  // Get form by ID
  getFormById: (forms: Form[], formId: string): Form | null => {
    return forms.find((f) => f.id === formId) || null;
  },

  // Search forms
  searchForms: (forms: Form[], query: string): Form[] => {
    const lowerQuery = query.toLowerCase();
    return forms.filter(
      (f) =>
        f.title.toLowerCase().includes(lowerQuery) ||
        f.description?.toLowerCase().includes(lowerQuery)
    );
  },

  // Get form stats
  getFormStats: (form: Form, responses: FormResponse[]) => {
    const formResponses = responses.filter((r) => r.formId === form.id);
    return {
      totalResponses: formResponses.length,
      fields: form.fields.length,
      createdAt: new Date(form.createdAt).toLocaleDateString(),
      updatedAt: new Date(form.updatedAt).toLocaleDateString(),
    };
  },
};