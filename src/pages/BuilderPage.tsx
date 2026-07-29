import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormStore } from '@/store/formStore';
import { Layout } from '@/components/layout/Layout';
import { Loader } from '@/components/common';

export const BuilderPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const { setCurrentForm, getAllForms } = useFormStore();

  useEffect(() => {
    if (formId) {
      setCurrentForm(formId);
    }
  }, [formId, setCurrentForm]);

  return (
    <div className="h-screen">
      <Layout />
    </div>
  );
};