import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <Info className="text-blue-500" size={18} />,
    warning: <AlertTriangle className="text-amber-500" size={18} />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="
          fixed
          top-5
          right-5
          z-[100]
          w-[calc(100vw-2rem)]
          max-w-sm
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-xl
        "
      >
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 shrink-0">
            {icons[type]}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};