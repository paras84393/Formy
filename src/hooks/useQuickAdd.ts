// src/components/canvas/hooks/useQuickAdd.ts

import { useState, useCallback } from 'react';

export const useQuickAdd = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<number | null>(null);

  const openQuickAdd = useCallback((index: number) => {
    setShowQuickAdd(index);
  }, []);

  const closeQuickAdd = useCallback(() => {
    setShowQuickAdd(null);
  }, []);

  const toggleQuickAdd = useCallback((index: number) => {
    setShowQuickAdd((prev) => (prev === index ? null : index));
  }, []);

  return {
    showQuickAdd,
    setShowQuickAdd,
    openQuickAdd,
    closeQuickAdd,
    toggleQuickAdd,
  };
};