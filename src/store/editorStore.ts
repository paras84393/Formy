import { create } from 'zustand';

interface EditorStore {
  isPreviewMode: boolean;
  formValues: Record<string, any>;
  validationErrors: Record<string, string>;

  setPreviewMode: (mode: boolean) => void;
  setFormValues: (values: Record<string, any>) => void;
  setFieldValue: (fieldId: string, value: any) => void;
  setValidationErrors: (errors: Record<string, string>) => void;
  clearValidationErrors: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  isPreviewMode: false,
  formValues: {},
  validationErrors: {},

  setPreviewMode: (mode) => set({ isPreviewMode: mode }),
  setFormValues: (values) => set({ formValues: values }),
  setFieldValue: (fieldId, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [fieldId]: value },
    })),
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  clearValidationErrors: () => set({ validationErrors: {} }),
}));