import { DragEndEvent } from '@dnd-kit/core';
import { useFormStore } from '@/store/formStore';
import { Field } from '@/types';
import { createField } from '@/utils/fieldFactory';

export const useDragDrop = (formId: string) => {
  const { getCurrentForm, addField, reorderFields } = useFormStore();
  const form = getCurrentForm();
  const fields = form?.fields || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !formId) return;

    // If dragging from palette (new field)
    if (active.id.toString().startsWith('palette-')) {
      const fieldType = active.id.toString().replace('palette-', '');
      const newField = createField(fieldType as any);
      addField(formId, newField);
      return;
    }

    // If reordering existing fields
    if (active.id !== over.id && form) {
      const activeIndex = fields.findIndex((f) => f.id === active.id);
      const overIndex = fields.findIndex((f) => f.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newOrder = [...fields];
        [newOrder[activeIndex], newOrder[overIndex]] = [
          newOrder[overIndex],
          newOrder[activeIndex],
        ];

        reorderFields(
          formId,
          newOrder.map((f) => f.id)
        );
      }
    }
  };

  return { handleDragEnd, fields };
};