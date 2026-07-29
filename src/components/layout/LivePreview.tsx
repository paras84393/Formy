import React, { useState } from 'react';
import { useFormStore } from '@/store/formStore';
import { useEditorStore } from '@/store/editorStore';
import { FieldRenderer } from '@/components/fields/FieldRenderer';
import { motion } from 'framer-motion';
import { Eye, EyeOff , X } from 'lucide-react';
import { useUIStore } from "@/store/uiStore";

import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';

export const LivePreview: React.FC = () => {
  const form = useFormStore((state) => state.getCurrentForm());
  const { formValues, setFieldValue } = useEditorStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const { previewOpen,setPreviewOpen } = useUIStore();
  const {t} = useTranslation();
  if (!form) {
    return (
      <aside className="w-96 bg-white  p-6 overflow-y-auto flex items-center justify-center">
        <p className="text-gray-500 text-center">Select a form to see preview</p>
      </aside>
    );
  }

  return (
    <aside className={`${isExpanded ? 'w-96' : 'w-12'} bg-white  overflow-visible transition-all duration-300`}>
      {/* Toggle Button */}

  
      <button
       
        onClick={() => setPreviewOpen(false)}
        className=" -left-6 top-8 bg-white  p-1 rounded-lg "
        title={isExpanded ? 'Hide preview' : 'Show preview'}
      >
        {isExpanded ? <Button>Hide</Button> : <Eye size={16} />}
      </button>

      {isExpanded && (
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-white p-4 z-10">
            <h3 className="text-sm font-bold text-gray-900"> {t("livePreview")}</h3>
            <p className="text-xs text-gray-500 mt-1">See changes in real-time</p>
            <div className="flex items-center justify-between p-3 border-b">
    <h3 className="font-semibold">
       {t("livePreview")}
    </h3>

   
    
</div>
          </div>

          {/* Preview Content */}
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-lg p-6 min-h-screen"
            >
              {/* Form Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {form.title || t('untitledForm')}
                </h1>
                {form.description && (
                  <p className="text-gray-600 text-sm">{form.description}</p>
                )}
       {/* Header */}
<div className="mb-16">
  <div className="relative">
    {/* Cover Image */}
    {form.coverImage && (
      <div className="overflow-hidden rounded-2xl">
        <img
          src={form.coverImage}
          alt="Cover"
          className="w-full h-56 object-cover"
        />
      </div>
    )}

    {/* Floating Logo */}
    {form.logo && (
      <div className="absolute left-8 -bottom-10">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-xl">
          <img
            src={form.logo}
            alt="Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    )}
  </div>

  {/* Space for overlapping logo */}
  {form.logo && <div className="h-12" />}
</div>
                  
              </div>

              {/* Fields Preview */}
              <div className="space-y-4">
                {form.fields.map((field) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-lg"
                  >
                    <FieldRenderer
                      field={field}
                      value={formValues[field.id]}
                      onChange={(value) => setFieldValue(field.id, value)}
                      isEditing={false}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              {form.fields.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t("submit")}
                </motion.button>
              )}

              {/* Empty State */}
              {form.fields.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p>No fields added yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </aside>
  );
};