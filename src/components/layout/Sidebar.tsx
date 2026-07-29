import React, { useState, useMemo, useCallback } from "react";
import { FIELD_TYPES, FIELD_CATEGORIES } from "@/utils/constants";
import { FieldType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useFormStore } from "@/store/formStore";
import { createField } from "@/utils/fieldFactory";

// ============================================================================
// FIELD CARD
// ============================================================================

interface FieldCardProps {
  fieldType: FieldType;
}

const FieldCard: React.FC<FieldCardProps> = ({ fieldType }) => {
  const fieldConfig = FIELD_TYPES[fieldType];
  const { currentFormId, addField } = useFormStore();

  const handleClick = useCallback(() => {
    if (!currentFormId) return;
    const field = createField(fieldType);
    addField(currentFormId, field);
  }, [currentFormId, fieldType, addField]);

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={handleClick}
      className="
        group w-full rounded-lg bg-white p-3 text-left
        hover:bg-gray-50 border border-transparent hover:border-gray-200
        transition-all duration-150 cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 text-lg text-gray-600 group-hover:text-gray-900 transition-colors">
          {fieldConfig.icon}
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {fieldConfig.label}
          </p>
          {fieldConfig.description && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {fieldConfig.description}
            </p>
          )}
        </div>

        {/* Drag Indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
          <div className="flex flex-col gap-0.5">
            <div className="w-1 h-1 bg-current rounded-full" />
            <div className="w-1 h-1 bg-current rounded-full" />
            <div className="w-1 h-1 bg-current rounded-full" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

// ============================================================================
// CATEGORY SECTION
// ============================================================================

interface CategorySectionProps {
  category: string;
  label: string;
  fieldTypes: FieldType[];
  defaultOpen?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  label,
  fieldTypes,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-6"
    >
      {/* Category Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between mb-3 px-1
          text-left group transition-colors
        "
      >
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 group-hover:text-gray-600 transition-colors"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>

      {/* Category Items */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {fieldTypes.map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <FieldCard fieldType={type} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// SEARCH FIELD
// ============================================================================

const SearchFields: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  results: FieldType[];
}> = ({ searchTerm, onSearchChange, results }) => {
  return (
    <>
      {/* Search Input */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-9 pr-3 py-2 text-sm
              bg-gray-50 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
              transition-all placeholder-gray-400
            "
          />
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="p-4">
          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No fields found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((type) => (
                <FieldCard key={type} fieldType={type} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

export const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Organize field types by category
  const categories = useMemo(
    () =>
      Object.entries(FIELD_CATEGORIES).reduce(
        (acc, [key]) => {
          acc[key] = Object.entries(FIELD_TYPES)
            .filter(([, config]) => config.category === key)
            .map(([type]) => type as FieldType);
          return acc;
        },
        {} as Record<string, FieldType[]>
      ),
    []
  );

  // Search results
  const searchResults = useMemo(() => {
    if (!searchTerm) return [];

    const term = searchTerm.toLowerCase();
    return Object.values(FIELD_TYPES)
      .map((config, idx) => Object.keys(FIELD_TYPES)[idx] as FieldType)
      .filter((type) => {
        const config = FIELD_TYPES[type];
        return (
          config.label.toLowerCase().includes(term) ||
          config.description?.toLowerCase().includes(term)
        );
      });
  }, [searchTerm]);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-4"
      >
        <h2 className="text-sm font-semibold text-gray-900 mb-1">
          Add Questions
        </h2>
        <p className="text-xs text-gray-500">
          Drag or click to add fields to your form
        </p>
      </motion.div>

      {/* Search */}
      {!searchTerm && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-9 pr-3 py-2 text-sm
                bg-gray-50 border border-gray-200 rounded-lg
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                transition-all placeholder-gray-400
              "
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {searchTerm ? (
          /* Search Results */
          <div className="p-4">
            {searchResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-sm text-gray-500">No fields found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try a different search term
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">
                  Results ({searchResults.length})
                </p>
                {searchResults.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <FieldCard fieldType={type} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Categories */
          <div className="p-4 space-y-2">
            {Object.entries(categories).map(([key, types]) => (
              <CategorySection
                key={key}
                category={key}
                label={
                  FIELD_CATEGORIES[
                    key as keyof typeof FIELD_CATEGORIES
                  ]
                }
                fieldTypes={types}
                defaultOpen={key === "input"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-t border-gray-200 p-4 bg-gray-50"
      >
        <p className="text-xs text-gray-500 text-center">
          💡 Drag fields to reorder, or click to add
        </p>
      </motion.div>
    </aside>
  );
};