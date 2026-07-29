import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FIELD_TYPES, FIELD_CATEGORIES } from '@/utils/constants';
import { FieldType } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { createField } from '@/utils/fieldFactory';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';

// ============================================================================
// QUICK INSERT MENU COMPONENT
// ============================================================================

interface QuickInsertMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position?: { top: number; left: number };
  insertAfterIndex?: number;
}

export const QuickInsertMenu: React.FC<QuickInsertMenuProps> = ({
  isOpen,
  onClose,
  position,
  insertAfterIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { currentFormId, insertField } = useFormStore();
  const { selectedFieldId, setSelectedFieldId } = useUIStore();

  // Group fields by category
  const categories = useMemo(() => {
    const grouped: Record<string, FieldType[]> = {};

    Object.entries(FIELD_CATEGORIES).forEach(([key]) => {
      grouped[key] = Object.entries(FIELD_TYPES)
        .filter(([, config]) => config.category === key)
        .map(([type]) => type as FieldType);
    });

    return grouped;
  }, []);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    const allItems: Array<{ type: FieldType; config: any }> = [];

    Object.entries(categories).forEach(([, types]) => {
      types.forEach((type) => {
        const config = FIELD_TYPES[type];
        if (
          config.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          config.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          allItems.push({ type, config });
        }
      });
    });

    return allItems;
  }, [categories, searchTerm]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  // Focus search input when menu opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
            handleSelectField(filteredItems[selectedIndex].type);
          }
          break;

        case 'Escape':
          e.preventDefault();
          onClose();
          break;

        default:
          break;
      }
    },
    [filteredItems, selectedIndex, onClose]
  );

  const handleSelectField = (fieldType: FieldType) => {
    if (!currentFormId) return;

    const field = createField(fieldType);
    const insertIndex = insertAfterIndex !== undefined ? insertAfterIndex + 1 : undefined;

    insertField(currentFormId, insertIndex, field);
    setSelectedFieldId(field.id);
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  const menuPosition = position || { top: '50%', left: '50%' };

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: menuPosition.top,
        left: menuPosition.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 w-96 max-h-96 flex flex-col overflow-hidden"
    >
      {/* Search Input */}
      <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Fields List */}
      <div className="overflow-y-auto flex-1">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 text-center"
          >
            <p className="text-sm text-gray-500">No fields found</p>
          </motion.div>
        ) : (
          <div className="py-1">
            {filteredItems.map(({ type, config }, index) => (
              <motion.button
                key={type}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => handleSelectField(type)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  w-full px-3 py-2.5 text-left text-sm
                  flex items-center gap-3 transition-colors
                  ${
                    selectedIndex === index
                      ? 'bg-blue-50 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg flex-shrink-0">{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{config.label}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {config.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
        ↑↓ Navigate • ↵ Select • Esc Close
      </div>
    </motion.div>
  );
};

// ============================================================================
// ADD FIELD MENU COMPONENT (Main Hook for "/" trigger)
// ============================================================================

export const AddFieldMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | undefined>();
  const [insertAfterIndex, setInsertAfterIndex] = useState<number | undefined>();

  // Handle "/" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger "/" if not typing in an input/textarea
      const target = e.target as HTMLElement;
      const isTypingInInput =
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true';

      if (e.key === '/' && !isTypingInInput && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
        setPosition(undefined);
        setInsertAfterIndex(undefined);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setPosition(undefined);
    setInsertAfterIndex(undefined);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40"
          />

          {/* Menu */}
          <QuickInsertMenu
            isOpen={isOpen}
            onClose={handleClose}
            position={position}
            insertAfterIndex={insertAfterIndex}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default AddFieldMenu;