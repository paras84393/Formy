import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { useUIStore } from '@/store/uiStore';
import { HomePage } from '@/pages/HomePage';
import { BuilderPage } from '@/pages/BuilderPage';
import { PreviewPage } from '@/pages/PriviewPage';
import { ResponsesPage } from '@/pages/ResponsesPage';
import { NotFound } from '@/pages/NotFound';
import { Toast } from '@/components/common/Toast';
import { motion } from 'framer-motion';
import LandingPage from './pages/First';

export const App: React.FC = () => {
 // const { toastMessage, toastType, hideToast } = useUIStore();

  // Initialize forms from localStorage on mount
  useEffect(() => {
    const savedForms = localStorage.getItem('form-store');
    if (!savedForms && !useFormStore.getState().forms.length) {
      // Create a sample form if no forms exist
      useFormStore.getState().createForm('Welcome Form', 'Get started with your first form!');
    }
  }, []);

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-50"
      >
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/1" element={<HomePage />} />

          {/* Builder Page */}
          <Route path="/builder/:formId" element={<BuilderPage />} />

          {/* Preview Page */}
          <Route path="/preview/:formId" element={<PreviewPage />} />

          {/* Responses Page */}
          <Route path="/responses/:formId" element={<ResponsesPage />} />

          {/* Form Preview (Public) */}
          <Route path="/form/:formId" element={<PreviewPage />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast Notifications */}
        {/*{toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={hideToast}
          />
        )}*/}
      </motion.div>
    </Router>
  );
};
