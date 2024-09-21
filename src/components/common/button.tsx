import React, { ReactNode } from "react";

interface BtnProps {
  handleClick?: () => void;
  text?: string;
  className?: string;
  "aria-label"?: string;
  disabled?: boolean;
  children?: ReactNode; // Add children prop to accept any React nodes
  asChild?: boolean; // Add an optional asChild prop to support wrapping
}

const Button: React.FC<BtnProps> = ({
  handleClick,
  text,
  className = "",
  "aria-label": ariaLabel,
  disabled = false,
  children, // Accept children
  asChild = false,
}) => {
  const Component = asChild ? "div" : "button"; // Use "div" or "button" based on `asChild`

  return (
    <Component
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={ariaLabel}
      disabled={disabled} // Only works if it's a button element
    >
      {text || children} {/* Render text or children */}
    </Component>
  );
};

export default Button;
