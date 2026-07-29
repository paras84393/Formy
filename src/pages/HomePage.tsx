import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Plus, Edit2, Trash2, Eye, FileText, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { forms, createForm, deleteForm } = useFormStore();
  const [showNewForm, setShowNewForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');

  const handleCreateForm = () => {
    if (!formTitle.trim()) return;
    const form = createForm(formTitle);
    navigate(`/builder/${form.id}`);
    setShowNewForm(false);
    setFormTitle('');
  };

  const handleDeleteForm = (formId: string) => {
    if (window.confirm('Delete this form?')) {
      deleteForm(formId);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-gray-900 py-16 px-4 font-sans selection:bg-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Tally-Style Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-white shadow-sm border border-gray-200/80">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            Forms, simplified.
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Create forms, surveys, and quizzes without typing code.
          </p>
        </motion.div>

        {/* Action Bar */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-200/60 pb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-gray-800">
              My Forms
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
              {forms.length}
            </span>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={18} />}
            onClick={() => setShowNewForm(true)}
            className="!bg-black hover:!bg-gray-800 !text-white !rounded-lg !px-4 !py-2.5 !text-sm !font-medium transition-all shadow-sm"
          >
            Create form
          </Button>
        </div>

        {/* Forms Grid */}
        {forms.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {forms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white border border-gray-200/80 hover:border-gray-300 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1 font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                      <FileText size={12} />
                      {form.fields.length} {form.fields.length === 1 ? 'block' : 'blocks'}
                    </span>
                    {form.published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                        <Globe size={12} />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                        <Lock size={12} />
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <h3 className="text-base font-bold text-gray-900 mb-1 tracking-tight truncate group-hover:text-black">
                    {form.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {form.description || 'No description provided.'}
                  </p>
                </div>

                {/* Tally Actions Bar */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/builder/${form.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <Edit2 size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => window.open(`/preview/${form.id}`, '_blank')}
                    className="flex items-center justify-center p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    title="Preview form"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteForm(form.id)}
                    className="flex items-center justify-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete form"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">
              📄
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              No forms yet
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Create your first Tally-style form in seconds.
            </p>
            <Button
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowNewForm(true)}
              className="!bg-black hover:!bg-gray-800 !text-white !rounded-lg !px-4 !py-2 !text-sm"
            >
              Create Form
            </Button>
          </motion.div>
        )}
      </div>

      {/* New Form Modal */}
      <Modal
        isOpen={showNewForm}
        onClose={() => {
          setShowNewForm(false);
          setFormTitle('');
        }}
        title="Create a new form"
        size="sm"
      >
        <div className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Form Name
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Job Application Form"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateForm();
                }
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowNewForm(false);
                setFormTitle('');
              }}
              fullWidth
              className="!text-xs !py-2"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateForm}
              disabled={!formTitle.trim()}
              fullWidth
              className="!bg-black hover:!bg-gray-800 !text-white !text-xs !py-2 disabled:!opacity-40"
            >
              Create Form
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};