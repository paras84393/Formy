import { Field } from '@/types';

export const dragDropHelpers = {
  canDrop: (draggedId: string, targetId: string): boolean => {
    return draggedId !== targetId;
  },

  getDropPosition: (
    fields: Field[],
    draggedId: string,
    targetId: string
  ): 'before' | 'after' => {
    const draggedIndex = fields.findIndex((f) => f.id === draggedId);
    const targetIndex = fields.findIndex((f) => f.id === targetId);

    return draggedIndex < targetIndex ? 'after' : 'before';
  },

  reorderFields: (
    fields: Field[],
    draggedId: string,
    targetId: string
  ): Field[] => {
    const draggedIndex = fields.findIndex((f) => f.id === draggedId);
    const targetIndex = fields.findIndex((f) => f.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return fields;

    const newFields = [...fields];
    [newFields[draggedIndex], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[draggedIndex],
    ];

    return newFields;
  },
};