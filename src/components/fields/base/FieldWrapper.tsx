import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Field } from '@/types';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';

interface FieldWrapperProps {
  field: Field;
  isSelected?: boolean;
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  field,
  isSelected = false,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: field.id });

  const { removeField, duplicateField, currentFormId } = useFormStore();
  const { setSelectedFieldId } = useUIStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentFormId && window.confirm('Delete this field?')) {
      removeField(currentFormId, field.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentFormId) {
      duplicateField(currentFormId, field.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setSelectedFieldId(field.id)}
      className={`
        relative p-4 rounded-lg border-2 transition-all group
        ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white'}
        ${isDragging ? 'shadow-xl ring-2 ring-blue-400' : 'shadow-sm hover:shadow-md'}
      `}
    >
      {/* Drag Handle & Actions */}
      <div className="absolute -top-2 -left-2 -right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-t-lg px-2 py-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleDuplicate}
            className="p-1 hover:bg-blue-100 rounded text-gray-600 hover:text-blue-600 transition-colors"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-red-100 rounded text-gray-600 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Field Content */}
      <div className="mt-2">{children}</div>
    </div>
  );
};