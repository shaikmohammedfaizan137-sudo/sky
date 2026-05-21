"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export function LuxuryButton({
  children,
  onClick,
  variant = "gold",
  size = "md",
  className,
  disabled = false,
  type = "button",
  fullWidth = false,
}: LuxuryButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-inter font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden group cursor-pointer select-none";

  const sizes = {
    sm: "text-[0.65rem] px-6 py-2.5 gap-2",
    md: "text-[0.7rem] px-8 py-3.5 gap-3",
    lg: "text-[0.72rem] px-10 py-4.5 gap-3",
  };

  const variants = {
    gold: "bg-oak-gold text-oak-black hover:bg-oak-gold-light disabled:opacity-50",
    outline:
      "border border-oak-gold text-oak-gold hover:bg-oak-gold hover:text-oak-black disabled:opacity-50",
    ghost: "text-oak-cream hover:text-oak-gold disabled:opacity-50",
    dark: "bg-oak-dark-2 text-oak-cream border border-white/10 hover:border-oak-gold/40 disabled:opacity-50",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {/* Shimmer effect for gold variant */}
      {variant === "gold" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ translateX: ["−100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
        />
      )}
      {children}
    </motion.button>
  );
}
