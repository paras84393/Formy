import { useCallback } from 'react';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { Field } from '@/types';

export const useFormBuilder = () => {
  const formStore = useFormStore();
  const uiStore = useUIStore();

  const addFieldToForm = useCallback(
    (field: Field) => {
      if (!formStore.currentFormId) return;
      formStore.addField(formStore.currentFormId, field);
      uiStore.setSelectedFieldId(field.id);
    },
    [formStore, uiStore]
  );

  const updateSelectedField = useCallback(
    (updates: Partial<Field>) => {
      if (!formStore.currentFormId || !uiStore.selectedFieldId) return;
      formStore.updateField(
        formStore.currentFormId,
        uiStore.selectedFieldId,
        updates
      );
    },
    [formStore, uiStore]
  );

  const deleteSelectedField = useCallback(() => {
    if (!formStore.currentFormId || !uiStore.selectedFieldId) return;
    formStore.removeField(formStore.currentFormId, uiStore.selectedFieldId);
    uiStore.setSelectedFieldId(null);
  }, [formStore, uiStore]);

  return {
    addFieldToForm,
    updateSelectedField,
    deleteSelectedField,
    currentForm: formStore.getCurrentForm(),
    selectedField: formStore
      .getCurrentForm()
      ?.fields.find((f) => f.id === uiStore.selectedFieldId),
  };
};