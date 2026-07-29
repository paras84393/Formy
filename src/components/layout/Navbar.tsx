import React, { useState, useCallback, useMemo } from 'react';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import {
  Save,
  Eye,
  Share2,
  Settings,
  Undo2,
  Redo2,
  Download,
  CheckCircle,
  ChevronDown,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { t } from 'i18next';

// ============================================================================
// SETTINGS FORM
// ============================================================================

const SettingsForm: React.FC<{
  form: any;
  onUpdate: (updates: any) => void;
}> = ({ form, onUpdate }) => {
  const handleChange = useCallback(
    (key: string, value: any) => {
      onUpdate({ [key]: value });
    },
    [onUpdate]
  );

  const settingsGroups = useMemo(
    () => [
      {
        title: 'Basic Information',
        fields: [
          {
            key: 'title',
            label: 'Form Title',
            type: 'text',
            value: form.title,
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            value: form.description || '',
            rows: 3,
            placeholder: 'Tell users what this form is about',
          },
        ],
      },
      {
        title: 'Submission',
        fields: [
          {
            key: 'successMessage',
            label: 'Success Message',
            type: 'textarea',
            value: form.successMessage,
            rows: 2,
            placeholder: 'Thank you for your submission!',
          },
          {
            key: 'redirectUrl',
            label: 'Redirect URL (Optional)',
            type: 'url',
            value: form.redirectUrl || '',
            placeholder: 'https://example.com/thank-you',
          },
          {
            key: 'notifyEmail',
            label: 'Notification Email',
            type: 'email',
            value: form.notifyEmail || '',
            placeholder: 'your@email.com',
          },
        ],
      },
      {
        title: 'Preferences',
        fields: [
          {
            key: 'allowMultipleSubmissions',
            label: 'Allow multiple submissions',
            type: 'checkbox',
            value: form.allowMultipleSubmissions,
            description: 'Users can submit the form multiple times',
          },
          {
            key: 'showProgressBar',
            label: 'Show progress bar',
            type: 'checkbox',
            value: form.showProgressBar,
            description: 'Display progress indicator for multi-page forms',
          },
        ],
      },
    ],
    [form]
  );

  return (
    <div className="space-y-8">
      {settingsGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.05 }}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            {group.title}
          </h3>

          <div className="space-y-4">
            {group.fields.map((field) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {field.type === 'checkbox' ? (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={field.key}
                      checked={field.value}
                      onChange={(e) =>
                        handleChange(field.key, e.target.checked)
                      }
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                    />
                    <label
                      htmlFor={field.key}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {field.label}
                      </div>
                      {field.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {field.description}
                        </div>
                      )}
                    </label>
                  </div>
                ) : field.type === 'textarea' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {field.label}
                    </label>
                    <textarea
                      value={field.value}
                      onChange={(e) =>
                        handleChange(field.key, e.target.value)
                      }
                      placeholder={field.placeholder}
                      rows={field.rows || 3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) =>
                        handleChange(field.key, e.target.value)
                      }
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// STATUS INDICATOR
// ============================================================================

const StatusIndicator: React.FC<{
  isSaving: boolean;
  lastSaved?: number;
}> = ({ isSaving, lastSaved }) => {
  const getTimeAgo = useCallback((timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return 'earlier';
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isSaving ? (
        <motion.div
          key="saving"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 text-xs text-gray-600 font-medium"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-3 h-3 border-1.5 border-gray-300 border-t-gray-900 rounded-full"
          />
          {t("saving")}
        </motion.div>
      ) : lastSaved ? (
        <motion.div
          key="saved"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 text-xs text-gray-600 font-medium"
        >
          <CheckCircle size={14} className="text-gray-400" />
          {t("saved")} {getTimeAgo(lastSaved)}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

// ============================================================================
// PUBLISH DROPDOWN
// ============================================================================

const PublishDropdown: React.FC<{
  form: any;
  onPublish: () => void;
  onPreview: () => void;
}> = ({ form, onPublish, onPreview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useUIStore();

  const shareUrl = `${window.location.origin}/form/${form.id}`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    showToast('Link copied to clipboard', 'success');
    setIsOpen(false);
  }, [shareUrl, showToast]);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
      >
        <Share2 size={16} />
        {t("share")}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dropdown Content */}
            <div className="p-3 space-y-2">
              {/* Preview Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  onPreview();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-left text-sm"
              >
                <Eye size={16} className="text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">{t("preview")}</div>
                  <div className="text-xs text-gray-500">See how it looks</div>
                </div>
              </motion.button>

              {/* Publish Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  onPublish();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-left text-sm"
              >
                <ExternalLink size={16} className="text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">
                    {form.published ? 'Update' : t('publish')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {form.published ? 'Refresh link' : 'Make it live'}
                  </div>
                </div>
              </motion.button>

              {/* Copy Link Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-left text-sm border-t border-gray-100 mt-2 pt-3"
              >
                <Copy size={16} className="text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Copy link</div>
                  <div className="text-xs text-gray-500 truncate">
                    {shareUrl.replace('https://', '')}
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// MAIN NAVBAR COMPONENT
// ============================================================================

export const Navbar: React.FC = () => {
  const { getCurrentForm, updateForm, undo, redo } = useFormStore();
  const { showToast } = useUIStore();
  const form = getCurrentForm();

  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const handleSave = useCallback(async () => {
    if (!form) return;

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      updateForm(form.id, {
        updatedAt: Date.now(),
      });

      setLastSaved(Date.now());
      showToast('Form saved', 'success');
    } catch (error) {
      showToast('Failed to save form', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [form, updateForm, showToast]);

  const handlePublish = useCallback(() => {
    if (!form) return;

    updateForm(form.id, { published: true });
    const shareUrl = `${window.location.origin}/form/${form.id}`;

    navigator.clipboard.writeText(shareUrl);
    showToast('Form published! Link copied.', 'success');
  }, [form, updateForm, showToast]);

  const handlePreview = useCallback(() => {
    if (!form) return;
    window.open(`/preview/${form.id}`, '_blank');
  }, [form]);

  const handleExport = useCallback(() => {
    if (!form) return;

    const dataStr = JSON.stringify(form, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${form.title || 'form'}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showToast('Form exported', 'success');
  }, [form, showToast]);

  const handleSettingsUpdate = useCallback(
    (updates: any) => {
      if (!form) return;
      updateForm(form.id, updates);
      showToast('Settings saved', 'success');
    },
    [form, updateForm, showToast]
  );

  if (!form) {
    return (
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-sm font-medium"
        >
          No form selected
        </motion.p>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 min-w-0"
          >
            {/* Logo */}
            <div className="text-lg font-bold text-gray-900">{t("appName")}</div>

            {/* Form Title */}
            <div className="hidden sm:block border-l border-gray-200 pl-6">
              <h1 className="text-sm font-semibold text-gray-900 truncate">
                {form.title || t('untitledForm')}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {form.fields.length} {form.fields.length === 1 ? t('question') : t('questions')}
              </p>
            </div>
          </motion.div>

          {/* Center Section - Status */}
          <div className="flex-1 flex justify-center">
            <StatusIndicator isSaving={isSaving} lastSaved={lastSaved} />
          </div>

          {/* Right Section - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {/* History Controls */}
            <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={undo}
                title="Undo (Ctrl+Z)"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Undo2 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redo}
                title="Redo (Ctrl+Y)"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Redo2 size={16} />
              </motion.button>
            </div>

            {/* Export */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              title="Export as JSON"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Download size={16} />
            </motion.button>

            {/* Share Dropdown */}
            <PublishDropdown
              form={form}
              onPublish={handlePublish}
              onPreview={handlePreview}
            />

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              title="Settings"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Settings size={16} />
            </motion.button>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isSaving}
              className="ml-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-1.5 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Save size={14} className="inline mr-2" />
                  {t('save')}
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Form Settings"
        size="md"
      >
        <LanguageSwitcher/>
        <SettingsForm form={form} onUpdate={handleSettingsUpdate} />
      </Modal>
    </>
  );
};