import { cn } from "@/utils/cn";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, type = "h1", className }) => {
  const Tag = type;

  const baseStyles = `font-bold leading-tight`;

  const typeStyles = {
    h1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`,
    h2: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`,
    h3: `text-xl sm:text-2xl md:text-3xl lg:text-4xl`,
    h4: `text-lg sm:text-xl md:text-2xl lg:text-3xl`,
    h5: `text-base sm:text-lg md:text-xl lg:text-2xl`,
    h6: `text-sm sm:text-base md:text-lg lg:text-xl`,
  };

  const combinedStyles = `${baseStyles} ${typeStyles[type] || typeStyles.h1}`;

  return <Tag className={cn(className, combinedStyles)}>{children}</Tag>;
};

export default Title;
