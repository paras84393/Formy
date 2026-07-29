import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 select-none whitespace-nowrap";

  const variants = {
    primary: `
      bg-gray-900
      text-white
      border border-gray-900
      hover:bg-black
      hover:shadow-md
      active:translate-y-px
    `,

    secondary: `
      bg-white
      text-gray-800
      border border-gray-200
      hover:bg-gray-50
      hover:border-gray-300
      hover:shadow-sm
      active:translate-y-px
    `,

    ghost: `
      bg-transparent
      text-gray-600
      hover:bg-gray-100
      hover:text-gray-900
      active:bg-gray-200
    `,

    danger: `
      bg-red-600
      text-white
      border border-red-600
      hover:bg-red-700
      active:translate-y-px
    `,
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}
      `}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}

      <span>{children}</span>
    </motion.button>
  );
};