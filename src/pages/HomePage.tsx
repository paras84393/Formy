import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Plus, Edit2, Trash2, Eye, FileText, Globe, Lock, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 text-gray-900 py-20 px-4 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {/* Icon Badge */}
         

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-4 leading-tight"
          >
            Forms, simplified.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl leading-relaxed"
          >
            Create beautiful forms, surveys, and quizzes without writing a single line of code. Launch in seconds, not hours.
          </motion.p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              My Forms
            </h2>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold"
            >
              {forms.length}
            </motion.span>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              size="lg"
              icon={<Plus size={18} />}
              onClick={() => setShowNewForm(true)}
              className="!bg-slate-900 hover:!bg-slate-800 !text-white !rounded-xl !px-6 !py-3 !text-sm !font-semibold transition-all shadow-lg hover:shadow-xl active:shadow-md"
            >
              Create form
            </Button>
          </motion.div>
        </motion.div>

        {/* Forms Grid */}
        {forms.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {forms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-indigo-50/20 transition-all duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 + 0.1 }}
                      className="inline-flex items-center gap-1.5 font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs border border-slate-200 hover:bg-slate-200 transition-colors"
                    >
                      <FileText size={13} className="text-slate-600" />
                      {form.fields.length} {form.fields.length === 1 ? 'block' : 'blocks'}
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 + 0.15 }}
                      className={`inline-flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                        form.published
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {form.published ? (
                        <>
                          <Globe size={13} />
                          Live
                        </>
                      ) : (
                        <>
                          <Lock size={13} />
                          Draft
                        </>
                      )}
                    </motion.span>
                  </div>

                  {/* Card Content */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.05 }}
                    className="text-lg font-bold text-slate-900 mb-2 tracking-tight truncate group-hover:text-indigo-600 transition-colors"
                  >
                    {form.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.08 }}
                    className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed"
                  >
                    {form.description || 'No description provided.'}
                  </motion.p>
                </div>

                {/* Action Bar */}
                <div className="relative z-10 flex items-center gap-2 pt-5 border-t border-slate-100 group-hover:border-slate-200 transition-colors">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(`/builder/${form.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium text-sm shadow-sm hover:shadow-md active:shadow-none"
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => window.open(`/preview/${form.id}`, '_blank')}
                    className="flex items-center justify-center p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    title="Preview form"
                  >
                    <Eye size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleDeleteForm(form.id)}
                    className="flex items-center justify-center p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete form"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm hover:shadow-md transition-shadow">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl border border-slate-200"
              >
                📄
              </motion.div>

              {/* Content */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="text-2xl font-bold text-slate-900 mb-2"
              >
                No forms yet
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-slate-600 mb-8 leading-relaxed"
              >
                Get started by creating your first form. It takes less than a minute to build something beautiful.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  icon={<Plus size={18} />}
                  onClick={() => setShowNewForm(true)}
                  className= " !bg-slate-900 hover:!bg-slate-800 !text-white !rounded-xl !px-6 !py-3 !text-sm !font-semibold transition-all shadow-lg hover:shadow-xl active:shadow-md inline-flex items-center gap-2"
                >
                  Create 
                  
                </Button>
              </motion.div>
            </div>
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 pt-2"
        >
          {/* Input Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3 tracking-wide">
              Form Name
            </label>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Customer Feedback Survey"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateForm();
                }
              }}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
            />
            <p className="text-xs text-slate-500 mt-2">
              Give your form a descriptive name. You can change it anytime.
            </p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex gap-3 pt-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="secondary"
                onClick={() => {
                  setShowNewForm(false);
                  setFormTitle('');
                }}
                fullWidth
                className="!text-sm !py-2.5 !font-medium !rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
              >
                Cancel
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="primary"
                onClick={handleCreateForm}
                disabled={!formTitle.trim()}
                fullWidth
                className="!bg-slate-900 hover:!bg-slate-800 !text-white !text-sm !py-2.5 !font-medium !rounded-xl transition-all shadow-md hover:shadow-lg disabled:!opacity-50 disabled:!cursor-not-allowed"
              >
                Create Form
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Modal>
    </div>
  );
};