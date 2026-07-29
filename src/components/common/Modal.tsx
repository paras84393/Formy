import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 12,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                w-full
                ${sizeClasses[size]}
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
              `}
            >
              {/* Header */}

              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your form settings.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-black
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}

              <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};