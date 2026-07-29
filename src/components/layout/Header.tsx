// src/components/layout/Header.tsx

import React, { useState,useCallback } from 'react';
import { useFormStore } from '@/store/formStore';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Save, Eye, Share2, Settings, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { getCurrentForm, updateForm } = useFormStore();
  const form = getCurrentForm();
  const [showSettings, setShowSettings] = useState(false);
  const [formTitle, setFormTitle] = useState(form?.title || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!form) return;
    setIsSaving(true);
    try {
      updateForm(form.id, {
        title: formTitle,
        updatedAt: Date.now(),
      });
      // Show success toast (implement toast service)
      console.log('Form saved successfully');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = () => {
    if (!form) return;
    updateForm(form.id, { published: true });
    alert('Form published! Share the link with others.');
  };

 const handlePreview = useCallback(() => {
  if (!form) return;
  window.location.href = `/preview/${form.id}`;
}, [form]);

  if (!form) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <p className="text-gray-500">No form selected</p>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {/* Left Section - Logo & Title */}
        <div className="flex items-center gap-4 flex-1">
          <div className="text-2xl font-bold text-blue-600">📋 FormBuilder</div>
          <div className="flex-1">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-lg font-semibold px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Untitled Form"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={<Eye size={18} />}
            onClick={handlePreview}
          >
            Preview
          </Button>

          <Button
            variant="secondary"
            icon={<Share2 size={18} />}
            onClick={handlePublish}
          >
            Publish
          </Button>

          <Button
            variant="secondary"
            icon={<Settings size={18} />}
            onClick={() => setShowSettings(true)}
          >
            Settings
          </Button>

          <Button
            variant="primary"
            icon={<Save size={18} />}
            onClick={handleSave}
            loading={isSaving}
          >
            Save
          </Button>
        </div>
      </header>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Form Settings"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Success Message
            </label>
            <textarea
              value={form.successMessage}
              onChange={(e) =>
                updateForm(form.id, { successMessage: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Redirect URL (Optional)
            </label>
            <input
              type="url"
              value={form.redirectUrl || ''}
              onChange={(e) =>
                updateForm(form.id, { redirectUrl: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/thank-you"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Email
            </label>
            <input
              type="email"
              value={form.notifyEmail || ''}
              onChange={(e) =>
                updateForm(form.id, { notifyEmail: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="multiSubmit"
              checked={form.allowMultipleSubmissions}
              onChange={(e) =>
                updateForm(form.id, {
                  allowMultipleSubmissions: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="multiSubmit" className="text-sm text-gray-700">
              Allow multiple submissions from same user
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
};