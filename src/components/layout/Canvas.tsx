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
import { getFormSuggestion } from "@/utils/getFormSuggestion";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const ANIMATION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

const STAGGER = {
  container: {
    staggerChildren: 0.04,
    delayChildren: 0.1,
  },
  item: {
    duration: 0.3,
  },
};

const COVER_HEIGHT = 240;
const LOGO_SIZE = 96;
const LOGO_OVERLAP = 48;

// ============================================================================
// HOOKS - IMAGE UPLOAD LOGIC
// ============================================================================

interface UseImageUploadProps {
  maxSize: number;
  onSuccess: (imageUrl: string) => void;
  onError?: (message: string) => void;
}

const useImageUpload = ({ maxSize, onSuccess, onError }: UseImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        onError?.('Please select an image file');
        return;
      }

      if (file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
        onError?.(`Image must be less than ${sizeMB}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onSuccess(imageUrl);
      };
      reader.readAsDataURL(file);
    },
    [maxSize, onSuccess, onError]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return { fileInputRef, handleFileSelect, triggerFileInput };
};

// ============================================================================
// COMPONENTS - HOVER TOOLBAR
// ============================================================================

interface HoverToolbarProps {
  isVisible: boolean;
  onChangeClick: () => void;
  onRemoveClick: () => void;
}

const HoverToolbar: React.FC<HoverToolbarProps> = ({
  isVisible,
  onChangeClick,
  onRemoveClick,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onChangeClick}
            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            title="Change"
          >
            <Upload size={18} className="text-gray-900" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onRemoveClick}
            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            title="Remove"
          >
            <X size={18} className="text-gray-900" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// COMPONENTS - UPLOAD BUTTON (REUSABLE)
// ============================================================================

interface UploadButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'pill' | 'icon';
}

const UploadButton: React.FC<UploadButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'pill',
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        transition-colors duration-150
        ${
          variant === 'pill'
            ? 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700'
            : 'p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-900 shadow-sm'
        }
      `}
      title={label}
    >
      {icon}
      {variant === 'pill' && <span>{label}</span>}
    </motion.button>
  );
};

// ============================================================================
// COMPONENTS - COVER IMAGE SECTION
// ============================================================================

interface CoverImageSectionProps {
  coverImage?: string;
  onCoverChange: (imageUrl: string) => void;
  onCoverRemove: () => void;
  onCoverClick: () => void;
}

const CoverImageSection: React.FC<CoverImageSectionProps> = ({
  coverImage,
  onCoverChange,
  onCoverRemove,
  onCoverClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { fileInputRef, handleFileSelect, triggerFileInput } = useImageUpload({
    maxSize: 5 * 1024 * 1024,
    onSuccess: onCoverChange,
  });

  if (!coverImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="relative mb-8 overflow-hidden rounded-lg bg-gray-100"
      style={{ height: COVER_HEIGHT }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={coverImage}
        alt="Form cover"
        className="w-full h-full object-cover"
      />

      <HoverToolbar
        isVisible={isHovering}
        onChangeClick={triggerFileInput}
        onRemoveClick={onCoverRemove}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </motion.div>
  );
};

// ============================================================================
// COMPONENTS - LOGO SECTION
// ============================================================================

interface LogoSectionProps {
  logo?: string;
  onLogoChange: (imageUrl: string) => void;
  onLogoRemove: () => void;
}

const LogoSection: React.FC<LogoSectionProps> = ({
  logo,
  onLogoChange,
  onLogoRemove,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { fileInputRef, handleFileSelect, triggerFileInput } = useImageUpload({
    maxSize: 2 * 1024 * 1024,
    onSuccess: onLogoChange,
  });

  if (!logo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={logo}
        alt="Form logo"
        className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover bg-white"
      />

      <HoverToolbar
        isVisible={isHovering}
        onChangeClick={triggerFileInput}
        onRemoveClick={onLogoRemove}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </motion.div>
  );
};

// ============================================================================
// COMPONENTS - UPLOAD BUTTONS ROW
// ============================================================================

interface UploadButtonsRowProps {
  coverImage?: string;
  logo?: string;
  onCoverClick: () => void;
  onLogoClick: () => void;
  isVisible: boolean;
}

const UploadButtonsRow: React.FC<UploadButtonsRowProps> = ({
  coverImage,
  logo,
  onCoverClick,
  onLogoClick,
  isVisible,
}) => {
  const { t } = useTranslation();

  if (coverImage && logo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="mb-6 flex items-center gap-3"
    >
      {!coverImage && (
        <UploadButton
          icon={<ImageIcon size={18} />}
          label={t("addCover") || "Add Cover"}
          onClick={onCoverClick}
          variant="pill"
        />
      )}

      {!logo && (
        <UploadButton
          icon={<Upload size={18} />}
          label={t("addLogo") || "Add Logo"}
          onClick={onLogoClick}
          variant="pill"
        />
      )}
    </motion.div>
  );
};

// ============================================================================
// COMPONENTS - MEDIA SECTION (COMBINED)
// ============================================================================

interface HeaderMediaSectionProps {
  coverImage?: string;
  logo?: string;
  onCoverChange: (imageUrl: string) => void;
  onCoverRemove: () => void;
  onLogoChange: (imageUrl: string) => void;
  onLogoRemove: () => void;
}

const HeaderMediaSection: React.FC<HeaderMediaSectionProps> = ({
  coverImage,
  logo,
  onCoverChange,
  onCoverRemove,
  onLogoChange,
  onLogoRemove,
}) => {
  const { fileInputRef: coverFileRef, triggerFileInput: triggerCoverInput } = useImageUpload({
    maxSize: 5 * 1024 * 1024,
    onSuccess: onCoverChange,
  });

  const { fileInputRef: logoFileRef, triggerFileInput: triggerLogoInput } = useImageUpload({
    maxSize: 2 * 1024 * 1024,
    onSuccess: onLogoChange,
  });

  return (
    <>
      <UploadButtonsRow
        coverImage={coverImage}
        logo={logo}
        onCoverClick={triggerCoverInput}
        onLogoClick={triggerLogoInput}
        isVisible={true}
      />

      <CoverImageSection
        coverImage={coverImage}
        onCoverChange={onCoverChange}
        onCoverRemove={onCoverRemove}
        onCoverClick={triggerCoverInput}
      />

      {coverImage && (
        <div className="relative -mt-10 ml-10 z-10 mb-8">
          <LogoSection
            logo={logo}
            onLogoChange={onLogoChange}
            onLogoRemove={onLogoRemove}
          />
        </div>
      )}

      {!coverImage && logo && (
        <div className="mb-8">
          <LogoSection
            logo={logo}
            onLogoChange={onLogoChange}
            onLogoRemove={onLogoRemove}
          />
        </div>
      )}

      <input
        ref={coverFileRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              onCoverChange(event.target?.result as string);
            };
            reader.readAsDataURL(file);
          }
          e.target.value = '';
        }}
        className="hidden"
      />

      <input
        ref={logoFileRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              onLogoChange(event.target?.result as string);
            };
            reader.readAsDataURL(file);
          }
          e.target.value = '';
        }}
        className="hidden"
      />
    </>
  );
};

// ============================================================================
// COMPONENTS - TITLE SECTION
// ============================================================================

interface TitleSectionProps {
  title: string;
  description?: string;
  fieldCount: number;
  onTitleChange: (title: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  description,
  fieldCount,
  onTitleChange,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
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
          className="w-full bg-transparent outline-none text-5xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2"
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="group cursor-text">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-semibold text-gray-900">
              {title || t("untitledForm") || "Untitled Form"}
            </h1>
            <Edit2
              size={20}
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            />
          </div>
        </div>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="mt-3 text-lg text-gray-600"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.12 }}
        className="mt-3 text-sm font-medium text-gray-500"
      >
        {fieldCount} {fieldCount === 1 ? t("question") || "question" : t("questions") || "questions"}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// CANVAS HEADER
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
  return (
    <div className="mb-10">
      <HeaderMediaSection
        coverImage={coverImage}
        logo={logo}
        onCoverChange={onCoverChange}
        onCoverRemove={onCoverRemove}
        onLogoChange={onLogoChange}
        onLogoRemove={onLogoRemove}
      />

      <TitleSection
        title={title}
        description={description}
        fieldCount={fieldCount}
        onTitleChange={onTitleChange}
      />
    </div>
  );
};

// ============================================================================
// QUICK INSERT MENU
// ============================================================================

const QuickInsertMenu: React.FC<{
  isOpen: boolean;
  onSelect: (type: string) => void;
  onClose: () => void;
}> = ({ isOpen, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();

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
      initial={{ opacity: 0, scale: 0.94, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -6 }}
      transition={{ duration: 0.12 }}
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-96 max-h-96 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-3 border-b border-gray-100 sticky top-0 bg-white rounded-t-lg">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder={t("searchFields") || "Search fields"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

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
// CANVAS FIELD
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <motion.div
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
                : 'hover:bg-gray-50'
            }
          `}
        >
          <FieldWrapper field={field} isSelected={isSelected}>
            <FieldRenderer field={field} isEditing={true} />
          </FieldWrapper>
        </div>

        <div className="absolute -left-8 top-4 text-xs font-medium text-gray-400">
          {index + 1}
        </div>
      </motion.div>

      <div className="flex justify-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
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

      <div className="relative">
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
    </motion.div>
  );
};

// ============================================================================
// EMPTY STATE
// ============================================================================

const CanvasEmptyState: React.FC<{
  onAddFirst: () => void;
  showQuickAdd: boolean;
  onQuickAdd: (type: string) => void;
  onCloseQuickAdd: () => void;
}> = ({ onAddFirst, showQuickAdd, onQuickAdd, onCloseQuickAdd }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-32"
    >
      <div className="max-w-lg text-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100"
        >
          <span className="text-3xl font-semibold text-gray-700">/</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="text-3xl font-semibold tracking-tight text-gray-900"
        >
          {t("startBuilding") || "Start Building"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="mt-4 text-lg leading-7 text-gray-500"
        >
          {t("emptyDescription") || "Add your first question to get started"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="relative mt-6 flex justify-center"
        >
          <QuickInsertMenu
            isOpen={showQuickAdd}
            onSelect={onQuickAdd}
            onClose={onCloseQuickAdd}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// SUBMIT PREVIEW
// ============================================================================

const SubmitPreview: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-10 pt-8 border-t border-gray-200"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        {t("submit") || "Submit"}
      </motion.button>
    </motion.div>
  );
};

// ============================================================================
// DRAG OVERLAY
// ============================================================================

const DragOverlayContent: React.FC<{
  field: Field | null;
}> = ({ field }) => {
  if (!field) return null;

  return (
    <motion.div
      initial={{ scale: 0.93, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
    >
      <p className="text-sm font-medium text-gray-900">{field.label}</p>
      <p className="text-xs text-gray-500 mt-1">Release to add</p>
    </motion.div>
  );
};

// ============================================================================
// MAIN CANVAS COMPONENT
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
  const suggestion = form ? getFormSuggestion(form.title) : null;
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [draggedField, setDraggedField] = useState<Field | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState<number | null>(null);

  useEffect(() => {
    setShowSuggestion(true);
  }, [form?.title]);

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

      if (active.id.toString().startsWith('palette-')) {
        if (over.id !== 'canvas-drop-zone') return;

        const fieldType = active.id.toString().replace('palette-', '');
        const newField = createField(fieldType as any);

        addField(currentFormId, newField);
        setSelectedFieldId(newField.id);
        return;
      }

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
            {t("createOrSelect") || "Create or select a form"}
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
          ${isOver ? 'bg-blue-50' : 'bg-white'}
        `}
      >
        <div className="min-h-full p-12 bg-white flex items-start justify-center">
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

            {/* Suggested Fields */}
            {showSuggestion && suggestion && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Smart Suggestions
                    </p>
                    <p className="text-xs text-gray-500">
                      Based on your form title
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!currentFormId) return;

                      suggestion.fields.forEach((field) => {
                        const newField = createField(field.type as any);
                        newField.label = field.label;
                        addField(currentFormId, newField);
                      });

                      setShowSuggestion(false);
                    }}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    Generate Form
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggestion.fields.map((field) => (
                    <motion.button
                      key={field.label}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!currentFormId) return;

                        const newField = createField(field.type as any);
                        newField.label = field.label;
                        addField(currentFormId, newField);
                      }}
                      className="rounded-full border border-gray-200 bg-white text-black px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors"
                    >
                      + {field.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Keyboard Shortcut Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6 text-xs font-medium text-gray-500 text-center"
            >
              Press <kbd className="px-2 py-1 rounded bg-gray-100 border border-gray-300">/</kbd> to add a field
            </motion.div>

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
                  <motion.div
                    layout
                    className="space-y-0"
                    variants={STAGGER.container}
                    initial="initial"
                    animate="animate"
                  >
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