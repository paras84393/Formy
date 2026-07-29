import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useTranslation } from "react-i18next";
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { FieldWrapper } from '@/components/fields/base/FieldWrapper';
import { FieldRenderer } from '@/components/fields/FieldRenderer';
import { Field } from '@/types';
import { fieldTypeConfig } from '@/config/fieldTypes';
import { Plus, Edit2, ChevronDown, Search, Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createField } from '@/utils/fieldFactory';
import { useDroppable } from '@dnd-kit/core';


// ============================================================================
// COVER IMAGE UPLOAD
// ============================================================================

const CoverImageSection: React.FC<{
  coverImage?: string;
  onCoverChange: (imageUrl: string) => void;
  onCoverRemove: () => void;
}> = ({ coverImage, onCoverChange, onCoverRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Convert to base64 or upload URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      onCoverChange(imageUrl);
    };
    reader.readAsDataURL(file);
  };
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      {coverImage ? (
        /* Cover Image Display */
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-lg overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Image */}
          <img
            src={coverImage}
            alt="Form cover"
            className="  w-full h-48 object-cover"
          />

          {/* Overlay on Hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Change cover"
                >
                  <Upload size={20} className="text-gray-900" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCoverRemove}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Remove cover"
                >
                  <X size={20} className="text-gray-900" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Upload Area */
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => fileInputRef.current?.click()}
          className="
             inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              text-sm font-medium
              text-gray-700
              transition-all duration-200
          "
        >
          <ImageIcon size={32} className="text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">{t("addCover")}</p>
            <p className="text-xs text-gray-500 mt-1">
              {t("coverHint")}
            </p>
          </div>
        </motion.div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

// ============================================================================
// LOGO UPLOAD
// ============================================================================

const LogoSection: React.FC<{
  logo?: string;
  onLogoChange: (imageUrl: string) => void;
  onLogoRemove: () => void;
}> = ({ logo, onLogoChange, onLogoRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
const { t } = useTranslation();
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("addLogo");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      onLogoChange(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 flex items-center gap-4">
      {logo ? (
        /* Logo Display */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={logo}
            alt="Form logo"
            className="  h-20 w-20 object-cover rounded-full bg-gray-100 p-1"
          />

          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center gap-1"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                  title="Change logo"
                >
                  <Upload size={12} className="text-gray-900" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogoRemove}
                  className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                  title="Remove logo"
                >
                  <X size={12} className="text-gray-900" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Upload Button */
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="
           inline-flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-gray-100
        hover:bg-gray-200
        text-sm font-medium
        text-gray-700
        transition-all
          "
          title="Upload logo"
        >
          <Upload size={20} className="text-gray-400" />
        </motion.button>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

// ============================================================================
// CANVAS HEADER (UPDATED)
// ============================================================================

const CanvasHeader: React.FC<{
  title: string;
  description?: string;
  fieldCount: number;
  coverImage?: string;
  logo?: string;
  onTitleChange: (title: string) => void;
  onCoverChange: (imageUrl: string) => void;
  onCoverRemove: () => void;
  onLogoChange: (imageUrl: string) => void;
  onLogoRemove: () => void;
}> = ({
  title,
  description,
  fieldCount,
  coverImage,
  logo,
  onTitleChange,
  onCoverChange,
  onCoverRemove,
  onLogoChange,
  onLogoRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  const { t } = useTranslation();

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="mb-12">
      {/* Cover Image */}
      <CoverImageSection
        coverImage={coverImage}
        onCoverChange={onCoverChange}
        onCoverRemove={onCoverRemove}
      />

      {/* Logo and Title Section */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo */}
        <LogoSection
          logo={logo}
          onLogoChange={onLogoChange}
          onLogoRemove={onLogoRemove}
        />

        {/* Title Section */}
        <div className="flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              className="text-5xl font-semibold text-gray-900 w-full bg-transparent outline-none border-b-2 border-blue-500 pb-2"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="group cursor-text"
            >
              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-semibold text-gray-900">
                  {title || t('untitledForm')}
                </h1>
                <Edit2
                  size={20}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          )}

          {description && (
            <p className="text-lg text-gray-600 mt-4 mb-4">{description}</p>
          )}
          

          <div className="text-sm text-gray-500 font-medium">
            {fieldCount} {fieldCount === 1 ? t('question') : t('questions')}
          </div>
          
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// QUICK INSERT MENU (UNCHANGED)
// ============================================================================

const QuickInsertMenu: React.FC<{
  isOpen: boolean;
  onSelect: (type: string) => void;
  onClose: () => void;
}> = ({ isOpen, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
const {t} = useTranslation();
  const categories = useMemo(() => {
    const grouped: Record<string, Array<[string, any]>> = {};

    Object.entries(fieldTypeConfig).forEach(([type, config]) => {
      const category = config.category || 'Other';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push([type, config]);
    });

    return grouped;
  }, []);

  const filteredItems = useMemo(() => {
    const allItems = Object.entries(categories)
      .flatMap(([category, items]) =>
        items.filter(([_, config]) =>
          config.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    return allItems;
  }, [categories, searchTerm]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) =>
          i < filteredItems.length - 1 ? i + 1 : i
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          onSelect(filteredItems[selectedIndex][0]);
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };
  

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-96 max-h-96 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-3 border-b border-gray-100 sticky top-0 bg-white rounded-t-lg" >
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder={t("searchFields")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Items */}
      <div className="overflow-y-auto flex-1">
        {filteredItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">No fields found</p>
          </div>
        ) : (
          <div className="py-1">
            {filteredItems.map(([type, config], index) => (
              <motion.button
                key={type}
                onClick={() => {
                  onSelect(type);
                  onClose();
                }}
                className={`w-full px-3 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${
                  selectedIndex === index
                    ? 'bg-blue-50 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg flex-shrink-0">{config.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{config.label}</div>
                  <div className="text-xs text-gray-500">{config.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// CANVAS FIELD (UNCHANGED)
// ============================================================================

const CanvasField: React.FC<{
  field: Field;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onAddAfter: () => void;
  onQuickAdd: (type: string) => void;
  showQuickAdd: boolean;
}> = ({
  field,
  index,
  isSelected,
  onSelect,
  onAddAfter,
  onQuickAdd,
  showQuickAdd,
}) => {
  const [quickAddRef, setQuickAddRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="group" >
      {/* Field Card */}
      <motion.div
  layout
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.2 }}
  onClick={(e) => {
    e.stopPropagation();
    onSelect();
  }}
  className="cursor-pointer relative"
>
       
        
        
        <div
          className={`
            bg-white rounded-lg transition-all duration-150
            ${
              isSelected
                ? 'ring-1 ring-blue-500 shadow-sm'
                : 'hover:bg-gray-50 border border-transparent'
            }
          `}
        >
          <FieldWrapper field={field} isSelected={isSelected}>
            <FieldRenderer field={field} isEditing={true} />
          </FieldWrapper>
        </div>

        {/* Field Number Badge */}
        <div className="absolute -left-8 top-4 text-xs font-medium text-gray-400">
          {index + 1}
        </div>
      </motion.div>
      
     
      {/* Add Button Between Fields */}
      <div className="flex justify-center py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          //onClick={onAddAfter}
          onClick={(e) => {
  e.stopPropagation();
  onAddAfter();
}}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          title="Add question after this"
        >
          <Plus size={18} />
        </motion.button>
      </div>
      

   
      {/* Quick Insert Menu */}
      <div ref={setQuickAddRef} className="relative">
        
        <AnimatePresence>
          {showQuickAdd && (
            <QuickInsertMenu
              isOpen={true}
              onSelect={onQuickAdd}
              onClose={() => {}}
            />

          )}

        </AnimatePresence>
        
      </div>
    </div>
  );
};

// ============================================================================
// EMPTY STATE (UNCHANGED)
// ============================================================================

const CanvasEmptyState: React.FC<{
  onAddFirst: () => void;
  showQuickAdd: boolean;
  onQuickAdd: (type: string) => void;
  onCloseQuickAdd: () => void;

}> = ({ onAddFirst, showQuickAdd, onQuickAdd, onCloseQuickAdd }) => {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <span className="text-3xl font-semibold text-gray-700">/</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
          {t("startBuilding")}
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg leading-7 text-gray-500">
         
         
          {t("emptyDescription")}
          
        </p>

        {/* Shortcut Hint */}
        

        {/* Menu */}
        <div className="relative mt-6 flex justify-center">
          <QuickInsertMenu
            isOpen={showQuickAdd}
            onSelect={onQuickAdd}
            onClose={onCloseQuickAdd}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SUBMIT PREVIEW (UNCHANGED)
// ============================================================================

const SubmitPreview: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-12 pt-8 border-t border-gray-200"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
       {t("submit")}
      </motion.button>
    </motion.div>
  );
};

// ============================================================================
// DRAG OVERLAY (UNCHANGED)
// ============================================================================

const DragOverlayContent: React.FC<{
  field: Field | null;
}> = ({ field }) => {
  if (!field) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
    >
      <p className="text-sm font-medium text-gray-900">{field.label}</p>
      <p className="text-xs text-gray-500 mt-1">Release to add</p>
    </motion.div>
  );
};

// ============================================================================
// MAIN CANVAS COMPONENT (UPDATED)
// ============================================================================

export const Canvas: React.FC = () => {
  const {
    getCurrentForm,
    currentFormId,
    addField,
    insertField,
    reorderFields,
    updateForm,
  } = useFormStore();
const { t } = useTranslation();
  const { selectedFieldId, setSelectedFieldId } = useUIStore();
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });

  const form = getCurrentForm();
  const [draggedField, setDraggedField] = useState<Field | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { distance: 8 })
  );

  const handleDragStart = useCallback((event: any) => {
    const id = event.active.id.toString();
    if (id.startsWith('palette-')) {
      const type = id.replace('palette-', '');
      setDraggedField(createField(type as any));
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setDraggedField(null);

      if (!over || !currentFormId) return;

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
    [currentFormId, form, addField, reorderFields, setSelectedFieldId]
  );

  const handleQuickAdd = useCallback(
    (fieldType: string, insertAfter: number) => {
      if (!currentFormId) return;

      const field = createField(fieldType as any);
      insertField(currentFormId, insertAfter + 1, field);
      setSelectedFieldId(field.id);
      setShowQuickAdd(null);
    },
    [currentFormId, insertField, setSelectedFieldId]
  );

  if (!form) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center space-y-3">
          <p className="text-lg text-gray-600 font-medium">
           {t("createOrSelect")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={setNodeRef}
         onClick={() => {
    setSelectedFieldId(null);
    setShowQuickAdd(null);
  }}
        className={`
          flex-1 overflow-auto transition-colors duration-200
          ${isOver ? 'bg-blue-50' : 'bg-[#FAFAFA]'}
        `}
      >
        <div className="min-h-full p-12 flex items-start justify-center">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <CanvasHeader
              title={form.title}
              description={form.description}
              fieldCount={form.fields.length}
              coverImage={form.coverImage}
              logo={form.logo}
              onTitleChange={(title) => updateForm(form.id, { title })}
              onCoverChange={(coverImage) => updateForm(form.id, { coverImage })}
              onCoverRemove={() => updateForm(form.id, { coverImage: undefined })}
              onLogoChange={(logo) => updateForm(form.id, { logo })}
              onLogoRemove={() => updateForm(form.id, { logo: undefined })}
            />

            {/* Fields or Empty State */}
            {form.fields.length === 0 ? (
              <CanvasEmptyState
                onAddFirst={() => setShowQuickAdd(0)}
                showQuickAdd={showQuickAdd === 0}
                onQuickAdd={(type) => handleQuickAdd(type, -1)}
                onCloseQuickAdd={() => setShowQuickAdd(null)}
              />
            ) : (
              <>
                <SortableContext
                  items={form.fields.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <motion.div layout className="space-y-0">
                    <AnimatePresence mode="popLayout">
                      {form.fields.map((field, index) => (
                        <CanvasField
                          key={field.id}
                          field={field}
                          index={index}
                          isSelected={selectedFieldId === field.id}
                          onSelect={() => setSelectedFieldId(field.id)}
                          onAddAfter={() => setShowQuickAdd(index)}
                          onQuickAdd={(type) => handleQuickAdd(type, index)}
                          showQuickAdd={showQuickAdd === index}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </SortableContext>

                <SubmitPreview />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        <DragOverlayContent field={draggedField} />
      </DragOverlay>
    </DndContext>
  );
};