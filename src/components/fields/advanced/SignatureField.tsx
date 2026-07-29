import React, { useRef, useEffect } from 'react';
import { Field } from '@/types';
import { RotateCcw } from 'lucide-react';

interface SignatureFieldProps {
  field: Field;
  value?: string;
  onChange?: (value: string) => void;
}

export const SignatureField: React.FC<SignatureFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const rect = canvas!.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const rect = canvas!.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      onChange?.(canvas.toDataURL());
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      onChange?.('');
    }
  };

  return (
    <div className="w-full">
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full bg-white cursor-crosshair"
        />
      </div>

      <button
        onClick={handleClear}
        className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <RotateCcw size={14} />
        Clear Signature
      </button>

      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
    </div>
  );
};