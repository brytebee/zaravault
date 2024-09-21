"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Add type prop
  disabled?: boolean; // Add disabled prop
  className?: string; // Add className prop
}

export default function FormButton({
  children,
  type = "submit",
  disabled = false,
  className = "", // Default to an empty string
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type}
      color="primary"
      isLoading={pending}
      disabled={disabled}
      className={className} // Pass the className to the Button component
    >
      {children}
    </Button>
  );
}
