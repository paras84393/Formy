import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/common/Button';
import { ArrowLeft, Download, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResponsesPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getAllForms, getResponses, deleteResponse } = useFormStore();
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const form = getAllForms().find((f) => f.id === formId);
  const responses = formId ? getResponses(formId) : [];

  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Form not found</p>
      </div>
    );
  }

  const handleExportCSV = () => {
    const headers = form.fields.map((f) => f.label).join(',');
    const rows = responses.map((r) =>
      form.fields.map((f) => r.data[f.id] || '').join(',')
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.title}-responses.csv`;
    link.click();
  };

  const handleDeleteResponse = (responseId: string) => {
    if (window.confirm('Delete this response?')) {
      deleteResponse(responseId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Responses for {form.title}
            </h1>
            <p className="text-gray-600 mt-1">
              {responses.length} submission{responses.length !== 1 ? 's' : ''}
            </p>
          </div>

          <Button
            variant="primary"
            icon={<Download size={18} />}
            onClick={handleExportCSV}
            disabled={responses.length === 0}
          >
            Export as CSV
          </Button>
        </div>

        {/* Responses Table */}
        {responses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                      Date
                    </th>
                    {form.fields.slice(0, 3).map((field) => (
                      <th
                        key={field.id}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-900"
                      >
                        {field.label}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {responses.map((response) => (
                    <tr
                      key={response.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(response.submittedAt).toLocaleDateString()}
                      </td>
                      {form.fields.slice(0, 3).map((field) => (
                        <td
                          key={field.id}
                          className="px-6 py-4 text-sm text-gray-600"
                        >
                          {String(response.data[field.id] || '-').slice(0, 30)}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedResponse(response.id)}
                            className="text-blue-600 hover:text-blue-700"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteResponse(response.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <p className="text-gray-500 text-lg">No responses yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Share your form to start collecting responses
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};