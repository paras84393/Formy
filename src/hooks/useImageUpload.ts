// src/components/canvas/hooks/useImageUpload.ts

import { useCallback, useRef } from 'react';

interface UseImageUploadProps {
  maxSize: number;
  onSuccess: (imageUrl: string) => void;
  onError?: (message: string) => void;
}

export const useImageUpload = ({
  maxSize,
  onSuccess,
  onError,
}: UseImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate type
      if (!file.type.startsWith('image/')) {
        onError?.('Please select an image file');
        return;
      }

      // Validate size
      if (file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
        onError?.(`Image must be less than ${sizeMB}MB`);
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onSuccess(imageUrl);
      };
      reader.readAsDataURL(file);
    },
    [maxSize, onSuccess, onError]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return { fileInputRef, handleFileSelect, triggerFileInput };
};