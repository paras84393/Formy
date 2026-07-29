import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { useEditorStore } from '@/store/editorStore';
import { FieldRenderer } from '@/components/fields/FieldRenderer';
import { Button } from '@/components/common/Button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

export const PreviewPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getAllForms, addResponse } = useFormStore();
  const { formValues, setFieldValue, validationErrors, setValidationErrors } = useEditorStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = getAllForms().find((f) => f.id === formId);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Form not found</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const errors: Record<string, string> = {};
      form.fields.forEach((field) => {
        if (field.required && !formValues[field.id]) {
          errors[field.id] = `${field.label} is required`;
        }
      });

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      // Add response
      addResponse({
        id: uuidv4(),
        formId: form.id,
        data: formValues,
        submittedAt: Date.now(),
      });

      // Show success message and redirect
      alert(form.successMessage);

      if (form.redirectUrl) {
        window.location.href = form.redirectUrl;
      } else {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
       <button
  onClick={() => navigate(`/builder/${form.id}`)}
>
  Back to Editor
</button>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
 {/* Header */}
<div className="mb-16">
  <div className="relative">
    {/* Cover Image */}
    {form.coverImage ? (
      <img
        src={form.coverImage}
        alt="Cover"
        className="w-full h-56 object-cover rounded-2xl"
      />
    ) : (
      <div className="w-full h-56 rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100" />
    )}

    {/* Floating Logo */}
    {form.logo && (
      <div className="absolute left-8 -bottom-10 z-10">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg border-4 border-white">
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


  {/* Title */}
  <h1 className="text-4xl font-bold text-gray-900 mb-3">
    {form.title || "Untitled Form"}
  </h1>

  {/* Description */}
  {form.description && (
    <p className="text-gray-600 text-lg leading-relaxed">
      {form.description}
    </p>
  )}

</div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FieldRenderer
                  field={field}
                  value={formValues[field.id]}
                  onChange={(value) => setFieldValue(field.id, value)}
                  isEditing={false}
                />
                {validationErrors[field.id] && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {validationErrors[field.id]}
                  </motion.p>
                )}
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: form.fields.length * 0.05 }}
              className="pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                loading={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};