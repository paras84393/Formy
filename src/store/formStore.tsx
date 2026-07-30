import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Form, Field, FormResponse } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface FormStore {
  forms: Form[];
  currentFormId: string | null;
  responses: FormResponse[];
  history: Form[][];
  historyIndex: number;

  // Form actions
  createForm: (title: string, description?: string) => Form;
  deleteForm: (formId: string) => void;
  updateForm: (formId: string, form: Partial<Form>) => void;
  getCurrentForm: () => Form | null;
  setCurrentForm: (formId: string) => void;
  getAllForms: () => Form[];

  // Field actions
  addField: (formId: string, field: Field) => void;
  removeField: (formId: string, fieldId: string) => void;
  updateField: (formId: string, fieldId: string, updates: Partial<Field>) => void;
  reorderFields: (formId: string, fieldIds: string[]) => void;
  duplicateField: (formId: string, fieldId: string) => void;
  
  insertField: (formId: string, index: number, field: Field) => void;

  // Response actions
  addResponse: (response: FormResponse) => void;
  getResponses: (formId: string) => FormResponse[];
  deleteResponse: (responseId: string) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}

export const useFormStore = create<FormStore>()(
  devtools(
    persist(
      (set, get) => ({
        forms: [],
        currentFormId: null,
        responses: [],
        history: [],
        historyIndex: -1,

        createForm: (title, description) => {
          const newForm: Form = {
            id: uuidv4(),
            title,
            description,
            logo:"",
            coverImage:"",
            fields: [],
            theme: 'light',
            showProgressBar: false,
            allowMultipleSubmissions: true,
            successMessage: 'Thank you for your submission!',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            published: false,
          };

          set((state) => {
            const newForms = [...state.forms, newForm];
            return {
              forms: newForms,
              currentFormId: newForm.id,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });

          return newForm;
        },

        deleteForm: (formId) => {
          set((state) => {
            const newForms = state.forms.filter((f) => f.id !== formId);
            return {
              forms: newForms,
              currentFormId: state.currentFormId === formId ? null : state.currentFormId,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        updateForm: (formId, updates) => {
          set((state) => {
            const newForms = state.forms.map((f) =>
              f.id === formId
                ? { ...f, ...updates, updatedAt: Date.now() }
                : f
            );
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        getCurrentForm: () => {
          const { forms, currentFormId } = get();
          return forms.find((f) => f.id === currentFormId) || null;
        },

        setCurrentForm: (formId) => {
          set({ currentFormId: formId });
        },

        getAllForms: () => {
          return get().forms;
        },

        addField: (formId, field) => {
          set((state) => {
            const newForms = state.forms.map((f) =>
              f.id === formId
                ? {
                    ...f,
                    fields: [...f.fields, field],
                    updatedAt: Date.now(),
                  }
                : f
            );
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },
        
 insertField: (formId, index, field) => {
  set((state) => {
    const newForms = state.forms.map((f) => {
      if (f.id !== formId) return f;

      const fields = [...f.fields];
      fields.splice(index, 0, field);

      return {
        ...f,
        fields,
        updatedAt: Date.now(),
      };
    });

    return {
      forms: newForms,
      history: [...state.history.slice(0, state.historyIndex + 1), newForms],
      historyIndex: state.historyIndex + 1,
    };
  });
},

        removeField: (formId, fieldId) => {
          set((state) => {
            const newForms = state.forms.map((f) =>
              f.id === formId
                ? {
                    ...f,
                    fields: f.fields.filter((field) => field.id !== fieldId),
                    updatedAt: Date.now(),
                  }
                : f
            );
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        updateField: (formId, fieldId, updates) => {
          set((state) => {
            const newForms = state.forms.map((f) =>
              f.id === formId
                ? {
                    ...f,
                    fields: f.fields.map((field) =>
                      field.id === fieldId
                        ? { ...field, ...updates, updatedAt: Date.now() }
                        : field
                    ),
                    updatedAt: Date.now(),
                  }
                : f
            );
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        reorderFields: (formId, fieldIds) => {
          set((state) => {
            const newForms = state.forms.map((f) => {
              if (f.id === formId) {
                const fieldMap = new Map(f.fields.map((field) => [field.id, field]));
                return {
                  ...f,
                  fields: fieldIds
                    .map((id) => fieldMap.get(id))
                    .filter(Boolean) as Field[],
                  updatedAt: Date.now(),
                };
              }
              return f;
            });
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        duplicateField: (formId, fieldId) => {
          set((state) => {
            const newForms = state.forms.map((f) => {
              if (f.id === formId) {
                const fieldToDuplicate = f.fields.find((field) => field.id === fieldId);
                if (fieldToDuplicate) {
                  const duplicatedField: Field = {
                    ...fieldToDuplicate,
                    id: uuidv4(),
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                  };
                  return {
                    ...f,
                    fields: [...f.fields, duplicatedField],
                    updatedAt: Date.now(),
                  };
                }
              }
              return f;
            });
            return {
              forms: newForms,
              history: [...state.history.slice(0, state.historyIndex + 1), newForms],
              historyIndex: state.historyIndex + 1,
            };
          });
        },

        addResponse: (response) => {
          set((state) => ({
            responses: [...state.responses, response],
          }));
        },

        getResponses: (formId) => {
          return get().responses.filter((r) => r.formId === formId);
        },

        deleteResponse: (responseId) => {
          set((state) => ({
            responses: state.responses.filter((r) => r.id !== responseId),
          }));
        },

        undo: () => {
          set((state) => {
            if (state.historyIndex > 0) {
              return {
                forms: state.history[state.historyIndex - 1],
                historyIndex: state.historyIndex - 1,
              };
            }
            return state;
          });
        },

        redo: () => {
          set((state) => {
            if (state.historyIndex < state.history.length - 1) {
              return {
                forms: state.history[state.historyIndex + 1],
                historyIndex: state.historyIndex + 1,
              };
            }
            return state;
          });
        },

        clearHistory: () => {
          set({ history: [], historyIndex: -1 });
        },
      }),
      {
        name: 'form-store',
        partialize: (state) => ({
          forms: state.forms,
          responses: state.responses,
        }),
      }
    )
  )
);