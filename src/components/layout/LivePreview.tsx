import React, { useState } from 'react';
import { useFormStore } from '@/store/formStore';
import { useEditorStore } from '@/store/editorStore';
import { FieldRenderer } from '@/components/fields/FieldRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIStore } from "@/store/uiStore";
import { useTranslation } from 'react-i18next';

export const LivePreview: React.FC = () => {
  const form = useFormStore((state) => state.getCurrentForm());
  const { formValues, setFieldValue } = useEditorStore();
  const { previewOpen, setPreviewOpen } = useUIStore();
  const { t } = useTranslation();

  if (!form) {
    return null;
  }

  return (
    <AnimatePresence>
      {previewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreviewOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer from Bottom */}
         <motion.div
  initial={{
    x: typeof window !== "undefined" && window.innerWidth >= 1024 ? "100%" : 0,
    y: typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 0,
  }}
  animate={{
    x: 0,
    y: 0,
  }}
  exit={{
    x: typeof window !== "undefined" && window.innerWidth >= 1024 ? "100%" : 0,
    y: typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 0,
  }}
  transition={{
    type: "spring",
    damping: 25,
    stiffness: 220,
  }}
           className="
fixed z-50 bg-white overflow-hidden shadow-2xl

bottom-0 left-0 right-0
rounded-t-3xl
max-h-[90vh]

lg:top-0
lg:right-0
lg:left-auto
lg:bottom-0
lg:h-screen
lg:w-[480px]
lg:max-h-none
lg:rounded-none
lg:border-l
"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("livePreview")}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("seeChangesInRealTime", "Changes update instantly")}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreviewOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close preview"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="
overflow-y-auto
max-h-[calc(90vh-80px)]
lg:max-h-none
lg:h-[calc(100vh-80px)]
">
              <div className="p-6 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-8 space-y-6"
                >
                  {/* Cover Image */}
                  {form.coverImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-40 overflow-hidden rounded-2xl"
                    >
                      <img
                        src={form.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Logo & Title */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-3"
                  >
                    {form.logo && (
                      <img
                        src={form.logo}
                        alt="Logo"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {form.title || t('untitledForm')}
                      </h1>
                    </div>
                  </motion.div>

                  {/* Description */}
                  {form.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="text-gray-600 text-sm leading-relaxed"
                    >
                      {form.description}
                    </motion.p>
                  )}

                  {/* Fields Preview */}
                  {form.fields.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="space-y-4"
                    >
                      {form.fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <FieldRenderer
                            field={field}
                            value={formValues[field.id]}
                            onChange={(value) => setFieldValue(field.id, value)}
                            isEditing={false}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex items-center justify-center py-12"
                    >
                      <p className="text-gray-400 text-center">
                        {t("noFieldsAdded", "No fields added yet")}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  {form.fields.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200"
                    >
                      {t("submit")}
                    </motion.button>
                  )}
                </motion.div>

                {/* Bottom Padding */}
                <div className="h-6" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};