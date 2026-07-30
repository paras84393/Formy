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
   
      removeField(currentFormId, field.id);
    
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
    className="group relative"
  >
    {/* Hover Actions */}
    <div className="absolute left-0 top-5 -translate-x-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing rounded-md p-1.5 hover:bg-gray-100 transition"
      >
        <GripVertical
          size={16}
          className="text-gray-400 hover:text-gray-600"
        />
      </div>
    </div>

    {/* More Actions */}
    <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
      <button
        onClick={handleDuplicate}
        className="rounded-md p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
      >
        <Copy size={15} />
      </button>

      <button
        onClick={handleDelete}
        className="rounded-md p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
      >
        <Trash2 size={15} />
      </button>
    </div>

    {/* Left Accent */}
    <div
      className={`absolute left-0 top-4 bottom-4 w-1 rounded-full transition-all duration-200 ${
        isSelected
          ? "bg-blue-500 opacity-100"
          : "bg-transparent group-hover:bg-gray-300"
      }`}
    />

    {/* Content */}
    <div
      className={`
        rounded-xl px-6 py-5 transition-all duration-200
        ${
          isSelected
            ? "bg-blue-50/40 ring-1 ring-blue-200 shadow-sm"
            : "hover:bg-gray-50"
        }
        ${isDragging ? "shadow-xl scale-[1.01]" : ""}
      `}
    >
      {children}
    </div>
  </div>
)};