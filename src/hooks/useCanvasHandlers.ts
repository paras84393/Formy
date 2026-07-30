// src/components/canvas/hooks/useCanvasHandlers.ts

import { useCallback } from 'react';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { DragEndEvent } from '@dnd-kit/core';
import { Field } from '@/types';
import { createField } from '@/utils/fieldFactory';

export const useCanvasHandlers = () => {
  const {
    getCurrentForm,
    currentFormId,
    addField,
    insertField,
    reorderFields,
  } = useFormStore();
  const { setSelectedFieldId } = useUIStore();

  const handleDragStart = useCallback((event: any) => {
    const id = event.active.id.toString();
    if (id.startsWith('palette-')) {
      const type = id.replace('palette-', '');
      return createField(type as any);
    }
    return null;
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent, setDraggedField: (field: Field | null) => void) => {
      const { active, over } = event;
      setDraggedField(null);

      if (!over || !currentFormId) return;

      const form = getCurrentForm();

      // New field from palette
      if (active.id.toString().startsWith('palette-')) {
        if (over.id !== 'canvas-drop-zone') return;

        const fieldType = active.id.toString().replace('palette-', '');
        const newField = createField(fieldType as any);

        addField(currentFormId, newField);
        setSelectedFieldId(newField.id);
        return;
      }

      // Reorder existing fields
      if (active.id !== over.id && form) {
        const activeIndex = form.fields.findIndex((f) => f.id === active.id);
        const overIndex = form.fields.findIndex((f) => f.id === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          const newOrder = [...form.fields];
          [newOrder[activeIndex], newOrder[overIndex]] = [
            newOrder[overIndex],
            newOrder[activeIndex],
          ];

          reorderFields(
            currentFormId,
            newOrder.map((f) => f.id)
          );
        }
      }
    },
    [currentFormId, addField, reorderFields, setSelectedFieldId, getCurrentForm]
  );

  const handleQuickAdd = useCallback(
    (fieldType: string, insertAfter: number) => {
      if (!currentFormId) return;

      const field = createField(fieldType as any);
      insertField(currentFormId, insertAfter + 1, field);
      setSelectedFieldId(field.id);
    },
    [currentFormId, insertField, setSelectedFieldId]
  );

  return { handleDragStart, handleDragEnd, handleQuickAdd };
};