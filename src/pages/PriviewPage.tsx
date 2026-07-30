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
  <div className="min-h-screen bg-[#FAFAF7] py-10 px-6">
    {/* Floating Back Button */}
    <button
      onClick={() => navigate(`/builder/${form.id}`)}
      className="fixed left-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
    >
      <ArrowLeft size={18} />
    </button>

    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Cover */}
        <div className="relative">
          {form.coverImage ? (
            <img
              src={form.coverImage}
              alt="Cover"
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="h-72 w-full bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100" />
          )}

          {/* Logo */}
          {form.logo && (
            <div className="absolute left-10 -bottom-12">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                <img
                  src={form.logo}
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`px-12 pb-12 ${form.logo ? "pt-20" : "pt-12"}`}>
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {form.title || "Untitled Form"}
            </h1>

            {form.description && (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
                {form.description}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {form.fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <FieldRenderer
                  field={field}
                  value={formValues[field.id]}
                  onChange={(value) =>
                    setFieldValue(field.id, value)
                  }
                  isEditing={false}
                />

                {validationErrors[field.id] && (
                  <p className="mt-2 text-sm text-red-500">
                    {validationErrors[field.id]}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Submit */}
            <div className="flex justify-end border-t border-gray-100 pt-10">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                loading={isSubmitting}
                className="rounded-full px-10"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  </div>
)};